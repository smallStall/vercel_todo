import Head from "next/head";
import LoginForm from "../components/LoginForm";
import { Typography } from "@mui/material";
import { useUser } from "@supabase/auth-helpers-react";
import TodoTable from "../components/TodoTable";

const MAX_SELECT_NUM = 99;

export default function LoginPage() {
  const { isLoading, user, error } = useUser();

  if (error) {
    //TODO どういうエラーが出る？
    return <Typography>{error.message}</Typography>;
  }
  if (isLoading) return null; //load中の場合
  if (!user)  //userがいない場合
    return (
      <>
        <Head>
          <title>タスク管理アプリ | ログイン</title>
          <meta name="description" content="Next.jsによるタスク管理アプリ" />
        </Head>
        <LoginForm />
      </>
    );
  return <TodoTable />; //userがいた場合
}
