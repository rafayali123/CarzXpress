import React, { useState, useEffect } from 'react';

// Empty initial cars array as we'll fetch from API
const initialCars: any[] = [
  {
    name: 'Tesla Model S',
    price: '$80,000',
    description: 'Luxury electric sedan with autopilot features.',
    image: 'https://share.google/images/W44ia6Ki4m9XWP3mm',
    company: 'Tesla',
  },
  {
    name: 'BMW M4 Coupe',
    price: '$75,000',
    description: 'Performance-driven German engineering.',
    image: 'https://source.unsplash.com/400x250/?bmw',
    company: 'BMW',
  },
  {
    name: 'Audi Q8',
    price: '$70,000',
    description: 'Premium SUV with cutting-edge tech.',
    image: 'https://source.unsplash.com/400x250/?audi',
    company: 'Audi',
  },
  {
    name: 'Toyota Supra',
    price: '$50,000',
    description: 'Stylish and sporty performance machine.',
    image: 'https://source.unsplash.com/400x250/?supra',
    company: 'Toyota',
  },
  {
    name: 'Tesla Model X',
    price: '$90,000',
    description: 'Electric SUV with falcon wing doors.',
    image: 'https://source.unsplash.com/400x250/?tesla,suv',
    company: 'Tesla',
  },
  {
    name: 'BMW X5',
    price: '$65,000',
    description: 'Luxury SUV for comfort and performance.',
    image: 'https://source.unsplash.com/400x250/?bmw,suv',
    company: 'BMW',
  },
  {
    name: 'Audi A4',
    price: '$45,000',
    description: 'Elegant sedan with advanced features.',
    image: 'https://source.unsplash.com/400x250/?audi,sedan',
    company: 'Audi',
  },
  {
    name: 'Toyota Corolla',
    price: '$25,000',
    description: 'Reliable and efficient compact sedan.',
    image: 'https://source.unsplash.com/400x250/?toyota,car',
    company: 'Toyota',
  },
  {
    name: 'Tesla Roadster',
    price: '$200,000',
    description: 'High-performance electric sports car.',
    image: 'https://source.unsplash.com/400x250/?tesla,roadster',
    company: 'Tesla',
  },
  {
    name: 'BMW Z4',
    price: '$60,000',
    description: 'Convertible with premium driving experience.',
    image: 'https://source.unsplash.com/400x250/?bmw,z4',
    company: 'BMW',
  },
  {
    name: 'Audi TT',
    price: '$50,000',
    description: 'Stylish compact sports car.',
    image: 'https://source.unsplash.com/400x250/?audi,tt',
    company: 'Audi',
  },
  {
    name: 'Toyota Camry',
    price: '$30,000',
    description: 'Spacious and fuel-efficient sedan.',
    image: 'https://source.unsplash.com/400x250/?toyota,camry',
    company: 'Toyota',
  },
];

const Cars: React.FC = () => {
  const [search, setSearch] = useState('');
  const [companyFilter, setCompanyFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [cars, setCars] = useState(initialCars);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 12;

  // Fetch cars from API when component mounts
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8005/api/cars');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched cars data:', data); // Debug log
        setCars(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching cars:', err); // Debug log
        setError('Failed to load cars. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const filteredCars = cars.filter(
    (car) =>
      (companyFilter === 'All' || car.company === companyFilter) &&
      car.name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastCar = currentPage * itemsPerPage;
  const indexOfFirstCar = indexOfLastCar - itemsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);

  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen px-6 py-16">
      <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-12 underline decoration-yellow-500">Explore Our Collection</h1>
      
      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
        <input
          type="text"
          placeholder="Search cars..."
          className="w-full md:w-1/2 px-5 py-3 rounded-full shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="w-full md:w-1/4 px-4 py-3 rounded-full shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={companyFilter}
          onChange={(e) => setCompanyFilter(e.target.value)}
        >
          <option value="All">All Companies</option>
          <option value="Tesla">Tesla</option>
          <option value="BMW">BMW</option>
          <option value="Audi">Audi</option>
          <option value="Toyota">Toyota</option>
        </select>
      </div>

      {/* Loading indicator */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500 mb-4"></div>
          <p className="text-gray-600">Loading cars...</p>
        </div>
      ) : cars.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No cars available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {currentCars.map((car, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-300"
          >
            <img src={car.image} alt={car.name} className="w-full h-48 object-cover" />
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-800 mb-1">{car.name}</h3>
              <p className="text-yellow-600 font-semibold mb-1">{car.price}</p>
              <p className="text-sm text-gray-600 mb-3">{car.description}</p>
              <button
                className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 transition w-full"
                onClick={() => setSelectedCar(car)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-10 space-x-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-full text-sm font-medium shadow-md transition-all duration-200 ${
              currentPage === i + 1
                ? 'bg-yellow-500 text-white'
                : 'bg-white text-gray-800 hover:bg-yellow-200'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Modal */}
      {selectedCar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setSelectedCar(null)}
            >
              ✕
            </button>
            <img src={selectedCar.image} alt={selectedCar.name} className="w-full h-56 object-cover rounded-lg mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedCar.name}</h2>
            <p className="text-yellow-600 font-semibold mb-2">{selectedCar.price}</p>
            <p className="text-gray-700 mb-4">{selectedCar.description}</p>
            <p className="text-sm text-gray-500">Company: {selectedCar.company}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cars;

