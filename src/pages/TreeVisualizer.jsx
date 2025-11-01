import React from "react";

const stages = {
  1: "🌱 Seed",
  2: "🌿 Sprout",
  3: "🌳 Young Tree",
  4: "💪 Strong Tree",
  5: "🌟 Golden Tree",
};

export default function TreeVisualizer({ treeStage, level, exp }) {
  return (
    <div className="p-4 mb-6 text-center border rounded shadow">
      <p className="text-xl font-bold">Your Tree Level: {level}</p>
      <p className="mt-2 text-3xl">{stages[treeStage]}</p>
      <p className="text-gray-500">EXP: {exp}</p>
    </div>
  );
}
