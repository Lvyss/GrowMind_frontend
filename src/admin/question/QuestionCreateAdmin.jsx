import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../../api/api";

export default function QuestionCreateAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [instruction, setInstruction] = useState("");
  const [template, setTemplate] = useState("");
  const [blanks, setBlanks] = useState([]);

  useEffect(() => {
    const count = (template.match(/__/g) || []).length;
    setBlanks(Array(count).fill(""));
  }, [template]);

  const updateBlank = (i, val) => {
    const newB = [...blanks];
    newB[i] = val;
    setBlanks(newB);
  };

  const submit = async (e) => {
    e.preventDefault();

    await api.post(`/admin/questions/${id}/store`, {
      instruction,
      template,
      answers: blanks,
      points: 1
    });

    alert("Question created!");
    navigate(-1);
  };

  return (
    <div className="p-6">
      <h2 className="mb-4 text-xl font-bold">Create Fill-Blank Question</h2>

      <form onSubmit={submit} className="max-w-xl space-y-4">

        {/* Instruction */}
        <div>
          <label className="font-medium">Instruction</label>
          <input
            className="w-full p-2 border rounded"
            placeholder="Contoh: Lengkapi kode berikut!"
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
          />
        </div>

        {/* Template */}
        <div>
          <label className="font-medium">Code Template</label>
          <textarea
            className="w-full p-2 border rounded"
            rows={4}
            placeholder="for(int i = __; i > __; i++)"
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            required
          />
          <p className="mt-1 text-sm text-gray-500">Gunakan `__` untuk blank</p>
        </div>

        {/* Jawaban per blank */}
        {blanks.map((b, i) => (
          <input
            key={i}
            placeholder={`Jawaban blank ${i + 1}`}
            className="w-full p-2 border rounded"
            value={b}
            onChange={(e) => updateBlank(i, e.target.value)}
            required
          />
        ))}

        {/* Buttons */}
        <div className="flex gap-2">
          <button className="px-4 py-2 text-white bg-green-600 rounded">
            Save
          </button>
          <Link
            to={`/admin/sections/${id}/questions`}
            className="px-4 py-2 text-white bg-gray-500 rounded"
          >
            Cancel
          </Link>
        </div>

      </form>
    </div>
  );
}
