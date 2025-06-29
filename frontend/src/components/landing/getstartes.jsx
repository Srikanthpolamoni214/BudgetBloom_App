
// GetStartedCTA.jsx
import React from 'react';

const GetStartedCTA = () => {
  return (
    <section className="bg-green-600 text-white py-16 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to take control of your finances?</h2>
        <p className="text-lg mb-8">Join thousands who are transforming their money habits with BudgetBloom.</p>
        <a href="/register" className="bg-white text-green-600 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-green-100 transition">Create Your Account</a>
      </div>
    </section>
  );
};

export default GetStartedCTA;

