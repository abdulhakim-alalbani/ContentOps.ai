import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 bg-background relative">
        <Topbar />
        <div className="flex-1 overflow-y-auto w-full p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
