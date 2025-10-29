import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API, { setAuthToken } from "../api/axios";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Modules = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const [modules, setModules] = useState([]);
  const [userExp, setUserExp] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Token handling
    const token = query.get("token") || localStorage.getItem("token");
    if (!token) return navigate("/login");
    localStorage.setItem("token", token);
    setAuthToken(token);
    if (query.get("token")) navigate("/modules", { replace: true });

    // Fetch modules & user profile
    const fetchData = async () => {
      try {
        const [modulesRes, userRes] = await Promise.all([
          API.get("/modules"),
          API.get("/user"),
        ]);

        setUserExp(userRes.data.exp);

        const completed = userRes.data.completed_modules || [];
        const modulesWithStatus = modulesRes.data.map((mod) => ({
          ...mod,
          completed: completed.includes(mod.id),
        }));
        setModules(modulesWithStatus);
      } catch (err) {
        console.error(err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleComplete = async (modId) => {
    try {
      const res = await API.post(`/modules/${modId}/complete`);
      alert(res.data.message);

      setUserExp(res.data.total_exp);

      setModules((prev) =>
        prev.map((m) =>
          m.id === modId ? { ...m, completed: true } : m
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="p-4">Loading modules...</p>;

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Modul</h1>

      {/* Pohon Pengetahuan / EXP */}
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-bold">Pohon Pengetahuan</h2>
        <div className="w-full h-6 overflow-hidden bg-gray-200 rounded">
          <div
            className="h-6 transition-all duration-500 bg-green-500"
            style={{ width: `${Math.min((userExp / 100) * 100, 100)}%` }}
          ></div>
        </div>
        <p className="mt-1">EXP: {userExp}</p>
      </div>

      {/* Modul List */}
      <ul>
        {modules.map((mod) => (
          <li
            key={mod.id}
            className="flex items-center justify-between p-2 mb-2 border rounded"
          >
            <span>{mod.title}</span>
            {mod.completed ? (
              <span className="font-bold text-green-500">✓ Selesai</span>
            ) : (
              <button
                className="px-3 py-1 text-white bg-blue-500 rounded"
                onClick={() => handleComplete(mod.id)}
              >
                Selesai
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Modules;
