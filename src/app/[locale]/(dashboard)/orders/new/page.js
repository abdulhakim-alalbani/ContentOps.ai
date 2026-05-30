"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import { createOrder } from '@/lib/mock-data';

export default function NewOrderPage() {
  const t = useTranslations('NewOrder');
  const tOrders = useTranslations('Orders');
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [type, setType] = useState('blog');
  const [priority, setPriority] = useState('normal');
  const [wordCount, setWordCount] = useState(1000);
  const [deadline, setDeadline] = useState('');
  const [brief, setBrief] = useState('');
  const [keywords, setKeywords] = useState('');

  const getBaseRatePerWord = (contentType) => {
    switch (contentType) {
      case 'blog': return 0.10;
      case 'email': return 0.15;
      case 'copywriting': return 0.15;
      case 'social': return 0.15;
      default: return 0.10;
    }
  };

  const getPriorityMultiplier = (pri) => {
    switch (pri) {
      case 'normal': return 1.0;
      case 'high': return 1.2;
      case 'urgent': return 1.5;
      default: return 1.0;
    }
  };

  const baseRate = getBaseRatePerWord(type);
  const multiplier = getPriorityMultiplier(priority);
  const estimatedPrice = wordCount * baseRate * multiplier;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !brief.trim() || !deadline) return;

    const keywordsArray = keywords.split(',').map(k => k.trim()).filter(Boolean);

    createOrder({
      title,
      type,
      priority,
      wordCount: parseInt(wordCount),
      price: estimatedPrice,
      deadline,
      brief,
      keywords: keywordsArray
    });

    router.push('/orders');
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <header className="px-8 py-8 w-full">
        <h1 className="text-3xl font-bold text-foreground mb-4">{t('title')}</h1>
        <div className="text-sm text-muted">
          <span>{t('breadcrumbs').split(' / ')[0]} <span className="mx-1">/</span> </span>
          <span className="font-semibold text-foreground">{t('breadcrumbs').split(' / ')[1]}</span>
        </div>
      </header>

      <main className="px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 bg-card rounded-2xl p-8 border border-border shadow-sm">
            <h2 className="text-xl font-bold mb-1 text-foreground">{t('form.title')}</h2>
            <p className="text-sm text-muted mb-8">{t('form.subtitle')}</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-2">
                <label className="text-sm text-muted block">{t('form.orderTitle')}</label>
                <input 
                  type="text" 
                  required
                  placeholder={t('form.orderTitlePlaceholder')}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-input focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-muted block">{t('form.type')}</label>
                  <div className="relative">
                    <select 
                      value={type} 
                      onChange={(e) => setType(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-input focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm appearance-none bg-white"
                    >
                      <option value="blog">{tOrders('types.blog')}</option>
                      <option value="email">{tOrders('types.email')}</option>
                      <option value="copywriting">{tOrders('types.copywriting')}</option>
                      <option value="social">{tOrders('types.social')}</option>
                    </select>
                    <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none text-muted">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-muted block">{t('form.priority')}</label>
                  <div className="relative">
                    <select 
                      value={priority} 
                      onChange={(e) => setPriority(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-input focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm appearance-none bg-white"
                    >
                      <option value="normal">{t('priorities.normal')}</option>
                      <option value="high">{t('priorities.high')}</option>
                      <option value="urgent">{t('priorities.urgent')}</option>
                    </select>
                    <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none text-muted">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-muted block">{t('form.wordCount')}</label>
                  <input 
                    type="number" 
                    required
                    min="100"
                    max="10000"
                    step="100"
                    value={wordCount}
                    onChange={(e) => setWordCount(parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 rounded-xl border border-input focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-muted block">{t('form.deadline')}</label>
                  <input 
                    type="date" 
                    required
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-input focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-muted block">{t('form.brief')}</label>
                <textarea 
                  required
                  rows="6"
                  placeholder={t('form.briefPlaceholder')}
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-input focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-white"
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-muted block">{t('form.keywords')}</label>
                <input 
                  type="text" 
                  placeholder={t('form.keywordsPlaceholder')}
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-input focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-white"
                />
              </div>

              <div className="pt-4 flex items-center gap-4">
                <button type="submit" className="bg-primary hover:bg-primary-hover text-white px-8 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-primary/25 cursor-pointer">
                  {t('form.submit')}
                </button>
                <Link href="/orders" className="bg-white border border-input text-foreground hover:bg-gray-50 px-8 py-2.5 rounded-xl text-sm font-semibold transition-colors inline-block text-center cursor-pointer">
                  {t('form.cancel')}
                </Link>
              </div>

            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-6 border border-border shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-foreground">{t('form.estimate')}</h3>
              
              <div className="divide-y divide-border/60 text-sm">
                <div className="py-3 flex justify-between">
                  <span className="text-muted">Content type base</span>
                  <span className="font-semibold text-foreground">${baseRate.toFixed(2)} / word</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-muted">Target Word count</span>
                  <span className="font-semibold text-foreground">{wordCount} words</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-muted">Priority multiplier</span>
                  <span className="font-semibold text-foreground">x{multiplier}</span>
                </div>
                <div className="py-4 flex justify-between text-base border-t border-border font-bold">
                  <span className="text-foreground">Total Estimate</span>
                  <span className="text-primary text-xl">${estimatedPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
