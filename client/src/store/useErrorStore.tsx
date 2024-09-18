import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

let store = (set, get) => ({
  errorGlobal: [],
  clear: true,
  getErrors: (errors) => {
    set({ errorGlobal: errors }, false, {
      type: 'getErrors',
    });
    if (get().clear) {
      setTimeout(() => {
        get().clearErrors();
      }, 5000);
      set({ clear: false }, false, { type: 'preventTimeoutErrorAgain' });
    }
  },
  clearErrors: () =>
    set({ errorGlobal: [], clear: true }, false, {
      type: 'clearErrors',
    }),
});

const useErrorStore = create(
  devtools(store, {
    name: 'errorGlobal',
  })
);

export { useErrorStore };
