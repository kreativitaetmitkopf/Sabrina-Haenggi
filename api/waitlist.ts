// api/waitlist.ts
// Vercel Serverless Function.
// Ersetzt app.post("/api/waitlist", ...) aus server.ts.
//
// Aenderungen gegenueber dem Original:
//  - Das Geheimnis wandert in den Datenkoerper. Google Apps Script kann
//    eingehende HTTP-Header nicht lesen, die alte Header-Loesung haette
//    nie funktioniert.
//  - Neues Feld "lang" fuer die Sprache des Whitepapers.
//  - Fehlt WAITLIST_WEBHOOK_URL, wird ein echter Fehler gemeldet statt
//    faelschlich Erfolg. Sonst gehen Anmeldungen unbemerkt verloren.

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

const SUPPORTED_LANGS = ["de", "es", "en"];

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
      first_name,
      last_name,
      email,
      phone,
      interest,
      desired_timeframe,
      message,
      consent_privacy,
      consent_contact,
      company,
      source,
      lang,
    } = body;

    // 1. Anti-Spam: Honeypot. Bots fuellen dieses unsichtbare Feld aus.
    if (company) {
      return res.status(200).json({ ok: true });
    }

    // 2. Pflichtfelder
    if (!first_name || !last_name || !email || !interest || !consent_privacy) {
      return res.status(400).json({ error: "Bitte fuellen Sie alle Pflichtfelder aus." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ error: "Bitte geben Sie eine gueltige E-Mail-Adresse ein." });
    }

    // 3. Sprache pruefen, im Zweifel Deutsch
    const cleanLang = String(lang || "").toLowerCase().slice(0, 2);
    const finalLang = SUPPORTED_LANGS.includes(cleanLang) ? cleanLang : "de";

    if (!process.env.WAITLIST_WEBHOOK_URL || !process.env.WAITLIST_WEBHOOK_SECRET) {
      console.error("WAITLIST_WEBHOOK_URL oder _SECRET fehlt. Anmeldung nicht gespeichert.");
      return res
        .status(500)
        .json({ error: "Serverfehler. Bitte versuchen Sie es spaeter erneut." });
    }

    const now = new Date().toISOString();
    const payload = {
      secret: process.env.WAITLIST_WEBHOOK_SECRET,
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
      lang: finalLang,
      source: source || "website_waitlist_button",
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
    console.error("Waitlist API Error:", error?.message || error);
    return res
      .status(500)
      .json({ error: "Serverfehler. Bitte versuchen Sie es spaeter erneut." });
  }
}
