"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Mail, Phone, MapPin, Loader2, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const t = useTranslations('Contact');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // idle, sending, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    }, 1500);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 py-16 md:py-24 space-y-16 text-start">
      
      {/* Hero Section */}
      <div className="space-y-6 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-black text-black tracking-tight leading-tight">
          {t('title')}
        </h1>
        <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed">
          {t('subtitle')}
        </p>
      </div>

      {/* Main Grid: Form & Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 border-t border-gray-100 pt-16 items-start">
        
        {/* Left Side: Form */}
        <div className="lg:col-span-7 bg-white border border-border rounded-3xl p-8 md:p-10 space-y-6">
          <h2 className="text-2xl font-black text-black">{t('form.title')}</h2>
          
          {status === 'success' ? (
            <div className="p-6 bg-primary/20 border border-primary/40 text-primary-dark rounded-2xl space-y-3 animate-in fade-in zoom-in duration-300">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={24} className="shrink-0" />
                <h3 className="text-lg font-bold">{t('form.successTitle')}</h3>
              </div>
              <p className="text-sm font-medium opacity-90 leading-relaxed">
                {t('form.successDesc')}
              </p>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-2 px-4 py-2 bg-black hover:bg-gray-800 text-white text-xs font-bold rounded-full transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {t('form.name')}
                </label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm bg-gray-50/50 transition-all font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {t('form.email')}
                </label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm bg-gray-50/50 transition-all font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {t('form.message')}
                </label>
                <textarea 
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you need..."
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm bg-gray-50/50 transition-all font-medium resize-none"
                />
              </div>

              <button 
                type="submit" 
                disabled={status === 'sending'}
                className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white py-4 rounded-full text-sm font-bold transition-all flex justify-center items-center gap-2 mt-4"
              >
                {status === 'sending' && <Loader2 size={16} className="animate-spin" />}
                {status === 'sending' ? t('form.sending') : t('form.submit')}
              </button>
            </form>
          )}
        </div>

        {/* Right Side: Contact Info */}
        <div className="lg:col-span-5 space-y-8 lg:ps-8">
          <h2 className="text-2xl font-black text-black">{t('info.title')}</h2>
          
          <div className="space-y-6">
            {/* Email Contact */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary-dark flex items-center justify-center shrink-0">
                <Mail size={22} />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Email</span>
                <a href={`mailto:${t('info.email')}`} className="text-base font-bold text-black hover:text-primary-dark transition-colors">
                  {t('info.email')}
                </a>
              </div>
            </div>

            {/* Phone Contact */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary-dark flex items-center justify-center shrink-0">
                <Phone size={22} />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">{t('info.phone')}</span>
                <span className="text-base font-bold text-black">
                  {t('info.phoneVal')}
                </span>
              </div>
            </div>

            {/* Address Contact */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary-dark flex items-center justify-center shrink-0">
                <MapPin size={22} />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">{t('info.office')}</span>
                <p className="text-base font-medium text-gray-600 leading-relaxed">
                  {t('info.officeVal')}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
