import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAdminModule, updateAdminModule } from "../api/api";
import TextEditor from "../components/TextEditor";

export default function ModuleEditAdmin() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("draft");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch module by slug
  const fetchModule = async () => {
    try {
      const res = await getAdminModule(slug);
      setTitle(res.title);
      setStatus(res.status);
      setContent(res.content || "");
    } catch (error) {
      console.error("❌ Fetch failed:", error);
      alert("Failed to load module");
      navigate("/admin");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModule();
  }, [slug]);

  // Update module
  const handleUpdate = async () => {
    try {
      await updateAdminModule(slug, { title, status, content });
      alert("Module updated successfully!");
      navigate("/admin");
    } catch (err) {
      console.error("❌ Update error:", err);
      if (err.response) {
        alert("Server Error: " + JSON.stringify(err.response.data));
      } else if (err.request) {
        alert("No response from server. Check API/Network.");
      } else {
        alert("Error: " + err.message);
      }
    }
  };

  if (loading) return <div className="p-6 text-gray-500">Loading module...</div>;

  return (
    <div className="max-w-4xl p-8 mx-auto space-y-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800">Edit Module</h1>

      <div>
        <label className="block mb-2 font-medium text-gray-700">Title</label>
        <input
          type="text"
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Module title..."
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-700">Status</label>
        <select
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-700">Content</label>
        <TextEditor content={content} onChange={setContent} />
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleUpdate}
          className="px-6 py-3 font-semibold text-white transition bg-blue-600 rounded-lg shadow hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
