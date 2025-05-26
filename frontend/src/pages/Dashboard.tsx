// pages/Dashboard.tsx
import { useState } from 'react';
import { ChatWindow } from '../components/ChatWindow';
import {
  Settings,
  HelpCircle,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
} from 'lucide-react';

export const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex w-full h-screen font-sans bg-[#1e1e2ff8] text-gray-900 relative">
      {/* Sidebar */}
      {sidebarOpen && (
        <aside className="w-64 bg-[#1e1e2f] text-white flex flex-col p-4 fixed h-screen z-30 shadow-lg transition-transform">
          <div className="flex items-center justify-center mb-3 -mt-1 p-2 -mx-4 border-b border-solid border-b-gray-700 border-r-0 shadow-md">
            <span className="text-2xl font-bold tracking-wide text-center text-indigo-400">Matrix AI</span>
          </div>

          <nav className="space-y-2 flex-1 mt-6">
            <SidebarLink icon={<LayoutDashboard size={18} />} label="Dashboard" />
            <SidebarLink icon={<HelpCircle size={18} />} label="Help & FAQ" />
            <SidebarLink icon={<Settings size={18} />} label="Settings" />
          </nav>

          <div className="mt-auto border-t border-gray-700 pt-0 -mx-4">
            <SidebarLink icon={<LogOut size={18} />} label="Logout" />
          </div>
        </aside>
      )}

      {/* Main Area */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'} flex-1 flex flex-col h-screen overflow-hidden`}>
        {/* Header */}
        <header className="sticky top-0 bg-[#1e1e2f] border-b border-solid border-b-gray-700 shadow-md px-6 py-2.5 z-20 flex items-center justify-between">
          {/* Show logo in header only when sidebar is closed */}
          {!sidebarOpen && (
            <div className="flex items-center justify-center px-2 -mx-4">
              <span className="text-2xl font-bold tracking-wide text-center text-indigo-400">Matrix AI</span>
            </div>
          )}
          <h2 className="text-xl font-semibold text-indigo-400">AI Chat Interface</h2>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="bg-[#1e1e2f] text-gray-400 hover:text-white transition"
            aria-label="Toggle Sidebar"
          >
            {sidebarOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </header>

        {/* Main Chat Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto">
            <ChatWindow />
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 py-4 bg-[#1e1e2f] border-t border-t-gray-700">
          © {new Date().getFullYear()} Matrix AI · Built by You 🚀
        </footer>
      </div>
    </div>
  );
};

const SidebarLink = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <a
    href="#"
    className="flex items-center gap-3 px-4 py-2 rounded hover:bg-[#2e2e3f] transition duration-200 text-sm"
  >
    {icon}
    {label}
  </a>
);
