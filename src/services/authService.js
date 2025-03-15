import api from "./api";

/**
 * Registra un nuevo usuario.
 * @param {string} email - Correo electrónico del usuario.
 * @param {string} username - Nombre de usuario.
 * @param {string} password - Contraseña del usuario.
 * @returns {Promise} - Datos de la respuesta del servidor.
 */
export const registerUser = async (email, username, password, nombre, apellido, rol) => {
    try {
        console.log("Registering service " + email + " user " + username);
        const response = await api.post("/register", {
            email,
            username,
            password,
            nombre,
            apellido,
            rol,
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error.response.data.message; // Lanza el mensaje de error del servidor
    }
};
/**
 * Inicia sesión con un usuario existente.
 * @param {string} username - Nombre de usuario.
 * @param {string} password - Contraseña del usuario.
 * @returns {Promise} - Datos de la respuesta del servidor.
 */
export const loginUser = async (username, password) => {
    try {
        const response = await api.post("/login", { username, password });
        const { token, user } = response.data;

        // Guardar el token en el localStorage
        localStorage.setItem("token", token);

        // Devolver los datos del usuario
        return user;
    } catch (error) {
        throw error.response.data.message; // Lanza el mensaje de error del servidor
    }
};

/**
 * Cierra la sesión del usuario actual.
 */
export const logoutUser = () => {
    localStorage.removeItem("token"); // Elimina el token del localStorage
};