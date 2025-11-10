import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Configuración base de axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// ========== JUEGOS ==========

export const obtenerJuegos = async () => {
  try {
    const response = await api.get('/juegos');
    return response.data;
  } catch (error) {
    console.error('Error al obtener juegos:', error);
    throw error;
  }
};

export const obtenerJuegoPorId = async (id) => {
  try {
    const response = await api.get(`/juegos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener juego:', error);
    throw error;
  }
};

export const crearJuego = async (juegoData) => {
  try {
    const response = await api.post('/juegos', juegoData);
    return response.data;
  } catch (error) {
    console.error('Error al crear juego:', error);
    throw error;
  }
};

export const actualizarJuego = async (id, juegoData) => {
  try {
    const response = await api.put(`/juegos/${id}`, juegoData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar juego:', error);
    throw error;
  }
};

export const eliminarJuego = async (id) => {
  try {
    const response = await api.delete(`/juegos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar juego:', error);
    throw error;
  }
};

// ========== RESEÑAS ==========

export const obtenerResenas = async () => {
  try {
    const response = await api.get('/resenas');
    return response.data;
  } catch (error) {
    console.error('Error al obtener reseñas:', error);
    throw error;
  }
};

export const obtenerResenasPorJuego = async (juegoId) => {
  try {
    const response = await api.get(`/resenas/juego/${juegoId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener reseñas del juego:', error);
    throw error;
  }
};

export const crearResena = async (resenaData) => {
  try {
    const response = await api.post('/resenas', resenaData);
    return response.data;
  } catch (error) {
    console.error('Error al crear reseña:', error);
    throw error;
  }
};

export const actualizarResena = async (id, resenaData) => {
  try {
    const response = await api.put(`/resenas/${id}`, resenaData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar reseña:', error);
    throw error;
  }
};

export const eliminarResena = async (id) => {
  try {
    const response = await api.delete(`/resenas/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar reseña:', error);
    throw error;
  }
};

export default api;