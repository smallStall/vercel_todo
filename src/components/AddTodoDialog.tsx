import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import { AddTodoForm} from "../components/AddTodoForm";

type Props = {
  open: boolean;
  onClose: (isOk: boolean) => void;
};

export const AddTodoDialog = ({ open, onClose }: Props) => {
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
      <AddTodoForm onClose={onClose}/>
    </Dialog>
  );
};
