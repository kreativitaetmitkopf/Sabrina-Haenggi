
import { NextResponse } from 'next/server';
import { isRateLimited } from '../../../lib/rateLimit';

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'anonymous';
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.' }, { status: 429 });
    }

    const body = await req.json();
    const { 
      first_name, last_name, email, phone, interest, 
      desired_timeframe, message, consent_privacy, 
      consent_contact, company, source 
    } = body;

    // 1. Anti-Spam: Honeypot Check (Feld 'company' muss leer sein)
    if (company) {
      return NextResponse.json({ ok: true }); // Silent fail für Bots
    }

    // 2. Validierung
    if (!first_name || !last_name || !email || !interest || !consent_privacy) {
      return NextResponse.json({ error: 'Bitte füllen Sie alle Pflichtfelder aus.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' }, { status: 400 });
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
      source: source || 'website_waitlist_button',
      user_agent: req.headers.get('user-agent') || 'unknown'
    };

    // 4. Forward an Google Apps Script
    const response = await fetch(process.env.WAITLIST_WEBHOOK_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-webhook-secret': process.env.WAITLIST_WEBHOOK_SECRET!
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok || !result.ok) {
      throw new Error(result.error || 'Fehler beim Speichern in der Datenbank.');
    }

    return NextResponse.json({ ok: true });

  } catch (error: any) {
    console.error('Waitlist API Error:', error);
    return NextResponse.json({ error: 'Serverfehler. Bitte versuchen Sie es später erneut.' }, { status: 500 });
  }
}
