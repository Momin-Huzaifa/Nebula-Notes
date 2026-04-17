import api from "./axios";

export const logActivity = (data) =>
  api.post("/activity", data);

export const getActivity = () =>
  api.get("/activity");