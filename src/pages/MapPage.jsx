import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MapPage() {
  const [modules, setModules] = useState([]);
  const [xp, setXp] = useState(localStorage.getItem("xp") || 0);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/modules", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setModules(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl">🗺️ Peta Modul BelajarQuest</h1>
      <p className="mb-4 font-semibold">XP Kamu: {xp}</p>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {modules.map(mod => (
          <Link
            key={mod.id}
            to={`/module/${mod.id}`}
            className={`p-4 border rounded shadow ${
              mod.completed ? "bg-green-200" : "bg-white"
            }`}
          >
            <h2 className="font-bold">{mod.title}</h2>
            <p>{mod.completed ? "✅ Selesai" : "Belum selesai"}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
