import React, { useState, useMemo } from 'react';

export const TASK_ID_SelfAssessment = 'health-mentalhealth-selfassess';
export const PASSWORD_SelfAssessment = 'Tomato';

const CheckIcon = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const RefreshIcon = () => <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 4l1.5 1.5A9 9 0 0120.5 16" /></svg>;
const HomeIcon = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>;
const AssessmentIcon = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>;
const ContactIcon = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>;

type ActiveView = 'home' | 'assessment' | 'contact';
type ScreeningAnswers = { mood: string; sleep: string; interest: string; };
type TaskParams = { condition: string; answers: ScreeningAnswers; };

const CONDITIONS = ["Anxiety", "Depression", "Stress", "Burnout"];
const SCREENING_OPTIONS = {
    mood: ["Good", "Okay", "Poor"],
    sleep: ["Well", "Restless", "Poorly"],
    interest: ["High", "Medium", "Low"],
};

const generateNewTask = (): TaskParams => ({
    condition: CONDITIONS[Math.floor(Math.random() * CONDITIONS.length)],
    answers: {
        mood: SCREENING_OPTIONS.mood[Math.floor(Math.random() * 3)],
        sleep: SCREENING_OPTIONS.sleep[Math.floor(Math.random() * 3)],
        interest: SCREENING_OPTIONS.interest[Math.floor(Math.random() * 3)],
    }
});

