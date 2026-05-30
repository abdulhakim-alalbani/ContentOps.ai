"use client";

import { Download, Filter, TrendingUp, TrendingDown, DollarSign, Users, Target } from 'lucide-react';

export default function ReportsPage() {
  return (
    <div className="flex flex-col h-full w-full bg-background -m-8 px-8 py-6 overflow-x-hidden custom-scrollbar">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[1.75rem] font-bold text-foreground">Analytics & Reports</h1>
          <p className="text-sm text-gray-500 mt-1">Overview of your business performance</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-border rounded-lg text-sm font-semibold text-gray-700 flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm">
            <Filter size={16} /> Last 30 Days
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-primary-hover transition-colors shadow-sm">
            <Download size={16} /> Export PDF
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Revenue", value: "$45,231.89", trend: "+20.1%", isUp: true, icon: DollarSign, color: "text-green-500", bg: "bg-green-50" },
          { title: "Active Projects", value: "32", trend: "+12.5%", isUp: true, icon: Target, color: "text-blue-500", bg: "bg-blue-50" },
          { title: "Client Retention", value: "98.5%", trend: "+2.4%", isUp: true, icon: Users, color: "text-purple-500", bg: "bg-purple-50" },
          { title: "Avg. Turnaround", value: "4.2 days", trend: "-0.8%", isUp: false, icon: TrendingDown, color: "text-amber-500", bg: "bg-amber-50" }
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-gray-500">{kpi.title}</span>
              <div className={`w-8 h-8 rounded-full ${kpi.bg} ${kpi.color} flex items-center justify-center`}>
                <kpi.icon size={16} />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</h3>
              <div className="flex items-center gap-1 text-sm font-semibold">
                {kpi.isUp ? <TrendingUp size={14} className="text-green-500" /> : <TrendingDown size={14} className="text-amber-500" />}
                <span className={kpi.isUp ? 'text-green-500' : 'text-amber-500'}>{kpi.trend}</span>
                <span className="text-gray-400 font-medium ml-1">vs last month</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-border shadow-sm">
          <h3 className="font-bold text-gray-900 mb-6">Revenue Overview</h3>
          <div className="h-[300px] flex items-end gap-2 pt-4 relative">
            {/* Y-Axis */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] font-bold text-gray-400 pb-6">
              <span>$50k</span>
              <span>$40k</span>
              <span>$30k</span>
              <span>$20k</span>
              <span>$10k</span>
              <span>$0</span>
            </div>
            {/* Bars */}
            <div className="ml-10 flex-1 flex items-end justify-between h-full pb-6 border-b border-border">
              {[45, 65, 30, 85, 55, 90, 75, 40, 100, 80].map((val, i) => (
                <div key={i} className="w-[8%] bg-primary/20 hover:bg-primary rounded-t-sm transition-colors relative group" style={{ height: `${val}%` }}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-[10px] font-bold py-1 px-2 rounded whitespace-nowrap z-10 pointer-events-none">
                    ${val}k
                  </div>
                </div>
              ))}
            </div>
            {/* X-Axis */}
            <div className="absolute left-10 right-0 bottom-0 flex justify-between text-[10px] font-bold text-gray-400">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'].map(m => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Donut Chart Mock */}
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col">
          <h3 className="font-bold text-gray-900 mb-6">Revenue by Service</h3>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-48 h-48 rounded-full border-[16px] border-primary/20 relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-[16px] border-primary" style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%, 0 100%, 0 50%)' }}></div>
              <div className="absolute inset-0 rounded-full border-[16px] border-indigo-500" style={{ clipPath: 'polygon(50% 50%, 0 50%, 0 0, 50% 0)' }}></div>
              <div className="absolute inset-0 rounded-full border-[16px] border-teal-400" style={{ clipPath: 'polygon(50% 50%, 50% 0, 100% 0)' }}></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">100%</div>
                <div className="text-[10px] font-semibold text-gray-500">Total Mix</div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 font-semibold text-gray-600"><span className="w-3 h-3 rounded-full bg-primary"></span> Web Design</div>
              <span className="font-bold text-gray-900">45%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 font-semibold text-gray-600"><span className="w-3 h-3 rounded-full bg-indigo-500"></span> App Dev</div>
              <span className="font-bold text-gray-900">30%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 font-semibold text-gray-600"><span className="w-3 h-3 rounded-full bg-teal-400"></span> Marketing</div>
              <span className="font-bold text-gray-900">25%</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
