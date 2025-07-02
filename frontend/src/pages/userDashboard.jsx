// // UserDashboard.jsx
// import SummaryCards from '../components/userDashboard/summaryCard';
// import QuickAddTransaction from '../components/userDashboard/addTransactions';
// import RecentActivityList from '../components/userDashboard/recentActivity';
// import GoalProgressBar from '../components/userDashboard/goals';
// import { Link } from 'react-router-dom';
// import { useState,useEffect } from 'react';
// import "../styles/userDashboard.css"


// const UserDashboard = () => {
//   const [incomedata , setIncomedata] = useState([])
//   const [expenseData, setExpenseData] = useState([])

// useEffect(
//   () =>{
//     const fetchIncomedata = async () =>
//       {
//         const response = await fetch('http://localhost:3201/getIncome');
//         const data = await response.json();
//         setIncomedata(data)
//         }
//         fetchIncomedata()
//         }, []
//         );
//         useEffect(() =>{
//           const fetchExpensedata = async () => {
//             const response = await fetch('http://localhost:3201/expenses');
//             const data = await response.json();
//             setExpenseData(data)

//           }
//           fetchExpensedata()
//         }, [])




//   return (
//     <div className="min-h-screen bg-green-50 px-6 py-8">
//       <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">Welcome to BudgetBloom</h1>
//       <Link to="/income" className="text-green-700 hover:text-green-900">
//             <h1 >Add Income</h1>
//       </Link>
//       <Link to="/expenses" className="text-green-700 hover:text-green-900">
//       <h4>Expenses</h4>
//       </Link>
//       <Link to = "/budgetpage" className="text-green-700 hover:text-green-900"> Budget</Link> <br />
//       <Link to = "/goalsTrackerpage" className="text-green-700 hover:text-green-900" >  
//       Goals Tracker</ Link>     
//       <Link to = "/reports" className='' >Reports</Link>
//       <Link to = "/settings" className='' > Settings</Link>
//       <SummaryCards incomedata ={incomedata} expenseData ={expenseData} />
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
//         <div className="lg:col-span-2 space-y-6">
//             <QuickAddTransaction />
//             <RecentActivityList />
//                      <GoalProgressBar />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;




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

    const fetchDashboardData = async () => {
      try {
        const [incomeRes, expenseRes] = await Promise.all([
          fetch('https://budgetbloom-app.onrender.com/getIncome', { signal: controller.signal }),
          fetch('https://budgetbloom-app.onrender.com/expenses', { signal: controller.signal }),
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
      <div className="flex flex-wrap gap-4 justify-center mb-8 text-green-700 font-medium">
        {links.map(({ to, label }) => (
          <Link key={to} to={to} className="hover:underline hover:text-green-900">
            {label}
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-green-50 px-6 py-8 dark:bg-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold text-green-800 text-center mb-6 dark:text-green-300">
        Welcome to <span className="text-green-600 dark:text-green-400">BudgetBloom</span>
      </h1>

      {/* Navigation Links */}
      <DashboardNavLinks />

      {/* Summary Section */}
      {loading ? (
        <div className="text-center text-gray-500 animate-pulse">Loading dashboard data...</div>
      ) : error ? (
        <div className="text-center text-red-600 font-semibold">{error}</div>
      ) : (
        <SummaryCards incomedata={incomedata} expenseData={expenseData} />
      )}

      {/* Widgets Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 space-y-6"> 
          <QuickAddTransaction />
          <RecentActivityList />
          <GoalProgressBar />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
