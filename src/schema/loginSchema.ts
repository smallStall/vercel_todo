import * as yup from "yup";

/**
 * yupによるバリデーションのスキーマ
 */
export const loginSchema = yup.object({
  email: yup
    .string()
    .required("メールアドレスを入力してください。")
    .email("正しいメールアドレスを入力してください。"),
  password: yup
    .string()
    .required("パスワードを入力してください。")
    .min(8, "パスワードは8文字以上必要です。")
    .max(32, "パスワードは32文字以内でお願いします。")
    .matches(/^([A-Za-z0-9]+)$/, "パスワードに使える文字は半角英数字のみです。")
    .matches(
      /[A-Za-z]+/,
      "パスワードには１文字以上アルファベットを入れてください。"
    )
    .matches(/\d+/, "パスワードには１文字以上数字を入れてください。"),
});