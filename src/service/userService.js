import axios from "axios";

const API_URL = "http://localhost:8080/usuarios";

// Obtener todos los usuarios
export const getUsuarios = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.result.map((usuario) => ({
      ...usuario,
      id: usuario.idusuario, // Convertimos 'idusuario' en 'id' para DataGrid
    }));
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    throw error;
  }
};

// Crear un nuevo usuario
export const createUsuario = async (usuario) => {
  try {
    const response = await axios.post(API_URL, usuario);
    return response.data;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error;
  }
};

// Actualizar usuario
export const updateUsuario = async (id, usuario) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, usuario);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    throw error;
  }
};

// Eliminar usuario
export const deleteUsuario = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    throw error;
  }
};

export {getUsuarios, deleteUsuario, updateUsuario, createUsuario}