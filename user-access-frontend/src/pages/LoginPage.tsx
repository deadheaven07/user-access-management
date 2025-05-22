import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { token, role } = await loginUser(username, password);
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      // 🔁 Redirect based on role
      if (role === "Admin") navigate("/create-software");
      else if (role === "Employee") navigate("/request-access");
      else if (role === "Manager") navigate("/pending-requests");
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
  <div className="auth-container">
    <div className="auth-card">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      {loading && <p>Loading...</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <button type="submit" disabled={loading}>Login</button>
      </form>
    </div>
  </div>
);
}

