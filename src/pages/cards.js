import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Franchisecards.css'; // Ensure you have the correct path to your CSS file
const franchises = [
  {
    name: 'Royal Challengers Bangalore',
    shortName: 'RCB',
    logo: 'https://th.bing.com/th/id/OIP.FteqEE-elRk0NvABZdWChgHaHa?w=181&h=181&c=7&r=0&o=5&dpr=1.8&pid=1.7',
    website: 'https://www.royalchallengers.com/',
    primaryColor: '#EC1C24',
    secondaryColor: '#FFD700'
  },
  {
    name: 'Chennai Super Kings',
    shortName: 'CSK',
    logo: 'https://th.bing.com/th/id/OIP.Gq0OuTy8LZvblFIVt8mASgHaGG?w=275&h=226&c=8&rs=1&qlt=90&o=6&dpr=1.8&pid=3.1&rm=2',
    website: 'https://www.chennaisuperkings.com/',
    primaryColor: '#FDB900',
    secondaryColor: '#00A7E1'
  },
  {
    name: 'Mumbai Indians',
    shortName: 'MI',
    logo: 'https://www.pngall.com/wp-content/uploads/2017/04/Mumbai-Indians-Logo-PNG.png',
    website: 'https://www.mumbaiindians.com/',
    primaryColor: '#004C93',
    secondaryColor: '#FFD200'
  },
  {
    name: 'Lucknow Super Giants',
    shortName: 'LSG',
    logo: 'https://th.bing.com/th/id/OIP.P_aqCIUNS1UBuLtVmgaOnwHaEK?w=324&h=182&c=7&r=0&o=5&dpr=1.8&pid=1.7',
    website: 'https://www.lucknowsupergiants.in/',
    primaryColor: '#00A8CC',
    secondaryColor: '#FF6B35'
  },
  {
    name: 'Sunrisers Hyderabad',
    shortName: 'SRH',
    logo: 'https://th.bing.com/th/id/OIP.cMarPH0NiYx4KXdB8xI9hgHaFj?w=185&h=180&c=7&r=0&o=5&dpr=1.8&pid=1.7',
    website: 'https://www.sunrisershyderabad.in/',
    primaryColor: '#FF822A',
    secondaryColor: '#000000'
  },
  {
    name: 'Delhi Capitals',
    shortName: 'DC',
    logo: 'https://upload.wikimedia.org/wikipedia/en/2/2f/Delhi_Capitals.svg',
    website: 'https://www.delhicapitals.in/',
    primaryColor: '#17479E',
    secondaryColor: '#ED1C24'
  },
  {
    name: 'Rajasthan Royals',
    shortName: 'RR',
    logo: 'https://th.bing.com/th/id/OIP.r4olHUnlB1H8wbPgKdrreQHaLm?w=115&h=180&c=7&r=0&o=5&dpr=1.8&pid=1.7',
    website: 'https://www.rajasthanroyals.com/',
    primaryColor: '#E4007C',
    secondaryColor: '#FDB900'
  },
  {
    name: 'Punjab Kings',
    shortName: 'PBKS',
    logo: 'https://upload.wikimedia.org/wikipedia/en/d/d4/Punjab_Kings_Logo.svg',
    website: 'https://www.punjabkings.in/',
    primaryColor: '#DC1F26',
    secondaryColor: '#B49C2F'
  },
  {
    name: 'Gujarat Titans',
    shortName: 'GT',
    logo: 'https://th.bing.com/th/id/OIP.QEIvRb7cLrg6MYmdfwnvBgHaHa?w=171&h=180&c=7&r=0&o=5&dpr=1.8&pid=1.7',
    website: 'https://www.gujarattitansipl.com/',
    primaryColor: '#1B2951',
    secondaryColor: '#B49C2F'
  },
  {
    name: 'Kolkata Knight Riders',
    shortName: 'KKR',
    logo: 'https://th.bing.com/th/id/OIP.TWWj4uj37BzbxEfJNGpuIAAAAA?w=117&h=180&c=7&r=0&o=5&dpr=1.8&pid=1.7',
    website: 'https://www.kkr.in/',
    primaryColor: '#3A225D',
    secondaryColor: '#B49C2F'
  },
  
];

