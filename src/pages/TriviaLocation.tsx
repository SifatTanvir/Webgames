import React, { useState, useEffect } from 'react';

export const TASK_ID_TriviaLocation = "enternainment-trivia-location";
export const PASSWORD_TriviaLocation = "TRIVIA-X7Y2Z-9L1M3";

interface MapLocation {
  id: string;
  name: string;
  emoji: string;
  top: string;
  left: string;
}

interface ChallengeData {
  id: string;
  question: string;
  clue: string;
  correctMapLocationId: string;
  unlocksChallengeId?: string;
}

// Define interfaces for color palettes
interface StartScreenColors {
  bg: string;
  title: string;
  button: string;
  border: string;
  buttonHover: string;
}

interface MapScreenColors {
  bg: string;
  button: {
    default: string;
    correct: string;
    incorrect: string;
  };
  feedbackText: {
    correct: string;
    incorrect: string;
  };
  mapBorder: string;
}

interface ResultsScreenColors {
  bg: string;
  passwordBoxBg: string;
  passwordText: string;
  passwordBorder: string;
  button: string;
  buttonHover: string;
  passwordKeyText: string;
  passwordSmallText: string;
  passwordBoxInnerBorder: string;
}

interface StartScreenProps {
  onStartAdventure: () => void;
  colors: StartScreenColors;
}

interface MapScreenProps {
  currentChallenge: ChallengeData;
  mapLocations: MapLocation[];
  solvedChallenges: string[]; // Keep track of solved challenges by ID
  correctAnswersCount: number; // New prop to display correct answers count
  totalChallenges: number; // New prop for total challenges
  onAnswerSubmit: (isCorrect: boolean, challengeId: string) => void;
  feedback: boolean | null;
  selectedMapLocationId: string | null;
  onSelectMapLocation: (locationId: string | null) => void;
  colors: MapScreenColors;
}

interface ResultsScreenProps {
  finalPassword: string;
  onPlayAgain: () => void;
  colors: ResultsScreenColors;
}

const mapLocations: MapLocation[] = [
  { id: 'united-kingdom', name: 'United Kingdom', emoji: '🇬🇧', top: '30%', left: '46%' },
  { id: 'united-states', name: 'United States', emoji: '🇺🇸', top: '40%', left: '25%' },
  { id: 'russia', name: 'Russia', emoji: '🇷🇺', top: '20%', left: '70%' },
  { id: 'japan', name: 'Japan', emoji: '🇯🇵', top: '38%', left: '88%' },
  { id: 'china', name: 'China', emoji: '🇨🇳', top: '45%', left: '78%' },
  { id: 'brazil', name: 'Brazil', emoji: '🇧🇷', top: '65%', left: '32%' },
  { id: 'australia', name: 'Australia', emoji: '🇦🇺', top: '75%', left: '80%' },
  { id: 'india', name: 'India', emoji: '🇮🇳', top: '50%', left: '68%' },
  { id: 'canada', name: 'Canada', emoji: '🇨🇦', top: '25%', left: '20%' },
  { id: 'south-africa', name: 'South Africa', emoji: '🇿🇦', top: '75%', left: '50%' },
  { id: 'egypt', name: 'Egypt', emoji: '🇪🇬', top: '48%', left: '55%' },
];

const gameChallenges: ChallengeData[] = [
  {
    id: 'challenge-1',
    question: "Which country is home to Big Ben and the Tower of London?",
    clue: "A historic island nation known for its royal family and iconic landmarks.",
    correctMapLocationId: "united-kingdom",
    unlocksChallengeId: 'challenge-2',
  },
  {
    id: 'challenge-2',
    question: "Which South American country is famous for the Amazon Rainforest and the Carnival in Rio de Janeiro?",
    clue: "A vibrant nation, home to diverse ecosystems and lively celebrations.",
    correctMapLocationId: "brazil",
    unlocksChallengeId: 'challenge-3',
  },
  {
    id: 'challenge-3',
    question: "The Statue of Liberty stands tall in which country?",
    clue: "A vast North American nation, a symbol of freedom and opportunity.",
    correctMapLocationId: "united-states",
    unlocksChallengeId: 'challenge-4',
  },
  {
    id: 'challenge-4',
    question: "Which country is home to the vast Trans-Siberian Railway, spanning across two continents?",
    clue: "The largest country in the world by land area, known for its immense landscapes.",
    correctMapLocationId: "russia",
    unlocksChallengeId: 'challenge-5',
  },
  {
    id: 'challenge-5',
    question: "Mount Fuji, a famous volcano, is located in which island nation?",
    clue: "A land of cherry blossoms, ancient traditions, and technological innovation.",
    correctMapLocationId: "japan",
    unlocksChallengeId: undefined, // This is the last challenge
  },
];

