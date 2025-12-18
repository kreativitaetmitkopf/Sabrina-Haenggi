import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '../../../lib/supabase';
import { getMagnetBySlug } from '../../../lib/magnets';
import { Resend } from 'resend';
import { randomUUID } from 'crypto';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, magnetSlug, honeypot } = body;

    // 1. Validierung & Spam Schutz
    if (honeypot) {
      // Silent fail für Bots
      return NextResponse.json({ ok: true });
    }

    if (!email || !email.includes('@') || !magnetSlug) {
      return NextResponse.json({ error: 'Ungültige Eingabe' }, { status: 400 });
    }

    const magnet = getMagnetBySlug(magnetSlug);
    if (!magnet) {
      return NextResponse.json({ error: 'Download nicht gefunden' }, { status: 404 });
    }

    const supabaseAdmin = getSupabaseAdmin();

    // 2. Lead Speichern
    const { data: leadData, error: leadError } = await supabaseAdmin
      .from('leads')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        magnet_slug: magnetSlug,
        consent: true,
        user_agent: req.headers.get('user-agent'),
      })
      .select('id')
      .single();

    if (leadError) {
      console.error('Supabase Error:', leadError);
      throw new Error('Datenbank Fehler');
    }

    // 3. Download Token generieren (Gültig für 30 Minuten)
    const token = randomUUID();
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();

    const { error: tokenError } = await supabaseAdmin
      .from('download_tokens')
      .insert({
        token,
        lead_id: leadData.id,
        magnet_slug: magnetSlug,
        pdf_filename: magnet.fileName,
        expires_at: expiresAt
      });

    if (tokenError) {
      console.error('Token Error:', tokenError);
      throw new Error('Token Erstellung fehlgeschlagen');
    }

    // 4. Download URL konstruieren
    const downloadUrl = `/api/dl?token=${token}`;

    // 5. Optional: E-Mail via Resend (Non-Blocking)
    // Wir warten nicht auf das Ergebnis, damit der Download für den User sofort startet.
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sabrinahaenggi.com';
      const absoluteDownloadUrl = `${siteUrl}${downloadUrl}`;

      resend.emails.send({
        from: 'Sabrina Hänggi <downloads@sabrinahaenggi.com>',
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
      }).catch(e => console.error('Resend Error:', e));
    }

    return NextResponse.json({ ok: true, downloadUrl });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Interner Server Fehler' }, { status: 500 });
  }
}
