import React from "react";
import { loginWithGoogle } from "../api/auth";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold">GrowMind Login</h1>
      <button
        onClick={loginWithGoogle}
        className="px-4 py-2 text-white bg-green-600 rounded-lg"
      >
        Sign in with Google
      </button>
    </div>
  );
}
