import { Container } from "@mui/material";
import { useState } from "react";
import useFormSubmit from "../../hooks/useFormSubmit";
import ReusableForm from "../ReusableForm/ReusableForm";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setNotification } from "../../store/redux-store/slices/notificationSlicer";
import { useNavigate } from "react-router-dom";

const signUpValidationSchema = Yup.object({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const FIELDS = [
  {
    name: "first_name",
    label: "First Name",
    validation: { required: "First name is required" },
  },
  {
    name: "last_name",
    label: "Last Name",
    validation: { required: "Last name is required" },
  },
  {
    name: "email",
    label: "Email",
    validation: { required: "Email is required" },
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    validation: { required: "Password is required" },
  },
];

export default function SignUpForm({ token }) {
  const [fieldErrors, setFieldErrors] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, submitForm } = useFormSubmit(
    "/signup",
    () => handleSignUp(),
    (response) => handleSignUpErrors(response)
  );

  function handleSignUpErrors(response) {
    let errorMessage = "sign up failed";
    if (response?.data?.error) {
      errorMessage = response?.data?.error;
    }
    if (response === null || response === undefined) {
      errorMessage = "Something went wrong, please try later";
    }
    dispatch(
      setNotification({
        severity: "error",
        message: errorMessage,
      })
    );
    setFieldErrors(response?.data?.errors || []);
    navigate("/");
  }

  function handleSignUp() {
    navigate("/");
    dispatch(
      setNotification({
        severity: "success",
        message: "signed up successfully",
      })
    );
  }

  return (
    <Container maxWidth="xs">
      <ReusableForm
        fields={FIELDS}
        validationSchema={signUpValidationSchema}
        onSubmit={submitForm}
        loading={loading}
        fieldErrors={fieldErrors}
      />
    </Container>
  );
}
