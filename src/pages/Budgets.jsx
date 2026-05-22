import { motion } from 'framer-motion';
import BudgetProgressBar from '../components/Budgets/BudgetProgressBar';

export default function Budgets() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto"
    >
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Budget Management</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Track your spending limits across different categories.</p>
        </div>
        
        <BudgetProgressBar />
      </div>
    </motion.div>
  );
}
