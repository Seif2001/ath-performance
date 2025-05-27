import React, { useState } from 'react';
import { uploadVideo } from '../api/video'; // Adjust the import path as necessary
import { useCoach } from '../context/CoachContext'; // Adjust the import path as necessary

function UploadVideo() {
  const [file, setFile] = useState(null);
const { coach } = useCoach();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a video file');
    try {
        if (!coach || !coach.UID) {
            return alert('Coach not found. Please log in.');
        }
      const videoData = { video: file, coachUID: coach?.UID };
      const response = await uploadVideo(videoData);
      if (!response) {
        return alert('Failed to upload video. Please try again.');
      }
      alert('Video uploaded successfully!');
      console.log('Uploaded video:', response);
    } catch (err) {
      console.error('Upload failed', err);
      return alert('Failed to upload video. Please try again.');

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900">
    <div className="w-full max-w-xl bg-white/10 backdrop-blur-md shadow-xl rounded-2xl p-10 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Upload a Video</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-900 hover:file:bg-blue-200 rounded-md bg-white/20 px-4 py-3 placeholder-white text-white"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 px-6 rounded-xl transition-all duration-300"
        >
          Upload Video
        </button>
      </form>
    </div>
  </div>
  
  );
}

export default UploadVideo;
