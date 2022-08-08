import { Button, Container, TextField, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { SubmitHandler, useForm } from "react-hook-form";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../schema/loginSchema";
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
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(loginSchema),
  });

  //フロント側のvalidationが通ったら実行されるコード
  //signUpと違い、こちらはテーブルを書き換えることはないため、
  //クライアント側から直接supabaseを呼び出すことにしました。
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    setMessage("データを送信中です。")
    const { error } = await supabaseClient.auth.signIn({
      email: data.email,
      password: data.password,
    });
    if (error) {
      setMessage(error.message);
    }else{
      setMessage("");
    }
  };
  return (
    <>
      <Container maxWidth="sm" sx={{ pt: 5 }}>
        {// TODO Stackで実装するかどうか
        }
        <FormControl fullWidth={true} sx={{ display: "grid", gap: "1.1em" }}>
          <Typography variant="h1">ログインはこちら</Typography>
          <TextField
            required
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
          <Typography>{message}</Typography>
        </FormControl>
      </Container>{" "}
    </>
  );
}
