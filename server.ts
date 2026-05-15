import express from "express";
import cors from "cors";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";
import { Resend } from "resend";
import { createServer as createViteServer } from "vite";
import { getSupabaseAdmin } from "./lib/supabase.ts";
import { getMagnetBySlug } from "./lib/magnets.ts";
import { isRateLimited } from "./lib/rateLimit.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function startServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());

// API: Waitlist
app.post("/api/waitlist", async (req, res) => {
  try {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "anonymous";
    if (isRateLimited(ip as string)) {
      return res.status(429).json({ error: "Zu viele Anfragen. Bitte versuchen Sie es später erneut." });
    }

    const body = req.body;
    const {
      first_name, last_name, email, phone, interest,
      desired_timeframe, message, consent_privacy,
      consent_contact, company, source
    } = body;

    // 1. Anti-Spam: Honeypot Check
    if (company) {
      return res.json({ ok: true }); // Silent fail für Bots
    }

    // 2. Validierung
    if (!first_name || !last_name || !email || !interest || !consent_privacy) {
      return res.status(400).json({ error: "Bitte füllen Sie alle Pflichtfelder aus." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Bitte geben Sie eine gültige E-Mail-Adresse ein." });
    }

    // 3. Zeitstempel und Daten anreichern
    const now = new Date().toISOString();
    const payload = {
      first_name,
      last_name,
      email,
      phone,
      interest,
      desired_timeframe,
      message,
      consent_privacy: !!consent_privacy,
      consent_contact: !!consent_contact,
      consent_timestamp: now,
      created_at: now,
      source: source || "website_waitlist_button",
      user_agent: req.headers["user-agent"] || "unknown"
    };

    // 4. Forward an Google Apps Script
    if (!process.env.WAITLIST_WEBHOOK_URL) {
      console.warn("WAITLIST_WEBHOOK_URL is not set.");
      return res.json({ ok: true }); // Mock success if not deployed yet
    }

    const response = await fetch(process.env.WAITLIST_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-webhook-secret": process.env.WAITLIST_WEBHOOK_SECRET || ""
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok || !result.ok) {
      throw new Error(result.error || "Fehler beim Speichern in der Datenbank.");
    }

    return res.json({ ok: true });
  } catch (error: any) {
    console.error("Waitlist API Error:", error);
    return res.status(500).json({ error: "Serverfehler. Bitte versuchen Sie es später erneut." });
  }
});

// API: Lead
app.post("/api/lead", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, magnetSlug, honeypot } = req.body;

    // 1. Validierung & Spam Schutz
    if (honeypot) {
      return res.json({ ok: true });
    }

    if (!email || !email.includes("@") || !magnetSlug) {
      return res.status(400).json({ error: "Ungültige Eingabe" });
    }

    const magnet = getMagnetBySlug(magnetSlug);
    if (!magnet) {
      return res.status(404).json({ error: "Download nicht gefunden" });
    }

    const supabaseAdmin = getSupabaseAdmin();

    // 2. Lead Speichern
    const { data: leadData, error: leadError } = await supabaseAdmin
      .from("leads")
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        magnet_slug: magnetSlug,
        consent: true,
        user_agent: req.headers["user-agent"],
      })
      .select("id")
      .single();

    if (leadError) {
      console.error("Supabase Error:", leadError);
      throw new Error("Datenbank Fehler");
    }

    // 3. Download Token generieren (Gültig für 30 Minuten)
    const token = randomUUID();
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();

    const { error: tokenError } = await supabaseAdmin
      .from("download_tokens")
      .insert({
        token,
        lead_id: leadData.id,
        magnet_slug: magnetSlug,
        pdf_filename: magnet.fileName,
        expires_at: expiresAt
      });

    if (tokenError) {
      console.error("Token Error:", tokenError);
      throw new Error("Token Erstellung fehlgeschlagen");
    }

    // 4. Download URL konstruieren
    const downloadUrl = `/api/dl?token=${token}`;

    // 5. Optional: E-Mail via Resend
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sabrinahaenggi.com";
      const absoluteDownloadUrl = `${siteUrl}${downloadUrl}`;

      resend.emails.send({
        from: "Sabrina Hänggi <downloads@sabrinahaenggi.com>",
        to: email,
        subject: `Ihr Download: ${magnet.title}`,
        html: `
          <p>Hallo ${firstName},</p>
          <p>vielen Dank für Ihr Interesse.</p>
          <p>Falls der Download nicht automatisch gestartet ist, können Sie das Dokument hier herunterladen:</p>
          <p><a href="${absoluteDownloadUrl}">Jetzt herunterladen</a></p>
          <p>Der Link ist 30 Minuten gültig.</p>
          <br>
          <p>Herzliche Grüße,<br>Sabrina Hänggi</p>
        `
      }).catch(e => console.error("Resend Error:", e));
    }

    return res.json({ ok: true, downloadUrl });
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: "Interner Server Fehler" });
  }
});

// API: Download
app.get("/api/dl", async (req, res) => {
  const token = req.query.token as string;

  if (!token) {
    return res.status(400).send("Token fehlt");
  }

  const supabaseAdmin = getSupabaseAdmin();

  // 1. Token prüfen
  const { data: tokenRecord, error } = await supabaseAdmin
    .from("download_tokens")
    .select("*")
    .eq("token", token)
    .single();

  if (error || !tokenRecord) {
    return res.status(403).send("Ungültiger oder abgelaufener Link.");
  }

  // 2. Ablauf prüfen
  if (new Date(tokenRecord.expires_at) < new Date()) {
    return res.status(410).send("Dieser Link ist abgelaufen.");
  }

  // 3. Als benutzt markieren
  await supabaseAdmin
    .from("download_tokens")
    .update({ used_at: new Date().toISOString() })
    .eq("id", tokenRecord.id);

  // 4. Datei lesen
  const filePath = path.join(process.cwd(), "public", "pdfs", tokenRecord.pdf_filename);

  if (!fs.existsSync(filePath)) {
    console.error(`File missing: ${filePath}`);
    return res.status(404).send("Datei nicht gefunden. Bitte kontaktieren Sie den Support.");
  }

  // 5. Datei streamen
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${tokenRecord.pdf_filename}"`);
  res.setHeader("Cache-Control", "no-store, max-age=0");
  
  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
});

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const port = 3000;
  app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on http://0.0.0.0:${port}`);
  });
}

startServer();
