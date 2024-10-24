// src/context/AuthContext.js
import { createContext, useState, useEffect } from "react";
import axios from "../api.js"; // axios instance with baseURL set

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || null
  );

  //   For register and login Dialog

  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);

  const handleRegisterOpen = () => setRegisterOpen(true);
  const handleRegisterClose = () => setRegisterOpen(false);

  // For loading backdrop text

  const [backdropLoadingText, setBackdropLoadingText] = useState("Loading");

  // Login method
  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await axios.post("/login", { email, password });

      // Store the access token in localStorage
      const token = response.data.data.accessToken;
      const loginUser = response.data.data.user;
      localStorage.setItem("accessToken", token);
      localStorage.setItem("user", JSON.stringify(loginUser));
      setAccessToken(token);
      setUser(loginUser);
      console.log(loginUser);

      setLoading(false);
      return true;
    } catch (error) {
      console.error("Login failed", error);
      setLoading(false);
    }
  };

  // Register method
  const register = async (email, password) => {
    try {
      setLoading(true);
      const response = await axios.post("/register", { email, password });

      // Store the access token in localStorage
      const token = response.data.data.accessToken;
      const user = response.data.data.user;

      console.log(JSON.stringify(user));

      localStorage.setItem("accessToken", token);
      localStorage.setItem("user", JSON.stringify(user));
      setAccessToken(token);
      setUser(user);
      setLoading(false);
      return true;
    } catch (error) {
      console.error("Registration failed", error);
      setLoading(false);
    }
  };

  // Logout method
  const logout = async () => {
    try {
      setLoading(true);
      await axios.post("/logout", { user }); // Invalidate refresh token from the backend

      // Clear stored token and user data
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      setAccessToken(null);
      setUser(null);
      setLoading(false);
    } catch (error) {
      console.error("Logout failed", error);
      setLoading(false);
    }
  };

  // Refresh token method
  const refreshToken = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/refresh-token"); // Backend should set refresh token in secure cookie
      const newToken = response.data.accessToken;

      localStorage.setItem("accessToken", newToken);
      setAccessToken(newToken);
      setLoading(false);
    } catch (error) {
      console.error("Token refresh failed", error);
      setAccessToken(null);
      setUser(null);
      localStorage.removeItem("accessToken");
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if we have a token and try to refresh it
        const token = localStorage.getItem("accessToken");
        // if (token) {
        //   await refreshToken();
        // }
      } catch (error) {
        console.error("Auto login failed");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        login,
        register,
        logout,
        refreshToken,
        loading,
        loginOpen,
        handleLoginOpen,
        handleLoginClose,
        registerOpen,
        handleRegisterOpen,
        handleRegisterClose,
        backdropLoadingText,
        setBackdropLoadingText,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
