"use client";

import { useState, useEffect } from 'react';
import { User, Mail, Building, MapPin, Clock, DollarSign, Globe, FileCheck, ChevronRight, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function SettingsPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    address: '',
    country: '',
    state: '',
    postalCode: ''
  });

  const [settings, setSettings] = useState({
    paymentReminders: true,
    lateFees: false,
    currency: 'USD ($)',
    invoiceAttachments: true
  });

  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profileData } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      const { data: settingsData } = await supabase.from('settings').select('*').eq('user_id', user.id).single();

      if (profileData) {
        const names = (profileData.name || '').split(' ');
        setProfile({
          firstName: names[0] || '',
          lastName: names.slice(1).join(' ') || '',
          company: profileData.company || '',
          email: profileData.email || user.email || '',
          phone: profileData.phone || '',
          address: profileData.address || '',
          country: profileData.country || '',
          state: profileData.state || '',
          postalCode: profileData.postal_code || ''
        });
      } else {
        setProfile(p => ({ ...p, email: user.email || '' }));
      }

      if (settingsData) {
        setSettings({
          paymentReminders: settingsData.payment_reminders ?? true,
          lateFees: settingsData.late_fees ?? false,
          currency: settingsData.currency || 'USD ($)',
          invoiceAttachments: settingsData.invoice_attachments ?? true
        });
      }
      setLoading(false);
    };

    fetchUserData();
  }, [supabase]);

  const handleProfileChange = (key, value) => setProfile(prev => ({ ...prev, [key]: value }));
  
  const handleSettingsToggle = async (key) => {
    const newValue = !settings[key];
    setSettings(prev => ({ ...prev, [key]: newValue }));
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    
    const dbKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
    await supabase.from('settings').update({ [dbKey]: newValue }).eq('user_id', user.id);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!isEditing) return;
    
    setIsSaving(true);
    setSaveError(null);
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const fullName = `${profile.firstName} ${profile.lastName}`.trim();

    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      name: fullName,
      company: profile.company,
      email: profile.email,
      phone: profile.phone,
      address: profile.address,
      country: profile.country,
      state: profile.state,
      postal_code: profile.postalCode,
      updated_at: new Date().toISOString()
    });

    setIsSaving(false);
    if (error) {
      console.error("Error saving profile:", error);
      setSaveError(error.message);
    } else {
      setIsSaved(true);
      setIsEditing(false);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-full w-full"><Loader2 className="animate-spin text-primary" size={32} /></div>;
  }

  return (
    <div className="flex flex-col h-full w-full bg-background -m-8 px-8 py-6 overflow-x-hidden">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[1.75rem] font-bold text-foreground">Settings</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-border">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold mb-1 text-gray-900">Profile information</h2>
              <p className="text-[0.85rem] text-gray-500 font-medium">Configure your personal details and company account profile.</p>
            </div>
            {!isEditing && (
              <button 
                type="button" 
                onClick={(e) => { e.preventDefault(); setIsEditing(true); }} 
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Edit Profile
              </button>
            )}
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[0.85rem] text-gray-600 font-medium block">First name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-gray-400">
                    <User size={16} strokeWidth={2.5} />
                  </div>
                  <input disabled={!isEditing} 
                    type="text" 
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border focus:outline-none focus:border-primary text-sm font-medium text-gray-900 disabled:bg-gray-50 disabled:text-gray-500" 
                    value={profile.firstName} 
                    onChange={(e) => handleProfileChange('firstName', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[0.85rem] text-gray-600 font-medium block">Last name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-gray-400">
                    <User size={16} strokeWidth={2.5} />
                  </div>
                  <input disabled={!isEditing} 
                    type="text" 
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border focus:outline-none focus:border-primary text-sm font-medium text-gray-900 disabled:bg-gray-50 disabled:text-gray-500" 
                    value={profile.lastName} 
                    onChange={(e) => handleProfileChange('lastName', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[0.85rem] text-gray-600 font-medium block">Company name</label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-gray-400">
                  <Building size={16} strokeWidth={2.5} />
                </div>
                <input disabled={!isEditing} 
                  type="text" 
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border focus:outline-none focus:border-primary text-sm font-medium text-gray-900 disabled:bg-gray-50 disabled:text-gray-500" 
                  value={profile.company} 
                  onChange={(e) => handleProfileChange('company', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[0.85rem] text-gray-600 font-medium block">Email address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-gray-400">
                    <Mail size={16} strokeWidth={2.5} />
                  </div>
                  <input disabled={!isEditing} 
                    type="email" 
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border focus:outline-none focus:border-primary text-sm font-medium text-gray-900 disabled:bg-gray-50 disabled:text-gray-500" 
                    value={profile.email} 
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[0.85rem] text-gray-600 font-medium block">Mobile phone</label>
                <input disabled={!isEditing} 
                  type="text" 
                  className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:border-primary text-sm font-medium text-gray-900 disabled:bg-gray-50 disabled:text-gray-500" 
                  value={profile.phone} 
                  onChange={(e) => handleProfileChange('phone', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[0.85rem] text-gray-600 font-medium block">Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-gray-400">
                  <MapPin size={16} strokeWidth={2.5} />
                </div>
                <input disabled={!isEditing} 
                  type="text" 
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border focus:outline-none focus:border-primary text-sm font-medium text-gray-900 disabled:bg-gray-50 disabled:text-gray-500" 
                  value={profile.address} 
                  onChange={(e) => handleProfileChange('address', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[0.85rem] text-gray-600 font-medium block">Country</label>
                <input disabled={!isEditing} 
                  type="text" 
                  className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:border-primary text-sm font-medium text-gray-900 disabled:bg-gray-50 disabled:text-gray-500" 
                  value={profile.country} 
                  onChange={(e) => handleProfileChange('country', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[0.85rem] text-gray-600 font-medium block">State</label>
                <input disabled={!isEditing} 
                  type="text" 
                  className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:border-primary text-sm font-medium text-gray-900 disabled:bg-gray-50 disabled:text-gray-500" 
                  value={profile.state} 
                  onChange={(e) => handleProfileChange('state', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[0.85rem] text-gray-600 font-medium block">Postal code</label>
                <input disabled={!isEditing} 
                  type="text" 
                  className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:border-primary text-sm font-medium text-gray-900 disabled:bg-gray-50 disabled:text-gray-500" 
                  value={profile.postalCode} 
                  onChange={(e) => handleProfileChange('postalCode', e.target.value)}
                />
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button disabled={!isEditing || isSaving} type="submit" className="bg-primary hover:bg-[#0689db] disabled:hover:bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                {isSaving && <Loader2 size={16} className="animate-spin" />}
                {isSaving ? 'Saving...' : 'Save profile'}
              </button>
              {isSaved && (
                <span className="text-green-600 text-sm font-semibold">✓ Saved successfully!</span>
              )}
              {saveError && (
                <span className="text-red-600 text-sm font-semibold">Error: {saveError}</span>
              )}
            </div>
          </form>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-8 border border-border">
            <h3 className="text-lg font-bold mb-6 text-gray-900">App settings</h3>
            
            <div className="space-y-4">
              
              <div 
                onClick={() => handleSettingsToggle('paymentReminders')}
                className="flex items-center justify-between p-4 rounded-xl border border-border bg-white cursor-pointer hover:border-gray-400 transition-colors select-none"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-50 border border-border text-gray-500">
                    <Clock size={18} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Payment reminders</h4>
                    <p className="text-[0.75rem] text-gray-500 font-medium mt-0.5">Send automated emails</p>
                  </div>
                </div>
                <div className={`flex items-center text-sm font-bold gap-1 ${settings.paymentReminders ? 'text-primary' : 'text-gray-500'}`}>
                  {settings.paymentReminders ? 'ON' : 'OFF'}
                </div>
              </div>

              <div 
                onClick={() => handleSettingsToggle('lateFees')}
                className="flex items-center justify-between p-4 rounded-xl border border-border bg-white cursor-pointer hover:border-gray-400 transition-colors select-none"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-50 border border-border text-gray-500">
                    <DollarSign size={18} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Late fees</h4>
                    <p className="text-[0.75rem] text-gray-500 font-medium mt-0.5">Apply automatic fees</p>
                  </div>
                </div>
                <div className={`flex items-center text-sm font-bold gap-1 ${settings.lateFees ? 'text-primary' : 'text-gray-500'}`}>
                  {settings.lateFees ? 'ON' : 'OFF'}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-white cursor-pointer hover:border-gray-400 transition-colors select-none">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-50 border border-border text-gray-500">
                    <Globe size={18} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Currency</h4>
                    <p className="text-[0.75rem] text-gray-500 font-medium mt-0.5">Default billing currency</p>
                  </div>
                </div>
                <div className="flex items-center text-sm font-bold gap-1 text-gray-900">
                  {settings.currency}
                </div>
              </div>

              <div 
                onClick={() => handleSettingsToggle('invoiceAttachments')}
                className="flex items-center justify-between p-4 rounded-xl border border-border bg-white cursor-pointer hover:border-gray-400 transition-colors select-none"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-50 border border-border text-gray-500">
                    <FileCheck size={18} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Attachments</h4>
                    <p className="text-[0.75rem] text-gray-500 font-medium mt-0.5">Include PDF with emails</p>
                  </div>
                </div>
                <div className={`flex items-center text-sm font-bold gap-1 ${settings.invoiceAttachments ? 'text-primary' : 'text-gray-500'}`}>
                  {settings.invoiceAttachments ? 'ON' : 'OFF'}
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
