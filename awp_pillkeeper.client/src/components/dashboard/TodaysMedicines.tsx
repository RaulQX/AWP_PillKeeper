import {
  Box,
  Typography,
  Grid,
  ListItem,
  ListItemText,
  Checkbox,
} from "@mui/material";
import { useEventStore } from "../../stores/eventStore";

const TodaysMedicines = () => {
  const events = useEventStore((state) => state.events);
  const todaysMeds = [
    { name: "Paracetamol", time: new Date().setHours(8, 0), taken: false },
    { name: "Vitamin D", time: new Date().setHours(9, 0), taken: true },
    { name: "Iron Supplement", time: new Date().setHours(10, 0), taken: false },
    { name: "Nurofen", time: new Date().setHours(12, 0), taken: false },
    { name: "Vitamin B12", time: new Date().setHours(22, 0), taken: false },
    { name: "Magnesium", time: new Date().setHours(20, 0), taken: false },
  ];

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

  return (
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
                onChange={(e) => handleMedicineCheck(index, e.target.checked)}
              />
              <ListItemText
                primary={med.name}
                secondary={new Date(med.time).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
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
  );
};

export default TodaysMedicines;
