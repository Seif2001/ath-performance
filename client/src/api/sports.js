import api from './axiosInstance';

export const getAllSports = async () => {
  try {
    const res = await api.get('/sports');
    console.log('Sports fetched:', res.data);
    return res.data;
  } catch (err) {
    console.error('Error fetching sports:', err);
    throw err;
  }
}