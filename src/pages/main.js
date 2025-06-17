import React, { useState, useEffect, useCallback } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Plus, Minus, Users, Star, Award, IndianRupee } from 'lucide-react';
import '../styles/main.css';

const Main = () => {
  const [players, setPlayers] = useState([]);
  const [unsoldPlayers, setUnsoldPlayers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showUnsoldOnly, setShowUnsoldOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingPriceUpdates, setPendingPriceUpdates] = useState(new Map());
  
  const navigate = useNavigate();

  // Team colors mapping
  const teamColors = {
    'RCB': '#FF0000',
    'CSK': '#FFFF00',
    'MI': '#004BA0',
    'KKR': '#3A225D',
    'SRH': '#FF822A',
    'RR': '#FF3266',
    'DC': '#004C93',
    'PBKS': '#AA4545',
    'LSG': '#00B5B5',
    'GT': '#5C8FD6'
  };

  useEffect(() => {
    fetchAllData();
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const [allPlayersRes, unsoldPlayersRes] = await Promise.all([
        fetch('http://localhost:3000/players'),
        fetch('http://localhost:3000/unsoldplayers')
      ]);
      
      const allPlayers = await allPlayersRes.json();
      const unsoldPlayers = await unsoldPlayersRes.json();
      
      setPlayers(allPlayers);
      setUnsoldPlayers(unsoldPlayers);
    } catch (error) {
      console.error('Error fetching data:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to load player data',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (!filteredPlayers[currentIndex]) return;
    
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
    }
    
    switch(e.key) {
      case 'ArrowUp':
        updatePriceOptimized(filteredPlayers[currentIndex]['Player Name'], 'increase');
        break;
      case 'ArrowDown':
        updatePriceOptimized(filteredPlayers[currentIndex]['Player Name'], 'decrease');
        break;
      case 'ArrowLeft':
        showPrevious();
        break;
      case 'ArrowRight':
      case 'Enter':
        showNext();
        break;
      default:
        break;
    }
  };

  const formatPrice = (price) => {
    return price ? new Intl.NumberFormat('en-IN').format(price) : '0';
  };

  const updatePriceOptimized = useCallback((playerName, action) => {
    const currentPlayer = players.find(p => p['Player Name'] === playerName);
    if (!currentPlayer) return;

    const basePrice = currentPlayer['Base'] || 0;
    let currentPrice = currentPlayer['Sold Price'] || basePrice;
    let increment = getIncrement(currentPrice);

    let newPrice = calculateNewPrice(currentPrice, basePrice, action, increment);

    // Optimistic UI update
    updatePlayerState(playerName, newPrice);

    // Debounce API call
    debouncePriceUpdate(playerName, action, newPrice);
  }, [players]);

  const getIncrement = (price) => {
    if (price >= 500) return 50;
    if (price >= 100) return 25;
    return 10;
  };

  const calculateNewPrice = (current, base, action, increment) => {
    if (action === 'increase') return current + increment;
    
    const possibleReductions = [50, 25, 10].filter(i => i <= current - base);
    return possibleReductions.length > 0 
      ? current - Math.max(...possibleReductions)
      : base;
  };

  const updatePlayerState = (playerName, newPrice) => {
    setPlayers(prev => prev.map(p => 
      p['Player Name'] === playerName ? { ...p, 'Sold Price': newPrice } : p
    ));
    
    setUnsoldPlayers(prev => prev.map(p => 
      p['Player Name'] === playerName ? { ...p, 'Sold Price': newPrice } : p
    ));
  };

  const debouncePriceUpdate = (playerName, action, newPrice) => {
    setPendingPriceUpdates(prev => new Map(prev).set(playerName, { action, newPrice }));

    const timeoutId = setTimeout(() => {
      sendPriceUpdateToServer(playerName, action, newPrice);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  const sendPriceUpdateToServer = async (playerName, action, newPrice) => {
    try {
      const response = await fetch('http://localhost:3000/updatePrice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerName, action, newPrice }),
      });
      
      const updatedPlayer = await response.json();
      
      updatePlayerState(updatedPlayer['Player Name'], updatedPlayer['Sold Price']);
      
      setPendingPriceUpdates(prev => {
        const newMap = new Map(prev);
        newMap.delete(playerName);
        return newMap;
      });
      
    } catch (error) {
      console.error('Error updating price:', error);
    }
  };

  const assignFranchise = async (playerName, franchise) => {
    try {
      const currentPlayer = players.find(p => p['Player Name'] === playerName);
      if (!currentPlayer) return;

      const soldPrice = currentPlayer['Sold Price'] || currentPlayer['Base'] || 0;

      const response = await fetch('http://localhost:3000/assignFranchise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerName, franchiseName: franchise, soldPrice }),
      });
      
      const updatedPlayer = await response.json();
      
      setPlayers(prev => prev.map(p => 
        p['Player Name'] === updatedPlayer['Player Name'] 
          ? { ...p, Status: 'Sold', Franchise: franchise } 
          : p
      ));
      
      setUnsoldPlayers(prev => prev.filter(p => p['Player Name'] !== updatedPlayer['Player Name']));

      await Swal.fire({
        title: 'Sold!',
        html: `<div>
          <p>${playerName} sold to <strong style="color: ${teamColors[franchise]}">${franchise}</strong></p>
          <p>For <strong>₹${formatPrice(soldPrice)} Lakhs</strong></p>
        </div>`,
        icon: 'success',
        confirmButtonColor: teamColors[franchise],
        background: '#1e293b',
        color: '#ffffff'
      });

      showNext();
    } catch (error) {
      console.error('Error assigning franchise:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to assign franchise',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
    }
  };

  const markUnsold = async (playerName) => {
    try {
      const response = await fetch('http://localhost:3000/markUnsold', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerName }),
      });
      
      const updatedPlayer = await response.json();
      
      setPlayers(prev => prev.map(p => 
        p['Player Name'] === updatedPlayer['Player Name'] 
          ? { ...p, Status: 'Unsold', Franchise: '', 'Sold Price': updatedPlayer.Base } 
          : p
      ));
      
      setUnsoldPlayers(prev => [
        ...prev.filter(p => p['Player Name'] !== updatedPlayer['Player Name']),
        { ...updatedPlayer, Status: 'Unsold', Franchise: '', 'Sold Price': updatedPlayer.Base }
      ]);

      await Swal.fire({
        title: 'Unsold!',
        text: `${playerName} marked as unsold. New base price: ₹${formatPrice(updatedPlayer.Base)} Lakhs`,
        icon: 'info',
        confirmButtonColor: '#f59e0b',
        background: '#1e293b',
        color: '#ffffff'
      });

      showNext();
    } catch (error) {
      console.error('Error marking unsold:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to mark player as unsold',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
    }
  };

  const showNext = () => {
    if (filteredPlayers.length > 0) {
      setCurrentIndex(prev => (prev + 1) % filteredPlayers.length);
    }
  };

  const showPrevious = () => {
    if (filteredPlayers.length > 0) {
      setCurrentIndex(prev => (prev - 1 + filteredPlayers.length) % filteredPlayers.length);
    }
  };

  const toggleUnsoldView = () => {
    setCurrentIndex(0);
    setShowUnsoldOnly(!showUnsoldOnly);
  };

  const franchises = Object.keys(teamColors);
  const filteredPlayers = showUnsoldOnly ? unsoldPlayers : players;
  const currentPlayer = filteredPlayers[currentIndex] || {};

  if (isLoading) {
    return (
       <div className="bouncing-dots">
    <div></div>
    <div></div>
    <div></div>
  </div>
    );
  }

  return (
    <div className="main-container">
      <div className="background-overlay"></div>
      
      <h1 className="auction-title">AARUNYA 2K25 IPL MOCK AUCTION</h1>
      
      <div className="utility-buttons">
        <button 
          onClick={() => navigate('/franchisecards')} 
          className="results-btn"
        >
          Franchise Results
        </button>
        <button 
          onClick={() => navigate('/purses')} 
          className="purses-btn"
        >
          Team Purses
        </button>
      </div>
      
      {filteredPlayers.length === 0 ? (
        <div className="empty-state">
          <Users size={48} />
          <h3>No players found</h3>
          <p>{showUnsoldOnly ? 'All players have been sold!' : 'No players available'}</p>
        </div>
      ) : (
        <div className="player-display">
          <div className="player-card1">
            {currentPlayer['Status'] === 'Sold' && (
              <div className="player-status sold-status">
                SOLD TO {currentPlayer['Franchise']}
              </div>
            )}
            {currentPlayer['Status'] === 'Unsold' && (
              <div className="player-status unsold-status">UNSOLD</div>
            )}
            
            <div className="player-image-container">
              <img 
                src={currentPlayer['Image'] || 'https://via.placeholder.com/300x300?text=No+Image'} 
                alt={currentPlayer['Player Name']} 
                className="player-img" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                }}
              />
              <div className="player-price-tag">
                <IndianRupee size={18} /> {formatPrice(currentPlayer['Sold Price'] || currentPlayer['Base'])} L
              </div>
            </div>
            
            <div className="player-info">
              <h2 className="player-name">{currentPlayer['Player Name']}</h2>
              <div className="player-details">
                <p><strong>Age:</strong> {currentPlayer['Age'] || 'N/A'}</p>
                <p><strong>Country:</strong> {currentPlayer['Country'] || 'N/A'}</p>
                <p><strong>Role:</strong> {currentPlayer['Role'] || 'N/A'}</p>
                <p><strong>Base Price:</strong> ₹{formatPrice(currentPlayer['Base'])} Lakhs</p>
                {currentPlayer['Previous Teams'] && (
                  <p><strong>Previous Teams:</strong> {currentPlayer['Previous Teams']}</p>
                )}
              </div>
              
              <div className="price-controls">
                <button 
                  onClick={() => updatePriceOptimized(currentPlayer['Player Name'], 'decrease')}
                  className="price-btn decrease-btn"
                  disabled={(currentPlayer['Sold Price'] || currentPlayer['Base']) <= currentPlayer['Base']}
                >
                  <Minus size={24} />
                </button>
                
                <span className="price-value1">
                  ₹{formatPrice(currentPlayer['Sold Price'] || currentPlayer['Base'])} L
                </span>
                
                <button 
                  onClick={() => updatePriceOptimized(currentPlayer['Player Name'], 'increase')}
                  className="price-btn increase-btn"
                >
                  <Plus size={24} />
                </button>
              </div>

              <div className="nav-buttons">
                <button onClick={showPrevious} className="nav-btn prev-btn">
                  <ArrowLeft size={18} /> Previous
                </button>
                <span className="player-count">
                  {currentIndex + 1} / {filteredPlayers.length}
                </span>
                <button onClick={showNext} className="nav-btn next-btn">
                  Next <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="franchise-buttons">
            <h3 className="franchise-title">ASSIGN TO TEAM</h3>
            <div className="team-buttons-grid">
              {franchises.map(team => (
                <button 
                  key={team}
                  onClick={() => assignFranchise(currentPlayer['Player Name'], team)}
                  className="team-btn"
                  style={{ backgroundColor: teamColors[team] }}
                >
                  {team}
                </button>
              ))}
            </div>
            <div className="action-buttons">
              <button 
                onClick={() => markUnsold(currentPlayer['Player Name'])}
                className="unsold-btn"
              >
                <Star size={18} /> Mark Unsold
              </button>
              <button 
                onClick={toggleUnsoldView} 
                className="view-toggle-btn"
              >
                <Users size={18} /> {showUnsoldOnly ? 'Show All Players' : 'Show Unsold Only'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;