import axios from 'axios';
import * as toast from '@/utils/toastify';
import { useErrorStore } from '@/store//useErrorStore';

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

api.interceptors.response.use(
  function (response) {
    const { data, status } = response;
    if (status === 200) toast.success(data.message);
    else toast.error(data.message);
    return response;
  },
  function (error) {
    useErrorStore.getState().getErrors(error.response.data);
    toast.error(error.response.data.message);
    return Promise.reject(error);
  }
);

export default api;
