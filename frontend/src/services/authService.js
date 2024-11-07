// services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Adjust to your API URL

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data; // This should include token and role in the response
};

export default {
  login,
};
