import Head from "next/head";
import LoginForm from "../../components/LoginForm";
import { Typography } from "@mui/material";
import { useUser } from '@supabase/auth-helpers-react';

export default function LoginPage() {
  const {isLoading, user, error} = useUser();
  if(isLoading){
    <>
      <Typography variant="h1">読み込み中</Typography>
    </>
  }
  if(!user)
  return (
    <>
      <Head>
        <title>タスク管理アプリ | ログイン</title>
        <meta name="description" content="Next.jsによるタスク管理アプリ" />
      </Head>
      < LoginForm />
    </>
  );
  return(
    <Typography >
    TODO
  </Typography>
  )
}
