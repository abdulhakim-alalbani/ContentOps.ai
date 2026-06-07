"use client";

import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { Hexagon, Globe } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function Navbar() {
  const t = useTranslations('Landing');
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    
    // Check initial session
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user || null);
      setLoading(false);
    });
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });
    
    return () => subscription.unsubscribe();
  }, []);

  const toggleLanguage = () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <header className="w-full px-6 py-6 lg:px-12 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
            <Hexagon size={16} fill="currentColor" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-black">ContentOps.ai</span>
        </Link>
      </div>
      
      <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
        <Link href="/#product" className="hover:text-black transition-colors">{t('nav.product')}</Link>
        <Link href="/#solutions" className="hover:text-black transition-colors">{t('nav.solutions')}</Link>
        <a href="#" className="hover:text-black transition-colors">{t('nav.resources')}</a>
        <Link href="/#pricing" className="hover:text-black transition-colors">{t('nav.pricing')}</Link>
      </nav>

      <div className="flex items-center gap-4">
        <button 
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 text-sm font-bold text-gray-500 hover:text-black transition-colors"
        >
          <Globe size={16} />
          {locale === 'en' ? 'عربي' : 'EN'}
        </button>
        
        {!loading ? (
          <Link href={user ? "/dashboard" : "/login"} className="px-5 py-2.5 bg-gray-100 text-black rounded-full text-sm font-bold hover:bg-gray-200 transition-colors flex justify-center items-center">
            {user ? t('nav.dashboard') : t('nav.signIn')}
          </Link>
        ) : (
          <div className="w-[100px] h-[40px] bg-gray-100 rounded-full animate-pulse"></div>
        )}
      </div>
    </header>
  );
}
