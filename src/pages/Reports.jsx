import { motion } from 'framer-motion';
import { useExpenseStore } from '../store/useExpenseStore';
import { Download, FileText, PieChart } from 'lucide-react';

export default function Reports() {
  const { expenses, currency } = useExpenseStore();

  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  const totalSpent = Object.values(categoryTotals).reduce((sum, val) => sum + val, 0);

  const handleExportCSV = () => {
    const headers = ['Date', 'Title', 'Category', 'Amount'];
    const csvData = expenses.map(e => 
      `${e.date},"${e.title}",${e.category},${e.amount}`
    );
    const csvContent = [headers.join(','), ...csvData].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'financial_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Financial Reports</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Export and analyze your spending patterns</p>
        </div>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <button 
            onClick={handleExportPDF}
            className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm text-sm font-medium"
          >
            <FileText size={16} />
            <span>Export PDF</span>
          </button>
          <button 
            onClick={handleExportCSV}
            className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors shadow-sm text-sm font-medium"
          >
            <Download size={16} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center">
            <PieChart size={18} className="mr-2 text-indigo-500" />
            Spending by Category
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-sm text-slate-500 dark:text-slate-400">
                  <th className="py-3 font-medium">Category</th>
                  <th className="py-3 font-medium text-right">Total Spent</th>
                  <th className="py-3 font-medium text-right">% of Total</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]).map(([category, amount]) => (
                  <tr key={category} className="border-b border-slate-50 dark:border-slate-800/50">
                    <td className="py-4 text-sm font-medium text-slate-800 dark:text-slate-200">{category}</td>
                    <td className="py-4 text-sm text-right text-slate-600 dark:text-slate-300">{currency}{amount.toFixed(2)}</td>
                    <td className="py-4 text-sm text-right text-slate-500 dark:text-slate-400">
                      {totalSpent > 0 ? ((amount / totalSpent) * 100).toFixed(1) : 0}%
                    </td>
                  </tr>
                ))}
                {Object.keys(categoryTotals).length === 0 && (
                  <tr>
                    <td colSpan="3" className="py-8 text-center text-slate-500">No expenses recorded yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 self-start">
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">Summary</h3>
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Total Lifetime Spend</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{currency}{totalSpent.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Total Transactions</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{expenses.length}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
