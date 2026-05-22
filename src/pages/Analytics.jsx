import { motion } from 'framer-motion';
import CategoryPieChart from '../components/Analytics/CategoryPieChart';
import FinancialInsights from '../components/Analytics/FinancialInsights';
import WeeklyComparisonChart from '../components/Analytics/WeeklyComparisonChart';

export default function Analytics() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold mb-6 text-slate-800 dark:text-slate-100">Weekly Comparison</h2>
          <WeeklyComparisonChart />
        </div>
        
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold mb-6 text-slate-800 dark:text-slate-100">Spending by Category</h2>
          <CategoryPieChart />
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
        <h2 className="text-xl font-bold mb-6 text-slate-800 dark:text-slate-100">Financial Analysis</h2>
        <FinancialInsights />
      </div>
    </motion.div>
  );
}