// Define a set of color palettes for randomization
const colorPalettes = [
  {
    // Palette 1: Deep Blue / Teal
    start: {
      bg: 'from-gray-800 via-gray-900 to-black',
      title: 'from-yellow-400 to-orange-500',
      button: 'from-green-500 to-emerald-600',
      border: 'border-yellow-500',
      buttonHover: 'hover:from-green-600 hover:to-emerald-700'
    },
    map: {
      bg: 'from-blue-700 to-cyan-800',
      button: {
        default: 'bg-blue-500 hover:bg-blue-600 border-blue-400',
        correct: 'bg-green-500 border-green-300',
        incorrect: 'bg-red-500 border-red-300',
      },
      feedbackText: {
        correct: 'text-green-300',
        incorrect: 'text-red-300'
      },
      mapBorder: 'border-blue-500'
    },
    results: {
      bg: 'from-yellow-600 to-orange-700',
      passwordBoxBg: 'from-purple-900/30 to-pink-900/30',
      passwordText: 'from-purple-400 to-pink-400',
      passwordBorder: 'border-purple-400/30',
      button: 'bg-green-500',
      buttonHover: 'hover:bg-green-600',
      passwordKeyText: 'text-purple-100',
      passwordSmallText: 'text-purple-200',
      passwordBoxInnerBorder: 'border-purple-500/30'
    }
  },
  {
    // Palette 2: Purple / Pink
    start: {
      bg: 'from-purple-800 via-purple-900 to-black',
      title: 'from-pink-400 to-red-500',
      button: 'from-purple-500 to-fuchsia-600',
      border: 'border-pink-500',
      buttonHover: 'hover:from-purple-600 hover:to-fuchsia-700'
    },
    map: {
      bg: 'from-fuchsia-700 to-purple-800',
      button: {
        default: 'bg-fuchsia-500 hover:bg-fuchsia-600 border-fuchsia-400',
        correct: 'bg-lime-500 border-lime-300',
        incorrect: 'bg-orange-500 border-orange-300',
      },
      feedbackText: {
        correct: 'text-lime-300',
        incorrect: 'text-orange-300'
      },
      mapBorder: 'border-fuchsia-500'
    },
    results: {
      bg: 'from-red-600 to-pink-700',
      passwordBoxBg: 'from-blue-900/30 to-cyan-900/30',
      passwordText: 'from-blue-400 to-cyan-400',
      passwordBorder: 'border-blue-400/30',
      button: 'bg-purple-500',
      buttonHover: 'hover:bg-purple-600',
      passwordKeyText: 'text-blue-100',
      passwordSmallText: 'text-blue-200',
      passwordBoxInnerBorder: 'border-blue-500/30'
    }
  },
  {
    // Palette 3: Green / Yellow
    start: {
      bg: 'from-green-800 via-green-900 to-black',
      title: 'from-lime-400 to-yellow-500',
      button: 'from-teal-500 to-cyan-600',
      border: 'border-lime-500',
      buttonHover: 'hover:from-teal-600 hover:to-cyan-700'
    },
    map: {
      bg: 'from-teal-700 to-green-800',
      button: {
        default: 'bg-teal-500 hover:bg-teal-600 border-teal-400',
        correct: 'bg-yellow-500 border-yellow-300',
        incorrect: 'bg-red-500 border-red-300',
      },
      feedbackText: {
        correct: 'text-yellow-300',
        incorrect: 'text-red-300'
      },
      mapBorder: 'border-teal-500'
    },
    results: {
      bg: 'from-lime-600 to-green-700',
      passwordBoxBg: 'from-orange-900/30 to-amber-900/30',
      passwordText: 'from-orange-400 to-amber-400',
      passwordBorder: 'border-orange-400/30',
      button: 'bg-teal-500',
      buttonHover: 'hover:bg-teal-600',
      passwordKeyText: 'text-orange-100',
      passwordSmallText: 'text-orange-200',
      passwordBoxInnerBorder: 'border-orange-500/30'
    }
  }
];

