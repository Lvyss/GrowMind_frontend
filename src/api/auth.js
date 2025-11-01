import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// Inject token otomatis
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Login Google
export const loginWithGoogle = () => {
  window.location.href = "http://127.0.0.1:8000/api/auth/google/redirect";
};

// Fetch user + profile
export const getMe = async () => {
  const { data } = await api.get("/profile");
  return data; // { user, profile }
};

export default api;
