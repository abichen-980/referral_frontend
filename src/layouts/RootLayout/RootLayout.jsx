import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import AppNotification from "../../components/utils/AppNotification.jsx";

export default function RootLayout() {
  const notification = useSelector((state) => state.notification);

  return (
    <>
      <Header />
      <Container maxWidth="xl">
        {notification.message && (
          <AppNotification
            message={notification.message}
            severity={notification.severity}
          />
        )}
        <Outlet />
      </Container>
    </>
  );
}
