import React, { useEffect, useState } from "react";
import { getModules, getTree, getProfile } from "../api/growmind"; // tambahkan getProfile
import ModuleCard from "./ModuleCard";
import TreeVisualizer from "./TreeVisualizer";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [modules, setModules] = useState([]);
  const [tree, setTree] = useState(null);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getModules().then(setModules);
    getTree().then(setTree);
    getProfile().then(setProfile); // ambil avatar
  }, []);

  return (
    <div className="p-6">
      {/* Header dengan avatar */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Your GrowMind Dashboard</h1>
<img
  src={profile?.user?.avatar || "fallback.png"} // <-- pakai user.avatar
  alt="Profile Avatar"
  className="w-12 h-12 border-2 border-gray-300 rounded-full cursor-pointer"
  onClick={() => navigate("/profile")}
/>


      </div>

      {/* Tree visualizer */}
      {tree && (
        <TreeVisualizer
          treeStage={tree.tree_stage}
          level={tree.level}
          exp={tree.exp}
        />
      )}

      <h2 className="mt-6 mb-2 text-2xl">Modules</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {modules.map((mod) => (
          <ModuleCard key={mod.id} module={mod} />
        ))}
      </div>
    </div>
  );
}
