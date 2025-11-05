import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

export default function UserHome() {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    api.get("/admin/modules/index").then(res => setModules(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Pilih Modul Belajar</h1>

      <div className="grid gap-4 md:grid-cols-2">
        {modules.map(m => (
          <Link
            key={m.id}
            to={`/modules/${m.id}/sections`}
            className="block p-4 transition border rounded-lg hover:bg-gray-100"
          >
            <h2 className="text-xl font-semibold">{m.title}</h2>
            <p className="text-sm text-gray-600">{m.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
