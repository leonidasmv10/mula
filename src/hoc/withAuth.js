import React from 'react';
import { useNavigate } from 'react-router-dom';  // Para redirección
import { jwtDecode } from "jwt-decode";           // Para decodificar el JWT

// Función para obtener el usuario decodificado del JWT almacenado
const getUserFromToken = () => {
    const token = localStorage.getItem('token'); // O donde guardes tu JWT
    if (!token) return null;

    try {
        const decoded = jwtDecode(token); // Decodificamos el JWT
        console.log(decoded);
        return decoded; // Devuelve el usuario decodificado (ej. id, rol, nombre, etc.)
    } catch (error) {
        return null; // Si el token es inválido, regresamos null
    }
};

// Componente HOC para proteger rutas
const withAuth = (Component) => {
    return ({ role, ...props }) => {
        const navigate = useNavigate();  // Hook para redirección
        const user = getUserFromToken(); // Obtener datos del usuario del token

        // Si el usuario no está autenticado, redirigimos al login
        if (!user) {
            navigate('/login');  // Redirigir a login si no está autenticado
            return null;  // No renderizamos el componente
        }

        // Si el rol del usuario no coincide con el rol requerido, redirigimos
        if (role && user.role !== role) {
            navigate('/unauthorized');  // Redirigir a página de acceso no autorizado
            return null;  // No renderizamos el componente
        }

        // Si todo está bien, renderizamos los componentes hijos
        return <Component user={user} {...props} />;
    };
};

export default withAuth;
