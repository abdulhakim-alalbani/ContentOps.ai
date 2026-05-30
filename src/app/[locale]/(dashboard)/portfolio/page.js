"use client";

import { useState, useEffect } from 'react';
import { Plus, Filter, LayoutGrid, Search, ExternalLink, MoreVertical, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function PortfolioPage() {
  const supabase = createClient();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }
      
      const { data } = await supabase
        .from('projects')
        .select('*')
        .eq('client_id', user.id)
        .order('created_at', { ascending: false });
        
      if (data) setProjects(data);
      setLoading(false);
    };
    fetchProjects();
  }, [supabase]);
  return (
    <div className="flex flex-col h-full w-full bg-background -m-8 px-8 py-6 overflow-x-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[1.75rem] font-bold text-foreground">Portfolio</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and track all your ongoing projects</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-border rounded-lg text-sm font-semibold text-gray-700 flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm">
            <Filter size={16} /> Filters
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-primary-hover transition-colors shadow-sm">
            <Plus size={16} /> New Project
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-6 border-b border-border w-full max-w-2xl">
          <button className="pb-3 text-sm font-bold text-foreground border-b-2 border-foreground">All Projects (6)</button>
          <button className="pb-3 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors">Active (3)</button>
          <button className="pb-3 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors">Completed (2)</button>
          <button className="pb-3 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors">Archived</button>
        </div>
        <div className="flex items-center gap-2">
           <div className="relative">
             <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
             <input type="text" placeholder="Search projects..." className="pl-9 pr-4 py-1.5 bg-white border border-border rounded-lg text-sm font-medium focus:outline-none focus:border-primary w-[250px]" />
           </div>
           <button className="p-1.5 bg-gray-100 rounded-lg text-gray-600"><LayoutGrid size={18} /></button>
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-8 relative min-h-[300px]">
        {loading && <div className="absolute inset-0 flex items-center justify-center"><Loader2 className="animate-spin text-primary" size={32} /></div>}
        {!loading && projects.length === 0 && <div className="absolute inset-0 flex items-center justify-center text-gray-500">No projects found.</div>}
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
            {/* Project Image Header */}
            <div className="h-40 w-full relative overflow-hidden bg-gray-100">
              <img src={project.image} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute top-3 right-3 flex gap-2">
                <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                  <ExternalLink size={14} />
                </button>
                <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                  <MoreVertical size={14} />
                </button>
              </div>
              <div className="absolute bottom-3 left-4">
                <span className={`inline-block px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                  project.status === 'Active' ? 'bg-primary text-white' : 
                  project.status === 'Completed' ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'
                }`}>
                  {project.status}
                </span>
              </div>
            </div>

            {/* Project Details */}
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors cursor-pointer">{project.name}</h3>
                  <p className="text-xs font-semibold text-gray-500">{project.category}</p>
                </div>
              </div>

              {/* Progress */}
              <div className="mt-4 mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-gray-600">Progress</span>
                  <span className="text-xs font-bold text-gray-900">{project.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${project.progress === 100 ? 'bg-green-500' : 'bg-primary'}`} 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex -space-x-2">
                  {(project.members || []).map((imgId, i) => (
                    <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-gray-200 overflow-hidden relative z-[3] hover:z-10 transition-transform hover:scale-110">
                      <img src={`https://i.pravatar.cc/150?img=${imgId}`} alt="Team Member" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  {(project.members || []).length > 3 && (
                    <div className="w-7 h-7 rounded-full border-2 border-white bg-gray-50 flex items-center justify-center text-[10px] font-bold text-gray-600 relative z-0">
                      +{(project.members || []).length - 3}
                    </div>
                  )}
                </div>
                <button className="text-xs font-bold text-primary hover:text-primary-hover transition-colors">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
