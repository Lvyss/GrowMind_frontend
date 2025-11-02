import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../api/api";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    const handleLogin = async () => {
      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      // Simpan token
      localStorage.setItem("token", token);

      // Tunggu sejenak agar backend siap
      await new Promise((resolve) => setTimeout(resolve, 300));

      try {
        const userData = await getMe(); // interceptor sudah otomatis inject token
        localStorage.setItem("user", JSON.stringify(userData));

        // Redirect berdasarkan role
        const role = userData.user?.role || "user";
        const redirectTo = role === "admin" ? "/admin" : "/";
        window.location.replace(redirectTo);
      } catch (error) {
        console.error("Login gagal:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
      }
    };

    handleLogin();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-10 h-10 mb-4 border-t-4 border-green-500 rounded-full animate-spin"></div>
      <p>Logging you in...</p>
    </div>
  );
}
