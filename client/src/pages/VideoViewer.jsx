import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getVideoById,
  tagAthleteToVideo,
  getAthleteTagsByVideoUID,
  checkAthletePerformanceExists
} from '../api/video';
import { getAllMetrics } from '../api/metrics';
import { getAthletesByCoachId } from '../api/athletes';
import { useCoach } from '../context/CoachContext';
import ReactPlayer from 'react-player';

function VideoViewer() {
  const { videoUID } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);
  const [athletes, setAthletes] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [tagExists, setTagExists] = useState(false);

  const [newTagAthleteUID, setNewTagAthleteUID] = useState('');
  const [newTagMetricUID, setNewTagMetricUID] = useState('');
  const [newTagTimestamp, setNewTagTimestamp] = useState('');
  const [newTagMetricValue, setNewTagMetricValue] = useState('');
  const [tagLoading, setTagLoading] = useState(false);

  const { coach } = useCoach();
  const coachUID = coach?.UID;

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const videoData = await getVideoById(videoUID);
        const tagsData = await getAthleteTagsByVideoUID(videoUID);
        const athletesData = await getAthletesByCoachId(coachUID);
        const metricsData = await getAllMetrics();
        console.log('fetched tags:', tagsData);
        setVideo(videoData);
        setTags(tagsData);
        setAthletes(athletesData);
        setMetrics(metricsData);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [videoUID, coachUID]);

  const handleAddTag = async (e) => {
    e.preventDefault();
    if (!newTagAthleteUID || !newTagMetricUID || newTagTimestamp === '' || newTagMetricValue === '') return;
  
    try {
      setTagLoading(true);
  
      // Check if the athlete's performance tag already exists for this video
      const exists = await checkAthletePerformanceExists( parseInt(newTagAthleteUID, 10), videoUID);
        console.log('Tag exists:', exists);
      if (exists.exists) {
        alert('This athlete already has a performance tag for this video.');
        setTagLoading(false);
        return;  // stop the function here, no duplicate tag added
      }
  
      // If not exists, proceed to add tag
      await tagAthleteToVideo({
        coachUID,
        athleteUID: parseInt(newTagAthleteUID, 10),
        videoUID,
        metricUID: parseInt(newTagMetricUID, 10),
        metric_value: newTagMetricValue,
        timestamp: newTagTimestamp,
      });
  
      // Refresh tags after adding
      const updatedTags = await getAthleteTagsByVideoUID(videoUID);
      setTags(updatedTags);
  
      // Clear form
      setNewTagAthleteUID('');
      setNewTagMetricUID('');
      setNewTagTimestamp('');
      setNewTagMetricValue('');
    } catch (err) {
      alert('Failed to add tag');
    } finally {
      setTagLoading(false);
    }
  };
  
  if (loading) {
    return <p className="text-white text-center mt-20">Loading video...</p>;
  }

  if (!video) {
    return <p className="text-red-400 text-center mt-20">Video not found</p>;
  }

  const fullVideoURL = `${process.env.REACT_APP_BACKEND_URL}/${video.url.replace(/^\/?app\/src\//, '')}`;

  return (
    <div className="min-h-screen bg-blue-950 py-12 px-4 flex flex-col items-center">
      <div className="w-full max-w-3xl text-center">
        <h2 className="text-3xl text-white mb-6">{video.title || 'Video Player'}</h2>
        <ReactPlayer
          url={fullVideoURL}
          controls
          width="100%"
          height="auto"
          className="rounded-lg shadow-lg"
        />
        <p className="text-gray-300 mt-4">
          Uploaded at: {new Date(video.upload_date).toLocaleString()}
        </p>

        {/* Tags Table */}
        <h3 className="text-xl text-white mt-10 mb-4">Tagged Athletes</h3>
        {tags.length === 0 ? (
          <p className="text-gray-400 mb-4">No tags added yet.</p>
        ) : (
          <table className="w-full table-auto border border-gray-700 mb-6 text-white">
            <thead className="bg-blue-800">
              <tr>
                <th className="border px-4 py-2">Athlete Name</th>
                <th className="border px-4 py-2">Metric</th>
                <th className="border px-4 py-2">Value</th>
                <th className="border px-4 py-2">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {tags.map((tag) => (
                <tr key={tag.UID} className="hover:bg-blue-900">
                  <td className="border px-4 py-2">{tag.athlete.name || 'Unknown'}</td>
                  <td className="border px-4 py-2">{tag.metric.name || 'N/A'}</td>
                  <td className="border px-4 py-2">{tag.metric_value}</td>
                  <td className="border px-4 py-2">{tag.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Add Tag Form */}
        <form
          onSubmit={handleAddTag}
          className="flex flex-col md:flex-row gap-4 items-center justify-center"
        >
          <select
            name="athleteUID"
            value={newTagAthleteUID}
            onChange={(e) => setNewTagAthleteUID(e.target.value)}
            className="p-2 rounded border border-gray-600 bg-blue-900 text-white"
            required
          >
            <option value="">Select athlete to tag</option>
            {athletes.map((athlete) => (
              <option key={athlete.UID} value={athlete.UID}>
                {athlete.name}
              </option>
            ))}
          </select>

          <select
            name="metricUID"
            value={newTagMetricUID}
            onChange={(e) => setNewTagMetricUID(e.target.value)}
            className="p-2 rounded border border-gray-600 bg-blue-900 text-white"
            required
          >
            <option value="">Select metric</option>
            {metrics.map((metric) => (
              <option key={metric.UID} value={metric.UID}>
                {metric.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            step="any"
            name="metric_value"
            placeholder="Metric Value"
            value={newTagMetricValue}
            onChange={(e) => setNewTagMetricValue(e.target.value)}
            className="p-2 rounded border border-gray-600 bg-blue-900 text-white"
            required
          />

          <input
            type="number"
            step="any"
            name="timestamp"
            placeholder="Timestamp"
            value={newTagTimestamp}
            onChange={(e) => setNewTagTimestamp(e.target.value)}
            className="p-2 rounded border border-gray-600 bg-blue-900 text-white"
            required
          />

          <button
            type="submit"
            disabled={tagLoading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 px-4 rounded transition"
          >
            {tagLoading ? 'Adding...' : 'Add'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default VideoViewer;
