import React, { useState, useMemo } from 'react';

export const TASK_ID_CreatePost = 'socialmedia-crossplatform-createpost';
export const PASSWORD_CreatePost = 'Milky';

const CheckIcon = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const RefreshIcon = () => <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 4l1.5 1.5A9 9 0 0120.5 16" /></svg>;
const DashboardIcon = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>;
const PostsIcon = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" /></svg>;
const AnalyticsIcon = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h12A2.25 2.25 0 0020.25 14.25V3M3.75 21h16.5M16.5 3.75h.008v.008H16.5V3.75z" /></svg>;

type ActiveView = 'dashboard' | 'posts' | 'analytics';
type TaskParams = { title: string; content: string; platforms: string[]; };

const TITLES = ["New Product Launch!", "Weekly Roundup", "Behind the Scenes"];
const CONTENTS = ["Check out our latest innovation, designed to perfection.", "Here's what happened this week at our company.", "A quick look at how we make the magic happen."];
const PLATFORMS = ["Facebook", "Instagram", "X (Twitter)", "LinkedIn", "Threads"];

const generateNewTask = (): TaskParams => {
    const shuffledPlatforms = [...PLATFORMS].sort(() => 0.5 - Math.random());
    return {
        title: TITLES[Math.floor(Math.random() * TITLES.length)],
        content: CONTENTS[Math.floor(Math.random() * CONTENTS.length)],
        platforms: shuffledPlatforms.slice(0, Math.floor(Math.random() * 2) + 2),
    };
};

