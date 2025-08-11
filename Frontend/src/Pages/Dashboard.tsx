// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// interface Car {
//   _id?: string; // Add _id for MongoDB documents
//   name: string;
//   price: string;
//   description: string;
//   image: string;
//   company: string;
// }

// // We'll fetch cars from the API instead of using initial data
// const initialCars: Car[] = [];

// const Dashboard: React.FC = () => {
//   const [cars, setCars] = useState<Car[]>(initialCars);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [form, setForm] = useState({
//     name: '',
//     price: '',
//     description: '',
//     image: '',
//     company: '',
//   });
//   const navigate = useNavigate();
//   const { logout } = useAuth();

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [menuOpen, setMenuOpen] = useState<number | null>(null);
//   const [deleteLoading, setDeleteLoading] = useState(false);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [editLoading, setEditLoading] = useState(false);
//   const [currentCar, setCurrentCar] = useState<Car | null>(null);

//   // Fetch all cars when component mounts
//   useEffect(() => {
//     fetchCars();
//   }, []);

//   // Function to fetch all cars from the API
//   const fetchCars = async () => {
//     try {
//       console.log('Fetching cars from API...');
//       const response = await fetch('http://localhost:8005/api/cars');
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
      
//       const data = await response.json();
//       console.log('Cars fetched successfully:', data);
//       setCars(data);
//     } catch (error) {
//       console.error('Error fetching cars:', error);
//       setError('Failed to load cars. Please try again later.');
//     }
//   };

//   const handleAddCar = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
    
//     try {
//       console.log('Submitting car data to API:', form);
      
//       const response = await fetch('http://localhost:8005/api/cars', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(form),
//       });
      
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
//       }
      
//       const newCar = await response.json();
//       console.log('Car created successfully:', newCar);
      
//       // Add the new car to the state and close the modal
//       setCars([...cars, newCar]);
//       setForm({ name: '', price: '', description: '', image: '', company: '' });
//       setModalOpen(false);
//     } catch (error) {
//       console.error('Error adding car:', error);
//       setError(error instanceof Error ? error.message : 'Failed to add car. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteCar = async (id: string) => {
//     if (!id) {
//       console.error('Cannot delete car: No ID provided');
//       return;
//     }

//     setDeleteLoading(true);
//     try {
//       console.log(`Deleting car with ID: ${id}`);
//       const response = await fetch(`http://localhost:8005/api/cars/${id}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
//       }

//       console.log('Car deleted successfully');
//       // Remove the deleted car from state
//       setCars(cars.filter(car => car._id !== id));
//       // Close the menu
//       setMenuOpen(null);
//     } catch (error) {
//       console.error('Error deleting car:', error);
//       setError(error instanceof Error ? error.message : 'Failed to delete car. Please try again.');
//     } finally {
//       setDeleteLoading(false);
//     }
//   };

//   const handleEditCar = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!currentCar || !currentCar._id) {
//       console.error('Cannot edit car: No ID provided');
//       return;
//     }
    
//     setEditLoading(true);
//     setError(null);
    
//     try {
//       console.log(`Updating car with ID: ${currentCar._id}`, form);
      
//       const response = await fetch(`http://localhost:8005/api/cars/${currentCar._id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(form),
//       });
      
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
//       }
      
//       const updatedCar = await response.json();
//       console.log('Car updated successfully:', updatedCar);
      
//       // Update the car in the state
//       setCars(cars.map(car => car._id === currentCar._id ? updatedCar : car));
      
//       // Close the modal and reset form
//       setEditModalOpen(false);
//       setCurrentCar(null);
//       setForm({ name: '', price: '', description: '', image: '', company: '' });
//     } catch (error) {
//       console.error('Error updating car:', error);
//       setError(error instanceof Error ? error.message : 'Failed to update car. Please try again.');
//     } finally {
//       setEditLoading(false);
//     }
//   };
  
