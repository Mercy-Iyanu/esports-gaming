import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";

const TopNavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [time, setTime] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/signin");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-GB", { hour12: false }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-GB", { hour12: false }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#0e0e0e" }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
        }}
      >
        <Box>
          <Typography
            variant="h6"
            component={Link}
            to="/home"
            sx={{
              textDecoration: "none",
              color: "#fff",
              fontWeight: "bold",
              fontFamily: "monospace",
            }}
          >
            EDU sports
          </Typography>
        </Box>

        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          <Button color="inherit" component={Link} to="/games">
            Games
          </Button>
          <Button color="inherit" component={Link} to="/tournaments">
            Tournaments
          </Button>
          <Button color="inherit" component={Link} to="/teams">
            Teams
          </Button>
          <Button color="inherit" component={Link} to="/account">
            My Account
          </Button>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="body1" sx={{ color: "#fff" }}>
            {time}
          </Typography>

          {user && (
            <>
              <Tooltip title="Account">
                <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: "#1976d2" }}>
                    {user?.name?.[0]?.toUpperCase() ||
                      user?.email?.[0]?.toUpperCase()}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem disabled>{user.name || "No Name"}</MenuItem>
                <MenuItem disabled>{user.email}</MenuItem>
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavBar;
