"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import { createClient } from '@/lib/supabase/client';
import { Mail, Lock, Hexagon, AlertCircle, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const t = useTranslations('Auth.login');
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (signInError) {
        setError(signInError.message || t('error'));
        setLoading(false);
      } else {
        router.refresh();
        router.push('/dashboard');
      }
    } catch (err) {
      setError(t('error'));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 font-sans text-gray-900">
      
      {/* Back to Home */}
      <div className="absolute top-8 left-8">
         <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-black font-bold transition-colors">
            <Hexagon size={24} className="fill-black text-black" />
            <span className="hidden sm:block">ContentOps.ai</span>
         </Link>
      </div>

      <div className="w-full max-w-[400px] bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-10 space-y-8">
        
        {/* Headings */}
        <div className="flex flex-col items-center text-center space-y-2">
          <h2 className="text-3xl font-black text-black">{t('title')}</h2>
          <p className="text-sm text-gray-500 font-medium">{t('subtitle')}</p>
        </div>

        {/* Error notice */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium flex items-start gap-2 animate-in fade-in">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          
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
            {loading ? '...' : t('submit')}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center text-sm font-medium text-gray-500 pt-4">
          {t('footer')}{' '}
          <Link href="/signup" className="text-black font-bold hover:underline">
            {t('footerLink')}
          </Link>
        </div>

      </div>
    </div>
  );
}
