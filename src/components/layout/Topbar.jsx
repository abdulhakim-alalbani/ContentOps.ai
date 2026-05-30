"use client";

import { useState, useEffect } from 'react';
import { Search, ChevronDown, Bell, Settings, LogOut, MessageSquare, Globe } from 'lucide-react';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { createClient } from '@/lib/supabase/client';

export default function Topbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('Topbar');
  const supabase = createClient();

  const toggleLanguage = () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

  const handleSignOut = async () => {
    setIsDropdownOpen(false);
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  const [userAvatar, setUserAvatar] = useState('https://ui-avatars.com/api/?name=User&background=c5e3ff&color=0689db');
  const [unreadMessages, setUnreadMessages] = useState([]);

  useEffect(() => {
    setMounted(true);
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const name = user.user_metadata?.name || user.email || 'User';
        const avatar = user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=c5e3ff&color=0689db&bold=true`;
        setUserAvatar(avatar);

        const { data: msgs } = await supabase
          .from('messages')
          .select('*')
          .eq('client_id', user.id)
          .eq('is_read', false)
          .order('created_at', { ascending: false })
          .limit(5);
        if (msgs) setUnreadMessages(msgs);
      }
    };
    fetchUser();
  }, [supabase]);

  if (!mounted) {
    return <header className="h-20 w-full px-8 bg-white border-b border-border sticky top-0 z-10 shrink-0"></header>;
  }

  return (
    <header className="h-20 w-full px-8 flex items-center justify-between bg-white border-b border-border sticky top-0 z-10 shrink-0">
      
      {/* Search */}
      <div className="relative w-full max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input 
          suppressHydrationWarning
          type="text" 
          placeholder={t('searchPlaceholder')} 
          className="w-full pl-10 pr-12 py-2.5 bg-gray-50/50 border border-border rounded-xl text-sm focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300 transition-all placeholder:text-gray-400"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gray-200 text-gray-500">⌘ I</span>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6 relative">
        
        {/* Language Switcher */}
        <button 
          suppressHydrationWarning
          onClick={toggleLanguage}
          className="relative text-gray-500 hover:text-gray-800 transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-primary/20 rounded-full p-1 flex items-center gap-1"
          title={locale === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
        >
          <Globe size={20} />
          <span className="text-xs font-bold uppercase text-gray-600">{locale === 'en' ? 'عربي' : 'EN'}</span>
        </button>

        {/* Notification Bell Container */}
        <div className="relative">
          <button 
            suppressHydrationWarning
            onClick={() => {
              setIsNotificationsOpen(!isNotificationsOpen);
              if (isDropdownOpen) setIsDropdownOpen(false);
            }}
            className="relative text-gray-500 hover:text-gray-800 transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-primary/20 rounded-full p-1"
          >
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-3.5 h-3.5 flex items-center justify-center text-[8px] font-bold text-white rounded-full bg-primary border-[1.5px] border-white">
              {unreadMessages.length}
            </span>
          </button>

          {/* Notifications Dropdown */}
          {isNotificationsOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsNotificationsOpen(false)}></div>
              <div className="absolute right-0 mt-2 w-80 bg-white border border-border rounded-xl shadow-lg py-2 z-20 overflow-hidden">
                <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-900">{t('notifications')}</h3>
                  <span className="text-xs text-primary font-semibold cursor-pointer hover:underline">{t('markAllRead')}</span>
                </div>
                
                <div className="max-h-[300px] overflow-y-auto">
                  {unreadMessages.map((msg) => (
                    <Link 
                      key={msg.id}
                      href="/inbox"
                      onClick={() => setIsNotificationsOpen(false)}
                      className="flex gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                    >
                      <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 bg-gray-200">
                        <img src={msg.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(msg.sender)}&background=c5e3ff&color=0689db`} alt={msg.sender} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-0.5">
                          <span className="text-sm font-bold text-gray-900 truncate">{msg.sender}</span>
                          <span className="text-[10px] font-semibold text-gray-500 shrink-0 ml-2">{msg.time || new Date(msg.created_at).toLocaleDateString()}</span>
                        </div>
                        <p className="text-xs text-gray-600 truncate">{msg.subject}</p>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-primary shrink-0 self-center"></div>
                    </Link>
                  ))}
                </div>
                
                <div className="px-4 py-2 bg-gray-50 border-t border-border text-center">
                  <Link href="/inbox" className="text-xs font-bold text-primary hover:underline" onClick={() => setIsNotificationsOpen(false)}>
                    {t('viewAllMessages')}
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Profile Dropdown Container */}
        <div className="relative">
          <button 
            suppressHydrationWarning
            onClick={() => {
              setIsDropdownOpen(!isDropdownOpen);
              if (isNotificationsOpen) setIsNotificationsOpen(false);
            }}
            className="flex items-center gap-2 px-1 py-1 pr-3 rounded-full border border-border hover:bg-gray-50 transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-primary/20"
          >
            <span className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden shrink-0 block">
              <img src={userAvatar} alt="User Avatar" className="w-full h-full object-cover" />
            </span>
            <ChevronDown size={16} className={`text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <>
              {/* Invisible overlay to close dropdown when clicking outside */}
              <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
              
              <div className="absolute right-0 mt-2 w-48 bg-white border border-border rounded-xl shadow-lg py-2 z-20 overflow-hidden">
                <Link 
                  href="/settings"
                  className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors w-full text-left"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <Settings size={16} />
                  {t('settings')}
                </Link>
                <div className="h-px bg-border my-1 w-full"></div>
                <button 
                  className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                  onClick={handleSignOut}
                >
                  <LogOut size={16} />
                  {t('signOut')}
                </button>
              </div>
            </>
          )}
        </div>

      </div>
    </header>
  );
}
