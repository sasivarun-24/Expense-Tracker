import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useExpenseStore } from '../../store/useExpenseStore';
import toast from 'react-hot-toast';

const CATEGORIES = ['Food', 'Travel', 'Shopping', 'Bills', 'Entertainment', 'Health'];

export default function ExpenseForm({ isOpen, onClose, expenseToEdit = null }) {
  const { addExpense, editExpense, currency } = useExpenseStore();
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Food',
    paymentMethod: 'Credit Card',
    date: new Date().toISOString().split('T')[0],
    isRecurring: false
  });

  useEffect(() => {
    if (expenseToEdit) {
      setFormData({
        ...expenseToEdit,
        amount: expenseToEdit.amount.toString(),
      });
    } else {
      setFormData({
        title: '',
        amount: '',
        category: 'Food',
        paymentMethod: 'Credit Card',
        date: new Date().toISOString().split('T')[0],
        isRecurring: false
      });
    }
  }, [expenseToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) {
      toast.error('Please fill in all required fields');
      return;
    }

    const payload = {
      ...formData,
      amount: parseFloat(formData.amount),
    };

    if (expenseToEdit) {
      editExpense(expenseToEdit.id, payload);
      toast.success('Expense updated!');
    } else {
      addExpense(payload);
      toast.success('Expense added!');
    }
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-slate-200 dark:border-slate-800"
        >
          <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold">{expenseToEdit ? 'Edit Expense' : 'Add Expense'}</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
              <X size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                placeholder="e.g., Groceries"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-2 text-slate-500">{currency}</span>
                <input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full pl-8 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Payment Method</label>
                <select
                  value={formData.paymentMethod}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                >
                  {['Credit Card', 'Debit Card', 'Cash', 'Bank Transfer', 'UPI'].map(method => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              />
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <input
                type="checkbox"
                id="isRecurring"
                checked={formData.isRecurring}
                onChange={(e) => setFormData({ ...formData, isRecurring: e.target.checked })}
                className="w-4 h-4 text-emerald-500 rounded border-slate-300 focus:ring-emerald-500"
              />
              <label htmlFor="isRecurring" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                This is a recurring monthly expense
              </label>
            </div>
            <button
              type="submit"
              className="w-full py-3 mt-6 bg-gradient-to-r from-emerald-500 to-indigo-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              {expenseToEdit ? 'Save Changes' : 'Add Expense'}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
