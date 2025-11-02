import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAdminModule } from "../api/api";
import TextEditor from "../components/TextEditor";

export default function ModuleCreateAdmin() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("draft");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleCreate = async () => {
    try {
      console.log("📤 Sending data:", { title, status, content });

      const res = await createAdminModule({ title, status, content });
      console.log("✅ Success response:", res);

      alert("Module created successfully!");
      navigate("/admin");
    } catch (err) {
      console.error("❌ Error while creating module:", err);
      if (err.response) {
        alert("Server Error: " + JSON.stringify(err.response.data));
      } else if (err.request) {
        alert("No response from server. Check API/Network.");
      } else {
        alert("Error: " + err.message);
      }
    }
  };

  return (
    <div className="max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-md">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Create Module</h1>

      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">Module Title</label>
        <input
          type="text"
          placeholder="Enter module title..."
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-4">
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

      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-700">Content</label>
        <TextEditor content={content} onChange={setContent} />
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleCreate}
          className="px-6 py-3 font-semibold text-white transition bg-blue-600 rounded-lg shadow hover:bg-blue-700"
        >
          Save Module
        </button>
      </div>
    </div>
  );
}
