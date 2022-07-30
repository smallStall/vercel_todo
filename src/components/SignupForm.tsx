import { Button, Container, Stack, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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

/**
 * yupによるバリデーションのスキーマ
 */
const schema = yup.object({
  email: yup
    .string()
    .required("メールアドレスを入力してください。")
    .email("正しいメールアドレスを入力してください。"),
  handleName: yup.string().required("ハンドルネームは必須です。"),
  password: yup
    .string()
    .required("パスワードを入力してください。")
    .min(8, "パスワードは8文字以上必要です")
    .matches(/^([A-Za-z0-9]+)$/, "パスワードに使える文字は半角英数字のみです。")
    .matches(
      /[A-Za-z]+/,
      "パスワードには１文字以上アルファベットを入れてください。"
    )
    .matches(/\d+/, "パスワードには１文字以上数字を入れてください。"),
  confirmPassword: yup
    .string()
    .required("パスワードの確認を入力してください。")
    .oneOf(
      [yup.ref("password"), null],
      "パスワードとパスワードの確認が一致しません。ご確認ください。"
    ),
});

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log(data);
  };
  return (
    <>
      <Container maxWidth="sm" sx={{ pt: 5 }}>
        <Stack spacing={3}>
          <TextField
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
        </Stack>
      </Container>{" "}
    </>
  );
}
