import { createWithEqualityFn } from "zustand/traditional";
import { devtools } from "zustand/middleware";
import api from "../utils/api";

let store = (set, get) => ({
  products: [],
  getAllProducts: async () => {
    try {
      api.defaults.headers.Authorization =
        "Bearer " + localStorage.getItem("token");
      const { data } = await api.get("products");
      set({ products: data.data }, false, { type: "createProduct" });
    } catch (err) {
      set({ error: err.response }, false, {
        type: "createProduct-fail",
      });
    }
  },
  registerProduct: async (formData) => {
    try {
      const { data } = await api.post("products", formData);
      set({ status: data }, false, {
        type: "registerProduct",
      });
      get().getAllProducts();
    } catch (err) {
      set({ error: err.response }, false, {
        type: "registerProduct-fail",
      });
    }
  },
  updateProduct: async (formData, id) => {
    try {
      const { data } = await api.patch(`products/${id}`, formData);
      set({ status: data }, false, {
        type: "updateProduct",
      });
      get().getAllProducts(formData.id);
    } catch (err) {
      set({ error: err.response }, false, {
        type: "updateProduct-fail",
      });
    }
  },
  removeProduct: async (id) => {
    try {
      const { data } = await api.delete(`products/${id}`);
      set({ status: data }, false, {
        type: "removeProduct",
      });
      get().getAllProducts();
    } catch (err) {
      set({ error: err.response }, false, {
        type: "registerProduct-fail",
      });
    }
  },
});

const useProductsStore = createWithEqualityFn(
  devtools(store, {
    name: "product",
  }),
  Object.is // Specify the default equality function, which can be shallow
);

export { useProductsStore };
