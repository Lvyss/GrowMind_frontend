import React, { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "../api/auth";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchProfile = async () => {
    if (!token) return;
    try {
      const data = await getMe();
      setUser(data.user);
      setProfile(data.profile);
    } catch (err) {
      console.error("Failed to fetch profile:", err);
      setUser(null);
      setProfile(null);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      if (token) await fetchProfile();
      setLoading(false);
    };
    init();
  }, [token]);

  const refreshProfile = async () => {
    await fetchProfile();
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, profile, token, refreshProfile, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
