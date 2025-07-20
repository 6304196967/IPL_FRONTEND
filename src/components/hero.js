import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Gavel, Play, Trophy, Users } from 'lucide-react';
import '../styles/hero.css';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-container">
      <div className="hero-overlay"></div>
      
      <div className="hero-content">
        <div className="hero-inner">
          <h1 className="hero-title">IPL Mock Auction</h1>
          <p className="hero-subtitle">
            Create your dream team, participate in live auctions, and experience the thrill of IPL bidding like never before
          </p>
          
          <div className="hero-actions">
            <button
              onClick={() => navigate('/create-auction')}
              className="hero-button hero-button-primary"
            >
              <Gavel size={20} />
              <span>Create Your Auction</span>
            </button>
            
            <button
              onClick={() => navigate('/ongoing-auctions')}
              className="hero-button hero-button-secondary"
            >
              <Play size={20} />
              <span>Join Ongoing Auctions</span>
            </button>
          </div>

          <div className="hero-features">
            <div className="feature-card">
              <Trophy className="feature-icon" size={48} />
              <h3 className="feature-title">Premium Experience</h3>
              <p className="feature-description">
                Experience the real IPL auction atmosphere with live bidding and real-time updates
              </p>
            </div>
            
            <div className="feature-card">
              <Users className="feature-icon" size={48} />
              <h3 className="feature-title">Multiplayer Action</h3>
              <p className="feature-description">
                Compete with friends and other cricket enthusiasts in dynamic auction rooms
              </p>
            </div>
            
            <div className="feature-card">
              <Gavel className="feature-icon" size={48} />
              <h3 className="feature-title">Smart Bidding</h3>
              <p className="feature-description">
                Advanced bidding system with auto-bid options and strategic insights
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;