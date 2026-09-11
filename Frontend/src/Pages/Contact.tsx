import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle, FaClock, FaShieldAlt } from 'react-icons/fa';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [status, setStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('http://localhost:8005/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to transmit message to server.');
      }

      await response.json();
      setStatus({ type: 'success', message: 'Transmission received. Our private concierge will contact you shortly.' });
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    } catch (error: any) {
      console.error('Error sending message:', error);
      setStatus({ type: 'error', message: error.message || 'Transmission failed. Please verify your connection.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen px-4 sm:px-8 lg:px-16 py-20 text-gray-100 selection:bg-amber-400 selection:text-black font-sans relative overflow-hidden">
      
      {/* Background ambient lighting glow */}
      <div className="absolute top-1/4 right-10 w-[600px] h-[600px] bg-amber-500/10 blur-[170px] pointer-events-none rounded-full"></div>
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-yellow-600/5 blur-[140px] pointer-events-none rounded-full"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold tracking-widest uppercase border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            Private Client Relations
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif italic font-extrabold text-white tracking-tight">
            Connect With <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 not-italic font-sans">Apex Motors</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base font-light leading-relaxed">
            Whether inquiring about bespoke acquisitions, scheduling maintenance, or requesting private consultation, our directors are at your service.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-[#0C0B09] border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 blur-3xl pointer-events-none rounded-full"></div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2 font-serif">Inquiry Dispatch</h2>
              <p className="text-xs text-gray-400 font-light">Complete the secure form below to initiate communication with our executive team.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Abdul Rafay"
                    className="w-full px-5 py-4 rounded-2xl bg-[#050505] border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all text-sm shadow-inner"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="abdurafay@example.com"
                    className="w-full px-5 py-4 rounded-2xl bg-[#050505] border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all text-sm shadow-inner"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase">Inquiry Category</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-2xl bg-[#050505] border border-neutral-800 text-gray-300 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all text-sm shadow-inner cursor-pointer"
                >
                  <option value="General Inquiry">General Inquiry & Showroom Visit</option>
                  <option value="Bespoke Sourcing">Bespoke Vehicle Sourcing</option>
                  <option value="Service & Maintenance">Factory-Grade Service & Maintenance</option>
                  <option value="Financial Structuring">Financial & Leasing Structuring</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase">Message Details</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your requirements or preferred vehicle specifications..."
                  rows={5}
                  className="w-full px-5 py-4 rounded-2xl bg-[#050505] border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all text-sm shadow-inner resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full group bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold py-4 px-6 rounded-2xl hover:brightness-110 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-xs uppercase tracking-wider font-extrabold">Transmitting...</span>
                  </div>
                ) : (
                  <>
                    <span className="text-xs uppercase tracking-wider font-extrabold">Send Secure Transmission</span>
                    <FaPaperPlane size={12} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>

              {/* Status Alert Animation */}
              {status.message && (
                <div className={`p-4 rounded-2xl text-xs font-medium border flex items-center space-x-3 animate-fade-in ${
                  status.type === 'error' 
                    ? 'bg-red-500/10 border-red-500/30 text-red-400' 
                    : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                }`}>
                  {status.type === 'success' ? <FaCheckCircle size={16} className="flex-shrink-0" /> : <span className="text-base">⚠️</span>}
                  <p>{status.message}</p>
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Contact Info & Interactive Map Panel */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Showroom Direct Cards */}
            <div className="bg-[#0C0B09] border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-white font-serif border-b border-neutral-800 pb-4">Direct Concierge Channels</h3>
              
              <div className="space-y-5">
                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center flex-shrink-0 text-amber-400 group-hover:bg-amber-400 group-hover:text-black transition-all">
                    <FaMapMarkerAlt size={18} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm mb-0.5">Global Flagship Showroom</h4>
                    <p className="text-gray-400 font-light text-xs leading-relaxed">1234 Apex Boulevard, Executive District, Auto City, 56789</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center flex-shrink-0 text-amber-400 group-hover:bg-amber-400 group-hover:text-black transition-all">
                    <FaPhone size={18} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm mb-0.5">Direct Line</h4>
                    <p className="text-gray-400 font-light text-xs">+92 123 456 7890 (24/7 Priority Desk)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center flex-shrink-0 text-amber-400 group-hover:bg-amber-400 group-hover:text-black transition-all">
                    <FaEnvelope size={18} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm mb-0.5">Secure Electronic Mail</h4>
                    <p className="text-gray-400 font-light text-xs">concierge@apexmotors.com</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-[11px] text-gray-400">
                <span className="flex items-center gap-1.5"><FaClock className="text-amber-400" /> Mon–Sat: 9:00 AM – 8:00 PM</span>
                <span className="flex items-center gap-1.5"><FaShieldAlt className="text-amber-400" /> Secure Protocol</span>
              </div>
            </div>

            {/* Interactive Map Showcase */}
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-neutral-800 bg-[#0C0B09] p-3 relative group">
              <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10 rounded-3xl"></div>
              <iframe
                className="rounded-2xl w-full h-60 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.051391387018!2d67.036111!3d24.860734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e8c0b4be0d1%3A0x99f43f31632188c!2sKarachi%2C%20Pakistan!5e0!3m2!1sen!2s!4v1660000000000"
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;