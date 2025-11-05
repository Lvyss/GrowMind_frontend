import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import InlineFillQuestion from "../components/InlineFillQuestion";

export default function SectionLearn() {
  const { sectionId } = useParams();
  const navigate = useNavigate();

  const [section, setSection] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [completed, setCompleted] = useState(false);

useEffect(() => {
  api.get(`/sections/${sectionId}`).then(res => {
    setSection(res.data.section);
    setQuestions(res.data.questions);
    setCompleted(res.data.completed);
    setAnswers(Array(res.data.questions.length).fill(""));

    // ✅ Parse content tiptap
    const content = JSON.parse(res.data.section.content);
    editor?.commands.setContent(content);
  });
}, [sectionId]);


  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    editable: false
  });

  if (!section || !editor) return <p className="p-6">Loading...</p>;

const submit = async () => {
  // convert [["0"], ["5"]] → ["0","5"]
  const normalized = answers.map(a => Array.isArray(a) ? a[0] : a);

  const res = await api.post(`/sections/${sectionId}/submit`, { 
    answers: normalized 
  });

  alert(res.data.message);

  if (res.data.status === "correct") {
    navigate(-1);
  }
};


  return (
    <div className="p-6">
      <h1 className="mb-3 text-2xl font-bold">{section.title}</h1>

      {/* ✅ Tiptap Render */}
      <div className="p-4 mb-4 prose bg-white border rounded max-w-none">
        <EditorContent editor={editor} />
      </div>

      <h2 className="mb-2 text-lg font-semibold">Ayo Tes Pengetahuanmu 💪</h2>

      {/* ✅ Jika sudah selesai show badge */}
      {completed && (
        <p className="p-3 mb-4 text-green-700 bg-green-100 border border-green-400 rounded">
          ✅ Kamu sudah menyelesaikan bagian ini!
        </p>
      )}

{questions.map((q, i) => (
  <div key={q.id} className="p-3 mb-4 border rounded bg-gray-50">
    {q.instruction && (
      <p className="mb-1 text-sm text-gray-600">
        📘 {q.instruction}
      </p>
    )}


<InlineFillQuestion
  template={q.template}
  disabled={completed}
  value={answers[i] || []}
  onChange={(vals) => {
    const arr = [...answers];
    arr[i] = vals;
    setAnswers(arr);
  }}
/>

  </div>
))}


      {!completed && (
        <button
          onClick={submit}
          className="px-4 py-2 mt-3 text-white bg-green-600 rounded hover:bg-green-700"
        >
          Kirim Jawaban ✅
        </button>
      )}
    </div>
  );
}
