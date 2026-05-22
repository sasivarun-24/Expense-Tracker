import { useState, useMemo } from 'react';
import { useExpenseStore } from '../../store/useExpenseStore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { subMonths, format } from 'date-fns';

export default function ExpenseTrendChart() {
  const { expenses, currency } = useExpenseStore();
  const [filter, setFilter] = useState('12');

  const data = useMemo(() => {
    const today = new Date();
    const monthsToShow = parseInt(filter);
    
    const chartData = [];
    for (let i = monthsToShow - 1; i >= 0; i--) {
      const d = subMonths(today, i);
      chartData.push({
        name: format(d, 'MMM'),
        monthStr: format(d, 'yyyy-MM'),
        amount: 0
      });
    }

    expenses.forEach(expense => {
      try {
        const dateStr = expense.date.substring(0, 7);
        const targetMonth = chartData.find(m => m.monthStr === dateStr);
        if (targetMonth) {
          targetMonth.amount += expense.amount;
        }
      } catch (e) {}
    });

    return chartData;
  }, [expenses, filter]);

  if (expenses.length === 0) {
    return <div className="flex items-center justify-center h-[300px] text-slate-400">No data available</div>;
  }

  return (
    <div className="flex flex-col h-full w-full relative">
      <div className="absolute -top-12 right-0 z-10">
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg px-2 py-1 outline-none focus:ring-1 focus:ring-emerald-500"
        >
          <option value="1">This Month</option>
          <option value="3">Last 3 Months</option>
          <option value="6">Last 6 Months</option>
          <option value="12">Last 12 Months</option>
        </select>
      </div>
      <div className="h-[300px] w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis dataKey="name" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
            <YAxis tick={{fontSize: 12}} tickLine={false} axisLine={false} tickFormatter={(val) => `${currency}${val}`} />
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <Tooltip 
              formatter={(value) => [`${currency}${value.toFixed(2)}`, 'Spent']}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
            />
            <Line type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
