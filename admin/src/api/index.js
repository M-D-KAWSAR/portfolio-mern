import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

// Auth
export const login = (data) => api.post('/auth/login', data).then((r) => r.data);
export const getMe = () => api.get('/auth/me').then((r) => r.data);

// Profile
export const getProfile = () => api.get('/profile').then((r) => r.data);
export const updateProfile = (data) => api.put('/profile', data).then((r) => r.data);

// Projects
export const getProjects = () => api.get('/projects').then((r) => r.data);
export const createProject = (data) => api.post('/projects', data).then((r) => r.data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data).then((r) => r.data);
export const deleteProject = (id) => api.delete(`/projects/${id}`).then((r) => r.data);

// Skills
export const getSkills = () => api.get('/skills').then((r) => r.data);
export const createSkill = (data) => api.post('/skills', data).then((r) => r.data);
export const updateSkill = (id, data) => api.put(`/skills/${id}`, data).then((r) => r.data);
export const deleteSkill = (id) => api.delete(`/skills/${id}`).then((r) => r.data);

// CV Config
export const getCVConfig = () => api.get('/cv-config').then((r) => r.data);
export const saveCVConfig = (data) => api.put('/cv-config', data).then((r) => r.data);

export default api;
