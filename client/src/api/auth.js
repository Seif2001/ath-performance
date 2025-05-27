import api from './axiosInstance';

export const login = async (username) => {
  try {
    const res = await api.get(`/coaches/${username}`);
    console.log('Login response:', res.data);
    return res.data;
  } catch (err) {
    console.error('Login error:', err);
    throw err;
  }
};
