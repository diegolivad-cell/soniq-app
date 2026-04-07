import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const API = 'http://localhost:5136/api';

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const register = async (nombre, email, password) => {
    const res = await fetch(`${API}/Auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
  };

  const login = async (email, password) => {
    const res = await fetch(`${API}/Auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    setToken(data.token);
    setUser({ nombre: data.nombre, email: data.email });
    return data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const authFetch = async (endpoint, options = {}) => {
    const res = await fetch(`${API}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers
      }
    });
    if (res.status === 401) {
      logout();
      throw new Error('Sesión expirada');
    }
    return res;
  };

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout, authFetch }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);