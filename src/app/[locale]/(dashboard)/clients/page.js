import { Search, ListFilter, Plus, MoreVertical, ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/routing';

export default function DashboardPage() {
  const clients = [
    { id: 1, company: 'Amazon', name: 'Eleanor Pena', email: 'finance@amazon.com', amount: '$32,235', note: 'Authorization Created', logoBg: 'bg-black', logoText: 'a', textCol: 'text-white' },
    { id: 2, company: 'Apple', name: 'Miles, Esther', email: 'support@apple.com', amount: '$17,000', note: 'Appeal Note', logoBg: 'bg-black', logoText: '', textCol: 'text-white' },
    { id: 3, company: 'Mailchimp', name: 'Henry, Arthur', email: 'finance@mailchimp.com', amount: '$46,000', note: 'Authorization', logoBg: 'bg-[#FFE01B]', logoText: 'M', textCol: 'text-black' },
    { id: 4, company: 'Evernote', name: 'Black, Marvin', email: 'support@evernote.com', amount: '$32,235', note: 'Attach Clinical', logoBg: 'bg-[#00A82D]', logoText: 'e', textCol: 'text-white' },
    { id: 5, company: 'Apple', name: 'Nguyen, Shane', email: 'support@apple.com', amount: '$12,000', note: 'Admission Advisor', logoBg: 'bg-black', logoText: '', textCol: 'text-white' },
    { id: 6, company: 'Spotify', name: 'Nguyen, Shane', email: 'finance@spotify.com', amount: '$32,235', note: 'Authorization Created', logoBg: 'bg-[#1DB954]', logoText: 'S', textCol: 'text-white' },
    { id: 7, company: 'Amazon', name: 'Nguyen, Shane', email: 'finance@amazon.com', amount: '$57,000', note: 'Web Authorization', logoBg: 'bg-black', logoText: 'a', textCol: 'text-white' },
    { id: 8, company: 'HP', name: 'Miles, Esther', email: 'support@hp.com', amount: '$12,000', note: 'Web Authorization', logoBg: 'bg-[#0096D6]', logoText: 'hp', textCol: 'text-white' },
  ];

  return (
    <main className="px-10 py-8 bg-[#fafafa] min-h-screen w-full font-sans text-[#111]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[2rem] font-bold">Clients</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1 */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-[0.95rem] text-gray-500 font-medium">Total outstanding</h3>
            <button className="text-gray-400 hover:text-black"><MoreVertical size={18} /></button>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-[2rem] font-bold text-black mb-2">$15,100</h2>
              <div className="flex items-center gap-1 text-[0.8rem] font-medium text-gray-500">
                <span className="text-green-500 flex items-center"><ArrowUpRight size={14} /> 2.3%</span> Last month
              </div>
            </div>
            <div className="w-24 h-12">
              <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                <path d="M 0,35 C 15,35 25,10 40,25 C 55,40 65,10 80,20 C 90,25 95,5 100,5" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 0,35 C 15,35 25,10 40,25 C 55,40 65,10 80,20 C 90,25 95,5 100,5 L 100,40 L 0,40 Z" fill="url(#grad-green)" opacity="0.2" />
                <defs>
                  <linearGradient id="grad-green" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity="1" />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-[0.95rem] text-gray-500 font-medium">Overdue</h3>
            <button className="text-gray-400 hover:text-black"><MoreVertical size={18} /></button>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-[2rem] font-bold text-black mb-2">$6,140</h2>
              <div className="flex items-center gap-1 text-[0.8rem] font-medium text-gray-500">
                <span className="text-red-500 flex items-center"><ArrowUpRight size={14} /> 2.3%</span> Last month
              </div>
            </div>
            <div className="w-24 h-12">
              <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                <path d="M 0,35 C 20,35 30,25 45,25 C 60,25 70,30 80,15 C 85,5 95,5 100,5" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 0,35 C 20,35 30,25 45,25 C 60,25 70,30 80,15 C 85,5 95,5 100,5 L 100,40 L 0,40 Z" fill="url(#grad-red)" opacity="0.2" />
                <defs>
                  <linearGradient id="grad-red" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="1" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-[0.95rem] text-gray-500 font-medium">In draft</h3>
            <button className="text-gray-400 hover:text-black"><MoreVertical size={18} /></button>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-[2rem] font-bold text-black mb-2">$5,425</h2>
              <div className="flex items-center gap-1 text-[0.8rem] font-medium text-gray-500">
                <span className="text-gray-500 flex items-center"><ArrowUpRight size={14} /> 1.8%</span> Last month
              </div>
            </div>
            <div className="w-24 h-12">
              <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                <path d="M 0,35 C 10,35 20,20 35,25 C 50,30 60,15 75,10 C 85,5 90,10 100,5" fill="none" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 0,35 C 10,35 20,20 35,25 C 50,30 60,15 75,10 C 85,5 90,10 100,5 L 100,40 L 0,40 Z" fill="url(#grad-gray)" opacity="0.2" />
                <defs>
                  <linearGradient id="grad-gray" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#475569" stopOpacity="1" />
                    <stop offset="100%" stopColor="#475569" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        {/* Table Header Controls */}
        <div className="px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-black">Clients List</h2>
          <div className="flex items-center gap-3">
            <div className="relative w-full md:w-80">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-gray-400">
                <Search size={16} strokeWidth={2.5} />
              </div>
              <input type="text" placeholder="Search" className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-400 text-sm" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-black hover:bg-gray-50 transition-colors shrink-0">
              <ListFilter size={16} /> Filters
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[0.85rem]">
            <thead className="bg-[#f9fafb] text-gray-500 font-semibold">
              <tr>
                <th className="px-6 py-4 w-12 text-center">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-4 py-4">Company Name</th>
                <th className="px-4 py-4">Name</th>
                <th className="px-4 py-4">Email Address</th>
                <th className="px-4 py-4">Total Outstanding</th>
                <th className="px-4 py-4">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-5 text-center">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-4 py-5 flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${client.logoBg} ${client.textCol}`}>
                      {client.logoText}
                    </div>
                    <span className="font-semibold text-black">{client.company}</span>
                  </td>
                  <td className="px-4 py-5 text-gray-600">{client.name}</td>
                  <td className="px-4 py-5 text-gray-600">{client.email}</td>
                  <td className="px-4 py-5 font-semibold text-black">{client.amount}</td>
                  <td className="px-4 py-5 text-gray-600">{client.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
