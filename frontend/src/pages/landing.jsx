import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/landing.css';

const LandingPage = () => {
  return (
    <div className="landingContainer">
    

      <main className="mainContent">
        <h1 className="mainTitle">
          Watch Your Finances Flourish 🌱
        </h1>
        <p className="mainDescription">
          BudgetBloom helps you track income, manage expenses, plan budgets, and achieve your financial goals—all in one secure platform.
        </p>
        <div className="ctaButtons">
          <Link to="/register" className="btnPrimary">
            Start Budgeting
          </Link>
          <Link to="/login" className="btnSecondary">
            I already have an account
          </Link>
        </div>
      </main>

      <section className="featuresSection">
        <h2 className="featuresTitle">Why Choose BudgetBloom?</h2>
        <div className="featuresGrid">
          {[
            { title: 'Track Income & Expenses', desc: 'Stay on top of every rupee you earn and spend.' },
            { title: 'Smart Budget Planning', desc: 'Create monthly budgets with custom alerts.' },
            { title: 'Insightful Reports', desc: 'Visualize trends and track goals with clarity.' }
          ].map((feature, index) => (
            <div key={index} className="featureCard">
              <h3 className="featureTitle">{feature.title}</h3>
              <p className="featureDescription">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 BudgetBloom. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
