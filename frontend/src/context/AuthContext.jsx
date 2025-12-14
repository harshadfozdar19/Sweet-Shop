import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Verify user on page load using token
   */
  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/auth/me");
        setUser(res.data); // actual user from backend
      } catch (error) {
        // token invalid or expired
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  /**
   * Login user
   */
  const login = (userData, token) => {
    localStorage.setItem("token", token);
    setUser(userData);
  };

  /**
   * Logout user
   */
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  /**
   * Refresh user (useful after admin actions)
   */
  const refreshUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data);
    } catch {
      logout();
    }
  };

  /**
   * Derived helpers
   */
  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        refreshUser,
        isAuthenticated,
        isAdmin,
      }}
    >
        
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
