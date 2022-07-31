import * as yup from "yup";

/**
 * yupによるバリデーションのスキーマ
 */
 export const schema = yup.object({
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