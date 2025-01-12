import { Box, Typography } from "@mui/material";
import logo from "/logo.jpg";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../contexts/UserContext";

interface GoogleJwtPayload extends JwtPayload {
  name: string;
  email: string;
  picture: string;
}

const SignInPage = () => {
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useUser();
  if (redirect) {
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
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          if (credentialResponse.credential) {
            const credentialsDecoded = jwtDecode<GoogleJwtPayload>(
              credentialResponse.credential
            );
            setUser({
              name: credentialsDecoded.name,
              email: credentialsDecoded.email,
              image: credentialsDecoded.picture,
            });
            setRedirect(true);
          }
        }}
        onError={() => {
          console.log("Error login");
        }}
      />
    </Box>
  );
};

export default SignInPage;
