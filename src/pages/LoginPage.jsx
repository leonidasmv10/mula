// src/pages/LoginPage.js
import React, { useState } from "react";
import { getUserFromToken, login } from "../services/auth";
import { useNavigate } from "react-router-dom"; // Actualiza la importación

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Usa useNavigate en lugar de useHistory

  const handleLogin = async () => {
    try {
      await login(username, password);
      navigate("/");
    } catch (error) {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Iniciar sesión</button>
    </div>
  );
};

export default LoginPage;
