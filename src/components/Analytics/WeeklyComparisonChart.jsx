import { useExpenseStore } from '../../store/useExpenseStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { startOfWeek, endOfWeek, subWeeks, isWithinInterval, parseISO } from 'date-fns';

export default function WeeklyComparisonChart() {
  const { expenses, currency } = useExpenseStore();

  const today = new Date();
  
  // This Week
  const thisWeekStart = startOfWeek(today);
  const thisWeekEnd = endOfWeek(today);
  
  // Last Week
  const lastWeekStart = startOfWeek(subWeeks(today, 1));
  const lastWeekEnd = endOfWeek(subWeeks(today, 1));

  // Initialize days (Sun - Sat)
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const data = days.map((day) => ({
    name: day,
    'This Week': 0,
    'Last Week': 0
  }));

  expenses.forEach(expense => {
    const expDate = parseISO(expense.date);
    const dayIndex = expDate.getDay();

    if (isWithinInterval(expDate, { start: thisWeekStart, end: thisWeekEnd })) {
      data[dayIndex]['This Week'] += expense.amount;
    } else if (isWithinInterval(expDate, { start: lastWeekStart, end: lastWeekEnd })) {
      data[dayIndex]['Last Week'] += expense.amount;
    }
  });

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="name" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
          <YAxis tick={{fontSize: 12}} tickLine={false} axisLine={false} tickFormatter={(val) => `${currency}${val}`} />
          <Tooltip 
            formatter={(value) => `${currency}${value.toFixed(2)}`}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
          />
          <Legend iconType="circle" />
          <Bar dataKey="This Week" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
          <Bar dataKey="Last Week" fill="#94a3b8" radius={[4, 4, 0, 0]} maxBarSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
