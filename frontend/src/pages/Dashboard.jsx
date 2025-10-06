import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Card, CardContent } from "@mui/material";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!user) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h5" color="error">
          You are not logged in. Please login first.
        </Typography>
        <Button onClick={() => navigate("/login")} variant="contained" sx={{ mt: 2 }}>
          Go to Login
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Welcome, {user.name} 🎉
          </Typography>
          <Typography variant="body1">Email: {user.email}</Typography>
          <Typography variant="body1">Role: {user.role}</Typography>

          <Button 
            variant="contained" 
            color="error" 
            sx={{ mt: 3 }} 
            onClick={handleLogout}
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Dashboard;