//   const openEditModal = (car: Car) => {
//     setCurrentCar(car);
//     setForm({
//       name: car.name,
//       price: car.price,
//       description: car.description,
//       image: car.image || '',
//       company: car.company,
//     });
//     setEditModalOpen(true);
//     setMenuOpen(null);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-100 p-8">
//       <div className="flex justify-between items-center mb-8">
//         <div className="flex items-center">
//           <h1 className="text-4xl font-bold tracking-wide mr-4">Dashboard</h1>
//           <button
//             onClick={() => {
//               logout();
//               navigate('/login');
//             }}
//             className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-transform transform hover:scale-105 shadow-lg"
//           >
//             Logout
//           </button>
//         </div>
//         <button
//           onClick={() => setModalOpen(true)}
//           className="bg-yellow-400 text-gray-900 px-5 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-transform transform hover:scale-105 shadow-lg"
//         >
//           Add New Car
//         </button>
//       </div>

//       {/* Error message for initial load */}
//       {error && (
//         <div className="bg-red-900 text-white p-4 rounded-lg mb-8">
//           <p className="font-semibold">{error}</p>
//         </div>
//       )}

//       {/* Loading state for initial fetch */}
//       {loading && cars.length === 0 && (
//         <div className="flex justify-center items-center py-12">
//           <svg className="animate-spin h-10 w-10 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//           </svg>
//           <span className="ml-3 text-xl">Loading cars...</span>
//         </div>
//       )}

//       {/* No cars message */}
//       {!loading && cars.length === 0 && (
//         <div className="bg-gray-800 rounded-lg p-8 text-center">
//           <p className="text-xl mb-4">No cars available yet.</p>
//           <p>Click the "Add New Car" button to add your first car.</p>
//         </div>
//       )}

//       {/* Cars grid */}
//       {cars.length > 0 && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {cars.map((car, idx) => (
//           <div
//             key={idx}
//             className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl relative"
//           >
//             {/* Three-dot menu button */}
//             <button 
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setMenuOpen(menuOpen === idx ? null : idx);
//               }}
//               className="absolute top-2 right-2 bg-gray-900 bg-opacity-70 text-white p-1 rounded-full z-10 hover:bg-opacity-100 transition-all"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
//               </svg>
//             </button>
            
