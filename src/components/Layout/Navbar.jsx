import { useState, useRef, useEffect } from 'react';
import { Moon, Sun, Bell, Menu, PlusCircle } from 'lucide-react';
import { useExpenseStore } from '../../store/useExpenseStore';
import { useLocation } from 'react-router-dom';
import { formatDistanceToNow, parseISO } from 'date-fns';

export default function Navbar() {
  const { theme, toggleTheme, expenses, currency, toggleMobileMenu } = useExpenseStore();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);

  const recentExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'Dashboard Overview';
      case '/expenses': return 'All Expenses';
      case '/analytics': return 'Financial Analytics';
      case '/budgets': return 'Budget Management';
      case '/reports': return 'Reports';
      case '/settings': return 'Settings';
      default: return 'Dashboard';
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 px-6 flex items-center justify-between">
      <div className="flex items-center md:hidden">
        <button 
          onClick={toggleMobileMenu}
          className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>
      </div>
      
      <div className="hidden md:block">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">{getPageTitle()}</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Welcome back, let's manage your finances.</p>
      </div>

      <div className="flex items-center space-x-4">
        <button 
          onClick={toggleTheme}
          className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors relative"
          >
            <Bell size={20} />
            {recentExpenses.length > 0 && <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full"></span>}
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden z-50">
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <h3 className="font-semibold text-slate-800 dark:text-slate-100">Notifications</h3>
                <span className="text-xs bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 px-2 py-1 rounded-full">{recentExpenses.length} new</span>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {recentExpenses.length === 0 ? (
                  <p className="text-sm text-slate-500 text-center p-4">No recent activity.</p>
                ) : (
                  recentExpenses.map((exp, idx) => {
                    let timeAgo = 'recently';
                    try { timeAgo = formatDistanceToNow(parseISO(exp.date), { addSuffix: true }) } catch(e) {}
                    return (
                      <div key={idx} className="p-4 border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-start space-x-3">
                        <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 rounded-full shrink-0">
                          <PlusCircle size={16} />
                        </div>
                        <div>
                          <p className="text-sm text-slate-800 dark:text-slate-200">
                            Added <span className="font-semibold">{exp.title}</span> for {currency}{exp.amount.toFixed(2)}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{timeAgo}</p>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          )}
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-400 to-indigo-500 flex items-center justify-center text-white font-semibold shadow-md cursor-pointer">
          S
        </div>
      </div>
    </header>
  );
}
