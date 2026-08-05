import { createContext, useContext, useState, useCallback } from "react";
import api from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("admin_token"));
  const [email, setEmail] = useState(() => localStorage.getItem("admin_email"));

  const login = useCallback(async (loginEmail, password) => {
    const { data } = await api.post("/auth/login", { email: loginEmail, password });
    localStorage.setItem("admin_token", data.token);
    localStorage.setItem("admin_email", data.email);
    setToken(data.token);
    setEmail(data.email);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_email");
    setToken(null);
    setEmail(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, email, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
