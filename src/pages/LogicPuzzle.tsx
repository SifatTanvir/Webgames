import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export const TASK_ID_LogicPuzzle = "webgame-reasoning-puzzle";
export const PASSWORD_LogicPuzzle = "brainiacs";

type GridCell = number | null;

type PuzzleRow = {
  row: GridCell[];
  pattern: string;
};


const gradients = [
  "bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]",
  "bg-gradient-to-r from-[#1e3c72] to-[#2a5298]",
  "bg-gradient-to-br from-[#00c6ff] to-[#0072ff]",
  "bg-gradient-to-br from-[#f953c6] to-[#b91d73]",
  "bg-gradient-to-r from-[#4facfe] to-[#00f2fe]",
];

const LogicPuzzle: React.FC = () => {
  const [puzzle, setPuzzle] = useState<PuzzleRow[]>([]);
  const [userInput, setUserInput] = useState<string[][]>([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [stage, setStage] = useState<"form" | "success" | "preview">("form");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [bgClass, setBgClass] = useState<string>("");
  const { width, height } = useWindowSize();
  const [solutionGridState, setSolutionGrid] = useState<number[][]>([]);

  useEffect(() => {
    const increments = [2, 3, 4, 5, 6];
    const tempPuzzle: PuzzleRow[] = [];
    const tempSolution: number[][] = [];

    for (let i = 0; i < 3; i++) {
      const start = Math.floor(Math.random() * 5) + 1; // start from 1–5
      const inc = increments[Math.floor(Math.random() * increments.length)];
      const fullRow = [start, start + inc, start + 2 * inc];
      const pattern = `+${inc}`;
      const hiddenIndex = Math.floor(Math.random() * 3);

      const rowWithMissing: GridCell[] = fullRow.map((val, idx) =>
        idx === hiddenIndex ? null : val
      );

      tempPuzzle.push({ row: rowWithMissing, pattern });
      tempSolution.push(fullRow);
    }

    setPuzzle(tempPuzzle);
    setSolutionGrid(tempSolution);
    setBgClass(gradients[Math.floor(Math.random() * gradients.length)]);
  }, []);


  const handleChange = (row: number, col: number, value: string) => {
    const updated = [...userInput];
    updated[row][col] = value;
    setUserInput(updated);
  };

  const validateAnswers = () => {
    for (let i = 0; i < puzzle.length; i++) {
      for (let j = 0; j < puzzle[i].row.length; j++) {
        const cell = puzzle[i].row[j];
        if (cell === null) {
          const input = userInput[i][j];
          const correctAnswer = solutionGridState[i][j];
          if (parseInt(input) !== correctAnswer) {
            return false;
          }
        }
      }
    }
    return true;
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const isValid = validateAnswers();
    if (!isValid) {
      setError("❌ Some answers are incorrect. Try again!");
      setStage("preview");
      return;
    }

    setError("");
    if (attempts === 0) {
      setShowPassword(true);
    } else {
      setShowPassword(false);
    }
    setStage("success");
  };

  const handleTryAgain = () => {
    setUserInput([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setError("");
    setAttempts((prev) => prev + 1);
    setStage("form");
  };

  return (
    <div className={`min-h-screen ${bgClass} flex items-center justify-center px-6 py-12 font-sans`}>
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] p-10 max-w-2xl w-full transition-all duration-500 relative overflow-hidden border border-white/20 text-white">
        {stage === "form" && (
          <>
            <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-2">
              🧠 Number Logic Puzzle
            </h1>
            <p className="text-center text-white/80 mb-6">
              Fill in the missing numbers using the pattern in each row.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              {puzzle.map((rowData, rowIndex) => (
                <div key={rowIndex} className="flex justify-center gap-4">
                  {rowData.row.map((cell, colIndex) => (
                    <div key={colIndex}>
                      {cell !== null ? (
                        <div className="w-16 h-16 flex items-center justify-center text-xl font-bold rounded-xl bg-white/20 border border-white/30 shadow-inner">
                          {cell}
                        </div>
                      ) : (
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={userInput[rowIndex][colIndex]}
                          onChange={(e) => {
                            const onlyDigits = e.target.value.replace(/[^0-9]/g, "");
                            handleChange(rowIndex, colIndex, onlyDigits);
                          }}
                          className="w-16 h-16 text-center text-xl font-semibold rounded-xl border border-pink-400 bg-white/10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                      )}
                    </div>
                  ))}
                </div>
              ))}
              {error && <p className="text-pink-300 text-sm text-center animate-pulse">{error}</p>}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-lg font-semibold py-3 rounded-xl transition duration-300 shadow-md hover:shadow-lg"
              >
                ✅ Submit Your Answers
              </button>
            </form>
          </>
        )}

        {stage === "success" && (
          <div className="relative text-center animate-fade-in bg-white/10 rounded-3xl p-8 shadow-2xl border border-green-200 overflow-hidden">
            <Confetti width={width} height={height} numberOfPieces={250} recycle={false} />
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-lime-300 to-emerald-300 drop-shadow mb-4">
              🎉 Puzzle Solved!
            </h2>
            <p className="text-lg text-white/90 mb-6 max-w-lg mx-auto">
              Excellent work! You've successfully cracked the number logic puzzle.
            </p>
            {showPassword && (
              <div className="inline-block px-6 py-5 mt-6 rounded-2xl border border-green-400 bg-white text-green-700 font-mono text-2xl shadow-lg animate-bounce ring-2 ring-green-300 ring-offset-2">
                🔐 Password: <strong>{PASSWORD_LogicPuzzle}</strong>
              </div>
            )}
          </div>
        )}

        {stage === "preview" && (
          <div className="text-center animate-fade-in px-6 py-8 rounded-3xl shadow-xl bg-white/20 backdrop-blur-md border border-gray-200">
            <div className="flex flex-col items-center">
              <div className="text-5xl mb-2">❌</div>
              <h2 className="text-3xl font-extrabold text-red-300 mb-2">
                Oops!
              </h2>
              <p className="text-white/80 mb-6 max-w-md mx-auto">
                Some numbers don’t match the pattern. Try again — you've got this!
              </p>
              <button
                onClick={handleTryAgain}
                className="bg-gradient-to-r from-rose-400 via-red-400 to-red-500 hover:from-red-500 hover:to-rose-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300"
              >
                🔄 Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogicPuzzle;