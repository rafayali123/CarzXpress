import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCarSide, FaBars, FaTimes, FaArrowRight } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu automatically when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/home' },
    { name: 'About', path: '/about' },
    { name: 'Cars', path: '/cars' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav className="w-full bg-[#050505]/90 border-b border-neutral-800/80 text-gray-300 px-6 sm:px-12 py-4 flex justify-between items-center sticky top-0 z-50 backdrop-blur-xl">
        
        {/* Company Logo & Brand */}
        <div className="flex items-center space-x-3">
          <Link to="/home" className="flex items-center space-x-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-500 p-0.5 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
              <img 
                src="/images/ApexMotors logo.png" 
                alt="ApexMotors Logo" 
                className="w-full h-full object-cover rounded-[10px]"
              />
            </div>
            <span className="text-white font-bold text-xl tracking-tight font-serif italic">
              Apex<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 not-italic font-sans">Motors</span>
            </span>
          </Link>
        </div>
        
        {/* Desktop Navigation Links with Modern Hover Pills */}
        <div className="hidden md:flex space-x-2 items-center text-sm font-medium">
          {navLinks.map((item, idx) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={idx}
                to={item.path}
                className={`px-4 py-2 rounded-xl transition-all duration-300 relative group ${
                  isActive 
                    ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20 font-semibold' 
                    : 'text-gray-300 hover:text-amber-400 hover:bg-amber-500/10'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Right Action CTA & Mobile Toggle Button */}
        <div className="flex items-center space-x-3">
          <Link 
            to="/cars" 
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold text-xs tracking-wider uppercase hover:bg-amber-400 hover:text-black transition-all duration-300 shadow-sm"
          >
            <FaCarSide size={14} />
            View Stock
          </Link>

          {/* Animated Mobile Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 rounded-xl bg-[#0C0B09] border border-neutral-800 flex items-center justify-center text-amber-400 hover:border-amber-500/50 transition-all focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <div className="relative w-5 h-5 flex items-center justify-center">
              <span className={`absolute transform transition-all duration-300 ${isOpen ? 'rotate-45 scale-110' : '-translate-y-1.5'}`}>
                {isOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
              </span>
              <span className={`absolute transform transition-all duration-300 ${isOpen ? '-rotate-45 opacity-0' : 'translate-y-1.5'}`}>
                <FaBars size={18} className="opacity-0" />
              </span>
            </div>
          </button>
        </div>

      </nav>

      {/* Mobile Animated Slide-down / Backdrop Menu Drawer */}
      <div 
        className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-md md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div 
          className={`absolute top-[73px] left-0 w-full bg-gradient-to-b from-[#0C0B09] to-[#050505] border-b border-neutral-800/80 p-6 shadow-2xl transition-transform duration-500 ease-out transform ${
            isOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col space-y-2 py-4">
            {navLinks.map((item, idx) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={idx}
                  to={item.path}
                  className={`flex items-center justify-between px-5 py-3.5 rounded-2xl text-base font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-amber-500/15 border border-amber-500/30 text-amber-400 font-semibold shadow-lg shadow-amber-500/10'
                      : 'text-gray-300 hover:bg-neutral-900/60 hover:text-white border border-transparent'
                  }`}
                >
                  <span>{item.name}</span>
                  <FaArrowRight size={12} className={`transition-transform ${isActive ? 'text-amber-400 translate-x-1' : 'text-neutral-600'}`} />
                </Link>
              );
            })}

            <div className="pt-4 mt-2 border-t border-neutral-800/80">
              <Link 
                to="/cars" 
                className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold text-xs tracking-widest uppercase shadow-xl shadow-amber-500/20 active:scale-[0.98] transition-all"
              >
                <FaCarSide size={16} />
                Explore Inventory Stock
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;