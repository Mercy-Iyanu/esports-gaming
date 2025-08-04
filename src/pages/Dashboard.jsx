import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import GroupsIcon from "@mui/icons-material/Groups";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const features = [
  {
    title: "Games",
    description: "View and manage available games across all competitions.",
    icon: <SportsEsportsIcon fontSize="large" color="primary" />,
    actionText: "View Games",
    link: "/games",
  },
  {
    title: "Teams",
    description: "Manage school teams, players, and team stats.",
    icon: <GroupsIcon fontSize="large" color="primary" />,
    actionText: "Manage Teams",
    link: "/teams",
  },
  {
    title: "Leaderboard",
    description: "Check top teams and schools by performance.",
    icon: <EmojiEventsIcon fontSize="large" color="primary" />,
    actionText: "View Leaderboard",
    link: "/leaderboard",
  },
];

const Dashboard = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom fontWeight={600}>
        Welcome back, Champion!
      </Typography>

      <Grid container spacing={3}>
        {features.map((feature) => (
          <Grid item xs={12} sm={6} md={4} key={feature.title}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: 3,
                boxShadow: 3,
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  {feature.icon}
                  <Typography
                    variant="h6"
                    component="div"
                    ml={2}
                    fontWeight={500}
                  >
                    {feature.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  href={feature.link}
                  variant="contained"
                  sx={{ ml: 2, mb: 2, textTransform: "none" }}
                >
                  {feature.actionText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
