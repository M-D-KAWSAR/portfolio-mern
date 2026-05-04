import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://portfolio-mern-1-jsol.onrender.com/api',
  timeout: 10000,
});

export const fetchProfile = () => api.get('/profile').then((r) => r.data);
export const fetchProjects = () => api.get('/projects').then((r) => r.data);
export const fetchSkills = () => api.get('/skills').then((r) => r.data);

export default api;
