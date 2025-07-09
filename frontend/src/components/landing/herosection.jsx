
// HeroSection.jsx
import React from 'react';
import { Link, Links } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="bg-green-50 py-20 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-2 text-green-800">
          Watch Your Finances Flourish
        </h1>
        <div className="mb-6 text-4xl" aria-hidden="true">🌱</div>
        <div> <Link to = "/rating">  <button>Ratings</button></Link></div>
        <p className="text-gray-700 text-lg md:text-xl mb-8 max-w-xl mx-auto">
          BudgetBloom helps you track income, manage expenses, plan budgets, and achieve your financial goals—all in one secure platform.
        </p>
        <div  style={{ display :"flex", gap: "20px", justifyContent: "center", alignItems: "center" }}>
         <div>
         <Link to = "/register" className="bg-green-700 text-white font-semibold py-3 px-6 rounded-md shadow-md hover:bg-green-800 transition">
                  <button>   Start Budgeting</button>

         </Link>
          </div>
         <div>
          <Link to = "/login" className=" text-green-700 font-semibold py-3 px-6 rounded -md hover:bg-green-100 transition">
                   <button>   I already have an account</button>

          </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
