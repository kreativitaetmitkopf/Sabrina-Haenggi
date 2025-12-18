import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '../../../lib/supabase';
import fs from 'fs';
import path from 'path';
import { cwd } from 'process';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    return new NextResponse('Token fehlt', { status: 400 });
  }

  const supabaseAdmin = getSupabaseAdmin();

  // 1. Token prüfen
  const { data: tokenRecord, error } = await supabaseAdmin
    .from('download_tokens')
    .select('*')
    .eq('token', token)
    .single();

  if (error || !tokenRecord) {
    return new NextResponse('Ungültiger oder abgelaufener Link.', { status: 403 });
  }

  // 2. Ablauf prüfen
  if (new Date(tokenRecord.expires_at) < new Date()) {
    return new NextResponse('Dieser Link ist abgelaufen.', { status: 410 });
  }

  // 3. Als benutzt markieren (Optional: Wenn One-Time-Download gewünscht ist)
  // Wir lassen es hier offen für Refreshes, könnten aber used_at setzen.
  await supabaseAdmin
    .from('download_tokens')
    .update({ used_at: new Date().toISOString() })
    .eq('id', tokenRecord.id);

  // 4. Datei lesen
  const filePath = path.join(cwd(), 'public', 'pdfs', tokenRecord.pdf_filename);

  if (!fs.existsSync(filePath)) {
    console.error(`File missing: ${filePath}`);
    return new NextResponse('Datei nicht gefunden. Bitte kontaktieren Sie den Support.', { status: 404 });
  }

  // 5. Datei streamen
  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${tokenRecord.pdf_filename}"`,
      // Verhindert Caching, damit Token-Prüfung immer greift
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}