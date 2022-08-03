import { Typography } from "@mui/material";
import {
  User,
  withPageAuth,
  supabaseServerClient
} from '@supabase/auth-helpers-nextjs';
import Head from "next/head";

export default function Form() {
  return (
    <>
      <Head>
        <title>タスク管理アプリ</title>
      </Head>

    </>
  );
}

//https://github.com/supabase-community/auth-helpers/blob/main/packages/nextjs/src/utils/withPageAuth.ts
export const getServerSideProps = withPageAuth({
  redirectTo: '/auth/todo',
  async getServerSideProps(ctx) {
    // Run queries with RLS on the server
    const { data } = await supabaseServerClient(ctx).from('todos').select('*');
    return { props: { data } };
  }
});