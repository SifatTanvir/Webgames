// Task Related constants
export const PASSWORD_MathGame = "MATH-GENIUS-2025";
export const TASK_ID_MathGame = "webgame-reasoning-mathematicalequations";
import React, { useState, useEffect } from "react";
import { User, Mail, Target } from "lucide-react";

const themes = [
  {
    name: "Ocean",
    gradient: "from-blue-400 via-purple-500 to-pink-500",
    cardBg: "bg-blue-50/90",
    accent: "text-blue-600",
    buttonPrimary: "bg-blue-500 hover:bg-blue-600",
    buttonSecondary: "bg-purple-500 hover:bg-purple-600",
  },
  {
    name: "Forest",
    gradient: "from-green-400 via-teal-500 to-blue-500",
    cardBg: "bg-green-50/90",
    accent: "text-green-600",
    buttonPrimary: "bg-green-500 hover:bg-green-600",
    buttonSecondary: "bg-teal-500 hover:bg-teal-600",
  },
  {
    name: "Sunset",
    gradient: "from-orange-400 via-red-500 to-pink-500",
    cardBg: "bg-orange-50/90",
    accent: "text-orange-600",
    buttonPrimary: "bg-orange-500 hover:bg-orange-600",
    buttonSecondary: "bg-red-500 hover:bg-red-600",
  },
  {
    name: "Galaxy",
    gradient: "from-purple-400 via-pink-500 to-red-500",
    cardBg: "bg-purple-50/90",
    accent: "text-purple-600",
    buttonPrimary: "bg-purple-500 hover:bg-purple-600",
    buttonSecondary: "bg-pink-500 hover:bg-pink-600",
  },
];

interface Question {
  id: number;
  question: string;
  answer: number;
  emoji: string;
}

interface Player {
  name: string;
  score: number;
  completedAt: string;
  emoji: string;
}

type GameState = "start" | "playing" | "success" | "failed" | "leaderboard";
const USER_NAMES: string[] = ["tuktuk02", "genius37", "maninblack"];

