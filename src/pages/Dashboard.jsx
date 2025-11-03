import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, getUserModules } from "../api/api";

export default function Dashboard() {
  const [modules, setModules] = useState([]);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Ambil profile
    getProfile().then(setProfile);

    // Ambil modul user
    const fetchModules = async () => {
      try {
        const data = await getUserModules(); // pastikan data adalah array
        console.log("Modules:", data);
        setModules(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching modules", err);
      }
    };
    fetchModules();
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Your GrowMind Dashboard</h1>
<img 
  src={profile?.user?.avatar || "/fallback.png"} 
  alt="avatar"
  className="w-12 h-12 border-2 border-gray-300 rounded-full cursor-pointer"
  onClick={() => navigate("/profile")}
/>

      </div>

      <h2 className="mb-4 text-2xl font-semibold">Modules</h2>

      {/* Grid modules */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {modules.length > 0 ? (
          modules.map((m) => (
            <div
              key={m.id}
              className="p-5 transition bg-white border rounded-lg shadow hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold">{m.title}</h3>
              <p className="text-sm text-gray-500 capitalize">{m.status}</p>

              {/* Show only */}
              <button
                className="px-2 py-1 mt-4 text-xs text-white bg-gray-700 rounded"
                onClick={() => navigate(`/modules/${m.slug}`)}
              >
                Show
              </button>
            </div>
          ))
        ) : (
          <div className="text-gray-500 col-span-full">No modules yet.</div>
        )}
      </div>
    </div>
  );
}
