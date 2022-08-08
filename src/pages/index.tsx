import type { NextPage } from "next";
import Head from "next/head";
import { Box, Button } from "@mui/material";
import NextLink from "next/link";
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
      <Box sx={{ display: "grid", placeItems: "center", gap: "1em" }}>
        <NextLink href="/signup">
          <Button>ご登録はこちら</Button>
        </NextLink>
        <NextLink href="/login">
          <Button>ログインはこちら</Button>
        </NextLink>
      </Box>
    </>
  );
}
