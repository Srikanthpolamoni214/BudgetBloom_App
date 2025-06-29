// LandingPage.jsx
import React from 'react';
import HeroSection from '../components/landing/herosection';
import FeaturesPreview from '../components/landing/features';
import GetStartedCTA from '../components/landing/getstartes';
import Footer from '../components/landing/footer';
import "../styles/landingpage.css"

const LandingPage = () => {
  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
  {/* Page Content */}

    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturesPreview />
      <GetStartedCTA/>
      <Footer />
    
    </div>
    </div>
  );
};

export default LandingPage;
