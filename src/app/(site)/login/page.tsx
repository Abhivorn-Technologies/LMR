'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validations
    if (!email || !password) {
      toast.error('Please enter both email and password.');
      return;
    }

    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    if (password.length < 8 || password.length > 16) {
      toast.error('Password must be between 8 and 16 characters.');
      return;
    }

    const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;;
    if (!specialCharRegex.test(password)) {
      toast.error('Password must contain at least one special character.');
      return;
    }

    setLoading(true);
    const loginToast = toast.loading('Verifying credentials...');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      toast.success('Login successful! Redirecting...', { id: loginToast });
      window.location.href = '/admin';
    } catch (err: any) {
      toast.error(err.message, { id: loginToast });
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
      <Toaster position="top-right" />
      
      {/* Subtle Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-teal-400/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none"></div>
      
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 flex overflow-hidden relative z-10 h-[560px]">
        
        {/* Back to Home Button */}
        <Link href="/" className="absolute top-4 left-4 md:top-6 md:left-6 z-20 flex items-center gap-1.5 text-slate-600 hover:text-teal-700 bg-white/80 hover:bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-200 backdrop-blur-sm transition-all duration-300">
          <ArrowLeft size={16} />
          <span className="text-[12px] font-bold">Back to Home</span>
        </Link>

        {/* Left Side - Clean Illustration */}
        <div className="hidden md:flex w-1/2 bg-teal-50/40 p-8 pt-24 pb-12 flex-col items-center justify-start relative border-r border-slate-100">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-teal-100/40 via-transparent to-transparent"></div>
          
          <div className="relative z-10 text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-800 mb-2">LMB Insurance Platform</h1>
            <p className="text-slate-500 text-[13px] max-w-sm mx-auto leading-relaxed">
              The secure portal for managing your enterprise content and operations.
            </p>
          </div>
          
          <div className="relative w-full max-w-[380px] aspect-[4/3] rounded-2xl overflow-hidden shadow-[inset_0_4px_20px_rgba(0,0,0,0.1),_0_10px_30px_rgba(0,0,0,0.08)] bg-white/50 backdrop-blur-sm border border-slate-200/60 p-3 transition-all duration-500 hover:shadow-[inset_0_4px_20px_rgba(0,0,0,0.15),_0_15px_40px_rgba(0,180,216,0.15)] group mt-auto">
            <div className="relative w-full h-full rounded-xl overflow-hidden shadow-[inset_0_0_15px_rgba(0,0,0,0.05)] border border-slate-100/80">
              <Image 
                src="/assets/lmr image.png" 
                alt="LMB Premium Dashboard" 
                fill
                quality={100}
                sizes="(max-width: 768px) 100vw, 380px"
                className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />
            </div>
          </div>
        </div>

        {/* Right Side - Neat Form */}
        <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-white relative">
          <div className="w-full max-w-sm mx-auto">
            <div className="text-center mb-8 flex flex-col items-center">
              <Link href="/" className="inline-block cursor-pointer -mb-3 mt-0">
                <Image 
                  src="/assets/logo.png"
                  alt="LMB Logo"
                  width={280}
                  height={90}
                  className="h-20 w-auto object-contain"
                  priority
                />
              </Link>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-1.5 mt-0">Welcome Back</h2>
              <p className="text-slate-500 text-[13px]">Sign in to continue to Admin Dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4" autoComplete="off">
              <div>
                <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter the email"
                    style={{ outline: 'none' }}
                    className="w-full pl-10 py-2.5 bg-white border border-slate-300 rounded-md shadow-sm focus:border-teal-600 focus:ring-0 text-[14px] transition-all placeholder:text-slate-400 placeholder:font-normal text-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock size={16} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    maxLength={16}
                    style={{ outline: 'none' }}
                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-300 rounded-md shadow-sm focus:border-teal-600 focus:ring-0 text-[14px] transition-all placeholder:text-slate-400 placeholder:font-normal text-black"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-teal-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 text-[14px] tracking-wide font-bold bg-teal-600 hover:bg-teal-700 text-white rounded-md shadow-md shadow-teal-600/15 transition-all active:scale-[0.98]"
                >
                  {loading ? 'Authenticating...' : 'Sign In To Dashboard'}
                </Button>
              </div>
            </form>
          </div>
          
          <div className="mt-8 text-center absolute bottom-6 w-full left-0 right-0">
            <p className="text-[11px] font-medium text-slate-400">
              &copy; 2026 LMB Insurance Brokers. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
