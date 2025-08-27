const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors()); 

// The API endpoint for the home page
app.get('/api/games', (req, res) => {
  const games = [
    {
      id: 1,
      name: 'Tic Tac Toe',
      image: 'tictactoe.png', 
      path: '/tic-tac-toe',
    },
    {
      id: 2,
      name: 'Snake Game',
      image: 'snakegame.png', 
      path: '/snake-game',
    },
  ];
  res.json(games);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});