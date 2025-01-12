import { Box, Typography, Grid, ListItem, ListItemText } from "@mui/material";

const TommorowsMedicines = () => {
  const tomorrowsMeds = [
    { name: "Paracetamol", time: new Date().setHours(8, 0), taken: false },
    { name: "Vitamin D", time: new Date().setHours(9, 0), taken: false },
    { name: "Iron Supplement", time: new Date().setHours(10, 0), taken: false },
    { name: "Nurofen", time: new Date().setHours(12, 0), taken: false },
    { name: "Vitamin B12", time: new Date().setHours(14, 0), taken: false },
    { name: "Magnesium", time: new Date().setHours(20, 0), taken: false },
  ];

  return (
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
                secondary={new Date(med.time).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
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
  );
};

export default TommorowsMedicines;
