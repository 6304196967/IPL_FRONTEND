import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, User, Home, Gavel, Play } from 'lucide-react';
import '../styles/navbar.css'; // Assuming you have a CSS file for navbar styles
const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo and Navigation Links */}
          <div className="navbar-brand">
            <div className="navbar-logo" onClick={() => handleNavigation('/')}>
              <h1>IPL MOCK AUCTION SYSTEM</h1>
            </div>
            
            <div className="navbar-links">
              <ul className="navbar-links-list">
                <li>
                  <button onClick={() => handleNavigation('/dashboard')} className="navbar-link">
                    <Home size={20} />
                    <span>Home</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigation('/my-auctions')} className="navbar-link">
                    <Gavel size={20} />
                    <span>My Auctions</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigation('/upcoming-auctions')} className="navbar-link">
                    <Play size={20} />
                    <span>Upcoming</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigation('/joined-auctions')} className="navbar-link">
                    <Gavel size={20} />
                    <span>Joined</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="navbar-actions">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-button"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <button onClick={() => handleNavigation('/profile')} className="profile-button">
              <User size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <button onClick={() => handleNavigation('/dashboard')} className="mobile-menu-link">
            <Home size={20} />
            <span>Home</span>
          </button>
          <button onClick={() => handleNavigation('/my-auctions')} className="mobile-menu-link">
            <Gavel size={20} />
            <span>My Auctions</span>
          </button>
          <button onClick={() => handleNavigation('/upcoming-auctions')} className="mobile-menu-link">
            <Play size={20} />
            <span>Upcoming</span>
          </button>
          <button onClick={() => handleNavigation('/joined-auctions')} className="mobile-menu-link">
            <Gavel size={20} />
            <span>Joined</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;