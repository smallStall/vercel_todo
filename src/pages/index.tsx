import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return <Form />;
};

export default Home;


function Form() {
  return (
    <>
      <Head>
        <title>タスク管理アプリ</title>
        <meta name="description" content="Next.jsによるタスク管理アプリ" />
        <link rel="icon" href="/favicon.ico" />
      </Head>      
    </>
  );
}
