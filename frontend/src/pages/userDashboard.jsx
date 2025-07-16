import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SummaryCards from '../components/userDashboard/summaryCard';
import QuickAddTransaction from '../components/userDashboard/addTransactions';
import RecentActivityList from '../components/userDashboard/recentActivity';
import GoalProgressBar from '../components/userDashboard/goals';
import "../styles/userDashboard.css";

const UserDashboard = () => {
  const [incomedata, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const token = localStorage.getItem("token");
    const fetchDashboardData = async () => {
      try {
        const [incomeRes, expenseRes] = await Promise.all([
          fetch('http://localhost:3201/getIncome', { headers: {
            Authorization: `Bearer ${token}`
          }}, { signal: controller.signal }),
          fetch('http://localhost:3201/expenses', { headers: {
            Authorization: `Bearer ${token}`
          }}, { signal: controller.signal }),
        ]);

        const incomeJson = await incomeRes.json();
        const expenseJson = await expenseRes.json();

        setIncomeData(incomeJson);
        setExpenseData(expenseJson);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('⚠️ Failed to fetch dashboard data.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

    return () => controller.abort();
  }, []);

  const DashboardNavLinks = () => {
    const links = [
      { to: "/income", label: "➕ Add Income" },
      { to: "/expenses", label: "💸 Expenses" },  
      { to: "/budgetpage", label: "📊 Budget" },
      { to: "/goalsTrackerpage", label: "🎯 Goals Tracker" },
      { to: "/reports", label: "📈 Reports" },
      { to: "/settings", label: "⚙️ Settings" },
    ];

    return (
      <nav aria-label="Dashboard navigation" className="flex flex-wrap gap-4 justify-center mb-8 text-green-700 font-medium">
        {links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className="hover:underline hover:text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-2 py-1 transition"
          >
            {label}
          </Link>
        ))} 
      </nav>
    );
  };
  
  return (
    <main className="min-h-screen bg-green-50 px-4 sm:px-6 md:px-12 py-8 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <h1 className="text-3xl font-extrabold text-green-800 text-center mb-6 dark:text-green-300">
        Welcome to <span className="text-green-600 dark:text-green-400">BudgetBloom</span>
      </h1>

      {/* Navigation Links */}
      <DashboardNavLinks />

      {/* Summary Section */}
      {loading ? (
        <div className="text-center text-gray-500 animate-pulse" role="status" aria-live="polite">
          Loading dashboard data...
        </div>
      ) : error ? (
        <div className="text-center text-red-600 font-semibold" role="alert">
          {error}
        </div>
      ) : (
        <SummaryCards incomedata={incomedata} expenseData={expenseData} />
      )}

      {/* Widgets Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 space-y-6">
          <QuickAddTransaction />
          <RecentActivityList />
          <GoalProgressBar />
        </div>
      </section>
    </main>
  );
};

export default UserDashboard;
