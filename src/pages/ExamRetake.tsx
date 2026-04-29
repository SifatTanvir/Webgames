import React, { useState, FC } from 'react';

export const TASK_ID_ExamRetake = 'elearn-exam-retryreminder';
export const PASSWORD_ExamRetake = 'Tuesday';

// --- Helper Functions & Data ---

const addMinutes = (date: Date, minutes: number): Date => {
    return new Date(date.getTime() + minutes * 60000);
};

const formatDateTimeForInput = (date: Date): string => {
    const pad = (num: number) => num.toString().padStart(2, '0');
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const FAILED_QUIZZES = [
    { id: 1, subject: 'Astrophysics', topic: 'Stellar Evolution', score: 45 },
    { id: 2, subject: 'Behavioral Economics', topic: 'Cognitive Biases', score: 55 },
    { id: 3, subject: 'Modern Architecture', topic: 'Bauhaus Movement', score: 60 },
    { id: 4, subject: 'Cybersecurity', topic: 'Cryptography Basics', score: 40 },
    { id: 5, subject: 'Marine Biology', topic: 'Coral Reef Ecosystems', score: 50 },
    { id: 6, subject: 'Digital Marketing', topic: 'SEO Fundamentals', score: 65 },
];

const STUDY_TIPS = [
    "Use the Pomodoro Technique: 25 minutes of focused study followed by a 5-minute break.",
    "Explain a topic to a friend. If you can teach it, you understand it.",
    "Create flashcards for key terms and concepts.",
    "Get enough sleep. Your brain consolidates memories while you rest.",
    "Stay hydrated. Drinking water can improve focus and concentration.",
];

interface TaskDefinition {
  quizzesToSelect: number[];
  reminderDateTime: string;
  weeklyFollowUp: boolean;
}

// --- Icon Components ---

const CheckCircleIcon: FC<{ className?: string }> = ({ className }) => ( <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" /></svg>);
const RocketIcon: FC<{ className?: string }> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.136 11.886c3.87-3.87 10.154-3.87 14.024 0M19.5 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" /></svg>);
const ShieldIcon: FC<{ className?: string }> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>);
const BookIcon: FC<{ className?: string }> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>);
const TrophyIcon: FC<{ className?: string }> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9 9 0 0 0 9 0Zm0 0a9 9 0 0 1 9 0h-9m-9 0a9 9 0 0 1-9 0h9M9 18.75V9.75M15 18.75V9.75M12 21V9.75M12 9.75a3 3 0 1 1 0-6 3 3 0 0 1 0 6ZM12 9.75a3.75 3.75 0 0 0-3.75 3.75v.25M12 9.75a3.75 3.75 0 0 1 3.75 3.75v.25" /></svg>);
const HomeIcon: FC<{ className?: string }> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>);
const LightbulbIcon: FC<{ className?: string }> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-1.125a6.01 6.01 0 0 0 1.5-1.125m-3 2.25a6.01 6.01 0 0 1-1.5-1.125a6.01 6.01 0 0 1-1.5-1.125m3 2.25V18m-3 0a6.012 6.012 0 0 0-3-1.125" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a6.012 6.012 0 0 1-3-1.125m3 1.125a6.012 6.012 0 0 0 3-1.125M15 11.25a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>);


