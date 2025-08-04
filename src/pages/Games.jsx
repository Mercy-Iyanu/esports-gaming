import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import axios from "axios";

const GamesLauncher = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [launchingGameId, setLaunchingGameId] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await axios.get("/api/games"); // Replace with your endpoint
        setGames(res.data);
      } catch (err) {
        console.error("Failed to load games", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const handleStartGame = (game) => {
    setLaunchingGameId(game.id);
    // Redirect or open game in a new tab or modal
    setTimeout(() => {
      window.open(game.launchUrl, "_blank"); // You can modify this to use modals or routing
      setLaunchingGameId(null);
    }, 1000);
  };

  return (
    <Box sx={{ px: 4, py: 6 }}>
      <Typography variant="h4" gutterBottom fontWeight={600}>
        🎮 Games
      </Typography>

      {loading ? (
        <Grid container spacing={3}>
          {[...Array(6)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Skeleton variant="rectangular" height={200} />
              <Skeleton width="60%" />
              <Skeleton width="40%" />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={3}>
          {games.map((game) => (
            <Grid item xs={12} sm={6} md={4} key={game.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={game.thumbnailUrl}
                  alt={game.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" fontWeight={600}>
                    {game.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {game.description?.slice(0, 80)}...
                  </Typography>
                </CardContent>
                <Box px={2} pb={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<PlayArrow />}
                    onClick={() => handleStartGame(game)}
                    disabled={launchingGameId === game.id}
                  >
                    {launchingGameId === game.id ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      "Start Game"
                    )}
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default GamesLauncher;
