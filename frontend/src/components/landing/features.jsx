// FeaturesPreview.jsx
import React from 'react';
import { FaPiggyBank, FaChartLine, FaWallet, FaBell } from 'react-icons/fa';

const features = [
  { icon: <FaPiggyBank />, title: 'Budget Planning', desc: 'Easily set budgets for different categories and track progress.' },
  { icon: <FaChartLine />, title: 'Analytics & Reports', desc: 'Gain insights with visual reports on income, expenses, and savings.' },
  { icon: <FaWallet />, title: 'Expense Tracking', desc: 'Log daily expenses, upload receipts, and categorize transactions.' },
  { icon: <FaBell />, title: 'Smart Alerts', desc: 'Receive notifications for budget limits, bills, and goals.' }
];

const FeaturesPreview = () => {
  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">Why Choose BudgetBloom?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl transition">
              <div className="text-green-600 text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-700">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesPreview;
