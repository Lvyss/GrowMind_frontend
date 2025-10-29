import React, { useEffect, useState } from "react";
import { badgesData } from "../data/badges";

export default function Profile() {
  const [xp, setXp] = useState(0);
  const [badges, setBadges] = useState([]);
  const [level, setLevel] = useState("Pemula");

  useEffect(() => {
    const savedXp = parseInt(localStorage.getItem("xp")) || 0;
    setXp(savedXp);

    // Tentukan badge yang didapat
    const unlocked = badgesData.filter((b) => savedXp >= b.threshold);
    setBadges(unlocked);

    // Level berdasarkan XP
    if (savedXp < 100) setLevel("Pemula");
    else if (savedXp < 250) setLevel("Penjelajah");
    else if (savedXp < 500) setLevel("Penguasa Pengetahuan");
    else setLevel("Legenda Pengetahuan");
  }, []);

  // Persentase progress ke level berikutnya
  const nextThreshold = badgesData.find((b) => b.threshold > xp)?.threshold || 600;
  const progress = Math.min((xp / nextThreshold) * 100, 100);

  return (
    <div className="p-8 flex flex-col items-center text-center">
      <h1 className="text-3xl font-semibold text-gray-800 mb-2">Profil Pengguna</h1>
      <p className="text-gray-500 mb-6">Perjalanan Pengetahuanmu</p>

      {/* XP Card */}
      <div className="bg-white shadow-md p-6 rounded-2xl w-full max-w-md">
        <h2 className="text-xl font-semibold mb-2">Level: {level}</h2>
        <p className="text-gray-600 mb-3">{xp} XP</p>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div
            className="bg-green-500 h-3 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-400">
          Menuju level berikutnya ({nextThreshold} XP)
        </p>
      </div>

      {/* Pohon Visual */}
      <div className="mt-10">
        {xp < 100 ? (
          <p className="text-6xl">🌱</p>
        ) : xp < 250 ? (
          <p className="text-7xl">🌿</p>
        ) : xp < 500 ? (
          <p className="text-8xl">🌳</p>
        ) : (
          <p className="text-8xl animate-pulse">🌲✨</p>
        )}
        <p className="text-gray-600 mt-2 italic">"Ilmu itu tumbuh dari usaha."</p>
      </div>

      {/* Badge Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Lencana yang Dimiliki</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {badges.map((b) => (
            <div
              key={b.id}
              className="bg-green-50 px-4 py-3 rounded-xl shadow-sm border border-green-100"
            >
              <p className="text-3xl">{b.icon}</p>
              <p className="font-medium text-gray-700">{b.name}</p>
            </div>
          ))}
          {badges.length === 0 && (
            <p className="text-gray-400">Belum ada badge 😅</p>
          )}
        </div>
      </div>
    </div>
  );
}
