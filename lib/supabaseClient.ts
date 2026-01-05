import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Helpful error early (so build tells you what's missing)
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase env vars. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
}

// Create ONE client (reused everywhere)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Some pages may import getSupabase — keep it working
export function getSupabase() {
  return supabase;
}
	
