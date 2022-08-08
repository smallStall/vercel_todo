import {
  Button,
  Container,
  TextField,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { SubmitHandler, useForm } from "react-hook-form";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { yupResolver } from "@hookform/resolvers/yup";
import { addTodoSchema } from "../schema/addTodoSchema";
import { useState, useCallback, useEffect } from "react";
import { Todo } from "../types/todos";
/**
 * フォームのデータ型
 * @interface FormInput
 */
interface FormInput {
  title: string;
  content?: string;
  expiration: string;
  isCompleted: boolean;
}

type Props = {
  onClose: (isOk: boolean) => void;
  open: boolean;
  todo: Todo;
};

export function UpdateTodoForm({ onClose, todo, open }: Props) {
  const [id, setId] = useState(todo.id);
  const [title, setTitle] = useState(todo.title);
  const [content, setContent] = useState(todo.content);
  const [expiration, setExpiration] = useState(todo.expiration);
  const [isCompleted, setIsCompleted] = useState(todo.is_completed);
  const [message, setMessage] = useState("");
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(addTodoSchema),
  });

  //フロント側のvalidationが通ったら実行されるコード
  const onSubmitUpdate: SubmitHandler<FormInput> = async () => {
    if (!expiration) return;
    setMessage("データを送信中です。");
    const expiry = new Date(expiration);
    expiry.setHours(9); //日にちがずれこむ可能性があるので進める
    const { error } = await supabaseClient
      .from("todos")
      .update({
        title: title,
        content: content,
        expiration: expiration,
        updated_at: new Date(),
        is_completed: isCompleted,
      })
      .eq("id", id);
    if (error) {
      setMessage(error.message);
      return;
    }
    setMessage("");
    onClose(true);
  };

  useEffect(() => {
    if (!open) return;
    setTitle(todo.title);
    setContent(todo.content);
    setExpiration(todo.expiration);
    setIsCompleted(todo.is_completed);
    setId(todo.id);
  }, [
    todo.content,
    todo.expiration,
    todo.id,
    todo.is_completed,
    todo.title,
    open,
  ]);

  return (
    <Container maxWidth="xl" sx={{ pt: 5 }}>
      <FormControl fullWidth={true} sx={{ display: "grid", gap: "1.1em" }}>
        <TextField
          required
          label="タイトル"
          InputLabelProps={{ shrink: true }}
          value={title}
          type="text"
          error={"title" in errors}
          helperText={errors.title?.message}
          {...register("title")}
          onChange={(e) => {
            setTitle(e.target.value);
            setValue("title", e.target.value);
          }}
        />
        <TextField
          label="内容"
          type="text"
          InputLabelProps={{ shrink: true }}
          value={content}
          multiline
          rows={5}
          error={"content" in errors}
          helperText={errors.content?.message}
          {...register("content")}
          onChange={(e) => {
            setContent(e.target.value);
            setValue("content", e.target.value);
          }}
        />
        <TextField
          autoFocus={true}
          InputLabelProps={{ shrink: true }}
          label="期限"
          required
          value={expiration}
          type="date"
          error={"expiratio" in errors}
          helperText={
            errors.expiration?.message?.startsWith("expiration must be")
              ? "期限を入力してください。"
              : errors.expiration?.message
          }
          {...register("expiration")}
          onChange={(e) => {
            setExpiration(e.target.value);
            setValue("expiration", e.target.value);
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isCompleted}
              onChange={(e) => {
                setIsCompleted(e.target.checked);
              }}
            />
          }
          label="完了"
        />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "5em 5em",
            gap: "3em",
            justifyContent: "right",
          }}
        >
          <Button
            variant="contained"
            color="warning"
            size="large"
            onClick={handleSubmit(onSubmitUpdate)}
          >
            削除
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit(onSubmitUpdate)}
          >
            変更
          </Button>
        </Box>
        <Typography>{message}</Typography>
      </FormControl>
    </Container>
  );
}
