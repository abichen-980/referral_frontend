import { useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import SignInForm from "../../components/SignInForm/SignInForm.jsx";
import SignUpForm from "../../components/SignUpForm/SignUpForm.jsx";
import { useLocation } from "react-router-dom";

const TabContent = ({ children }) => (
  <Typography component="div" sx={{ padding: 3 }}>
    {children}
  </Typography>
);

const AuthTabs = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tab = queryParams.get("tab");
  let tabValue = 0;
  if (tab && tab === "sign_up") {
    tabValue = 1;
  }

  const [value, setValue] = useState(tabValue);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        marginTop: "100px",
      }}
    >
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Sign In" />
        <Tab label="Sign Up" />
      </Tabs>
      {value === 0 && (
        <TabContent>
          <SignInForm />
        </TabContent>
      )}
      {value === 1 && (
        <TabContent>
          <SignUpForm />
        </TabContent>
      )}
    </Box>
  );
};

export default AuthTabs;
