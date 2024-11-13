import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import Cookies from 'js-cookie';

// URL del backend
const API_URL = 'http://localhost:5290/api/auth/login';

// Función de inicio de sesión (login)
export const login = async (username, password) => {
    try {
        const response = await axios.post(API_URL, { username, password });
        const access_token = response.data.token;

        // Guardar el token en una cookie segura
        Cookies.set('token', access_token, {
            secure: true,    // Solo enviar en conexiones HTTPS
            sameSite: 'Strict', // Solo enviar en el mismo sitio (reduce CSRF)
            expires: 1,      // Expira en 1 día (puedes ajustar)
        });

        return response.data;
    } catch (error) {
        console.error('Error de autenticación', error);
        throw error;
    }
};

// Función de cierre de sesión (logout)
export const logout = () => {
    try {
        // Eliminar la cookie del token
        Cookies.remove('token');
        // console.log('Sesión cerrada correctamente');
    } catch (error) {
        console.error('Error al cerrar sesión', error);
    }
};

// Función para obtener el token de la cookie
export const getToken = () => {
    return Cookies.get('token');
};

// Función para obtener los datos del usuario a partir del token
export const getUserFromToken = () => {
    const token = getToken();
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return decoded;
    } catch (error) {
        return null;
    }
};
