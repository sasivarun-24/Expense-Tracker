import { motion } from 'framer-motion';
import { useExpenseStore } from '../store/useExpenseStore';

export default function Settings() {
  const { currency, setCurrency, budgets, updateBudget } = useExpenseStore();

  const currencies = [
    { symbol: '$', name: 'US Dollar (USD)' },
    { symbol: '€', name: 'Euro (EUR)' },
    { symbol: '£', name: 'British Pound (GBP)' },
    { symbol: '₹', name: 'Indian Rupee (INR)' },
    { symbol: '¥', name: 'Japanese Yen (JPY)' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Settings</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Default Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full max-w-md px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            >
              {currencies.map(c => (
                <option key={c.symbol} value={c.symbol}>
                  {c.symbol} - {c.name}
                </option>
              ))}
            </select>
            <p className="mt-2 text-sm text-slate-500">
              This currency symbol will be used across all your dashboard widgets and reports.
            </p>
          </div>

          <hr className="border-slate-100 dark:border-slate-800" />

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Total Monthly Budget Limit
            </label>
            <div className="relative max-w-md">
              <span className="absolute left-4 top-2 text-slate-500">{currency}</span>
              <input
                type="number"
                value={budgets.total}
                onChange={(e) => updateBudget('total', parseFloat(e.target.value) || 0)}
                className="w-full pl-8 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                placeholder="5000"
              />
            </div>
            <p className="mt-2 text-sm text-slate-500">
              Your overall maximum spending limit. This automatically updates your "Total Balance" widget.
            </p>
          </div>

          <hr className="border-slate-100 dark:border-slate-800" />

          <div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Preferences</h3>
            
            <div className="flex items-center justify-between py-3 border-b border-slate-50 dark:border-slate-800/50">
              <div>
                <p className="font-medium text-slate-700 dark:text-slate-300">Email Notifications</p>
                <p className="text-sm text-slate-500">Receive weekly summaries and budget alerts</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-emerald-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-slate-50 dark:border-slate-800/50">
              <div>
                <p className="font-medium text-slate-700 dark:text-slate-300">Weekly Analytics</p>
                <p className="text-sm text-slate-500">Generate spending pattern reports automatically</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-emerald-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-slate-700 dark:text-slate-300">Start of Week</p>
                <p className="text-sm text-slate-500">Which day should your calendar start on?</p>
              </div>
              <select className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none">
                <option>Monday</option>
                <option>Sunday</option>
              </select>
            </div>
          </div>

          <hr className="border-slate-100 dark:border-slate-800" />

          <div>
            <h3 className="text-lg font-semibold text-rose-600 dark:text-rose-500 mb-4">Data Management</h3>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-slate-700 dark:text-slate-300">Clear All Data</p>
                <p className="text-sm text-slate-500">Permanently delete all expenses and budgets</p>
              </div>
              <button 
                onClick={() => {
                  if(window.confirm('Are you sure you want to delete ALL data? This cannot be undone.')) {
                    localStorage.removeItem('expense-store');
                    window.location.reload();
                  }
                }}
                className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:hover:bg-rose-500/20 dark:text-rose-400 rounded-lg text-sm font-medium transition-colors"
              >
                Delete Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
