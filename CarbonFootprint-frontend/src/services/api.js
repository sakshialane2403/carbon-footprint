import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("cft_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  const url = String(config.url || "");
  const publicCall = /auth\/login|auth\/oauth|users\/register|chatbot/.test(url);
  try {
    const user = JSON.parse(localStorage.getItem("cft_user") || "null");
    if (user?.userId && !publicCall) {
      config.headers["X-User-Id"] = String(user.userId);
      config.params = { userId: user.userId, ...(config.params || {}) };
    }
  } catch {
    /* ignore */
  }
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (error) => {
    const data = error.response?.data;
    if (typeof data === "string") error.message = data;
    else if (data?.message) error.message = data.message;
    else if (!error.response) error.message = "API not reachable.";
    return Promise.reject(error);
  }
);

export default api;
