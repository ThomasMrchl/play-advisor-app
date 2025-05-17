import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosPrivate } from '../api/axios';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axiosPrivate.get('/game/getGames');
        const gamesData = Array.isArray(response.data) ? response.data : Object.values(response.data);
        console.log(gamesData[0]);
        setGames(gamesData[0]);
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
    // Convert game name to URL-friendly format
    const urlFriendlyName = gameName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // Replace any non-alphanumeric characters with hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
    
    navigate(`/game/${urlFriendlyName}`);
  };

  if (loading) {
    return <div className="loading">Loading games...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <h1>Discover Your Next Favorite Board Game</h1>
        <p>Find, review, and share your board game experiences</p>
      </section>

      {/* Games Grid Section */}
      <section className="featured-games">
        <h2>Featured Board Games</h2>
        <div className="games-grid">
          {games.map((game) => (
            <div 
              key={game?.game_id || Math.random()} 
              className="game-card"
              onClick={() => handleGameClick(game?.game_name)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleGameClick(game?.game_name);
                }
              }}
            >
              <div className="game-image">
                <img 
                  src={game?.image_url || 'https://via.placeholder.com/150'} 
                  alt={game?.game_name || 'Game'} 
                />
              </div>
              <div className="game-info">
                <h3>{game?.game_name || 'Unnamed Game'}</h3>
                <div className="game-details">
                  <span className="game-year">{game?.game_year || 'N/A'}</span>
                  <span className="game-players">
                    {game?.game_minplayers || '?'}-{game?.game_maxplayers || '?'} players
                  </span>
                </div>
                <div className="game-rating">
                  <span className="stars">
                    {"★".repeat(Math.floor(parseFloat(game?.popularity_score || 0)))}
                  </span>
                  <span className="rating-number">
                    {parseFloat(game?.popularity_score || 0).toFixed(1)}
                  </span>
                </div>
                {game?.game_description && (
                  <p className="game-description">
                    {game.game_description.length > 100 
                      ? `${game.game_description.substring(0, 100)}...` 
                      : game.game_description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Play-advisor Section */}
      <section className="why-section">
        <h2>Why Choose Play-advisor?</h2>
        <div className="features-grid">
          <div className="feature">
            <span className="feature-icon">📊</span>
            <h3>Expert Reviews</h3>
            <p>Get insights from experienced board game enthusiasts</p>
          </div>
          <div className="feature">
            <span className="feature-icon">🔍</span>
            <h3>Find Your Match</h3>
            <p>Discover games that match your preferences and play style</p>
          </div>
          <div className="feature">
            <span className="feature-icon">💬</span>
            <h3>Community Driven</h3>
            <p>Join a community of board game lovers and share your experiences</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;