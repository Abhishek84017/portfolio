import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client. Keys are deliberately NOT prefixed with
 * NEXT_PUBLIC_, so they never reach the browser bundle. The anon role can
 * only INSERT into contact_messages (see supabase/migrations) — it cannot
 * read anything back.
 */
export function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
