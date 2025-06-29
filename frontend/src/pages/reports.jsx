import React from "react";
import SpendingTrendChart from "../components/reports/spendingTrendChart";
import IncomeVsExpenseGraph from "../components/reports/incomeVsspending";
import BudgetComparisonTable from "../components/reports/budgetComparisonTable";
import SavingsGrowthChart from "../components/reports/savingsGrowthChart";
import ExportPDFButton from "../components/reports/exportpdf";

const ReportsPage = () => {
  return (
    <div className="p-6 space-y-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <h2 className="text-3xl font-bold">📈 Reports & Analytics</h2>

      <SpendingTrendChart />
      <IncomeVsExpenseGraph />
      <BudgetComparisonTable />
      <SavingsGrowthChart />
      <ExportPDFButton />
    </div>
  );
};

export default ReportsPage;
