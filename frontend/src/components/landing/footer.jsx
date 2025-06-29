
// Footer.jsx
import React from 'react';
const Footer = () => {
  return (
    <footer className="bg-green-700 text-white py-6 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <p className="text-sm">&copy; {new Date().getFullYear()} BudgetBloom. All rights reserved.</p>
        <div className="mt-2 text-xs">
          <a href="/privacy" className="hover:underline mx-2 text-green-200 hover:text-white">Privacy Policy</a>
          <a href="/terms" className="hover:underline mx-2 text-green-200 hover:text-white">Terms of Service</a>
          <a href="mailto:support@budgetapp.com" className="hover:underline mx-2 text-green-200 hover:text-white">Contact Support</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
