import { TextField, Button, Box, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import AppAlert from "../utils/AppAlert.jsx";

export default function ReusableForm({
  fields,
  validationSchema,
  onSubmit,
  loading,
  formError,
  fieldErrors = [],
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (fieldErrors && fieldErrors.length > 0) {
      fieldErrors.forEach((error) => {
        setError(error.field, {
          type: "manual",
          message: error.message,
        });
      });
    }
  }, [fieldErrors, setError]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
      {formError && <AppAlert severity="error" text={formError} />}

      {fields.map((field) => (
        <TextField
          key={field.name}
          label={field.label}
          type={field.type || "text"}
          fullWidth
          sx={{ marginBottom: "16px" }}
          {...register(field.name, field.validation)}
          error={!!errors[field.name]}
          helperText={errors[field.name] ? errors[field.name].message : ""}
        />
      ))}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: "16px" }}
        disabled={loading}
      >
        {loading ? (
          <CircularProgress size={24} sx={{ color: "white" }} />
        ) : (
          "Submit"
        )}
      </Button>
    </form>
  );
}
