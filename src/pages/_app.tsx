import "../styles/globals.css";
import type { AppProps } from "next/app";
import { theme } from "./theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
/*
  セッション管理は間違えるとセキュリティ漏洩につながる部分のため、
  実装はSupabaseのヘルパー関数にお願いすることにしました。
  https://github.com/supabase-community/auth-helpers/blob/main/packages/nextjs/README.md
*/
import { UserProvider } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider supabaseClient={supabaseClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </UserProvider>
  );
}

export default MyApp;