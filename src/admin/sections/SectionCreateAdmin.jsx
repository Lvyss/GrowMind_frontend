import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import TextEditor from "../../components/TextEditor"; // Tiptap

export default function SectionCreateAdmin() {
  const { slug } = useParams(); // atau moduleId
  const navigate = useNavigate();
  
  const [title, setTitle] = useState("");
  const [order, setOrder] = useState(1);
  const [xpReward, setXpReward] = useState(10);
  const [content, setContent] = useState({ type: "doc", content: [] }); // default JSON

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/admin/sections/${slug}/store`, {
        title,
        order,
        xp_reward: xpReward,
        content: JSON.stringify(content), // kirim JSON ke backend
      });
      navigate(-1);
    } catch (err) {
      console.error("Gagal membuat section:", err.response?.data || err);
      alert("Gagal membuat section");
    }
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-xl font-bold">Create Section</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Section Title"
          className="w-full p-2 border"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Order"
          className="w-full p-2 border"
          value={order}
          onChange={(e) => setOrder(parseInt(e.target.value))}
        />
        <input
          type="number"
          placeholder="XP Reward"
          className="w-full p-2 border"
          value={xpReward}
          onChange={(e) => setXpReward(parseInt(e.target.value))}
        />

        <div>
          <h2 className="mb-2 font-semibold">Content</h2>
<TextEditor
  content={content}
  onChange={(editorJSON) => setContent(editorJSON)}
/>

        </div>

        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded"
        >
          Create Section
        </button>
      </form>
    </div>
  );
}
