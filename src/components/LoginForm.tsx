import { Button, Container, TextField, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { SubmitHandler, useForm } from "react-hook-form";
import { supabaseClient } from "../libs/supabaseClient";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../schema/loginSchema";
import { useRouter } from "next/router";
import { useState } from "react";

/**
 * ユーザーログインフォームのデータ型
 * @interface FormInput
 */
interface FormInput {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const [loginError, setLoginError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(loginSchema),
  });

  //フロント側のvalidationが通ったら実行されるコード
  //signUpと違い、こちらはテーブルを書き換えることはないため、
  //クライアント側からsupabaseを呼び出すことにしました。
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const {error} = await supabaseClient.auth.api.signInWithEmail(data.email, data.password);
    if (error) {
      setLoginError(error.message);
    } else {
      router.replace("/auth/todo");
    }
  };
  return (
    <>
      <Container maxWidth="sm" sx={{ pt: 5 }}>
        <FormControl fullWidth={true} sx={{ display: "grid", gap: "1.1em" }}>
          <Typography variant='h1'>ログインはこちら</Typography>
          <TextField
            required
            defaultValue="gmail.com"
            label="メールアドレス"
            type="email"
            error={"email" in errors}
            helperText={errors.email?.message}
            {...register("email")}
          />
          <TextField
            required
            label="パスワード"
            type="password"
            error={"password" in errors}
            helperText={errors.password?.message}
            {...register("password")}
          />
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={handleSubmit(onSubmit)}
          >
            ログイン
          </Button>
          <Typography>{loginError}</Typography>
        </FormControl>
      </Container>{" "}
    </>
  );
}
