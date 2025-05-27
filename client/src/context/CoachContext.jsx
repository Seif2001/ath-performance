import React, { createContext, useContext, useState, useEffect } from 'react';

const CoachContext = createContext();

export const CoachProvider = ({ children }) => {
  const [coach, setCoach] = useState(() => {
    // Read from localStorage initially
    const savedCoach = localStorage.getItem('coach');
    return savedCoach ? JSON.parse(savedCoach) : null;
  });

  useEffect(() => {
    // Save to localStorage when coach changes
    if (coach) {
      localStorage.setItem('coach', JSON.stringify(coach));
    } else {
      localStorage.removeItem('coach');
    }
  }, [coach]);

  return (
    <CoachContext.Provider value={{ coach, setCoach }}>
      {children}
    </CoachContext.Provider>
  );
};

export const useCoach = () => useContext(CoachContext);
