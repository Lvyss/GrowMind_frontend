import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../api/auth";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    async function handleLogin() {
      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      // Simpan token
      localStorage.setItem("token", token);

      // Tunggu sejenak (biar backend siap)
      await new Promise((resolve) => setTimeout(resolve, 500));

      try {
        const userData = await getMe(token);

        localStorage.setItem("user", JSON.stringify(userData));

        // Gunakan setTimeout agar navigate dijalankan setelah frame berikutnya
        setTimeout(() => {
          setTimeout(() => {
  window.location.replace("/");
}, 300);

        }, 50);
      } catch (error) {
        console.error("Login gagal:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 50);
      }
    }

    handleLogin();
  }, [navigate]);

  return (
<div className="flex flex-col items-center justify-center h-screen">
  <div className="w-10 h-10 mb-4 border-t-4 border-green-500 rounded-full animate-spin"></div>
  <p>Logging you in...</p>
</div>

  );
}