const MathGame: React.FC = () => {
  const [theme, setTheme] = useState(themes[0]);
  const [gameState, setGameState] = useState<GameState>("start");
  const [username, setUsername] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [leaderboard, setLeaderboard] = useState<Player[]>([]);
  const [showAnimation, setShowAnimation] = useState(false);
  const [currentPlayer] = useState<string>(
    USER_NAMES[Math.floor(Math.random() * USER_NAMES.length)]
  );

  useEffect(() => {
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    setTheme(randomTheme);

    const dummyLeaderboard: Player[] = [
      { name: "Alex Math ⭐", score: 7, completedAt: "2025-01-15", emoji: "🎯" },
      { name: "Sarah Numbers 🚀", score: 6, completedAt: "2025-01-14", emoji: "🌟" },
      { name: "Mike Calculator 📱", score: 7, completedAt: "2025-01-13", emoji: "⚡" },
      { name: "Emma Genius 🧠", score: 5, completedAt: "2025-01-12", emoji: "💫" },
      { name: "David Quick 🏃‍♂️", score: 7, completedAt: "2025-01-11", emoji: "🔥" },
    ];
    setLeaderboard(dummyLeaderboard);
  }, []);

  const generateQuestions = (): Question[] => {
    const operations = ["+", "-", "*", "/"];
    const emojis = ["🧮", "📊", "🎯", "🔢", "📈", "⭐", "🎪"];
    const questions: Question[] = [];

    const getRandomInt = (min: number, max: number): number =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const generateExpression = (): { expression: string; answer: number } => {
      const numOps = Math.random() < 0.5 ? 2 : 3;
      let expression = "";
      let currentValue = getRandomInt(2, 20);

      expression += currentValue.toString();

      for (let i = 0; i < numOps; i++) {
        let op = operations[Math.floor(Math.random() * operations.length)];
        let nextValue: number;

        if (op === "/") {
          const divisors = [1, 2, 3, 4, 5, 10].filter((d) => currentValue % d === 0);
          if (divisors.length === 0) {
            op = "+";
            nextValue = getRandomInt(1, 10);
          } else {
            nextValue = divisors[Math.floor(Math.random() * divisors.length)];
          }
        } else {
          nextValue = getRandomInt(2, 20);
        }

        expression += ` ${op} ${nextValue}`;
        // evaluate carefully
        try {
          currentValue = eval(expression);
        } catch (e) {
          currentValue = 0;
        }
      }

      const roundedAnswer = Math.round(currentValue * 100) / 100;
      return { expression, answer: roundedAnswer };
    };

    for (let i = 0; i < 7; i++) {
      const { expression, answer } = generateExpression();
      const formatted = expression.replace(/\*/g, "×").replace(/\//g, "÷");

      questions.push({
        id: i + 1,
        question: `${formatted} = ?`,
        answer,
        emoji: emojis[i % emojis.length],
      });
    }

    return questions;
  };

  const startGame = () => {
    if (!username.trim()) return;
    setQuestions(generateQuestions());
    setCurrentQuestionIndex(0);
    setUserAnswer("");
    setGameState("playing");
  };

  const submitAnswer = () => {
    const answer = parseFloat(userAnswer);
    if (isNaN(answer)) return;

    const correct = Math.abs(answer - questions[currentQuestionIndex].answer) < 0.01;

    if (correct) {
      if (currentQuestionIndex === questions.length - 1) {
        setShowAnimation(true);
        setTimeout(() => {
          const newPlayer: Player = {
            name: `${username} 🏆`,
            score: 7,
            completedAt: new Date().toISOString().split("T")[0],
            emoji: "🎉",
          };
          setLeaderboard((prev) => {
            const filtered = prev.filter((p) => !p.name.includes(username));
            return [newPlayer, ...filtered].sort((a, b) => b.score - a.score);
          });
          setGameState("success");
          setShowAnimation(false);
        }, 2000);
      } else {
        setCurrentQuestionIndex((prev) => prev + 1);
        setUserAnswer("");
      }
    } else {
      setShowAnimation(true);
      setTimeout(() => {
        const failedPlayer: Player = {
          name: `${username} 😔`,
          score: currentQuestionIndex,
          completedAt: new Date().toISOString().split("T")[0],
          emoji: "💔",
        };
        setLeaderboard((prev) => {
          const filtered = prev.filter((p) => !p.name.includes(username));
          return [failedPlayer, ...filtered].sort((a, b) => b.score - a.score);
        });
        setGameState("failed");
        setShowAnimation(false);
      }, 2000);
    }
  };

  const resetGame = () => {
    setGameState("start");
    setUsername("");
    setCurrentQuestionIndex(0);
    setUserAnswer("");
    setQuestions([]);
  };

  const currentQuestion = questions[currentQuestionIndex];

  const renderInstructions = () =>
    !["playing", "start"].includes(gameState) ? null : (
      <div
        className={`${theme.cardBg} backdrop-blur-lg rounded-3xl shadow-2xl p-6 text-start border border-white/20 transform hover:scale-105 transition-all duration-300 mb-4`}
      >
        <p className="font-semibold text-lg text-gray-700">Follow the below instructions</p>
        <p className="font-semibold text-sm text-gray-700">
          Start the game with{" "}
          <span className="font-bold text-lg">{currentPlayer}</span> username. Solve the
          given <span className="font-bold text-lg">Maths problem</span> equation, and{" "}
          <span className="font-bold text-lg">submit answer</span>.
        </p>
      </div>
    );

  return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.gradient} p-4`}>
      {/* Header */}
      <header
        className={`${theme.cardBg} backdrop-blur-lg rounded-2xl shadow-2xl p-6 mb-8 border border-white/20`}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-3 rounded-full">
              <Target className={`w-8 h-8 ${theme.accent}`} />
            </div>
            <h1 className={`text-3xl font-bold ${theme.accent}`}>
              Learn Maths 🧮
            </h1>
          </div>

          <div className="flex items-center gap-4 bg-white/10 rounded-full px-6 py-3">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-700">Math Master 🎯</p>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Mail className="w-4 h-4" />
                mathmaster@learngame.com
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        {renderInstructions()}
        {gameState === "start" && (
          <div
            className={`${theme.cardBg} backdrop-blur-lg rounded-3xl shadow-2xl p-12 text-center border border-white/20 transform hover:scale-105 transition-all duration-300`}
          >
            <div className="mb-8">
              <div className="text-8xl mb-4">🎮</div>
              <h2 className={`text-4xl font-bold ${theme.accent} mb-4`}>
                Welcome to Math Challenge!
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Test your math skills with 7 exciting questions! ✨
              </p>
            </div>

            <div className="max-w-md mx-auto space-y-6">
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Enter your username 👤
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Your awesome name here... 🌟"
                  className="w-full px-6 py-4 text-lg border-2 border-white/30 rounded-2xl focus:border-blue-400 focus:outline-none bg-white/50 backdrop-blur-sm"
                  onKeyPress={(e) => e.key === "Enter" && startGame()}
                />
              </div>

              <button
                onClick={startGame}
                disabled={!username.trim()}
                className={`w-full ${theme.buttonPrimary} text-white text-xl font-bold py-4 px-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
              >
                Start Game! 🚀
              </button>
            </div>
          </div>
        )}

        {gameState === "playing" && currentQuestion && (
          <div
            className={`${
              theme.cardBg
            } backdrop-blur-lg rounded-3xl shadow-2xl p-12 text-center border border-white/20 ${
              showAnimation ? "animate-pulse" : ""
            }`}
          >
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <div className="text-2xl font-bold text-gray-600">
                  Question {currentQuestionIndex + 1}/7
                </div>
                <div className="flex gap-2">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 rounded-full ${
                        i <= currentQuestionIndex
                          ? "bg-green-400"
                          : "bg-gray-300"
                      } transition-all duration-300`}
                    />
                  ))}
                </div>
              </div>

              <div className="text-6xl mb-6">{currentQuestion.emoji}</div>
              <h2 className={`text-5xl font-bold ${theme.accent} mb-8`}>
                {currentQuestion.question}
              </h2>
            </div>

            <div className="max-w-md mx-auto space-y-6">
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter your answer... 🤔"
                className="w-full px-6 py-4 text-xl text-center border-2 border-white/30 rounded-2xl focus:border-blue-400 focus:outline-none bg-white/50 backdrop-blur-sm"
                onKeyPress={(e) => e.key === "Enter" && submitAnswer()}
                autoFocus
              />

              <button
                onClick={submitAnswer}
                disabled={!userAnswer.trim()}
                className={`w-full ${theme.buttonPrimary} text-white text-xl font-bold py-4 px-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50`}
              >
                Submit Answer! ✅
              </button>
            </div>
          </div>
        )}

        {gameState === "success" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Success Message */}
            <div className="flex flex-col gap-8">
              <div
                className={`${theme.cardBg} backdrop-blur-lg rounded-3xl shadow-2xl p-8 text-center border border-white/20`}
              >
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-3xl font-bold text-green-600 mb-4">
                  Congratulations! 🏆
                </h2>
                <p className="text-lg text-gray-700">
                  You answered all questions correctly!
                </p>
              </div>
              {currentPlayer === username && (
                <div
                  className={`${theme.cardBg} backdrop-blur-lg rounded-3xl shadow-2xl p-8 text-center border border-white/20`}
                >
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black p-4 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-bold mb-2">
                      Awesome! Here is your password
                    </h3>
                    <p className="text-2xl font-mono font-bold tracking-wider">
                      {PASSWORD_MathGame}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Leaderboard */}
            <div
              className={`${theme.cardBg} backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 max-h-[calc(100vh-400px)]`}
            >
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">🏆</div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">
                  Leaderboard
                </h3>
                <p className="text-sm text-gray-600">Top Math Champions! ⭐</p>
              </div>

              <div className="space-y-3 max-h-[calc(100vh-600px)] overflow-y-auto">
                {leaderboard.slice(0, 8).map((player, index) => {
                  const isCurrentUser =
                    player.name.includes(username) && username;
                  return (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-xl backdrop-blur-sm border transition-all duration-200 ${
                        isCurrentUser
                          ? "bg-gradient-to-r from-green-400/30 to-blue-400/30 border-green-400/50 transform scale-105"
                          : index < 3
                          ? "bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border-white/20 bg-white/30 hover:scale-102"
                          : "bg-white/30 border-white/20 hover:scale-102"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            index === 0
                              ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
                              : index === 1
                              ? "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700"
                              : index === 2
                              ? "bg-gradient-to-r from-orange-400 to-orange-600 text-white"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {index === 0
                            ? "👑"
                            : index === 1
                            ? "🥈"
                            : index === 2
                            ? "🥉"
                            : index + 1}
                        </div>
                        <div>
                          <p
                            className={`font-bold text-sm ${
                              isCurrentUser ? "text-green-700" : ""
                            }`}
                          >
                            {player.name}
                            {isCurrentUser && " (You!)"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {player.completedAt}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-lg font-bold ${
                            player.score === 7
                              ? "text-green-600"
                              : "text-orange-600"
                          }`}
                        >
                          {player.score}/7
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {gameState === "failed" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Failure Message */}
            <div
              className={`${theme.cardBg} backdrop-blur-lg rounded-3xl shadow-2xl p-8 text-center border border-white/20 flex flex-col justify-center max-h-80`}
            >
              <div className="text-6xl mb-4 animate-pulse">😢</div>
              <h2 className="text-3xl font-bold text-red-600 mb-4">
                Game Over!
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Oops! That wasn't the right answer. Better luck next time! 💪
              </p>
            </div>

            {/* Leaderboard */}
            <div
              className={`${theme.cardBg} backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20`}
            >
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">🏆</div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">
                  Leaderboard
                </h3>
                <p className="text-sm text-gray-600">
                  See how others performed! ⭐
                </p>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {leaderboard.slice(0, 8).map((player, index) => {
                  const isCurrentUser =
                    player.name.includes(username) && username;
                  return (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-xl backdrop-blur-sm border transition-all duration-200 ${
                        isCurrentUser
                          ? "bg-gradient-to-r from-green-400/30 to-blue-400/30 border-green-400/50 transform scale-105"
                          : index < 3
                          ? "bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border-white/20 bg-white/30 hover:scale-102"
                          : "bg-white/30 border-white/20 hover:scale-102"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            index === 0
                              ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
                              : index === 1
                              ? "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700"
                              : index === 2
                              ? "bg-gradient-to-r from-orange-400 to-orange-600 text-white"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {index === 0
                            ? "👑"
                            : index === 1
                            ? "🥈"
                            : index === 2
                            ? "🥉"
                            : index + 1}
                        </div>
                        <div>
                          <p
                            className={`font-bold text-sm ${
                              isCurrentUser ? "text-green-700" : ""
                            }`}
                          >
                            {player.name}
                            {isCurrentUser && " (You!)"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {player.completedAt}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-lg font-bold ${
                            player.score === 7
                              ? "text-green-600"
                              : "text-orange-600"
                          }`}
                        >
                          {player.score}/7
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {gameState === "leaderboard" && (
          <div
            className={`${theme.cardBg} backdrop-blur-lg rounded-3xl shadow-2xl p-12 border border-white/20`}
          >
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🏆</div>
              <h2 className={`text-4xl font-bold ${theme.accent} mb-4`}>
                Leaderboard
              </h2>
              <p className="text-xl text-gray-600">Top Math Champions! ⭐</p>
            </div>

            <div className="space-y-4 mb-8">
              {leaderboard.slice(0, 10).map((player, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-6 bg-white/30 rounded-2xl backdrop-blur-sm border border-white/20 transform hover:scale-102 transition-all duration-200 ${
                    index < 3
                      ? "bg-gradient-to-r from-yellow-400/20 to-orange-400/20"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
                        index === 0
                          ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
                          : index === 1
                          ? "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700"
                          : index === 2
                          ? "bg-gradient-to-r from-orange-400 to-orange-600 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {index === 0
                        ? "👑"
                        : index === 1
                        ? "🥈"
                        : index === 2
                        ? "🥉"
                        : index + 1}
                    </div>
                    <div>
                      <p className="font-bold text-lg">{player.name}</p>
                      <p className="text-sm text-gray-500">
                        Completed: {player.completedAt}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">
                      {player.score}/7
                    </p>
                    <p className="text-sm text-gray-500">Questions</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={resetGame}
                className={`${theme.buttonPrimary} text-white text-xl font-bold py-4 px-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200`}
              >
                Start New Game 🎮
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Loading Animation Overlay */}
      {showAnimation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-12 text-center shadow-2xl animate-pulse">
            <div className="text-8xl mb-4">
              {gameState === "playing" &&
              currentQuestionIndex === questions.length - 1
                ? "🎉"
                : "⏳"}
            </div>
            <p className="text-2xl font-bold text-gray-700">
              {gameState === "playing" &&
              currentQuestionIndex === questions.length - 1
                ? "Calculating Results..."
                : "Processing..."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MathGame;
