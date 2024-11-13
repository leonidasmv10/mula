import React from 'react';
import { useNavigate } from 'react-router-dom';  // Usamos useNavigate para las redirecciones
import { getUserFromToken } from '../services/auth';  // Función que decodifica el JWT

const withAuth = (WrappedComponent, requiredRole) => {
    return ({ ...props }) => {
        const navigate = useNavigate();
        const user = getUserFromToken();

        console.log(user);

        // Si el usuario no está autenticado, redirigir a la página de login
        if (!user) {
            navigate("/login");  // Redirige al login si no está autenticado
            return null;  // Evitar que se renderice el componente si el usuario no está autenticado
        }

        // Si el rol del usuario no coincide con el requerido, redirigir a una página de acceso no autorizado
        if (user.is_admin !== requiredRole) {
            navigate("/unauthorized");  // Redirige a la página de acceso no autorizado
            return null;  // Evitar que se renderice el componente si el rol no es el adecuado
        }

        // Si todo está bien, renderizamos el componente envuelto
        return <WrappedComponent {...props} user={user} />;
    };
};

export default withAuth;
