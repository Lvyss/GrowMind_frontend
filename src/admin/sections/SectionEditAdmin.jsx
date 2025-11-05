import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import TextEditor from "../../components/TextEditor";

export default function SectionEditAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    order: 1,
    xp_reward: 0,
    content: { type: "doc", content: [] }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSection();
  }, []);

  const fetchSection = async () => {
    try {
      const res = await api.get(`/admin/sections/${id}/show`);
      setForm({
        title: res.data.title,
        order: res.data.order ?? 1,
        xp_reward: res.data.xp_reward,
        content: res.data.content ? JSON.parse(res.data.content) : { type:"doc", content: []}
      });
    } catch (e) {
      alert("Failed load section");
    } finally {
      setLoading(false);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/admin/sections/${id}/update`, {
        ...form,
        order: parseInt(form.order),
        xp_reward: parseInt(form.xp_reward),
        content: JSON.stringify(form.content)
      });

      navigate(-1);
    } catch {
      alert("Failed update section");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl p-6">
      <h1 className="mb-4 text-xl font-bold">Edit Section</h1>

      <form onSubmit={submit} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Section Title"
        />

        <input
          type="number"
          className="w-full p-2 border rounded"
          value={form.order}
          onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) })}
          placeholder="Order"
        />

        <input
          type="number"
          className="w-full p-2 border rounded"
          value={form.xp_reward}
          onChange={(e) =>
            setForm({ ...form, xp_reward: parseInt(e.target.value) })
          }
          placeholder="XP Reward"
        />

        <div>
          <h2 className="mb-2 font-semibold">Content</h2>
          <TextEditor
            content={form.content}
            onChange={(editorJSON) =>
              setForm({ ...form, content: editorJSON })
            }
          />
        </div>

        <button className="px-4 py-2 text-white bg-blue-600 rounded">
          Save
        </button>
      </form>
    </div>
  );
}
