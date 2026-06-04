import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "/api";

if (!import.meta.env.VITE_API_URL && typeof window !== "undefined") {
  console.warn(
    "VITE_API_URL is not set. Using fallback relative API path '/api'. " +
      "For Vercel deployments, ensure VITE_API_URL or Vercel rewrites are configured."
  );
}

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("autotrust_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("autotrust_token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;