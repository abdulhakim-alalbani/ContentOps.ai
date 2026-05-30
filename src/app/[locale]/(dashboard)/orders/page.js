"use client";

import { useState, useEffect } from 'react';
import { Share2, Plus, List, KanbanSquare, Calendar, User, LayoutGrid, Search, Filter, Paperclip, MessageSquare, MoreVertical, Flag, Loader2 } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { getOrders, createNewOrder } from '@/lib/db';
import { useTranslations } from 'next-intl';

const defaultColumns = [
  { id: 'todo', title: 'To do', color: 'bg-indigo-500', statusKeys: ['submitted'] },
  { id: 'progress', title: 'In progress', color: 'bg-orange-500', statusKeys: ['in_progress', 'revision'] },
  { id: 'review', title: 'In review', color: 'bg-amber-400', statusKeys: ['review'] },
  { id: 'completed', title: 'Completed', color: 'bg-teal-500', statusKeys: ['completed'] }
];

export default function MyTasksPage() {
  const t = useTranslations('MyTasks');
  const tOrders = useTranslations('Orders');
  const tDashboard = useTranslations('Dashboard');
  const tNewOrder = useTranslations('NewOrder');
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [newTaskData, setNewTaskData] = useState({ title: '', brief: '', type: 'design', priority: 'normal', deadline: '', assignedTo: [] });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('board');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchOrders = async () => {
      setLoading(true);
      const data = await getOrders();
      setOrders(data);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTaskData.title.trim()) return;
    setIsSubmitting(true);
    const order = await createNewOrder(newTaskData);
    if (order) {
      setOrders([order, ...orders]);
      setShowNewTaskModal(false);
      setNewTaskData({ title: '', brief: '', type: 'design', priority: 'normal', deadline: '', assignedTo: [] });
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 4000);
    }
    setIsSubmitting(false);
  };

  // Build columns dynamically based on orders
  const columns = defaultColumns.map(col => {
    const colOrders = orders.filter(o => col.statusKeys.includes(o.status));
    
    // Map column ID to translation key
    let titleKey = 'todo';
    if (col.id === 'progress') titleKey = 'inProgress';
    if (col.id === 'review') titleKey = 'inReview';
    if (col.id === 'completed') titleKey = 'completed';

    return {
      ...col,
      title: t(`columns.${titleKey}`),
      count: colOrders.length,
      tasks: colOrders.map(o => ({
        id: o.id,
        status: tDashboard(`status.${o.status}`),
        statusColor: col.id === 'todo' ? 'text-indigo-500' : col.id === 'progress' ? 'text-orange-500' : col.id === 'review' ? 'text-amber-500' : 'text-teal-500',
        priority: tNewOrder(`priorities.${o.priority || 'normal'}`),
        priorityColor: o.priority === 'high' ? 'text-fuchsia-500' : 'text-amber-500',
        title: o.title,
        desc: o.brief ? o.brief.substring(0, 50) + '...' : 'No description provided.',
        avatars: [], // Removed mock avatars
        comments: 0,
        files: 0
      }))
    };
  });

  // Filter columns based on search
  const filteredColumns = columns.map(col => ({
    ...col,
    tasks: col.tasks.filter(task => 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      task.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.status.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }));

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full w-full bg-background -m-8 px-8 py-6 rounded-tl-xl overflow-x-hidden">
      
      {/* Header Section */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-[1.75rem] font-bold text-foreground">{t('title')}</h1>
          <p className="text-sm text-gray-500 mt-1">{t('subtitle')}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-border rounded-lg text-sm font-semibold text-gray-700 flex items-center gap-2 hover:bg-gray-50 transition-colors">
            <Share2 size={16} /> {t('shareTasks')}
          </button>
          <button 
            onClick={() => setShowNewTaskModal(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-primary-hover transition-colors"
          >
            <Plus size={16} /> {t('newTask')}
          </button>
        </div>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-700 animate-in fade-in slide-in-from-top-4">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
          </div>
          <div>
            <h4 className="font-bold text-sm">Task created successfully!</h4>
            <p className="text-xs font-medium opacity-80">Your new task has been added to the board.</p>
          </div>
        </div>
      )}

      {/* Main Tabs */}
      <div className="flex items-center gap-6 border-b border-border mb-4 pt-2">
        {['overview', 'lists', 'board', 'calendar', 'assigned'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-2 pb-3 text-sm transition-colors cursor-pointer ${
              activeTab === tab 
                ? 'font-bold text-foreground border-b-2 border-foreground' 
                : 'font-semibold text-gray-500 hover:text-gray-800'
            }`}
          >
            {tab === 'overview' && <LayoutGrid size={16} />}
            {tab === 'lists' && <List size={16} />}
            {tab === 'board' && <KanbanSquare size={16} />}
            {tab === 'calendar' && <Calendar size={16} />}
            {tab === 'assigned' && <User size={16} />}
            {t(`tabs.${tab}`)}
          </button>
        ))}
      </div>

      {/* Sub Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button className="px-3 py-1.5 bg-gray-100 rounded-lg text-[0.85rem] font-semibold text-gray-700 flex items-center gap-2 hover:bg-gray-200 transition-colors border border-gray-200/50">
            <LayoutGrid size={14} /> {t('filters.groupStatus')}
          </button>
          <button className="px-3 py-1.5 bg-gray-100 rounded-lg text-[0.85rem] font-semibold text-gray-700 flex items-center gap-2 hover:bg-gray-200 transition-colors border border-gray-200/50">
            <KanbanSquare size={14} /> {t('filters.columns')}
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={14} className="text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder={t('filters.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-1.5 bg-white border border-border rounded-lg text-[0.85rem] font-medium focus:outline-none focus:border-gray-400 w-[200px]"
            />
          </div>
          <button className="px-3 py-1.5 bg-white border border-border rounded-lg text-[0.85rem] font-medium text-gray-600 flex items-center gap-2 hover:bg-gray-50 transition-colors">
            {t('filters.allProject')} <ChevronDown size={14} />
          </button>
          <button className="p-1.5 bg-gray-100 border border-gray-200/50 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors">
            <Filter size={16} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center pt-20">
          <Loader2 size={48} className="text-primary animate-spin mb-4" />
        </div>
      ) : activeTab === 'board' ? (
        /* Kanban Board */
        <div className="flex-1 flex gap-6 overflow-x-auto pb-4 custom-scrollbar items-start">
          {filteredColumns.map((col) => (
            <div key={col.id} className="w-[320px] min-w-[320px] flex flex-col gap-4">
              
              {/* Column Header */}
              <div className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-border">
                <div className="flex items-center gap-2">
                  <div className={`w-3.5 h-3.5 rounded-full border-[3px] border-white ring-1 ring-border ${col.color}`}></div>
                  <h3 className="font-bold text-gray-800">{col.title} <span className="ml-1 text-primary bg-primary/10 px-1.5 py-0.5 rounded text-xs">{col.count}</span></h3>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <button className="p-1 hover:bg-gray-100 rounded-md"><Plus size={16} /></button>
                  <button className="p-1 hover:bg-gray-100 rounded-md"><MoreVertical size={16} /></button>
                </div>
              </div>

              {/* Tasks */}
              <div className="flex flex-col gap-4">
                {col.tasks.map((task) => (
                  <Link 
                    href={`/orders/${task.id}`}
                    key={task.id} 
                    className="bg-white p-5 rounded-2xl border border-border transition-shadow group cursor-pointer hover:border-gray-400 block"
                  >
                    
                    {/* Tags */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-gray-50 text-[10px] font-bold tracking-wide uppercase ${task.statusColor}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {task.status}
                      </span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded bg-gray-50 text-[10px] font-bold tracking-wide uppercase ${task.priorityColor}`}>
                        <Flag size={10} className="fill-current" />
                        {task.priority}
                      </span>
                    </div>

                    {/* Content */}
                    <h4 className="text-[0.95rem] font-bold text-gray-800 mb-1 leading-snug">{task.title}</h4>
                    <p className="text-xs font-medium text-gray-500 mb-5">{task.desc}</p>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      {/* Avatars */}
                      <div className="flex -space-x-2">
                        {task.avatars.map((imgId, i) => (
                          <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-gray-200 overflow-hidden relative z-[3] hover:z-10 transition-transform hover:scale-110">
                            <img src={`https://i.pravatar.cc/150?img=${imgId}`} alt="User Avatar" className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-3 text-gray-400 text-xs font-semibold">
                        <div className="flex items-center gap-1 hover:text-gray-600 transition-colors">
                          <Paperclip size={14} />
                          <span>{task.files}</span>
                        </div>
                        <div className="flex items-center gap-1 hover:text-gray-600 transition-colors">
                          <MessageSquare size={14} />
                          <span>{task.comments}</span>
                        </div>
                      </div>
                    </div>

                  </Link>
                ))}
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-400 py-20">
           <LayoutGrid size={48} className="mb-4 opacity-50" />
           <p className="text-sm font-semibold">{t('underDevelopment')}</p>
        </div>
      )}

      {/* New Task Modal */}
      {showNewTaskModal && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card w-full max-w-lg rounded-2xl border border-border shadow-2xl p-6 space-y-6 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-xl font-bold text-foreground">{t('modal.title')}</h3>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground block">{t('modal.taskTitle')}</label>
                <input
                  required
                  type="text"
                  value={newTaskData.title}
                  onChange={(e) => setNewTaskData({...newTaskData, title: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-input focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-white"
                  placeholder={t('modal.taskTitlePlaceholder')}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground block">{t('modal.type')}</label>
                  <select
                    value={newTaskData.type}
                    onChange={(e) => setNewTaskData({...newTaskData, type: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-input focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-white"
                  >
                    <option value="design">{tOrders('types.design') || 'Design'}</option>
                    <option value="development">{tOrders('types.development') || 'Development'}</option>
                    <option value="content">{tOrders('types.content') || 'Content'}</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground block">{t('modal.priority')}</label>
                  <select
                    value={newTaskData.priority}
                    onChange={(e) => setNewTaskData({...newTaskData, priority: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-input focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-white"
                  >
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground block">{t('modal.assignee')}</label>
                  <select
                    value={newTaskData.assignedTo.length > 0 ? newTaskData.assignedTo[0] : ''}
                    onChange={(e) => setNewTaskData({...newTaskData, assignedTo: e.target.value ? [parseInt(e.target.value)] : []})}
                    className="w-full px-4 py-2.5 rounded-xl border border-input focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-white"
                  >
                    <option value="">{t('modal.unassigned')}</option>
                    <option value="11">Eleanor Pena</option>
                    <option value="12">Dev Team</option>
                    <option value="13">Marvin Black</option>
                    <option value="14">Esther Miles</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground block">{t('modal.deadline')}</label>
                  <input
                    type="date"
                    required
                    value={newTaskData.deadline}
                    onChange={(e) => setNewTaskData({...newTaskData, deadline: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-input focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-white text-gray-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground block">{t('modal.attachments')}</label>
                  <div className="relative border-2 border-dashed border-border rounded-xl px-4 py-2.5 hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-center gap-2 overflow-hidden bg-white">
                    <Paperclip size={16} className="text-gray-400 shrink-0" />
                    <span className="text-sm text-gray-500 font-medium truncate">{t('modal.upload')}</span>
                    <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" multiple />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground block">{t('modal.description')}</label>
                <textarea
                  rows="3"
                  value={newTaskData.brief}
                  onChange={(e) => setNewTaskData({...newTaskData, brief: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-input focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-white"
                  placeholder={t('modal.descriptionPlaceholder')}
                ></textarea>
              </div>
              <div className="flex items-center gap-3 justify-end pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowNewTaskModal(false)}
                  className="bg-white border border-input text-foreground hover:bg-gray-50 px-5 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
                >
                  {t('modal.cancel')}
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : null}
                  {t('modal.create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

function ChevronDown({ className, size }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m6 9 6 6 6-6"/>
    </svg>
  );
}
