// src/api/api.js
import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'https://8mtr18w529.execute-api.us-east-1.amazonaws.com', // Replace with your API base URL
});

// You can add request interceptors to handle common tasks like adding tokens to headers
api.interceptors.request.use((config) => {
  // Example: Add authorization token if available
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
