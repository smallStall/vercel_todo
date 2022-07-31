import { Button, Container, TextField, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../schema/signupSchema";
import { useRouter } from "next/router";
import { useState } from "react";

/**
 * ユーザー登録フォームのデータ型
 * @interface FormInput
 */
interface FormInput {
  email: string;
  handleName: string;
  password: string;
  confirmPassword: string;
}

export default function SignupForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(schema),
  });

  //フロント側のvalidationが通ったら実行されるコード
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(data),
    });
    if (res.status === 200) {
      router.replace("/auth/sentmail");
    } else {
      const { error } = await res.json();
      console.log(error);
      setServerError(error);
    }
  };
  return (
    <>
      <Container maxWidth="sm" sx={{ pt: 5 }}>
        <FormControl fullWidth={true} sx={{ display: "grid", gap: "1em" }}>
          <TextField
            defaultValue="a"
            required
            label="ハンドルネーム"
            error={"handleName" in errors}
            helperText={errors.handleName?.message}
            {
              ...register("handleName") /*
              arg: Template Literal Typesを利用して引数の型を推論している。https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html
              registerの説明: https://react-hook-form.com/api/useform/register/
              */
            }
          />
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
          <TextField
            required
            label="パスワードの確認"
            type="password"
            error={"confirmPassword" in errors}
            helperText={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={handleSubmit(onSubmit)}
          >
            作成
          </Button>
          <Typography>{serverError}</Typography>
        </FormControl>
      </Container>{" "}
    </>
  );
}
