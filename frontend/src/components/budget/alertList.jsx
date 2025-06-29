import React from 'react';

const AlertsList = ({ budgets }) => {
  const alerts = budgets.filter(b => b.spent > b.amount * 0.9);

  if (alerts.length === 0) return null;

  return (
    <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500">
      <h4 className="font-bold text-yellow-700 mb-2">⚠ Budget Alerts</h4>
      <ul className="list-disc ml-4">
        {alerts.map((b, i) => (
          <li key={i}>
            {b.name}: Spent ₹{b.spent} of ₹{b.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertsList;
