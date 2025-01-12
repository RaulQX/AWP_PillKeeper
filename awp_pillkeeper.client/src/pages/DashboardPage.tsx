import Calendar from "../components/dashboard/Calendar";
import Menu from "../components/dashboard/Menu";
import Sidebar from "../components/dashboard/Sidebar";

const DashboardPage = () => {
  return (
    <div
      style={{
        height: "95vh",
        display: "flex",
        flexDirection: "column",
        padding: "16px",
      }}
    >
      <Menu />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexGrow: 1,
          height: "calc(100vh - 96px)", // Subtract header height and padding
          flexDirection: window.innerWidth < 768 ? "column" : "row",
        }}
      >
        {/* Calendar */}
        <Calendar />

        {/* Sidebar */}
        <Sidebar />
      </div>
    </div>
  );
};

export default DashboardPage;
