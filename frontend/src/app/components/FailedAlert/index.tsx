"use client";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

type FailAlertProps = {
  open: boolean;
  onClose: () => void;
  message?: string;
};

export default function FailAlert({ open, onClose, message }: FailAlertProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={1500}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
