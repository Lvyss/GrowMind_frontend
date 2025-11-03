import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAdminModules, deleteAdminModule } from "../api/api";

export default function AdminHome() {
  const [modules, setModules] = useState([]);
  const navigate = useNavigate();

  // Fetch modules
  const fetchModules = async () => {
    try {
      const data = await getAdminModules();
      setModules(data);
    } catch (err) {
      console.error("Error fetching modules", err);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  // Delete module
  const handleDelete = async (slug) => {
    if (!window.confirm("Delete this module?")) return;
    try {
      await deleteAdminModule(slug);
      fetchModules();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Link
          to="/admin/modules/create"
          className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
        >
          + Create Module
        </Link>
      </div>

      <h2 className="mb-3 text-xl font-semibold">Modules</h2>

      {/* Grid modules */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((m) => (
          <div
            key={m.id}
            className="p-5 transition bg-white border rounded-lg shadow hover:shadow-lg"
          >
            <h3 className="text-lg font-semibold">{m.title}</h3>
            <p className="text-sm text-gray-500 capitalize">{m.status}</p>

            <div className="flex flex-wrap gap-2 mt-4">

  {/* Show Module */}
  <button
    className="px-2 py-1 text-xs text-white bg-gray-700 rounded"
    onClick={() => navigate(`/admin/modules/${m.slug}`)}
  >
    Show
  </button>

  {/* Edit Module */}
  <button
    className="px-2 py-1 text-xs text-white bg-blue-600 rounded"
    onClick={() => navigate(`/admin/modules/${m.slug}/edit`)}
  >
    Edit
  </button>

  {/* ➕ NEW: Manage Challenges */}
<Link to={`/admin/modules/${m.id}/challenges`}>
  <button className="px-2 py-1 text-xs text-white bg-purple-600 rounded">
    Challenges
  </button>
</Link>


  {/* Delete */}
  <button
    className="px-2 py-1 text-xs text-white bg-red-600 rounded"
    onClick={() => handleDelete(m.slug)}
  >
    Delete
  </button>

</div>

          </div>
        ))}

        {modules.length === 0 && (
          <div className="text-gray-500 col-span-full">No modules yet.</div>
        )}
      </div>
    </div>
  );
}
