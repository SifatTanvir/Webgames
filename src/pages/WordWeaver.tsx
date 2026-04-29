import React, { useState, useMemo, useEffect } from 'react';

// --- CONFIGURATION & STATIC DATA ---
export const TASK_ID_WordWeaver = "webgame-wordladder-solvewordpuzzle";
export const PASSWORD_WordWeaver = "LEXICON";

// --- MOCK DATA & TYPES ---
type GameState = 'playing' | 'success' | 'failure';
type AccentColor = { name: string; bg: string; text: string; ring: string; border: string; shadow: string; };
interface Puzzle { start: string; end: string; steps: number; dictionary: string[]; }

const ACCENT_COLORS: AccentColor[] = [
    { name: 'cyan', bg: 'bg-cyan-500', text: 'text-cyan-400', ring: 'focus:ring-cyan-500', border: 'border-cyan-500', shadow: 'shadow-cyan-500/50' },
    { name: 'amber', bg: 'bg-amber-500', text: 'text-amber-400', ring: 'focus:ring-amber-500', border: 'border-amber-500', shadow: 'shadow-amber-500/50' },
    { name: 'magenta', bg: 'bg-fuchsia-500', text: 'text-fuchsia-400', ring: 'focus:ring-fuchsia-500', border: 'border-fuchsia-500', shadow: 'shadow-fuchsia-500/50' },
];

const PUZZLES: Puzzle[] = [
    { start: "COLD", end: "WARM", steps: 4, dictionary: ["COLD", "CORD", "WORD", "WARD", "WARM"] },
    { start: "HEAD", end: "TAIL", steps: 5, dictionary: ["HEAD", "HEAL", "TEAL", "TELL", "TALL", "TAIL"] },
    { start: "CAT", end: "DOG", steps: 3, dictionary: ["CAT", "COT", "DOT", "DOG"] },
    { start: "CODE", end: "NODE", steps: 3, dictionary: ["CODE", "CONE", "NONE", "NODE"] },
];

