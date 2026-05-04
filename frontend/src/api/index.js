import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://portfolio-mern-yka0.onrender.com/api',
  timeout: 10000,
});

export const fetchProfile = () => api.get('/profile').then((r) => r.data);
export const fetchProjects = () => api.get('/projects').then((r) => r.data);
export const fetchSkills = () => api.get('/skills').then((r) => r.data);

export const fetchCVConfig = () => api.get('/cv-config').then((r) => r.data);

export default api;
