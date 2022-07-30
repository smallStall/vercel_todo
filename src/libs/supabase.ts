import { createClient } from "@supabase/supabase-js"

export function getSupabase() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_KEY) {
    throw new Error('supabaseのURLとanonキーが.envにセットされていません。')
  }
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY)
}

export const supabase = getSupabase();