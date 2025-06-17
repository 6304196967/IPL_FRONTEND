import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronsRight } from 'lucide-react';
import '../styles/home.css'; // Ensure you have the correct path to your CSS file

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <div className="welcome-text">
          <h1 className="welcome-title">
            Welcome to <span className="highlight">Aarunya 2K25</span>
          </h1>
          <h2 className="welcome-subtitle">IPL Mock Auction Dashboard</h2>
          <p className="welcome-description">
            Experience the thrill of IPL auctions with real-time tracking, team analysis, 
            and player statistics. Build your dream team and dominate the virtual league!
          </p>
          <button 
            className="get-started-button"
            onClick={() => navigate('/main')}
          >
            Get Started
            <ChevronsRight size={20} className="button-icon" />
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default WelcomePage;