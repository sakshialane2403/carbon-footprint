import api from "./api";

export const loginUser = async (username, password) => {
  const { data } = await api.post("/auth/login", { username, password });
  return data;
};

export const oauthLogin = async (provider) => {
  const { data } = await api.post("/auth/oauth", { provider });
  return data;
};

export const registerUser = async (formData) => {
  const { data } = await api.post("/users/register", formData);
  return typeof data === "string" ? { message: data } : data;
};

export const resetPassword = async (username, currentPassword, newPassword, confirmPassword) => {
  const { data } = await api.post("/auth/reset-password", {
    username,
    currentPassword,
    newPassword,
    confirmPassword,
  });
  return data;
};
