import api from "./api";


/**
 * Obtiene la lista de usuarios.
 * @returns {Promise} - Datos de la respuesta del servidor.
 */
export const getUsers = async () => {
    try {
        const response = await api.get("/admin/users");
        //console.log(response); // Asegurarte que la estructura es la correcta
        return response.data; // Verificar si response.data es un array
    } catch (error) {
        throw error.response?.data?.message || "Error al obtener la lista de usuarios";
    }
};

/**
 * Edita la información de un usuario.
 * @param {string} userId - ID del usuario a editar.
 * @param {Object} userData - Datos actualizados del usuario.
 * @returns {Promise} - Datos de la respuesta del servidor.
 */
export const editUser = async (userId, userData) => {
    try {
        const response = await api.put(`/admin/user/${userId}`, userData); // Cambia 'users' a 'user'
        return response.data;
    } catch (error) {
        console.error('Error response:', error.response);
        throw error.response?.data?.message || "Error al editar el usuario";
    }
};

/**
 * Elimina un usuario del sistema.
 * @param {string} userId - ID del usuario a eliminar.
 * @returns {Promise} - Datos de la respuesta del servidor.
 */
export const deleteUser = async (userId) => {
    try {
        const response = await api.delete(`/admin/user/${userId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Error al eliminar el usuario";
    }
};



/**
 * Obtiene la lista de instrumentos de una categoría.
 * @param {string} categoryId - ID de la categoría.
 * @returns {Promise} - Datos de la respuesta del servidor.
 */
export const getInstrumentsByCategory = async (categoryId) => {
    try {
        const response = await api.get(`/category/${categoryId}`);
        return response.data.instrumentos; // Asegúrate de que el campo correcto se llama "instrumentos"
    } catch (error) {
        throw error.response?.data?.message || "Error al obtener la lista de instrumentos";
    }
};

export const getInstrumentsyCategories = async () => {
    try {
        const response = await api.get(`/categories`);
        return response.data; // Devolver la respuesta completa
    } catch (error) {
        throw error.response?.data?.message || "Error al obtener la lista de instrumentos";
    }
};

/**
 * Crea un nuevo instrumento.
 * @param {string} categoryId - ID de la categoría a la que pertenece el instrumento.
 * @param {Object} instrumentData - Datos del nuevo instrumento.
 * @returns {Promise} - Datos de la respuesta del servidor.
 */
export const addInstrument = async (categoryId, instrumentData) => {
    try {
        const response = await api.post(`/category/${categoryId}/instrument`, instrumentData);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Error al agregar el instrumento";
    }
};

/**
 * Edita la información de un instrumento.
 * @param {string} categoryId - ID de la categoría del instrumento.
 * @param {string} instrumentId - ID del instrumento a editar.
 * @param {Object} instrumentData - Datos actualizados del instrumento.
 * @returns {Promise} - Datos de la respuesta del servidor.
 */
export const editInstrument = async (categoryId, instrumentId, instrumentData) => {
    try {
        const response = await api.put(`/category/${categoryId}/instrument/${instrumentId}`, instrumentData);
        return response.data;
    } catch (error) {
        console.error('Error response:', error.response);
        throw error.response?.data?.message || "Error al editar el instrumento";
    }
};

/**
 * Elimina un instrumento de una categoría.
 * @param {string} categoryId - ID de la categoría del instrumento.
 * @param {string} instrumentId - ID del instrumento a eliminar.
 * @returns {Promise} - Datos de la respuesta del servidor.
 */
export const deleteInstrument = async (categoryId, instrumentId) => {
    try {
        const response = await api.delete(`/category/${categoryId}/instrument/${instrumentId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Error al eliminar el instrumento";
    }
};