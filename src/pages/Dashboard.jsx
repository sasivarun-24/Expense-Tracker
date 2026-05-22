import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wallet, TrendingDown, PiggyBank, Target } from 'lucide-react';
import { useExpenseStore } from '../store/useExpenseStore';
import SummaryCard from '../components/Dashboard/SummaryCard';
import RecentTransactions from '../components/Dashboard/RecentTransactions';
import RecurringSummary from '../components/Dashboard/RecurringSummary';
import ExpenseForm from '../components/Expenses/ExpenseForm';
import ExpenseTrendChart from '../components/Analytics/ExpenseTrendChart';

export default function Dashboard() {
  const { expenses, budgets } = useExpenseStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fake loading delay to show off skeletons for recruiters
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalBudget = budgets.total;
  const balance = totalBudget - totalExpenses;
  const savings = balance > 0 ? balance * 0.2 : 0; // Fake savings calc

  const summaryData = [
    {
      title: 'Total Balance',
      amount: balance,
      icon: Wallet,
      colorClass: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400',
      trend: { value: 12.5, isPositive: true }
    },
    {
      title: 'Monthly Spending',
      amount: totalExpenses,
      icon: TrendingDown,
      colorClass: 'bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400',
      trend: { value: 8.2, isPositive: false }
    },
    {
      title: 'Savings Goal',
      amount: savings,
      icon: PiggyBank,
      colorClass: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400',
    },
    {
      title: 'Budget Limit',
      amount: totalBudget,
      icon: Target,
      colorClass: 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400',
    }
  ];

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="flex justify-between items-center">
          <div className="h-8 w-32 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
          <div className="h-10 w-28 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-[400px] bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
          <div className="flex flex-col gap-6 h-[400px]">
            <div className="h-[200px] bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
            <div className="h-[200px] bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Overview</h1>
        <button 
          onClick={() => setIsFormOpen(true)}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl font-medium transition-colors shadow-sm"
        >
          + Quick Add
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryData.map((data, index) => (
          <SummaryCard key={index} {...data} />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 min-h-[400px]">
          <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-100">Expense Trend (Jan-Dec)</h3>
          <ExpenseTrendChart />
        </div>
        <div className="flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-100">Recent Transactions</h3>
            <RecentTransactions limit={4} />
          </div>
          <RecurringSummary />
        </div>
      </div>

      <ExpenseForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </motion.div>
  );
}
