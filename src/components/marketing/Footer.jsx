"use client";

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Hexagon } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('Landing');

  return (
    <footer className="w-full bg-white border-t border-gray-100 pt-20 pb-10 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8 mb-16 text-start">
          
          {/* Brand */}
          <div className="md:col-span-1 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
                <Hexagon size={16} fill="currentColor" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-black">ContentOps.ai</span>
            </div>
            <p className="text-gray-500 font-medium text-sm pr-4">
              {t('footer.desc')}
            </p>
          </div>

          {/* Links Group 1 */}
          <div className="space-y-6">
            <h4 className="font-bold text-black">{t('footer.product')}</h4>
            <ul className="space-y-4">
              <li><Link href="/#product" className="text-gray-500 hover:text-black font-medium text-sm transition-colors">{t('footer.features')}</Link></li>
              <li><a href="#" className="text-gray-500 hover:text-black font-medium text-sm transition-colors">{t('footer.integrations')}</a></li>
              <li><Link href="/#pricing" className="text-gray-500 hover:text-black font-medium text-sm transition-colors">{t('footer.pricing')}</Link></li>
            </ul>
          </div>

          {/* Links Group 2 */}
          <div className="space-y-6">
            <h4 className="font-bold text-black">{t('footer.resources')}</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-500 hover:text-black font-medium text-sm transition-colors">{t('footer.help')}</a></li>
              <li><a href="#" className="text-gray-500 hover:text-black font-medium text-sm transition-colors">{t('footer.api')}</a></li>
              <li><a href="#" className="text-gray-500 hover:text-black font-medium text-sm transition-colors">{t('footer.blog')}</a></li>
            </ul>
          </div>

          {/* Links Group 3 */}
          <div className="space-y-6">
            <h4 className="font-bold text-black">{t('footer.company')}</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-gray-500 hover:text-black font-medium text-sm transition-colors">{t('footer.about')}</Link></li>
              <li><Link href="/careers" className="text-gray-500 hover:text-black font-medium text-sm transition-colors">{t('footer.careers')}</Link></li>
              <li><Link href="/contact" className="text-gray-500 hover:text-black font-medium text-sm transition-colors">{t('footer.contact')}</Link></li>
            </ul>
          </div>
          
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 font-medium text-sm">
            {t('footer.copyright')}
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-gray-600 font-medium text-sm transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="text-gray-400 hover:text-gray-600 font-medium text-sm transition-colors">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
