// Task Related constants
export const PASSWORD_GameOfColor = "RBGGameOfColor";
export const TASK_ID_GameOfColor= "webgame-reasoning-colorcount";


import React, { useState, useEffect, useMemo } from 'react';
import { Check, X, Eye, Trophy, Target } from 'lucide-react';

type Color = 'Red' | 'Green' | 'Blue';
type Theme = 'cosmic' | 'forest' | 'ocean' | 'sunset' | 'neon';

interface ColorCounts {
  Red: number;
  Green: number;
  Blue: number;
}

interface UserInputs {
  red: string;
  green: string;
  blue: string;
}

const GameOfColor: React.FC = () => {
  // Generate random theme on mount
  const currentTheme = useMemo<Theme>(() => {
    const themes: Theme[] = ['cosmic', 'forest', 'ocean', 'sunset', 'neon'];
    return themes[Math.floor(Math.random() * themes.length)];
  }, []);

  // Generate random grid layout
  const gridLayout = useMemo(() => {
    const layouts = [
      'grid-cols-3 gap-4',
      'grid-cols-3 gap-6 rotate-1',
      'grid-cols-3 gap-3 -rotate-1',
      'grid-cols-3 gap-5 scale-105'
    ];
    return layouts[Math.floor(Math.random() * layouts.length)];
  }, []);

  // Generate random colors for the 3x3 grid
  const colors = useMemo<Color[]>(() => {
    const colorOptions: Color[] = ['Red', 'Green', 'Blue'];
    return Array.from({ length: 9 }, () => 
      colorOptions[Math.floor(Math.random() * colorOptions.length)]
    );
  }, []);

  // Calculate actual color counts
  const actualCounts = useMemo<ColorCounts>(() => {
    return colors.reduce(
      (acc, color) => ({ ...acc, [color]: acc[color] + 1 }),
      { Red: 0, Green: 0, Blue: 0 }
    );
  }, [colors]);

  const [userInputs, setUserInputs] = useState<UserInputs>({
    red: '',
    green: '',
    blue: ''
  });
  
  const [showResults, setShowResults] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Theme configurations
  const themeConfig = {
    cosmic: {
      bg: 'from-purple-900 via-blue-900 to-indigo-900',
      cardBg: 'bg-white/10 backdrop-blur-md border-white/20',
      text: 'text-white',
      accent: 'from-purple-500 to-pink-500',
      animation: 'animate-pulse',
      emoji: '🌌'
    },
    forest: {
      bg: 'from-green-800 via-emerald-700 to-teal-800',
      cardBg: 'bg-white/15 backdrop-blur-sm border-green-300/30',
      text: 'text-green-50',
      accent: 'from-green-400 to-emerald-500',
      animation: 'animate-bounce',
      emoji: '🌲'
    },
    ocean: {
      bg: 'from-blue-900 via-cyan-800 to-teal-900',
      cardBg: 'bg-white/10 backdrop-blur-lg border-cyan-300/20',
      text: 'text-cyan-50',
      accent: 'from-cyan-400 to-blue-500',
      animation: 'animate-pulse',
      emoji: '🌊'
    },
    sunset: {
      bg: 'from-orange-800 via-red-700 to-pink-800',
      cardBg: 'bg-white/15 backdrop-blur-md border-orange-300/25',
      text: 'text-orange-50',
      accent: 'from-orange-400 to-red-500',
      animation: 'animate-bounce',
      emoji: '🌅'
    },
    neon: {
      bg: 'from-black via-purple-900 to-black',
      cardBg: 'bg-white/5 backdrop-blur-xl border-neon-pink/40',
      text: 'text-green-400',
      accent: 'from-green-400 to-purple-500',
      animation: 'animate-pulse',
      emoji: '⚡'
    }
  };

  const theme = themeConfig[currentTheme];

  const getColorClasses = (color: Color): string => {
    const colorMap = {
      Red: 'bg-red-500 hover:bg-red-600 shadow-red-500/50',
      Green: 'bg-green-500 hover:bg-green-600 shadow-green-500/50',
      Blue: 'bg-blue-500 hover:bg-blue-600 shadow-blue-500/50'
    };
    return colorMap[color];
  };

  const getColorEmoji = (color: Color): string => {
    const emojiMap = {
      Red: '🔴',
      Green: '🟢',
      Blue: '🔵'
    };
    return emojiMap[color];
  };

  const isFormValid = (): boolean => {
    return userInputs.red !== '' && userInputs.green !== '' && userInputs.blue !== '';
  };

  const isInputValid = (value: string): boolean => {
    const num = parseInt(value);
    return !isNaN(num) && num >= 0 && num <= 9;
  };

  const handleInputChange = (color: keyof UserInputs, value: string) => {
    if (value === '' || (isInputValid(value) && parseInt(value) <= 9)) {
      setUserInputs(prev => ({ ...prev, [color]: value }));
    }
  };

  const calculateResults = () => {
    const userCounts = {
      Red: parseInt(userInputs.red) || 0,
      Green: parseInt(userInputs.green) || 0,
      Blue: parseInt(userInputs.blue) || 0
    };

    const isCorrect = (
      userCounts.Red === actualCounts.Red &&
      userCounts.Green === actualCounts.Green &&
      userCounts.Blue === actualCounts.Blue
    );

    const correctCount = Object.keys(actualCounts).reduce((acc, color) => {
      return acc + (userCounts[color as Color] === actualCounts[color as Color] ? 1 : 0);
    }, 0);

    return { isCorrect, correctCount, userCounts };
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const startGame = () => {
    setGameStarted(true);
  };

  useEffect(() => {
    // Add floating animation keyframes
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-10px) rotate(2deg); }
      }
      .float-animation { animation: float 3s ease-in-out infinite; }
      
      @keyframes glow {
        0%, 100% { box-shadow: 0 0 20px currentColor; }
        50% { box-shadow: 0 0 30px currentColor, 0 0 40px currentColor; }
      }
      .glow-animation { animation: glow 2s ease-in-out infinite; }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  if (!gameStarted) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.bg} flex items-center justify-center p-4`}>
        <div className={`${theme.cardBg} ${theme.text} p-8 rounded-2xl border max-w-md text-center float-animation`}>
          <div className="text-6xl mb-4">{theme.emoji}</div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent from-white to-gray-300">
            Game of Color
          </h1>
          <p className="text-lg mb-6 opacity-90">
            🎯 Count the colored squares in a 3×3 grid!<br/>
            🧠 Test your observation skills<br/>
            ✨ Each game has a unique theme
          </p>
          <button
            onClick={startGame}
            className={`bg-gradient-to-r ${theme.accent} text-white px-8 py-3 rounded-xl font-semibold text-lg hover:scale-105 transform transition-all duration-200 shadow-lg glow-animation`}
          >
            <Eye className="inline mr-2" size={20} />
            Start Game
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    const { isCorrect, correctCount, userCounts } = calculateResults();
    
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.bg} p-4`}>
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-8">
            <h1 className={`text-4xl font-bold ${theme.text} mb-2`}>
              {theme.emoji} Game Results {theme.emoji}
            </h1>
          </header>
            {
                isCorrect && (
                     <div className={`${theme.cardBg} ${theme.text} p-8 rounded-2xl border mb-8 text-center`}>
                 <p className="text-lg font-mono font-semibold tracking-wider text-center">
                              Awesome! Here is your password:
                              <span className="font-bold pl-2">
                                {PASSWORD_GameOfColor}
                              </span>
                            </p>
             </div>
                )
            }
          <div className={`${theme.cardBg} ${theme.text} p-8 rounded-2xl border mb-8 text-center`}>
            {isCorrect ? (
              <div className="float-animation">
                <Trophy className="mx-auto mb-4 text-yellow-400" size={60} />
                <h2 className="text-3xl font-bold text-yellow-400 mb-2">Perfect Score! 🎉</h2>
                <p className="text-xl">You got all colors right! Amazing observation skills! ⭐</p>
              </div>
            ) : (
              <div>
                <Target className="mx-auto mb-4 text-blue-400" size={60} />
                <h2 className="text-2xl font-bold text-blue-400 mb-2">Good Try! 💪</h2>
                <p className="text-lg">You got {correctCount} out of 3 colors correct!</p>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Original Grid */}
            <div className={`${theme.cardBg} ${theme.text} p-6 rounded-2xl border`}>
              <h3 className="text-xl font-bold mb-4 text-center">Original Grid 📋</h3>
              <div className={`grid ${gridLayout} mb-4`}>
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className={`
                      w-16 h-16 rounded-xl ${getColorClasses(color)}
                      flex items-center justify-center text-white font-bold text-lg
                      transform hover:scale-105 transition-all duration-200 shadow-lg
                      mx-auto
                    `}
                  >
                    {getColorEmoji(color)}
                  </div>
                ))}
              </div>
              
              <div className="text-center space-y-2 flex justify-between items-center px-4 py-4">
                <p>🔴 Red: <span className="font-bold">{actualCounts.Red}</span></p>
                <p>🟢 Green: <span className="font-bold">{actualCounts.Green}</span></p>
                <p>🔵 Blue: <span className="font-bold">{actualCounts.Blue}</span></p>
              </div>
            </div>

            {/* Results Comparison */}
            <div className={`${theme.cardBg} ${theme.text} p-6 rounded-2xl border`}>
              <h3 className="text-xl font-bold mb-4 text-center">Your Answers 🤔</h3>
              <div className="space-y-4">
                {['Red', 'Green', 'Blue'].map((color) => {
                  const colorKey = color as Color;
                  const isCorrectColor = userCounts[colorKey] === actualCounts[colorKey];
                  return (
                    <div key={color} className="flex items-center justify-between p-3 rounded-lg bg-white/10">
                      <span className="flex items-center">
                        {getColorEmoji(colorKey)} {color}:
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold">{userCounts[colorKey]}</span>
                        {isCorrectColor ? (
                          <Check className="text-green-400" size={20} />
                        ) : (
                          <X className="text-red-400" size={20} />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.bg} p-4`}>
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className={`text-5xl font-bold ${theme.text} mb-2 float-animation`}>
            {theme.emoji} Game of Color {theme.emoji}
          </h1>
          <p className={`text-lg ${theme.text} opacity-90`}>
            🎯 Count each color in the grid below!
          </p>
        </header>

        {/* Color Grid */}
        <div className={`${theme.cardBg} ${theme.text} p-8 rounded-2xl border mb-8`}>
          <h2 className="text-2xl font-bold mb-6 text-center">Color Grid 🎨</h2>
          <div className={`grid ${gridLayout} mb-4 max-w-xs mx-auto`}>
            {colors.map((color, index) => (
              <div
                key={index}
                className={`
                  w-20 h-20 rounded-xl ${getColorClasses(color)}
                  flex items-center justify-center text-white font-bold text-2xl
                  transform hover:scale-110 transition-all duration-300 shadow-lg
                  float-animation glow-animation
                `}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {getColorEmoji(color)}
              </div>
            ))}
          </div>
        </div>

        {/* Input Section */}
        <div className={`${theme.cardBg} ${theme.text} p-8 rounded-2xl border mb-8`}>
          <h2 className="text-2xl font-bold mb-6 text-center">Enter Your Counts 📝</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { color: 'red', label: 'Red', emoji: '🔴' },
              { color: 'green', label: 'Green', emoji: '🟢' },
              { color: 'blue', label: 'Blue', emoji: '🔵' }
            ].map(({ color, label, emoji }) => (
              <div key={color}>
                <label className="block text-sm font-medium mb-2">
                  {emoji} {label} Count:
                </label>
                <input
                  type="number"
                  min="0"
                  max="9"
                  value={userInputs[color as keyof UserInputs]}
                  onChange={(e) => handleInputChange(color as keyof UserInputs, e.target.value)}
                  className={`
                    w-full px-4 py-3 rounded-xl border-2 
                    ${isInputValid(userInputs[color as keyof UserInputs]) || userInputs[color as keyof UserInputs] === ''
                      ? 'border-green-400 focus:border-green-500' 
                      : 'border-red-400 focus:border-red-500'
                    }
                    bg-white/10 backdrop-blur-sm ${theme.text} 
                    focus:outline-none focus:ring-2 focus:ring-white/20
                    text-center text-xl font-bold
                    transition-all duration-200
                  `}
                  placeholder="0"
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={!isFormValid()}
            className={`
              w-full py-4 rounded-xl font-bold text-lg transition-all duration-200
              ${isFormValid()
                ? `bg-gradient-to-r ${theme.accent} text-white hover:scale-105 transform shadow-lg glow-animation`
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            <Target className="inline mr-2" size={20} />
            {isFormValid() ? 'Submit Your Answer! 🚀' : 'Fill all fields to continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOfColor;