import React, { useState } from 'react';
import { FaCar, FaTools, FaHandshake, FaCreditCard, FaShieldAlt, FaArrowRight, FaCheckCircle, FaClock, FaUserTie } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const servicesData = [
  {
    id: 'sales',
    title: 'Bespoke Vehicle Acquisition',
    subtitle: 'Exclusive Fleet & Sourcing',
    icon: FaCar,
    description: 'Explore our hand-curated showroom of ultra-luxury, performance, and electric masterworks. If an exact spec is not in stock, our global network sources it directly to your precise specifications.',
    features: [
      '150-Point Technical Provenance Inspection',
      'Global Enclosed Door-to-Door Transport',
      'Custom Trim & Color Customization Consultation',
      'Verified Clean Titles & Complete Service History'
    ],
    timeline: 'Immediate delivery for stock items; 7–14 days for bespoke international sourcing.',
    badge: 'Flagship Service'
  },
  {
    id: 'maintenance',
    title: 'Precision Diagnostics & Service',
    subtitle: 'Factory-Grade Maintenance',
    icon: FaTools,
    description: 'Entrust your machine to master technicians equipped with diagnostic software built specifically for high-performance exotics and luxury marques.',
    features: [
      'OEM Certified Replacement Components',
      'Advanced Computerized Engine Diagnostics',
      'Paint Protection Film (PPF) & Detailing Suites',
      'Complimentary White-Glove Vehicle Pickup & Return'
    ],
    timeline: 'Standard servicing completed within 24 hours; custom restoration quoted per project.',
    badge: 'Expert Care'
  },
  {
    id: 'trade',
    title: 'Elite Trade-In & Consignment',
    subtitle: 'Maximum Valuation Guaranteed',
    icon: FaHandshake,
    description: 'Seamlessly transition from your current vehicle to your next masterpiece. We offer immediate, highly competitive market evaluations and full-service global consignment.',
    features: [
      'Instant Valuation Offer within 2 Hours',
      'Zero-Hassle Direct Title Transfer & Payoff Clearance',
      'High-Exposure Global Consignment Marketing',
      'Trade-In Tax Credit Advantages'
    ],
    timeline: 'Evaluation takes minutes; fund distribution finalized upon physical inspection.',
    badge: 'High Value'
  },
  {
    id: 'financing',
    title: 'Tailored Financial Structuring',
    subtitle: 'Private Banking & Leasing',
    icon: FaCreditCard,
    description: 'We partner with premier global financial institutions to design bespoke leasing, structured financing, and cash-alternative structures that protect your liquidity.',
    features: [
      'Low-Rate Competitive APRs & Open Leases',
      'Confidential Private Client Loan Officers',
      'Custom Balloon Payment Structures',
      'Instant Pre-Approval within 24 Hours'
    ],
    timeline: 'Financing clearance secured securely in 1 to 2 business days.',
    badge: 'Flexible Terms'
  },
  {
    id: 'warranty',
    title: 'Comprehensive Protection Plans',
    subtitle: 'Total Roadside & Mechanical Peace',
    icon: FaShieldAlt,
    description: 'Protect your investment with customized extended warranty agreements, bumper-to-bumper mechanical coverage, and 24/7 global concierge roadside assistance.',
    features: [
      'Zero-Deductible Comprehensive Repairs',
      '24/7 Priority Emergency Roadside Assistance',
      'Nationwide Repair Facility Acceptance',
      'Fully Transferable Coverage Upon Resale'
    ],
    timeline: 'Active instantaneously upon vehicle delivery or contract signing.',
    badge: 'Total Security'
  },
];

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState(servicesData[0].id);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentService = servicesData.find((s) => s.id === activeTab) || servicesData[0];
  const IconComponent = currentService.icon;

  const handleTabChange = (id: string) => {
    if (id === activeTab) return;
    setIsAnimating(true);
    setActiveTab(id);
    
    // Reset animation state after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="bg-[#050505] min-h-screen px-4 sm:px-8 lg:px-16 py-20 text-gray-100 selection:bg-amber-400 selection:text-black font-sans relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-amber-500/10 blur-[160px] pointer-events-none rounded-full"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold tracking-widest uppercase border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            Apex Concierge Services
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif italic font-extrabold text-white tracking-tight">
            Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 not-italic font-sans">Perfection</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base font-light leading-relaxed">
            From rare vehicle sourcing to factory-certified maintenance and financial structuring, we provide uncompromised white-glove automotive solutions.
          </p>
        </div>

        {/* Interactive Services Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Navigation Tabs */}
          <div className="lg:col-span-5 flex flex-col space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500 px-2 pb-1">Select a Service</span>
            {servicesData.map((service) => {
              const TabIcon = service.icon;
              const isActive = activeTab === service.id;
              return (
                <button
                  key={service.id}
                  onClick={() => handleTabChange(service.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                    isActive
                      ? 'bg-gradient-to-r from-[#14120E] to-[#0C0B09] border-amber-500/50 shadow-xl shadow-amber-500/5'
                      : 'bg-[#0C0B09]/80 border-neutral-800/80 hover:border-neutral-700 hover:bg-[#0C0B09]'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      isActive ? 'bg-amber-400 text-black shadow-lg shadow-amber-500/20' : 'bg-neutral-900 text-amber-400 border border-neutral-800'
                    }`}>
                      <TabIcon size={20} />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-widest block mb-0.5">{service.subtitle}</span>
                      <h3 className={`font-bold text-base transition-colors ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                        {service.title}
                      </h3>
                    </div>
                  </div>
                  <FaArrowRight size={14} className={`transition-transform duration-300 ${isActive ? 'text-amber-400 translate-x-1' : 'text-neutral-600'}`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Showcase Panel with Animated Transition */}
          <div className={`lg:col-span-7 bg-[#0C0B09] border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[520px] transition-all duration-300 transform ${
            isAnimating ? 'opacity-0 translate-y-3 scale-[0.99]' : 'opacity-100 translate-y-0 scale-100'
          }`}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-3xl pointer-events-none rounded-full"></div>
            
            <div>
              {/* Top Badge & Subtitle */}
              <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                  {currentService.badge}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1.5 font-light">
                  <FaClock className="text-amber-400" size={12} /> {currentService.timeline}
                </span>
              </div>

              {/* Title & Description */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shadow-lg">
                  <IconComponent size={26} />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif">{currentService.title}</h2>
              </div>
              
              <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed mb-8">
                {currentService.description}
              </p>

              {/* Feature Checklist */}
              <div className="space-y-3 mb-8">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">Included Specifications:</h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {currentService.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 bg-[#050505] p-3.5 rounded-xl border border-neutral-800/80">
                      <FaCheckCircle className="text-amber-400 mt-0.5 flex-shrink-0" size={14} />
                      <span className="text-xs text-gray-300 font-light leading-tight">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div className="pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <FaUserTie className="text-amber-400" size={14} />
                <span>Assigned dedicated private concierge specialist.</span>
              </div>
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-500 px-6 py-3 text-xs font-bold uppercase tracking-wider text-black rounded-xl hover:brightness-110 transition-all shadow-lg shadow-amber-500/20"
              >
                Inquire About Service
                <FaArrowRight size={11} />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Services;