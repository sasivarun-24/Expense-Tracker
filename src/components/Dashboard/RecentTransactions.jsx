import { useExpenseStore } from '../../store/useExpenseStore';
import { format, parseISO } from 'date-fns';
import { Coffee, ShoppingBag, Plane, FileText, MonitorPlay, HeartPulse, CreditCard, Repeat } from 'lucide-react';

const CATEGORY_ICONS = {
  Food: <Coffee size={20} />,
  Shopping: <ShoppingBag size={20} />,
  Travel: <Plane size={20} />,
  Bills: <FileText size={20} />,
  Entertainment: <MonitorPlay size={20} />,
  Health: <HeartPulse size={20} />,
};

export default function RecentTransactions({ limit = 5 }) {
  const { expenses, currency } = useExpenseStore();
  
  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);

  if (recentExpenses.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500 dark:text-slate-400">
        <CreditCard className="mx-auto h-12 w-12 mb-3 opacity-20" />
        <p>No transactions yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {recentExpenses.map((expense) => (
        <div key={expense.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400">
              {CATEGORY_ICONS[expense.category] || <CreditCard size={20} />}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <p className="font-medium text-slate-800 dark:text-slate-200">{expense.title}</p>
                {expense.isRecurring && (
                  <span className="flex items-center text-xs text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 px-1.5 py-0.5 rounded">
                    <Repeat size={12} className="mr-1" /> Recurring
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {expense.category} • {format(parseISO(expense.date), 'MMM dd, yyyy')}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-slate-800 dark:text-slate-200">
              -{currency}{expense.amount.toFixed(2)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
