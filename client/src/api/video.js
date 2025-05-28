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

export const getVideoById = async (videoUID) => {
    try {
        const res = await api.get(`/videos/video/${videoUID}`);
        console.log('Video fetched:', res.data);
        return res.data;
    } catch (err) {
        console.error('Error fetching video:', err);
        throw err;
    }
}

export const tagAthleteToVideo = async (tagData) => {
  try {
    const res = await api.post('/coaches/tag', tagData);
    console.log('Athlete tagged to video:', res.data);
    return res.data;
  } catch (err) {
    console.error('Error tagging athlete to video:', err);
    throw err;
  }
}

export const getAthleteTagsByVideoUID = async (videoUID) => {
  try {
    const res = await api.get(`/coaches/video/${videoUID}`);
    console.log('Athlete tags fetched:', res.data);
    return res.data;
  } catch (err) {
    console.error('Error fetching athlete tags:', err);
    throw err;
  }
}

export const checkAthletePerformanceExists = async (athleteUID, videoUID) => {
  try {
    const res = await api.get(`/coaches/checkTag/${athleteUID}/${videoUID}`);
    console.log('Athlete performance check:', res.data);
    return res.data;
  } catch (err) {
    console.error('Error checking athlete performance:', err);
    throw err;
  }
}

export const updateStatus = async (videoUID) => {
  try {
    const res = await api.put(`/videos/updateStatus/${videoUID}`);
    console.log('Video status updated:', res.data);
    return res.data;
  } catch (err) {
    console.error('Error updating video status:', err);
    throw err;
  }
}