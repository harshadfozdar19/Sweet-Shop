import api from "./api";

export const purchaseSweet = (id, amount = 1) => {
  return api.post(`/sweets/${id}/purchase`, { amount });
};
