# 🪙 Premium Expense Tracker

A modern, high-fidelity, and visually stunning Personal Finance and Expense Tracking web application. Built with **React 19**, **Vite**, **Tailwind CSS v4**, and **Zustand**, it features interactive dashboards, weekly/monthly charts, real-time budget tracking, local storage persistence, dark/light theme toggle, and PDF/CSV data exports.

---

## ✨ Features

- **📊 Comprehensive Financial Overview**: Real-time widgets tracking **Total Balance**, **Monthly Spending**, **Savings Goal**, and **Budget Limits** with color-coded alerts.
- **📈 Interactive Data Visualizations**:
  - *Monthly spending trend charts* (using Recharts).
  - *Category-based breakdown* (dynamic Pie Chart).
  - *Weekly comparison graphs* comparing current vs. previous week spending.
- **💸 Full Expense Management (CRUD)**: Add, edit, or delete transactions with titles, amounts, custom categories, dates, and recurring intervals.
- **🎯 Smart Budgeting**: Set global and category-specific budget limits with real-time, visual progress meters.
- **📁 Data Portability**: Export your transaction data instantly to **CSV** or print-ready **PDF** layouts.
- **⚙️ Personalization**: Custom currency symbols (€, $, £, ₹, ¥), system-wide persistent Dark/Light themes, and automatic weekly analytics summaries.
- **⚡ Offline-First Persistence**: Powered by Zustand middleware with local storage synchronization.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/) (Fast HMR)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) (with LocalStorage persist middleware)
- **Styling & Theme**: [Tailwind CSS v4](https://tailwindcss.com/) (Next-generation engine)
- **Charts**: [Recharts](https://recharts.org/) (Responsive SVG chart components)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (Hardware-accelerated micro-interactions)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Utility**: [Date-fns](https://date-fns.org/)
- **Alerts**: [React Hot Toast](https://react-hot-toast.com/)

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (version 18+ recommended).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sasivarun-24/Expense-Tracker.git
   cd Expense-Tracker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📁 File Structure

```text
src/
├── main.jsx                 # Application entrypoint
├── App.jsx                  # Main component with routing and global toast config
├── App.css                  # Custom styling overrides
├── index.css                # Tailwind configuration, color tokens, and base base-layers
├── assets/                  # Media and image files
├── store/
│   └── useExpenseStore.js   # Zustand global store & CRUD actions
├── pages/                   # Top-level routes
│   ├── Dashboard.jsx        # Overview, metrics & trend graphs
│   ├── Expenses.jsx         # CRUD log of all transactions
│   ├── Analytics.jsx        # Specialized charts & insights
│   ├── Budgets.jsx          # Budget progress tracking
│   ├── Reports.jsx          # Grid statistics & file exports
│   └── Settings.jsx         # Preferences, currency, & themes
└── components/              # Reusable UI Blocks
    ├── Layout/              # Sidebar & Navigation wrappers
    ├── Dashboard/           # Summary cards & list items
    ├── Expenses/            # Add/Edit forms and lists
    ├── Budgets/             # Budget progress meters
    └── Analytics/           # SVG Recharts components
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
