import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCoach } from '../context/CoachContext';


import { login } from '../api/auth';

const Login = () => {
    
    const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setCoach } = useCoach();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await login(username);
      console.log('Logged in:', response);
      setCoach(response); // Set the coach in context
      navigate('/dashboard');

    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-950 p-10 rounded-2xl shadow-2xl border border-gray-800 w-full max-w-sm"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-400 tracking-wide">
          Coach Portal
        </h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full px-4 py-3 mb-6 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition duration-200"
        >
          Enter Arena
        </button>
      </form>
    </div>
  );
};

export default Login;
