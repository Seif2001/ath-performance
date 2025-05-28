import api from './axiosInstance';

export const getAthletesByCoachId = async (coachUID) => {
  try {
    const res = await api.get(`/athletes/${coachUID}`);
    console.log('Athletes fetched:', res.data);
    return res.data;
  } catch (err) {
    console.error('Error fetching athletes:', err);
    throw err;
  }
}
export const createAthlete = async (athleteData) => {
  try {
    const res = await api.post('/athletes', athleteData);
    console.log('Athlete created:', res.data);
    return res.data;
  } catch (err) {
    console.error('Error creating athlete:', err);
    throw err;
  }
}