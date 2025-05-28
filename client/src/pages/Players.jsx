import React, { useState, useEffect } from 'react';
import { getAthletesByCoachId, createAthlete } from '../api/athletes';
import { getAllSports } from '../api/sports';
import { useCoach } from '../context/CoachContext';
import { getVideoById } from '../api/video';
import { useNavigate } from 'react-router-dom';

const Players = () => {
  const { coach } = useCoach();
  const coachUID = coach?.UID;
  const navigate = useNavigate();

  const [athletes, setAthletes] = useState([]);
  const [sports, setSports] = useState([]);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newAthlete, setNewAthlete] = useState({ name: '', age: '', sportUID: '' });

  useEffect(() => {
    const fetchAthletes = async () => {
      if (!coachUID) return;
      setLoading(true);
      try {
        const data = await getAthletesByCoachId(coachUID);
        const sportsData = await getAllSports();
        
        setSports(sportsData);
        // Map sportUID to sport name for better display
        const athletesWithVideos = await Promise.all(
          data.map(async (athlete) => {
            // Map sportUID to sport name
            const sportName = sportsData.find(s => s.UID === athlete.sportUID)?.name || 'Unknown Sport';

            // Extract all videoUIDs from performances
            const videoUIDs = athlete.performances?.map(p => p.VideoUID) || [];
            // Fetch all video details concurrently
            const videos = await Promise.all(
              videoUIDs.map(async (videoUID) => {
                try {
                  return await getVideoById(videoUID);
                } catch {
                  return null; // or handle error as needed
                }
              })
            );

            // Filter out any failed fetches (null)
            const validVideos = videos.filter(v => v !== null);

            return {
              ...athlete,
              sportName,
              videos: validVideos,
            };
          })
        );
        console.log('Fetched athletes with videos:', athletesWithVideos);
        setAthletes(athletesWithVideos);
      } catch (err) {
        console.error('Error loading athletes');
      } finally {
        setLoading(false);
      }
    };

    fetchAthletes();
  }, [coachUID]);

  const handleChange = (e) => {
    setNewAthlete({
      ...newAthlete,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const athlete = await createAthlete({
        ...newAthlete,
        coachUID,
        age: parseInt(newAthlete.age, 10),
        sportUID: parseInt(newAthlete.sportUID, 10),
      });
      setAthletes([...athletes, {
        ...athlete,
        sportName: sports.find((sport) => sport.UID === parseInt(athlete.sportUID, 10))?.name || 'Unknown Sport',
      }]);
      setNewAthlete({ name: '', age: '', sportUID: '' });
    } catch (err) {
      alert('Failed to create athlete');
    }
  };
  

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Athletes for: {coach?.name}</h2>

      <form onSubmit={handleCreate} className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Athlete Name"
          value={newAthlete.name}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={newAthlete.age}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <select
          name="sportUID"
          value={newAthlete.sportUID}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        >
          <option value="">Select Sport</option>
          {sports.map((sport) => (
            <option key={sport.UID} value={sport.UID}>
              {sport.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="col-span-1 md:col-span-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Add Athlete
        </button>
      </form>


      {loading ? (
        <p>Loading athletes...</p>
      ) : athletes.length === 0 ? (
        <p>No athletes found for this coach.</p>
      ) : (
        <table className="w-full table-auto border">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-4 py-2">UID</th>
          <th className="border px-4 py-2">Name</th>
          <th className="border px-4 py-2">Age</th>
          <th className="border px-4 py-2">Sport</th>
          <th className="border px-4 py-2">Video URLs</th>
        </tr>
      </thead>
      <tbody>
        {athletes.map((athlete) => (
          <tr key={athlete.UID} className="hover:bg-gray-50">
            <td className="border px-4 py-2">{athlete.UID}</td>
            <td className="border px-4 py-2">{athlete.name}</td>
            <td className="border px-4 py-2">{athlete.age}</td>
            <td className="border px-4 py-2">{athlete.sportName}</td>
            <td className="border px-4 py-2">
              {athlete.videos.length > 0 ? (
                <select
                  className="p-1 border rounded"
                  onChange={(e) => {
                    const videoUID = e.target.value;
                    if (videoUID) {
                      navigate(`/video/${videoUID}`);
                    }
                  }}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Video
                  </option>
                  {athlete.videos.map((video, idx) => (
                    <option key={idx} value={video.UID}>
                      {video.url.length > 40
                        ? video.url.slice(0, 40) + '...'
                        : video.url}
                    </option>
                  ))}
                </select>
              ) : (
                <span>No videos</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>

      )}
    </div>
  );
};

export default Players;
