import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// ✅ Tambahkan kembali fungsi login ini
export const loginWithGoogle = () => {
  window.location.href = "http://127.0.0.1:8000/api/auth/google/redirect";
};

// ✅ Fungsi getMe untuk ambil user dari token
export const getMe = async (token) => {
  const { data } = await API.get("/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
