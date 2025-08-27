import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    // Fetching data from our Node.js API
    fetch('/api/games')
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.error("Failed to fetch games:", err));
  }, []);

  return (
    <div className="home-page">
      <h2>Select a Game</h2>
      <div className="game-list">
        {games.map((game) => (
          <Link to={game.path} key={game.id} className="game-card">
            <img src={game.image} alt={game.name} />
            <h3>{game.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;