import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/api";

export default function ModuleShowAdmin() {
  const { slug } = useParams();
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModule();
  }, []);

  const fetchModule = async () => {
    try {
      const res = await api.get(`/admin/modules/${slug}/show`);
      setModule(res.data);
    } catch (err) {
      console.error(err);
      alert("Gagal fetch module");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure want to delete this section?")) return;

    try {
      await api.delete(`/admin/sections/${id}/delete`);
      setModule((prev) => ({
        ...prev,
        sections: prev.sections.filter((s) => s.id !== id),
      }));
    } catch (err) {
      console.error(err);
      alert("Failed to delete section");
    }
  };

  if (loading) return <p>Loading module...</p>;
  if (!module) return <p>Module not found</p>;

  return (
    <div className="p-6">
      {/* Module Header */}
      <h1 className="mb-1 text-2xl font-bold">{module.title}</h1>
      <p className="mb-4 text-gray-600">{module.description}</p>

      {/* Section List */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">Sections</h2>

        <Link
          to={`/admin/modules/${slug}/sections/create`}
          className="px-4 py-2 text-white bg-blue-600 rounded"
        >
          + Create Section
        </Link>
      </div>

      {module.sections && module.sections.length > 0 ? (
        <div className="space-y-3">
          {module.sections.map((section) => (
            <div
              key={section.id}
              className="p-4 bg-white border rounded shadow-sm"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-bold">
                    {section.order}. {section.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    XP: {section.xp_reward}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Link
                    to={`/admin/modules/${slug}/sections/${section.id}/edit`}
                    className="px-3 py-1 text-sm text-white bg-gray-500 rounded"
                  >
                    Edit Section
                  </Link>

                  <Link
                    to={`/admin/sections/${section.id}/questionslist`}
                    className="px-3 py-1 text-sm text-white bg-blue-500 rounded"
                  >
                    Show Question
                  </Link>
                  <button
                    onClick={() => handleDelete(section.id)}
                    className="px-3 py-1 text-sm text-white bg-red-600 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No sections yet.</p>
      )}
    </div>
  );
}
