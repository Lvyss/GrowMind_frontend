import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";

export default function ModuleEditAdmin() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [slugValue, setSlugValue] = useState(""); // rename because slug param
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModule();
  }, []);

  const fetchModule = async () => {
    try {
      const res = await api.get(`/admin/modules/${slug}/show`);
      setTitle(res.data.title);
      setSlugValue(res.data.slug);
      setDescription(res.data.description || "");
      setPublished(res.data.published);
    } catch (err) {
      console.error(err);
      alert("Gagal fetch module");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await api.put(`/admin/modules/${slug}/update`, {
        title,
        slug: slugValue,
        description,
        published,
      });

      alert("Module updated!");
      navigate(-1);
    } catch (err) {
      console.error(err.response || err);
      alert("Gagal update module");
    }
  };

  if (loading) return <p>Loading module...</p>;

  return (
    <div className="max-w-2xl p-6 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Edit Module</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
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
          value={slugValue}
          onChange={(e) => setSlugValue(e.target.value)}
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

        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          Save Changes
        </button>
      </form>
    </div>
  );
}
