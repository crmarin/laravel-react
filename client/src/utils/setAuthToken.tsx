import api from './api';

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.Authorization = 'Bearer ' + token;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.Authorization;
    localStorage.removeItem('token');
  }
};

export default setAuthToken;
