import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, CartesianGrid } from 'recharts';

// --- CONFIGURATION & STATIC DATA ---
export const TASK_ID_RetirementPlan = "finance-investment-retirementplanning";
export const PASSWORD_RetirementPlan = "PLAN_xms02lw";

// --- TYPES & DUMMY DATA ---
type Page = 'dashboard' | 'retirement';
type RiskProfile = 'Conservative' | 'Moderate' | 'Aggressive Growth';
type RetirementStage = 'contribution' | 'risk' | 'goals';

const projectedGrowthData = [
    { age: 30, value: 50000 }, { age: 35, value: 150000 }, { age: 40, value: 300000 },
    { age: 45, value: 500000 }, { age: 50, value: 750000 }, { age: 55, value: 1100000 },
    { age: 60, value: 1500000 }, { age: 65, value: 2000000 },
];
const assetAllocationData = [
    { name: 'Stocks', value: 60 }, { name: 'Bonds', value: 30 },
    { name: 'Cash', value: 10 },
];
const PIE_COLORS = ['#8b5cf6', '#06b6d4', '#f59e0b'];

// --- MAIN COMPONENT ---
const RetirementPlanExperience: React.FC = () => {
    const [page, setPage] = useState<Page>('dashboard');
    const [isComplete, setIsComplete] = useState(false);
    const [isTaskSuccessful, setIsTaskSuccessful] = useState(false);
    const [currentStage, setCurrentStage] = useState<RetirementStage>('contribution');
    
    // --- DYNAMIC TASK DEFINITION & RANDOMIZATION ---
    const { taskDefinition, headerInstruction, accountDetails, randomizedOptions, initialState } = useMemo(() => {
        const riskProfiles: RiskProfile[] = ['Conservative', 'Moderate', 'Aggressive Growth'];
        const initialProfileIndex = Math.floor(Math.random() * riskProfiles.length);
        let targetProfileIndex = Math.floor(Math.random() * riskProfiles.length);
        // Ensure target is different from initial
        while (targetProfileIndex === initialProfileIndex) {
            targetProfileIndex = Math.floor(Math.random() * riskProfiles.length);
        }
        
        const initialContribution = 500;
        const percentageIncreases = [3, 5, 8, 10];
        const targetIncreasePercent = percentageIncreases[Math.floor(Math.random() * percentageIncreases.length)];
        const targetContribution = initialContribution * (1 + targetIncreasePercent / 100);

        const retirementGoals = [
            'Travel the World',
            'Buy a Dream Home', 
            'Start a Business',
            'Support Family',
            'Pursue Hobbies',
            'Healthcare Security'
        ];
        const randomGoal = retirementGoals[Math.floor(Math.random() * retirementGoals.length)];

        return {
            taskDefinition: {
                increasePercent: targetIncreasePercent,
                targetContribution: targetContribution,
                riskProfile: riskProfiles[targetProfileIndex],
                requiredGoal: randomGoal,
            },
            headerInstruction: `Task: Increase monthly contribution by ${targetIncreasePercent}% $${targetContribution.toFixed(2)}, set risk tolerance to '${riskProfiles[targetProfileIndex]}', and select '${randomGoal}' as a retirement goal.`,
            accountDetails: {
                accountNumber: `ACCT-${Math.floor(100000 + Math.random() * 900000)}`,
                username: ['Alex Morgan', 'Casey Jordan'][Math.floor(Math.random() * 2)],
            },
            randomizedOptions: {
                riskProfiles: [...riskProfiles].sort(() => 0.5 - Math.random()),
            },
            initialState: {
                contribution: initialContribution,
                riskProfile: riskProfiles[initialProfileIndex],
            }
        };
    }, []);

    // Form State
    const [contribution, setContribution] = useState(initialState.contribution);
    const [riskProfile, setRiskProfile] = useState<RiskProfile>(initialState.riskProfile);
    const [retirementGoals, setRetirementGoals] = useState<string[]>([]);
    const [showGoalError, setShowGoalError] = useState(false);

    // --- EVENT HANDLERS ---
    const handleNextStage = () => {
        if (currentStage === 'contribution') {
            setCurrentStage('risk');
        } else if (currentStage === 'risk') {
            setCurrentStage('goals');
        }
    };

    const handleGoalsNext = () => {
        if (retirementGoals.length === 0) {
            setShowGoalError(true);
            return;
        }
        setShowGoalError(false);
        handleSaveChanges();
    };

    const handlePreviousStage = () => {
        if (currentStage === 'goals') {
            setCurrentStage('risk');
        } else if (currentStage === 'risk') {
            setCurrentStage('contribution');
        }
    };

    const handleSaveChanges = () => {
        const isContributionCorrect = contribution === taskDefinition.targetContribution;
        const isRiskCorrect = riskProfile === taskDefinition.riskProfile;
        const isGoalCorrect = retirementGoals.includes(taskDefinition.requiredGoal);
        
        if (isContributionCorrect && isRiskCorrect && isGoalCorrect) {
            setIsTaskSuccessful(true);
        }
        setIsComplete(true);
    };

    const toggleGoal = (goal: string) => {
        setRetirementGoals(prev => 
            prev.includes(goal) 
                ? prev.filter(g => g !== goal)
                : [...prev, goal]
        );
    };

    const getStageProgress = () => {
        const stages = ['contribution', 'risk', 'goals'];
        return ((stages.indexOf(currentStage) + 1) / stages.length) * 100;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 font-sans text-white flex">
            <aside className="w-64 bg-black/40 backdrop-blur-xl p-6 flex-col hidden lg:flex border-r border-white/10">
                <div className="flex items-center gap-3 mb-12">
                     <span className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-bold text-2xl">F</span>
                     <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">FinFuture</h1>
                </div>
                <nav className="flex-grow space-y-2">
                    <a onClick={() => setPage('dashboard')} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer font-semibold transition-all duration-300 ${page === 'dashboard' ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30' : 'hover:bg-white/10'}`}>
                        <span className="text-xl">📊</span> Dashboard
                    </a>
                    <a onClick={() => setPage('retirement')} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer font-semibold transition-all duration-300 ${page === 'retirement' ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30' : 'hover:bg-white/10'}`}>
                       <span className="text-xl">💰</span> Retirement Plan
                    </a>
                </nav>
                 <div className="text-xs text-slate-300">
                    <p>Account: {accountDetails.accountNumber}</p>
                    <p>User: {accountDetails.username}</p>
                </div>
            </aside>

            <main className="flex-1 p-4 sm:p-8">
                <header className="bg-black/30 backdrop-blur-xl p-6 rounded-2xl mb-8 border border-white/20 text-center shadow-2xl">
                    <h1 className="font-semibold text-white text-lg">{headerInstruction}</h1>
                </header>

                {isComplete ? (
                     <div className="m-auto text-center bg-black/40 backdrop-blur-xl p-12 rounded-2xl shadow-2xl animate-fade-in border border-green-500/30 max-w-md">
                        <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-2xl">✅</span>
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">Plan Updated!</h2>
                        <p className="text-slate-300 mb-6">Your retirement plan changes have been saved successfully.</p>
                        {isTaskSuccessful && (
                            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-6 rounded-xl border border-green-500/30">
                                <p className="font-semibold text-green-300 mb-2">Final Password:</p>
                                <p className="text-2xl font-mono text-green-400 tracking-widest">{PASSWORD_RetirementPlan}</p>
                            </div>
                        )}
                    </div>
                ) : page === 'dashboard' ? (
                     <div className="space-y-8 animate-fade-in">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 bg-black/30 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20">
                                <h3 className="font-bold text-white mb-6 text-xl">Projected Growth</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <AreaChart data={projectedGrowthData}>
                                        <defs>
                                            <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                                        <XAxis dataKey="age" stroke="#e2e8f0" fontSize={12} />
                                        <YAxis stroke="#e2e8f0" fontSize={12} tickFormatter={(value) => `$${(value as number / 1000)}k`} />
                                        <Tooltip contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '12px' }}/>
                                        <Area type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} fill="url(#colorGrowth)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                             <div className="bg-black/30 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20">
                                <h3 className="font-bold text-white mb-6 text-xl">Asset Allocation</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie data={assetAllocationData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                                            {assetAllocationData.map((_, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />)}
                                        </Pie>
                                        <Tooltip contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '12px' }}/>
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                ) : ( // Retirement Page
                    <div className="max-w-4xl mx-auto">
                        {/* Progress Bar */}
                        <div className="bg-black/30 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/20 mb-8">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold text-white">Retirement Plan Setup</h2>
                                <span className="text-sm text-slate-300">Step {['contribution', 'risk', 'goals'].indexOf(currentStage) + 1} of 3</span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-3">
                                <div 
                                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500 ease-out"
                                    style={{ width: `${getStageProgress()}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Stage Content */}
                        <div className="bg-black/30 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20 animate-fade-in">
                            {currentStage === 'contribution' && (
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <span className="text-3xl">💰</span>
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-8">Monthly Contribution</h3>
                                    <div className="mb-8">
                                        <p className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                                            ${contribution.toFixed(2)}
                                        </p>
                                        <p className="text-slate-300 text-lg">Adjust your monthly retirement contribution</p>
                                    </div>
                                    <div className="max-w-md mx-auto">
                                        <input 
                                            type="range" 
                                            min="500" 
                                            max="1000" 
                                            step="5" 
                                            value={contribution} 
                                            onChange={e => setContribution(Number(e.target.value))} 
                                            className="w-full h-4 bg-slate-700 rounded-lg appearance-none cursor-pointer range-lg accent-purple-500"
                                        />
                                        <div className="flex justify-between text-sm text-slate-400 mt-2">
                                            <span>$500</span>
                                            <span>$1000</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentStage === 'risk' && (
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <span className="text-3xl">📈</span>
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-8">Investment Risk Tolerance</h3>
                                    <p className="text-slate-300 text-lg mb-8">Choose your preferred investment strategy</p>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                                        {randomizedOptions.riskProfiles.map(profile => (
                                            <button 
                                                key={profile} 
                                                onClick={() => setRiskProfile(profile)} 
                                                className={`p-8 text-center rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                                                    riskProfile === profile 
                                                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-500 text-cyan-400 shadow-lg' 
                                                        : 'bg-slate-800/50 border-slate-600 text-white hover:border-slate-500 hover:bg-slate-700/50'
                                                }`}
                                            >
                                                <span className="font-bold text-lg">{profile}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {currentStage === 'goals' && (
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <span className="text-3xl">🎯</span>
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-8">Retirement Goals</h3>
                                    <p className="text-slate-300 text-lg mb-8">Select your retirement lifestyle goals</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                                        {[
                                            'Travel the World',
                                            'Buy a Dream Home',
                                            'Start a Business',
                                            'Support Family',
                                            'Pursue Hobbies',
                                            'Healthcare Security'
                                        ].map(goal => (
                                            <button 
                                                key={goal} 
                                                onClick={() => toggleGoal(goal)} 
                                                className={`p-6 text-center rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                                                    retirementGoals.includes(goal) 
                                                        ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-500 text-emerald-400 shadow-lg' 
                                                        : 'bg-slate-800/50 border-slate-600 text-white hover:border-slate-500 hover:bg-slate-700/50'
                                                }`}
                                            >
                                                <span className="font-semibold">{goal}</span>
                                            </button>
                                        ))}
                                    </div>
                                    {showGoalError && (
                                        <div className="mt-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300">
                                            <p className="font-semibold">⚠️ Please select at least one retirement goal to continue.</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex justify-between mt-12">
                                <button 
                                    onClick={handlePreviousStage}
                                    disabled={currentStage === 'contribution'}
                                    className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                        currentStage === 'contribution'
                                            ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                                            : 'bg-slate-700/50 text-white hover:bg-slate-600/50'
                                    }`}
                                >
                                    ← Previous
                                </button>
                                
                                {currentStage === 'goals' ? (
                                    <button 
                                        onClick={handleGoalsNext}
                                        className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
                                    >
                                        Save Changes
                                    </button>
                                ) : (
                                    <button 
                                        onClick={handleNextStage}
                                        className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
                                    >
                                        Next →
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default RetirementPlanExperience;
