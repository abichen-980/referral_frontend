import { Container } from "@mui/material";
import useFormSubmit from "../../hooks/useFormSubmit";
import ReusableForm from "../ReusableForm/ReusableForm";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setNotification } from "../../store/redux-store/slices/notificationSlicer";

const FIELDS = [
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

const signInValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function SignInForm() {
  const dispatch = useDispatch();

  const handleSignIn = () => {
    dispatch(
      setNotification({
        severity: "success",
        message: "signed in successfully",
      })
    );
  };

  const handleSignInError = (response) => {
    let errorMessage = "sign in failed";
    if (response?.data?.error) {
      errorMessage = response.data?.error;
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
  };

  const { loading, submitForm } = useFormSubmit(
    "/login",
    () => handleSignIn(),
    (response) => handleSignInError(response)
  );

  return (
    <Container maxWidth="xs">
      <ReusableForm
        fields={FIELDS}
        validationSchema={signInValidationSchema}
        onSubmit={submitForm}
        loading={loading}
      />
    </Container>
  );
}
