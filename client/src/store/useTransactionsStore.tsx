import { createWithEqualityFn } from "zustand/traditional";
import { devtools } from "zustand/middleware";
import api from "../utils/api";

let store = (set, get) => ({
  transactions: [],
  getAllTransactions: async (page, filters) => {
    try {
      const queryParams = new URLSearchParams({
        page,
        ...filters, // Añadimos los filtros como query string
      }).toString();

      const { data } = await api.get(`transactions?${queryParams}`);
      set({ transactions: data }, false, { type: "createTransaction" });
    } catch (error) {
      set({ error: err.response }, false, {
        type: "createTransaction-fail",
      });
    }
  },
  registerTransaction: async (formData) => {
    try {
      const { data } = await api.post("transactions", formData);
      set({ status: data }, false, {
        type: "registerTransaction",
      });
      get().getAllTransactions();
    } catch (err) {
      set({ error: err.response }, false, {
        type: "registerTransaction-fail",
      });
    }
  },
  updateTransaction: async (formData, id) => {
    try {
      const { data } = await api.patch(`transactions/${id}`, formData);
      set({ status: data }, false, {
        type: "updateTransaction",
      });
      get().getAllTransactions(formData.id);
    } catch (err) {
      set({ error: err.response }, false, {
        type: "updateTransaction-fail",
      });
    }
  },
  removeTransaction: async (id) => {
    try {
      const { data } = await api.delete(`transactions/${id}`);
      set({ status: data }, false, {
        type: "removeTransaction",
      });
      get().getAllTransactions();
    } catch (err) {
      set({ error: err.response }, false, {
        type: "registerTransaction-fail",
      });
    }
  },
});

const useTransactionsStore = createWithEqualityFn(
  devtools(store, {
    name: "transaction",
  }),
  Object.is // Specify the default equality function, which can be shallow
);

export { useTransactionsStore };