const StartScreen: React.FC<StartScreenProps> = ({ onStartAdventure, colors }) => (
  <div className={`flex flex-col items-center justify-center p-8 bg-gradient-to-br ${colors.bg} rounded-2xl shadow-2xl text-white transform transition-all duration-500 scale-100 hover:scale-105 border-4 ${colors.border}`}>
    <h1 className={`text-5xl md:text-6xl font-extrabold mb-6 text-center drop-shadow-lg text-transparent bg-clip-text bg-gradient-to-r ${colors.title}`}>
      The Great Map Quest
    </h1>
    <p className="text-xl md:text-2xl mb-10 text-center max-w-md font-light text-gray-300">
      Embark on a global journey. Solve riddles, discover locations, and unlock the final secret!
    </p>
    <button
      onClick={onStartAdventure}
      className={`flex items-center px-10 py-5 bg-gradient-to-r ${colors.button} text-white text-2xl font-bold rounded-full shadow-xl ${colors.buttonHover} transition-all duration-300 transform hover:scale-110 animate-pulse-slow`}
      style={{ animationDuration: '3s' }}
    >
      <span className="mr-3 text-3xl">🗺️</span> Start Your Adventure
    </button>
  </div>
);

const MapScreen: React.FC<MapScreenProps> = ({
  currentChallenge,
  mapLocations,
  solvedChallenges,
  correctAnswersCount, // New prop
  totalChallenges, // New prop
  onAnswerSubmit,
  feedback,
  selectedMapLocationId,
  onSelectMapLocation,
  colors
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [mapLoadError, setMapLoadError] = useState(false);

  const shuffledMapLocations = mapLocations;

  const handleLocationClick = (locationId: string) => {
    if (selectedMapLocationId === null) {
      onSelectMapLocation(locationId);
      const isCorrect = locationId === currentChallenge.correctMapLocationId;
      onAnswerSubmit(isCorrect, currentChallenge.id);
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center p-8 bg-gradient-to-br ${colors.bg} rounded-2xl shadow-2xl text-white w-full max-w-6xl`}>
      <h1 className="text-4xl font-extrabold mb-4 text-center drop-shadow-lg">Current Challenge</h1>
      <p className="text-xl mb-6 text-center italic opacity-80">"{currentChallenge.clue}"</p>
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center leading-tight">
        {currentChallenge.question}
      </h2>

      {/* Display correct answers count */}
      <div className="absolute top-4 right-4 bg-gray-800/70 text-white px-4 py-2 rounded-lg text-lg font-bold border border-gray-700 shadow-md">
        Correct: {correctAnswersCount} / {totalChallenges}
      </div>

      <div className={`relative w-full aspect-video bg-gray-800 rounded-lg overflow-hidden border-4 ${colors.mapBorder} shadow-xl`}>
        {!imageLoaded && !mapLoadError && (
          <div className="absolute inset-0 flex items-center justify-center text-xl text-gray-400">
            Loading Map...
          </div>
        )}
        {mapLoadError && (
          <div className="absolute inset-0 flex items-center justify-center text-xl text-red-400 bg-gray-700 p-4 text-center">
            Map image failed to load. Please check your internet connection or refresh.
            The game is still playable by clicking the location buttons.
          </div>
        )}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cf/A_large_blank_world_map_with_oceans_marked_in_blue.PNG"
          alt="World Map"
          className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded && !mapLoadError ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            console.error("Failed to load map image:", e);
            setImageLoaded(true);
            setMapLoadError(true);
          }}
        />

        {shuffledMapLocations.map(location => {
          const isSelected = selectedMapLocationId === location.id;
          const isCorrectAnswer = feedback !== null && location.id === currentChallenge.correctMapLocationId;
          const isIncorrectSelection = feedback !== null && isSelected && !isCorrectAnswer;
          const isSolvedLocation = solvedChallenges.includes(currentChallenge.id) && location.id === currentChallenge.correctMapLocationId;

          let buttonClasses = '';
          if (isSolvedLocation) {
            buttonClasses = `${colors.button.correct} animate-pulse-once`;
          } else if (isCorrectAnswer) {
            buttonClasses = `${colors.button.correct} animate-bounce-once`;
          } else if (isIncorrectSelection) {
            buttonClasses = `${colors.button.incorrect} animate-shake`;
          } else if (selectedMapLocationId === null) {
            buttonClasses = `${colors.button.default} hover:scale-110`;
          } else {
            buttonClasses = 'bg-gray-700 opacity-50 cursor-not-allowed';
          }

          return (
            <button
              key={location.id}
              onClick={() => handleLocationClick(location.id)}
              disabled={selectedMapLocationId !== null}
              style={{ top: location.top, left: location.left, zIndex: 10 }}
              className={`absolute flex flex-col items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full text-white text-xs font-bold p-1
                transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 shadow-lg
                ${buttonClasses}
              `}
            >
              <span className="text-3xl md:text-4xl">{location.emoji}</span>
              <span className="text-xs md:text-sm mt-1 text-center leading-tight">{location.name}</span>
            </button>
          );
        })}
      </div>

      {feedback !== null && (
        <p className={`mt-6 text-2xl font-bold ${feedback ? colors.feedbackText.correct : colors.feedbackText.incorrect} animate-pulse`}>
          {feedback ? "Correct! Path Unlocked! ✅" : `Incorrect! Try again. ❌`}
        </p>
      )}
    </div>
  );
};

const ResultsScreen: React.FC<ResultsScreenProps> = ({ finalPassword, onPlayAgain, colors }) => (
  <div className={`flex flex-col items-center justify-center p-8 bg-gradient-to-br ${colors.bg} rounded-2xl shadow-2xl text-white`}>
    <span className="w-24 h-24 mb-6 text-8xl text-yellow-300 animate-bounce">🔓</span>
    <h1 className="text-5xl font-extrabold mb-4 text-center drop-shadow-lg">Vault Unlocked!</h1>
    <p className="text-3xl font-bold mb-8">Congratulations, Adventurer!</p>

    <div className={`bg-gradient-to-r ${colors.passwordBoxBg} rounded-3xl p-10 mb-10 border ${colors.passwordBorder} inline-block backdrop-blur-sm shadow-2xl animate-fade-in`}>
      <div className={`text-2xl font-bold ${colors.passwordKeyText} mb-4 flex items-center justify-center gap-2`}>
        <span>🔑</span> Your Secret Password:
      </div>
      <div className={`text-4xl font-mono font-bold bg-gradient-to-r ${colors.passwordText} bg-clip-text text-transparent bg-white/10 rounded-2xl p-6 border ${colors.passwordBoxInnerBorder} shadow-xl`}>
        {finalPassword}
      </div>
      <p className={`${colors.passwordSmallText} mt-4 text-sm`}>Keep this password safe!</p>
    </div>

    <button
      onClick={onPlayAgain}
      className={`flex items-center justify-center px-8 py-4 ${colors.button} text-white text-xl font-bold rounded-full shadow-lg ${colors.buttonHover} transition-all duration-300 transform hover:scale-105`}
    >
      <span className="w-6 h-6 mr-3">🔄</span> Play Again
    </button>
  </div>
);

const TriviaLocation: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<string>('start');
  const [shuffledChallenges, setShuffledChallenges] = useState<ChallengeData[]>([]);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [solvedChallenges, setSolvedChallenges] = useState<string[]>([]);
  const [finalPassword, setFinalPassword] = useState<string>('');
  const [feedback, setFeedback] = useState<boolean | null>(null);
  const [selectedMapLocationId, setSelectedMapLocationId] = useState<string | null>(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0); // New state for correct answers count

  // State for randomized colors
  const [startScreenColors, setStartScreenColors] = useState<StartScreenColors>(colorPalettes[0].start);
  const [mapScreenColors, setMapScreenColors] = useState<MapScreenColors>(colorPalettes[0].map);
  const [resultsScreenColors, setResultsScreenColors] = useState<ResultsScreenColors>(colorPalettes[0].results);

  const currentChallenge = shuffledChallenges[currentChallengeIndex];
  const totalChallenges = gameChallenges.length; // Total number of challenges

  // Function to randomize colors and challenges
  const randomizeGameSetup = () => {
    const newShuffledChallenges = gameChallenges;
    setShuffledChallenges(newShuffledChallenges);
    setCurrentChallengeIndex(0); // Reset challenge index for new game
    setSolvedChallenges([]);
    setFinalPassword('');
    setFeedback(null);
    setSelectedMapLocationId(null);
    setCorrectAnswersCount(0); // Reset correct answers count

    const randomPaletteIndex = Math.floor(Math.random() * colorPalettes.length);
    setStartScreenColors(colorPalettes[randomPaletteIndex].start);
    setMapScreenColors(colorPalettes[randomPaletteIndex].map);
    setResultsScreenColors(colorPalettes[randomPaletteIndex].results);
  };

  useEffect(() => {
    // Initial setup when component mounts
    randomizeGameSetup();
  }, []); // Run only once on mount

  const handleStartAdventure = () => {
    randomizeGameSetup(); // Re-randomize for a fresh start
    setCurrentScreen('map');
  };

  // --- FIXED CODE IS HERE ---
  const handleAnswerSubmit = (isCorrect: boolean, challengeId: string) => {
    setFeedback(isCorrect);

    if (isCorrect) {
      // Only increment count the first time this challenge is solved correctly
      if (!solvedChallenges.includes(challengeId)) {
        setSolvedChallenges(prev => [...prev, challengeId]);
        setCorrectAnswersCount(prev => prev + 1);
      }

      // Use a timeout to show feedback before proceeding
      setTimeout(() => {
        // We check `correctAnswersCount + 1` because the state update is asynchronous.
        if (correctAnswersCount + 1 === totalChallenges) {
          // If all questions are answered correctly, show the results screen
          setFinalPassword(PASSWORD_TriviaLocation);
          setCurrentScreen('results');
        } else {
          // Otherwise, advance to the next question in the shuffled array
          setCurrentChallengeIndex(prevIndex => prevIndex + 1);

          // Reset UI for the next question
          const randomPaletteIndex = Math.floor(Math.random() * colorPalettes.length);
          setMapScreenColors(colorPalettes[randomPaletteIndex].map);
          setSelectedMapLocationId(null);
          setFeedback(null);
        }
      }, 1500);
    } else {
      // If the answer is incorrect, reset after a delay to allow user to see feedback
      setTimeout(() => {
        setSelectedMapLocationId(null);
        setFeedback(null);
      }, 1500);
    }
  };

  const handlePlayAgain = () => {
    setCurrentScreen('start');
    randomizeGameSetup(); // Re-randomize for a new game
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Roboto+Mono:wght@400;700&family=Inter:wght@400;700&display=swap');
          .font-orbitron { font-family: 'Orbitron', sans-serif; }
          .font-roboto-mono { font-family: 'Roboto Mono', monospace; }
          .font-inter { font-family: 'Inter', sans-serif; }
          .animate-fade-in { animation: fadeIn 0.5s ease-in-out; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
          .animate-pulse-slow { animation: pulseSlow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
          @keyframes pulseSlow {
            0%, 100% { opacity: 0.9; box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.5); } /* Gold pulse */
            50% { opacity: 1; box-shadow: 0 0 20px 10px rgba(255, 215, 0, 0); }
          }
          .animate-bounce-once {
            animation: bounceOnce 0.8s ease-in-out forwards;
          }
          @keyframes bounceOnce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
          .animate-shake {
            animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
            transform: translate3d(0, 0, 0);
            backface-visibility: hidden;
            perspective: 1000px;
          }
          @keyframes shake {
            10%, 90% { transform: translate3d(-1px, 0, 0); }
            20%, 80% { transform: translate3d(2px, 0, 0); }
            30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
            40%, 60% { transform: translate3d(4px, 0, 0); }
          }
        `}
      </style>

      <div className="flex flex-col items-center justify-center w-full h-full">
        {currentScreen === 'start' && <StartScreen onStartAdventure={handleStartAdventure} colors={startScreenColors} />}
        {currentScreen === 'map' && currentChallenge && (
          <MapScreen
            currentChallenge={currentChallenge}
            mapLocations={mapLocations}
            solvedChallenges={solvedChallenges}
            correctAnswersCount={correctAnswersCount} // Pass new prop
            totalChallenges={totalChallenges} // Pass new prop
            onAnswerSubmit={handleAnswerSubmit}
            feedback={feedback}
            selectedMapLocationId={selectedMapLocationId}
            onSelectMapLocation={setSelectedMapLocationId}
            colors={mapScreenColors}
          />
        )}
        {currentScreen === 'results' && (
          <ResultsScreen
            finalPassword={finalPassword}
            onPlayAgain={handlePlayAgain}
            colors={resultsScreenColors}
          />
        )}
      </div>
    </div>
  );
};

export default TriviaLocation;