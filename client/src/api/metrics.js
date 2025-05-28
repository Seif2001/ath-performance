import api from './axiosInstance';

export const getAllMetrics = async () => { 
    try {
        const res = await api.get('/metrics');
        console.log('Metrics fetched:', res.data);
        return res.data;
    } catch (err) {
        console.error('Error fetching metrics:', err);
        throw err;
    }
}