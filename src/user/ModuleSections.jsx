import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";

export default function ModuleSections() {
  const { moduleId } = useParams();
  const [sections, setSections] = useState([]);

  useEffect(() => {
    api.get(`/modules/${moduleId}/sections-progress`).then(res => {
      setSections(res.data);
    });
  }, [moduleId]);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-xl font-bold">Materi Modul</h1>

      <div className="space-y-2">
        {sections.map(sec => (
          <div
            key={sec.id}
            className="flex items-center justify-between p-4 border rounded"
          >
            <div>
              <p className="font-semibold">{sec.order}. {sec.title}</p>
              {sec.completed && (
                <span className="text-sm text-green-600">✅ Selesai</span>
              )}
            </div>

            {sec.locked ? (
              <span className="text-gray-400">🔒 Locked</span>
            ) : (
              <Link
                to={`/modules/${moduleId}/sections/${sec.id}`}
                className="px-3 py-1 text-sm text-white bg-blue-600 rounded"
              >
                Mulai
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
