import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
  });

  const storage = Constants.platform?.web ? window.localStorage : AsyncStorage;

  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const user = await storage.getItem('user');
        const token = await storage.getItem('authToken');
        const refreshToken = await storage.getItem('refreshToken');
        if (user && token && refreshToken) {
          setAuthState({ user: JSON.parse(user), token, refreshToken, isAuthenticated: true });
        }
      } catch (error) {
        console.error('Failed to load auth data:', error);
      }
    };
    loadAuthData();
  }, []);

  const register = async (username, email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
      });
      setAuthState({
        user: response.data.user,
        token: response.data.authToken,
        refreshToken: response.data.refreshToken,
        isAuthenticated: true,
      });
      await storage.setItem('user', JSON.stringify(response.data.user));
      await storage.setItem('authToken', response.data.authToken);
      await storage.setItem('refreshToken', response.data.refreshToken);
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('Registration failed, please try again.');
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      setAuthState({ user: response.data.user, token: response.data.authToken, refreshToken: response.data.refreshToken });
      await storage.setItem('user', JSON.stringify(response.data.user));
      await storage.setItem('authToken', response.data.authToken);
      await storage.setItem('refreshToken', response.data.refreshToken);
      return true; // Indicate success
    } catch (error) {
      console.error('Login failed:', error);
      return false; // Indicate failure
    }
  };
  

  const refreshToken = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/refresh', {
        refreshToken: authState.refreshToken,
      });
      setAuthState((prevState) => ({
        ...prevState,
        token: response.data.authToken,
      }));
      await storage.setItem('authToken', response.data.authToken);
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw new Error('Session expired, please login again.');
    }
  };

  const logout = async () => {
    try {
      await storage.removeItem('user');
      await storage.removeItem('authToken');
      await storage.removeItem('refreshToken');
      setAuthState({ user: null, token: null, refreshToken: null, isAuthenticated: false });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ authState, register, login, refreshToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
