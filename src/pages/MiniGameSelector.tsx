import React, { useState, useEffect } from "react";
import { useTaskAnalytics } from "../utils/useTaskAnalytics";

export const TASK_ID_MiniGameSelector = "webgames-multiplayer-invitefriends";
export const PASSWORD_MiniGameSelector = "serpent";

interface MiniGame {
  id: number;
  name: string;
  category: string;
  players: string;
  difficulty: string;
  icon: string;
  description: string;
}

interface GameMode {
  id: string;
  name: string;
  description: string;
  icon: string;
  maxPlayers: number;
}

const minigames: MiniGame[] = [
  { id: 1, name: "Pixel Runner", category: "Arcade", players: "1-4", difficulty: "Easy", icon: "🏃", description: "Run through pixelated worlds" },
  { id: 2, name: "Bubble Pop", category: "Puzzle", players: "1-2", difficulty: "Easy", icon: "🫧", description: "Pop colorful bubbles" },
  { id: 3, name: "Space Shooter", category: "Action", players: "1-4", difficulty: "Medium", icon: "🚀", description: "Defend against alien invasion" },
  { id: 4, name: "Word Wizard", category: "Puzzle", players: "1-8", difficulty: "Medium", icon: "📚", description: "Create words from letters" },
  { id: 5, name: "Racing Legends", category: "Racing", players: "2-8", difficulty: "Hard", icon: "🏎️", description: "High-speed racing action" },
  { id: 6, name: "Dungeon Crawler", category: "RPG", players: "1-6", difficulty: "Hard", icon: "⚔️", description: "Explore mysterious dungeons" },
  { id: 7, name: "Music Maker", category: "Creative", players: "1-4", difficulty: "Easy", icon: "🎵", description: "Create your own music" },
  { id: 8, name: "Chess Master", category: "Strategy", players: "2", difficulty: "Hard", icon: "♟️", description: "Classic chess gameplay" },
  { id: 9, name: "Memory Match", category: "Puzzle", players: "1-4", difficulty: "Easy", icon: "🧠", description: "Test your memory skills" },
  { id: 10, name: "Fishing Frenzy", category: "Casual", players: "1-6", difficulty: "Medium", icon: "🎣", description: "Catch the biggest fish" },
  { id: 11, name: "Cooking Chaos", category: "Simulation", players: "1-4", difficulty: "Medium", icon: "👨‍🍳", description: "Cook delicious meals" },
  { id: 12, name: "Zombie Survival", category: "Action", players: "1-8", difficulty: "Hard", icon: "🧟", description: "Survive the zombie apocalypse" }
];

const gameModes: GameMode[] = [
  { id: "solo", name: "Solo", description: "Play alone", icon: "👤", maxPlayers: 1 },
  { id: "duo", name: "Duo", description: "Play with a friend", icon: "👥", maxPlayers: 2 },
  { id: "team", name: "Team", description: "Play in teams", icon: "👨‍👩‍👧‍👦", maxPlayers: 8 },
  { id: "ffa", name: "FFA", description: "Free for all", icon: "⚔️", maxPlayers: 12 },
  { id: "tournament", name: "Tournament", description: "Competitive play", icon: "🏆", maxPlayers: 16 }
];

