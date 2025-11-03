import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function AdminChallengeEdit() {
  const { moduleId, challengeId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    info: "",
    code: "",
    blanks: [""],
    explanation: "",
    order: 1,
    language: "cpp"
  });

  const fetchData = async () => {
    try {
      const res = await api.get(`/admin/modules/${moduleId}/challenges/${challengeId}`);
      const data = res.data;

      setForm({
        info: data.info || "",
        code: data.code || "",
        blanks: data.blanks.length ? data.blanks : [""],
        explanation: data.explanation || "",
        order: data.order || 1,
        language: data.language || "cpp"
      });
    } catch (err) {
      console.error(err);
      alert("Gagal mengambil data challenge.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleBlankChange = (index, value) => {
    const newBlanks = [...form.blanks];
    newBlanks[index] = value;
    setForm({ ...form, blanks: newBlanks });
  };

  const addBlank = () => setForm({ ...form, blanks: [...form.blanks, ""] });
  const removeBlank = (i) => setForm({ ...form, blanks: form.blanks.filter((_, idx) => idx !== i) });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.info.trim() || !form.code.trim()) return alert("Info dan kode wajib diisi!");
    if (form.blanks.some(b => b.trim() === "")) return alert("Semua blanks harus diisi!");

    try {
      const payload = { ...form, blanks: form.blanks };
      await api.put(`/admin/modules/${moduleId}/challenges/${challengeId}`, payload);
      navigate(`/admin/modules/${moduleId}/challenges`);
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Gagal memperbarui challenge. Cek console untuk detail.");
    }
  };

  return (
    <div className="max-w-xl p-6 mx-auto mt-10 bg-white rounded-md shadow-md">
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">Edit Challenge</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-gray-700">Instruksi / Pertanyaan</label>
          <textarea
            name="info"
            value={form.info}
            onChange={handleChange}
            placeholder="Masukkan instruksi soal"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Kode C++ Rumpang</label>
          <textarea
            name="code"
            value={form.code}
            onChange={handleChange}
            placeholder="Masukkan kode rumpang (gunakan ___ untuk blanks)"
            rows={8}
            className="w-full px-3 py-2 font-mono border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Jawaban Blanks</label>
          {form.blanks.map((b, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={b}
                onChange={(e) => handleBlankChange(i, e.target.value)}
                placeholder={`Blank ${i + 1}`}
                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {form.blanks.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeBlank(i)}
                  className="font-semibold text-red-500 hover:text-red-700"
                >
                  Hapus
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addBlank} className="font-medium text-blue-600 hover:text-blue-800">
            + Tambah Blank
          </button>
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Penjelasan (opsional)</label>
          <textarea
            name="explanation"
            value={form.explanation}
            onChange={handleChange}
            placeholder="Masukkan penjelasan"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Urutan (opsional)</label>
          <input
            type="number"
            name="order"
            value={form.order}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Bahasa</label>
          <select
            name="language"
            value={form.language}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>
        </div>

        <button type="submit" className="w-full py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700">
          Update Challenge
        </button>
      </form>
    </div>
  );
}
