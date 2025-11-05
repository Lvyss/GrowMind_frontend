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

// User Pages
import UserHome from "./user/UserHome";
import ModuleSections from "./user/ModuleSections";
import SectionLearn from "./user/SectionLearn";

import ProfilePage from "./pages/ProfilePage";

// Admin pages
import AdminDashboard from "./admin/AdminDashboard";

import ModuleListAdmin from "./admin/modules/ModuleListAdmin";
import ModuleCreateAdmin from "./admin/modules/ModuleCreateAdmin";
import ModuleEditAdmin from "./admin/modules/ModuleEditAdmin";

import SectionCreateAdmin from "./admin/sections/SectionCreateAdmin";
import SectionEditAdmin from "./admin/sections/SectionEditAdmin";
import SectionListAdmin from "./admin/sections/SectionListAdmin";

import QuestionListAdmin from "./admin/question/QuestionListAdmin";
import QuestionCreateAdmin from "./admin/question/QuestionCreateAdmin";
import QuestionEditAdmin from "./admin/question/QuestionEditAdmin";

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

  if (role && user.role !== role) {
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
              <UserHome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/modules/:moduleId/sections"
          element={
            <ProtectedRoute role="user">
              <ModuleSections />
            </ProtectedRoute>
          }
        />

        <Route
          path="/modules/:moduleId/sections/:sectionId"
          element={
            <ProtectedRoute role="user">
              <SectionLearn />
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
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Modules CRUD */}
        {/* <Route
          path="/admin/modules"
          element={
            <ProtectedRoute role="admin">
              <ModuleListAdmin />
            </ProtectedRoute>
          }
        /> */}
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

        {/* Sections per Module */}
        <Route
          path="/admin/modules/:slug/sectionslist"
          element={
            <ProtectedRoute role="admin">
              <SectionListAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/modules/:slug/sections/create"
          element={
            <ProtectedRoute role="admin">
              <SectionCreateAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/modules/:slug/sections/:id/edit"
          element={
            <ProtectedRoute role="admin">
              <SectionEditAdmin />
            </ProtectedRoute>
          }
        />

        {/* Question per Section */}
        <Route
          path="/admin/sections/:id/questionslist"
          element={
            <ProtectedRoute role="admin">
              <QuestionListAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/sections/:id/questions/create"
          element={
            <ProtectedRoute role="admin">
              <QuestionCreateAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/sections/:id/questions/:id/edit"
          element={
            <ProtectedRoute role="admin">
              <QuestionEditAdmin />
            </ProtectedRoute>
          }
        />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
