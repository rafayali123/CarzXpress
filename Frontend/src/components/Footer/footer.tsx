import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-yellow-400 mb-4">Contact Us</h3>
          <p className="text-sm">📍 123 Auto Street, Motor City, PK</p>
          <p className="text-sm mt-2">📞 +92 300 1234567</p>
          <p className="text-sm mt-2">✉️ info@carzxpress.com</p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-xl font-semibold text-yellow-400 mb-4">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-yellow-400">Home</Link></li>
            <li><Link to="/about" className="hover:text-yellow-400">About Us</Link></li>
            <li><Link to="/cars" className="hover:text-yellow-400">Inventory</Link></li>
            <li><Link to="/services" className="hover:text-yellow-400">Services</Link></li>
            <li><Link to="/contact" className="hover:text-yellow-400">Contact</Link></li>
          </ul>
        </div>

        {/* Policies and Sitemap */}
        <div>
          <h3 className="text-xl font-semibold text-yellow-400 mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/privacy" className="hover:text-yellow-400">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-yellow-400">Terms of Service</Link></li>
            <li><Link to="/sitemap" className="hover:text-yellow-400">Sitemap</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold text-yellow-400 mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-300 hover:text-yellow-400"><FaFacebook size={20} /></a>
            <a href="#" className="text-gray-300 hover:text-yellow-400"><FaTwitter size={20} /></a>
            <a href="#" className="text-gray-300 hover:text-yellow-400"><FaInstagram size={20} /></a>
            <a href="#" className="text-gray-300 hover:text-yellow-400"><FaLinkedin size={20} /></a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} CarzXpress. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;