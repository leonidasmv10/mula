import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseLayout from "../components/layouts/BaseLayout";
import UsersController from "../controllers/mula/usersController";
import ConfirmationModal from "../components/widgets/ConfirmationModal";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const usersController = new UsersController();

  function handleConfirmation() {
    setIsModalOpen(true);
  }

  const handleRegister = async () => {
    try {
      const user = {
        username: username,
        password: password,
      };

      const id = await usersController.createData(user);
      if (id != 0) {
        toast.success("Usuario registrado correctamente!");
        navigate("/");
      } else {
        toast.error("Usuario ya registrado");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <BaseLayout>
      <div>
        <h2>Registrar Cuenta</h2>

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

        <button className="btn btn-primary" onClick={handleConfirmation}>
          Registrar
        </button>

        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleRegister}
          message="¿Estás seguro de que ingresó los datos correctos?"
        />
      </div>
    </BaseLayout>
  );
};

export default RegisterPage;
