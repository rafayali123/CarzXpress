import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black px-6 py-16 text-gray-200">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-5xl font-extrabold text-center mb-12 text-yellow-400 animate-fade-in tracking-wide drop-shadow-lg">
          About <span className="text-white">CarzXpress</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-slide-in-left">
            <p className="text-lg leading-relaxed text-gray-300">
              <span className="text-yellow-400 font-semibold">CarzXpress</span> stands as a symbol of luxury, trust, and performance.
              Whether you're upgrading your lifestyle or finding your first dream car, we're here to turn your journey into an experience.
            </p>

            <p className="text-lg leading-relaxed text-gray-300">
              With a carefully curated collection of premium, family, and electric vehicles, we bring you choices that balance elegance, efficiency, and excellence.
            </p>

            <p className="text-lg leading-relaxed text-gray-300">
              Beyond sales, our customer-first approach includes seamless financing, expert advice, top-notch servicing, and after-sale support that ensures peace of mind.
            </p>

            <p className="text-lg leading-relaxed text-gray-300">
              Thousands have driven away satisfied with <span className="text-yellow-400 font-semibold">CarzXpress</span>. Now it's your turn to explore excellence on wheels.
            </p>
          </div>

          {/* Right Image */}
          <div className="flex justify-center animate-slide-in-right">
            <img
              src="/images/GST-treatment-of-luxury-cars-in-your-business.png"
              alt="Luxury car showroom"
              className="rounded-2xl shadow-2xl w-full max-w-md transition-transform hover:scale-105 duration-300"
            />
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slide-in-left {
            from { opacity: 0; transform: translateX(-40px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes slide-in-right {
            from { opacity: 0; transform: translateX(40px); }
            to { opacity: 1; transform: translateX(0); }
          }

          .animate-fade-in {
            animation: fade-in 0.8s ease-out forwards;
          }

          .animate-slide-in-left {
            animation: slide-in-left 0.8s ease-out forwards;
          }

          .animate-slide-in-right {
            animation: slide-in-right 0.8s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default About;
