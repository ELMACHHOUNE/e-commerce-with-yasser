import React, { createContext, useState } from 'react';
import { loginUser, registerUser, getUserProfile } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  const login = async (email, password) => {
    const data = await loginUser({ email, password });
    setToken(data.token);
    setUser(data);
    localStorage.setItem('authToken', data.token);
  };

  const register = async (name, email, password) => {
    const data = await registerUser({ name, email, password });
    setToken(data.token);
    setUser(data);
    localStorage.setItem('authToken', data.token);
  };

  const fetchUserProfile = async () => {
    if (token) {
      const profile = await getUserProfile(token);
      setUser(profile);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, fetchUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