const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean; onChange: (enabled: boolean) => void }) => (
  <button onClick={() => onChange(!enabled)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${enabled ? 'bg-gradient-to-r from-pink-500 to-yellow-500' : 'bg-zinc-700'}`}>
    <span className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}/>
  </button>
);

const CreatePost: React.FC = () => {
    const [taskParams, setTaskParams] = useState<TaskParams>(generateNewTask);
    const platformOptions = useMemo(() => [...PLATFORMS].sort(() => 0.5 - Math.random()), [taskParams]);
    const performanceMetrics = useMemo(() => ({
        reach: Math.floor(Math.random() * 50000 + 10000).toLocaleString(),
        engagement: (Math.random() * 5 + 1).toFixed(1) + '%',
    }), []);
    
    const [activeView, setActiveView] = useState<ActiveView>('dashboard');
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const [selectedPlatforms, setSelectedPlatforms] = useState<Set<string>>(new Set());
    const [autoTranslate, setAutoTranslate] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    
    const handlePlatformChange = (platform: string) => {
        const newSelection = new Set(selectedPlatforms);
        newSelection.has(platform) ? newSelection.delete(platform) : newSelection.add(platform);
        setSelectedPlatforms(newSelection);
    };

    const handlePost = () => {
        const titleCorrect = postTitle === taskParams.title;
        const contentCorrect = postContent === taskParams.content;
        const translateCorrect = autoTranslate === true;
        const platformsCorrect = selectedPlatforms.size === taskParams.platforms.length && taskParams.platforms.every(p => selectedPlatforms.has(p));
        
        setIsCorrect(titleCorrect && contentCorrect && translateCorrect && platformsCorrect);
        setIsCompleted(true);
    };

    const handleCreateNewTask = () => {
        setTaskParams(generateNewTask());
        setActiveView('dashboard');
        setPostTitle('');
        setPostContent('');
        setSelectedPlatforms(new Set());
        setAutoTranslate(false);
        setIsCompleted(false);
        setIsCorrect(false);
    };
    
    const TaskDescription = () => (
        <div className="bg-zinc-900 border border-zinc-800 text-white p-4 rounded-lg mb-6 shadow-lg">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="font-bold text-lg text-gray-200">Your Task</h2>
                    <p className="text-sm text-gray-400 max-w-4xl">
                        Your goal is to publish a new post from the 'Posts' tab. The post requires a <strong>Title</strong> of "<strong className="text-cyan-400">{taskParams.title}</strong>" and <strong>Content</strong> of "<strong className="text-cyan-400">{taskParams.content}</strong>". Ensure it is published only to the following platforms: <strong className="text-cyan-400">{taskParams.platforms.join(', ')}</strong>, and that the <strong>'Auto-translate caption'</strong> option is enabled.
                    </p>
                </div>
                <button onClick={handleCreateNewTask} className="flex-shrink-0 flex items-center bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-2 px-4 rounded-md transition"><RefreshIcon /> New Task</button>
            </div>
        </div>
    );
    
    const CompletionModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-zinc-900 border border-zinc-700 rounded-lg shadow-2xl p-8 m-4 max-w-md w-full text-center animate-slide-in-up">
                <CheckIcon className="mx-auto text-green-500 w-16 h-16" />
                <h2 className="text-2xl font-bold text-gray-100 mt-4">Congratulations, you have completed all stages!</h2>
                {isCorrect && <div className="mt-4 text-lg"><p className="text-gray-400">Password:</p><p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 tracking-widest mt-2 inline-block">{PASSWORD_CreatePost}</p></div>}
            </div>
        </div>
    );
    
    const renderCreatePost = () => {
        const isPostable = postTitle && postContent && selectedPlatforms.size > 0;
        return (
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-200 mb-6">Create New Post</h3>
                <div className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                        <input type="text" id="title" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} className="w-full p-2 bg-zinc-800 text-white border border-zinc-700 rounded-md focus:ring-2 focus:ring-pink-500"/>
                    </div>
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-400 mb-1">Content</label>
                        <textarea id="content" value={postContent} onChange={(e) => setPostContent(e.target.value)} rows={4} className="w-full p-2 bg-zinc-800 text-white border border-zinc-700 rounded-md focus:ring-2 focus:ring-pink-500"/>
                    </div>
                    <div>
                        <h4 className="text-sm font-medium text-gray-400 mb-2">Publish to Platforms</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {platformOptions.map(p => (
                                <label key={p} className="flex items-center p-3 rounded-md bg-zinc-800 border border-zinc-700 has-[:checked]:border-pink-500 transition-all cursor-pointer">
                                    <input type="checkbox" checked={selectedPlatforms.has(p)} onChange={() => handlePlatformChange(p)} className="h-4 w-4 rounded border-zinc-600 text-pink-600 focus:ring-pink-500 bg-zinc-700"/>
                                    <span className="ml-3 text-sm font-medium text-gray-200">{p}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-md bg-zinc-800 border border-zinc-700">
                        <label className="font-medium text-gray-300">Auto-translate caption</label>
                        <ToggleSwitch enabled={autoTranslate} onChange={setAutoTranslate} />
                    </div>
                    <button onClick={handlePost} disabled={!isPostable} className="w-full py-3 rounded-md text-white font-bold transition-all disabled:bg-zinc-700 disabled:text-gray-500 disabled:cursor-not-allowed bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:opacity-90">Post</button>
                </div>
            </div>
        );
    }

    const renderContent = () => {
        switch(activeView) {
            case 'dashboard': return (
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg p-6">
                    <h3 className="text-2xl font-bold text-gray-200 mb-4">Performance Snapshot</h3>
                    <div className="flex justify-around text-center">
                        <div><p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">{performanceMetrics.reach}</p><p className="text-gray-400">Reach (7d)</p></div>
                        <div><p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">{performanceMetrics.engagement}</p><p className="text-gray-400">Engagement (7d)</p></div>
                    </div>
                </div>
            );
            case 'analytics': return (
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg p-6">
                    <h3 className="text-2xl font-bold text-gray-200 mb-4">Analytics</h3>
                    <p className="text-gray-400">Analytics data is currently being processed. Check back later.</p>
                </div>
            );
            case 'posts': return renderCreatePost();
        }
    };
    
    return (
        <div className="min-h-screen bg-black text-white font-sans">
            <header className="bg-black border-b border-zinc-800 p-4 sticky top-0 z-10">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold font-serif">Sociabull</h1>
                    <div className="flex items-center space-x-6">
                        {(['dashboard', 'posts', 'analytics'] as ActiveView[]).map(view => (
                             <button key={view} onClick={() => setActiveView(view)} className={`flex items-center space-x-2 font-semibold transition-colors capitalize ${activeView === view ? 'text-white' : 'text-gray-500 hover:text-white'}`}>
                                {view === 'dashboard' && <DashboardIcon className="h-6 w-6"/>}
                                {view === 'posts' && <PostsIcon className="h-6 w-6"/>}
                                {view === 'analytics' && <AnalyticsIcon className="h-6 w-6"/>}
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

export default CreatePost;