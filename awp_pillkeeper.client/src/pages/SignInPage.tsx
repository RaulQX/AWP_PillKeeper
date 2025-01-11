import { Box, Button, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import logo from "/logo.jpg";

const SignInPage = () => {
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
      <Button
        variant="contained"
        startIcon={<GoogleIcon sx={{ fontSize: 24 }} />}
        size="large"
        sx={{
          backgroundColor: "#805aab",
          "&:hover": {
            backgroundColor: "#c2a3d0",
          },
          fontSize: "1.2rem",
          padding: "12px 24px",
          borderRadius: "8px",
        }}
      >
        Sign in with Google
      </Button>
    </Box>
  );
};

export default SignInPage;
