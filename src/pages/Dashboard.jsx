import React from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100">
      <h1 className="mb-2 text-3xl font-bold">Welcome to GrowMind 🌱</h1>
      <img src={user.avatar} alt="Avatar" className="w-20 h-20 mt-2 rounded-full" />
      <p className="mt-2">Hello, {user.name}!</p>
      <p className="text-gray-600">{user.email}</p>

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => navigate("/tree")}
          className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
        >
          🌳 View Tree
        </button>
        <button
          onClick={logout}
          className="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
