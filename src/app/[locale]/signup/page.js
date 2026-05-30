"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { createClient } from '@/lib/supabase/client';
import { Mail, Lock, User, Building, Hexagon, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

export default function SignupPage() {
  const t = useTranslations('Auth.signup');
  const supabase = createClient();

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            company
          }
        }
      });

      if (signUpError) {
        setError(signUpError.message || t('error'));
        setLoading(false);
      } else {
        setSuccess(true);
        setLoading(false);
      }
    } catch (err) {
      setError(t('error'));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 font-sans text-gray-900 py-12">
      
      {/* Back to Home */}
      <div className="absolute top-8 left-8">
         <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-black font-bold transition-colors">
            <Hexagon size={24} className="fill-black text-black" />
            <span className="hidden sm:block">ContentOps.ai</span>
         </Link>
      </div>

      <div className="w-full max-w-[450px] bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-10 space-y-8">
        
        {/* Headings */}
        <div className="flex flex-col items-center text-center space-y-2">
          <h2 className="text-3xl font-black text-black">{t('title')}</h2>
          <p className="text-sm text-gray-500 font-medium">{t('subtitle')}</p>
        </div>

        {/* Success state */}
        {success ? (
          <div className="p-8 bg-green-50/50 border border-green-100 text-green-800 rounded-3xl space-y-4 animate-in fade-in zoom-in-95 duration-500 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-2 shadow-inner">
              <CheckCircle size={32} />
            </div>
            <h4 className="text-lg font-black text-green-900">Email Verification Sent</h4>
            <p className="text-sm text-green-700 font-medium leading-relaxed">{t('success')}</p>
            <div className="pt-4 w-full">
              <Link href="/login" className="block w-full py-3.5 bg-black text-white rounded-full text-sm font-bold shadow-lg hover:bg-gray-800 transition-colors">
                Back to Sign In
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Error notice */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium flex items-start gap-2 animate-in fade-in">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSignup} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t('name')}</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-gray-400">
                      <User size={18} />
                    </div>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm bg-gray-50/50 transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Company */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t('company')}</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-gray-400">
                      <Building size={18} />
                    </div>
                    <input 
                      type="text" 
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Acme Corp"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm bg-gray-50/50 transition-all font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t('email')}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-gray-400">
                    <Mail size={18} />
                  </div>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm bg-gray-50/50 transition-all font-medium"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t('password')}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-gray-400">
                    <Lock size={18} />
                  </div>
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm bg-gray-50/50 transition-all font-medium"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white py-4 rounded-full text-sm font-bold transition-all shadow-lg shadow-black/10 flex justify-center items-center gap-2 mt-4"
              >
                {loading && <Loader2 size={16} className="animate-spin" />}
                {loading ? 'Creating Account...' : t('submit')}
              </button>
            </form>
          </>
        )}

        {/* Footer */}
        <div className="text-center text-sm font-medium text-gray-500 pt-4">
          {t('footer')}{' '}
          <Link href="/login" className="text-black font-bold hover:underline">
            {t('footerLink')}
          </Link>
        </div>

      </div>
    </div>
  );
}
