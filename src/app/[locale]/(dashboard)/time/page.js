"use client";

import { Link } from '@/i18n/routing';

export default function TimePage() {
  return (
    <main className="px-10 py-8 bg-[#fafafa] min-h-screen w-full font-sans text-[#111]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[2rem] font-bold">Time Tracking</h1>
      </div>
      
      <div className="bg-white rounded-xl p-12 border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>
        <h2 className="text-xl font-bold text-black mb-2">Coming Soon</h2>
        <p className="text-gray-500 max-w-sm">
          The time tracking feature is currently under development. Check back later for updates.
        </p>
      </div>
    </main>
  );
}
