import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function ModuleFillChallengeUser() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [moduleId, setModuleId] = useState(null);
  const [pending, setPending] = useState([]);
  const [current, setCurrent] = useState(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ get module & pending questions
  const fetchPending = async () => {
    try {
      const mod = await api.get(`/modules/${slug}`);
      setModuleId(mod.data.id);

      const res = await api.get(`/modules/${slug}/challenges/pending`);


      const list = res.data;
      setPending(list);

      if (list.length > 0) {
        // pilih random
        const rand = list[Math.floor(Math.random() * list.length)];
        setCurrent(rand);
      } else {
        setCurrent(null);
      }
    } catch (err) {
      alert("Gagal load soal");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

const submitAnswer = async () => {
  if (!answer.trim()) {
    setFeedback("Isi jawaban dulu");
    return;
  }

  if (!current?.id) {
    setFeedback("Challenge belum siap");
    return;
  }

  try {
    // ✅ Pastikan selalu array, tidak null
    const userAnswer = answer ? [answer.trim()] : [];

    console.log({ userAnswer, challengeId: current.id }); // debug

    const res = await api.post(
      `/modules/${slug}/challenges/${current.id}/submit`,
      { answer: userAnswer }
    );

    setFeedback(res.data.message);

    if (res.data.correct) {
      setTimeout(async () => {
        setAnswer("");
        setFeedback("");

        // ✅ refresh pending challenges
        const refresh = await api.get(`/modules/${slug}/challenges/pending`);
        const list = refresh.data;
        setPending(list);

        if (list.length > 0) {
          const next = list[Math.floor(Math.random() * list.length)];
          setCurrent(next);
        } else {
          setCurrent(null);
        }
      }, 800);
    }
  } catch (err) {
    console.error(err); // lihat error asli di console
    setFeedback(
      err.response?.data?.error || "Error kirim jawaban"
    );
  }
};




  if (loading) return <p className="p-4">Loading challenge...</p>;

  // ✅ Semua selesai
  if (!current) {
    return (
      <div className="max-w-lg p-8 mx-auto text-center bg-white rounded shadow">
        <h2 className="mb-2 text-2xl font-bold text-green-600">🎉 Semua Tantangan Selesai!</h2>
        <button
          onClick={() => navigate(`/modules/${slug}`)}
          className="px-4 py-2 mt-4 text-white bg-blue-600 rounded"
        >
          Kembali ke Modul
        </button>
      </div>
    );
  }

  return (
  <div className="max-w-lg p-8 mx-auto bg-white rounded shadow">
    <h2 className="mb-4 text-xl font-semibold">
      Tantangan Tersisa: {pending.length}
    </h2>

    {/* ✅ Tampilkan deskripsi/perintah challenge */}
    <p className="mb-3 font-medium text-gray-800">
      {current.info}
    </p>

    <pre className="p-3 mb-3 text-green-300 whitespace-pre-wrap bg-gray-900 rounded">
{current.code}
    </pre>

    <input
      className="w-full p-2 mb-3 border rounded"
      placeholder="Jawaban kamu..."
      value={answer}
      onChange={(e) => {
        setAnswer(e.target.value);
        setFeedback("");
      }}
    />

    <button
      onClick={submitAnswer}
      className="w-full px-4 py-2 mb-2 text-white bg-blue-600 rounded"
    >
      Submit
    </button>

    {feedback && (
      <div
        className={`p-2 rounded text-center font-medium ${
          feedback.toLowerCase().includes("benar")
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {feedback}
      </div>
    )}
  </div>
);
}