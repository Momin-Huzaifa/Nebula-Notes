import api from "./axios";

export const loginUser = async (email, password) => {
  const res = await api.get(`/users?email=${email}&password=${password}`);
  return res.data[0];
};

export const registerUser = async (name, email, password) => {
  const res = await api.post("/users", {
    name,
    email,
    password,
    role: "editor" // Default role for new signups
  });
  return res.data;
};