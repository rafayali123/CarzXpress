// src/pages/Login.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate slight authenticating network delay for polish
    setTimeout(() => {
      // Check for specific credentials
      if (email === 'rafay8924@gmail.com' && password === '1234') {
        login();
        navigate('/dashboard');
      } else {
        setError('Invalid credentials supplied. Access denied.');
        setIsLoading(false);
      }
    }, 600);
  };

  return (
    <div className="bg-[#050505] min-h-screen text-gray-100 flex items-center justify-center px-4 font-sans selection:bg-amber-400 selection:text-black relative overflow-hidden">

      {/* Animated Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f15_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

      {/* Floating & Drifting Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-amber-500/15 blur-[100px] pointer-events-none rounded-full animate-float-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-yellow-500/10 blur-[120px] pointer-events-none rounded-full animate-float-delayed"></div>

      {/* Outer Card Wrapper with Glowing Animated Gradient Border */}
      <div className="relative max-w-md w-full group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 rounded-[28px] opacity-40 group-hover:opacity-75 blur-lg transition duration-700"></div>

        <div className="relative bg-[#0C0B09]/95 backdrop-blur-2xl border border-neutral-800/90 p-8 sm:p-10 rounded-3xl shadow-2xl w-full animate-fade-in">

          {/* Brand Header Image */}
          <div className="text-center mb-8">
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-500 p-0.5 flex items-center justify-center shadow-xl shadow-amber-500/30 mx-auto mb-4 overflow-hidden group-hover:scale-105 transition-transform duration-500">
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img
                src="/images/ApexMotors logo.png"
                alt="ApexMotors Logo"
                className="w-full h-full object-cover rounded-[14px]"
              />
            </div>
            <h2 className="text-2xl font-serif font-extrabold text-white tracking-tight">Apex Portal</h2>
            <p className="text-xs text-gray-400 mt-1">Authenticate to manage inventory & live transmissions</p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl text-xs font-medium flex items-center space-x-3 animate-shake">
              <span className="text-sm">⚠️</span>
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold tracking-wider text-gray-400 uppercase">Administrator Email</label>
              <div className="relative group/input">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500 group-focus-within/input:text-amber-400 transition-colors">
                  <FaEnvelope size={13} />
                </span>
                <input
                  type="email"
                  placeholder="rafay8924@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#050505] border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-xs shadow-inner transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold tracking-wider text-gray-400 uppercase">Secure Password</label>
              <div className="relative group/input">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500 group-focus-within/input:text-amber-400 transition-colors">
                  <FaLock size={13} />
                </span>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#050505] border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-xs shadow-inner transition-all duration-300"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-black font-extrabold py-4 px-4 rounded-2xl hover:brightness-110 active:scale-[0.98] transition-all duration-300 text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 cursor-pointer disabled:opacity-50 flex items-center justify-center space-x-2 group/btn"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Initialize Session</span>
                  <FaArrowRight size={11} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.96) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-4px); }
          40%, 80% { transform: translateX(4px); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(15px); }
        }
        @keyframes floatDelayed {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(25px) translateX(-20px); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
        .animate-float-slow {
          animation: floatSlow 7s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: floatDelayed 9s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Login;