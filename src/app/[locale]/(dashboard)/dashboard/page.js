"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import { FileText, TrendingUp, DollarSign, Activity, ChevronRight, Eye, Loader2 } from 'lucide-react';
import { getOrders } from '@/lib/db';

export default function DashboardOverviewPage() {
  const t = useTranslations('Dashboard');
  const tOrders = useTranslations('Orders');
  const router = useRouter();
  const [recentOrders, setRecentOrders] = useState([]);
  const [stats, setStats] = useState({ total: 0, inProgress: 0, review: 0, completed: 0, submitted: 0, totalSpend: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecent = async () => {
      setLoading(true);
      const data = await getOrders();
      
      const total = data.length;
      const inProgress = data.filter(o => o.status === 'in_progress' || o.status === 'revision').length;
      const review = data.filter(o => o.status === 'review').length;
      const completed = data.filter(o => o.status === 'completed').length;
      const submitted = data.filter(o => o.status === 'submitted').length;
      const totalSpend = data.reduce((acc, curr) => acc + (parseFloat(curr.price) || 0), 0);

      setStats({ total, inProgress, review, completed, submitted, totalSpend });

      // Show only top 4 recent orders
      setRecentOrders(data.slice(0, 4));
      setLoading(false);
    };
    fetchRecent();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'review': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'in_progress': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'submitted': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <header className="px-8 py-8 w-full">
        <h1 className="text-3xl font-bold text-[#111] mb-2">{t('title')}</h1>
        <p className="text-sm text-muted">{t('breadcrumbs')}</p>
      </header>

      <main className="px-8 pb-12 space-y-8">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: t('stats.totalOrders'), value: stats.total.toString(), icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50' },
            { label: t('stats.inProgress'), value: stats.inProgress.toString(), icon: Activity, color: 'text-amber-500', bg: 'bg-amber-50' },
            { label: t('stats.pendingReview'), value: stats.review.toString(), icon: Eye, color: 'text-purple-500', bg: 'bg-purple-50' },
            { label: t('stats.totalSpend'), value: `$${stats.totalSpend.toLocaleString()}`, icon: DollarSign, color: 'text-green-500', bg: 'bg-green-50' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-border flex items-center justify-between transition-shadow">
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-1">{stat.label}</p>
                <h3 className="text-3xl font-bold text-[#111]">{stat.value}</h3>
              </div>
              <div className={`w-12 h-12 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center`}>
                <stat.icon size={24} />
              </div>
            </div>
          ))}
        </div>

        {/* Task Distribution Section */}
        <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-[#111]">{t('charts.distribution')}</h2>
            <div className="px-3 py-1.5 bg-gray-100 rounded-lg text-xs font-bold text-gray-600 tracking-wider uppercase">
              {stats.total} {t('stats.totalOrders')}
            </div>
          </div>
          
          {stats.total > 0 ? (
            <div className="space-y-8 animate-in fade-in duration-500">
              {/* Stacked Bar */}
              <div className="w-full h-5 rounded-full overflow-hidden flex bg-gray-100 shadow-inner">
                <div style={{ width: `${(stats.completed / stats.total) * 100}%` }} className="h-full bg-teal-500 transition-all duration-700 hover:opacity-90"></div>
                <div style={{ width: `${(stats.review / stats.total) * 100}%` }} className="h-full bg-amber-400 transition-all duration-700 hover:opacity-90"></div>
                <div style={{ width: `${(stats.inProgress / stats.total) * 100}%` }} className="h-full bg-orange-500 transition-all duration-700 hover:opacity-90"></div>
                <div style={{ width: `${(stats.submitted / stats.total) * 100}%` }} className="h-full bg-indigo-500 transition-all duration-700 hover:opacity-90"></div>
              </div>

              {/* Legends */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Completed */}
                <div className="p-4 rounded-xl border border-border bg-gray-50 flex flex-col gap-1 hover:border-teal-200 hover:bg-teal-50/30 transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-teal-500 shadow-sm shadow-teal-500/50"></div>
                    <span className="text-sm font-bold text-gray-600">{t('stats.completed')}</span>
                  </div>
                  <div className="flex items-end gap-2 mt-2">
                    <span className="text-3xl font-black text-[#111]">{stats.completed}</span>
                    <span className="text-sm font-bold text-gray-400 mb-1">{Math.round((stats.completed/stats.total)*100)}%</span>
                  </div>
                </div>
                {/* In Review */}
                <div className="p-4 rounded-xl border border-border bg-gray-50 flex flex-col gap-1 hover:border-amber-200 hover:bg-amber-50/30 transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50"></div>
                    <span className="text-sm font-bold text-gray-600">{t('stats.pendingReview')}</span>
                  </div>
                  <div className="flex items-end gap-2 mt-2">
                    <span className="text-3xl font-black text-[#111]">{stats.review}</span>
                    <span className="text-sm font-bold text-gray-400 mb-1">{Math.round((stats.review/stats.total)*100)}%</span>
                  </div>
                </div>
                {/* In Progress */}
                <div className="p-4 rounded-xl border border-border bg-gray-50 flex flex-col gap-1 hover:border-orange-200 hover:bg-orange-50/30 transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500 shadow-sm shadow-orange-500/50"></div>
                    <span className="text-sm font-bold text-gray-600">{t('stats.inProgress')}</span>
                  </div>
                  <div className="flex items-end gap-2 mt-2">
                    <span className="text-3xl font-black text-[#111]">{stats.inProgress}</span>
                    <span className="text-sm font-bold text-gray-400 mb-1">{Math.round((stats.inProgress/stats.total)*100)}%</span>
                  </div>
                </div>
                {/* To Do (Submitted) */}
                <div className="p-4 rounded-xl border border-border bg-gray-50 flex flex-col gap-1 hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-indigo-500 shadow-sm shadow-indigo-500/50"></div>
                    <span className="text-sm font-bold text-gray-600">{t('status.submitted')}</span>
                  </div>
                  <div className="flex items-end gap-2 mt-2">
                    <span className="text-3xl font-black text-[#111]">{stats.submitted}</span>
                    <span className="text-sm font-bold text-gray-400 mb-1">{Math.round((stats.submitted/stats.total)*100)}%</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500 text-sm font-semibold bg-gray-50 rounded-xl border border-dashed border-border">
              {t('table.noTasks')}
            </div>
          )}
        </div>

        {/* Recent Orders Section */}
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="px-8 py-6 flex items-center justify-between border-b border-border">
            <h2 className="text-xl font-bold text-[#111]">{t('recentOrders')}</h2>
            <Link href="/orders" className="text-sm font-bold text-[#f93a20] hover:underline flex items-center gap-1">
              {t('viewAll')}
              <ChevronRight size={16} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white">
                  <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">{t('table.taskName')}</th>
                  <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">{t('table.status')}</th>
                  <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">{t('table.assignedTo')}</th>
                  <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">{t('table.deadline')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="px-8 py-12 text-center text-gray-500">
                      <div className="flex justify-center mb-2"><Loader2 className="animate-spin text-primary" size={24} /></div>
                      {t('table.loading')}
                    </td>
                  </tr>
                ) : recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-8 py-12 text-center text-gray-500">{t('table.noTasks')}</td>
                  </tr>
                ) : (
                  recentOrders.map((order) => (
                    <tr 
                      key={order.id} 
                      className="hover:bg-gray-50/50 transition-colors group cursor-pointer"
                      onClick={() => router.push(`/orders/${order.id}`)}
                    >
                      <td className="px-8 py-5">
                        <p className="text-sm font-bold text-[#111] group-hover:text-primary transition-colors">{order.title}</p>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                          {t(`status.${order.status}`)}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex -space-x-2">
                          {/* Use mock avatars if assignedTo is missing from DB */}
                          {(order.assignedTo || [11, 12]).map((imgId, i) => (
                            <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-200 overflow-hidden relative z-[3] hover:z-10 transition-transform hover:scale-110">
                              <img src={`https://i.pravatar.cc/150?img=${imgId}`} alt="Avatar" className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <span className="text-sm font-semibold text-gray-500">{order.deadline || order.created_at}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
