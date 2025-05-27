import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Navbar from './components/Navbar';
import Hero from './pages/Hero'; 
import { useLocation } from 'react-router-dom';
import UploadVideo from './pages/UploadVideo';
import Videos from './pages/Videos'; // Adjust the import path as necessary

const AppContent = () => {
  const location = useLocation();
  const hideNavbarOn = ['/']; // you can use '/login' or '/' depending on your route

  const shouldHideNavbar = hideNavbarOn.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Hero />} />

        {/* <Route path="/players" element={<players />} /> */}
        <Route path="/videos" element={<Videos />} />
        <Route path="/upload" element={<UploadVideo />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
