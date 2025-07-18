import React, { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [roleType, setRoleType] = useState("individual");
  const [formData, setFormData] = useState({
    name: "",
    teamName: "",
    school: "",
    coachEmail: "",
    inviteCode: "",
    role: "player",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      email,
      password,
      ...formData,
      roleType,
    };

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful!");
        navigate("/signin");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Network error during signup.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Sign up as:
          </Typography>
          <Button
            onClick={() => setRoleType("individual")}
            variant={roleType === "individual" ? "contained" : "outlined"}
          >
            Individual Player
          </Button>
          <Button
            onClick={() => setRoleType("team")}
            variant={roleType === "team" ? "contained" : "outlined"}
            sx={{ ml: 1 }}
          >
            School Team
          </Button>

          {roleType === "team" ? (
            <>
              <TextField
                label="Team Name"
                fullWidth
                name="teamName"
                onChange={handleChange}
                sx={{ mt: 2 }}
              />
              <TextField
                label="School"
                fullWidth
                name="school"
                onChange={handleChange}
                sx={{ mt: 2 }}
              />
              <TextField
                label="Coach Email Address"
                fullWidth
                name="coachEmail"
                type="email"
                onChange={handleChange}
                sx={{ mt: 2 }}
              />
              <TextField
                label="Invite Code (Optional)"
                fullWidth
                name="inviteCode"
                onChange={handleChange}
                sx={{ mt: 2 }}
              />
            </>
          ) : (
            <>
              <TextField
                label="Full Name"
                fullWidth
                name="name"
                onChange={handleChange}
                sx={{ mt: 2 }}
              />
              <TextField
                select
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                SelectProps={{ native: true }}
                fullWidth
                sx={{ mt: 2 }}
              >
                <option value="player">Player</option>
                <option value="coach">Coach</option>
              </TextField>
              <TextField
                label="Invite Code (from team)"
                fullWidth
                name="inviteCode"
                onChange={handleChange}
                sx={{ mt: 2 }}
              />
            </>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
