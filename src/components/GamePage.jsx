import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { axiosPrivate } from '../api/axios';
import '../styles/GamePage.css';

const GamePage = () => {
  const { gameName } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axiosPrivate.get(`/game/getGame/${gameName}`);
        console.log('Response:', response.data);
        // Handle the nested object structure
        const gameData = response.data.result || response.data;
        setGame(gameData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch game details');
        setLoading(false);
        console.error('Error fetching game:', err);
      }
    };

    fetchGame();
  }, [gameName]);

  if (loading) {
    return <div className="loading">Loading game details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!game) {
    return <div className="error">Game not found</div>;
  }

  return (
    <div className="game-page">
      <div className="game-header">
        <div className="game-image">
          <img 
            src={game.image_url || 'https://via.placeholder.com/300'} 
            alt={game.game_name || 'Game'} 
          />
        </div>
        <div className="game-info">
          <h1>{game.game_name || 'Unnamed Game'}</h1>
          <div className="game-meta">
            <span className="game-year">{game.game_year || 'N/A'}</span>
            <span className="game-players">
              {game.game_minplayers || '?'}-{game.game_maxplayers || '?'} players
            </span>
          </div>
          <div className="game-rating">
            <span className="stars">
              {"★".repeat(Math.floor(parseFloat(game.popularity_score || 0)))}
            </span>
            <span className="rating-number">
              {parseFloat(game.popularity_score || 0).toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      <div className="game-content">
        <section className="game-description">
          <h2>Description</h2>
          <p>{game.game_description || 'No description available'}</p>
        </section>

        <section className="game-details">
          <h2>Game Details</h2>
          <div className="details-grid">
            <div className="detail-item">
              <h3>Year Published</h3>
              <p>{game.game_year || 'N/A'}</p>
            </div>
            <div className="detail-item">
              <h3>Players</h3>
              <p>{game.game_minplayers || '?'}-{game.game_maxplayers || '?'}</p>
            </div>
            <div className="detail-item">
              <h3>Popularity Score</h3>
              <p>{parseFloat(game.popularity_score || 0).toFixed(1)}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GamePage; 