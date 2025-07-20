import React from 'react';
import Navbar from '../components/navbar';
import Hero from '../components/hero';
import '../styles/hero.css'; // Assuming you have a CSS file for dashboard styles
const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Navbar />
      <Hero />
    </div>
  );
};

export default Dashboard;