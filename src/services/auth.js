import { jwtDecode } from "jwt-decode";
import axios from 'axios';

// URL del backend
const API_URL = 'http://localhost:5290/api/auth/login';

export const login = async (username, password) => {
    try {
        const response = await axios.post(API_URL, { username, password });
        const access_token = response.data.token;

        // Guardar el token en localStorage
        localStorage.setItem('token', access_token);
        return response.data;
    } catch (error) {
        console.error('Error de autenticación', error);
        throw error;
    }
};

// Función para obtener el token del localStorage
export const getToken = () => {
    return localStorage.getItem('token');
};

// Función para obtener los datos del usuario del token
export const getUserFromToken = () => {
    const token = getToken();
    console.log("token: " + token);
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return decoded;
    } catch (error) {
        return null;
    }
};

// Función para cerrar sesión
export const logout = () => {
    localStorage.removeItem('token');
};



// useEffect(() => {
//     const fetchData = async () => {
//       const result = await login("admin", "1234");
//       console.log(result);
//     };
//     fetchData();
//   }, []);