// --- MAIN CONTROLLER COMPONENT ---
const WordWeaverExperience: React.FC = () => {
    const [gameState, setGameState] = useState<GameState>('playing');
    const [ladder, setLadder] = useState<string[]>([]);
    const [currentWord, setCurrentWord] = useState('');
    const [error, setError] = useState('');

    const accentColor = useMemo(() => ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)], []);
    const puzzle = useMemo(() => PUZZLES[Math.floor(Math.random() * PUZZLES.length)], []);

    useEffect(() => {
        setLadder([puzzle.start]);
    }, [puzzle]);

    const isOneLetterApart = (word1: string, word2: string) => {
        if (word1.length !== word2.length) return false;
        let diff = 0;
        for (let i = 0; i < word1.length; i++) {
            if (word1[i] !== word2[i]) diff++;
        }
        return diff === 1;
    };

    const handleSubmit = () => {
        const newWord = currentWord.toUpperCase();
        const lastWord = ladder[ladder.length - 1];

        if (newWord.length !== puzzle.start.length) {
            setError(`Word must be ${puzzle.start.length} letters long.`);
            return;
        }
        if (!isOneLetterApart(lastWord, newWord)) {
            setError("Must be one letter different from the previous word.");
            return;
        }
        if (ladder.includes(newWord)) {
            setError("Word has already been used.");
            return;
        }

        setError('');
        const newLadder = [...ladder, newWord];
        setLadder(newLadder);
        setCurrentWord('');

        if (newWord === puzzle.end) {
            if (newLadder.length - 1 <= puzzle.steps) {
                setGameState('success');
            } else {
                setGameState('failure');
            }
        } else if (newLadder.length - 1 >= puzzle.steps) {
            setGameState('failure');
        }
    };

    useEffect(() => {
        const container = document.getElementById('bg-text-container');
        if (!container) return;
        while (container.firstChild) { container.removeChild(container.firstChild); }
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for (let i = 0; i < 30; i++) {
            const char = document.createElement('div');
            char.className = 'bg-char';
            char.innerText = chars[Math.floor(Math.random() * chars.length)];
            char.style.top = `${Math.random() * 100}%`;
            char.style.left = `${Math.random() * 100}%`;
            char.style.fontSize = `${Math.random() * 100 + 20}px`;
            char.style.animationDuration = `${Math.random() * 20 + 15}s`;
            char.style.animationDelay = `${Math.random() * 20}s`;
            container.appendChild(char);
        }
    }, []);

    return (
        <div className="min-h-screen font-sans text-gray-200 flex flex-col items-center justify-center bg-gray-900 p-4 overflow-hidden">
            <div id="bg-text-container" className="fixed top-0 left-0 w-full h-full z-0 opacity-10"></div>
            <style>{`.bg-char { position: absolute; color: ${accentColor.text.replace('text-','').replace('-400','')}; animation: drift linear infinite; user-select: none; } @keyframes drift { 0% { transform: translateY(100vh) rotate(0deg); } 100% { transform: translateY(-100vh) rotate(360deg); } }`}</style>

            {gameState !== 'playing' && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900/80 backdrop-blur-sm animate-fade-in">
                    <div className={`bg-gray-800/80 border ${accentColor.border}/50 rounded-2xl shadow-2xl p-12 text-center max-w-lg w-full ${accentColor.shadow}`}>
                        <h2 className={`text-5xl font-extrabold ${gameState === 'success' ? 'text-green-400' : 'text-red-500'}`}>{gameState === 'success' ? 'SUCCESS: LADDER COMPLETE' : 'FAILURE'}</h2>
                        <p className="mt-4 text-gray-300 text-lg">{gameState === 'success' ? "You have successfully woven the words." : `You exceeded the step limit of ${puzzle.steps}.`}</p>
                        {gameState === 'success' && (
                            <div className="mt-8 bg-gray-900 p-6 rounded-lg border-2 border-dashed border-gray-700">
                                <p className="font-semibold text-gray-400">Decryption Key:</p>
                                <p className={`mt-2 text-3xl font-mono ${accentColor.text} tracking-widest`}>{PASSWORD_WordWeaver}</p>
                            </div>
                        )}
                        <p className="mt-8 text-sm text-gray-500">Please refresh the page to start a new puzzle.</p>
                    </div>
                </div>
            )}

            <div className="relative z-10 w-full max-w-md">
                <div className={`bg-black/30 backdrop-blur-xl border ${accentColor.border}/30 rounded-2xl shadow-2xl p-6 ${accentColor.shadow}`}>
                    <div className={`bg-black/30 p-4 rounded-lg mb-6 text-center border ${accentColor.border}/50`}>
                        <h1 className={`text-2xl font-bold ${accentColor.text}`}>Word Weaver</h1>
                        <div className="flex justify-around items-center mt-2">
                            <div><p className="text-gray-400 text-sm">START</p><p className="font-mono text-2xl font-bold">{puzzle.start}</p></div>
                            <div className="text-2xl animate-pulse">→</div>
                            <div><p className="text-gray-400 text-sm">END</p><p className="font-mono text-2xl font-bold">{puzzle.end}</p></div>
                            <div><p className="text-gray-400 text-sm">STEPS</p><p className="font-mono text-2xl font-bold">{ladder.length - 1} / {puzzle.steps}</p></div>
                        </div>
                    </div>

                    <div className="space-y-2 mb-6 h-64 flex flex-col items-center">
                        {ladder.map((word, i) => (
                            <div key={i} className="font-mono text-2xl tracking-widest p-2 bg-gray-800/50 rounded-md animate-fade-in-up" style={{animationDelay: `${i*50}ms`}}>{word}</div>
                        ))}
                    </div>

                    <div className="border-t-2 border-gray-700 pt-4">
                        <input
                            type="text"
                            value={currentWord}
                            onChange={(e) => setCurrentWord(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                            maxLength={puzzle.start.length}
                            className={`w-full p-4 text-center font-mono text-3xl tracking-widest bg-gray-900/50 rounded-lg border-2 ${error ? 'border-red-500' : accentColor.border} ${accentColor.ring}`}
                            disabled={gameState !== 'playing'}
                        />
                        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
                        <button onClick={handleSubmit} disabled={gameState !== 'playing'} className={`w-full mt-4 font-semibold py-3 rounded-lg text-white ${accentColor.bg} disabled:bg-gray-600`}>
                            Submit Word
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WordWeaverExperience;
