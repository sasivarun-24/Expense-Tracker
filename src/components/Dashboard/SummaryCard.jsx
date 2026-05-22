import { motion } from 'framer-motion';
import { useExpenseStore } from '../../store/useExpenseStore';

export default function SummaryCard({ title, amount, icon: Icon, trend, colorClass }) {
  const { currency } = useExpenseStore();
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-2">
            {currency}{amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h3>
        </div>
        <div className={`p-3 rounded-xl ${colorClass}`}>
          <Icon size={24} />
        </div>
      </div>
      {trend && (
        <div className="flex items-center text-sm mt-4">
          <span className={`font-medium ${trend.isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
          <span className="text-slate-500 dark:text-slate-400 ml-2">from last month</span>
        </div>
      )}
    </motion.div>
  );
}
