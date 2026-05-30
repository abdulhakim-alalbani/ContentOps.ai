"use client";

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Star, RefreshCw, Landmark, Shield, Briefcase, Users, Edit3, CheckCircle2, CheckSquare, ArrowRightLeft, Cloud } from 'lucide-react';

export default function LandingPage() {
  const t = useTranslations('Landing');

  return (
    <div className="w-full flex flex-col">
      {/* Hero Section */}
      <div className="w-full max-w-[1400px] mx-auto px-6 py-12 lg:py-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
        
        {/* Left Side: Copy */}
        <div className="w-full lg:w-1/2 space-y-8 text-start pr-0 lg:pr-12">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg shadow-sm text-sm font-bold text-gray-800">
            <Star size={16} className="fill-black text-black" />
            {t('hero.rating')}
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-black">
            {t('hero.title')}
          </h1>
          
          <p className="text-lg text-gray-600 font-medium leading-relaxed max-w-lg">
            {t('hero.subtitle')}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
            <Link href="/signup" className="w-full sm:w-auto px-8 py-4 bg-primary-dark hover:bg-[#0575ba] text-white rounded-full font-bold transition-all text-center">
              {t('hero.tryFree')}
            </Link>
            <Link href="/signup" className="w-full sm:w-auto px-8 py-4 bg-gray-100 hover:bg-gray-200 text-black rounded-full font-bold transition-all text-center">
              {t('hero.bookDemo')}
            </Link>
          </div>
        </div>

        {/* Right Side: Visual Pane */}
        <div className="w-full lg:w-1/2 relative h-[500px] lg:h-[650px] bg-gray-100 rounded-[2rem] overflow-hidden shadow-2xl flex items-center justify-center">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover"
          >
            <source src="/motio.webm" type="video/webm" />
          </video>
        </div>
      </div>

      {/* Logos Section */}
      <section className="border-y border-gray-100 py-12 bg-white w-full">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-60 grayscale">
          <h3 className="text-xl font-serif font-bold tracking-widest">KEENELAND</h3>
          <h3 className="text-xl font-serif font-bold tracking-widest flex items-center gap-2"><div className="w-3 h-3 bg-black rotate-45"></div> SEMINOLE</h3>
          <h3 className="text-xl font-serif font-bold tracking-widest">Kintura</h3>
          <h3 className="text-xl font-serif font-bold tracking-widest">LeafSpring</h3>
          <h3 className="text-xl font-serif font-bold tracking-widest text-center leading-none">TRILOGY<br/><span className="text-[10px] tracking-normal">HEALTH SERVICES</span></h3>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="product" className="py-24 bg-white border-t border-gray-100 w-full">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-12">
            <div className="max-w-xl text-start">
              <span className="text-primary-dark font-bold text-xs tracking-widest uppercase mb-4 block">{t('workflow.label')}</span>
              <h2 className="text-4xl md:text-5xl font-black text-black leading-tight tracking-tight">{t('workflow.title')}</h2>
            </div>
            <div className="max-w-md pt-4 md:pt-10 text-start">
              <p className="text-lg text-gray-500 font-medium leading-relaxed">{t('workflow.desc')}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8 text-start">
            <div className="space-y-4">
              <div className="w-12 h-12 flex items-center text-gray-900">
                <RefreshCw size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-black">{t('workflow.f1Title')}</h3>
              <p className="text-gray-500 font-medium leading-relaxed">{t('workflow.f1Desc')}</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 flex items-center text-gray-900">
                <Landmark size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-black">{t('workflow.f2Title')}</h3>
              <p className="text-gray-500 font-medium leading-relaxed">{t('workflow.f2Desc')}</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 flex items-center text-gray-900">
                <Shield size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-black">{t('workflow.f3Title')}</h3>
              <p className="text-gray-500 font-medium leading-relaxed">{t('workflow.f3Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-24 bg-black text-white w-full">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-primary font-bold text-xs tracking-widest uppercase block">{t('solutions.label')}</span>
            <h2 className="text-4xl md:text-5xl font-black">{t('solutions.title')}</h2>
            <p className="text-lg text-gray-400 font-medium">{t('solutions.desc')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-10 hover:border-primary-dark/50 transition-colors">
              <div className="w-14 h-14 bg-primary/20 text-primary rounded-2xl flex items-center justify-center mb-6">
                <Briefcase size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold mb-4">{t('solutions.agencies.title')}</h3>
              <p className="text-gray-400 font-medium leading-relaxed">{t('solutions.agencies.desc')}</p>
            </div>
            
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-10 hover:border-pink-500/50 transition-colors">
              <div className="w-14 h-14 bg-pink-500/10 text-pink-400 rounded-2xl flex items-center justify-center mb-6">
                <Users size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold mb-4">{t('solutions.inhouse.title')}</h3>
              <p className="text-gray-400 font-medium leading-relaxed">{t('solutions.inhouse.desc')}</p>
            </div>
            
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-10 hover:border-teal-500/50 transition-colors">
              <div className="w-14 h-14 bg-teal-500/10 text-teal-400 rounded-2xl flex items-center justify-center mb-6">
                <Edit3 size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold mb-4">{t('solutions.freelancers.title')}</h3>
              <p className="text-gray-400 font-medium leading-relaxed">{t('solutions.freelancers.desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-24 bg-gray-50 border-t border-gray-100 w-full">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-4">
            <span className="text-primary-dark font-bold text-xs tracking-widest uppercase block">{t('whyUs.label')}</span>
            <h2 className="text-4xl md:text-5xl font-black text-black">{t('whyUs.title')}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto text-start">
            {/* Stat Card */}
            <div className="bg-white rounded-3xl p-10 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 flex flex-col justify-center gap-2 transition-transform hover:-translate-y-1 duration-300">
              <span className="text-6xl font-black text-primary-dark mb-2">{t('whyUs.statNumber')}</span>
              <p className="text-lg font-medium text-gray-500 leading-relaxed">{t('whyUs.statDesc')}</p>
            </div>
            
            {/* Feature UI Card */}
            <div className="bg-white rounded-3xl p-10 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 flex flex-col justify-between gap-12 transition-transform hover:-translate-y-1 duration-300">
              <p className="text-xl font-medium text-gray-900 leading-relaxed max-w-sm">
                {t('whyUs.cardTitle')}
              </p>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-primary-dark rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary-dark/30">
                  <CheckSquare size={24} />
                </div>
                <ArrowRightLeft size={16} className="text-gray-300" />
                <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-gray-900/30">
                  <Cloud size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-white w-full">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-black text-black">{t('pricing.title')}</h2>
            <p className="text-lg text-gray-600">{t('pricing.desc')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['free', 'pro', 'enterprise'].map((tier, idx) => (
              <div key={tier} className={`p-8 rounded-3xl border ${tier === 'pro' ? 'border-black shadow-2xl bg-primary-dark text-white scale-105 z-10 relative' : 'border-gray-200 bg-white text-gray-900'} flex flex-col`}>
                <h3 className={`text-xl font-bold mb-2 ${tier === 'pro' ? 'text-white' : 'text-black'}`}>{t(`pricing.${tier}.name`)}</h3>
                <p className={`text-sm mb-6 ${tier === 'pro' ? 'text-gray-400' : 'text-gray-500'}`}>{t(`pricing.${tier}.desc`)}</p>
                
                <div className="mb-8">
                  <span className={`text-5xl font-black ${tier === 'pro' ? 'text-white' : 'text-black'}`}>{t(`pricing.${tier}.price`)}</span>
                  {tier !== 'enterprise' && <span className={`text-sm font-semibold ${tier === 'pro' ? 'text-gray-400' : 'text-gray-500'}`}>/mo</span>}
                </div>
                
                <ul className="space-y-4 mb-8 flex-1">
                  {[0, 1, 2].map((featIdx) => (
                    <li key={featIdx} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className={`shrink-0 mt-0.5 ${tier === 'pro' ? 'text-white' : 'text-black'}`} />
                      <span className={`text-sm font-medium ${tier === 'pro' ? 'text-gray-300' : 'text-gray-600'}`}>{t(`pricing.${tier}.features.${featIdx}`)}</span>
                    </li>
                  ))}
                  {tier !== 'free' && (
                     <li className="flex items-start gap-3">
                      <CheckCircle2 size={18} className={`shrink-0 mt-0.5 ${tier === 'pro' ? 'text-white' : 'text-black'}`} />
                      <span className={`text-sm font-medium ${tier === 'pro' ? 'text-gray-300' : 'text-gray-600'}`}>{t(`pricing.${tier}.features.3`)}</span>
                    </li>
                  )}
                </ul>
                
                <Link 
                  href="/signup" 
                  className={`w-full py-4 rounded-full font-bold text-center transition-colors ${
                    tier === 'pro' 
                      ? 'bg-white text-black hover:bg-gray-200' 
                      : 'bg-gray-100 text-black hover:bg-gray-200'
                  }`}
                >
                  {t(`pricing.${tier}.btn`)}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
