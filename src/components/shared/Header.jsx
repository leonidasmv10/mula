import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import LoginForm from "../LoginForm";
import { toast } from "react-toastify";
import { AdminContext } from "../../AdminProvider";

const Header = () => {
  const { isAdmin, setIsAdmin } = useContext(AdminContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogin = (data) => {
    if (data.user === "devgrids" && data.password === "code123") {
      handleClose();
      toast.success("¡Logeado correctamente!");
      setIsAdmin(true);
    } else {
      toast.error("Datos incorrectos");
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    toast.success("¡Cerraste sesión correctamente!");
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to="/">
            La mula sàvia
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              {isAdmin && (
                <>
                  <NavDropdown title="Administrador" id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/admin/menu">
                      Gestionar Menú Semanal
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/reserva">
                      Ver Reservas
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/opiniones">
                      Gestionar Opiniones
                    </NavDropdown.Item>
                  </NavDropdown>
                  {"  "}
                  <Button variant="primary" onClick={handleLogout}>
                    Cerrar Sesión
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
