import { Box, Typography } from "@mui/material";
import { useEventStore } from "../../stores/eventStore";
import { Scheduler } from "@aldabil/react-scheduler";

const MiniCalendar = () => {
  const events = useEventStore((state) => state.events);
  return (
    <Box sx={{ flex: "1 1 auto", paddingLeft: "16px" }}>
      <Typography
        variant="h4"
        sx={{ fontSize: "1.5rem", fontWeight: "bold" }}
        gutterBottom
        textAlign={"right"}
      >
        Calendar Overview
      </Typography>
      <Scheduler
        view="month"
        events={events}
        height={200}
        navigation={false}
        viewerExtraComponent={() => <div></div>}
        week={{
          weekDays: [2, 3, 4, 5, 6, 0, 1],
          weekStartOn: 0,
          startHour: 0,
          endHour: 23,
          step: 30,
        }}
        editable={false}
        draggable={false}
      />
    </Box>
  );
};

export default MiniCalendar;
