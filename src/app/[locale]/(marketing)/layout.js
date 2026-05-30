import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';

export default function MarketingLayout({ children }) {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col relative overflow-hidden">
      <Navbar />
      <div className="flex-1 w-full flex flex-col">
        {children}
      </div>
      <Footer />
    </div>
  );
}
