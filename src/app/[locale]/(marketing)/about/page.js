"use client";

import { useTranslations } from 'next-intl';
import { Sparkles, Target, Award } from 'lucide-react';

export default function AboutPage() {
  const t = useTranslations('About');

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 py-16 md:py-24 space-y-20 text-start">
      {/* Hero Section */}
      <div className="space-y-6 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-black text-black tracking-tight leading-tight">
          {t('title')}
        </h1>
        <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed">
          {t('subtitle')}
        </p>
      </div>

      {/* Stats Banner */}
      <div className="grid grid-cols-2 gap-8 md:gap-12 p-8 md:p-12 bg-primary/20 border border-primary/40 rounded-3xl">
        <div className="space-y-2 text-center md:text-start">
          <span className="text-4xl md:text-6xl font-black text-primary-dark block">
            {t('stats.drafts')}
          </span>
          <span className="text-sm md:text-base font-bold text-gray-600">
            {t('stats.draftsLabel')}
          </span>
        </div>
        <div className="space-y-2 text-center md:text-start border-s border-primary/40 ps-8 md:ps-12">
          <span className="text-4xl md:text-6xl font-black text-primary-dark block">
            {t('stats.clients')}
          </span>
          <span className="text-sm md:text-base font-bold text-gray-600">
            {t('stats.clientsLabel')}
          </span>
        </div>
      </div>

      {/* Story Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start border-t border-gray-100 pt-16">
        <div className="md:col-span-1">
          <h2 className="text-2xl md:text-3xl font-black text-black">
            {t('story.title')}
          </h2>
        </div>
        <div className="md:col-span-2">
          <p className="text-base md:text-lg text-gray-600 font-medium leading-relaxed">
            {t('story.text')}
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="space-y-12 border-t border-gray-100 pt-16">
        <h2 className="text-2xl md:text-3xl font-black text-black">
          {t('values.title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Clarity Value */}
          <div className="p-8 bg-white border border-border rounded-3xl space-y-4 hover:border-primary-dark/40 transition-colors duration-300">
            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-primary-dark">
              <Target size={24} />
            </div>
            <h3 className="text-xl font-bold text-black">{t('values.clarityTitle')}</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              {t('values.clarityDesc')}
            </p>
          </div>

          {/* Quality Value */}
          <div className="p-8 bg-white border border-border rounded-3xl space-y-4 hover:border-primary-dark/40 transition-colors duration-300">
            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-primary-dark">
              <Sparkles size={24} />
            </div>
            <h3 className="text-xl font-bold text-black">{t('values.qualityTitle')}</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              {t('values.qualityDesc')}
            </p>
          </div>

          {/* Partnership Value */}
          <div className="p-8 bg-white border border-border rounded-3xl space-y-4 hover:border-primary-dark/40 transition-colors duration-300">
            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-primary-dark">
              <Award size={24} />
            </div>
            <h3 className="text-xl font-bold text-black">{t('values.partnershipTitle')}</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              {t('values.partnershipDesc')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
