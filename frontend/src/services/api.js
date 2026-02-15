import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Strategies
export const getStrategies = (params) => api.get('/strategies', { params }).then(res => res.data);
export const getStrategy = (id) => api.get(`/strategies/${id}`).then(res => res.data);
export const createStrategy = (data) => api.post('/strategies', data).then(res => res.data);
export const getPerformance = (id) => api.get(`/strategies/${id}/performance`).then(res => res.data);

// Signals
export const getSignals = (strategyId) => api.get(`/signals/strategy/${strategyId}`).then(res => res.data);
export const verifySignal = (data) => api.post('/signals/verify', data).then(res => res.data);

// Subscriptions
export const subscribe = (data) => api.post('/subscriptions', data).then(res => res.data);
export const getMySubscriptions = () => api.get('/subscriptions/my').then(res => res.data);
export const unsubscribe = (id) => api.delete(`/subscriptions/${id}`).then(res => res.data);

// Users
export const register = (data) => api.post('/users/register', data).then(res => res.data);
export const login = (data) => api.post('/users/login', data).then(res => res.data);
export const getProfile = () => api.get('/users/profile').then(res => res.data);

export default api;
