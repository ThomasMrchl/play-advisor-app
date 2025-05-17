import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import GamePage from './components/GamePage';
import UserPage from './components/UserPage';
import Leaderboard from './components/Leaderboard';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game/:gameName" element={<GamePage />} />
            <Route path="/users" element={<UserPage />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 