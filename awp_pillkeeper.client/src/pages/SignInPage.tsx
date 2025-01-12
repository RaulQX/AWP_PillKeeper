import { Box, Typography } from "@mui/material";
import logo from "/logo.jpg";
import { GoogleLogin } from "@react-oauth/google";
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { useGoogleAuth } from "../hooks/useGoogleAuth";

const SignInPage = () => {
  const { user } = useUser();
  const googleAuth = useGoogleAuth();

  if (user) {
    console.log("User exists, redirecting to dashboard");
    return <Navigate to="/dashboard" />;
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        backgroundColor: "#e2e0ea",
      }}
    >
      <Box
        component="img"
        src={logo}
        alt="logo"
        sx={{ width: "128px", borderRadius: 3, marginBottom: 3 }}
      />
      <Typography variant="h3" gutterBottom sx={{ fontSize: "2.5rem" }}>
        Welcome to PillKeeper
      </Typography>
      {googleAuth.isError && (
        <Typography color="error">
          Error: {googleAuth.error?.message}
        </Typography>
      )}
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log("Google login success");
          googleAuth.mutate(credentialResponse);
        }}
        onError={() => {
          console.error("Google login failed");
        }}
      />
    </Box>
  );
};

export default SignInPage;
