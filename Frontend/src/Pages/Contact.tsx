// import React from 'react';
// import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

// const Contact: React.FC = () => {
//   return (
//     <div className="bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen px-6 py-16">
//       <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-12 underline decoration-yellow-500">Get in Touch</h1>

//       <div className="grid md:grid-cols-2 gap-12">
//         {/* Contact Form */}
//         <form className="bg-white p-8 rounded-2xl shadow-xl space-y-6">
//           <div>
//             <label className="block mb-2 text-lg font-semibold text-gray-700">Name</label>
//             <input
//               type="text"
//               placeholder="Your Name"
//               className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//             />
//           </div>
//           <div>
//             <label className="block mb-2 text-lg font-semibold text-gray-700">Email</label>
//             <input
//               type="email"
//               placeholder="Your Email"
//               className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//             />
//           </div>
//           <div>
//             <label className="block mb-2 text-lg font-semibold text-gray-700">Message</label>
//             <textarea
//               placeholder="Your Message"
//               rows={5}
//               className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//             ></textarea>
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-yellow-400 text-white font-semibold py-3 rounded-xl hover:bg-yellow-500 transition"
//           >
//             Send Message
//           </button>
//         </form>

//         {/* Contact Info + Map */}
//         <div className="space-y-6">
//           <div className="bg-white p-6 rounded-2xl shadow-xl space-y-4 text-gray-700 text-lg">
//             <div className="flex items-center gap-4">
//               <FaMapMarkerAlt className="text-yellow-500 text-xl" />
//               <span>1234 Car Street, Auto City, 56789</span>
//             </div>
//             <div className="flex items-center gap-4">
//               <FaPhone className="text-yellow-500 text-xl" />
//               <span>+92 123 456 7890</span>
//             </div>
//             <div className="flex items-center gap-4">
//               <FaEnvelope className="text-yellow-500 text-xl" />
//               <span>support@carzone.com</span>
//             </div>
//           </div>

//           {/* Google Map */}
//           <iframe
//             className="rounded-xl shadow-lg w-full h-64 border-2 border-yellow-400"
//             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.051391387018!2d67.036111!3d24.860734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e8c0b4be0d1%3A0x99f43f31632188c!2sKarachi%2C%20Pakistan!5e0!3m2!1sen!2s!4v1660000000000"
//             loading="lazy"
//             allowFullScreen
//           ></iframe>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;

// import React, { useState, useEffect } from 'react';
// import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

// const Contact: React.FC = () => {
//   // State for form inputs
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: '',
//   });
//   // State for fetched messages
//   const [messages, setMessages] = useState([]);
//   // State for form submission status
//   const [status, setStatus] = useState('');

//   // Handle form input changes
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:8005/api/contact', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to send message');
//       }

//       const data = await response.json();
//       setStatus('Message sent successfully!');
//       setFormData({ name: '', email: '', message: '' }); // Reset form
//     } catch (error) {
//       setStatus(`Error: ${error.message || 'Failed to send message'}`);
//     }
//   };

//   // Fetch messages on component mount
//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const response = await fetch('http://localhost:8005/api/contact');
//         if (!response.ok) {
//           throw new Error('Failed to fetch messages');
//         }
//         const data = await response.json();
//         setMessages(data.data);
//       } catch (error) {
//         console.error('Error fetching messages:', error);
//       }
//     };
//     fetchMessages();
//   }, []);

//   return (
//     <div className="bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen px-6 py-16">
//       <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-12 underline decoration-yellow-500">Get in Touch</h1>

