import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useExpenseStore = create(
  persist(
    (set) => ({
      expenses: [],
      budgets: {
        total: 5000,
        Food: 1000,
        Travel: 500,
        Shopping: 1000,
        Bills: 1500,
        Entertainment: 500,
        Health: 500,
      },
      theme: 'light',
      currency: '€',
      isMobileMenuOpen: false,
      toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
      setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
      addExpense: (expense) =>
        set((state) => ({
          expenses: [{ ...expense, id: crypto.randomUUID() }, ...state.expenses],
        })),
      deleteExpense: (id) =>
        set((state) => ({
          expenses: state.expenses.filter((e) => e.id !== id),
        })),
      editExpense: (id, updatedExpense) =>
        set((state) => ({
          expenses: state.expenses.map((e) =>
            e.id === id ? { ...e, ...updatedExpense } : e
          ),
        })),
      updateBudget: (category, amount) =>
        set((state) => ({
          budgets: { ...state.budgets, [category]: amount },
        })),
      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { theme: newTheme };
        }),
      setTheme: (theme) =>
        set(() => {
          if (theme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { theme };
        }),
      setCurrency: (currency) => set({ currency }),
    }),
    {
      name: 'expense-storage',
    }
  )
);
