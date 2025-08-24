
import React from 'react';

const MainSection: React.FC = () => {
  const cars = [
    { name: 'Tesla Model S', img: '/images/pngtree-tesla-model-s-car-png-image_17862572.png' },
    { name: 'BMW M5', img: '/images/BMW-M5-PNG-HD.png' },
    { name: 'Audi A6', img: '/images/Audi-A6-PNG-Download-Image.png' },
  ];

  return (
    <main className="bg-gray-100 text-gray-800">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Find Your Dream Car Today</h1>
        <p className="text-lg md:text-xl mb-8">Explore top deals, trusted models, and unbeatable financing options.</p>
        <button className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-md font-semibold hover:bg-yellow-300 transition">
          Browse Inventory
        </button>
      </section>

      {/* Inventory Showcase */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Cars</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {cars.map((car, index) => (
            <div key={index} className="bg-white rounded-xl shadow hover:shadow-lg transition p-5">
              <img
                src={car.img}
                alt={car.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
              <p className="text-gray-600">Luxury, performance, and technology all in one package.</p>
              <button className="mt-4 text-yellow-500 hover:underline">View Details</button>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Why Choose CarzXpress?</h2>
          <p className="text-gray-600 mb-10">
            Trusted by thousands. We offer the best selection, top prices, and certified service.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { title: 'Wide Inventory', desc: 'From economy to luxury, we have it all.' },
              { title: 'Expert Service', desc: 'Certified mechanics & transparent servicing.' },
              { title: 'Easy Financing', desc: 'Flexible plans that fit your budget.' },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-gray-100 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financing and Service */}
      <section className="bg-gray-800 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Flexible Financing & Trusted Services</h2>
          <p className="text-gray-300 mb-8">Own the car of your dreams with stress-free monthly plans and quality after-sales support.</p>
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            <div className="bg-gray-900 p-6 rounded-md shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Apply for Financing</h3>
              <p className="text-gray-400">Quick approval and lowest rates guaranteed.</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-md shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Book a Service</h3>
              <p className="text-gray-400">Certified care for every model we sell.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Location */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Visit Us or Get In Touch</h2>
          <p className="text-gray-600 mb-6">123 Auto Street, Motor City, PK | +92-300-1234567 | info@carzxpress.com</p>
          <iframe
            className="w-full h-64 border rounded-md"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28941.190808758145!2d67.00111384999999!3d24.86073485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33dfeec7e2dd1%3A0x4a978089ea9a2edb!2sKarachi%2C%20Pakistan!5e0!3m2!1sen!2s!4v1692000000000!5m2!1sen!2s"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </section>

    </main>
  );
};

export default MainSection;





























