import api from "./axios";

export const getNotes = () => api.get("/notes");

export const createNote = (data) => api.post("/notes", data);

export const updateNote = (id, data) =>
  api.patch(`/notes/${id}`, data);

export const deleteNote = (id) =>
  api.delete(`/notes/${id}`);

export const getNote = (id) =>
  api.get(`/notes/${id}`);