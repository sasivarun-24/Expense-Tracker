import { useExpenseStore } from '../../store/useExpenseStore';
import { Lightbulb, TrendingUp, AlertTriangle } from 'lucide-react';

export default function FinancialInsights() {
  const { expenses, budgets, currency } = useExpenseStore();

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalBudget = budgets.total;
  
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const highestCategory = Object.keys(categoryTotals).reduce((a, b) => categoryTotals[a] > categoryTotals[b] ? a : b, '');

  const insights = [];

  if (totalExpenses > totalBudget) {
    insights.push({
      icon: <AlertTriangle className="text-rose-500" size={24} />,
      title: 'Budget Exceeded',
      desc: `You have exceeded your total budget by ${currency}${(totalExpenses - totalBudget).toFixed(2)}.`,
      color: 'bg-rose-50 border-rose-100 dark:bg-rose-500/10 dark:border-rose-500/20'
    });
  } else if (totalExpenses > totalBudget * 0.8) {
    insights.push({
      icon: <AlertTriangle className="text-amber-500" size={24} />,
      title: 'Approaching Budget Limit',
      desc: `You have spent ${((totalExpenses/totalBudget)*100).toFixed(0)}% of your monthly budget.`,
      color: 'bg-amber-50 border-amber-100 dark:bg-amber-500/10 dark:border-amber-500/20'
    });
  }

  if (highestCategory) {
    insights.push({
      icon: <TrendingUp className="text-indigo-500" size={24} />,
      title: 'Top Spending Category',
      desc: `Your highest spending is on ${highestCategory} (${currency}${categoryTotals[highestCategory].toFixed(2)}).`,
      color: 'bg-indigo-50 border-indigo-100 dark:bg-indigo-500/10 dark:border-indigo-500/20'
    });
  }

  let smartSuggestion = 'Consider reducing discretionary spending to boost your savings rate this week.';
  
  if (highestCategory) {
    switch (highestCategory) {
      case 'Food':
        smartSuggestion = 'You are spending a lot on Food. Try meal prepping or cooking at home more often to save money.';
        break;
      case 'Entertainment':
        smartSuggestion = 'Entertainment costs are high. Look for free local events or review your active subscriptions.';
        break;
      case 'Shopping':
        smartSuggestion = 'Shopping is your top expense. Consider a 24-hour cool-off period before making non-essential purchases.';
        break;
      case 'Travel':
        smartSuggestion = 'Travel costs are adding up. Booking flights and hotels in advance can help reduce these expenses.';
        break;
      case 'Bills':
        smartSuggestion = 'Bills are your highest expense. Review your recurring bills and negotiate rates with providers if possible.';
        break;
      default:
        smartSuggestion = `Your highest spending is in ${highestCategory}. Review these expenses to find potential savings.`;
    }
  }

  if (totalExpenses < totalBudget * 0.4 && totalExpenses > 0) {
    smartSuggestion = 'Great job keeping expenses low! Consider moving your surplus into a high-yield savings account or investments.';
  } else if (totalExpenses === 0) {
    smartSuggestion = 'Start adding expenses to get personalized tips and financial insights.';
  }

  insights.push({
    icon: <Lightbulb className="text-emerald-500" size={24} />,
    title: 'Financial Tip',
    desc: smartSuggestion,
    color: 'bg-emerald-50 border-emerald-100 dark:bg-emerald-500/10 dark:border-emerald-500/20'
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {insights.map((insight, idx) => (
        <div key={idx} className={`p-4 rounded-2xl border flex items-start space-x-4 ${insight.color}`}>
          <div className="mt-1">{insight.icon}</div>
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-slate-200">{insight.title}</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{insight.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
