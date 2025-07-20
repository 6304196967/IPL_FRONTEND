import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, User, Home, Gavel, Play } from 'lucide-react';
import '../styles/navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo and Navigation Links */}
          <div className="navbar-brand">
            <div className="navbar-logo">
              <h1>IPL MOCK Auction</h1>
            </div>
            
            <div className="navbar-links">
              <ul className="navbar-links-list">
                <li>
                  <button
                    onClick={() => handleNavigation('/dashboard')}
                    className="navbar-link"
                  >
                    <Home size={25} />
                    <span>Home</span>
                  </button>
                </li>
                
                <li>
                  <button
                    onClick={() => handleNavigation('/my-auctions')}
                    className="navbar-link"
                  >
                    <Gavel size={25} />
                    <span>My Auctions</span>
                  </button>
                </li>
                
                <li>
                  <button
                    onClick={() => handleNavigation('/upcoming-auctions')}
                    className="navbar-link"
                  >
                    <Play size={25} />
                    <span>Upcoming Auctions</span>
                  </button>
                  </li>
                  <li>
                  <button
                    onClick={() => handleNavigation('/joined-auctions')}
                    className="navbar-link"
                  >
                    <Gavel size={25} />
                    <span>Joined Auctions</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="navbar-actions">
            

            {/* Profile Button */}
            <button
              onClick={() => handleNavigation('/profile')}
              className="profile-button"
            >
              <User size={20} color="white" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="mobile-menu">
        <div className="mobile-menu-content">
          <button
            onClick={() => handleNavigation('/dashboard')}
            className="mobile-menu-link"
          >
            Home
          </button>
          <button
            onClick={() => handleNavigation('/my-auctions')}
            className="mobile-menu-link"
          >
            My Auctions
          </button>
          <button
            onClick={() => handleNavigation('/upcoming-auctions')}
            className="mobile-menu-link"
          >
            Upcoming Auctions
          </button>
          <button
            onClick={() => handleNavigation('/joined-auctions')}
            className="mobile-menu-link"
          >
            Joined Auctions   
            
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;