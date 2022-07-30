import { Button, Container, Stack, TextField } from "@mui/material";
import { SubmitHandler, useForm } from 'react-hook-form'

// フォームの型
interface FormInput {
  email: string
  name: string
  password: string
  confirmation: string
}

export default function SignupForm() {
  const { register, handleSubmit } = useForm<FormInput>();
  return (
    <>
      <Container maxWidth="sm" sx={{ pt: 5 }}>
        <Stack spacing={3}>
          <TextField required label="ハンドルネーム" />
          <TextField required label="メールアドレス" type="email" />
          <TextField required label="パスワード" type="password" />
          <TextField required label="パスワードの確認" type="password" />
          <Button color="primary" variant="contained" size="large">
            作成
          </Button>
        </Stack>
      </Container>{" "}
    </>
  );
}
