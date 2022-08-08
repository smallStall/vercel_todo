import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { UpdateTodoForm } from "./UpdateTodoForm";
import { Todo } from "../types/todos";

type Props = {
  open: boolean;
  onClose: (isOk: boolean) => void;
  todo: Todo;
};

export const UpdateTodoDialog = ({ open, onClose, todo }: Props) => {
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={() => onClose(false)}
      aria-labelledby=""
      aria-describedby="TODOを更新する"
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle>TODOを更新する</DialogTitle>
      <UpdateTodoForm onClose={onClose} todo={todo} open={open} />
    </Dialog>
  );
};
