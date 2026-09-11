import React, { useEffect, useState } from 'react';
import { FaRegHeart, FaHeart, FaArrowRight, FaShieldAlt, FaBolt, FaCar, FaSearch, FaSlidersH } from 'react-icons/fa';
import { GiCarDoor, GiCityCar, GiJeep, GiRaceCar } from 'react-icons/gi';

interface BackendCar {
  _id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  company: string;
}

interface DisplayCar {
  id: string;
  name: string;
  model: string;
  year: string;
  mileage: string;
  price: string;
  badge: string;
  category: string;
  status: string;
  img: string;
}

const MainSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All inventory');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [allCars, setAllCars] = useState<DisplayCar[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('http://localhost:8005/api/cars', { cache: 'no-store' });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const backendCars: BackendCar[] = await response.json();
        setAllCars(backendCars.map((car) => ({
          id: car._id,
          name: car.name,
          model: car.company,
          year: '',
          mileage: '',
          price: car.price,
          badge: car.company,
          category: car.company,
          status: 'In stock',
          img: car.image,
        })));
      } catch (error) {
        console.error('Error fetching home inventory:', error);
      }
    };

    fetchCars();
  }, []);

  const categories = [
    { name: 'Sedan', count: '140+ Models', icon: GiCityCar },
    { name: 'Cabriolet', count: '45+ Models', icon: GiCarDoor },
    { name: 'Coupe', count: '85+ Models', icon: GiRaceCar },
    { name: 'SUV', count: '210+ Models', icon: GiJeep },
    { name: 'Micro', count: '30+ Models', icon: FaCar },
  ];

  const filterTabs = ['All inventory', 'Luxury', 'SUVs', 'Sports', 'Electric'];

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredCars = allCars.filter(car => {
    // 1. Check search query match
    const matchesSearch = searchQuery === '' ||
      car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.model.toLowerCase().includes(searchQuery.toLowerCase());

    // 2. Flexible tab matching (handles category tabs, status filters, and 'All inventory')
    const matchesTab =
      activeTab === 'All inventory' ||
      car.category.toLowerCase() === activeTab.toLowerCase() ||
      car.model.toLowerCase().includes(activeTab.toLowerCase()) ||
      car.status === activeTab;

    return matchesSearch && matchesTab;
  });

  return (
    <main className="w-full bg-[#050505] text-gray-100 selection:bg-amber-400 selection:text-black overflow-x-hidden font-sans relative">

      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-b from-[#050505] via-[#0D0B07] to-[#050505] pt-12 pb-32 px-4 sm:px-8 lg:px-16 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] bg-yellow-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold tracking-wider uppercase backdrop-blur-md shadow-inner">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              ApexMotors Private Fleet Showcase
            </div>

            <h1 className="text-5xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight italic leading-[1.05]">
              Drive something <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 not-italic font-serif">remarkable.</span>
            </h1>

            <p className="text-gray-400 text-base sm:text-lg max-w-xl font-light leading-relaxed">
              Discover elite performance machinery, peerless executive sedans, and revolutionary electric hyper-cars meticulously curated for the discerning driver.
            </p>

            <div className="max-w-xl bg-[#12100C]/90 border border-amber-500/20 p-2 rounded-2xl flex items-center gap-3 backdrop-blur-xl shadow-2xl shadow-black">
              <div className="pl-3 text-amber-400">
                <FaSearch size={18} />
              </div>
              <input
                type="text"
                placeholder="Search by make, model, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-sm text-gray-200 placeholder-gray-500 py-2"
              />
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold text-xs tracking-wider uppercase shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                Search
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/15 via-yellow-500/5 to-transparent blur-3xl rounded-full pointer-events-none"></div>

            <div className="relative group w-full flex items-center justify-center">
              <img
                src="/images/Firefly_RemoveBackground.png"
                alt="ApexMotors Showcase"
                className="w-full max-w-[640px] lg:max-w-[720px] h-auto object-contain relative z-10 drop-shadow-[0_30px_45px_rgba(0,0,0,0.9)] lg:scale-110 lg:translate-x-2 group-hover:scale-[1.15] transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Floating Category Navigation Deck */}
      <section className="relative z-20 max-w-[1300px] mx-auto px-4 -mt-16 mb-20">
        <div className="bg-[#0C0B09]/90 border border-amber-500/15 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat, idx) => {
            const isActive = activeTab.toLowerCase() === cat.name.toLowerCase();
            const IconComponent = cat.icon;
            return (
              <div
                key={idx}
                onClick={() => setActiveTab(cat.name)}
                className={`cursor-pointer rounded-2xl p-5 flex flex-col items-center text-center transition-all duration-300 relative group border ${
                  isActive
                    ? 'bg-gradient-to-b from-amber-500/20 to-[#12100C] border-amber-500/60 shadow-lg shadow-amber-500/10'
                    : 'bg-[#090806]/50 border-neutral-800 hover:border-amber-500/30 hover:bg-[#12100C]'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 ${
                  isActive
                    ? 'bg-amber-400 text-black shadow-lg shadow-amber-500/30 scale-110'
                    : 'bg-neutral-900 text-amber-400/80 group-hover:text-amber-400 group-hover:bg-neutral-800'
                }`}>
                  <IconComponent size={24} />
                </div>
                <h4 className={`text-sm font-bold tracking-wide transition-colors ${isActive ? 'text-amber-400' : 'text-white'}`}>
                  {cat.name}
                </h4>
                <span className="text-[11px] text-gray-400 font-light mt-0.5">{cat.count}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Main Content & Fleet Grid Section */}
      <section className="w-full py-12 px-4 sm:px-8 lg:px-16 max-w-[1400px] mx-auto">
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-px w-6 bg-amber-400"></span>
                <span className="text-amber-400 font-semibold tracking-widest text-[10px] uppercase">Our Collection</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-white italic">
                Drive something <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 not-italic font-serif">remarkable.</span>
              </h2>
            </div>

            <button
              onClick={() => { setActiveTab('All inventory'); setSearchQuery(''); }}
              className="group flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-gray-400 hover:text-amber-400 transition-colors self-start md:self-auto"
            >
              <span>View all vehicles</span>
              <FaArrowRight size={10} className="transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-800/80">
            <div className="flex flex-wrap items-center gap-1 sm:gap-2">
              {filterTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold shadow-md shadow-amber-500/20'
                      : 'text-gray-400 hover:text-white hover:bg-neutral-800/50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0C0B09] border border-neutral-800 text-gray-400 text-xs font-medium cursor-pointer hover:border-amber-500/40 hover:text-amber-400 transition-all select-none"
            >
              <FaSlidersH size={12} />
              <span>Filters</span>
            </div>
          </div>
        </div>

        {/* Car Grid */}
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCars.map((car) => {
              const isFavorited = wishlist.includes(car.id);
              return (
                <div
                  key={car.id}
                  className="bg-[#0C0B09] border border-neutral-800/80 rounded-2xl shadow-xl hover:border-amber-500/50 hover:shadow-amber-500/10 transition-all duration-300 flex flex-col justify-between group overflow-hidden relative"
                >
                  <div className="relative w-full h-52 bg-[#050505] p-4 flex items-center justify-center overflow-hidden border-b border-neutral-800/60">
                    <div className="absolute top-3 left-3 z-20 bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[10px] font-semibold tracking-wide px-3 py-1 rounded-md backdrop-blur-md">
                      {car.badge}
                    </div>

                    <button
                      onClick={(e) => toggleWishlist(car.id, e)}
                      className={`absolute top-3 right-3 z-20 w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                        isFavorited
                          ? 'bg-amber-400 text-black border-amber-400 shadow-md shadow-amber-500/30'
                          : 'bg-black/80 border-neutral-700 text-gray-300 hover:text-amber-400 hover:border-amber-500/50'
                      }`}
                    >
                      {isFavorited ? <FaHeart size={13} /> : <FaRegHeart size={13} />}
                    </button>

                    <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={car.img}
                      alt={car.name}
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = '/images/Sports Car.png';
                      }}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 relative z-10"
                    />
                  </div>

                  <div className="p-5 pb-4">
                    <div className="flex justify-between items-center text-xs text-gray-400 mb-2 font-light">
                      <span>{car.model}</span>
                      <span>{car.year}</span>
                    </div>

                    <h4 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors mb-3">
                      {car.name}
                    </h4>

                    <div className="flex justify-between items-center pt-3 border-t border-neutral-800/60">
                      <span className="text-xs text-gray-400 font-light">{car.mileage}</span>
                      <span className="text-amber-400 font-bold text-lg font-serif">{car.price}</span>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-1">
                    <button className="w-full py-2.5 px-4 rounded-xl bg-black/60 border border-neutral-800 text-gray-300 text-xs font-semibold tracking-wide hover:bg-amber-400 hover:text-black hover:border-amber-400 transition-all duration-300 flex items-center justify-between group/btn">
                      <span>View details</span>
                      <FaArrowRight size={11} className="transform group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="w-full py-12 px-6 bg-[#0C0B09]/60 border border-neutral-800/60 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h4 className="text-white font-medium text-base">No vehicles match this filter</h4>
              <p className="text-gray-400 text-xs mt-1">Try selecting a different category or clearing your search criteria.</p>
            </div>
            <button
              onClick={() => { setActiveTab('All inventory'); setSearchQuery(''); }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold text-xs tracking-wider uppercase shadow-md shadow-amber-500/10 hover:brightness-110 transition-all whitespace-nowrap"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Why Choose ApexMotors Section */}
      <section className="w-full bg-[#030303] py-28 px-4 sm:px-8 lg:px-16 border-y border-neutral-800/60 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/[0.03] blur-[160px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-yellow-500/[0.02] blur-[160px] pointer-events-none rounded-full" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="h-px w-6 bg-amber-400" />
                <span className="text-amber-400 font-semibold tracking-widest text-[10px] uppercase bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/20">
                  Excellence Guaranteed
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 font-serif italic">ApexMotors?</span>
              </h2>
            </div>
            <p className="text-gray-400 max-w-md font-light text-sm sm:text-base leading-relaxed">
              We redefine automotive excellence with transparent deals, certified inspections, and unmatched client support tailored for elite collectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-b from-[#0C0B09] to-[#070705] border border-neutral-800/80 hover:border-amber-500/40 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group transition-all duration-500 hover:-translate-y-1 shadow-2xl">
              <div className="absolute -right-4 -top-4 text-8xl font-black text-neutral-900/40 group-hover:text-amber-500/[0.06] transition-colors font-serif pointer-events-none select-none">01</div>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-8 group-hover:bg-amber-400 group-hover:text-black transition-all duration-300 shadow-lg shadow-amber-500/10">
                  <FaCar className="text-amber-400 group-hover:text-black transition-colors" size={22} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight">Rare Exotics & Inventory</h3>
                <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed">
                  Sourced directly from global manufacturers and elite private collections, featuring certified history records.
                </p>
              </div>
              <div className="pt-6 mt-8 border-t border-neutral-800/60 flex items-center justify-between text-[11px] font-semibold text-amber-400 uppercase tracking-widest">
                <span>Active Showcase</span>
                <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300">450+ Listings</span>
              </div>
            </div>

            <div className="bg-gradient-to-b from-[#0C0B09] to-[#070705] border border-neutral-800/80 hover:border-amber-500/40 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group transition-all duration-500 hover:-translate-y-1 shadow-2xl">
              <div className="absolute -right-4 -top-4 text-8xl font-black text-neutral-900/40 group-hover:text-amber-500/[0.06] transition-colors font-serif pointer-events-none select-none">02</div>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-8 group-hover:bg-amber-400 group-hover:text-black transition-all duration-300 shadow-lg shadow-amber-500/10">
                  <FaShieldAlt className="text-amber-400 group-hover:text-black transition-colors" size={22} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight">150-Point Inspection</h3>
                <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed">
                  Rigorous diagnostic evaluations performed by factory-certified master technicians prior to final handover.
                </p>
              </div>
              <div className="pt-6 mt-8 border-t border-neutral-800/60 flex items-center justify-between text-[11px] font-semibold text-amber-400 uppercase tracking-widest">
                <span>Quality Assured</span>
                <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300">100% Verified</span>
              </div>
            </div>

            <div className="bg-gradient-to-b from-[#0C0B09] to-[#070705] border border-neutral-800/80 hover:border-amber-500/40 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group transition-all duration-500 hover:-translate-y-1 shadow-2xl">
              <div className="absolute -right-4 -top-4 text-8xl font-black text-neutral-900/40 group-hover:text-amber-500/[0.06] transition-colors font-serif pointer-events-none select-none">03</div>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-8 group-hover:bg-amber-400 group-hover:text-black transition-all duration-300 shadow-lg shadow-amber-500/10">
                  <FaBolt className="text-amber-400 group-hover:text-black transition-colors" size={22} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight">Bespoke Financing</h3>
                <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed">
                  Customized financial structures, confidential leasing arrangements, and instant digital loan approvals.
                </p>
              </div>
              <div className="pt-6 mt-8 border-t border-neutral-800/60 flex items-center justify-between text-[11px] font-semibold text-amber-400 uppercase tracking-widest">
                <span>Flexible Terms</span>
                <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300">Instant Approval</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map & Location Section */}
      <section className="w-full py-28 px-4 sm:px-8 lg:px-16 bg-[#030303] relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-amber-500/[0.02] blur-[160px] pointer-events-none rounded-full" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-px w-6 bg-amber-400" />
              <span className="text-amber-400 font-semibold tracking-widest text-[10px] uppercase bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/20">
                Global Flagship
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Visit Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 font-serif italic">Showroom.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-5 bg-gradient-to-br from-[#0C0B09] to-[#070705] border border-neutral-800/80 rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-neutral-800/80">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-gray-400 block mb-1">Status</span>
                    <span className="inline-flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Showroom Open Today
                    </span>
                  </div>
                  <span className="text-xs font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-xl">
                    9:00 AM – 8:00 PM
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">ApexMotors Flagship Hub</h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed mb-6">
                  123 Auto Boulevard, Motor City <br />
                  Experience our private consultation suites and exclusive inventory in person.
                </p>

                <div className="space-y-3 mb-8 text-xs text-gray-300 font-light">
                  <div className="flex items-center justify-between py-2 border-b border-neutral-800/60">
                    <span className="text-gray-500">Direct Concierge</span>
                    <span className="font-medium text-white">+1 (800) 555-APEX</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-neutral-800/60">
                    <span className="text-gray-500">Private Inquiries</span>
                    <span className="font-medium text-white">concierge@apexmotors.com</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold text-xs tracking-wider uppercase text-center shadow-lg shadow-amber-500/10 hover:brightness-110 transition-all"
                >
                  Get Directions
                </a>
                <a
                  href="tel:8005552739"
                  className="py-3 px-5 rounded-xl bg-black/60 border border-neutral-800 text-gray-300 text-xs font-semibold tracking-wider uppercase text-center hover:border-amber-500/50 hover:text-amber-400 transition-all"
                >
                  Call Now
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-neutral-800/80 shadow-2xl relative min-h-[400px]">
              <iframe
                className="w-full h-full min-h-[420px] filter invert contrast-125 opacity-85 hover:opacity-100 transition-opacity"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28941.190808758145!2d67.00111384999999!3d24.86073485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33dfeec7e2dd1%3A0x4a978089ea9a2edb!2sKarachi%2C%20Pakistan!5e0!3m2!1sen!2s!4v1692000000000!5m2!1sen!2s"
                allowFullScreen
                loading="lazy"
                title="ApexMotors Showroom Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Filter Modal Drawer */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-[#0C0B09] border border-neutral-800 w-full max-w-md rounded-3xl p-6 shadow-2xl relative">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-800">
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                <FaSlidersH className="text-amber-400" size={16} />
                Advanced Filters
              </h3>
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="text-gray-400 hover:text-white text-sm font-bold px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <p className="text-xs text-gray-400">Use category selections above or search for specific vehicle models directly from the prompt bar.</p>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => { setActiveTab('All inventory'); setSearchQuery(''); setIsFilterOpen(false); }}
                className="flex-1 py-3 rounded-xl bg-black border border-neutral-800 text-gray-300 text-xs font-semibold hover:border-neutral-700 transition-all"
              >
                Reset All
              </button>
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold text-xs shadow-lg shadow-amber-500/10 hover:brightness-110 transition-all"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
};

export default MainSection;