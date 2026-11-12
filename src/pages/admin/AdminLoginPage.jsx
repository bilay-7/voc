import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';
import { Lock, User, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginAdmin, site } = useContent();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const res = loginAdmin(username.trim(), password);
    if (res.success) {
      navigate('/admin');
    } else {
      setError(res.error || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-[#141213] text-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        {/* Logo and Brand */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-3">
            <img
              src="/assets/logo.png"
              alt="Voice of Children"
              className="h-12 w-auto object-contain mx-auto"
            />
          </Link>
          <h2
            className="mt-4 text-[26px] sm:text-[30px] font-normal text-[#F5D36B]"
            style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
          >
            Website Admin Portal
          </h2>
          <p
            className="mt-1 text-sm text-gray-400 font-light"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Sign in to manage website text, programs, and inquiries
          </p>
        </div>

        {/* Login Box */}
        <div className="mt-8 bg-[#1A1718] border border-[#AD974F]/40 p-6 sm:p-8 rounded-[4px] shadow-2xl">
          {error && (
            <div
              className="mb-5 rounded-[2px] bg-red-950/60 border border-red-500/50 p-3 text-sm text-red-200"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-1.5"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Username
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#AD974F]">
                  <User className="h-4 w-4" />
                </div>
                <input
                  id="username"
                  type="text"
                  required
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-[2px] border border-white/20 bg-[#231F20] pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#AD974F] focus:outline-none transition-colors"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-1.5"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#AD974F]">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-[2px] border border-white/20 bg-[#231F20] pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#AD974F] focus:outline-none transition-colors"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full btn-primary !h-11 mt-2 flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <ShieldCheck className="h-4 w-4" />
              Sign in to Dashboard
            </button>
          </form>

          <div
            className="mt-6 pt-5 border-t border-white/10 text-center text-xs text-gray-400 font-light"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Default access: <span className="text-[#F5D36B]">admin</span> /{' '}
            <span className="text-[#F5D36B]">admin123</span>
          </div>
        </div>

        {/* Back to site */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#F5D36B] transition-colors"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
