import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import '../styles/SnakeGame.css';

const CANVAS_SIZE = 400;
const GRID_SIZE = 20;
const SCALE = CANVAS_SIZE / GRID_SIZE;

// --- Initial Game State ---
const INITIAL_SNAKE = [[10, 8], [10, 9]];
const INITIAL_FOOD = [15, 15];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const GAME_SPEED_MS = 150;

// --- Keyboard Controls ---
const DIRECTIONS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};

const SnakeGame = () => {
    const canvasRef = useRef(null);
    const navigate = useNavigate(); 

    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [food, setFood] = useState(INITIAL_FOOD);
    const [direction, setDirection] = useState(INITIAL_DIRECTION);
    const [isGameRunning, setIsGameRunning] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [score, setScore] = useState(0);

    const startGame = () => {
        setSnake(INITIAL_SNAKE);
        setFood(INITIAL_FOOD);
        setDirection(INITIAL_DIRECTION);
        setScore(0);
        setIsGameOver(false);
        setIsGameRunning(true);
    };

    const stopGame = () => {
        setIsGameRunning(false);
        setIsGameOver(true);
    };

    const generateFood = (currentSnake) => {
        let newFoodPosition;
        do {
            newFoodPosition = [
                Math.floor(Math.random() * GRID_SIZE),
                Math.floor(Math.random() * GRID_SIZE),
            ];
        } while (
            currentSnake.some(segment => segment[0] === newFoodPosition[0] && segment[1] === newFoodPosition[1])
        );
        setFood(newFoodPosition);
    };

    const gameLoop = () => {
        if (!isGameRunning || isGameOver) return;
        const newSnake = JSON.parse(JSON.stringify(snake));
        const head = newSnake[0];
        const newHead = [head[0] + direction.x, head[1] + direction.y];

        if (
            newHead[0] < 0 || newHead[0] >= GRID_SIZE ||
            newHead[1] < 0 || newHead[1] >= GRID_SIZE ||
            newSnake.some(segment => segment[0] === newHead[0] && segment[1] === newHead[1])
        ) {
            stopGame();
            return;
        }

        newSnake.unshift(newHead);

        if (newHead[0] === food[0] && newHead[1] === food[1]) {
            setScore(prevScore => prevScore + 1);
            generateFood(newSnake);
        } else {
            newSnake.pop();
        }
        
        setSnake(newSnake);
    };

    const handleKeyDown = (e) => {
        const newDirection = DIRECTIONS[e.key];
        if (newDirection) {
            const isOpposite = newDirection.x === -direction.x || newDirection.y === -direction.y;
            if (!isOpposite) {
                setDirection(newDirection);
            }
        }
    };
    
    useEffect(() => {
        const interval = setInterval(gameLoop, GAME_SPEED_MS);
        return () => clearInterval(interval);
    }, [snake, direction, isGameRunning, isGameOver]);

    useEffect(() => {
        const context = canvasRef.current.getContext('2d');
        context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
        context.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        context.fillStyle = '#61dafb';
        snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
        context.fillStyle = '#ff4d4d';
        context.fillRect(food[0], food[1], 1, 1);
    }, [snake, food]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [direction]);

    return (
        <div className="snake-game">
            <h2>Snake Game 🐍</h2>
            <div className="game-info">
                <span>Score: {score}</span>
            </div>
            <canvas ref={canvasRef} width={CANVAS_SIZE} height={CANVAS_SIZE} />

            {isGameRunning && !isGameOver && (
                <div className="game-controls">
                    <button className="back-button" onClick={() => navigate('/')}>Back to Menu</button>
                </div>
            )}

            {!isGameRunning && !isGameOver && (
                <button onClick={startGame}>Start Game</button>
            )}

            {isGameOver && (
                <div className="game-over-container">
                    <div className="game-over-text">GAME OVER!</div>
                    <button onClick={startGame}>Play Again</button><br/>
                    <button className="back-button" onClick={() => navigate('/')}>Back to Menu</button>
                </div>
            )}
        </div>
    );
};

export default SnakeGame;