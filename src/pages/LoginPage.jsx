import React from "react";

const Login = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:8000/api/auth/google/redirect";
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        className="px-6 py-3 text-white bg-blue-500 rounded"
        onClick={handleLogin}
      >
        Login dengan Google
      </button>
    </div>
  );
};

export default Login;
