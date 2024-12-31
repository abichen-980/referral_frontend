import Alert from "@mui/material/Alert";

export default function AppAlert({ severity, text }) {
  return (
    <Alert
      variant="outlined"
      severity={severity}
      sx={{
        borderWidth: "1px",
        borderRadius: "4px",
        textTransform: "lowercase",
        marginBottom: "16px",
        backgroundColor: "#ffe6e6",
        padding: "0px 10px",
      }}
    >
      {text}
    </Alert>
  );
}
