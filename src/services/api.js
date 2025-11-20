import axios from 'axios';


const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const api = axios.create({ baseURL: API_BASE, headers: { 'Content-Type': 'application/json' } });


export const fetchTasks = (status) => api.get('/tasks', { params: status ? { status } : {} }).then(r => r.data);
export const createTask = (payload) => api.post('/tasks', payload).then(r => r.data);
export const getTask = (id) => api.get(`/tasks/${id}`).then(r => r.data);
export const updateTask = (id, payload) => api.put(`/tasks/${id}`, payload).then(r => r.data);
export const deleteTask = (id) => api.delete(`/tasks/${id}`).then(r => r.data);


export default api;