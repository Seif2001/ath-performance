import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCoach } from '../context/CoachContext';

const Hero = () => {
  const navigate = useNavigate();
  const { coach } = useCoach();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center">
      Welcome, Coach {coach?.name || ''}!
      </h1>
      <p className="text-lg text-gray-300 mb-8 text-center max-w-xl">
        Manage your players, analyze videos, and boost performance like never before.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        
        <button
          onClick={() => navigate('/upload')}
          className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-lg transition"
        >
          Upload Video
        </button>
      </div>
    </div>
  );
};

export default Hero;
