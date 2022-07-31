/*
Middelewareはキャッシュサーバー上で実行するコードです。
Next.js v12.2よりMiddlewareがstableになりました。
今回はデプロイ先がVercelということなので使わせていただきます。
AWSにおいては現在Next.js v11がサポートされていますが、そろそろv12対応になると思われます。
https://github.com/aws-amplify/amplify-hosting/issues/2343

ページの入室管理については、getServerSidePropsを使う選択肢もありますが、
コードの見通しを考え、middlewareで一括することにしました。
参照元:https://jitsu.com/blog/supabase-nextjs-middleware
*/

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  //let authResult = await getUser(req)
  if(req.nextUrl.pathname.startsWith('/auth/signup')){
    console.log('signup')
  }
  //supabaseServer.auth.api.getUser(req)
  /*
  if (authResult.error) {
    console.log("Authorization error, redirecting to login page", authResult.error)
    return NextResponse.redirect(`/?ret=${encodeURIComponent(req.nextUrl.pathname)}`)
  } else if (!authResult.user) {
    console.log("No auth user, redirecting")
    return NextResponse.redirect(`/?ret=${encodeURIComponent(req.nextUrl.pathname)}`)
  } else {
    console.log("User is found", authResult.user)
    return NextResponse.next()
  }
  */
}


/**
 * supabase.auth.api.getUserが使用できないため、URLから直にfetchして取得するgetUserを実装しています。
 * @param {NextRequest} req
 * @returns {Promise<any>}
 */
async function getUser(req: NextRequest): Promise<any> {
  let token = req.cookies.get("sb:token")
  if (!token) {
    return {
      user: null,
      data: null,
      error: "There is no supabase token in request cookies",
    }
  }
  let authRequestResult = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      APIKey: process.env.NEXT_PUBLIC_SUPABASE_KEY || "",
    },
  })

  let result = await authRequestResult.json()
  console.log("Supabase auth result", result)
  if (authRequestResult.status != 200) {
    return {
      user: null,
      data: null,
      error: `Supabase auth returned ${authRequestResult.status}. See logs for details`,
    }
  } else if (result.aud === "authenticated") {
    return {
      user: result,
      data: result,
      error: null,
    }
  }
}