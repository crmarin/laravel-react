import { toast } from 'react-toastify';

export const ok = (data) => {
  toast(data, {
    icon: '✅',
    position: 'top-right',
    autoClose: 1000,
    hideProgressBar: false,
    pauseOnHover: false,
  });
};
export const success = (data) => {
  toast.success(data, {
    position: 'top-right',
    autoClose: 1000,
    hideProgressBar: false,
    pauseOnHover: false,
  });
};
export const error = (data) => {
  toast.error(data, {
    position: 'top-right',
    autoClose: 1000,
    hideProgressBar: false,
    pauseOnHover: false,
  });
};
export const warn = (data) => {
  toast.warn(data, {
    position: 'top-right',
    autoClose: 1000,
    hideProgressBar: false,
    pauseOnHover: false,
  });
};
export const info = (data) => {
  toast.info(data, {
    position: 'top-right',
    autoClose: 1000,
    hideProgressBar: false,
    pauseOnHover: false,
  });
};
