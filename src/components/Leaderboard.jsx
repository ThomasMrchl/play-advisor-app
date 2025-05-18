import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosPrivate } from '../api/axios';
import '../styles/Leaderboard.css';

const Leaderboard = () => {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axiosPrivate.get('/game/getGames');
        const gamesData = response.data.result || response.data;
        // Convertir les stars en nombre et trier les jeux
        const sortedGames = Array.isArray(gamesData) ? gamesData
          .map(game => ({
            ...game,
            stars: parseFloat(game.stars) || 0
          }))
          .sort((a, b) => b.stars - a.stars) : [gamesData];
        setGames(sortedGames);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch games');
        setLoading(false);
        console.error('Error fetching games:', err);
      }
    };

    fetchGames();
  }, []);

  const handleGameClick = (gameName) => {
    navigate(`/game/${gameName.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const renderStars = (rating, reviewCount) => {
    if (reviewCount === 0) {
      return <span className="no-ratings">No ratings</span>;
    }

    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <>
        {"★".repeat(fullStars)}
        {hasHalfStar && "★"}
        {"☆".repeat(emptyStars)}
      </>
    );
  };

  const renderTopThree = () => {
    const topThree = games.slice(0, 3);
    return (
      <div className="top-three-container">
        {topThree.map((game, index) => (
          <div 
            key={game.game_id}
            className={`top-three-card rank-${index + 1}`}
            onClick={() => handleGameClick(game.game_name)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleGameClick(game.game_name);
              }
            }}
          >
            <div className="rank-badge">{index + 1}</div>
            <div className="game-image">
              <img 
                src={game.image_url || 'https://via.placeholder.com/300'} 
                alt={game.game_name} 
              />
            </div>
            <div className="game-info">
              <h3>{game.game_name}</h3>
              <div className="game-rating">
                {game.review_count === 0 ? (
                  <span className="no-ratings">No ratings</span>
                ) : (
                  <>
                    <span className="stars">{renderStars(game.stars, game.review_count)}</span>
                    <span className="rating-number">{game.stars.toFixed(1)}</span>
                  </>
                )}
              </div>
              <div className="game-meta">
                <span className="game-year">{game.game_year || 'N/A'}</span>
                <span className="game-players">
                  {game.game_minplayers || '?'}-{game.game_maxplayers || '?'} players
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderRestOfLeaderboard = () => {
    const restOfGames = games.slice(3);
    return (
      <div className="rest-leaderboard">
        {restOfGames.map((game, index) => (
          <div 
            key={game.game_id}
            className="leaderboard-card"
            onClick={() => handleGameClick(game.game_name)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleGameClick(game.game_name);
              }
            }}
          >
            <div className="rank">{index + 4}</div>
            <div className="game-image">
              <img 
                src={game.image_url || 'https://via.placeholder.com/300'} 
                alt={game.game_name} 
              />
            </div>
            <div className="game-info">
              <h3>{game.game_name}</h3>
              <div className="game-rating">
                {game.review_count === 0 ? (
                  <span className="no-ratings">No ratings</span>
                ) : (
                  <>
                    <span className="stars">{renderStars(game.stars, game.review_count)}</span>
                    <span className="rating-number">{game.stars.toFixed(1)}</span>
                  </>
                )}
              </div>
              <div className="game-meta">
                <span className="game-year">{game.game_year || 'N/A'}</span>
                <span className="game-players">
                  {game.game_minplayers || '?'}-{game.game_maxplayers || '?'} players
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return <div className="loading">Loading leaderboard...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="leaderboard-page">
      <div className="leaderboard-header">
        <h1>Game Rankings</h1>
        <p>Discover the highest-rated board games in our collection</p>
      </div>

      <div className="leaderboard-content">
        {renderTopThree()}
        {renderRestOfLeaderboard()}
      </div>
    </div>
  );
};

export default Leaderboard; 