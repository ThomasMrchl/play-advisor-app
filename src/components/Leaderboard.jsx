import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Leaderboard.css';

const Leaderboard = () => {
  const navigate = useNavigate();

  // Sample data for different leaderboard categories
  const leaderboardData = {
    topOfTheWeek: [
      {
        id: 1,
        name: "Catan",
        image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        rating: 4.8,
        reviews: 1250,
        category: "Strategy",
        change: "+2"
      },
      {
        id: 2,
        name: "Ticket to Ride",
        image: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        rating: 4.7,
        reviews: 980,
        category: "Family",
        change: "+1"
      },
      {
        id: 3,
        name: "Pandemic",
        image: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        rating: 4.6,
        reviews: 850,
        category: "Cooperative",
        change: "-1"
      }
    ],
    mostPopular: [
      {
        id: 4,
        name: "Carcassonne",
        image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        rating: 4.7,
        reviews: 2100,
        category: "Strategy",
        change: "0"
      },
      {
        id: 5,
        name: "7 Wonders",
        image: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        rating: 4.6,
        reviews: 1800,
        category: "Strategy",
        change: "+1"
      },
      {
        id: 6,
        name: "Azul",
        image: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        rating: 4.5,
        reviews: 1500,
        category: "Abstract",
        change: "-1"
      }
    ],
    highestRated: [
      {
        id: 7,
        name: "Gloomhaven",
        image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        rating: 4.9,
        reviews: 950,
        category: "RPG",
        change: "0"
      },
      {
        id: 8,
        name: "Terraforming Mars",
        image: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        rating: 4.8,
        reviews: 1200,
        category: "Strategy",
        change: "+1"
      },
      {
        id: 9,
        name: "Wingspan",
        image: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        rating: 4.7,
        reviews: 1100,
        category: "Strategy",
        change: "-1"
      }
    ]
  };

  const handleGameClick = (gameName) => {
    navigate(`/game/${gameName.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const renderLeaderboardSection = (title, games) => (
    <section className="leaderboard-section">
      <h2>{title}</h2>
      <div className="leaderboard-grid">
        {games.map((game, index) => (
          <div 
            key={game.id}
            className="leaderboard-card"
            onClick={() => handleGameClick(game.name)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleGameClick(game.name);
              }
            }}
          >
            <div className="rank">{index + 1}</div>
            <div className="game-image">
              <img src={game.image} alt={game.name} />
              <span className="game-category">{game.category}</span>
            </div>
            <div className="game-info">
              <h3>{game.name}</h3>
              <div className="game-rating">
                <span className="stars">{"★".repeat(Math.floor(game.rating))}</span>
                <span className="rating-number">{game.rating}</span>
                <span className="reviews">({game.reviews} reviews)</span>
              </div>
            </div>
            <div className={`rank-change ${game.change.startsWith('+') ? 'positive' : game.change.startsWith('-') ? 'negative' : 'neutral'}`}>
              {game.change}
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="leaderboard-page">
      <div className="leaderboard-header">
        <h1>Leaderboard</h1>
        <p>Discover the most popular and highest-rated board games</p>
      </div>

      {renderLeaderboardSection("Top of the Week", leaderboardData.topOfTheWeek)}
      {renderLeaderboardSection("Most Popular", leaderboardData.mostPopular)}
      {renderLeaderboardSection("Highest Rated", leaderboardData.highestRated)}
    </div>
  );
};

export default Leaderboard; 