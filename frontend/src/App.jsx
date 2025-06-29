import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Pages
import LandingPage from './pages/landingpage';
import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import UserDashboard from './pages/userDashboard';
import IncomePage from './pages/income';
import ExpensePage from './pages/expensespage';
import BudgetPage from './pages/budgetpage';
import GoalsPage from './pages/goalspage';
import ReportsPage from './pages/reports';
import SettingsPage from './pages/settings';

// Components
import Navbar from './components/navbar/navbar';

const App = () => {
  return (
      <BrowserRouter>
        {/* Global Navigation Bar */}
        <div className="bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">

          <Navbar />

          {/* App Routing */}
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Routes (Add auth guard if needed) */}
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/income" element={<IncomePage />} />
            <Route path="/expenses" element={<ExpensePage />} />
            <Route path="/budgetpage" element={<BudgetPage />} />
            <Route path="/goalsTrackerpage" element={<GoalsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </BrowserRouter>
  );
};

export default App;
