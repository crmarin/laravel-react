import { createWithEqualityFn } from 'zustand/traditional';
import { devtools } from 'zustand/middleware';
import api from '../utils/api';

let store = (set, get) => ({
  products: [],
  getAllProducts: async () => {
    try {
      api.defaults.headers.Authorization =
        "Bearer " + localStorage.getItem("token");
      const { data } = await api.get('/products');
      set({ products: data.data }, false, { type: 'createProduct' });
    } catch (err) {
      set({ error: err.response }, false, {
        type: 'createProduct-fail',
      });
    }
  },
  registerVehicle: async (formData, id) => {
  },
  updateVehicle: async (formData, id) => {
  },
  removeVehicle: async (id) => {
  },
});

const useProductsStore = createWithEqualityFn(
  devtools(store, {
    name: 'vehicle',
  }),
  Object.is // Specify the default equality function, which can be shallow
);

export { useProductsStore };