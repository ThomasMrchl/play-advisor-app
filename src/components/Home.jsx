import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();

  // Sample data for featured games
  const featuredGames = [
    {
      id: 1,
      name: "Catan",
      image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 4.8,
      reviews: 1250,
      category: "Strategy"
    },
    {
      id: 2,
      name: "Ticket to Ride",
      image: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 4.7,
      reviews: 980,
      category: "Family"
    },
    {
      id: 3,
      name: "Pandemic",
      image: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 4.6,
      reviews: 850,
      category: "Cooperative"
    }
  ];

  const categories = [
    { name: "Strategy", icon: "🎯" },
    { name: "Family", icon: "👨‍👩‍👧‍👦" },
    { name: "Party", icon: "🎉" },
    { name: "Cooperative", icon: "🤝" },
    { name: "Card Games", icon: "🃏" },
    { name: "RPG", icon: "⚔️" }
  ];

  const handleGameClick = (gameName) => {
    navigate(`/game/${gameName.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <h1>Discover Your Next Favorite Board Game</h1>
        <p>Find, review, and share your board game experiences</p>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <h2>Browse by Category</h2>
        <div className="category-grid">
          {categories.map((category, index) => (
            <div key={index} className="category-card">
              <span className="category-icon">{category.icon}</span>
              <h3>{category.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Games Section */}
      <section className="featured-games">
        <h2>Featured Board Games</h2>
        <div className="games-grid">
          {featuredGames.map((game) => (
            <div 
              key={game.id} 
              className="game-card"
              onClick={() => handleGameClick(game.name)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleGameClick(game.name);
                }
              }}
            >
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