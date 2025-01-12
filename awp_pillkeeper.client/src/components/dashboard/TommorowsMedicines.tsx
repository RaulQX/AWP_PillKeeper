import { Box, Typography, Grid, ListItem, ListItemText } from "@mui/material";
import { useNotificationStore } from "../../stores/notificationStore";
import { NotificationDto } from "../../types/NotificationDto";

const TommorowsMedicines = () => {
  const notifications = useNotificationStore(
    (state: any) => state.notifications
  );
  const tomorrowsMeds = notifications
    .filter((notification: NotificationDto) => {
      const notificationDate = new Date(notification.date);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return notificationDate.toDateString() === tomorrow.toDateString();
    })
    .sort(
      (a: NotificationDto, b: NotificationDto) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );

  return (
    <Box sx={{ flex: "0 0 auto" }}>
      <Typography
        variant="h4"
        sx={{ fontSize: "1.5rem", fontWeight: "bold" }}
        gutterBottom
        textAlign={"right"}
      >
        Tomorrow's Medicines
      </Typography>
      <Box sx={{ maxHeight: "180px", overflow: "auto", overflowX: "hidden" }}>
        <Grid container spacing={1}>
          {tomorrowsMeds.map((med: NotificationDto) => (
            <Grid item xs={12} sm={6} key={med.id}>
              <ListItem disablePadding dense>
                <ListItemText
                  primary={med.title}
                  secondary={new Date(med.date).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                  sx={{
                    "& .MuiListItemText-primary": { fontSize: "1rem" },
                    "& .MuiListItemText-secondary": { fontSize: "0.8rem" },
                    paddingLeft: "25px",
                  }}
                />
              </ListItem>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default TommorowsMedicines;
