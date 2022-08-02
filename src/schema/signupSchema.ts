import * as yup from "yup";
import { loginSchema } from "./loginSchema";

/**
 * yupによるバリデーションのスキーマ
 */
const onlySignupSchema = yup.object({
  handleName: yup.string().required("ハンドルネームは必須です。").max(14, "ハンドルネームは14文字以内でお願いします。"),
  confirmPassword: yup
    .string()
    .required("パスワードの確認を入力してください。")
    .oneOf(
      [yup.ref("password"), null],
      "パスワードとパスワードの確認が一致しません。ご確認ください。"
    ),
});

//concatによってschema同士をmergeする
//https://github.com/jquense/yup#objectconcatschemab-objectschema-objectschema
export const signupSchema = loginSchema.concat(onlySignupSchema);