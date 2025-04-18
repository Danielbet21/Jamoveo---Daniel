import axios from 'axios';

/*
This module creates an axios instance with a base URL and a timeout of 5000ms.
axios is a promise-based HTTP client for the browser.
*/

const api = axios.create({
  baseURL: 'http://104.155.152.39:5000/api' ,  
  timeout: 5000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

