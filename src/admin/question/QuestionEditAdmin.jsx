import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../../api/api";

export default function QuestionEditAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [instruction, setInstruction] = useState("");
  const [template, setTemplate] = useState("");
  const [answers, setAnswers] = useState([]);
  const [sectionId, setSectionId] = useState(null);

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    const res = await api.get(`/admin/questions/${id}/show`);

    setInstruction(res.data.instruction ?? "");
    setTemplate(res.data.template ?? "");

    // Pastikan answers jadi array
    let parsed = res.data.answers;
    if (typeof parsed === "string") parsed = JSON.parse(parsed);

    setAnswers(parsed ?? []);
    setSectionId(res.data.section_id);
  };

  const updateAnswer = (i, val) => {
    const newAns = [...answers];
    newAns[i] = val;
    setAnswers(newAns);
  };

  const submit = async (e) => {
    e.preventDefault();

    await api.put(`/admin/questions/${id}/update`, {
      instruction,
      template,
      answers,
    });

    navigate(-1);
  };

  return (
    <div className="p-6">
      <h2 className="mb-4 text-xl font-bold">Edit Fill-Blank Question</h2>

      <form onSubmit={submit} className="max-w-xl space-y-4">

        {/* Instruction */}
        <div>
          <label className="font-medium">Instruction</label>
          <input
            className="w-full p-2 border rounded"
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
          />
        </div>

        {/* Template */}
        <div>
          <label className="font-medium">Template</label>
          <textarea
            className="w-full p-2 border rounded"
            rows={4}
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
          />
          <p className="text-sm text-gray-500">Gunakan `__` sebagai blank</p>
        </div>

        {/* Answers */}
        <div>
          <label className="font-medium">Answers</label>
          {answers.map((ans, i) => (
            <input
              key={i}
              className="w-full p-2 mb-2 border rounded"
              value={ans}
              onChange={(e) => updateAnswer(i, e.target.value)}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button className="px-4 py-2 text-white bg-blue-600 rounded">
            Update
          </button>

          <Link
            to={`/admin/sections/${sectionId}/questions`}
            className="px-4 py-2 text-white bg-gray-500 rounded"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
