import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLesson, completeLesson } from "../api/growmind";
import { useAuth } from "../context/AuthProvider";

export default function LessonPage() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const { refreshProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getLesson(id).then(setLesson);
  }, [id]);

  const handleComplete = async () => {
    await completeLesson(id);
    await refreshProfile();
    alert("Lesson completed! EXP added.");
    navigate(-1); // kembali ke module detail
  };

  if (!lesson) return <p>Loading lesson...</p>;

  return (
    <div className="p-6">
      <h1 className="mb-4 text-3xl font-bold">{lesson.title}</h1>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: lesson.content }}
      />
      {lesson.video_url && (
        <iframe
          className="w-full h-64 my-4"
          src={lesson.video_url}
          title={lesson.title}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      )}
      <button
        onClick={handleComplete}
        className="px-4 py-2 mt-4 text-white bg-green-600 rounded"
      >
        Complete Lesson
      </button>
    </div>
  );
}
