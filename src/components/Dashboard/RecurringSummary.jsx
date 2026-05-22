import { useExpenseStore } from '../../store/useExpenseStore';
import { Repeat, Calendar } from 'lucide-react';
import { format, parseISO, addMonths } from 'date-fns';

export default function RecurringSummary() {
  const { expenses, currency } = useExpenseStore();
  
  const recurringExpenses = expenses.filter(e => e.isRecurring);
  const totalMonthly = recurringExpenses.reduce((sum, e) => sum + e.amount, 0);

  // Fake upcoming dates (assuming they repeat next month on the same day)
  const upcoming = recurringExpenses.map(e => {
    try {
      const nextDate = addMonths(parseISO(e.date), 1);
      return { ...e, nextDate };
    } catch(err) {
      return { ...e, nextDate: new Date() };
    }
  }).sort((a, b) => a.nextDate - b.nextDate).slice(0, 3);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 h-full flex flex-col">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 rounded-lg">
          <Repeat size={24} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Recurring Expenses</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Monthly Subscriptions</p>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Total Monthly Commitment</p>
        <p className="text-3xl font-bold text-slate-800 dark:text-slate-100">{currency}{totalMonthly.toFixed(2)}</p>
      </div>

      <div className="flex-1">
        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 flex items-center">
          <Calendar size={14} className="mr-1.5" /> Upcoming Payments
        </h4>
        {upcoming.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">No recurring expenses found.</p>
        ) : (
          <div className="space-y-3">
            {upcoming.map(item => (
              <div key={item.id} className="flex justify-between items-center text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                  <span className="text-slate-700 dark:text-slate-300 truncate max-w-[120px]">{item.title}</span>
                </div>
                <div className="text-right">
                  <span className="block font-medium text-slate-800 dark:text-slate-200">{currency}{item.amount.toFixed(2)}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{format(item.nextDate, 'MMM dd')}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
