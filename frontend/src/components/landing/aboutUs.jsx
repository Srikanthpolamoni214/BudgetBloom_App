import React from 'react';

const AboutUs = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-12 px-6 md:px-16">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
          About BudgetBloom
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
          BudgetBloom is a personal finance management platform built to help individuals take control of their finances with clarity and confidence. Whether you're a student, freelancer, or family manager, BudgetBloom gives you the tools to track your income and expenses, visualize spending habits, and set savings goals.
        </p>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
          Designed with simplicity and user experience in mind, BudgetBloom combines real-time insights, exportable reports, and smart budgeting tools in one intuitive dashboard. Our mission is to empower everyone to grow their financial future—one bloom at a time.
        </p>
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-100 mb-4">
            Why Choose BudgetBloom?
          </h3>
          <ul className="text-left list-disc list-inside text-gray-600 dark:text-gray-300 text-md space-y-2">
            <li>Clean and beautiful user interface</li>
            <li>Powerful insights and analytics</li>
            <li>Secure login with JWT authentication</li>
            <li>Track income and expenses effortlessly</li>
            <li>Visualize goals with progress bars and charts</li>
            <li>Export data to PDF and Excel formats</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
