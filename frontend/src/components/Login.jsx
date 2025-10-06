import React, { useState } from "react";
import { login } from "../api/axios"; // your axios.js file

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await login({ email, password });

      // ✅ Store token in localStorage
      localStorage.setItem("token", data.token);

      // Optional: store user info
      localStorage.setItem("user", JSON.stringify({
        name: data.name,
        email: data.email,
        role: data.role
      }));

      console.log("Login successful, token stored:", data.token);

      // Callback to parent component if needed
      if (onLoginSuccess) onLoginSuccess(data);

    } catch (err) {
      console.error("Login failed:", err.response?.data);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
