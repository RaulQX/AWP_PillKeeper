import { Box, Avatar } from "@mui/material";
import logo from "/logo.jpg";

const Menu = () => {
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
      <Avatar alt="Remy Sharp" sx={{ width: 48, height: 48 }} />
    </div>
  );
};

export default Menu;
