import { Box, Typography } from "@mui/material";
import logo from "/logo.jpg";
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "16px",
      }}
    >
      <Box
        component="img"
        src={logo}
        alt="logo"
        sx={{ width: "48px", borderRadius: 3 }}
      />
      <Typography
        variant="h3"
        gutterBottom
        sx={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0px" }}
      >
        Hello, {user?.name}
      </Typography>
      <img
        alt={user?.name || "User"}
        src={user?.image}
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          objectFit: "cover",
          cursor: "pointer",
        }}
        onClick={handleLogout}
      />
    </div>
  );
};

export default Menu;
