import api from "./api";


export const getCategorias = async () => {
    try {
        const response = await api.get("/categories");
        //console.log("Salida de categorías:", response);
        return response.data;
    } catch (error) {
        console.error("Error obteniendo categorías:", error);
        return [];
    }
};


export const getCategoriaById = async (categoryId) => {
    try {
        const response = await api.get(`/category/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error("Error obteniendo la categoría:", error);
        return null;
    }
};