import axios from "axios";

// URL base de la API
const API_BASE_URL = "http://localhost:5001/api";

// Crear una instancia de Axios
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json", // Cabecera para indicar que el contenido es JSON
    },
    withCredentials: false, // Deshabilitar credenciales para desarrollo local
});

// Interceptor para adjuntar automáticamente el token si existe
api.interceptors.request.use(
    async (config) => {
        console.log("Entering interceptor configuration");
        const token = localStorage.getItem("token"); // Obtener el token del localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Adjuntar el token en la cabecera
        }
        console.debug("Returning interceptor configuration");
        return config;
    },
    (error) => {
        console.error("Error in interceptor configuration", error);
        return Promise.reject(error); // Rechazar la promesa con el error
    }
);

export default api;