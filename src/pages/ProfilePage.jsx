import React from "react";
import { useAuth } from "../context/AuthProvider";

export default function ProfilePage() {
  const { user, profile, logout, loading } = useAuth();

  if (loading)
    return (
      <p className="mt-10 text-center text-gray-500">Loading profile...</p>
    );

  if (!user)
    return (
      <p className="mt-10 text-center text-red-500">
        No user found. Please login again.
      </p>
    );

  // fallback values supaya TreeVisualizer nggak error
  const treeStage = profile?.tree_stage || 0;
  const level = profile?.level || 1;
  const exp = profile?.exp || 0;
  const bio = profile?.bio || "No bio yet.";

  return (
    <div className="max-w-md p-6 mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={user.avatar || "https://via.placeholder.com/80"} // fallback avatar
          alt={user.name}
          className="w-20 h-20 border-2 border-gray-300 rounded-full"
        />
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-500">Email: {user.email}</p>
        </div>
      </div>

      {/* Bio */}
      <div className="mt-6">
        <p className="font-semibold text-gray-700">Bio:</p>
        <p className="text-gray-800">{bio}</p>
      </div>

      {/* Logout button */}
      <button
        onClick={logout}
        className="px-4 py-2 mt-6 text-white transition bg-red-600 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
