// src/pages/LoginPage.js
import React, { useState } from "react";
import { getUserFromToken, login } from "../services/auth";
import { useNavigate } from "react-router-dom"; // Actualiza la importación
import BaseLayout from "../components/layouts/BaseLayout";

const Login = () => {
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
    <BaseLayout>
      <div>
        <h2>Iniciar sesión</h2>

        <div className="mb-3">
          <label className="form-label">Usuario</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div id="emailHelp" className="form-text">
            Nunca compartiremos su usuario con nadie más.
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" onClick={handleLogin}>
          Iniciar Sesión
        </button>

        <div>
          {/* <br></br> */}
          <hr></hr>
          {/* <a>No tiene usuario¿ Registrase aquì</a> */}
          <h5>¿No tienes cuenta? Registrese</h5>
          <br></br>
          <button type="button" className="btn btn-success">
            Crear Cuenta
          </button>
        </div>

        {/* <button onClick={handleLogin}>Iniciar sesión</button> */}
      </div>
    </BaseLayout>
  );
};

export default Login;
