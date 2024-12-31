import { useState, useEffect } from "react";
import { Alert, Snackbar, Slide } from "@mui/material";
import { useDispatch } from "react-redux";
import { clearNotification } from "../../store/redux-store/slices/notificationSlicer";

export default function AppNotification({
  severity = "info",
  message = "This is an alert!",
}) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleClose();
    }, 4000);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleClose = () => {
    setOpen(false);

    const timeoutId = setTimeout(() => {
      dispatch(clearNotification());
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  };

  function SlideTransition(props) {
    return <Slide {...props} direction="down" />;
  }

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      TransitionComponent={SlideTransition}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{ position: "fixed", zIndex: 1400 }}
    >
      <Alert
        severity={severity}
        onClose={handleClose}
        sx={{
          width: "100%",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
