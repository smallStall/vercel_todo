import { Button, Container, TextField, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { SubmitHandler, useForm } from "react-hook-form";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { yupResolver } from "@hookform/resolvers/yup";
import { todoSchema } from "../schema/todoSchema";
import { useState, useRef } from "react";
import { useUser } from "@supabase/auth-helpers-react";

/**
 * フォームのデータ型
 * @interface FormInput
 */
interface FormInput {
  title: string;
  content: string;
  expiration: Date;
}

type Props = {
  onClose: (isOk: boolean) => void;
};

export function InsertTodoForm({ onClose }: Props) {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);
  const { user } = useUser();
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(todoSchema),
  });

  //フロント側のvalidationが通ったら実行されるコード
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    if (!user) return;
    setMessage("データを送信中です。");
    data.expiration.setHours(9); //日にちがずれこむ可能性があるので進める
    const { error } = await supabaseClient.from("todos").insert(
      [
        {
          title: data.title,
          content: data.content,
          expiration: data.expiration,
          user_id: user.id,
        },
      ],
      { returning: "minimal" }
    );
    if (error) {
      setMessage(error.message);
      return;
    }
    setMessage("");
    if (titleRef.current) titleRef.current.value = "";
    if (contentRef.current) contentRef.current.value = "";
    onClose(true);
  };

  return (
    <Container maxWidth="xl" sx={{ pt: 5 }}>
      <FormControl fullWidth={true} sx={{ display: "grid", gap: "1.1em" }}>
        <TextField
          inputRef={titleRef}
          required
          label="タイトル"
          type="text"
          error={"title" in errors}
          helperText={errors.title?.message}
          {...register("title")}
        />
        <TextField
          inputRef={contentRef}
          label="内容"
          type="text"
          multiline
          rows={5}
          error={"content" in errors}
          helperText={errors.content?.message}
          {...register("content")}
        />
        <TextField
          InputLabelProps={{ shrink: true }}
          label="期限"
          required
          type="date"
          error={"expiration" in errors}
          helperText={
            errors.expiration?.message?.startsWith("expiration must be")
              ? "期限を入力してください。"
              : errors.expiration?.message
          }
          {...register("expiration")}
        />
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={handleSubmit(onSubmit)}
        >
          追加
        </Button>
        <Typography>{message}</Typography>
      </FormControl>
    </Container>
  );
}
