import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  TextField,
  Divider,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function MyAccount() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
    setFormData(userData || {});
  }, []);

  const handleEditToggle = () => setEditing((prev) => !prev);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(formData));
    setUser(formData);
    setEditing(false);
  };

  if (!user) return <Typography>Loading...</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Tooltip title="Back to Dashboard">
          <IconButton onClick={() => navigate("/home")}>
            <ArrowBack />
          </IconButton>
        </Tooltip>
        <Typography variant="h5" sx={{ ml: 1 }}>
          My Account
        </Typography>
      </Box>

      {/* Profile Section */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar
                sx={{ width: 80, height: 80, bgcolor: "primary.main" }}
                alt={user.name}
              >
                {user.name?.[0]?.toUpperCase()}
              </Avatar>
            </Grid>
            <Grid item xs>
              {editing ? (
                <>
                  <TextField
                    name="name"
                    label="Name"
                    value={formData.name || ""}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 1 }}
                  />
                  <TextField
                    name="email"
                    label="Email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    fullWidth
                  />
                </>
              ) : (
                <>
                  <Typography variant="h6">{user.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                </>
              )}
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                onClick={editing ? handleSave : handleEditToggle}
              >
                {editing ? "Save" : "Edit"}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Tournament Stats */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Tournament Stats
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="subtitle2">Tournaments Played</Typography>
              <Typography variant="h5">6</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle2">Wins</Typography>
              <Typography variant="h5">3</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle2">Win Rate</Typography>
              <Typography variant="h5">50%</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Badges */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Badges
          </Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 1 }}>
            <Chip label="Rookie Player" color="primary" />
            <Chip label="MVP 2024" color="secondary" />
            <Chip label="Team Leader" color="success" />
          </Box>
        </CardContent>
      </Card>

      {/* Recent Matches */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent Matches
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {[
            { game: "Rocket League", result: "Win", date: "2025-07-12" },
            { game: "FIFA 24", result: "Loss", date: "2025-07-10" },
            { game: "Valorant", result: "Win", date: "2025-07-07" },
          ].map((match, idx) => (
            <Box key={idx} sx={{ mb: 2 }}>
              <Typography variant="subtitle1">
                {match.game} -{" "}
                <strong
                  style={{ color: match.result === "Win" ? "green" : "red" }}
                >
                  {match.result}
                </strong>
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {match.date}
              </Typography>
            </Box>
          ))}
        </CardContent>
      </Card>
    </Container>
  );
}
