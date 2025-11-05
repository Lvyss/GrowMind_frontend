import React from "react";
import ModuleListAdmin from "./modules/ModuleListAdmin";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </header>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Modules</h2>
        <ModuleListAdmin />
      </section>
    </div>
  );
}
