import { useEffect } from "react";
import "./App.css";
import { Scheduler } from "@aldabil/react-scheduler";
import { useEventStore } from "./stores/eventStore";
import { RRule } from "rrule";
import logo from "/logo.jpg";
import {
  Box,
  Avatar,
  ListItem,
  ListItemText,
  Checkbox,
  Typography,
  Divider,
  Grid,
} from "@mui/material";
import { DayHours } from "@aldabil/react-scheduler/types";

function App() {
  const events = useEventStore((state) => state.events);
  console.log(events);
  const todaysMeds = [
    { name: "Paracetamol", time: new Date().setHours(8, 0), taken: false },
    { name: "Vitamin D", time: new Date().setHours(9, 0), taken: true },
    { name: "Iron Supplement", time: new Date().setHours(10, 0), taken: false },
    { name: "Nurofen", time: new Date().setHours(12, 0), taken: false },
    { name: "Vitamin B12", time: new Date().setHours(22, 0), taken: false },
    { name: "Magnesium", time: new Date().setHours(20, 0), taken: false },
  ];

  const tomorrowsMeds = [
    { name: "Paracetamol", time: new Date().setHours(8, 0), taken: false },
    { name: "Vitamin D", time: new Date().setHours(9, 0), taken: false },
    { name: "Iron Supplement", time: new Date().setHours(10, 0), taken: false },
    { name: "Nurofen", time: new Date().setHours(12, 0), taken: false },
    { name: "Vitamin B12", time: new Date().setHours(14, 0), taken: false },
    { name: "Magnesium", time: new Date().setHours(20, 0), taken: false },
  ];

  useEffect(() => {
    const addEvent = useEventStore.getState().addEvent;

    // Clear existing events
    useEventStore.getState().events.forEach((event) => {
      useEventStore.getState().deleteEvent(event.event_id);
    });

    // Add events for today's medicines
    todaysMeds.forEach((med, index) => {
      const medTime = new Date(med.time);
      const hours = medTime.getHours();
      const minutes = medTime.getMinutes();

      const start = new Date();
      start.setHours(hours, minutes, 0);
      start.setSeconds(0);
      start.setMilliseconds(0);

      const end = new Date(start);
      end.setMinutes(end.getMinutes() + 30);

      addEvent({
        event_id: `today-${index}`,
        title: med.name,
        start,
        end,
        recurring: new RRule({
          freq: RRule.DAILY,
          interval: 1,
          dtstart: new Date(start.getTime()),
          count: 30,
        }),
        color: med.taken ? "#A5D6A7" : "#90CAF9",
        editable: true,
        draggable: true,
      });
    });

    // Add events for tomorrow's medicines
    tomorrowsMeds.forEach((med, index) => {
      const medTime = new Date(med.time);
      const hours = medTime.getHours();
      const minutes = medTime.getMinutes();

      const start = new Date();
      start.setDate(start.getDate() + 1);
      start.setHours(hours, minutes, 0);
      start.setSeconds(0);
      start.setMilliseconds(0);

      const end = new Date(start);
      end.setMinutes(end.getMinutes() + 30);

      addEvent({
        event_id: `tomorrow-${index}`,
        title: med.name,
        start,
        end,
        recurring: new RRule({
          freq: RRule.DAILY,
          interval: 1,
          dtstart: new Date(start.getTime()),
          count: 30,
        }),
        color: "#90CAF9",
        editable: true,
        draggable: true,
      });
    });
  }, []);

  // Handler for checkbox changes
  const handleMedicineCheck = (index: number, checked: boolean) => {
    const eventId = `today-${index}`;
    const event = events.find((e) => e.event_id === eventId);
    if (event) {
      useEventStore.getState().updateEvent({
        ...event,
        color: checked ? "#A5D6A7" : "#90CAF9",
      });
    }
  };

  // Add this function to calculate the earliest event hour
  const getEarliestEventHour = () => {
    const today = new Date();
    const todayEvents = events.filter((event) => {
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === today.toDateString();
    });
    if (todayEvents.length === 0) return 12; // Default to 7 if no events

    const earliestHour = Math.min(
      ...todayEvents.map((event) => new Date(event.start).getHours())
    );

    return Math.max(earliestHour - 1, 0); // Show 1 hour before earliest event, but not before midnight
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "16px",
      }}
    >
      {/* Header */}
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

      {/* Main Content */}
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
        <div
          style={{
            width: window.innerWidth < 768 ? "100%" : "80%",
            paddingRight: window.innerWidth < 768 ? 0 : "16px",
            marginBottom: window.innerWidth < 768 ? "16px" : 0,
            height: window.innerWidth < 768 ? "100%" : "calc(100vh - 128px)",
            overflow: "scroll",
          }}
        >
          <Scheduler
            view="day"
            events={events}
            editable={true}
            draggable={true}
            onEventEdit={(event: any) => {
              useEventStore.getState().updateEvent(event);
            }}
            week={{
              weekDays: [2, 3, 4, 5, 6, 0, 1],
              weekStartOn: 0,
              startHour: 0,
              endHour: 23,
              step: 30,
            }}
            day={{
              startHour: getEarliestEventHour() as DayHours,
              endHour: 23,
              step: 60,
            }}
            navigation={true}
          />
        </div>

        {/* Sidebar */}
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
          <Box sx={{ flex: "0 0 auto" }}>
            <Typography
              variant="h6"
              sx={{ fontSize: "0.9rem", fontWeight: "bold" }}
              gutterBottom
              textAlign={"right"}
            >
              Today's Medicines
            </Typography>
            <Grid container spacing={1}>
              {todaysMeds.map((med, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <ListItem disablePadding dense>
                    <Checkbox
                      checked={med.taken}
                      size="small"
                      onChange={(e) =>
                        handleMedicineCheck(index, e.target.checked)
                      }
                    />
                    <ListItemText
                      primary={med.name}
                      secondary={new Date(med.time).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        }
                      )}
                      sx={{
                        textDecoration: med.taken ? "line-through" : "none",
                        "& .MuiListItemText-primary": { fontSize: "0.8rem" },
                        "& .MuiListItemText-secondary": { fontSize: "0.7rem" },
                      }}
                    />
                  </ListItem>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Divider />

          {/* Tomorrow's Medicines */}
          <Box sx={{ flex: "0 0 auto" }}>
            <Typography
              variant="h6"
              sx={{ fontSize: "0.9rem", fontWeight: "bold" }}
              gutterBottom
              textAlign={"right"}
            >
              Tomorrow's Medicines
            </Typography>
            <Grid container spacing={1}>
              {tomorrowsMeds.map((med, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <ListItem disablePadding dense>
                    <ListItemText
                      primary={med.name}
                      secondary={new Date(med.time).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        }
                      )}
                      sx={{
                        "& .MuiListItemText-primary": { fontSize: "0.8rem" },
                        "& .MuiListItemText-secondary": { fontSize: "0.7rem" },
                      }}
                    />
                  </ListItem>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Divider />

          {/* Mini Calendar */}
          <Box sx={{ flex: "1 1 auto" }}>
            <Typography
              variant="h6"
              sx={{ fontSize: "0.9rem", fontWeight: "bold" }}
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
        </div>
      </div>
    </div>
  );
}

export default App;
