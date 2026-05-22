import { useState } from 'react';
import { motion } from 'framer-motion';
import ExpenseList from '../components/Expenses/ExpenseList';
import ExpenseForm from '../components/Expenses/ExpenseForm';

export default function Expenses() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);

  const handleEdit = (expense) => {
    setExpenseToEdit(expense);
    setIsFormOpen(true);
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setTimeout(() => setExpenseToEdit(null), 300); // Wait for modal close animation
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Expenses</h1>
        <button 
          onClick={() => setIsFormOpen(true)}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl font-medium transition-colors shadow-sm"
        >
          + Add Expense
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
        <ExpenseList onEdit={handleEdit} />
      </div>

      <ExpenseForm 
        isOpen={isFormOpen} 
        onClose={handleClose} 
        expenseToEdit={expenseToEdit}
      />
    </motion.div>
  );
}