//       <div className="grid md:grid-cols-2 gap-12">
//         {/* Contact Form */}
//         <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl space-y-6">
//           <div>
//             <label className="block mb-2 text-lg font-semibold text-gray-700">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Your Name"
//               className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//               required
//             />
//           </div>
//           <div>
//             <label className="block mb-2 text-lg font-semibold text-gray-700">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Your Email"
//               className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//               required
//             />
//           </div>
//           <div>
//             <label className="block mb-2 text-lg font-semibold text-gray-700">Message</label>
//             <textarea
//               name="message"
//               value={formData.message}
//               onChange={handleChange}
//               placeholder="Your Message"
//               rows={5}
//               className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//               required
//             ></textarea>
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-yellow-400 text-white font-semibold py-3 rounded-xl hover:bg-yellow-500 transition"
//           >
//             Send Message
//           </button>
//           {status && <p className="text-center mt-4 text-lg">{status}</p>}
//         </form>

//         {/* Contact Info + Map */}
//         <div className="space-y-6">
//           <div className="bg-white p-6 rounded-2xl shadow-xl space-y-4 text-gray-700 text-lg">
//             <div className="flex items-center gap-4">
//               <FaMapMarkerAlt className="text-yellow-500 text-xl" />
//               <span>1234 Car Street, Auto City, 56789</span>
//             </div>
//             <div className="flex items-center gap-4">
//               <FaPhone className="text-yellow-500 text-xl" />
//               <span>+92 123 456 7890</span>
//             </div>
//             <div className="flex items-center gap-4">
//               <FaEnvelope className="text-yellow-500 text-xl" />
//               <span>support@carzone.com</span>
//             </div>
//           </div>

//           {/* Google Map */}
//           <iframe
//             className="rounded-xl shadow-lg w-full h-64 border-2 border-yellow-400"
//             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.051391387018!2d67.036111!3d24.860734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e8c0b4be0d1%3A0x99f43f31632188c!2sKarachi%2C%20Pakistan!5e0!3m2!1sen!2s!4v1660000000000"
//             loading="lazy"
//             allowFullScreen
//           ></iframe>
//         </div>
//       </div>

//       {/* Display Fetched Messages */}
//       <div className="mt-12">
//         <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Messages</h2>
//         {messages.length > 0 ? (
//           <div className="grid gap-4">
//             {messages.map((msg) => (
//               <div key={msg._id} className="bg-white p-6 rounded-xl shadow-md">
//                 <p><strong>Name:</strong> {msg.name}</p>
//                 <p><strong>Email:</strong> {msg.email}</p>
//                 <p><strong>Message:</strong> {msg.message}</p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-center text-lg text-gray-700">No messages found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Contact;

import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact: React.FC = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  // State for form submission status
  const [status, setStatus] = useState('');

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8005/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      await response.json();
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' }); // Reset form
    } catch (error) {
      setStatus(`Error: ${error.message || 'Failed to send message'}`);
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen px-6 py-16">
      <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-12 underline decoration-yellow-500">Get in Touch</h1>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl space-y-6">
          <div>
            <label className="block mb-2 text-lg font-semibold text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-lg font-semibold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-lg font-semibold text-gray-700">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows={5}
              className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-400 text-white font-semibold py-3 rounded-xl hover:bg-yellow-500 transition"
          >
            Send Message
          </button>
          {status && <p className="text-center mt-4 text-lg">{status}</p>}
        </form>

        {/* Contact Info + Map */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-xl space-y-4 text-gray-700 text-lg">
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-yellow-500 text-xl" />
              <span>1234 Car Street, Auto City, 56789</span>
            </div>
            <div className="flex items-center gap-4">
              <FaPhone className="text-yellow-500 text-xl" />
              <span>+92 123 456 7890</span>
            </div>
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-yellow-500 text-xl" />
              <span>support@carzone.com</span>
            </div>
          </div>

          {/* Google Map */}
          <iframe
            className="rounded-xl shadow-lg w-full h-64 border-2 border-yellow-400"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.051391387018!2d67.036111!3d24.860734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e8c0b4be0d1%3A0x99f43f31632188c!2sKarachi%2C%20Pakistan!5e0!3m2!1sen!2s!4v1660000000000"
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;