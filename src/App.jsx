import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./context/AuthProvider";

// User pages
import Login from "./pages/Login";
import AuthCallback from "./pages/AuthCallback";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import ModuleShow from "./pages/ModuleShow";

// Admin pages
import ModuleCreateAdmin from "./pages_admin/ModuleCreateAdmin";
import ModuleEditAdmin from "./pages_admin/ModuleEditAdmin";
import ModuleShowAdmin from "./pages_admin/ModuleShowAdmin";
import AdminHome from "./pages_admin/AdminHome";

// ADMIN CODING CHALLENGES (per module)
import AdminModuleChallenges from "./pages_admin/AdminModuleChallenges";
import AdminChallengeCreate from "./pages_admin/AdminChallengeCreate";
import AdminChallengeEdit from "./pages_admin/AdminChallengeEdit";

// ✅ Protected route with role check
function ProtectedRoute({ children, role }) {
  const { user, token, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Checking authentication...
      </div>
    );
  }

  if (!token || !user) return <Navigate to="/login" replace />;

  // Jika ada role spesifik, cek role user
  if (role && user.role !== role) {
    // bisa juga redirect ke halaman 403 atau default dashboard
    return <Navigate to={user.role === "admin" ? "/admin" : "/"} replace />;
  }

  return children;
}

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public / Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* User Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute role="user">
              <Dashboard />
            </ProtectedRoute>
          }
        />
                <Route
          path="/modules/:slug"
          element={
            <ProtectedRoute role="user">
              <ModuleShow />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute role="user">
              <ProfilePage />
            </ProtectedRoute>
          }
        />



        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/modules/create"
          element={
            <ProtectedRoute role="admin">
              <ModuleCreateAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/modules/:slug/edit"
          element={
            <ProtectedRoute role="admin">
              <ModuleEditAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/modules/:slug"
          element={
            <ProtectedRoute role="admin">
              <ModuleShowAdmin />
            </ProtectedRoute>
          }
        />
     <Route
  path="/admin/modules/:moduleId/challenges"
  element={
    <ProtectedRoute role="admin">
      <AdminModuleChallenges  />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/modules/:moduleId/challenges/create"
  element={
    <ProtectedRoute role="admin">
      <AdminChallengeCreate />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/modules/:moduleId/challenges/:challengeId/edit"
  element={
    <ProtectedRoute role="admin">
      <AdminChallengeEdit />
    </ProtectedRoute>
  }
/>


        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
