import {
  Box,
  Typography,
  Grid,
  ListItem,
  ListItemText,
  Checkbox,
} from "@mui/material";
import { useNotificationStore } from "../../stores/notificationStore";
import { NotificationDto } from "../../types/NotificationDto";
import { useNotifications } from "../../hooks/useNotifications";
import { useUpdateNotification } from "../../hooks/useUpdateNotification";

const TodaysMedicines = () => {
  const notifications = useNotificationStore(
    (state: any) => state.notifications
  );
  const updateNotification = useUpdateNotification();

  const handleCheckboxChange = (notification: NotificationDto) => {
    updateNotification.mutate({
      ...notification,
      taken: !notification.taken,
    });
    console.log("todaysMeds notifs =", notifications);
    refetch();
  };

  const { data: notifsQuery, refetch } = useNotifications();

  const todaysMeds = notifsQuery?.filter((notification: NotificationDto) => {
    const notificationDate = new Date(notification.date);
    const today = new Date();
    return notificationDate.toDateString() === today.toDateString();
  });

  return (
    <Box sx={{ flex: "0 0 auto", paddingLeft: "16px" }}>
      <Typography
        variant="h4"
        sx={{ fontSize: "1.5rem", fontWeight: "bold" }}
        gutterBottom
        textAlign={"right"}
      >
        Today's Medicines
      </Typography>
      <Box sx={{ maxHeight: "180px", overflow: "auto", overflowX: "hidden" }}>
        <Grid container spacing={1}>
          {todaysMeds
            ?.sort(
              (a: NotificationDto, b: NotificationDto) =>
                new Date(a.date).getTime() - new Date(b.date).getTime()
            )
            .map((med: NotificationDto) => (
              <Grid item xs={12} sm={6} key={med.id}>
                <ListItem disablePadding dense>
                  <Checkbox
                    checked={med.taken}
                    size="small"
                    onChange={() => handleCheckboxChange(med)}
                    disabled={updateNotification.isPending}
                  />
                  <ListItemText
                    primary={med.title}
                    secondary={new Date(med.date).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                    sx={{
                      textDecoration: med.taken ? "line-through" : "none",
                      "& .MuiListItemText-primary": { fontSize: "1rem" },
                      "& .MuiListItemText-secondary": { fontSize: "0.8rem" },
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

export default TodaysMedicines;
