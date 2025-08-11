import React from 'react';
import { FaCar, FaTools, FaHandshake, FaCreditCard, FaShieldAlt } from 'react-icons/fa';

const services = [
  {
    icon: <FaCar size={40} className="text-yellow-500" />,
    title: 'Car Sales',
    description:
      'Explore a wide range of new and pre-owned vehicles from top brands with competitive pricing and flexible financing options.',
  },
  {
    icon: <FaTools size={40} className="text-yellow-500" />,
    title: 'Maintenance & Repairs',
    description:
      'Professional service center with certified technicians to keep your car in peak condition using genuine parts and latest tools.',
  },
  {
    icon: <FaHandshake size={40} className="text-yellow-500" />,
    title: 'Trade-In Program',
    description:
      'Upgrade your ride easily by trading in your old car. Get fair market value and seamless processing.',
  },
  {
    icon: <FaCreditCard size={40} className="text-yellow-500" />,
    title: 'Financing Options',
    description:
      'Flexible financing solutions tailored to your budget. Work with our specialists to find the best loan or lease plan.',
  },
  {
    icon: <FaShieldAlt size={40} className="text-yellow-500" />,
    title: 'Warranty & Protection',
    description:
      'Comprehensive warranty packages and protection plans for your peace of mind, covering repairs and roadside assistance.',
  },
];

const Services: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 px-6 py-16">
      <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-14 underline decoration-yellow-500">
        Our Services
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {services.map(({ icon, title, description }, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition cursor-pointer group"
          >
            <div className="mb-6">{icon}</div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-yellow-500 transition">{title}</h3>
            <p className="text-gray-700">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
