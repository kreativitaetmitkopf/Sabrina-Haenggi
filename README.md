# Sabrina Hänggi - Pflege Lanzarote Website

## 🚀 Setup & Environment

### Environment Variables
Erstellen Sie eine `.env.local` Datei im Hauptverzeichnis:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-DO-NOT-EXPOSE-CLIENT-SIDE

# Resend (Optional für E-Mails)
RESEND_API_KEY=re_123456789
```

### Datenbank Setup (Supabase SQL)
Führen Sie dieses SQL im Supabase SQL Editor aus, um die Tabellen zu erstellen:

```sql
-- Leads Tabelle
create table public.leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  email text not null,
  phone text,
  first_name text,
  last_name text,
  consent boolean default false,
  magnet_slug text not null,
  ip text,
  user_agent text
);

-- Download Tokens (für sichere One-Time Links)
create table public.download_tokens (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  token text unique not null,
  lead_id uuid references public.leads(id),
  magnet_slug text not null,
  pdf_filename text not null,
  expires_at timestamp with time zone not null,
  used_at timestamp with time zone
);

-- Row Level Security (RLS)
alter table public.leads enable row level security;
alter table public.download_tokens enable row level security;

-- Erlaubt anonymen Insert (vom Frontend Formular via API)
create policy "Enable insert for anon" on public.leads for insert with check (true);
-- Select nur für Service Role (API Route) erlaubt, daher keine Select Policy für anon nötig.
```

## 🏗 Projektstruktur

- **`/app/api`**: Server-Side Logik für Leads und Downloads.
- **`/public/pdfs`**: Speicherort der PDF Dateien.

## Troubleshooting Downloads
Sollte der Download fehlschlagen:
1. Prüfen, ob `SUPABASE_SERVICE_ROLE_KEY` in Vercel gesetzt ist.
2. Prüfen, ob die PDF-Dateien exakt so heißen wie in `lib/magnets.ts` definiert.
3. Logs in Vercel prüfen (Function Logs).
