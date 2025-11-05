import React, { useState } from "react";
import api from "../../api/api"; // axios instance
import { useNavigate } from "react-router-dom";

export default function ModuleCreateAdmin() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/admin/modules/store", {
        title,
        slug,
        description,
        published,
      });
      navigate(-1);
    } catch (err) {
      console.error("Gagal membuat module:", err.response || err);
      alert("Gagal membuat module, cek console.");
    }
  };

  return (
    <div className="max-w-2xl p-6 mx-auto">
      <h1 className="mb-4 text-xl font-bold">Create Module</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Module Title"
          className="w-full p-2 border"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Slug (unique)"
          className="w-full p-2 border"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
        />
        <textarea
          placeholder="Short description"
          className="w-full p-2 border"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          Published
        </label>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Create Module
        </button>
      </form>
    </div>
  );
}
