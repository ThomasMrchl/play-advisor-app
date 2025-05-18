import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosPrivate } from '../api/axios';
import '../styles/Header.css';

const Header = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [games, setGames] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axiosPrivate.get('/game/getGames');
        const gamesData = response.data.result || response.data;
        setGames(Array.isArray(gamesData) ? gamesData : [gamesData]);
      } catch (err) {
        console.error('Error fetching games:', err);
      }
    };

    fetchGames();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearching(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (value) => {
    setSearchValue(value);
    setIsSearching(true);

    if (value.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filteredGames = games.filter(game => 
      game.game_name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(filteredGames.slice(0, 5)); // Limiter à 5 résultats
  };

  const handleGameSelect = (gameName) => {
    setSearchValue('');
    setSearchResults([]);
    setIsSearching(false);
    navigate(`/game/${gameName.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <h1>Play-advisor</h1>
          </Link>
        </div>
        
        <div className="search-bar" ref={searchRef}>
          <input 
            type="text" 
            placeholder="Search for board games..." 
            className="search-input"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => setIsSearching(true)}
          />
          <button className="search-button">
            <i className="fas fa-search"></i>
          </button>

          {isSearching && searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((game) => (
                <div
                  key={game.game_id}
                  className="search-result-item"
                  onClick={() => handleGameSelect(game.game_name)}
                >
                  <img 
                    src={game.image_url || 'https://via.placeholder.com/50'} 
                    alt={game.game_name}
                    className="search-result-image"
                  />
                  <div className="search-result-info">
                    <h4>{game.game_name}</h4>
                    <span className="search-result-year">{game.game_year || 'N/A'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <nav className="navigation">
          <ul>
            <li><Link to="/users">Users</Link></li>
            <li><Link to="/leaderboard">Leaderboard</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 