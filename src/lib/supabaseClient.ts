import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// ⚡ CRITICAL: Ensure the word 'export' is explicitly here before const!
export const supabase = createClient(supabaseUrl, supabaseAnonKey);