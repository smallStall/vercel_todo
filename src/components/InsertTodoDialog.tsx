import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { InsertTodoForm} from "./InsertTodoForm";

type Props = {
  open: boolean;
  onClose: (isOk: boolean) => void;
};

export const InsertTodoDialog = ({ open, onClose }: Props) => {
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={() => onClose(false)}
      aria-labelledby=""
      aria-describedby="TODOを追加する"
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle>TODOを追加する</DialogTitle>
      <InsertTodoForm onClose={onClose}/>
    </Dialog>
  );
};
