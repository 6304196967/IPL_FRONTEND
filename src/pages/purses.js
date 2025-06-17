import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, IndianRupee, Wallet } from 'lucide-react';
import '../styles/purses.css'; // Ensure you have the correct path to your CSS file

const franchises = [
  "CSK", "MI", "RCB", "KKR", "SRH",
  "DC", "RR", "PBKS", "GT", "LSG"
];

const maxPurse = 10000; // Total purse in Lakhs

const FranchisePurses = () => {
  const [purses, setPurses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Team colors mapping
  const teamColors = {
    'CSK': '#fcd34d', // Yellow
    'MI': '#005daa', // Blue
    'RCB': '#ec1c24', // Red
    'KKR': '#3a225d', // Purple
    'SRH': '#ff822a', // Orange
    'DC': '#004c93', // Blue
    'RR': '#ff3266', // Pink
    'PBKS': '#aa4545', // Red
    'GT': '#0c4b9a', // Blue
    'LSG': '#00b5b5' // Teal
  };

  useEffect(() => {
    const fetchPurses = async () => {
      setIsLoading(true);
      const data = [];
      
      try {
        for (let team of franchises) {
          const response = await fetch(`http://localhost:3000/players/${team}`);
          const players = await response.json();
          const totalSpent = players.reduce((acc, p) => acc + (parseFloat(p['Sold Price']) || 0), 0);
          data.push({
            team,
            spent: totalSpent,
            remaining: maxPurse - totalSpent,
            playersCount: players.length
          });
        }
        setPurses(data);
      } catch (err) {
        console.error('Error fetching purse data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPurses();
  }, []);

  // Sort by remaining purse (highest first)
  const sortedPurses = [...purses].sort((a, b) => b.remaining - a.remaining);

  return (
    <div className="purses-container">
      <div className="purses-header">
        <h1 className="purses-title">
          <Wallet size={36} className="purse-icon" />
          IPL Franchise Purses
        </h1>
        <p className="purses-subtitle">Team Budgets & Spending Analysis</p>
      </div>
 {isLoading ? (
  <div className="bouncing-dots">
    <div></div>
    <div></div>
    <div></div>
  </div>
) : (
        <div className="purses-grid">
          {sortedPurses.map(({ team, spent, remaining, playersCount }) => {
            const spentPercentage = (spent / maxPurse) * 100;
            const remainingPercentage = 100 - spentPercentage;
            
            return (
              <div 
                key={team} 
                className="purse-card"
                style={{ borderTop: `4px solid ${teamColors[team]}` }}
              >
                <div className="team-header">
                  <h2 className="team-name">{team}</h2>
                  <span className="team-players">{playersCount} players</span>
                </div>
                
                <div className="purse-progress">
                  <div 
                    className="progress-bar" 
                    style={{ width: `${spentPercentage}%` }}
                  ></div>
                </div>
                
                <div className="purse-stats">
                  <div className="stat">
                    <div className="stat-label">Remaining</div>
                    <div className="stat-value remaining">
                      <IndianRupee size={16} />
                      {remaining.toLocaleString('en-IN')} L
                    </div>
                    <div className="stat-percentage">{remainingPercentage.toFixed(1)}%</div>
                  </div>
                  
                  <div className="stat">
                    <div className="stat-label">Spent</div>
                    <div className="stat-value spent">
                      <IndianRupee size={16} />
                      {spent.toLocaleString('en-IN')} L
                    </div>
                    <div className="stat-percentage">{spentPercentage.toFixed(1)}%</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <button 
        className="floating-back-button"
        onClick={() => navigate('/')}
      >
        <ArrowLeft size={20} />
        Back to Dashboard
      </button>
    </div>
  );
};

export default FranchisePurses;