import Head from "next/head";
import LoginForm from "../../components/LoginForm";


export default function Form() {
  return (
    <>
      <Head>
        <title>タスク管理アプリ | ログイン</title>
        <meta name="description" content="Next.jsによるタスク管理アプリ" />
      </Head>
      < LoginForm />
    </>
  );
}
