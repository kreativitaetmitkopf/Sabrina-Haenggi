import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Client für Client-Side Operations (falls benötigt, hier aktuell nicht genutzt)
let supabaseClient: SupabaseClient | null = null;
export const getSupabase = () => {
  if (!supabaseClient) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';
    if (!url || !key) {
      console.warn('Supabase Environment Variables missing (URL or ANON_KEY)');
    }
    // We still instantiate it but check first to avoid crash if totally missing and not actually used
    supabaseClient = createClient(Object.keys(url).length ? url : 'https://placeholder.supabase.co', Object.keys(key).length ? key : 'placeholder');
  }
  return supabaseClient;
};

// Admin Client für API Routes (Bypass RLS für Token Generierung & Lead Speicherung)
export const getSupabaseAdmin = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error('Supabase Environment Variables missing (URL or SERVICE_KEY)');
  }

  return createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};
