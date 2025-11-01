import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { startQuiz, submitQuiz } from "../api/growmind";
import { useAuth } from "../context/AuthProvider";

export default function QuizPage() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const { refreshProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    startQuiz(id).then(setQuiz);
  }, [id]);

  const handleChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    const result = await submitQuiz(id, answers);
    alert(`Score: ${result.score}, EXP gained: ${result.exp}`);
    await refreshProfile();
    navigate(-1); // kembali ke module detail
  };

  if (!quiz) return <p>Loading quiz...</p>;

  return (
    <div className="p-6">
      <h1 className="mb-4 text-3xl font-bold">{quiz.title}</h1>
      {quiz.questions.map((q) => (
        <div key={q.id} className="mb-4">
          <p className="font-semibold">{q.question}</p>
          {q.type === "mcq" &&
            q.options.map((opt) => (
              <label key={opt.id} className="block">
                <input
                  type="radio"
                  name={`q${q.id}`}
                  value={opt.option_text}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                />{" "}
                {opt.option_text}
              </label>
            ))}
          {q.type === "truefalse" &&
            ["true", "false"].map((opt) => (
              <label key={opt} className="block">
                <input
                  type="radio"
                  name={`q${q.id}`}
                  value={opt}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                />{" "}
                {opt}
              </label>
            ))}
          {q.type === "fill" && (
            <input
              type="text"
              className="w-full p-1 mt-1 border"
              onChange={(e) => handleChange(q.id, e.target.value)}
            />
          )}
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="px-4 py-2 mt-4 text-white bg-green-600 rounded"
      >
        Submit Quiz
      </button>
    </div>
  );
}