//             {/* Dropdown menu */}
//             {menuOpen === idx && (
//               <div className="absolute top-10 right-2 bg-gray-900 rounded-md shadow-lg z-20 py-1 min-w-[120px]">
//                 <button 
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     openEditModal(car);
//                   }}
//                   className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-800 flex items-center"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                   </svg>
//                   Edit
//                 </button>
//                 <button 
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     if (car._id) {
//                       handleDeleteCar(car._id);
//                     } else {
//                       console.error('Cannot delete car: No ID found');
//                     }
//                   }}
//                   disabled={deleteLoading}
//                   className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800 flex items-center"
//                 >
//                   {deleteLoading ? (
//                     <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                   ) : (
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                     </svg>
//                   )}
//                   Delete
//                 </button>
//               </div>
//             )}
            
//             <img
//               src={car.image || 'https://source.unsplash.com/400x250/?car'}
//               alt={car.name}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-xl font-semibold mb-1">{car.name}</h3>
//               <p className="text-yellow-400 font-bold mb-2">{car.price}</p>
//               <p className="text-gray-300 mb-2">{car.description}</p>
//               <p className="italic text-sm text-gray-400">Company: {car.company}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//       )}

//       {/* Modal for adding car */}
//       {modalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
//           <div className="bg-gray-900 rounded-lg p-6 w-full max-w-lg shadow-xl relative animate-fadeIn">
//             <button
//               onClick={() => setModalOpen(false)}
//               className="absolute top-3 right-3 text-yellow-400 hover:text-yellow-300 text-2xl font-bold"
//             >
//               &times;
//             </button>
//             <h2 className="text-2xl font-bold mb-6 text-yellow-400">Add New Car</h2>
//             <form onSubmit={handleAddCar} className="space-y-4">
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Car Name"
//                 value={form.name}
//                 onChange={handleInputChange}
//                 className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                 required
//               />
//               <input
//                 type="text"
//                 name="price"
//                 placeholder="Price"
//                 value={form.price}
//                 onChange={handleInputChange}
//                 className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                 required
//               />
//               <textarea
//                 name="description"
//                 placeholder="Description"
//                 value={form.description}
//                 onChange={handleInputChange}
//                 className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                 rows={3}
//                 required
//               />
//               <input
//                 type="text"
//                 name="image"
//                 placeholder="Image URL"
//                 value={form.image}
//                 onChange={handleInputChange}
//                 className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                 required
//               />
//               <input
//                 type="text"
//                 name="company"
//                 placeholder="Company"
//                 value={form.company}
//                 onChange={handleInputChange}
//                 className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                 required
//               />
//                       {error && (
//                 <div className="p-3 bg-red-900 text-white rounded mb-4">
//                   {error}
//                 </div>
//               )}
//               <button
//                 type="submit"
//                 className="w-full bg-yellow-400 text-gray-900 font-semibold py-3 rounded hover:bg-yellow-300 transition flex justify-center items-center"
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Processing...
//                   </>
//                 ) : 'Add Car'}
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Modal for editing car */}
//       {editModalOpen && currentCar && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
//           <div className="bg-gray-900 rounded-lg p-6 w-full max-w-lg shadow-xl relative animate-fadeIn">
//             <button
//               onClick={() => {
//                 setEditModalOpen(false);
//                 setCurrentCar(null);
//                 setForm({ name: '', price: '', description: '', image: '', company: '' });
//               }}
//               className="absolute top-3 right-3 text-yellow-400 hover:text-yellow-300 text-2xl font-bold"
//             >
//               &times;
//             </button>
//             <h2 className="text-2xl font-bold mb-6 text-yellow-400">Edit Car</h2>
//             <form onSubmit={handleEditCar} className="space-y-4">
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Car Name"
//                 value={form.name}
//                 onChange={handleInputChange}
//                 className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                 required
//               />
//               <input
//                 type="text"
//                 name="price"
//                 placeholder="Price"
//                 value={form.price}
//                 onChange={handleInputChange}
//                 className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                 required
//               />
//               <textarea
//                 name="description"
//                 placeholder="Description"
//                 value={form.description}
//                 onChange={handleInputChange}
//                 className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                 rows={3}
//                 required
//               />
//               <input
//                 type="text"
//                 name="image"
//                 placeholder="Image URL"
//                 value={form.image}
//                 onChange={handleInputChange}
//                 className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                 required
//               />
//               <input
//                 type="text"
//                 name="company"
//                 placeholder="Company"
//                 value={form.company}
//                 onChange={handleInputChange}
//                 className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                 required
//               />
//               {error && (
//                 <div className="p-3 bg-red-900 text-white rounded mb-4">
//                   {error}
//                 </div>
//               )}
//               <button
//                 type="submit"
//                 className="w-full bg-yellow-400 text-gray-900 font-semibold py-3 rounded hover:bg-yellow-300 transition flex justify-center items-center"
//                 disabled={editLoading}
//               >
//                 {editLoading ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Processing...
//                   </>
//                 ) : 'Update Car'}
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Animation keyframes for fadeIn */}
//       <style>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(-10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease forwards;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Dashboard;






// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// interface Car {
//   _id?: string;
//   name: string;
//   price: string;
//   description: string;
//   image: string;
//   company: string;
// }

// interface Message {
//   _id?: string;
//   name: string;
//   email: string;
//   message: string;
// }

// const initialCars: Car[] = [];

// const Dashboard: React.FC = () => {
//   const [cars, setCars] = useState<Car[]>(initialCars);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [form, setForm] = useState({
//     name: '',
//     price: '',
//     description: '',
//     image: '',
//     company: '',
//   });
//   const navigate = useNavigate();
//   const { logout } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [menuOpen, setMenuOpen] = useState<number | null>(null);
//   const [deleteLoading, setDeleteLoading] = useState(false);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [editLoading, setEditLoading] = useState(false);
//   const [currentCar, setCurrentCar] = useState<Car | null>(null);

