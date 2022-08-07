import Head from "next/head";
import SignupForm from "../components/SignupForm";


export default function Form() {
  return (
    <>
      <Head>
        <title>タスク管理アプリ | ユーザー登録</title>
        <meta name="description" content="Next.jsによるタスク管理アプリ" />
      </Head>
      < SignupForm />
    </>
  );
}
