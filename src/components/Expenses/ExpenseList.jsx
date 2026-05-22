import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { Pencil, Trash2, Search, Filter, Repeat } from 'lucide-react';
import { useExpenseStore } from '../../store/useExpenseStore';

export default function ExpenseList({ onEdit }) {
  const { expenses, deleteExpense, currency } = useExpenseStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [paymentFilter, setPaymentFilter] = useState('All');
  const [monthFilter, setMonthFilter] = useState('All');
  const [sortOption, setSortOption] = useState('Latest');

  const categories = ['All', ...new Set(expenses.map(e => e.category))];
  const paymentMethods = ['All', ...new Set(expenses.map(e => e.paymentMethod).filter(Boolean))];
  const months = ['All', ...new Set(expenses.map(e => {
    try { return format(parseISO(e.date), 'MMMM yyyy') } catch(e) { return '' }
  }).filter(Boolean))];

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || expense.category === categoryFilter;
    const matchesPayment = paymentFilter === 'All' || expense.paymentMethod === paymentFilter;
    let matchesMonth = monthFilter === 'All';
    if (!matchesMonth) {
      try { matchesMonth = format(parseISO(expense.date), 'MMMM yyyy') === monthFilter } catch(e) {}
    }
    return matchesSearch && matchesCategory && matchesPayment && matchesMonth;
  }).sort((a, b) => {
    if (sortOption === 'Latest') return new Date(b.date) - new Date(a.date);
    if (sortOption === 'Oldest') return new Date(a.date) - new Date(b.date);
    if (sortOption === 'Highest') return b.amount - a.amount;
    if (sortOption === 'Lowest') return a.amount - b.amount;
    return 0;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search expenses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          />
        </div>
        <div className="flex flex-wrap space-x-2 md:space-x-4 gap-y-2">
          <div className="relative">
            <Filter className="absolute left-3 top-2.5 text-slate-400" size={20} />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="pl-10 pr-8 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all appearance-none text-sm"
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div className="relative">
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all appearance-none text-sm"
            >
              <option value="All">All Methods</option>
              {paymentMethods.filter(m => m !== 'All').map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div className="relative">
            <select
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all appearance-none text-sm"
            >
              <option value="All">All Months</option>
              {months.filter(m => m !== 'All').map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all appearance-none text-sm"
            >
              <option value="Latest">Latest</option>
              <option value="Oldest">Oldest</option>
              <option value="Highest">Highest Amount</option>
              <option value="Lowest">Lowest Amount</option>
            </select>
          </div>
          <button 
            onClick={() => {
              const csvContent = "data:text/csv;charset=utf-8," 
                + "Date,Title,Category,Amount\n"
                + filteredExpenses.map(e => `${e.date},${e.title},${e.category},${e.amount}`).join("\n");
              const encodedUri = encodeURI(csvContent);
              const link = document.createElement("a");
              link.setAttribute("href", encodedUri);
              link.setAttribute("download", "expenses.csv");
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-medium"
          >
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="py-4 px-6 font-semibold text-sm text-slate-500 dark:text-slate-400">Date</th>
                <th className="py-4 px-6 font-semibold text-sm text-slate-500 dark:text-slate-400">Title</th>
                <th className="py-4 px-6 font-semibold text-sm text-slate-500 dark:text-slate-400">Category</th>
                <th className="py-4 px-6 font-semibold text-sm text-slate-500 dark:text-slate-400 text-right">Amount</th>
                <th className="py-4 px-6 font-semibold text-sm text-slate-500 dark:text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {filteredExpenses.length === 0 ? (
                  <tr key="empty">
                    <td colSpan="5" className="py-8 text-center text-slate-500 dark:text-slate-400">
                      No expenses found
                    </td>
                  </tr>
                ) : (
                  filteredExpenses.map((expense) => (
                    <motion.tr
                      key={expense.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-b border-slate-100 dark:border-slate-800/50 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="py-4 px-6 whitespace-nowrap text-slate-600 dark:text-slate-300">
                        {format(parseISO(expense.date), 'MMM dd, yyyy')}
                      </td>
                      <td className="py-4 px-6 font-medium text-slate-800 dark:text-slate-100">
                        <div className="flex items-center space-x-2">
                          <span>{expense.title}</span>
                          {expense.isRecurring && (
                            <span className="flex items-center text-[10px] uppercase font-bold tracking-wider text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 px-1.5 py-0.5 rounded">
                              <Repeat size={10} className="mr-1" /> Recurring
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-sm">
                          {expense.category}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right font-semibold text-slate-800 dark:text-slate-100">
                        {currency}{expense.amount.toFixed(2)}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex justify-end space-x-2">
                          <button 
                            onClick={() => onEdit(expense)}
                            className="p-2 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-colors"
                          >
                            <Pencil size={18} />
                          </button>
                          <button 
                            onClick={() => deleteExpense(expense.id)}
                            className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
