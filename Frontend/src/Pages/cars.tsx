import React, { useState, useEffect } from 'react';
import { FaSearch, FaArrowRight, FaTimes, FaShieldAlt } from 'react-icons/fa';

const Cars: React.FC = () => {
  const [search, setSearch] = useState('');
  const [companyFilter, setCompanyFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 12;

  // Fetch live inventory from API when component mounts
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8005/api/cars', { cache: 'no-store' });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setCars(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching cars:', err);
        setError('Failed to load live inventory from server. Please ensure your backend service is running.');
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

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = '/images/Sports Car.png';
  };

  // Extract unique manufacturers dynamically from fetched data
  const uniqueCompanies = ['All', ...Array.from(new Set(cars.map((car) => car.company).filter(Boolean)))];

  return (
    <div className="bg-[#050505] min-h-screen px-4 sm:px-8 lg:px-16 py-20 text-gray-100 selection:bg-amber-400 selection:text-black font-sans relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-amber-500/10 blur-[150px] pointer-events-none rounded-full"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold tracking-widest uppercase border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            Exclusive Fleet
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif italic font-extrabold text-white tracking-tight">
            Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 not-italic font-sans">Collection</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base font-light">
            Discover premier performance machinery, executive sedans, and revolutionary electric models.
          </p>
        </div>
        
        {/* Error message */}
        {error && (
          <div className="bg-amber-500/10 border border-amber-500/30 text-amber-400 px-6 py-4 rounded-2xl mb-8 flex items-center space-x-3 shadow-lg" role="alert">
            <span className="text-lg">⚠️</span>
            <p className="text-xs sm:text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12">
          <div className="w-full md:w-2/3 relative flex items-center bg-[#0C0B09] border border-neutral-800 rounded-2xl shadow-xl">
            <div className="pl-4 text-amber-400">
              <FaSearch size={16} />
            </div>
            <input
              type="text"
              placeholder="Search cars by name..."
              className="w-full bg-transparent px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            />
          </div>

          <select
            className="w-full md:w-1/3 px-6 py-3.5 rounded-2xl bg-[#0C0B09] border border-neutral-800 text-gray-300 focus:outline-none focus:border-amber-500/50 transition-colors shadow-xl cursor-pointer text-sm font-medium"
            value={companyFilter}
            onChange={(e) => { setCompanyFilter(e.target.value); setCurrentPage(1); }}
          >
            {uniqueCompanies.map((company, idx) => (
              <option key={idx} value={company} className="bg-[#0C0B09]">
                {company === 'All' ? 'All Manufacturers' : company}
              </option>
            ))}
          </select>
        </div>

        {/* Loading indicator */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-28">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-400 mb-4"></div>
            <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold">Synchronizing with live inventory...</p>
          </div>
        ) : filteredCars.length === 0 ? (
          <div className="text-center py-24 bg-[#0C0B09] border border-neutral-800 rounded-3xl space-y-4">
            <p className="text-gray-400 text-base">No vehicles found matching your criteria.</p>
            <button 
              onClick={() => { setSearch(''); setCompanyFilter('All'); }}
              className="px-6 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider hover:bg-amber-400 hover:text-black transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentCars.map((car, index) => (
              <div
                key={car.id || index}
                className="bg-[#0C0B09] border border-neutral-800/80 rounded-2xl overflow-hidden shadow-xl hover:border-amber-500/50 hover:shadow-amber-500/10 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="w-full h-52 bg-[#050505] overflow-hidden relative border-b border-neutral-800/60 p-4 flex items-center justify-center">
                  {car.company && (
                    <div className="absolute top-3 left-3 z-10 bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[10px] font-semibold px-2.5 py-0.5 rounded-md backdrop-blur-md uppercase tracking-wider">
                      {car.company}
                    </div>
                  )}
                  <img src={car.image} alt={car.name} onError={handleImageError} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 relative z-0" />
                </div>

                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">{car.name}</h3>
                    <p className="text-amber-400 font-serif font-bold mb-3 text-lg">{car.price}</p>
                    <p className="text-xs text-gray-400 mb-6 line-clamp-2 font-light leading-relaxed">{car.description}</p>
                  </div>
                  <button
                    className="bg-black/60 border border-neutral-800 text-gray-300 font-semibold text-xs tracking-wide py-2.5 px-4 rounded-xl hover:bg-amber-400 hover:text-black hover:border-amber-400 transition-all duration-300 w-full flex items-center justify-between group/btn"
                    onClick={() => setSelectedCar(car)}
                  >
                    <span>View details</span>
                    <FaArrowRight size={11} className="transform group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-14 space-x-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center border ${
                  currentPage === i + 1
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-500 border-amber-400 text-black shadow-lg shadow-amber-500/20'
                    : 'bg-[#0C0B09] border-neutral-800 text-gray-300 hover:border-amber-500/40'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        {/* Modal */}
        {selectedCar && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-[#0C0B09] border border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
              <button
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 text-gray-400 hover:text-white flex items-center justify-center transition-colors"
                onClick={() => setSelectedCar(null)}
              >
                <FaTimes size={14} />
              </button>
              
              <div className="w-full h-56 bg-[#050505] rounded-2xl overflow-hidden mb-6 p-4 border border-neutral-800 flex items-center justify-center relative">
                <img src={selectedCar.image} alt={selectedCar.name} className="w-full h-full object-contain" />
              </div>

              <div className="space-y-2 mb-6">
                {selectedCar.company && (
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">{selectedCar.company}</span>
                )}
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif">{selectedCar.name}</h2>
                <p className="text-amber-400 font-serif font-bold text-xl">{selectedCar.price}</p>
                <p className="text-gray-300 text-sm font-light leading-relaxed pt-2">{selectedCar.description}</p>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex justify-between items-center text-xs text-gray-400">
                {selectedCar.company && (
                  <span>Manufacturer: <strong className="text-white">{selectedCar.company}</strong></span>
                )}
                <span className="py-1 px-3 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1.5 font-medium ml-auto">
                  <FaShieldAlt size={11} /> Verified Stock
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cars;