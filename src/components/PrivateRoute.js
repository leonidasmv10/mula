// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';
// import { getUserFromToken } from '../services/auth';

// // PrivateRoute será nuestra ruta protegida
// const PrivateRoute = ({ component: Component, allowedRoles, ...rest }) => {
//     const user = getUserFromToken();

//     // Si el usuario no está autenticado, redirige a login
//     if (!user) {
//         return <Redirect to="/login" />;
//     }

//     // Verificar si el rol del usuario es permitido
//     if (!allowedRoles.includes(user.is_admin ? 'admin' : 'user')) {
//         return <Redirect to="/unauthorized" />;  // Ruta de acceso no autorizado
//     }

//     return <Route {...rest} render={(props) => <Component {...props} />} />;
// };

// export default PrivateRoute;
