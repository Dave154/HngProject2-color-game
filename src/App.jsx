import React, { useState, useEffect } from 'react';
import './App.css';

const colors = [
  'red', 'blue', 'green', 'yellow', 'purple', 'orange', 
  'pink', 'brown', 'teal', 'lime', 'cyan', 'violet'
];

function App() {
  // State variables for game
  const [targetColor, setTargetColor] = useState('');
  const [colorOptions, setColorOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState('');
  
  // Generate a new game round
  const startNewGame = () => {
    setScore(0)
    const shuffledColors = shuffle(colors).slice(0, 6);
    setColorOptions(shuffledColors);
    const randomColor = random(shuffledColors) 
      setTargetColor(randomColor);
    setStatus('');
  };

  const random =(color)=>{
    const randomColor = color[Math.floor(Math.random() * color.length)];
    return randomColor;
  }

  // Shuffle 
  const shuffle = (arr) => {
    let shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Handle user guesses
  const handleGuess = (guess) => {
    if (guess === targetColor) {
      setScore(prevScore => prevScore + 1);
      const randomColor =random(colorOptions)
      setTargetColor(randomColor)
      setStatus('Correct! 🎉');
    } else {
      setStatus('Wrong! Try again.');
    }
  };
  
 
  useEffect(() => {
    startNewGame();
  }, []);

  return (
    <div className="App">
      <div className="game-container">
        <div data-testid="gameInstructions" className="instructions">
          <h2>Guess the correct color!</h2>
        </div>
        <div data-testid="colorBox" className="color-box" style={{ backgroundColor: targetColor }}></div>
        
        <div className="color-options">
          {colorOptions.map((color, index) => (
            <button
              key={index}
              data-testid="colorOption"
              style={{ backgroundColor: color }}
              onClick={() => handleGuess(color)}
              className="color-btn"
            />
          ))}
        </div>

        <div data-testid="gameStatus" className={`status ${status === "Wrong! Try again." ? 'shake': status === "Correct! 🎉"&&'celebrate'}`}>
          {status}
          </div>
        <div data-testid="score" className="score">Score: {score}</div>

        <button 
          data-testid="newGameButton"
          onClick={startNewGame}
          className="new-game-btn"
        >
          New Game
        </button>
      </div>
    </div>
  );
}

export default App;
