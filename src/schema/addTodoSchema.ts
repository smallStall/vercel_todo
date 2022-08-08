import * as yup from "yup";

/**
 * yupによるバリデーションのスキーマ
 */
export const addTodoSchema = yup.object({
  title: yup
    .string()
    .required("タイトルを入力してください。")
    .max(64, "64文字以内でお願いします"),
  content: yup
    .string()
    .nullable()
    .max(512, "512文字以内でお願いします。"),
  expiration: yup
    .date().nullable(),
});