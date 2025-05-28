import React, { useState, useEffect } from 'react';
import { uploadVideo, updateStatus } from '../api/video';
import { useCoach } from '../context/CoachContext';

function UploadVideo() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0); // progress in %
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState('');
  const { coach } = useCoach();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setProgress(0);
    setStatus('');
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!file) return alert('Please select a video file');
  if (!coach || !coach.UID) return alert('Coach not found. Please log in.');

  setUploading(true);
  setStatus('Uploading...');
  setProgress(0);

  // Simulate progress bar for 3 seconds
  const totalDuration = 3000; // 3 seconds
  const updateInterval = 100; // every 100ms
  const increments = totalDuration / updateInterval;
  let currentProgress = 0;

  const interval = setInterval(() => {
    currentProgress += 100 / increments;
    setProgress(Math.min(Math.round(currentProgress), 100));
  }, updateInterval);

  try {
    await new Promise((resolve) => setTimeout(resolve, totalDuration));

    const videoData = { video: file, coachUID: coach.UID };
    const response = await uploadVideo(videoData); // should return video UID

    clearInterval(interval);
    setProgress(100);

    if (!response || !response.UID) {
      setStatus('Upload failed. Please try again.');
      setUploading(false);
      return alert('Failed to upload video. Please try again.');
    }

    // ✅ Call updateStatus with the video UID
    await updateStatus(response.UID);

    setStatus('Video uploaded and status updated successfully!');
    setUploading(false);
    setFile(null);
    console.log('Uploaded video:', response);

  } catch (err) {
    clearInterval(interval);
    setStatus('Upload failed. Please try again.');
    setUploading(false);
    console.error('Upload failed', err);
    alert('Failed to upload video. Please try again.');
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
            disabled={uploading}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-900 hover:file:bg-blue-200 rounded-md bg-white/20 px-4 py-3 placeholder-white text-white"
          />
          <button
            type="submit"
            disabled={uploading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white text-lg font-semibold py-3 px-6 rounded-xl transition-all duration-300"
          >
            {uploading ? 'Uploading...' : 'Upload Video'}
          </button>
        </form>

        {/* Progress bar */}
        {uploading && (
          <div className="mt-6 w-full bg-gray-300 rounded-full h-4 overflow-hidden">
            <div
              className="bg-blue-500 h-4 transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Status message */}
        {status && <p className="mt-4 text-center">{status}</p>}
      </div>
    </div>
  );
}

export default UploadVideo;
