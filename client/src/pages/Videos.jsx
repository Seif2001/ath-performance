import React, { useEffect, useState } from 'react';
import { useCoach } from '../context/CoachContext'; // adjust path as needed
import { getVideosByCoachId } from '../api/video'; // adjust path as needed

function Videos() {
  const { coach } = useCoach();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (coach?.UID) {
      fetchVideos();
    }
  }, [coach]);

  const fetchVideos = async () => {
    try {
      const data = await getVideosByCoachId(coach.UID);
      setVideos(data);
    } catch (err) {
      console.error('Error fetching videos:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-950 py-12 px-4 flex justify-center">
      <div className="w-full max-w-5xl">
        <h2 className="text-3xl font-semibold text-white mb-6 text-center">Your Uploaded Videos</h2>
        {loading ? (
          <p className="text-white text-center">Loading...</p>
        ) : videos.length === 0 ? (
          <p className="text-gray-300 text-center">No videos uploaded yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="min-w-full text-sm text-white bg-blue-900 rounded-lg overflow-hidden">
              <thead className="bg-blue-800 text-left">
                <tr>
                  <th className="px-6 py-4">#</th>
                  <th className="px-6 py-4">Video URL</th>
                  <th className="px-6 py-4">Size (MB)</th>
                  <th className="px-6 py-4">Uploaded At</th>
                </tr>
              </thead>
              <tbody>
                {videos.map((video, index) => (
                  <tr key={video.id} className="hover:bg-blue-700 transition">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4 break-all">
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-300 underline"
                      >
                        {video.url}
                      </a>
                    </td>
                    <td className="px-6 py-4">{(video.size / (1024 * 1024)).toFixed(2)} MB</td>
                    <td className="px-6 py-4">{new Date(video.upload_date).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Videos;
