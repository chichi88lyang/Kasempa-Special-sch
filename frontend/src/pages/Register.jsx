import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/authSlice";
import { Button, TextField, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/dashboard");
      }
    });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Register</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField fullWidth margin="normal" label="Name" name="name" onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Email" name="email" onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Password" type="password" name="password" onChange={handleChange} />
        <Button type="submit" variant="contained" fullWidth disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
      </form>
    </Container>
  );
};

export default Register;
