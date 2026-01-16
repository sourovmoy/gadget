import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authAPI = {
  login: async (idToken) => {
    const response = await api.post('/api/auth/login', { idToken });
    return response.data;
  },
  logout: async () => {
    const response = await api.post('/api/auth/logout');
    return response.data;
  },
  verify: async () => {
    const response = await api.get('/api/auth/verify');
    return response.data;
  },
};

export const itemsAPI = {
  getAll: async () => {
    const response = await api.get('/api/items');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/api/items/${id}`);
    return response.data;
  },
  create: async (itemData) => {
    const response = await api.post('/api/items', itemData);
    return response.data;
  },
};

export default api;
