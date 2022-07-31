import { Typography, Container } from "@mui/material";

export default function SentMail() {
  return (
    <Container maxWidth="sm" sx={{ pt: 5 }}>
      <Typography>
        ご入力いただいたメールアドレスにメールを送信しました。
      </Typography>
    </Container>
  );
};
