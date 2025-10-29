import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";

import Login from "./pages/Login";
import AuthCallback from "./pages/AuthCallback";
import Dashboard from "./pages/Dashboard";
import TreeVisualizer from "./pages/TreeVisualizer";

function ProtectedRoute({ children }) {
  const { user, token, loading } = useAuth();

  // 1️⃣ Kalau masih loading, jangan apa-apa dulu
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Checking authentication...
      </div>
    );
  }

  // 2️⃣ Kalau gak ada token
  if (!token) return <Navigate to="/login" replace />;

  // 3️⃣ Kalau token ada tapi user belum kebaca (gagal load)
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 4️⃣ Kalau semua siap
  return children;
}




export default function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman Login */}
        <Route path="/login" element={<Login />} />

        {/* Callback Google */}
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* Route utama (butuh login) */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Contoh route lain */}
        <Route
          path="/tree"
          element={
            <ProtectedRoute>
              <TreeVisualizer />
            </ProtectedRoute>
          }
        />

        {/* Jika route tidak dikenali */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
