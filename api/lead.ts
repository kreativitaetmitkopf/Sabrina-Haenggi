// api/lead.ts
// Vercel Serverless Function fuer die Download-Anforderungen.
// Ersetzt app.post("/api/lead", ...) aus server.ts.
//
// Gegenueber dem Original entfallen Supabase, Resend und die
// Download-Tokens. Das Google Apps Script schreibt ins Sheet und
// verschickt die Unterlage direkt als frisch exportiertes PDF.

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 5;
const recentHits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const previous = (recentHits.get(ip) || []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );
  previous.push(now);
  recentHits.set(ip, previous);
  return previous.length > RATE_LIMIT_MAX;
}

// --- Gemeinsame Pruefungen -------------------------------------------------

// Bekannte Wegwerf-Maildienste. Liste bewusst kurz gehalten:
// sie faengt die haeufigsten Faelle, ohne echte Nutzer auszusperren.
const WEGWERF_DOMAINS = [
  "mailinator.com", "yopmail.com", "10minutemail.com", "guerrillamail.com",
  "tempmail.com", "temp-mail.org", "trashmail.com", "wegwerfmail.de",
  "sharklasers.com", "getnada.com", "maildrop.cc", "dispostable.com",
  "fakeinbox.com", "mytemp.email", "throwawaymail.com", "spam4.me",
  "einrot.com", "mohmal.com", "emailondeck.com", "moakt.com"
];

// Offensichtliche Platzhalter
const FAKE_MUSTER = [
  /^test@/i, /^abc@/i, /^asdf/i, /^aaa+@/i, /^xxx+@/i,
  /@(test|example|beispiel|invalid|localhost)\./i,
  /^[a-z]@[a-z]\.[a-z]{1,3}$/i
];

function pruefeEmail(email: string): string | null {
  const wert = String(email || "").trim().toLowerCase();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(wert)) {
    return "Bitte geben Sie eine gueltige E-Mail-Adresse ein.";
  }

  const domain = wert.split("@")[1] || "";

  if (WEGWERF_DOMAINS.includes(domain)) {
    return "Bitte verwenden Sie eine dauerhafte E-Mail-Adresse, keine Wegwerfadresse.";
  }

  for (const muster of FAKE_MUSTER) {
    if (muster.test(wert)) {
      return "Bitte geben Sie Ihre echte E-Mail-Adresse ein.";
    }
  }

  // Doppelpunkte, fuehrender oder abschliessender Punkt im lokalen Teil
  const lokal = wert.split("@")[0];
  if (lokal.startsWith(".") || lokal.endsWith(".") || lokal.includes("..")) {
    return "Bitte geben Sie eine gueltige E-Mail-Adresse ein.";
  }

  return null;
}

// Telefonnummer ist optional. Wird sie angegeben, muss sie plausibel sein.
function pruefeTelefon(phone: string): string | null {
  const roh = String(phone || "").trim();
  if (!roh) return null; // leer ist erlaubt

  const ziffern = roh.replace(/[^0-9]/g, "");

  if (ziffern.length < 8 || ziffern.length > 15) {
    return "Bitte geben Sie eine gueltige Telefonnummer ein oder lassen Sie das Feld leer.";
  }

  // Nur eine einzige wiederholte Ziffer, z.B. 000000000 oder 1111111111
  if (/^(\d)\1+$/.test(ziffern)) {
    return "Bitte geben Sie eine gueltige Telefonnummer ein oder lassen Sie das Feld leer.";
  }

  // Fortlaufende Folgen wie 123456789 oder 0123456789
  if (/^0?1234567/.test(ziffern) || /^9876543/.test(ziffern)) {
    return "Bitte geben Sie eine gueltige Telefonnummer ein oder lassen Sie das Feld leer.";
  }

  return null;
}

const SUPPORTED_LANGS = ["de", "es", "en"];
const KNOWN_SLUGS = ["pflege-checkliste", "notfallmappe", "ebook-entlastung"];

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const forwarded = req.headers["x-forwarded-for"];
    const ip =
      (Array.isArray(forwarded) ? forwarded[0] : forwarded)?.split(",")[0]?.trim() ||
      "anonymous";

    if (isRateLimited(ip)) {
      return res
        .status(429)
        .json({ error: "Zu viele Anfragen. Bitte versuchen Sie es spaeter erneut." });
    }

    const body =
      typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};

    const {
      firstName,
      lastName,
      email,
      phone,
      magnetSlug,
      honeypot,
      lang,
      consent,
    } = body;

    // Anti-Spam
    if (honeypot) {
      return res.status(200).json({ ok: true });
    }

    if (!email || !magnetSlug) {
      return res.status(400).json({ error: "Bitte fuellen Sie alle Pflichtfelder aus." });
    }

    const emailFehler = pruefeEmail(email);
    if (emailFehler) {
      return res.status(400).json({ error: emailFehler });
    }

    const telefonFehler = pruefeTelefon(phone);
    if (telefonFehler) {
      return res.status(400).json({ error: telefonFehler });
    }

    if (!KNOWN_SLUGS.includes(String(magnetSlug))) {
      return res.status(404).json({ error: "Unterlage nicht gefunden." });
    }

    const cleanLang = String(lang || "").toLowerCase().slice(0, 2);
    const finalLang = SUPPORTED_LANGS.includes(cleanLang) ? cleanLang : "de";

    if (!process.env.WAITLIST_WEBHOOK_URL || !process.env.WAITLIST_WEBHOOK_SECRET) {
      console.error("WAITLIST_WEBHOOK_URL oder _SECRET fehlt. Anfrage nicht gespeichert.");
      return res
        .status(500)
        .json({ error: "Serverfehler. Bitte versuchen Sie es spaeter erneut." });
    }

    const payload = {
      secret: process.env.WAITLIST_WEBHOOK_SECRET,
      type: "download",
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      magnet_slug: magnetSlug,
      consent_privacy: consent === undefined ? true : !!consent,
      lang: finalLang,
      source: `website_download_${finalLang}`,
      user_agent: req.headers["user-agent"] || "unknown",
    };

    const response = await fetch(process.env.WAITLIST_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    const rawText = await response.text();
    let result: any = {};
    try {
      result = JSON.parse(rawText);
    } catch {
      console.error("Webhook antwortete nicht mit JSON:", rawText.slice(0, 300));
      throw new Error("Unerwartete Antwort vom Speicherdienst.");
    }

    if (!response.ok || !result.ok) {
      throw new Error(result.error || "Fehler beim Speichern.");
    }

    return res.status(200).json({ ok: true });
  } catch (error: any) {
    console.error("Lead API Error:", error?.message || error);
    return res
      .status(500)
      .json({ error: "Serverfehler. Bitte versuchen Sie es spaeter erneut." });
  }
}
