import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/api";

export default function QuestionListAdmin() {
  const { id } = useParams();
  const [section, setSection] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const res = await api.get(`/admin/questions/${id}/index`);
    setSection(res.data.section);
    setQuestions(res.data.questions);
  };

  const deleteQuestion = async (id) => {
    if (!confirm("Delete this question?")) return;
    await api.delete(`/admin/questions/${id}/delete`);
    fetchQuestions();
  };

  if (!section) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="mb-2 text-xl font-bold">
        Questions — {section.title}
      </h2>

      <Link
        to={`/admin/sections/${id}/questions/create`}
        className="inline-block px-4 py-2 mb-3 text-white bg-green-600 rounded"
      >
        + Add Question
      </Link>

      <div className="space-y-2">
        {questions.map((q, i) => (
          <div key={q.id} className="flex justify-between p-3 bg-white border rounded">
            <div>
              <p className="font-semibold">{i + 1}. {q.question}</p>
              <p className="text-sm text-gray-500">Type: {q.type}</p>
            </div>

            <div className="flex gap-2">
<Link
  to={`/admin/sections/${id}/questions/${q.id}/edit`}
  className="px-2 py-1 text-sm text-white bg-blue-600 rounded"
>
  Edit
</Link>


              <button
                onClick={() => deleteQuestion(q.id)}
                className="px-2 py-1 text-sm text-white bg-red-600 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
