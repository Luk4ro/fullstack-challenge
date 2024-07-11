import { FullScreenImageDialogProps } from "./types";
import { Dialog } from "@mui/material";

const styles = {
  dialogPaper: {
    minHeight: "80vh",
    maxHeight: "80vh",
  },
};

const FullScreenImageDialog = ({
  onClose,
  open,
  children,
}: FullScreenImageDialogProps) => {
  return (
    <Dialog
      onClose={onClose}
      open={open}
      sx={{
        padding: "24px",
      }}
      PaperProps={{
        style: { width: "100%" },
      }}
    >
      {children}
    </Dialog>
  );
};

export default FullScreenImageDialog;
