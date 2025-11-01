import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthProvider';


import Login from './pages/Login';
import AuthCallback from './pages/AuthCallback';
import Dashboard from './pages/Dashboard';
import ModuleDetail from './pages/ModuleDetail';
import LessonPage from './pages/LessonPage';
import QuizPage from './pages/QuizPage';
import ProfilePage from './pages/ProfilePage';

function ProtectedRoute({ children }) {
  const { user, token, loading } = useAuth();

  if (loading) return <div className="flex items-center justify-center h-screen text-gray-500">Checking authentication...</div>;
  
  // cek token dulu, baru user
  if (!token || !user) return <Navigate to="/login" replace />; 

  // jangan paksa cek user null saat token masih valid
  return children;
}



export default function AppRoutes() {
return (
<Router>
<Routes>
{/* Auth */}
<Route path="/login" element={<Login />} />
<Route path="/auth/callback" element={<AuthCallback />} />


{/* Protected */}
<Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
<Route path="/modules/:slug" element={<ProtectedRoute><ModuleDetail /></ProtectedRoute>} />
<Route path="/lessons/:id" element={<ProtectedRoute><LessonPage /></ProtectedRoute>} />
<Route path="/quiz/:id" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
<Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />


{/* Fallback */}
<Route path="*" element={<Navigate to="/" replace />} />
</Routes>
</Router>
);
}