import axios from "axios";

// ==========================
// Axios instance
// ==========================
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// Inject token otomatis
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ==========================
// Auth
// ==========================
export const loginWithGoogle = () => {
  window.location.href = "http://127.0.0.1:8000/api/auth/google/redirect";
};

// Ambil user + profile
export const getMe = async () => {
  const { data } = await api.get("/profile");
  return data; // { user, profile }
};

// ==========================
// Profile
// ==========================
export const getProfile = () => api.get("/profile").then(res => res.data);
export const updateProfile = (data) => api.post("/profile", data).then(res => res.data);

// ==========================
// User Modules
// ==========================
export const getUserModules = () => api.get("/modules").then(res => res.data);
export const getUserModule = (slug) => api.get(`/modules/${slug}`).then(res => res.data);
export const getModuleChallenges = (slug) => api.get(`/modules/${slug}/coding-challenges`).then(res => res.data);
export const getChallenge = (id) => api.get(`/coding-challenges/${id}`).then(res => res.data);
export const submitChallenge = (id, data) => api.post(`/coding-challenges/${id}/submit`, data).then(res => res.data);

// ==========================
// Admin Modules
// ==========================
export const getAdminModules = () => api.get("/admin/modules").then(res => res.data);
export const getAdminModule = (slug) => api.get(`/admin/modules/${slug}`).then(res => res.data);
export const createAdminModule = (data) => api.post("/admin/modules", data).then(res => res.data);
export const updateAdminModule = (slug, data) => api.put(`/admin/modules/${slug}`, data).then(res => res.data);
export const deleteAdminModule = (slug) => api.delete(`/admin/modules/${slug}`).then(res => res.data);


// Admin Coding Challenge CRUD
export const getAdminChallenges = (slug) => api.get(`/admin/modules/${slug}/coding-challenges`).then(res => res.data);
export const createAdminChallenge = (data) => api.post(`/admin/coding-challenges`, data).then(res => res.data);
export const updateAdminChallenge = (id, data) => api.put(`/admin/coding-challenges/${id}`, data).then(res => res.data);
export const deleteAdminChallenge = (id) => api.delete(`/admin/coding-challenges/${id}`).then(res => res.data);


export default api;