import React from "react";
import { Grid, Card, CardContent, Typography, Button, Box } from "@mui/material";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import GroupIcon from '@mui/icons-material/Group';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PaymentsIcon from '@mui/icons-material/Payments';

const TeamDashboard = () => {
  const team = {
    name: "Shadow Ninjas",
    members: 5,
    tournamentsJoined: 3,
    trophies: 1,
    playCardBalance: 2
  };

  return (
    <Box style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: '2rem'
      }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {team.name}!
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <GroupIcon color="primary" fontSize="large" />
              <Typography variant="h6">Team Members</Typography>
              <Typography variant="h4">{team.members}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <SportsEsportsIcon color="secondary" fontSize="large" />
              <Typography variant="h6">Tournaments</Typography>
              <Typography variant="h4">{team.tournamentsJoined}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <EmojiEventsIcon color="success" fontSize="large" />
              <Typography variant="h6">Trophies</Typography>
              <Typography variant="h4">{team.trophies}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <PaymentsIcon color="warning" fontSize="large" /> 
              <Typography variant="h6">Play Cards</Typography>
              <Typography variant="h4">{team.playCardBalance}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={4}>
        <Button variant="contained" color="primary" sx={{ mr: 2 }}>
          Join Tournament
        </Button>
        <Button variant="outlined" color="secondary">
          Invite Team Member
        </Button>
      </Box>
    </Box>
  );
};

export default TeamDashboard;