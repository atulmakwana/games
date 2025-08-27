import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TicTacToe from './pages/TicTacToe';
import SnakeGame from './pages/SnakeGame';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Welcome to the Game Arcade! 🕹️</h1>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tic-tac-toe" element={<TicTacToe />} />
          <Route path="/snake-game" element={<SnakeGame />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;