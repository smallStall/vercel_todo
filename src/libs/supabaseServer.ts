import { createClient } from "@supabase/supabase-js"

export function getSupabase() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('supabaseのURLとanonキーが.envにセットされていません。')
  }
  // cross-fetch問題があるため、念のためブラウザやnode環境以外ならfetchを組み替えるように
  // MiddlewareはおそらくCloudflare Workers環境
  // https://github.com/supabase/supabase-js#custom-fetch-implementation
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { fetch: (...args) => fetch(...args) })
}

export const supabaseServer = getSupabase();