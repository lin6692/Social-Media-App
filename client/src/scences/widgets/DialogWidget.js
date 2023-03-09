import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const DialogWidget = ({
  open,
  handleDialogCallback,
  title = "",
  context = "",
  button = "",
}) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleDialogCallback}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {context}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogCallback} autoFocus>
            {button}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogWidget;
