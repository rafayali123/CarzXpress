import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] text-gray-400 pt-16 pb-8 px-6 border-t border-neutral-800/80 relative overflow-hidden font-sans">
      {/* Background glow accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-amber-500/5 blur-[120px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 relative z-10">
        {/* Contact Info */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-white font-bold text-xl tracking-tight font-serif italic">
              Apex<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 not-italic font-sans">Motors</span>
            </span>
          </div>
          <p className="text-sm text-gray-400 mb-6 font-light leading-relaxed">Your premier destination for luxury, performance, and trusted automotive solutions.</p>
          <div className="space-y-2.5 text-sm">
            <p className="flex items-center space-x-2.5 text-gray-300">
              <span className="text-amber-400">📍</span> <span className="font-light">123 Auto Street, Motor City, PK</span>
            </p>
            <p className="flex items-center space-x-2.5 text-gray-300">
              <span className="text-amber-400">📞</span> <span className="font-light">+92 300 1234567</span>
            </p>
            <p className="flex items-center space-x-2.5 text-gray-300">
              <span className="text-amber-400">✉️</span> <span className="font-light">concierge@apexmotors.com</span>
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4 border-l-2 border-amber-400 pl-3">Navigation</h3>
          <ul className="space-y-2.5 text-sm font-light">
            <li><Link to="/home" className="hover:text-amber-400 transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-amber-400 transition-colors">About Us</Link></li>
            <li><Link to="/cars" className="hover:text-amber-400 transition-colors">Inventory</Link></li>
            <li><Link to="/services" className="hover:text-amber-400 transition-colors">Services</Link></li>
            <li><Link to="/contact" className="hover:text-amber-400 transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Policies and Sitemap */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4 border-l-2 border-amber-400 pl-3">Support</h3>
          <ul className="space-y-2.5 text-sm font-light">
            <li><Link to="/privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-amber-400 transition-colors">Terms of Service</Link></li>
            <li><Link to="/sitemap" className="hover:text-amber-400 transition-colors">Sitemap</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4 border-l-2 border-amber-400 pl-3">Follow Us</h3>
          <p className="text-sm text-gray-400 mb-4 font-light">Stay connected for the latest arrivals and updates.</p>
          <div className="flex space-x-3">
            <a href="#" className="w-10 h-10 rounded-xl bg-[#0C0B09] border border-neutral-800 flex items-center justify-center text-gray-300 hover:text-black hover:bg-amber-400 hover:border-amber-400 transition-all duration-300 shadow-lg">
              <FaFacebook size={16} />
            </a>
            <a href="#" className="w-10 h-10 rounded-xl bg-[#0C0B09] border border-neutral-800 flex items-center justify-center text-gray-300 hover:text-black hover:bg-amber-400 hover:border-amber-400 transition-all duration-300 shadow-lg">
              <FaTwitter size={16} />
            </a>
            <a href="#" className="w-10 h-10 rounded-xl bg-[#0C0B09] border border-neutral-800 flex items-center justify-center text-gray-300 hover:text-black hover:bg-amber-400 hover:border-amber-400 transition-all duration-300 shadow-lg">
              <FaInstagram size={16} />
            </a>
            <a href="#" className="w-10 h-10 rounded-xl bg-[#0C0B09] border border-neutral-800 flex items-center justify-center text-gray-300 hover:text-black hover:bg-amber-400 hover:border-amber-400 transition-all duration-300 shadow-lg">
              <FaLinkedin size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto mt-12 border-t border-neutral-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 font-light">
        <p>&copy; {new Date().getFullYear()} ApexMotors. All rights reserved.</p>
        <p className="mt-2 sm:mt-0">Designed for ultimate automotive excellence.</p>
      </div>
    </footer>
  );
};

export default Footer;