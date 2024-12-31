import {
  TextField,
  Button,
  Box,
  Container,
  CircularProgress,
} from "@mui/material";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setNotification } from "../../store/redux-store/slices/notificationSlicer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import axiosInstance from "../../utils/axios";

const referralValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

export default function NewReferralForm({ addNewReferral }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm({
    resolver: yupResolver(referralValidationSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/api/v1/referrals", {
        referral: data,
      });
      addNewReferral(response.data);

      // Show success notification
      dispatch(
        setNotification({
          severity: "success",
          message: "New referral has been added",
        })
      );

      // Clear form fields
      reset();
    } catch (error) {
      const fieldError = error.response?.data?.errors?.[0];
      if (fieldError) {
        setError(fieldError.field, {
          type: "manual",
          message: fieldError.message,
        });
      }

      // Show error notification
      dispatch(
        setNotification({
          severity: "error",
          message: "Failed to add new referral",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <h3>New Referral</h3>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: 2,
          p: 3,
          border: "1px solid #ddd",
          borderRadius: 2,
          backgroundColor: "#fff",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            sx={{ marginBottom: "16px" }}
            {...register("email", {
              onChange: (e) => {
                if (e.target.value === "") {
                  clearErrors("email");
                }
              },
            })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
          />

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
              "Send"
            )}
          </Button>
        </form>
      </Box>
    </Container>
  );
}
