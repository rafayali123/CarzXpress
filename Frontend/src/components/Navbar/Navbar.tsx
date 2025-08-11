import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-900 text-gray-300 px-6 py-4 flex justify-between items-center">
      {/* Company name on the left */}
      <div className="flex items-center">
        <Link to="/home" className="text-yellow-400 font-bold text-lg">CarzXpress</Link>
      </div>
      
      {/* Navigation links on the right with underline hover effect */}
      <div className="flex space-x-6 items-center">
        <Link to="/home" className="hover:text-yellow-400 relative group">
          Home
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link to="/about" className="hover:text-yellow-400 relative group">
          About
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link to="/cars" className="hover:text-yellow-400 relative group">
          Cars
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link to="/contact" className="hover:text-yellow-400 relative group">
          Contact
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link to="/services" className="hover:text-yellow-400 relative group">
          Services
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
