import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";

export default function ModuleListAdmin() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      const res = await api.get("/admin/modules/index");
      setModules(res.data);
    } catch (err) {
      console.error(err);
      alert("Gagal fetch modules");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug) => {
    if (!window.confirm("Are you sure you want to delete this module?")) return;
    try {
      await api.delete(`/admin/modules/${slug}/delete`);
      alert("Module deleted!");
      fetchModules(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Gagal delete module");
    }
  };

  if (loading) return <p>Loading modules...</p>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Modules</h1>
        <Link
          to="/admin/modules/create"
          className="px-4 py-2 text-white bg-green-500 rounded"
        >
          + Create Module
        </Link>
      </div>

      {modules.length === 0 ? (
        <p>No modules found.</p>
      ) : (
        <div className="space-y-2">
          {modules.map((module) => (
            <div
              key={module.id}
              className="flex items-center justify-between p-4 border rounded bg-gray-50"
            >
              <div>
                <h2 className="font-bold">{module.title}</h2>
                <p className="text-sm text-gray-600">{module.description}</p>
                <p className="text-xs text-gray-500">
                  XP Reward: {module.xp_reward} |{" "}
                  {module.published ? "Published" : "Draft"}
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  to={`/admin/modules/${module.slug}/sectionslist`}
                  className="px-3 py-1 text-white bg-blue-500 rounded"
                >
                  Show Section
                </Link>
                <Link
                  to={`/admin/modules/${module.slug}/edit`}
                  className="px-3 py-1 text-white bg-yellow-500 rounded"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(module.slug)}
                  className="px-3 py-1 text-white bg-red-500 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
