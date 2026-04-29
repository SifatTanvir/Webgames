import React, { useState, useMemo } from 'react';

// --- CONFIGURATION & STATIC DATA ---
export const TASK_ID_SystemLock = "webgame-codebreaking-guessthecolorsequence";
export const PASSWORD_SystemLock = "AEGIS";

// --- MOCK DATA & TYPES ---
type AccentColor = { name: string; bg: string; text: string; ring: string; border: string; glow: string; };
type Guess = { colors: string[]; feedback: { correctPosition: number; correctColor: number; }; };

const ACCENT_COLORS: AccentColor[] = [
    { name: 'cyan', bg: 'bg-cyan-500', text: 'text-cyan-400', ring: 'focus:ring-cyan-500', border: 'border-cyan-500', glow: 'shadow-[0_0_15px_rgba(6,182,212,0.7)]' },
    { name: 'lime', bg: 'bg-lime-500', text: 'text-lime-400', ring: 'focus:ring-lime-500', border: 'border-lime-500', glow: 'shadow-[0_0_15px_rgba(132,204,22,0.7)]' },
    { name: 'magenta', bg: 'bg-fuchsia-500', text: 'text-fuchsia-400', ring: 'focus:ring-fuchsia-500', border: 'border-fuchsia-500', glow: 'shadow-[0_0_15px_rgba(217,70,239,0.7)]' },
];

const ALL_COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6']; // Red, Orange, Yellow, Green, Blue, Purple