const MiniGameSelector: React.FC = () => {
  const { recordSuccess } = useTaskAnalytics(TASK_ID_MiniGameSelector);
  const [currentStage, setCurrentStage] = useState(1);
  const [selectedGame, setSelectedGame] = useState<number | null>(null);
  const [selectedMode, setSelectedMode] = useState<string>("");
  const [challengeLink, setChallengeLink] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [password, setPassword] = useState("");
  const [showCompletion, setShowCompletion] = useState(false);
  const [randomizedGames, setRandomizedGames] = useState(minigames);

  useEffect(() => {
    const shuffledGames = [...minigames].sort(() => Math.random() - 0.5);
    setRandomizedGames(shuffledGames);
  }, []);

  const handleNextStage = () => {
    if (currentStage < 3) {
      setCurrentStage(currentStage + 1);
    }
  };

  const handleComplete = () => {
    const expectedGameIndex = 5;
    const expectedGame = randomizedGames[expectedGameIndex];
    const expectedMode = "ffa";
    const isCorrect =
      selectedGame === expectedGame?.id &&
      selectedMode === expectedMode &&
      challengeLink !== "" &&
      notificationsEnabled;
    if (isCorrect) {
      setPassword(PASSWORD_MiniGameSelector);
    } else {
      setPassword("");
    }
    setShowCompletion(true);
    recordSuccess();
  };

  const canProceed = () => {
    switch (currentStage) {
      case 1: return selectedGame !== null;
      case 2: return selectedMode !== "";
      case 3: return true;
      default: return false;
    }
  };

  const generateChallengeLink = () => {
    const link = `https://play.games/challenge/${Math.random().toString(36).substr(2, 9)}`;
    setChallengeLink(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex">
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {!showCompletion && (
            <div className="max-w-7xl mx-auto">
              {currentStage === 1 && (
                <div className="text-center mb-12">
                  <div className="text-8xl mb-6">🎮</div>
                  <h1 className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent drop-shadow-lg">
                    MiniGame Hub
                  </h1>
                  <p className="text-2xl text-white drop-shadow-lg">Choose your favorite minigame to play</p>
                </div>
              )}

              {currentStage === 2 && (
                <div className="text-center mb-12">
                  <div className="text-6xl mb-6">⚙️</div>
                  <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">Select Game Mode</h1>
                  <p className="text-xl text-white drop-shadow-lg">Choose how you want to play</p>
                </div>
              )}

              {currentStage === 3 && (
                <div className="text-center mb-12">
                  <div className="text-6xl mb-6">🔗</div>
                  <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">Invite Friends</h1>
                  <p className="text-xl text-white drop-shadow-lg">Generate a challenge link and configure notifications</p>
                </div>
              )}

              <div className="space-y-8">
                {currentStage === 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {randomizedGames.map((game, index) => (
                      <div key={game.id} className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                        <button
                          onClick={() => setSelectedGame(game.id)}
                          className={`relative w-full p-6 bg-white/20 backdrop-blur-md rounded-3xl border-2 transition-all duration-300 hover:scale-105 ${
                            selectedGame === game.id
                              ? 'border-yellow-400 bg-yellow-400/20 shadow-2xl' :
                              'border-white/30 hover:border-white/60'
                          }`}
                        >
                          <div className="text-center">
                            <div className="text-5xl mb-4">{game.icon}</div>
                            <div className="flex items-center justify-center mb-2">
                              <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full mr-2">
                                #{index + 1}
                              </span>
                              <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                                {game.difficulty}
                              </span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{game.name}</h3>
                            <p className="text-white/80 text-sm mb-3">{game.description}</p>
                            <div className="flex items-center justify-between text-xs text-white/70">
                              <span>{game.category}</span>
                              <span>{game.players}</span>
                            </div>
                          </div>
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {currentStage === 2 && (
                  <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {gameModes.map((mode) => (
                        <div key={mode.id} className="group relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                          <button
                            onClick={() => setSelectedMode(mode.id)}
                            className={`relative w-full p-8 bg-white/20 backdrop-blur-md rounded-3xl border-2 transition-all duration-300 hover:scale-105 ${
                              selectedMode === mode.id
                                ? 'border-yellow-400 bg-yellow-400/20 shadow-2xl' :
                                'border-white/30 hover:border-white/60'
                            }`}
                          >
                            <div className="text-center">
                              <div className="text-6xl mb-4">{mode.icon}</div>
                              <h3 className="text-2xl font-bold text-white mb-2">{mode.name}</h3>
                              <p className="text-white/80 text-sm mb-3">{mode.description}</p>
                              <div className="bg-white/20 text-white text-sm px-3 py-1 rounded-full">
                                Up to {mode.maxPlayers} players
                              </div>
                            </div>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentStage === 3 && (
                  <div className="max-w-2xl mx-auto">
                    <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 border border-white/30">
                      <div className="space-y-6">
                        <div className="text-center">
                          <h3 className="text-2xl font-bold text-white mb-4">Challenge Setup</h3>
                          <p className="text-white/80">Generate a challenge link and configure notifications</p>
                        </div>
                        
                        <div>
                          <button
                            onClick={generateChallengeLink}
                            className="w-full p-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl font-bold text-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-xl"
                          >
                            <div className="flex items-center justify-center space-x-3">
                              <span className="text-2xl">🔗</span>
                              <span>Generate Challenge Link</span>
                            </div>
                          </button>
                        </div>
                        
                        {challengeLink && (
                          <div className="p-4 bg-white/10 rounded-2xl border border-white/20">
                            <p className="text-white/80 text-sm mb-2">Challenge Link:</p>
                            <p className="text-white font-mono text-sm break-all">{challengeLink}</p>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between p-4 bg-white/10 rounded-2xl border border-white/20">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">🔔</span>
                            <div>
                              <p className="text-white font-medium">Get notified when they accept</p>
                              <p className="text-white/70 text-sm">Receive notifications when friends join</p>
                            </div>
                          </div>
                          <button
                            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                            disabled={!challengeLink}
                            className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                              !challengeLink ? 'opacity-50 cursor-not-allowed' :
                              notificationsEnabled ? 'bg-yellow-400' : 'bg-white/30'
                            }`}
                          >
                            <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                              notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                            }`}></div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-center pt-8">
                  <button
                    onClick={currentStage === 3 ? handleComplete : handleNextStage}
                    disabled={!canProceed()}
                    className="px-12 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl font-bold text-xl disabled:opacity-50 disabled:cursor-not-allowed hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-2xl drop-shadow-lg"
                  >
                    {currentStage === 3 ? 'Complete' : 'Next'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {showCompletion && (
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-white/20 backdrop-blur-md rounded-3xl p-12 border border-white/30">
                <div className="text-8xl mb-8">🎉</div>
                <h2 className="text-5xl font-bold text-white mb-8">
                  Congratulations, you have completed all stages!
                </h2>
                {password && (
                  <div className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-3xl p-8 border border-white/30">
                    <div className="text-2xl font-bold text-white mb-4">Your Password:</div>
                    <div className="text-4xl font-mono font-bold text-yellow-400 bg-white/20 rounded-2xl p-6 border border-white/30 shadow-2xl">
                      {password}
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MiniGameSelector; 