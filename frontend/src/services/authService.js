// services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Adjust to your API URL

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    // Destructure the response to get `token` and `role`
    const { token, role } = response.data;

    if (!token) {
      throw new Error('Login failed: Missing token');
    }

    // Return the token and the role
    return { token, role };
  } catch (error) {
    // Catch and re-throw the error, ensuring error messages are more informative
    throw new Error(error.response?.data?.message || 'An error occurred during login.');
  }
};

export default {
  login,
};
