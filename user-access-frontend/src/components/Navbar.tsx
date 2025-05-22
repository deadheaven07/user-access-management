import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav>
      <a href="/signup">Signup</a> | <a href="/login">Login</a> |{" "}
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}
