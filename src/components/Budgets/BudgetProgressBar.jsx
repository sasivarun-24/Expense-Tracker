import { useState } from 'react';
import { useExpenseStore } from '../../store/useExpenseStore';
import { Pencil, Check } from 'lucide-react';

export default function BudgetProgressBar() {
  const { expenses, budgets, updateBudget, currency } = useExpenseStore();
  const [editingCategory, setEditingCategory] = useState(null);
  const [editValue, setEditValue] = useState('');

  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const categories = Object.keys(budgets).filter(k => k !== 'total');

  const handleSave = (category) => {
    const val = parseFloat(editValue);
    if (!isNaN(val) && val > 0) {
      updateBudget(category, val);
      
      // Also ensure total budget covers the sum of category budgets
      const newTotal = categories.reduce((sum, cat) => sum + (cat === category ? val : budgets[cat]), 0);
      if (newTotal > budgets.total) {
        updateBudget('total', newTotal); 
      }
    }
    setEditingCategory(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-slate-800 dark:text-slate-200">Category Budgets</h3>
        <span className="text-sm text-slate-500 dark:text-slate-400">Total Limit: {currency}{budgets.total.toFixed(2)}</span>
      </div>
      {categories.map(category => {
        const spent = categoryTotals[category] || 0;
        const limit = budgets[category];
        const percent = Math.min((spent / limit) * 100, 100) || 0;
        
        let colorClass = 'bg-emerald-500';
        if (percent >= 100) colorClass = 'bg-rose-500';
        else if (percent > 80) colorClass = 'bg-amber-500';

        const isEditing = editingCategory === category;

        return (
          <div key={category} className="group">
            <div className="flex justify-between items-center text-sm font-medium mb-2">
              <span className="text-slate-700 dark:text-slate-300">{category}</span>
              <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
                <span>{currency}{spent.toFixed(2)} /</span>
                {isEditing ? (
                  <div className="flex items-center">
                    <span className="mr-1">{currency}</span>
                    <input 
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-20 px-2 py-1 text-sm rounded border border-emerald-500 outline-none bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                      autoFocus
                    />
                    <button onClick={() => handleSave(category)} className="ml-2 text-emerald-500 hover:text-emerald-600">
                      <Check size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span>{currency}{limit.toFixed(2)}</span>
                    <button 
                      onClick={() => { setEditingCategory(category); setEditValue(limit); }}
                      className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-indigo-500"
                    >
                      <Pencil size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={`h-full ${colorClass} transition-all duration-500 ease-out`}
                style={{ width: `${percent}%` }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
