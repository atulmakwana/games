import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/TicTacToe.css';

const Square = ({ value, onSquareClick, isWinningSquare }) => {
  const squareClass = `square ${isWinningSquare ? 'winning-square' : ''} ${value === 'X' ? 'x-player' : value === 'O' ? 'o-player' : ''}`;
  return (
    <button className={squareClass} onClick={onSquareClick}>
      {value}
    </button>
  );
};

const TicTacToe = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const navigate = useNavigate(); 

  const { winner, line: winningLine } = calculateWinner(squares);

  const handleClick = (i) => {
    if (squares[i] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[i] = isXNext ? 'X' : 'O';
    setSquares(nextSquares);
    setIsXNext(!isXNext);
  };

  let status;
  if (winner) {
    status = `Winner: ${winner} 🎉`;
  } else if (squares.every(Boolean)) {
    status = "It's a Draw! 🤝";
  } else {
    status = `Next player: ${isXNext ? 'X' : 'O'}`;
  }

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="tic-tac-toe">
      <h2>Tic Tac Toe</h2>
      <div className="status">{status}</div>
      <div className="board">
        {squares.map((value, i) => (
          <Square
            key={i}
            value={value}
            onSquareClick={() => handleClick(i)}
            isWinningSquare={winningLine && winningLine.includes(i)}
          />
        ))}
      </div>
      <div className="game-controls">
        <button className="reset-button" onClick={handleReset}>Reset Game</button>
        <button className="back-button" onClick={() => navigate('/')}>Back to Menu</button>
      </div>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return { winner: null, line: null };
};

export default TicTacToe;