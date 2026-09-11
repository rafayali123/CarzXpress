import React from 'react';
import { FaShieldAlt, FaAward, FaUsers, FaGlobe, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  const stats = [
    { label: 'Years of Excellence', value: '15+' },
    { label: 'Curated Vehicles', value: '450+' },
    { label: 'Satisfied Collectors', value: '3,200+' },
    { label: 'Global Partners', value: '40+' },
  ];

  const pillars = [
    {
      icon: FaAward,
      title: 'Uncompromised Heritage',
      description: 'Every vehicle in our showroom is hand-selected, meeting the absolute highest standards of provenance, performance, and luxury prestige.',
    },
    {
      icon: FaShieldAlt,
      title: 'Rigorous Verification',
      description: 'Our certified technicians put every machine through a comprehensive 150-point technical inspection before it ever reaches the showroom floor.',
    },
    {
      icon: FaUsers,
      title: 'White-Glove Concierge',
      description: 'From custom-tailored financial structuring to global enclosed transport, our dedicated specialists manage every detail of your acquisition.',
    },
    {
      icon: FaGlobe,
      title: 'Global Sourcing',
      description: 'We leverage an elite international network to source ultra-rare exotics, limited-edition hypercars, and bespoke executive editions worldwide.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 selection:bg-amber-400 selection:text-black font-sans overflow-x-hidden pt-12 pb-24">
      
      {/* Background ambient lighting */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-amber-500/10 blur-[150px] pointer-events-none rounded-full"></div>
      <div className="absolute top-[60%] -right-40 w-[500px] h-[500px] bg-yellow-600/5 blur-[140px] pointer-events-none rounded-full"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 relative z-10">

        {/* ================= HEADER SECTION ================= */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            Our Heritage & Vision
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif italic font-extrabold tracking-tight text-white leading-[1.1]">
            Engineering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 not-italic font-sans">Extraordinary.</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg font-light leading-relaxed pt-2">
            ApexMotors was born from a singular obsession: to redefine how exceptional performance vehicles are discovered, acquired, and experienced.
          </p>
        </div>

        {/* ================= STORY / EDITORIAL GRID ================= */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-28">
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">The Apex Standard</span>
            <h2 className="text-3xl sm:text-4xl font-serif italic font-bold text-white leading-tight">
              Where supreme luxury meets absolute mechanical precision.
            </h2>
            <p className="text-gray-300 font-light text-base leading-relaxed">
              At <span className="text-amber-400 font-medium">ApexMotors</span>, we believe that driving a premier vehicle is not merely transportation—it is a statement of lifestyle, an appreciation of fine engineering, and an emotional experience.
            </p>
            <p className="text-gray-400 font-light text-sm sm:text-base leading-relaxed">
              Whether you are looking for executive comfort in a modern hybrid sedan, track-ready aggression in a carbon-fiber coupe, or timeless elegance in an ultra-luxury grand tourer, our curated collection is built to satisfy the most demanding automotive connoisseurs.
            </p>

            <div className="pt-4 flex items-center gap-6">
              <Link 
                to="/cars" 
                className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-400 to-yellow-500 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-black rounded-xl hover:brightness-110 transition-all shadow-lg shadow-amber-500/20"
              >
                Explore Current Fleet
                <FaArrowRight size={12} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500/20 to-transparent rounded-3xl blur-2xl pointer-events-none"></div>
            <div className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-[#0C0B09] shadow-2xl group">
              <img
                src="/images/GST-treatment-of-luxury-cars-in-your-business.png"
                alt="ApexMotors Luxury Showroom"
                className="w-full h-[400px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div>
                  <span className="text-xs text-amber-400 uppercase tracking-widest font-semibold">Private Showcase</span>
                  <p className="text-white font-serif italic text-xl">The Motor City Flagship Gallery</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold">
                  AM
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= STATS COUNTER BAR ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-28">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-[#0C0B09] border border-neutral-800/80 rounded-2xl p-8 text-center relative overflow-hidden group hover:border-amber-500/40 transition-colors">
              <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h3 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 font-serif mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm uppercase tracking-wider font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ================= CORE PILLARS GRID ================= */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">Why Collectors Trust Us</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">The Pillars of Apex Experience</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => {
              const IconComponent = pillar.icon;
              return (
                <div key={idx} className="bg-[#0C0B09] border border-neutral-800/80 rounded-3xl p-8 flex flex-col justify-between hover:border-amber-500/50 hover:bg-[#12100C] transition-all duration-300 group shadow-xl">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-6 group-hover:bg-amber-400 group-hover:text-black transition-all duration-300 shadow-lg shadow-amber-500/10">
                      <IconComponent size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-gray-400 text-sm font-light leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;