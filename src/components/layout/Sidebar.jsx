"use client";

import { 
  LayoutGrid, 
  CheckCircle2, 
  Inbox, 
  Calendar, 
  BarChart2, 
  Folder, 
  Plus,
  ChevronDown,
  FileText,
  Users,
  UserPlus,
  HelpCircle,
  Settings,
  Hexagon
} from 'lucide-react';
import { Link, usePathname } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function Sidebar() {
  const pathname = usePathname();
  const t = useTranslations('Sidebar');

  // Match /orders for "My Tasks" since we will rename it in the UI
  const isActive = (path) => pathname === path || (path === '/orders' && pathname.startsWith('/orders'));

  return (
    <aside className="w-[260px] bg-sidebar flex flex-col h-screen sticky top-0 shrink-0 select-none text-sidebar-foreground border-r border-sidebar/5">
      {/* Logo Area */}
      <Link href="/" className="px-6 py-6 flex items-center justify-between mb-4 cursor-pointer hover:bg-white/5 transition-colors block">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
            <Hexagon size={18} fill="currentColor" />
          </div>
          <span className="font-bold text-lg tracking-tight">ContentOps</span>
        </div>
      </Link>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar px-4 flex flex-col gap-6 pb-6">
        
        {/* Main Nav Links */}
        <nav className="flex flex-col gap-1">
          <Link 
            href="/dashboard" 
            className={`px-4 py-3 rounded-xl transition-all flex items-center gap-3 text-[0.9rem] font-medium ${
              isActive('/dashboard')
                ? 'bg-primary text-white shadow-sm' 
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutGrid size={18} />
            {t('dashboard')}
          </Link>
          
          <Link 
            href="/orders" 
            className={`px-4 py-3 rounded-xl transition-all flex items-center gap-3 text-[0.9rem] font-medium ${
              isActive('/orders') 
                ? 'bg-primary text-white shadow-sm' 
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <CheckCircle2 size={18} />
            {t('orders')}
          </Link>

          <Link 
            href="/inbox" 
            className={`px-4 py-3 rounded-xl transition-all flex items-center gap-3 text-[0.9rem] font-medium ${
              isActive('/inbox') 
                ? 'bg-primary text-white shadow-sm' 
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Inbox size={18} />
            {t('inbox')}
          </Link>
        </nav>
      </div>

      {/* Bottom links */}
      <div className="mt-auto px-4 py-6 border-t border-white/10 flex flex-col gap-1 shrink-0">
        <Link href="/settings" className="px-4 py-2.5 rounded-xl transition-colors flex items-center gap-3 text-[0.9rem] text-gray-300 hover:text-white hover:bg-white/5">
          <Settings size={18} />
          {t('settings')}
        </Link>
      </div>
    </aside>
  );
}
