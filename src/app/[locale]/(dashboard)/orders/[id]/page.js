"use client";

import { useState, useEffect, use } from 'react';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import { getOrderById, approveOrder, requestRevision, updateOrder, deleteOrder } from '@/lib/db';
import { ArrowLeft, Check, AlertCircle, FileText, Download, RotateCcw, ThumbsUp, Star, Loader2, Edit, Trash2 } from 'lucide-react';

export default function OrderDetailPage(props) {
  const t = useTranslations('OrderDetail');
  const tDashboard = useTranslations('Dashboard');
  const tOrders = useTranslations('Orders');
  const router = useRouter();
  const params = use(props.params);
  const { id } = params;
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRevisionModal, setShowRevisionModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [revisionNotes, setRevisionNotes] = useState('');
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDelete = async () => {
    setIsDeleting(true);
    await deleteOrder(order.id);
    router.push('/orders');
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const updated = await updateOrder(order.id, editData);
    if (updated) {
      setOrder(updated);
      setShowEditModal(false);
    }
    setIsSubmitting(false);
  };
  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      if (id) {
        const data = await getOrderById(id);
        setOrder(data);
      }
      setLoading(false);
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 size={48} className="text-primary animate-spin mb-4" />
        <p className="text-sm font-medium text-muted">Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] text-muted">
        <AlertCircle size={48} className="text-gray-300 mb-4" />
        <p className="text-sm font-medium">Order not found.</p>
        <Link href="/orders" className="text-primary font-semibold hover:underline mt-2">
          {t('back')}
        </Link>
      </div>
    );
  }

  const handleApprove = async (e) => {
    e.preventDefault();
    const updated = await approveOrder(order.id, rating, feedback);
    if (updated) setOrder(updated);
    setShowApproveModal(false);
  };

  const handleRevisionSubmit = async (e) => {
    e.preventDefault();
    if (!revisionNotes.trim()) return;
    const updated = await requestRevision(order.id, revisionNotes);
    if (updated) setOrder(updated);
    setRevisionNotes('');
    setShowRevisionModal(false);
  };

  const getStatusStep = () => {
    switch (order.status) {
      case 'submitted': return 1;
      case 'in_progress': return 2;
      case 'review': return 3;
      case 'revision': return 2;
      case 'completed': return 4;
      default: return 1;
    }
  };

  const currentStep = getStatusStep();

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <header className="px-8 py-8 w-full flex flex-col gap-4">
        <Link href="/orders" className="text-muted hover:text-foreground text-sm font-semibold flex items-center gap-1.5 self-start">
          <ArrowLeft size={16} />
          {t('back')}
        </Link>
        <div className="flex justify-between items-start gap-4 flex-col sm:flex-row">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-4">{order.title}</h1>
            <div className="text-sm text-muted">
              <span>{t('breadcrumbs').split(' / ')[0]} <span className="mx-1">/</span> </span>
              <span>{t('breadcrumbs').split(' / ')[1]} <span className="mx-1">/</span> </span>
              <span className="font-semibold text-foreground">{order.id}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 mt-2 sm:mt-0">
            <button 
              onClick={() => {
                setEditData(order);
                setShowEditModal(true);
              }}
              className="px-4 py-2 bg-white border border-border rounded-lg text-sm font-semibold text-gray-700 flex items-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <Edit size={16} /> Edit Task
            </button>
            <button 
              onClick={() => setShowDeleteModal(true)}
              className="px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-red-100 transition-colors cursor-pointer"
            >
              <Trash2 size={16} /> Delete
            </button>
          </div>
        </div>
      </header>

      <main className="px-8 pb-12 space-y-8">
        <div className="bg-card p-8 rounded-2xl border border-border shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-2">
            {[
              { step: 1, label: t('timeline.submitted') },
              { step: 2, label: order.status === 'revision' ? tDashboard('status.revision') : t('timeline.in_progress') },
              { step: 3, label: t('timeline.review') },
              { step: 4, label: t('timeline.completed') }
            ].map((s) => {
              const isDone = currentStep >= s.step;
              const isCurrent = currentStep === s.step;
              
              return (
                <div key={s.step} className="flex-1 flex items-center gap-4 group">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all border ${
                      isDone 
                        ? 'bg-primary border-primary text-white' 
                        : 'bg-white border-input text-muted'
                    } ${isCurrent ? 'ring-4 ring-primary/15 scale-110' : ''}`}>
                      {isDone ? <Check size={14} /> : s.step}
                    </div>
                    <span className={`text-sm font-bold whitespace-nowrap ${isDone ? 'text-foreground font-bold' : 'text-muted font-medium'}`}>
                      {s.label}
                    </span>
                  </div>
                  {s.step < 4 && (
                    <div className={`hidden md:block flex-1 h-0.5 mx-4 transition-colors ${
                      currentStep > s.step ? 'bg-primary' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card p-8 rounded-2xl border border-border shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-4">{t('brief')}</h3>
                <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">{order.brief}</p>
              </div>

              {order.keywords && order.keywords.length > 0 && (
                <div className="pt-4 border-t border-border/60">
                  <h4 className="text-xs font-bold text-muted uppercase tracking-wider mb-3">{t('targetKeywords')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {order.keywords.map((kw, i) => (
                      <span key={i} className="px-3 py-1 rounded-lg bg-gray-50 border border-input text-xs font-semibold text-muted">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {(order.status === 'review' || order.status === 'completed') && (
              <div className="bg-card p-8 rounded-2xl border border-border shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-foreground">{t('deliveredContent')}</h3>
                  <button className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline cursor-pointer">
                    <Download size={16} />
                    {t('actions.download')}
                  </button>
                </div>
                <div className="p-6 rounded-xl bg-gray-50/70 border border-input text-sm leading-relaxed text-foreground whitespace-pre-wrap font-mono">
                  {order.deliveredContent || "Loading delivered copy..."}
                </div>
                
                {order.status === 'review' && (
                  <div className="flex items-center gap-4 pt-4">
                    <button 
                      onClick={() => setShowApproveModal(true)}
                      className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm shadow-primary/25 cursor-pointer"
                    >
                      <ThumbsUp size={18} />
                      {t('actions.approve')}
                    </button>
                    <button 
                      onClick={() => setShowRevisionModal(true)}
                      className="bg-white border border-input hover:bg-gray-50 text-foreground px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <RotateCcw size={18} />
                      {t('actions.requestRevision')}
                    </button>
                  </div>
                )}
              </div>
            )}

            {order.status === 'completed' && order.rating > 0 && (
              <div className="bg-card p-8 rounded-2xl border border-border shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-foreground">My Feedback</h3>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star 
                      key={s} 
                      size={20} 
                      className={s <= order.rating ? "text-amber-500 fill-amber-500" : "text-gray-300"} 
                    />
                  ))}
                </div>
                {order.feedback && (
                  <p className="text-sm text-muted bg-gray-50 p-4 rounded-xl border border-input italic">
                    "{order.feedback}"
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-6 border border-border shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-foreground">{t('details')}</h3>
              
              <div className="divide-y divide-border/60 text-sm">
                <div className="py-3 flex justify-between">
                  <span className="text-muted">ID</span>
                  <span className="font-mono font-medium text-foreground">{order.id}</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-muted">{tOrders('table.type')}</span>
                  <span className="font-semibold text-foreground">{tOrders(`types.${order.type}`)}</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-muted">Word Count</span>
                  <span className="font-semibold text-foreground">{order.wordCount} words</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-muted">{tOrders('table.price')}</span>
                  <span className="font-bold text-foreground">${order.price.toFixed(2)}</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-muted">{tOrders('table.deadline')}</span>
                  <span className="font-semibold text-foreground">{order.deadline}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Revision Modal */}
      {showRevisionModal && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card w-full max-w-lg rounded-2xl border border-border shadow-2xl p-6 space-y-6 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-xl font-bold text-foreground">{t('revisionModal.title')}</h3>
            <form onSubmit={handleRevisionSubmit} className="space-y-4">
              <textarea
                required
                rows="5"
                placeholder={t('revisionModal.placeholder')}
                value={revisionNotes}
                onChange={(e) => setRevisionNotes(e.target.value)}
                className="w-full p-4 rounded-xl border border-input focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-white"
              ></textarea>
              <div className="flex items-center gap-3 justify-end">
                <button 
                  type="button" 
                  onClick={() => setShowRevisionModal(false)}
                  className="bg-white border border-input text-foreground hover:bg-gray-50 px-5 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
                >
                  {t('revisionModal.cancel')}
                </button>
                <button 
                  type="submit" 
                  className="bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
                >
                  {t('revisionModal.submit')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Approve Modal */}
      {showApproveModal && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card w-full max-w-lg rounded-2xl border border-border shadow-2xl p-6 space-y-6 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-xl font-bold text-foreground">{t('approveModal.title')}</h3>
            <form onSubmit={handleApprove} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground block">{t('approveModal.rating')}</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      className="p-1 text-gray-300 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star size={28} className={s <= rating ? "text-amber-500 fill-amber-500" : "text-gray-300"} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground block">{t('approveModal.feedback')}</label>
                <textarea
                  rows="3"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full p-4 rounded-xl border border-input focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-white"
                ></textarea>
              </div>
              <div className="flex items-center gap-3 justify-end">
                <button 
                  type="button" 
                  onClick={() => setShowApproveModal(false)}
                  className="bg-white border border-input text-foreground hover:bg-gray-50 px-5 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
                >
                  {t('approveModal.cancel')}
                </button>
                <button 
                  type="submit" 
                  className="bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
                >
                  {t('approveModal.submit')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editData && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card w-full max-w-lg rounded-2xl border border-border shadow-2xl p-6 space-y-6 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-xl font-bold text-foreground">Edit Task</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground block">Task Title</label>
                <input
                  required
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData({...editData, title: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-input focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground block">Type</label>
                  <select
                    value={editData.type}
                    onChange={(e) => setEditData({...editData, type: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-input focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-white"
                  >
                    <option value="design">Design</option>
                    <option value="development">Development</option>
                    <option value="content">Content</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground block">Priority</label>
                  <select
                    value={editData.priority}
                    onChange={(e) => setEditData({...editData, priority: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-input focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-white"
                  >
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground block">Target Deadline</label>
                <input
                  type="date"
                  required
                  value={editData.deadline}
                  onChange={(e) => setEditData({...editData, deadline: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-input focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground block">Brief / Description</label>
                <textarea
                  rows="3"
                  value={editData.brief}
                  onChange={(e) => setEditData({...editData, brief: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-input focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-white"
                ></textarea>
              </div>
              <div className="flex items-center gap-3 justify-end pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowEditModal(false)}
                  className="bg-white border border-input text-foreground hover:bg-gray-50 px-5 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : null}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card w-full max-w-sm rounded-2xl border border-border shadow-2xl p-6 text-center animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={24} className="text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Delete Task?</h3>
            <p className="text-sm text-muted mb-6">
              Are you sure you want to delete <span className="font-semibold text-foreground">{order.title}</span>? This action cannot be undone.
            </p>
            <div className="flex items-center gap-3 justify-center">
              <button 
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="bg-white border border-input text-foreground hover:bg-gray-50 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer flex-1"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                disabled={isDeleting}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 flex-1 shadow-sm shadow-red-500/20"
              >
                {isDeleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
