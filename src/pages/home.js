import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronsRight } from 'lucide-react';
import '../styles/home.css';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-page">
      <button 
        className="sign-in-button"
        onClick={() => navigate('/signin')}
      >
        Sign In
      </button>
      
      <div className="welcome-container">
        <div className="welcome-content">
          <div className="welcome-text">
            <h1 className="welcome-title">
              Welcome to
            </h1>
            <h2 className="welcome-subtitle">IPL Mock Auction Dashboard</h2>
            <p className="welcome-description">
              Experience the thrill of IPL auctions with real-time tracking, team analysis, 
              and player statistics. Create auctions and Organize the event.
              join auctions and build your dream team and dominate the virtual league!
            </p>
            <button 
              className="get-started-button"
              onClick={() => navigate('/signup')}
            >
              Get Started
              <ChevronsRight size={20} className="button-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;