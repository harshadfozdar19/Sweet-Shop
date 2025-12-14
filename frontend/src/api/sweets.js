import api from "./api";

// get all sweets
export const fetchSweets = async () => {
  const res = await api.get("/sweets");
  return res.data;
};