const ExamRetake: FC = () => {
    type Page = 'Dashboard' | 'Retake Exam' | 'Courses' | 'Leaderboard';
    type CompletionStatus = 'incomplete' | 'success' | 'failure';

    const [page, setPage] = useState<Page>('Dashboard');
    const [completionStatus, setCompletionStatus] = useState<CompletionStatus>('incomplete');
    const rewardPassword = PASSWORD_ExamRetake;
    
    const generateNewTask = (): TaskDefinition => {
        const quizzes = [...FAILED_QUIZZES].sort(() => 0.5 - Math.random()).slice(0, 2);
        const reminderDate = addMinutes(new Date(), Math.floor(Math.random() * 20000) + 60);
        return {
            quizzesToSelect: quizzes.map(q => q.id),
            reminderDateTime: formatDateTimeForInput(reminderDate),
            weeklyFollowUp: true,
        };
    };

    const getRandomDashboardData = () => ({
        tip: STUDY_TIPS[Math.floor(Math.random() * STUDY_TIPS.length)],
        subject: FAILED_QUIZZES[Math.floor(Math.random() * FAILED_QUIZZES.length)].subject,
        goal: Math.floor(Math.random() * 60) + 20,
    });
    
    const [taskDefinition, setTaskDefinition] = useState(generateNewTask);
    const [dashboardData] = useState(getRandomDashboardData);

    const [selectedQuizzes, setSelectedQuizzes] = useState<Set<number>>(new Set());
    const [reminderDateTime, setReminderDateTime] = useState('');
    const [weeklyFollowUp, setWeeklyFollowUp] = useState(false);
    const [showReminderSetup, setShowReminderSetup] = useState(false);

    const resetTask = () => {
        setTaskDefinition(generateNewTask());
        setCompletionStatus('incomplete');
    };
    
    const handleQuizToggle = (id: number) => {
        setShowReminderSetup(false);
        setSelectedQuizzes(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) newSet.delete(id);
            else newSet.add(id);
            return newSet;
        });
    };

    const handleSaveSettings = () => {
        const quizzesMatch = selectedQuizzes.size === taskDefinition.quizzesToSelect.length && taskDefinition.quizzesToSelect.every(id => selectedQuizzes.has(id));
        const followUpMatch = weeklyFollowUp === taskDefinition.weeklyFollowUp;

        let dateTimeMatch = false;
        if (reminderDateTime && taskDefinition.reminderDateTime) {
            // Parse both strings to Date objects and compare their timestamps
            // This avoids issues with string format differences (e.g., seconds)
            const selectedTime = new Date(reminderDateTime).getTime();
            const requiredTime = new Date(taskDefinition.reminderDateTime).getTime();
            dateTimeMatch = selectedTime === requiredTime;
        }

        setCompletionStatus(quizzesMatch && dateTimeMatch && followUpMatch ? 'success' : 'failure');
    };
    
    const CompletionModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[100]">
            <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full text-center transform transition-all animate-in fade-in-50 zoom-in-90">
                <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto" />
                <h2 className="text-2xl font-bold mt-4 text-gray-800">Congratulations, you have completed all stages!</h2>
                {completionStatus === 'success' && (
                    <>
                        <p className="mt-4 text-gray-600">Your password is:</p>
                        <p className="mt-2 text-3xl font-extrabold text-indigo-600 tracking-widest bg-gray-100 py-2 px-4 rounded-md inline-block">{rewardPassword}</p>
                    </>
                )}
            </div>
        </div>
    );
    
    const PageContent = () => { switch (page) { case 'Retake Exam': return <RetakeExamPage />; case 'Courses': return <CoursesPage />; case 'Leaderboard': return <LeaderboardPage />; case 'Dashboard': default: return <DashboardPage />; } };
    const DashboardPage = () => ( <div className="p-4 sm:p-6 lg:p-8"><h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome back, Alex!</h1><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"><div className="md:col-span-2 bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-8 rounded-xl shadow-lg flex flex-col justify-between"><div><h2 className="text-2xl font-bold">Jump back in!</h2><p className="mt-2 opacity-80">You're making great progress. Continue your last course on Astrophysics.</p></div><button className="mt-6 w-full md:w-auto text-left py-2 px-6 bg-white/20 rounded-lg font-bold hover:bg-white/30 transition-colors">Continue Course</button></div><div className="bg-white p-6 rounded-xl shadow-lg"><h2 className="font-bold text-lg text-gray-700">Daily Goal</h2><div className="w-full bg-gray-200 rounded-full h-2.5 my-3"><div className="bg-green-500 h-2.5 rounded-full" style={{width: `${dashboardData.goal}%`}}></div></div><p className="text-sm text-gray-500">You're making great progress today. Keep it up!</p></div><div className="bg-white p-6 rounded-xl shadow-lg"><h2 className="font-bold text-lg text-gray-700">Focus Subject</h2><p className="text-xl font-bold text-indigo-600 mt-2">{dashboardData.subject}</p><p className="text-sm text-gray-500 mt-1">Dive deeper into this topic today.</p></div><div className="md:col-span-2 lg:col-span-4 bg-white p-6 rounded-xl shadow-lg flex items-center gap-4"><div className="bg-amber-100 p-3 rounded-full"><LightbulbIcon className="h-6 w-6 text-amber-500"/></div><div><p className="font-bold text-gray-700">Tip of the Day</p><p className="text-sm text-gray-500">{dashboardData.tip}</p></div></div></div></div>);
    const CoursesPage = () => (<div className="p-4 sm:p-6 lg:p-8"><h1 className="text-3xl font-bold text-gray-800 mb-6">My Courses</h1><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{FAILED_QUIZZES.map(q => (<div key={q.id} className="bg-white rounded-xl shadow-lg overflow-hidden group"><img src={`https://picsum.photos/seed/${q.subject.replace(/\s/g, '')}/400/200`}/><div className="p-5"><h3 className="font-bold text-lg text-gray-800">{q.subject}</h3><p className="text-gray-500 text-sm">{q.topic}</p><div className="w-full bg-gray-200 rounded-full h-2.5 mt-3"><div className="bg-blue-600 h-2.5 rounded-full" style={{width: `${Math.random()*80+10}%`}}></div></div></div></div>))}</div></div>);
    const LeaderboardPage = () => (<div className="p-4 sm:p-6 lg:p-8"><h1 className="text-3xl font-bold text-gray-800 mb-6">Leaderboard</h1><div className="bg-white rounded-xl shadow-lg"><ul className="divide-y divide-gray-200">{["Olivia Chen", "Ben Carter", "Sofia Rodriguez", "Liam Goldberg", "Ava Nguyen"].map((name, i) => (<li key={name} className="p-4 flex items-center justify-between"><div className="flex items-center gap-4"><span className="font-bold text-lg text-gray-400 w-6">{i+1}</span><img src={`https://picsum.photos/seed/${name.replace(/\s/g, '')}/100/100`} className="h-12 w-12 rounded-full"/><p className="font-bold text-gray-800">{name}</p></div><div className="text-right"><p className="font-bold text-indigo-600">{12345 - i*1234}pts</p></div></li>))}</ul></div></div>);
    
    const RetakeExamPage = () => (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-gray-800">Retake Center</h1>
                <p className="text-gray-500 mt-1">Review your failed quizzes and set reminders to try again.</p>
                <div className="mt-6 space-y-3">
                    {FAILED_QUIZZES.map(quiz => (
                        <label key={quiz.id} className={`flex items-center p-4 rounded-lg border-2 transition-all cursor-pointer ${selectedQuizzes.has(quiz.id) ? 'border-indigo-500 bg-indigo-50' : 'border-transparent bg-gray-50 hover:bg-gray-100'}`}>
                            <input type="checkbox" checked={selectedQuizzes.has(quiz.id)} onChange={() => handleQuizToggle(quiz.id)} className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                            <div className="ml-4 flex-grow">
                                <p className="font-bold text-gray-800">{quiz.subject}</p>
                                <p className="text-sm text-gray-600">{quiz.topic}</p>
                            </div>
                            <p className={`font-bold text-lg ${quiz.score < 50 ? 'text-red-500' : 'text-amber-500'}`}>{quiz.score}%</p>
                        </label>
                    ))}
                </div>
                <div className="mt-6 border-t pt-6">
                    {!showReminderSetup ? (
                        <button onClick={() => setShowReminderSetup(true)} disabled={selectedQuizzes.size === 0} className="w-full py-3 px-4 bg-indigo-600 text-white rounded-md font-bold hover:bg-indigo-700 disabled:bg-gray-300">
                            Setup Reminder
                        </button>
                    ) : (
                        <div className="space-y-4 animate-in fade-in-20">
                            <div>
                                <label htmlFor="reminder-time" className="block text-sm font-bold text-gray-700 mb-1">Reminder Date & Time</label>
                                <input 
                                    type="datetime-local" 
                                    id="reminder-time" 
                                    value={reminderDateTime} 
                                    onChange={(e) => setReminderDateTime(e.target.value)} 
                                    min={formatDateTimeForInput(new Date())} 
                                    className="mt-1 block w-full pl-3 pr-2 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm"
                                />
                            </div>
                            <label htmlFor="follow-up" className="flex items-center">
                                <input type="checkbox" id="follow-up" checked={weeklyFollowUp} onChange={(e) => setWeeklyFollowUp(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                                <span className="ml-2 text-gray-700">Opt-in for weekly retry follow-ups.</span>
                            </label>
                            <button 
                                onClick={handleSaveSettings} 
                                disabled={!reminderDateTime}
                                className={`w-full py-3 px-4 rounded-md font-bold transition-colors ${
                                    reminderDateTime 
                                        ? 'bg-green-600 text-white hover:bg-green-700' 
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                            >
                                Save Settings
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
    
    const navItems: { name: Page; icon: React.ReactNode }[] = [ { name: 'Dashboard', icon: <HomeIcon className="h-6 w-6"/> }, { name: 'Retake Exam', icon: <ShieldIcon className="h-6 w-6"/> }, { name: 'Courses', icon: <BookIcon className="h-6 w-6"/> }, { name: 'Leaderboard', icon: <TrophyIcon className="h-6 w-6"/> }];

    return (
        <div className="bg-gray-100 min-h-screen font-sans flex flex-col">
            {completionStatus !== 'incomplete' && <CompletionModal />}
            <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 text-indigo-600">
                                <RocketIcon className="h-8 w-8"/>
                                <span className="font-bold text-xl text-gray-800">LearnSphere</span>
                            </div>
                            <div className="hidden md:flex items-center gap-2 ml-4">
                                {navItems.map(item => (<button key={item.name} onClick={() => setPage(item.name)} className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-bold transition-colors ${page === item.name ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-100'}`}>{item.icon}<span>{item.name}</span></button>))}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="bg-indigo-600/95 text-white backdrop-blur-sm sticky top-16 z-30 shadow-md">
                <div className="max-w-full mx-auto py-3 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    <p className="text-sm md:text-base leading-tight"><strong>Task:</strong> Go to 'Retake Exam', tick quizzes on <strong className="font-semibold text-indigo-200">{taskDefinition.quizzesToSelect.map(id => FAILED_QUIZZES.find(q=>q.id===id)?.subject).join(' & ')}</strong>, setup a reminder for <strong className="font-semibold text-indigo-200">{new Date(taskDefinition.reminderDateTime).toLocaleString('en-US', {month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit'})}</strong>, opt-in for follow-ups, and save.</p>
                    <button onClick={resetTask} className="ml-4 flex-shrink-0 px-3 py-1.5 bg-white/20 text-white rounded-md hover:bg-white/30 transition-colors text-sm font-semibold">New Task</button>
                </div>
            </div>
            <main className="flex-1 overflow-y-auto">
                <PageContent />
            </main>
        </div>
    );
};

export default ExamRetake;