// --- MAIN CONTROLLER COMPONENT ---
const SystemLockExperience: React.FC = () => {
    const [isTaskSuccessful, setIsTaskSuccessful] = useState<boolean>(false);
    const [showCompletion, setShowCompletion] = useState(false);
    const [guesses, setGuesses] = useState<Guess[]>([]);
    const [currentGuess, setCurrentGuess] = useState<string[]>([]);
    const [error, setError] = useState('');

    const accentColor = useMemo(() => ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)], []);
    const secretCode = useMemo(() => ['#ef4444', '#f97316', '#eab308', '#22c55e'], []);
    const colorPalette = useMemo(() => [...ALL_COLORS].sort(() => 0.5 - Math.random()), []);
    
    const isGameOver = guesses.length >= 10;

    const handleColorSelect = (color: string) => {
        if (currentGuess.length < 4) {
            setCurrentGuess(prev => [...prev, color]);
            setError('');
        }
    };
    
    const handleGuessSlotClick = (index: number) => {
        setCurrentGuess(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmitGuess = () => {
        if (currentGuess.length !== 4) {
            setError('Code must be 4 colors long.');
            return;
        }

        let correctPosition = 0;
        let correctColor = 0;
        const secretCopy = [...secretCode];
        const guessCopy = [...currentGuess];

        // First pass for correct position
        for (let i = 3; i >= 0; i--) {
            if (guessCopy[i] === secretCopy[i]) {
                correctPosition++;
                secretCopy.splice(i, 1);
                guessCopy.splice(i, 1);
            }
        }

        // Second pass for correct color
        for (let i = 0; i < guessCopy.length; i++) {
            const colorIndex = secretCopy.indexOf(guessCopy[i]);
            if (colorIndex > -1) {
                correctColor++;
                secretCopy.splice(colorIndex, 1);
            }
        }
        
        const newGuesses = [...guesses, { colors: currentGuess, feedback: { correctPosition, correctColor } }];
        setGuesses(newGuesses);
        setCurrentGuess([]);

        if (correctPosition === 4) {
            setIsTaskSuccessful(true);
            setShowCompletion(true);
        } else if (newGuesses.length >= 10) {
            setShowCompletion(true);
        }
    };

    return (
        <div className="min-h-screen font-sans text-gray-200 flex flex-col items-center justify-center bg-gray-900 p-4 bg-gradient-to-br from-gray-900 via-gray-900 to-black">
            {showCompletion && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900/80 backdrop-blur-sm animate-fade-in">
                    <div className={`bg-gray-800 border ${accentColor.border}/50 rounded-2xl shadow-2xl p-12 text-center max-w-lg w-full ${accentColor.glow}`}>
                        <h2 className={`text-5xl font-extrabold ${isTaskSuccessful ? 'text-green-400' : accentColor.text}`}>{isTaskSuccessful ? 'ACCESS GRANTED' : 'SYSTEM LOCKED'}</h2>
                        <p className="mt-4 text-gray-300 text-lg">{isTaskSuccessful ? "You have successfully bypassed the security." : `Try Again!`}</p>
                       
                        {isTaskSuccessful && (
                            <div className="mt-8 bg-gray-900 p-6 rounded-lg border-2 border-dashed border-gray-700">
                                <p className="font-semibold text-gray-400">Final Password:</p>
                                <p className={`mt-2 text-3xl font-mono ${accentColor.text} tracking-widest`}>{PASSWORD_SystemLock}</p>
                            </div>
                        )}
                        <p className="mt-8 text-sm text-gray-500">Please refresh the page to start a new game.</p>
                    </div>
                </div>
            )}

            <div className={`w-full max-w-3xl bg-gray-800/50 border ${accentColor.border}/30 rounded-2xl shadow-2xl p-6 ${accentColor.glow}`}>
                <h1 className={`text-3xl font-bold text-center mb-1 ${accentColor.text}`}>SYSTEM LOCK</h1>
                <p className="text-center text-gray-400 mb-6">Break the 4-color secret code. You have 10 attempts.</p>

                <div className="space-y-2 mb-6 h-[26rem] overflow-y-auto pr-2">
                    {Array.from({ length: 10 }).map((_, i) => {
                        const guess = guesses[i];
                        return (
                            <div key={i} className="h-10 flex items-center justify-between bg-black/30 p-2 rounded-lg">
                                <div className="text-gray-500 font-mono mr-2">{String(i + 1).padStart(2, '0')}</div>
                                <div className="flex gap-2">
                                    {Array.from({ length: 4 }).map((_, j) => (
                                        <div key={j} className="w-8 h-8 rounded-full border border-gray-700 bg-gray-800/50" style={{ backgroundColor: guess?.colors[j] }}></div>
                                    ))}
                                </div>
                                <div className="w-24 grid grid-cols-2 gap-1.5 ml-4">
                                    {guess && Array.from({ length: 4 }).map((_, j) => (
                                        <div key={j} className={`w-3 h-3 rounded-full ${j < guess.feedback.correctPosition ? 'bg-green-500' : j < guess.feedback.correctPosition + guess.feedback.correctColor ? 'bg-white' : 'bg-gray-600'}`}></div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className={`border-t-2 ${accentColor.border} pt-4`}>
                    <div className="flex items-center justify-between bg-black/30 p-2 rounded-lg mb-4">
                         <div className="flex gap-2">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} onClick={() => handleGuessSlotClick(i)} className="w-10 h-10 rounded-full border-2 border-dashed border-gray-600 cursor-pointer bg-gray-800/50" style={{ backgroundColor: currentGuess[i] }}></div>
                            ))}
                        </div>
                        <button onClick={handleSubmitGuess} disabled={isGameOver || currentGuess.length !== 4} className={`font-semibold py-2 px-6 rounded-lg text-white ${accentColor.bg} disabled:bg-gray-600 disabled:cursor-not-allowed`}>Submit</button>
                    </div>
                    {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
                    <div className="flex justify-center items-center gap-3 bg-black/30 p-3 rounded-lg">
                        {colorPalette.map(color => (
                            <div key={color} onClick={() => handleColorSelect(color)} className="w-10 h-10 rounded-full cursor-pointer transition-transform hover:scale-110" style={{ backgroundColor: color }}></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SystemLockExperience;
