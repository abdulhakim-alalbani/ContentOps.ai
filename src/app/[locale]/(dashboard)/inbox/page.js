"use client";

import { useState, useEffect } from 'react';
import { Search, Filter, MoreVertical, Star, Reply, Archive, Trash2, CheckCircle2, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { createClient } from '@/lib/supabase/client';

export default function InboxPage() {
  const t = useTranslations('Inbox');
  const supabase = createClient();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }
      
      const { data } = await supabase
        .from('messages')
        .select('*')
        .eq('client_id', user.id)
        .order('created_at', { ascending: false });
        
      if (data) setMessages(data);
      setLoading(false);
    };
    fetchMessages();
  }, [supabase]);
  return (
    <div className="flex h-full w-full bg-white rounded-xl border border-border overflow-hidden">
      
      {/* Left Sidebar - Message List */}
      <div className="w-[350px] border-r border-border flex flex-col shrink-0">
        
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">{t('title')} <span className="ml-2 text-xs bg-primary text-white px-2 py-0.5 rounded-full">2</span></h2>
            <button className="text-gray-500 hover:text-primary transition-colors flex items-center gap-1 text-xs font-semibold bg-gray-100 hover:bg-primary/10 px-2 py-1 rounded-md">
              <CheckCircle2 size={14} /> {t('markAllRead')}
            </button>
          </div>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder={t('search')} 
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-border rounded-lg text-sm focus:outline-none focus:bg-white focus:border-gray-300"
            />
          </div>
        </div>

        {/* Message List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar relative">
          {loading && <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10"><Loader2 className="animate-spin text-primary" size={24} /></div>}
          {messages.length === 0 && !loading && <div className="p-8 text-center text-gray-500 text-sm">No messages found.</div>}
          {messages.map((msg, index) => (
            <div 
              key={msg.id} 
              className={`p-4 border-b border-border cursor-pointer transition-colors ${
                index === 0 ? 'bg-primary/5 border-l-2 border-l-primary' : 'hover:bg-gray-50 border-l-2 border-l-transparent'
              }`}
            >
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 shrink-0">
                    <img src={msg.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(msg.sender)}&background=c5e3ff&color=0689db`} alt={msg.sender} className="w-full h-full object-cover" />
                  </div>
                  <span className={`text-sm font-bold ${!msg.is_read ? 'text-gray-900' : 'text-gray-600'}`}>{msg.sender}</span>
                </div>
                <span className="text-[10px] font-semibold text-gray-500 mt-1">{msg.time || new Date(msg.created_at).toLocaleDateString()}</span>
              </div>
              <h3 className={`text-[0.85rem] mb-1 truncate pr-4 ${!msg.is_read ? 'font-bold text-gray-900' : 'font-semibold text-gray-700'}`}>{msg.subject}</h3>
              <p className="text-[0.8rem] text-gray-500 line-clamp-2 leading-relaxed">{msg.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Content - Message Detail */}
      <div className="flex-1 flex flex-col min-w-0 bg-background">
        
        {/* Detail Header */}
        <div className="h-[72px] px-6 border-b border-border bg-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors">
              <Archive size={16} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors">
              <Trash2 size={16} />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold text-gray-400">1 of 24</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors">
              <Star size={16} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors">
              <MoreVertical size={16} />
            </button>
          </div>
        </div>

        {/* Message Body */}
        <div className="flex-1 overflow-y-auto p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Re: Website Redesign Assets</h1>
          
          <div className="bg-white rounded-xl p-6 border border-border">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                  <img src="https://i.pravatar.cc/150?img=11" alt="Eleanor Pena" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Eleanor Pena</h3>
                  <p className="text-xs font-medium text-gray-500">eleanor@example.com • To: me</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-gray-400">Oct 28, 2026, 10:42 AM</span>
            </div>
            
            <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed">
              <p>Hi team,</p>
              <p>I just uploaded the final brand assets to the shared drive. This includes the new logo variations in SVG and PNG formats, as well as the updated typography guidelines.</p>
              <p>Let me know if you need anything else before the kickoff tomorrow. I'm excited to see how the new designs look!</p>
              <br/>
              <p>Best regards,<br/>Eleanor</p>
            </div>

            {/* Attachments */}
            <div className="mt-8 pt-6 border-t border-border">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">2 {t('attachments')}</h4>
              <div className="flex gap-4">
                <div className="w-40 h-24 rounded-lg bg-gray-100 border border-border flex items-center justify-center text-sm font-bold text-gray-400">
                  brand-logos.zip
                </div>
                <div className="w-40 h-24 rounded-lg bg-gray-100 border border-border flex items-center justify-center text-sm font-bold text-gray-400">
                  typography.pdf
                </div>
              </div>
            </div>
          </div>

          {/* Reply Area */}
          <div className="mt-6 bg-white rounded-xl p-4 border border-border flex gap-3 items-start">
             <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 bg-gray-200">
                <img src="https://i.pravatar.cc/150?img=1" alt="Me" />
             </div>
             <div className="flex-1">
               <textarea 
                 placeholder={`${t('replyPlaceholder')} Eleanor...`}
                 className="w-full bg-transparent border-none focus:ring-0 resize-none text-sm min-h-[80px]"
               ></textarea>
               <div className="flex justify-between items-center mt-2">
                 <div className="flex gap-2">
                   <button className="text-gray-400 hover:text-gray-600"><Paperclip size={16} /></button>
                 </div>
                 <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-primary-hover">
                   <Reply size={14} /> {t('send')}
                 </button>
               </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function Paperclip({ size, className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
  );
}