//   // Fetch cars and messages when component mounts
//   useEffect(() => {
//     fetchCars();
//     fetchMessages();
//   }, []);

//   // Function to fetch all cars
//   const fetchCars = async () => {
//     try {
//       console.log('Fetching cars from API...');
//       const response = await fetch('http://localhost:8005/api/cars');
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       const data = await response.json();
//       console.log('Cars fetched successfully:', data);
//       setCars(data);
//     } catch (error) {
//       console.error('Error fetching cars:', error);
//       setError('Failed to load cars. Please try again later.');
//     }
//   };

//   // Function to fetch all messages
//   const fetchMessages = async () => {
//     try {
//       console.log('Fetching messages from API...');
//       const response = await fetch('http://localhost:8005/api/contact');
//       if (!response.ok) {
//         throw new Error('Failed to fetch messages');
//       }
//       const data = await response.json();
//       console.log('Messages fetched successfully:', data);
//       setMessages(data.data);
//     } catch (error) {
//       console.error('Error fetching messages:', error);
//       setError('Failed to load messages. Please try again later.');
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleAddCar = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     try {
//       console.log('Submitting car data to API:', form);
//       const response = await fetch('http://localhost:8005/api/cars', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(form),
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
//       }
//       const newCar = await response.json();
//       console.log('Car created successfully:', newCar);
//       setCars([...cars, newCar]);
//       setForm({ name: '', price: '', description: '', image: '', company: '' });
//       setModalOpen(false);
//     } catch (error) {
//       console.error('Error adding car:', error);
//       setError(error instanceof Error ? error.message : 'Failed to add car. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteCar = async (id: string) => {
//     if (!id) {
//       console.error('Cannot delete car: No ID provided');
//       return;
//     }
//     setDeleteLoading(true);
//     try {
//       console.log(`Deleting car with ID: ${id}`);
//       const response = await fetch(`http://localhost:8005/api/cars/${id}`, {
//         method: 'DELETE',
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
//       }
//       console.log('Car deleted successfully');
//       setCars(cars.filter(car => car._id !== id));
//       setMenuOpen(null);
//     } catch (error) {
//       console.error('Error deleting car:', error);
//       setError(error instanceof Error ? error.message : 'Failed to delete car. Please try again.');
//     } finally {
//       setDeleteLoading(false);
//     }
//   };

//   const handleEditCar = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!currentCar || !currentCar._id) {
//       console.error('Cannot edit car: No ID provided');
//       return;
//     }
//     setEditLoading(true);
//     setError(null);
//     try {
//       console.log(`Updating car with ID: ${currentCar._id}`, form);
//       const response = await fetch(`http://localhost:8005/api/cars/${currentCar._id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(form),
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
//       }
//       const updatedCar = await response.json();
//       console.log('Car updated successfully:', updatedCar);
//       setCars(cars.map(car => car._id === currentCar._id ? updatedCar : car));
//       setEditModalOpen(false);
//       setCurrentCar(null);
//       setForm({ name: '', price: '', description: '', image: '', company: '' });
//     } catch (error) {
//       console.error('Error updating car:', error);
//       setError(error instanceof Error ? error.message : 'Failed to update car. Please try again.');
//     } finally {
//       setEditLoading(false);
//     }
//   };

//   const openEditModal = (car: Car) => {
//     setCurrentCar(car);
//     setForm({
//       name: car.name,
//       price: car.price,
//       description: car.description,
//       image: car.image || '',
//       company: car.company,
//     });
//     setEditModalOpen(true);
//     setMenuOpen(null);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-100 p-8">
//       <div className="flex justify-between items-center mb-8">
//         <div className="flex items-center">
//           <h1 className="text-4xl font-bold tracking-wide mr-4">Dashboard</h1>
//           <button
//             onClick={() => {
//               logout();
//               navigate('/login');
//             }}
//             className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-transform transform hover:scale-105 shadow-lg"
//           >
//             Logout
//           </button>
//         </div>
//         <button
//           onClick={() => setModalOpen(true)}
//           className="bg-yellow-400 text-gray-900 px-5 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-transform transform hover:scale-105 shadow-lg"
//         >
//           Add New Car
//         </button>
//       </div>

//       {/* Error message */}
//       {error && (
//         <div className="bg-red-900 text-white p-4 rounded-lg mb-8">
//           <p className="font-semibold">{error}</p>
//         </div>
//       )}

//       {/* Loading state for cars */}
//       {loading && cars.length === 0 && (
//         <div className="flex justify-center items-center py-12">
//           <svg className="animate-spin h-10 w-10 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//           </svg>
//           <span className="ml-3 text-xl">Loading cars...</span>
//         </div>
//       )}

//       {/* Messages Section */}
//       <div className="mb-12">
//         <h2 className="text-3xl font-bold mb-6">Messages</h2>
//         {messages.length > 0 ? (
//           <div className="grid gap-4">
//             {messages.map((msg) => (
//               <div key={msg._id} className="bg-gray-800 p-6 rounded-xl shadow-md">
//                 <p><strong>Name:</strong> {msg.name}</p>
//                 <p><strong>Email:</strong> {msg.email}</p>
//                 <p><strong>Message:</strong> {msg.message}</p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="bg-gray-800 rounded-lg p-8 text-center">
//             <p className="text-xl">No messages available.</p>
//           </div>
//         )}
//       </div>

//       {/* Cars Section */}
//       <h2 className="text-3xl font-bold mb-6">Cars</h2>
//       {!loading && cars.length === 0 && (
//         <div className="bg-gray-800 rounded-lg p-8 text-center">
//           <p className="text-xl mb-4">No cars available yet.</p>
//           <p>Click the "Add New Car" button to add your first car.</p>
//         </div>
//       )}

//       {cars.length > 0 && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {cars.map((car, idx) => (
//             <div
//               key={idx}
//               className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl relative"
//             >
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setMenuOpen(menuOpen === idx ? null : idx);
//                 }}
//                 className="absolute top-2 right-2 bg-gray-900 bg-opacity-70 text-white p-1 rounded-full z-10 hover:bg-opacity-100 transition-all"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
//                 </svg>
//               </button>
//               {menuOpen === idx && (
//                 <div className="absolute top-10 right-2 bg-gray-900 rounded-md shadow-lg z-20 py-1 min-w-[120px]">
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       openEditModal(car);
//                     }}
//                     className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-800 flex items-center"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                     </svg>
//                     Edit
//                   </button>
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       if (car._id) {
//                         handleDeleteCar(car._id);
//                       } else {
//                         console.error('Cannot delete car: No ID found');
//                       }
//                     }}
//                     disabled={deleteLoading}
//                     className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800 flex items-center"
//                   >
//                     {deleteLoading ? (
//                       <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                     ) : (
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                       </svg>
//                     )}
//                     Delete
//                   </button>
//                 </div>
//               )}
//               <img
//                 src={car.image || 'https://source.unsplash.com/400x250/?car'}
//                 alt={car.name}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-xl font-semibold mb-1">{car.name}</h3>
//                 <p className="text-yellow-400 font-bold mb-2">{car.price}</p>
//                 <p className="text-gray-300 mb-2">{car.description}</p>
//                 <p className="italic text-sm text-gray-400">Company: {car.company}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Modal for adding car */}
//       {modalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
//           <div className="bg-gray-900 rounded-lg p-6 w-full max-w-lg shadow-xl relative animate-fadeIn">
//             <button
//               onClick={() => setModalOpen(false)}
//               className="absolute top-3 right-3 text-yellow-400 hover:text-yellow-300 text-2xl font-bold"
//             >
//               &times;
//             </button>
//             <h2 className="text-2xl font-bold mb-6 text-yellow-400">Add New Car</h2>
//             <form onSubmit={handleAddCar} className="space-y-4">
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Car Name"
//                 value={form.name}
//                 onChange={handleInputChange}
//                 className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                 required
//               />
//               <input
//                 type="text"
//                 name="price"
//                 placeholder="Price"
//                 value={form.price}
//                 onChange={handleInputChange}
//                 className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                 required
//               />
//               <textarea
//                 name="description"
//                 placeholder="Description"
//                 value={form.description}
//                 onChange={handleInputChange}
//                 className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                 rows={3}
//                 required
//               />
//               <input
//                 type="text"
//                 name="image"
//                 placeholder="Image URL"
//                 value={form.image}
//                 onChange={handleInputChange}
//                 className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                 required
//               />
//               <input
//                 type="text"
//                 name="company"
//                 placeholder="Company"
//                 value={form.company}
//                 onChange={handleInputChange}
//                 className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                 required
//               />
//               {error && (
//                 <div className="p-3 bg-red-900 text-white rounded mb-4">
//                   {error}
//                 </div>
//               )}
//               <button
//                 type="submit"
//                 className="w-full bg-yellow-400 text-gray-900 font-semibold py-3 rounded hover:bg-yellow-300 transition flex justify-center items-center"
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Processing...
//                   </>
//                 ) : 'Add Car'}
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Modal for editing car */}
//       {editModalOpen && currentCar && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
//           <div className="bg-gray-900 rounded-lg p-6 w-full max-w-lg shadow-xl relative animate-fadeIn">
//             <button
//               onClick={() => {
//                 setEditModalOpen(false);
//                 setCurrentCar(null);
//                 setForm({ name: '', price: '', description: '', image: '', company: '' });
//               }}
//               className="absolute top-3 right-3 text-yellow-400 hover:text-yellow-300 text-2xl font-bold"
//             >
//               &times;
//             </button>
//             <h2 className="text-2xl font-bold mb-6 text-yellow-400">Edit Car</h2>
//             <form onSubmit={handleEditCar} className="space-y-4">
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Car Name"
//                 value={form.name}
//                 onChange={handleInputChange}
//                 className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                 required
//               />
//               <input
//                 type="text"
//                 name="price"
//                 placeholder="Price"
//                 value={form.price}
//                 onChange={handleInputChange}
//                 className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                 required
//               />
//               <textarea
//                 name="description"
//                 placeholder="Description"
//                 value={form.description}
//                 onChange={handleInputChange}
//                 className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                 rows={3}
//                 required
//               />
//               <input
//                 type="text"
//                 name="image"
//                 placeholder="Image URL"
//                 value={form.image}
//                 onChange={handleInputChange}
//                 className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                 required
//               />
//               <input
//                 type="text"
//                 name="company"
//                 placeholder="Company"
//                 value={form.company}
//                 onChange={handleInputChange}
//                 className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                 required
//               />
//               {error && (
//                 <div className="p-3 bg-red-900 text-white rounded mb-4">
//                   {error}
//                 </div>
//               )}
//               <button
//                 type="submit"
//                 className="w-full bg-yellow-400 text-gray-900 font-semibold py-3 rounded hover:bg-yellow-300 transition flex justify-center items-center"
//                 disabled={editLoading}
//               >
//                 {editLoading ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Processing...
//                   </>
//                 ) : 'Update Car'}
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       <style>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(-10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease forwards;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Dashboard;




import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaCar, FaBell, FaBars, FaTimes } from 'react-icons/fa';

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
  const [view, setView] = useState<'cards' | 'notifications'>('cards'); // State to toggle views
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for mobile sidebar
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [currentCar, setCurrentCar] = useState<Car | null>(null);

  // Fetch cars and messages when component mounts
  useEffect(() => {
    fetchCars();
    fetchMessages();
  }, []);

  // Function to fetch all cars
  const fetchCars = async () => {
    try {
      console.log('Fetching cars from API...');
      const response = await fetch('http://localhost:8005/api/cars');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Cars fetched successfully:', data);
      setCars(data);
    } catch (error) {
      console.error('Error fetching cars:', error);
      setError('Failed to load cars. Please try again later.');
    }
  };

  // Function to fetch all messages
  const fetchMessages = async () => {
    try {
      console.log('Fetching messages from API...');
      const response = await fetch('http://localhost:8005/api/contact');
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      const data = await response.json();
      console.log('Messages fetched successfully:', data);
      setMessages(data.data);
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
      console.log('Submitting car data to API:', form);
      const response = await fetch('http://localhost:8005/api/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
      }
      const newCar = await response.json();
      console.log('Car created successfully:', newCar);
      setCars([...cars, newCar]);
      setForm({ name: '', price: '', description: '', image: '', company: '' });
      setModalOpen(false);
    } catch (error) {
      console.error('Error adding car:', error);
      setError(error instanceof Error ? error.message : 'Failed to add car. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCar = async (id: string) => {
    if (!id) {
      console.error('Cannot delete car: No ID provided');
      return;
    }
    setDeleteLoading(true);
    try {
      console.log(`Deleting car with ID: ${id}`);
      const response = await fetch(`http://localhost:8005/api/cars/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
      }
      console.log('Car deleted successfully');
      setCars(cars.filter(car => car._id !== id));
      setMenuOpen(null);
    } catch (error) {
      console.error('Error deleting car:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete car. Please try again.');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleEditCar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCar || !currentCar._id) {
      console.error('Cannot edit car: No ID provided');
      return;
    }
    setEditLoading(true);
    setError(null);
    try {
      console.log(`Updating car with ID: ${currentCar._id}`, form);
      const response = await fetch(`http://localhost:8005/api/cars/${currentCar._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
      }
      const updatedCar = await response.json();
      console.log('Car updated successfully:', updatedCar);
      setCars(cars.map(car => car._id === currentCar._id ? updatedCar : car));
      setEditModalOpen(false);
      setCurrentCar(null);
      setForm({ name: '', price: '', description: '', image: '', company: '' });
    } catch (error) {
      console.error('Error updating car:', error);
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
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-100 flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-900 p-4 transform transition-transform duration-300 ease-in-out z-50 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static md:w-64`}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-yellow-400">Menu</h2>
          <button
            className="md:hidden text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <FaTimes size={24} />
          </button>
        </div>
        <nav className="space-y-4">
          <button
            onClick={() => {
              setView('cards');
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-2 px-4 py-2 text-lg font-semibold rounded-lg ${
              view === 'cards' ? 'bg-yellow-400 text-gray-900' : 'text-white hover:bg-gray-800'
            }`}
          >
            <FaCar />
            Add Cards
          </button>
          <button
            onClick={() => {
              setView('notifications');
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-2 px-4 py-2 text-lg font-semibold rounded-lg ${
              view === 'notifications' ? 'bg-yellow-400 text-gray-900' : 'text-white hover:bg-gray-800'
            }`}
          >
            <FaBell />
            Notifications
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <button
              className="md:hidden text-white mr-4"
              onClick={() => setSidebarOpen(true)}
            >
              <FaBars size={24} />
            </button>
            <h1 className="text-4xl font-bold tracking-wide">Dashboard</h1>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-transform transform hover:scale-105 shadow-lg"
          >
            Logout
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-900 text-white p-4 rounded-lg mb-8">
            <p className="font-semibold">{error}</p>
          </div>
        )}

        {/* Cards Section */}
        {view === 'cards' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">Cars</h2>
              <button
                onClick={() => setModalOpen(true)}
                className="bg-yellow-400 text-gray-900 px-5 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-transform transform hover:scale-105 shadow-lg"
              >
                Add New Car
              </button>
            </div>
            {loading && cars.length === 0 && (
              <div className="flex justify-center items-center py-12">
                <svg className="animate-spin h-10 w-10 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="ml-3 text-xl">Loading cars...</span>
              </div>
            )}
            {!loading && cars.length === 0 && (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <p className="text-xl mb-4">No cars available yet.</p>
                <p>Click the "Add New Car" button to add your first car.</p>
              </div>
            )}
            {cars.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {cars.map((car, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl relative"
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpen(menuOpen === idx ? null : idx);
                      }}
                      className="absolute top-2 right-2 bg-gray-900 bg-opacity-70 text-white p-1 rounded-full z-10 hover:bg-opacity-100 transition-all"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                    {menuOpen === idx && (
                      <div className="absolute top-10 right-2 bg-gray-900 rounded-md shadow-lg z-20 py-1 min-w-[120px]">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditModal(car);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-800 flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (car._id) {
                              handleDeleteCar(car._id);
                            } else {
                              console.error('Cannot delete car: No ID found');
                            }
                          }}
                          disabled={deleteLoading}
                          className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800 flex items-center"
                        >
                          {deleteLoading ? (
                            <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          )}
                          Delete
                        </button>
                      </div>
                    )}
                    <img
                      src={car.image || 'https://source.unsplash.com/400x250/?car'}
                      alt={car.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-1">{car.name}</h3>
                      <p className="text-yellow-400 font-bold mb-2">{car.price}</p>
                      <p className="text-gray-300 mb-2">{car.description}</p>
                      <p className="italic text-sm text-gray-400">Company: {car.company}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Notifications Section */}
        {view === 'notifications' && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Notifications</h2>
            {messages.length > 0 ? (
              <div className="grid gap-4">
                {messages.map((msg) => (
                  <div key={msg._id} className="bg-gray-800 p-6 rounded-xl shadow-md">
                    <p><strong>Name:</strong> {msg.name}</p>
                    <p><strong>Email:</strong> {msg.email}</p>
                    <p><strong>Message:</strong> {msg.message}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <p className="text-xl">No messages available.</p>
              </div>
            )}
          </div>
        )}

        {/* Modal for adding car */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-gray-900 rounded-lg p-6 w-full max-w-lg shadow-xl relative animate-fadeIn">
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-3 right-3 text-yellow-400 hover:text-yellow-300 text-2xl font-bold"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-6 text-yellow-400">Add New Car</h2>
              <form onSubmit={handleAddCar} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Car Name"
                  value={form.name}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
                <input
                  type="text"
                  name="price"
                  placeholder="Price"
                  value={form.price}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={form.description}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  rows={3}
                  required
                />
                <input
                  type="text"
                  name="image"
                  placeholder="Image URL"
                  value={form.image}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  value={form.company}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
                {error && (
                  <div className="p-3 bg-red-900 text-white rounded mb-4">
                    {error}
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full bg-yellow-400 text-gray-900 font-semibold py-3 rounded hover:bg-yellow-300 transition flex justify-center items-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : 'Add Car'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Modal for editing car */}
        {editModalOpen && currentCar && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-gray-900 rounded-lg p-6 w-full max-w-lg shadow-xl relative animate-fadeIn">
              <button
                onClick={() => {
                  setEditModalOpen(false);
                  setCurrentCar(null);
                  setForm({ name: '', price: '', description: '', image: '', company: '' });
                }}
                className="absolute top-3 right-3 text-yellow-400 hover:text-yellow-300 text-2xl font-bold"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-6 text-yellow-400">Edit Car</h2>
              <form onSubmit={handleEditCar} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Car Name"
                  value={form.name}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
                <input
                  type="text"
                  name="price"
                  placeholder="Price"
                  value={form.price}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={form.description}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  rows={3}
                  required
                />
                <input
                  type="text"
                  name="image"
                  placeholder="Image URL"
                  value={form.image}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  value={form.company}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
                {error && (
                  <div className="p-3 bg-red-900 text-white rounded mb-4">
                    {error}
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full bg-yellow-400 text-gray-900 font-semibold py-3 rounded hover:bg-yellow-300 transition flex justify-center items-center"
                  disabled={editLoading}
                >
                  {editLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : 'Update Car'}
                </button>
              </form>
            </div>
          </div>
        )}

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease forwards;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Dashboard;