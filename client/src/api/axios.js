import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_URL, // Your backend API URL
  // baseURL: 'http://localhost:5000/api', // Your backend API URL
  headers: {
    'Content-Type': 'application/json'
  }
});

export default instance;
