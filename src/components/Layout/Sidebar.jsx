import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Receipt, PieChart, Wallet, FileText, Settings, X } from 'lucide-react';
import { useExpenseStore } from '../../store/useExpenseStore';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/expenses', label: 'Expenses', icon: Receipt },
  { path: '/analytics', label: 'Analytics', icon: PieChart },
  { path: '/budgets', label: 'Budgets', icon: Wallet },
  { path: '/reports', label: 'Reports', icon: FileText },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const { isMobileMenuOpen, setMobileMenuOpen } = useExpenseStore();

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      <aside className={`
        fixed md:sticky top-0 left-0 z-50 h-screen w-64 
        bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 
        flex flex-col transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-indigo-500 bg-clip-text text-transparent">
            FinTrack
          </h1>
          <button 
            className="md:hidden text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={24} />
          </button>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`
              }
            >
              <Icon size={20} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
