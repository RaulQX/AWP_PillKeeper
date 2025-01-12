import TodaysMedicines from "./TodaysMedicines";
import TommorowsMedicines from "./TommorowsMedicines";
import MiniCalendar from "./MiniCalendar";
import { Divider } from "@mui/material";

const Sidebar = () => {
  return (
    <div
      style={{
        width: window.innerWidth < 768 ? "100%" : "30%",
        height: window.innerWidth < 768 ? "50%" : "100%",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      {/* Today's Medicines */}
      <TodaysMedicines />

      <Divider />

      {/* Tomorrow's Medicines */}
      <TommorowsMedicines />

      <Divider />

      {/* Mini Calendar */}
      <MiniCalendar />
    </div>
  );
};

export default Sidebar;
