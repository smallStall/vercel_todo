import { Typography, Container, Stack } from "@mui/material";

export default function SentMail() {
  return (
    <Container maxWidth="sm" sx={{ pt: 5 }}>
      <Stack alignItems="center">
        <Typography sx={{ fontSize: "5em" }}>📨</Typography>
        <Typography>
          ご入力いただいたメールアドレスにメールを送信しました。
        </Typography>
      </Stack>
    </Container>
  );
}
