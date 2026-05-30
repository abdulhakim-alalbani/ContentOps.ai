"use client";

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, MoreHorizontal, Clock, MapPin, Video } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function CalendarPage() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const calendarGrid = Array.from({ length: 35 }, (_, i) => i - 1); 

  const supabase = createClient();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }
      
      const { data } = await supabase
        .from('events')
        .select('*')
        .eq('client_id', user.id)
        .order('created_at', { ascending: false });
        
      if (data) setEvents(data);
      setLoading(false);
    };
    fetchEvents();
  }, [supabase]);

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-xl shadow-sm border border-border p-8 overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">October 2026</h1>
          <p className="text-sm text-gray-500 mt-1">12 Upcoming Events</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-gray-50 border border-border rounded-lg p-1">
            <button className="px-3 py-1 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">Month</button>
            <button className="px-3 py-1 bg-white rounded-md shadow-sm text-sm font-bold text-gray-900 transition-colors">Week</button>
            <button className="px-3 py-1 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">Day</button>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
              <ChevronLeft size={16} />
            </button>
            <button className="px-3 py-1.5 text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              Today
            </button>
            <button className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>

          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-primary-hover shadow-sm">
            <Plus size={16} /> New Event
          </button>
        </div>
      </div>

      <div className="flex gap-8 flex-1 min-h-0">
        {/* Main Calendar View (Week View Mockup) */}
        <div className="flex-1 border border-border rounded-xl flex flex-col overflow-hidden bg-gray-50/30">
          {/* Week Header */}
          <div className="grid grid-cols-7 border-b border-border bg-white">
            {['Mon 12', 'Tue 13', 'Wed 14', 'Thu 15', 'Fri 16', 'Sat 17', 'Sun 18'].map((day, i) => (
              <div key={i} className={`p-4 text-center border-r border-border last:border-0 ${i === 2 ? 'bg-primary/5' : ''}`}>
                <div className={`text-sm font-bold ${i === 2 ? 'text-primary' : 'text-gray-500'}`}>{day.split(' ')[0]}</div>
                <div className={`text-2xl font-bold mt-1 ${i === 2 ? 'text-primary' : 'text-gray-900'}`}>{day.split(' ')[1]}</div>
              </div>
            ))}
          </div>

          {/* Time Grid (Simplified) */}
          <div className="flex-1 overflow-y-auto custom-scrollbar relative">
            {events.map((ev, i) => (
              <div key={ev.id} className="absolute p-2 w-[14.28%]" style={{ top: `${20 + (i * 10)}%`, left: `${14.28 * (i % 7)}%` }}>
                <div className="bg-blue-100 border border-blue-200 p-3 rounded-lg shadow-sm">
                  <div className="text-[10px] font-bold text-blue-700 uppercase tracking-wider mb-1 flex items-center gap-1"><Clock size={10} /> {ev.time}</div>
                  <h4 className="text-xs font-bold text-gray-900 mb-1">{ev.title}</h4>
                  <div className="flex items-center gap-1 text-[10px] text-gray-500">{ev.type}</div>
                </div>
              </div>
            ))}

            {/* Grid lines */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-20 border-b border-border/50 flex w-full">
                {Array.from({ length: 7 }).map((_, j) => (
                  <div key={j} className="flex-1 border-r border-border/50 last:border-0"></div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Mini Calendar & Up Next */}
        <div className="w-[300px] shrink-0 flex flex-col gap-8">
          
          {/* Mini Calendar */}
          <div className="bg-white border border-border rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">October 2026</h3>
              <div className="flex gap-1">
                <ChevronLeft size={16} className="text-gray-400 cursor-pointer hover:text-gray-900" />
                <ChevronRight size={16} className="text-gray-400 cursor-pointer hover:text-gray-900" />
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {days.map(d => <div key={d} className="text-[10px] font-bold text-gray-400 uppercase">{d.charAt(0)}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {calendarGrid.map((day, i) => (
                <div 
                  key={i} 
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-semibold mx-auto cursor-pointer transition-colors
                    ${day < 1 || day > 31 ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-100'} 
                    ${day === 14 ? 'bg-primary text-white hover:bg-primary' : ''}
                  `}
                >
                  {day > 0 && day <= 31 ? day : day <= 0 ? 30 + day : day - 31}
                </div>
              ))}
            </div>
          </div>

          {/* Up Next */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Up Next</h3>
              <button className="p-1 hover:bg-gray-100 rounded-md text-gray-400"><MoreHorizontal size={16} /></button>
            </div>
            
            <div className="flex flex-col gap-3">
              {loading && <div className="text-sm text-gray-500">Loading events...</div>}
              {!loading && events.length === 0 && <div className="text-sm text-gray-500">No upcoming events.</div>}
              {events.map((ev) => (
                <div key={ev.id} className="bg-white border border-border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-blue-500">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{ev.time} | {ev.date}</div>
                  <h4 className="text-sm font-bold text-gray-900 mb-2">{ev.title}</h4>
                  <div className="text-xs text-gray-500">{ev.type}</div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
