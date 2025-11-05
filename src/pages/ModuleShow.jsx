import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getUserModule } from "../api/api"; // backend harus mengirim module + challenges

export default function ModuleShow() {
  const { slug } = useParams();
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModule = async () => {
      try {
        const data = await getUserModule(slug); // backend kirim module + challenges + progress
        setModule(data || null);

      } catch (err) {
        console.error("Failed to load module:", err);
        alert("Failed to load module");
      } finally {
        setLoading(false);
      }
    };

    fetchModule();
  }, [slug]);

  if (loading) return <div className="p-6 text-gray-500">Loading module...</div>;
  if (!module) return <div className="p-6 text-red-500">Module not found</div>;



  return (
    <div className="max-w-4xl p-8 mx-auto space-y-6 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
        <h1 className="text-3xl font-bold text-gray-800">{module.title}</h1>
        <Link
          to="/"
          className="px-4 py-2 text-white transition bg-gray-700 rounded-lg shadow hover:bg-gray-800"
        >
          Back
        </Link>
      </div>

      {/* Status */}
      <span
        className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
          module.status === "published"
            ? "bg-green-500 text-white"
            : "bg-yellow-500 text-black"
        }`}
      >
        {module.status?.toUpperCase() || "UNKNOWN"}
      </span>
<Link
  to={`/modules/${slug}/challenges`}
  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
>
  Mulai Tantangan
</Link>



      {/* Module Content */}
      <div className="mt-6 prose break-words prose-slate max-w-none">
        <div dangerouslySetInnerHTML={{ __html: module.content || "" }} />
      </div>
    </div>
  );
}
