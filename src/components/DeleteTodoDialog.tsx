import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import { Typography } from "@mui/material";

type Props = {
  open: boolean;
  onClose: (isOk: boolean) => void;
};

export const DeleteTodoDialog = ({ open, onClose }: Props) => {
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={() => onClose(false)}
      aria-labelledby=""
      aria-describedby="TODOを削除する"
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle sx={{ fontSize: "1.1em" }}>
        TODOを削除してよろしいですか？
      </DialogTitle>
      <DialogActions>
        <Button
          onClick={() => {
            onClose(true);
          }}
          variant="contained"
          color="warning"
        >
          削除
        </Button>

        <Button
          onClick={() => {
            onClose(false);
          }}
          color="primary"
        >
          キャンセル
        </Button>
      </DialogActions>
    </Dialog>
  );
};
