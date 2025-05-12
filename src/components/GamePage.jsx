import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/GamePage.css';

const GamePage = () => {
  const { gameName } = useParams();

  // This would typically come from an API
  const gameData = {
    name: "Catan",
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rating: 4.8,
    reviews: 1250,
    category: "Strategy",
    players: "3-4",
    playTime: "60-120 min",
    age: "10+",
    description: "In Catan, players try to be the dominant force on the island of Catan by building settlements, cities, and roads. On each turn dice are rolled to determine what resources the island produces. Players build by spending resources (sheep, wheat, wood, brick and ore) in particular combinations.",
    mechanics: ["Trading", "Resource Management", "Dice Rolling"],
    designer: "Klaus Teuber",
    publisher: "Catan Studio",
    yearPublished: 1995,
    reviews: [
      {
        user: "John Doe",
        rating: 5,
        comment: "One of the best board games ever created. Perfect balance of strategy and luck.",
        date: "2024-01-15"
      },
      {
        user: "Jane Smith",
        rating: 4,
        comment: "Great game for family gatherings. Easy to learn but offers deep strategy.",
        date: "2024-01-10"
      }
    ]
  };

  return (
    <div className="game-page">
      <div className="game-header">
        <div className="game-image">
          <img src={gameData.image} alt={gameData.name} />
        </div>
        <div className="game-info">
          <h1>{gameData.name}</h1>
          <div className="game-meta">
            <span className="category">{gameData.category}</span>
            <div className="rating">
              <span className="stars">{"★".repeat(Math.floor(gameData.rating))}</span>
              <span className="rating-number">{gameData.rating}</span>
              <span className="reviews-count">({gameData.reviews.length} reviews)</span>
            </div>
          </div>
          <div className="game-details">
            <div className="detail-item">
              <span className="label">Players:</span>
              <span className="value">{gameData.players}</span>
            </div>
            <div className="detail-item">
              <span className="label">Play Time:</span>
              <span className="value">{gameData.playTime}</span>
            </div>
            <div className="detail-item">
              <span className="label">Age:</span>
              <span className="value">{gameData.age}</span>
            </div>
            <div className="detail-item">
              <span className="label">Designer:</span>
              <span className="value">{gameData.designer}</span>
            </div>
            <div className="detail-item">
              <span className="label">Publisher:</span>
              <span className="value">{gameData.publisher}</span>
            </div>
            <div className="detail-item">
              <span className="label">Year Published:</span>
              <span className="value">{gameData.yearPublished}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="game-content">
        <section className="description">
          <h2>Description</h2>
          <p>{gameData.description}</p>
        </section>

        <section className="mechanics">
          <h2>Game Mechanics</h2>
          <div className="mechanics-list">
            {gameData.mechanics.map((mechanic, index) => (
              <span key={index} className="mechanic-tag">{mechanic}</span>
            ))}
          </div>
        </section>

        <section className="reviews">
          <h2>Reviews</h2>
          <div className="reviews-list">
            {gameData.reviews.map((review, index) => (
              <div key={index} className="review-card">
                <div className="review-header">
                  <span className="reviewer">{review.user}</span>
                  <span className="review-date">{review.date}</span>
                </div>
                <div className="review-rating">
                  {"★".repeat(review.rating)}
                </div>
                <p className="review-comment">{review.comment}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default GamePage; 