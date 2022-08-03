import { handleAuth } from '@supabase/auth-helpers-nextjs';

export default handleAuth({
  logout: { returnTo: '/auth/login' },
  cookieOptions: { lifetime: 7 * 24 * 60 * 60 } // Keep the user logged in for a week.
});

/*
handleAuth()を実行すると、認証フローのさまざまな部分を実行する以下のルートハンドラが作成されます。

・/api/auth/callback: UserProvider は、クライアント側で onAuthStateChange が発生するたびに、ここにセッションの詳細を転送します。これは、SSRがシームレスに動作するように、アプリケーションのクッキーをセットアップするために必要です。
・/api/auth/user: ユーザープロファイル情報をJSON形式で取得することができます。
・/api/auth/logout: Next.jsアプリケーションがユーザーをログアウトさせます。オプションでreturnToパラメータを渡すと、ログアウト後にカスタム相対URLに戻ることができます（例： /api/auth/logout?returnTo=/login. これは、handleAuth() に指定されたログアウト時の returnTo オプションを上書きします。
*/