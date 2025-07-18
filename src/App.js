import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TeamDashboard from "./components/dashboard/teams/TeamDashboard";
import { Layout } from "./components/shared/Layout";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import MyAccount from "./pages/MyAccount";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Dashboard Route */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<TeamDashboard />} />
          <Route path="/account" element={<MyAccount />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
