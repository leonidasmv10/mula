// src/pages/LoginPage.js
import React, { useState } from "react";
import { getUserFromToken, login } from "../services/auth";
import { Link, useNavigate } from "react-router-dom"; // Actualiza la importación
import BaseLayout from "../components/layouts/BaseLayout";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(username, password);
      toast.success("Bienvenido " + username);
      navigate("/");
    } catch (error) {
      toast.error("Credenciales incorrectas");
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
          <hr></hr>
          <h5>¿No tienes cuenta? Registrate aquí</h5>
          <br></br>
          <Link to="/register">
            <button type="button" className="btn btn-success">
              Crear Cuenta
            </button>
          </Link>
        </div>
      </div>
    </BaseLayout>
  );
};

export default LoginPage;
