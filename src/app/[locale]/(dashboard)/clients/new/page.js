import { useTranslations } from 'next-intl';
import { Clock, CircleDollarSign, Languages, FileText, ChevronRight, User, Mail, MapPin } from 'lucide-react';

export default function NewClientPage() {
  const t = useTranslations('Client');

  return (
    <main className="px-10 py-8 bg-[#fafafa] min-h-screen w-full font-sans text-[#111]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Clients</h1>
        <div className="text-sm text-gray-500">
          Clients / <span className="font-semibold text-black">New Client</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Main Form Area */}
        <div className="xl:col-span-2 bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
          <h2 className="text-[1.35rem] font-bold mb-1.5 text-black">Welcome To The New Client Page</h2>
          <p className="text-[0.9rem] text-gray-500 mb-10">Enter First and Last Name or Company Name is Required To Save This Client.</p>

          <form className="space-y-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[0.85rem] text-gray-500 block">First Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-black">
                    <User size={18} strokeWidth={1.5} />
                  </div>
                  <input type="text" className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-400 text-[0.9rem]" defaultValue="Shahid" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[0.85rem] text-gray-500 block">Last Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-black">
                    <User size={18} strokeWidth={1.5} />
                  </div>
                  <input type="text" className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-400 text-[0.9rem]" defaultValue="Miah" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[0.85rem] text-gray-500 block">Add a Company Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[10px] font-bold">W</div>
                </div>
                <select className="w-full pl-11 pr-10 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-400 text-[0.9rem] appearance-none bg-white">
                  <option>Wavespace</option>
                </select>
                <div className="absolute inset-y-0 end-0 flex items-center pe-4 pointer-events-none text-black">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[0.85rem] text-gray-500 block">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-black">
                    <Mail size={18} strokeWidth={1.5} />
                  </div>
                  <input type="email" className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-400 text-[0.9rem]" defaultValue="wavespace.agency" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[0.85rem] text-gray-500 block">Mobile Number</label>
                <div className="flex rounded-lg border border-gray-200 overflow-hidden focus-within:border-gray-400">
                  <div className="flex items-center px-4 bg-gray-50 border-r border-gray-200 gap-2 text-sm text-foreground">
                     <span className="text-lg">🇺🇸</span>
                     <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                  <input type="text" className="w-full px-4 py-3 outline-none text-[0.9rem] bg-white" defaultValue="+1 (360) 972-3394" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[0.85rem] text-gray-500 block">Address (Optional)</label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-black">
                  <MapPin size={18} strokeWidth={1.5} />
                </div>
                <input type="text" className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-400 text-[0.9rem]" defaultValue="169 Rocky River Dr. Fresno, CA 93727" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[0.85rem] text-gray-500 block">Country</label>
                <div className="relative">
                   <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                     <span className="text-lg">🇺🇸</span>
                   </div>
                  <select className="w-full pl-11 pr-10 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-400 text-[0.9rem] appearance-none bg-white">
                    <option>United States</option>
                  </select>
                   <div className="absolute inset-y-0 end-0 flex items-center pe-4 pointer-events-none text-black">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[0.85rem] text-gray-500 block">State / Province</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-400 text-[0.9rem]" defaultValue="Alaska" />
              </div>
              <div className="space-y-2">
                <label className="text-[0.85rem] text-gray-500 block">Postal Code</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-400 text-[0.9rem]" defaultValue="99950" />
              </div>
            </div>

            <div className="pt-6 flex items-center gap-4">
              <button type="button" className="bg-[#f93a20] hover:bg-[#e0321a] text-white px-8 py-2.5 rounded-lg text-[0.95rem] font-medium transition-colors">
                Save
              </button>
              <button type="button" className="bg-white border border-gray-200 text-black hover:bg-gray-50 px-8 py-2.5 rounded-lg text-[0.95rem] font-medium transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Settings Sidebar */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm h-full">
            <h3 className="text-[1.35rem] font-bold mb-7 text-black">Client Settings</h3>
            
            <div className="space-y-5">
              
              {/* Setting Item */}
              <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-white cursor-pointer hover:border-gray-200 transition-colors shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-50 border border-gray-100 text-black">
                    <Clock size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-[0.95rem] font-semibold text-black">Send Payment Reminders</h4>
                    <p className="text-[0.8rem] text-gray-500 mt-0.5">At Customizable Intervals</p>
                  </div>
                </div>
                <div className="flex items-center text-[0.95rem] font-semibold gap-1 text-black">
                  No
                  <ChevronRight size={18} className="text-gray-400 ml-1" />
                </div>
              </div>

              {/* Setting Item */}
              <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-white cursor-pointer hover:border-gray-200 transition-colors shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-50 border border-gray-100 text-black">
                    <CircleDollarSign size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-[0.95rem] font-semibold text-black">Charge Late Fees</h4>
                    <p className="text-[0.8rem] text-gray-500 mt-0.5">Percentage or Flat-Rate Fees</p>
                  </div>
                </div>
                <div className="flex items-center text-[0.95rem] font-semibold gap-1 text-black">
                  No
                  <ChevronRight size={18} className="text-gray-400 ml-1" />
                </div>
              </div>

              {/* Setting Item */}
              <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-white cursor-pointer hover:border-gray-200 transition-colors shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-50 border border-gray-100 text-black">
                    <Languages size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-[0.95rem] font-semibold text-black">Currency & Language</h4>
                    <p className="text-[0.8rem] text-gray-500 mt-0.5">USD, English</p>
                  </div>
                </div>
                <div className="flex items-center text-[0.95rem] font-semibold gap-1 text-black">
                  No
                  <ChevronRight size={18} className="text-gray-400 ml-1" />
                </div>
              </div>

              {/* Setting Item */}
              <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-white cursor-pointer hover:border-gray-200 transition-colors shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-50 border border-gray-100 text-black">
                    <FileText size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-[0.95rem] font-semibold text-black">Invoice Attachments</h4>
                    <p className="text-[0.8rem] text-gray-500 mt-0.5">Attach PDF Copy To Emails</p>
                  </div>
                </div>
                <div className="flex items-center text-[0.95rem] font-semibold gap-1 text-black">
                  No
                  <ChevronRight size={18} className="text-gray-400 ml-1" />
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
