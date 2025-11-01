import React from "react";
import { useNavigate } from "react-router-dom";

export default function ModuleCard({ module }) {
  const navigate = useNavigate();
  return (
    <div
      className="p-4 border rounded-lg shadow cursor-pointer hover:shadow-lg"
      onClick={() => navigate(`/modules/${module.slug}`)}
    >
      <img
        src={module.thumbnail}
        className="object-cover w-full h-32 rounded"
      />
      <h3 className="mt-2 text-xl font-semibold">{module.title}</h3>
      <p className="text-gray-500">Lessons: {module.lessons_count}</p>
    </div>
  );
}