const SelfAssessment: React.FC = () => {
    const [taskParams, setTaskParams] = useState<TaskParams>(generateNewTask);
    const shuffledConditions = useMemo(() => [...CONDITIONS].sort(() => 0.5 - Math.random()), [taskParams]);
    const wellnessInfo = useMemo(() => {
        const tips = [
            { title: "Mindful Moments", content: "Take 5 minutes for deep breathing exercises today to center yourself." },
            { title: "Stay Hydrated", content: "Drinking enough water is crucial for both physical and mental clarity." },
            { title: "Connect with Nature", content: "A short walk outside can significantly improve your mood and reduce stress." },
        ];
        const names = ["Alex Chen", "Jordan Smith", "Casey Lee"];
        return {
            tip: tips[Math.floor(Math.random() * tips.length)],
            userName: names[Math.floor(Math.random() * names.length)],
        }
    }, []);
    
    const [activeView, setActiveView] = useState<ActiveView>('home');
    const [selectedCondition, setSelectedCondition] = useState('');
    const [screeningAnswers, setScreeningAnswers] = useState<Partial<ScreeningAnswers>>({});
    const [isCompleted, setIsCompleted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    
    const handleAnswerChange = (question: keyof ScreeningAnswers, answer: string) => {
        setScreeningAnswers(prev => ({ ...prev, [question]: answer }));
    };

    const handleRequestForm = () => {
        const conditionCorrect = selectedCondition === taskParams.condition;
        const answersCorrect = screeningAnswers.mood === taskParams.answers.mood &&
                               screeningAnswers.sleep === taskParams.answers.sleep &&
                               screeningAnswers.interest === taskParams.answers.interest;
        
        setIsCorrect(conditionCorrect && answersCorrect);
        setIsCompleted(true);
    };

    const handleCreateNewTask = () => {
        setTaskParams(generateNewTask());
        setActiveView('home');
        setSelectedCondition('');
        setScreeningAnswers({});
        setIsCompleted(false);
        setIsCorrect(false);
    };

    const isScreeningComplete = Object.keys(screeningAnswers).length === 3 &&
                                screeningAnswers.mood && screeningAnswers.sleep && screeningAnswers.interest;

    const TaskDescription = () => (
        <div className="bg-white border border-gray-200 text-gray-800 p-4 rounded-lg mb-6 shadow-sm">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="font-bold text-lg text-gray-900">Your Task</h2>
                    <p className="text-sm text-gray-600 max-w-4xl">
                        Your goal is to request a self-assessment form from the <strong>'Assessment'</strong> tab. The request is for the <strong className="text-blue-600">{taskParams.condition}</strong> assessment, and its preliminary screening should have the following answers: Overall Mood must be <strong className="text-blue-600">{taskParams.answers.mood}</strong>, Sleep Quality must be <strong className="text-blue-600">{taskParams.answers.sleep}</strong>, and Interest in Activities must be <strong className="text-blue-600">{taskParams.answers.interest}</strong>.
                    </p>
                </div>
                <button onClick={handleCreateNewTask} className="flex-shrink-0 flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md transition"><RefreshIcon /> New Task</button>
            </div>
        </div>
    );
    
    const CompletionModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white rounded-lg shadow-2xl p-8 m-4 max-w-md w-full text-center animate-slide-in-up">
                <CheckIcon className="mx-auto text-green-500 w-16 h-16" />
                <h2 className="text-2xl font-bold text-gray-800 mt-4">Congratulations! You have completed the task.</h2>
                {isCorrect && (
                    <div className="mt-4 text-lg">
                        <p className="text-gray-600">Password:</p>
                        <p className="text-2xl font-bold text-blue-600 tracking-widest bg-gray-100 px-4 py-2 rounded-lg mt-2 inline-block">{PASSWORD_SelfAssessment}</p>
                    </div>
                )}
            </div>
        </div>
    );
    
    const renderAssessment = () => (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Mental Wellness Self-Assessment</h3>
            <div className="space-y-6">
                <div>
                    <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">I'd like to assess my wellness regarding...</label>
                    <select id="condition" value={selectedCondition} onChange={e => setSelectedCondition(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                        <option value="" disabled>Select a topic...</option>
                        {shuffledConditions.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                {selectedCondition && (
                    <div className="pt-6 border-t animate-fade-in">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">Preliminary Screening</h4>
                        <div className="space-y-6">
                            {(Object.keys(SCREENING_OPTIONS) as Array<keyof ScreeningAnswers>).map(key => (
                                <div key={key}>
                                    <p className="text-sm font-medium text-gray-700 mb-2 capitalize">Over the last two weeks, my {key === 'interest' ? 'interest in activities' : key} has been...</p>
                                    <fieldset className="flex space-x-4">
                                        {SCREENING_OPTIONS[key].map(option => (
                                            <label key={option} className="flex items-center">
                                                <input type="radio" name={key} value={option} checked={screeningAnswers[key] === option} onChange={() => handleAnswerChange(key, option)} className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"/>
                                                <span className="ml-2 text-sm text-gray-700">{option}</span>
                                            </label>
                                        ))}
                                    </fieldset>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <button onClick={handleRequestForm} disabled={!isScreeningComplete} className="w-full py-3 mt-6 rounded-md bg-blue-600 text-white font-bold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed">Request Self-Assessment Form</button>
            </div>
        </div>
    );

    const renderContent = () => {
        switch(activeView) {
            case 'home': return (
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome back, {wellnessInfo.userName}</h2>
                    <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-900 rounded-r-lg shadow-lg p-6">
                        <h3 className="text-xl font-bold mb-2">{wellnessInfo.tip.title}</h3>
                        <p>{wellnessInfo.tip.content}</p>
                    </div>
                </div>
            );
            case 'contact': return (
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h3>
                    <div className="space-y-4">
                        <p className="text-gray-600">If you are in immediate distress, please reach out to a support hotline. These services are free, confidential, and available 24/7.</p>
                        <div>
                            <h4 className="font-semibold text-gray-800">National Crisis Line</h4>
                            <p className="text-blue-600 font-bold text-lg">1-800-123-4567</p>
                        </div>
                         <div>
                            <h4 className="font-semibold text-gray-800">Local Support Center</h4>
                            <p className="text-blue-600 font-bold text-lg">1-888-987-6543</p>
                        </div>
                        <p className="text-xs text-gray-500 pt-4">* Please note: These are placeholder numbers for demonstration purposes only.</p>
                    </div>
                </div>
            );
            case 'assessment': return renderAssessment();
        }
    };
    
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
            <header className="bg-white border-b border-gray-200 shadow-sm p-4 sticky top-0 z-10">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-blue-600 flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>MindWell</h1>
                    <div className="flex items-center space-x-6">
                        {(['home', 'assessment', 'contact'] as ActiveView[]).map(view => (
                             <button key={view} onClick={() => setActiveView(view)} className={`flex items-center space-x-2 font-semibold transition-colors capitalize ${activeView === view ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}>
                                {view === 'home' && <HomeIcon className="h-6 w-6"/>}
                                {view === 'assessment' && <AssessmentIcon className="h-6 w-6"/>}
                                {view === 'contact' && <ContactIcon className="h-6 w-6"/>}
                                <span>{view}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </header>
            <main className="p-8">
                <TaskDescription />
                {renderContent()}
            </main>
            {isCompleted && <CompletionModal />}
        </div>
    );
};

export default SelfAssessment;