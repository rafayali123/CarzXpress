import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FaCar,
  FaBell,
  FaBars,
  FaTimes,
  FaPlus,
  FaSignOutAlt,
  FaEllipsisV,
  FaEdit,
  FaTrash,
  FaEnvelope,
  FaShieldAlt,
  FaTag,
  FaBuilding
} from 'react-icons/fa';

interface Car {
  _id?: string;
  name: string;
  price: string;
  description: string;
  image: string;
  company: string;
}

interface Message {
  _id?: string;
  name: string;
  email: string;
  message: string;
}

const initialCars: Car[] = [];

const Dashboard: React.FC = () => {
  const [cars, setCars] = useState<Car[]>(initialCars);
  const [messages, setMessages] = useState<Message[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    company: '',
  });
  const [view, setView] = useState<'cards' | 'notifications'>('cards');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [currentCar, setCurrentCar] = useState<Car | null>(null);

  useEffect(() => {
    fetchCars();
    fetchMessages();
  }, []);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8005/api/cars', { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error('Error fetching cars:', error);
      setError('Failed to load cars. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:8005/api/contact');
      if (!response.ok) throw new Error('Failed to fetch messages');
      const data = await response.json();
      setMessages(data.data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Failed to load messages. Please try again later.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddCar = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8005/api/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
      }
      const newCar = await response.json();
      setCars([...cars, newCar]);
      setForm({ name: '', price: '', description: '', image: '', company: '' });
      setModalOpen(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to add car. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCar = async (id: string) => {
    if (!id) return;
    setDeleteLoading(true);
    try {
      const response = await fetch(`http://localhost:8005/api/cars/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
      }
      setCars(cars.filter(car => car._id !== id));
      setMenuOpen(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete car. Please try again.');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleEditCar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCar || !currentCar._id) return;
    setEditLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:8005/api/cars/${currentCar._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
      }
      const updatedCar = await response.json();
      setCars(cars.map(car => car._id === currentCar._id ? updatedCar : car));
      setEditModalOpen(false);
      setCurrentCar(null);
      setForm({ name: '', price: '', description: '', image: '', company: '' });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update car. Please try again.');
    } finally {
      setEditLoading(false);
    }
  };

  const openEditModal = (car: Car) => {
    setCurrentCar(car);
    setForm({
      name: car.name,
      price: car.price,
      description: car.description,
      image: car.image || '',
      company: car.company,
    });
    setEditModalOpen(true);
    setMenuOpen(null);
  };

  return (
    <div className="bg-[#050505] min-h-screen text-gray-100 flex font-sans selection:bg-amber-400 selection:text-black relative overflow-x-hidden">

      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber-500/5 blur-[160px] pointer-events-none rounded-full"></div>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 bg-[#0C0B09] border-r border-neutral-800 p-6 transform transition-transform duration-300 ease-in-out z-50 flex flex-col justify-between ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 md:static`}
      >
        <div>
          <div className="flex justify-between items-center mb-10 pb-4 border-b border-neutral-800">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-500 p-0.5 flex items-center justify-center shadow-lg shadow-amber-500/20 overflow-hidden">
                <img
                  src="/images/ApexMotors logo.png"
                  alt="ApexMotors Logo"
                  className="w-full h-full object-cover rounded-[10px]"
                />
              </div>
              <span className="font-serif italic font-bold text-xl text-white tracking-wide">Apex Portal</span>
            </div>
            <button className="md:hidden text-gray-400 hover:text-white transition-colors" onClick={() => setSidebarOpen(false)}>
              <FaTimes size={20} />
            </button>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => { setView('cards'); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${view === 'cards'
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-black shadow-lg shadow-amber-500/20'
                  : 'text-gray-400 hover:bg-neutral-900 hover:text-white'
                }`}
            >
              <div className="flex items-center space-x-3">
                <FaCar size={15} />
                <span>Inventory Fleet</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${view === 'cards' ? 'bg-black/20 text-black' : 'bg-neutral-800 text-gray-300'}`}>{cars.length}</span>
            </button>

            <button
              onClick={() => { setView('notifications'); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${view === 'notifications'
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-black shadow-lg shadow-amber-500/20'
                  : 'text-gray-400 hover:bg-neutral-900 hover:text-white'
                }`}
            >
              <div className="flex items-center space-x-3">
                <FaBell size={15} />
                <span>Inquiries</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${view === 'notifications' ? 'bg-black/20 text-black' : 'bg-neutral-800 text-gray-300'}`}>{messages.length}</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer info */}
        <div className="pt-6 border-t border-neutral-800 text-xs text-neutral-500">
          <p className="font-semibold text-neutral-400">Secured Session</p>
          <p className="text-[10px] mt-0.5">Apex Motors Management v2.4</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 lg:p-12 overflow-y-auto">

        {/* Top Navbar Header */}
        <header className="flex justify-between items-center mb-10 pb-6 border-b border-neutral-800">
          <div className="flex items-center space-x-4">
            <button className="md:hidden text-gray-400 hover:text-white transition-colors p-2 rounded-xl bg-[#0C0B09] border border-neutral-800" onClick={() => setSidebarOpen(true)}>
              <FaBars size={18} />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-white tracking-tight">
                {view === 'cards' ? 'Inventory Management' : 'Client Inquiries'}
              </h1>
              <p className="text-xs text-gray-400 mt-1">Manage showroom listings and direct client communications.</p>
            </div>
          </div>

          <button
            onClick={() => { logout(); navigate('/login'); }}
            className="group flex items-center space-x-2 bg-neutral-900 hover:bg-red-500/10 border border-neutral-800 hover:border-red-500/30 text-gray-300 hover:text-red-400 px-4 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer"
          >
            <FaSignOutAlt size={13} className="transform group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Terminate Session</span>
          </button>
        </header>

        {/* Global Error Banner */}
        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl text-xs font-medium flex items-center space-x-3">
            <span>⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {/* CARS VIEW */}
        {view === 'cards' && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-white font-serif">Showroom Fleet</h2>
                <p className="text-xs text-gray-400">Total active listings available to clients online.</p>
              </div>
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider hover:brightness-110 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
              >
                <FaPlus size={12} />
                <span>Add New Vehicle</span>
              </button>
            </div>

            {loading && cars.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 space-y-4 bg-[#0C0B09] border border-neutral-800 rounded-3xl">
                <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Synchronizing Inventory...</p>
              </div>
            )}

            {!loading && cars.length === 0 && (
              <div className="bg-[#0C0B09] border border-neutral-800 rounded-3xl p-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-2 border border-amber-500/20">
                  <FaCar size={20} />
                </div>
                <h3 className="text-white font-bold text-base font-serif">No Vehicles Listed</h3>
                <p className="text-xs text-gray-400 max-w-sm mx-auto font-light">Your catalog is currently empty. Initialize your first vehicle listing using the button above.</p>
              </div>
            )}

            {cars.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map((car, idx) => (
                  <div
                    key={car._id || idx}
                    className="bg-[#0C0B09] border border-neutral-800 rounded-3xl overflow-hidden shadow-xl hover:border-neutral-700 transition-all duration-300 flex flex-col justify-between relative group"
                  >
                    {/* Floating Context Menu Button */}
                    <div className="absolute top-3 right-3 z-20">
                      <button
                        onClick={(e) => { e.stopPropagation(); setMenuOpen(menuOpen === idx ? null : idx); }}
                        className="w-9 h-9 rounded-xl bg-black/60 backdrop-blur-md border border-neutral-700/50 text-white flex items-center justify-center hover:bg-black transition-all cursor-pointer shadow-md"
                      >
                        <FaEllipsisV size={12} />
                      </button>

                      {menuOpen === idx && (
                        <div className="absolute right-0 top-11 bg-[#14120E] border border-neutral-800 rounded-2xl shadow-2xl py-2 min-w-[140px] z-30 animate-fade-in">
                          <button
                            onClick={(e) => { e.stopPropagation(); openEditModal(car); }}
                            className="w-full text-left px-4 py-2.5 text-xs text-gray-300 hover:bg-neutral-800/80 hover:text-white flex items-center space-x-2.5 transition-colors cursor-pointer"
                          >
                            <FaEdit size={12} className="text-amber-400" />
                            <span>Edit Details</span>
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); if (car._id) handleDeleteCar(car._id); }}
                            disabled={deleteLoading}
                            className="w-full text-left px-4 py-2.5 text-xs text-red-400 hover:bg-neutral-800/80 hover:text-red-300 flex items-center space-x-2.5 transition-colors cursor-pointer border-t border-neutral-800/60"
                          >
                            <FaTrash size={12} />
                            <span>{deleteLoading ? 'Removing...' : 'Delete Listing'}</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Car Image Preview */}
                    <div className="relative h-48 overflow-hidden bg-neutral-900">
                      <img
                        src={car.image || '/images/Sports Car.png'}
                        alt={car.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/images/Sports Car.png';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B09] via-transparent to-transparent opacity-80"></div>
                      <span className="absolute bottom-3 left-4 text-[10px] font-bold tracking-widest uppercase bg-black/60 backdrop-blur-md text-amber-400 px-3 py-1 rounded-full border border-neutral-800">
                        {car.company}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="text-lg font-bold text-white font-serif tracking-tight">{car.name}</h3>
                          <span className="text-amber-400 font-bold text-sm tracking-tight">{car.price}</span>
                        </div>
                        <p className="text-gray-400 text-xs font-light line-clamp-2 leading-relaxed">{car.description}</p>
                      </div>

                      <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-gray-500 font-mono">
                        <span className="flex items-center gap-1.5"><FaBuilding className="text-amber-400/70" /> {car.company}</span>
                        <span className="text-emerald-400 font-sans font-semibold">Active Listing</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* NOTIFICATIONS VIEW */}
        {view === 'notifications' && (
          <section className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white font-serif">Client Transmissions</h2>
              <p className="text-xs text-gray-400">Incoming inquiries submitted through the showroom contact portal.</p>
            </div>

            {messages.length > 0 ? (
              <div className="grid gap-4">
                {messages.map((msg, idx) => (
                  <div key={msg._id || idx} className="bg-[#0C0B09] border border-neutral-800 rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 hover:border-neutral-700 transition-all">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                          <FaEnvelope size={14} />
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-sm">{msg.name}</h4>
                          <p className="text-xs text-amber-400/90 font-mono">{msg.email}</p>
                        </div>
                      </div>
                      <p className="text-gray-300 text-xs font-light pl-12 leading-relaxed bg-black/30 p-3.5 rounded-2xl border border-neutral-800/50">{msg.message}</p>
                    </div>
                    <div className="flex sm:flex-col items-end justify-between sm:justify-center pl-12 sm:pl-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-neutral-800">
                      <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Priority Ticket</span>
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-semibold mt-1">● Received</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-[#0C0B09] border border-neutral-800 rounded-3xl p-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-2 border border-amber-500/20">
                  <FaBell size={20} />
                </div>
                <h3 className="text-white font-bold text-base font-serif">No Inquiries Found</h3>
                <p className="text-xs text-gray-400 max-w-sm mx-auto font-light">There are no pending client messages in your transmission queue.</p>
              </div>
            )}
          </section>
        )}

        {/* Modal: Add New Car */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-[#0C0B09] border border-neutral-800 rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl relative animate-fade-in">
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center cursor-pointer"
              >
                &times;
              </button>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white font-serif">New Vehicle Entry</h3>
                <p className="text-xs text-gray-400 mt-1">Input precise specifications for the new showroom acquisition.</p>
              </div>

              <form onSubmit={handleAddCar} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold tracking-wider text-gray-400 uppercase">Vehicle Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g., Apex GT-9 Speedster"
                    value={form.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 text-xs shadow-inner"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold tracking-wider text-gray-400 uppercase">Price</label>
                    <input
                      type="text"
                      name="price"
                      placeholder="$285,000"
                      value={form.price}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 text-xs shadow-inner"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold tracking-wider text-gray-400 uppercase">Company / Brand</label>
                    <input
                      type="text"
                      name="company"
                      placeholder="Apex Engineering"
                      value={form.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 text-xs shadow-inner"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold tracking-wider text-gray-400 uppercase">Image Asset URL</label>
                  <input
                    type="text"
                    name="image"
                    placeholder="https://images.unsplash.com/..."
                    value={form.image}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 text-xs shadow-inner"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold tracking-wider text-gray-400 uppercase">Description Summary</label>
                  <textarea
                    name="description"
                    placeholder="Twin-turbo V8 powertrain, carbon fiber chassis, bespoke interior styling..."
                    value={form.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 text-xs shadow-inner resize-none"
                    rows={3}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold py-3.5 px-4 rounded-xl hover:brightness-110 transition-all text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-50 flex items-center justify-center space-x-2 mt-4"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      <span>Registering Vehicle...</span>
                    </>
                  ) : (
                    <span>Confirm & List Vehicle</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Edit Car */}
        {editModalOpen && currentCar && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-[#0C0B09] border border-neutral-800 rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl relative animate-fade-in">
              <button
                onClick={() => { setEditModalOpen(false); setCurrentCar(null); setForm({ name: '', price: '', description: '', image: '', company: '' }); }}
                className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center cursor-pointer"
              >
                &times;
              </button>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white font-serif">Modify Vehicle Listing</h3>
                <p className="text-xs text-gray-400 mt-1">Update specifications for {currentCar.name}.</p>
              </div>

              <form onSubmit={handleEditCar} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold tracking-wider text-gray-400 uppercase">Vehicle Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 text-xs shadow-inner"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold tracking-wider text-gray-400 uppercase">Price</label>
                    <input
                      type="text"
                      name="price"
                      value={form.price}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 text-xs shadow-inner"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold tracking-wider text-gray-400 uppercase">Company / Brand</label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 text-xs shadow-inner"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold tracking-wider text-gray-400 uppercase">Image Asset URL</label>
                  <input
                    type="text"
                    name="image"
                    value={form.image}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 text-xs shadow-inner"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold tracking-wider text-gray-400 uppercase">Description Summary</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 text-xs shadow-inner resize-none"
                    rows={3}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={editLoading}
                  className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold py-3.5 px-4 rounded-xl hover:brightness-110 transition-all text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-50 flex items-center justify-center space-x-2 mt-4"
                >
                  {editLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      <span>Updating Record...</span>
                    </>
                  ) : (
                    <span>Save Modifications</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97) translateY(-5px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;