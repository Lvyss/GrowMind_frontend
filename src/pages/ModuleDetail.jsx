import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getModuleDetail } from "../api/growmind";

export default function ModuleDetail() {
  const { slug } = useParams();
  const [module, setModule] = useState(null);

  useEffect(() => {
    getModuleDetail(slug).then(setModule);
  }, [slug]);

  if (!module) return <p>Loading module...</p>;

  // Materi utama
  const lesson = module.lessons[0];

  return (
    <div className="p-6">
      <h1 className="mb-4 text-3xl font-bold">{module.title}</h1>
      <p className="mb-6">{module.description}</p>

      <div className="p-4 border rounded-md bg-gray-50">
        <h2 className="mb-2 text-2xl font-semibold">{lesson.title}</h2>
        <div className="prose" dangerouslySetInnerHTML={{ __html: lesson.content }} />
      </div>
    </div>
  );
}