const FranchiseCards = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
const navigate = useNavigate();
   const handleCardClick = (shortName) => {
  navigate(`/franchise/${shortName}`);
};

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      padding: '2rem 1rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header Section */}
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem',
        color: 'white'
      }}>
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: '800',
          background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem',
          textShadow: '0 4px 8px rgba(0,0,0,0.3)'
        }}>
          IPL Franchises
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: '#a0a0a0',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Discover the power-packed teams of the Indian Premier League
        </p>
      </div>

      {/* Cards Container */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        {franchises.map((team) => (
          <div
            key={team.shortName}
            onClick={() => handleCardClick(team.shortName)}
            onMouseEnter={() => setHoveredCard(team.shortName)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              background: hoveredCard === team.shortName 
                ? `linear-gradient(135deg, ${team.primaryColor}20, ${team.secondaryColor}20)`
                : 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)',
              border: hoveredCard === team.shortName 
                ? `2px solid ${team.primaryColor}` 
                : '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '2rem',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: hoveredCard === team.shortName ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
              boxShadow: hoveredCard === team.shortName 
                ? `0 20px 40px rgba(0,0,0,0.3), 0 0 30px ${team.primaryColor}30`
                : '0 8px 25px rgba(0,0,0,0.15)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Animated Background */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(45deg, ${team.primaryColor}10, ${team.secondaryColor}10)`,
              opacity: hoveredCard === team.shortName ? 1 : 0,
              transition: 'opacity 0.3s ease',
              borderRadius: '20px'
            }} />

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              {/* Logo Container */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                position: 'relative'
              }}>
                <div style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${team.primaryColor}20, ${team.secondaryColor}20)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `2px solid ${team.primaryColor}30`,
                  transform: hoveredCard === team.shortName ? 'rotate(5deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }}>
                  <img className="imgp1"
                    src={team.logo}
                    alt={`${team.name} Logo`}
                    style={{
                      width: '70px',
                      height: '70px',
                      objectFit: 'contain',
                      filter: hoveredCard === team.shortName ? 'brightness(1.2)' : 'brightness(1)'
                    }}
                  />
                </div>
              </div>

              {/* Team Name */}
              <h3 style={{
                fontSize: '1.4rem',
                fontWeight: '700',
                color: 'white',
                textAlign: 'center',
                marginBottom: '1rem',
                lineHeight: '1.3'
              }}>
                {team.name}
              </h3>

              {/* Short Name Badge */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <div style={{
                  background: `linear-gradient(135deg, ${team.primaryColor}, ${team.secondaryColor})`,
                  color: 'white',
                  padding: '0.5rem 1.5rem',
                  borderRadius: '25px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  boxShadow: `0 4px 15px ${team.primaryColor}40`
                }}>
                  {team.shortName}
                </div>
              </div>

              {/* Click Indicator */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: team.primaryColor,
                fontSize: '1.2rem',
                fontWeight: '600',
                opacity: hoveredCard === team.shortName ? 1 : 0.6,
                transform: hoveredCard === team.shortName ? 'translateX(5px)' : 'translateX(0)',
                transition: 'all 0.3s ease'
              }}>
                View Squad →
              </div>
            </div>

            {/* Shine Effect */}
            <div style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
              transform: hoveredCard === team.shortName ? 'translateX(100%)' : 'translateX(-100%)',
              transition: 'transform 0.6s ease',
              pointerEvents: 'none'
            }} />
          </div>
        ))}
      </div>

      {/* Bottom Decoration */}
      <div style={{
        textAlign: 'center',
        marginTop: '4rem',
        color: '#666'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '1rem'
        }}>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                animation: `pulse 2s infinite ${i * 0.2}s`
              }}
            />
          ))}
        </div>
        <p style={{
          fontSize: '1rem',
          color: '#888'
        }}>
          Click any team to explore their squad
        </p>
      </div>

      {/* Back Button */}
      <button
        onClick={() => window.location.assign('/')}
        style={{
          position: 'fixed',
          bottom: '32px',
          right: '32px',
          padding: '12px 24px',
          borderRadius: '50px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff',
          border: 'none',
          fontSize: '1rem',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
          zIndex: 1000,
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 12px 35px rgba(0,0,0,0.4)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
        }}
      >
        ← Back
      </button>

      {/* Global Styles */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};

export default FranchiseCards;