import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const links = [
    { name: 'My Players', path: '/players' },
    { name: 'My Videos', path: '/videos' },
    { name: 'Upload Video', path: '/upload' },
  ];

  return (
    <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Brand */}
          <div className="flex-shrink-0 font-bold text-xl text-blue-400">
            Coach Portal
          </div>

          {/* Links */}
          <div className="flex space-x-8">
            {links.map(({ name, path }) => (
              <Link
                key={name}
                to={path}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === path
                    ? 'bg-blue-600'
                    : 'hover:bg-blue-700 hover:text-white'
                } transition duration-200`}
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
