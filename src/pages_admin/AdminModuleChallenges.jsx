import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";

export default function AdminModuleChallenges() {
  const { moduleId } = useParams();
  const [challenges, setChallenges] = useState([]);
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/admin/modules/${moduleId}/challenges`);
      setChallenges(res.data.challenges || []);
      setModule(res.data.module || null);
    } catch (err) {
      console.error(err);
      setError("Gagal mengambil data challenges.");
      setChallenges([]);
      setModule(null);
    } finally {
      setLoading(false);
    }
  };

  const deleteChallenge = async (id) => {
    if (!confirm("Yakin hapus challenge ini?")) return;
    try {
      await api.delete(`/admin/modules/${moduleId}/challenges/${id}`);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus challenge.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [moduleId]);

  if (loading) return <div className="p-6 text-gray-500">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl p-6 mx-auto mt-8 bg-white rounded-md shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Challenges for: {module?.title || "Unknown Module"}
        </h2>
        <Link
          to={`/admin/modules/${moduleId}/challenges/create`}
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          + Tambah Challenge
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700">ID</th>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700">Pertanyaan</th>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700">Bahasa</th>
              <th className="px-4 py-2 text-sm font-medium text-center text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {challenges.length > 0 ? (
              challenges.map((c) => (
                <tr key={c.id}>
                  <td className="px-4 py-2 text-sm text-gray-700">{c.id}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{c.question}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{c.language}</td>
                  <td className="flex justify-center gap-2 px-4 py-2">
                    <Link to={`/admin/modules/${moduleId}/challenges/${c.id}/edit`}
                      className="px-3 py-1 text-sm text-white bg-yellow-400 rounded hover:bg-yellow-500"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteChallenge(c.id)}
                      className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-6 text-center text-gray-500">
                  Belum ada challenge
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
