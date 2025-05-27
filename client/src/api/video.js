import api from './axiosInstance';

export const uploadVideo = async (videoData) => {
  try {
    const formData = new FormData();
    formData.append('video', videoData.video);
    formData.append('coachUID', videoData.coachUID);

    const res = await api.post('/videos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Video upload response:', res.data);
    return res.data;
  } catch (err) {
    console.error('Video upload error:', err);
    throw err;
  }
}

export const getVideosByCoachId = async (coachUID) => {
  try {
    const res = await api.get(`/videos/${coachUID}`);
    console.log('Videos fetched:', res.data);
    return res.data;
  } catch (err) {
    console.error('Error fetching videos:', err);
    throw err;
  }
}