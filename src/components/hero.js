import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Gavel, Play, Trophy, Users } from 'lucide-react';
import '../styles/navbar.css'; 
const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">IPL Mock Auction</h1>
            <p className="hero-subtitle">
              Create your dream team, participate in live auctions, and experience the thrill of IPL bidding
            </p>
            
            <div className="hero-actions">
              <button onClick={() => navigate('/create-auction')} className="hero-button primary">
                <Gavel size={20} />
                <span>Create Auction</span>
              </button>
              
              <button onClick={() => navigate('/upcoming-auctions')} className="hero-button secondary">
                <Play size={20} />
                <span>Join Auctions</span>
              </button>
            </div>
          </div>

          <div className="hero-features">
            <div className="feature-card">
              <Trophy className="feature-icon" size={32} />
              <h3>Premium Experience</h3>
              <p>Experience the real IPL auction atmosphere with live bidding</p>
            </div>
            
            <div className="feature-card">
              <Users className="feature-icon" size={32} />
              <h3>Multiplayer Action</h3>
              <p>Compete with friends and other cricket enthusiasts</p>
            </div>
            
            <div className="feature-card">
              <Gavel className="feature-icon" size={32} />
              <h3>Smart Bidding</h3>
              <p>Advanced bidding system with auto-bid options</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;