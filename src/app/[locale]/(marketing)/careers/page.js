"use client";

import { useTranslations } from 'next-intl';
import { Globe, BookOpen, HeartPulse, ChevronRight } from 'lucide-react';

export default function CareersPage() {
  const t = useTranslations('Careers');

  const handleApply = (roleTitle) => {
    alert(`Thank you for your interest in the "${roleTitle}" role! Please send your resume to careers@contentops.ai.`);
  };

  const openRoles = [
    { id: 'role1', key: 'role1' },
    { id: 'role2', key: 'role2' },
    { id: 'role3', key: 'role3' }
  ];

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 py-16 md:py-24 space-y-20 text-start">
      
      {/* Hero Section */}
      <div className="space-y-6 max-w-3xl">
        <span className="inline-block px-3 py-1 bg-primary/20 border border-primary/40 rounded-full text-xs font-bold text-primary-dark uppercase tracking-wider">
          {t('positions.title')}
        </span>
        <h1 className="text-4xl md:text-6xl font-black text-black tracking-tight leading-tight">
          {t('title')}
        </h1>
        <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed">
          {t('subtitle')}
        </p>
      </div>

      {/* Culture Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start border-t border-gray-100 pt-16">
        <div className="md:col-span-1">
          <h2 className="text-2xl md:text-3xl font-black text-black">
            {t('culture.title')}
          </h2>
        </div>
        <div className="md:col-span-2">
          <p className="text-base md:text-lg text-gray-600 font-medium leading-relaxed">
            {t('culture.desc')}
          </p>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="space-y-12 border-t border-gray-100 pt-16">
        <h2 className="text-2xl md:text-3xl font-black text-black">
          {t('benefits.title')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Benefit 1 */}
          <div className="p-8 bg-white border border-border rounded-3xl space-y-4 hover:border-primary-dark/40 transition-colors duration-300">
            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-primary-dark">
              <Globe size={24} />
            </div>
            <h3 className="text-xl font-bold text-black">{t('benefits.remoteTitle')}</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              {t('benefits.remoteDesc')}
            </p>
          </div>

          {/* Benefit 2 */}
          <div className="p-8 bg-white border border-border rounded-3xl space-y-4 hover:border-primary-dark/40 transition-colors duration-300">
            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-primary-dark">
              <BookOpen size={24} />
            </div>
            <h3 className="text-xl font-bold text-black">{t('benefits.learningTitle')}</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              {t('benefits.learningDesc')}
            </p>
          </div>

          {/* Benefit 3 */}
          <div className="p-8 bg-white border border-border rounded-3xl space-y-4 hover:border-primary-dark/40 transition-colors duration-300">
            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-primary-dark">
              <HeartPulse size={24} />
            </div>
            <h3 className="text-xl font-bold text-black">{t('benefits.wellnessTitle')}</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              {t('benefits.wellnessDesc')}
            </p>
          </div>
        </div>
      </div>

      {/* Open Positions list */}
      <div className="space-y-12 border-t border-gray-100 pt-16">
        <h2 className="text-2xl md:text-3xl font-black text-black">
          {t('positions.title')}
        </h2>

        <div className="space-y-4">
          {openRoles.map((role) => (
            <div 
              key={role.id}
              className="p-6 md:p-8 bg-white border border-border rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-primary-dark/40 transition-colors duration-300"
            >
              <div className="space-y-3 text-start">
                <h3 className="text-xl md:text-2xl font-black text-black">
                  {t(`positions.${role.key}.title`)}
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-full text-xs font-bold text-gray-600">
                    {t(`positions.${role.key}.dept`)}
                  </span>
                  <span className="px-3 py-1 bg-primary/20 border border-primary/40 rounded-full text-xs font-bold text-primary-dark">
                    {t(`positions.${role.key}.type`)}
                  </span>
                </div>
              </div>
              
              <button 
                onClick={() => handleApply(t(`positions.${role.key}.title`))}
                className="self-start md:self-auto px-6 py-3 bg-black hover:bg-gray-800 text-white font-bold rounded-full text-sm transition-colors flex items-center gap-2 group shrink-0"
              >
                {t('positions.apply')}
                <ChevronRight size={16} className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
