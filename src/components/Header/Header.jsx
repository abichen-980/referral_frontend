import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { IconButton, Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearUser } from "../../store/redux-store/slices/userSlicer";
import { setNotification } from "../../store/redux-store/slices/notificationSlicer";
import axiosInstance from "../../utils/axios";
import { Link } from "react-router-dom";

export default function Header() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    let message = "signed out successfully";
    try {
      const response = await axiosInstance.delete("/logout");
      if (response?.data?.message) {
        message = response?.data?.message;
      }
      dispatch(clearUser());
      localStorage.removeItem("token");
      dispatch(
        setNotification({
          severity: "success",
          message: message,
        })
      );
    } catch (error) {
      dispatch(
        setNotification({
          severity: "error",
          message: "something went wrong",
        })
      );
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            REFERRALS
          </Typography>

          {user.email && (
            <Tooltip title="Sign Out">
              <IconButton
                onClick={handleLogout}
                color="primary"
                sx={{
                  backgroundColor: "#f5f5f5",
                  ml: "auto",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
