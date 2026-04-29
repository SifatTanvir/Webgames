// ### 1. React Component (ChangeTheme.tsx) ###
import { useState, useMemo, FC } from 'react';
import { useTaskAnalytics } from "../utils/useTaskAnalytics";

export const TASK_ID_ChangeTheme = 'productivity-theme-changevisualtheme';
export const PASSWORD_ChangeTheme = `VELOCITY`;

// --- Static Data for Validation ---
// Validation Pattern: Pattern A. The task requires applying a specific theme.
const CORRECT_THEME_ID = 'cosmic-dark';

// --- Type Definitions ---
type Theme = {
  id: string;
  name: string;
  class: {
    bg: string;
    textPrimary: string;
    textSecondary: string;
    card: string;
    border: string;
    primaryButtonBg: string;
    primaryButtonText: string;
    primaryButtonHover: string;
    sidebarActive: string;
    sidebarInactive: string;
    sidebarHover: string;
  };
};

// --- Theme Definitions ---
const THEMES: Theme[] = [
  {
    id: 'default-light',
    name: 'Default Light',
    class: {
      bg: 'bg-slate-100',
      textPrimary: 'text-slate-800',
      textSecondary: 'text-slate-500',
      card: 'bg-white',
      border: 'border-slate-200',
      primaryButtonBg: 'bg-blue-600',
      primaryButtonText: 'text-white',
      primaryButtonHover: 'hover:bg-blue-700',
      sidebarActive: 'bg-blue-100 text-blue-700',
      sidebarInactive: 'text-slate-600',
      sidebarHover: 'hover:bg-slate-200',
    },
  },
  {
    id: 'cosmic-dark', // Correct Answer
    name: 'Cosmic Dark',
    class: {
      bg: 'bg-gray-900',
      textPrimary: 'text-indigo-100',
      textSecondary: 'text-gray-400',
      card: 'bg-gray-800/50',
      border: 'border-gray-700',
      primaryButtonBg: 'bg-indigo-500',
      primaryButtonText: 'text-white',
      primaryButtonHover: 'hover:bg-indigo-600',
      sidebarActive: 'bg-indigo-500/20 text-indigo-300',
      sidebarInactive: 'text-gray-400',
      sidebarHover: 'hover:bg-gray-700/50',
    },
  },
  {
    id: 'forest-calm',
    name: 'Forest Calm',
    class: {
      bg: 'bg-emerald-50',
      textPrimary: 'text-emerald-900',
      textSecondary: 'text-emerald-700',
      card: 'bg-white',
      border: 'border-emerald-200',
      primaryButtonBg: 'bg-emerald-500',
      primaryButtonText: 'text-white',
      primaryButtonHover: 'hover:bg-emerald-600',
      sidebarActive: 'bg-emerald-200 text-emerald-800',
      sidebarInactive: 'text-emerald-700',
      sidebarHover: 'hover:bg-emerald-100',
    },
  },
  {
    id: 'solar-flare',
    name: 'Solar Flare',
    class: {
      bg: 'bg-amber-50',
      textPrimary: 'text-amber-900',
      textSecondary: 'text-amber-600',
      card: 'bg-white',
      border: 'border-amber-300',
      primaryButtonBg: 'bg-amber-500',
      primaryButtonText: 'text-amber-900',
      primaryButtonHover: 'hover:bg-amber-600',
      sidebarActive: 'bg-amber-200 text-amber-800',
      sidebarInactive: 'text-amber-700',
      sidebarHover: 'hover:bg-amber-100',
    },
  },
];

// --- SVG Icons ---
const PaletteIcon: FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || 'w-6 h-6'}><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-1.23-1.03-2-2.48-2-4.14C11.11 9.3 13.06 6.5 16 4.91c.54-.29 1.13-.41 1.74-.41.53 0 1.05.11 1.54.32.82.34 1.51.93 1.95 1.67.1.17.22.33.32.5.42.72.65 1.55.65 2.44 0 2.48-2.02 4.5-4.5 4.5-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-8.5 9c0-3.87 3.13-7 7-7 1.48 0 2.85.46 4.01 1.25-1.54 1.15-2.51 2.99-2.51 5.06 0 1.79.67 3.42 1.76 4.66C8.17 19.33 4.5 15.26 4.5 12z"></path></svg>;
const DashboardIcon: FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || 'w-6 h-6'}><path d="M13 3h-2v10h2V3zm4 2h-2v10h2V5zm-8 2H7v10h2V7zM3 19v2h18v-2H3z"></path></svg>;
const SettingsIcon: FC<{ className?: "w-6 h-6" }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.438.995s.145.755.438.995l1.003.827c.424.35.534.954.26 1.431l-1.296 2.247a1.125 1.125 0 01-1.37.49l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.87l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.063-.374-.313-.686-.645-.87a6.52 6.52 0 01-.22-.127c-.324-.196-.72-.257-1.075-.124l-1.217.456a1.125 1.125 0 01-1.37-.49l-1.296-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.437-.995s-.145-.755-.437-.995l-1.004-.827a1.125 1.125 0 01-.26-1.431l1.296-2.247a1.125 1.125 0 011.37.49l1.217.456c.355.133.75.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.87l.213-1.28z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const CheckCircleIcon: FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || 'w-6 h-6'}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

// --- Main Component ---
const ChangeTheme: FC = () => {
    const [activeThemeId, setActiveThemeId] = useState<string>(THEMES[0].id);
    const [currentPage, setCurrentPage] = useState<'dashboard' | 'settings'>('dashboard');
    const [isComplete, setIsComplete] = useState(false);
    const [hasFailed, setHasFailed] = useState(false);

    // Mock analytics hook
    const { recordSuccess } = useTaskAnalytics(TASK_ID_ChangeTheme);

    const shuffledThemes = useMemo(() => [...THEMES].sort(() => Math.random() - 0.5), []);
    const activeTheme = useMemo(() => THEMES.find(t => t.id === activeThemeId) || THEMES[0], [activeThemeId]);
    
    const dashboardData = useMemo(() => ({
        greeting: `Welcome back, Alex!`,
        stats: [ { label: 'Active Projects', value: Math.floor(Math.random() * 5) + 3 }, { label: 'Tasks Due Today', value: Math.floor(Math.random() * 8) + 1 }, { label: 'Team Members', value: 12 }, ],
        projects: [ { name: 'Project Phoenix', progress: Math.floor(Math.random() * 40) + 60, image: 'https://picsum.photos/seed/proj1/40/40' }, { name: 'QuantumLeap AI', progress: Math.floor(Math.random() * 30) + 20, image: 'https://picsum.photos/seed/proj2/40/40' }, { name: 'DataStream Initiative', progress: Math.floor(Math.random() * 10) + 85, image: 'https://picsum.photos/seed/proj3/40/40' }, ],
    }), []);

    const handleThemeApply = (themeId: string) => {
        setActiveThemeId(themeId);
        if (!isComplete) {
            if (themeId === CORRECT_THEME_ID && !hasFailed) {
                setIsComplete(true);
                recordSuccess();
            } else if (themeId !== CORRECT_THEME_ID) {
                setHasFailed(true);
            }
        }
    };

    return (
        <div className={`flex w-full h-screen font-sans transition-colors duration-500 ${activeTheme.class.bg} ${activeTheme.class.textPrimary}`}>
            <aside className={`w-64 flex-shrink-0 p-4 border-r ${activeTheme.class.border} flex flex-col transition-colors duration-500`}>
                <div className={`flex items-center space-x-2 p-2 mb-8 ${activeTheme.class.textPrimary}`}>
                    <PaletteIcon className="w-8 h-8 text-indigo-500" />
                    <span className="text-xl font-bold">ProducTivity</span>
                </div>
                <nav className="flex flex-col space-y-2">
                    <button onClick={() => setCurrentPage('dashboard')} className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg font-medium transition-colors duration-200 ${currentPage === 'dashboard' ? activeTheme.class.sidebarActive : `${activeTheme.class.sidebarInactive} ${activeTheme.class.sidebarHover}`}`}>
                        <DashboardIcon className="w-6 h-6" />
                        <span>Dashboard</span>
                    </button>
                    <button onClick={() => setCurrentPage('settings')} className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg font-medium transition-colors duration-200 ${currentPage === 'settings' ? activeTheme.class.sidebarActive : `${activeTheme.class.sidebarInactive} ${activeTheme.class.sidebarHover}`}`}>
                        <SettingsIcon className="w-6 h-6" />
                        <span>Appearance</span>
                    </button>
                </nav>
            </aside>

            <main className="flex-1 p-6 md:p-10 overflow-y-auto">
                {currentPage === 'dashboard' && <DashboardContent theme={activeTheme} data={dashboardData} />}
                {currentPage === 'settings' && <SettingsContent theme={activeTheme} themes={shuffledThemes} onApply={handleThemeApply} />}
            </main>

            {isComplete && <PasswordDisplay />}
        </div>
    );
};

const DashboardContent: FC<{ theme: Theme, data: any }> = ({ theme, data }) => (
    <div className="animate-fade-in">
        <h1 className="text-3xl font-bold mb-2">{data.greeting}</h1>
        <p className={`${theme.class.textSecondary} mb-8`}>Here's a snapshot of your workspace.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {data.stats.map((stat: any) => (
                <div key={stat.label} className={`p-6 rounded-xl shadow-lg transition-colors duration-500 ${theme.class.card} border ${theme.class.border}`}>
                    <p className={`text-lg font-medium ${theme.class.textSecondary}`}>{stat.label}</p>
                    <p className="text-4xl font-bold mt-2">{stat.value}</p>
                </div>
            ))}
        </div>
        <div className={`p-6 rounded-xl shadow-lg transition-colors duration-500 ${theme.class.card} border ${theme.class.border}`}>
            <h2 className="text-xl font-semibold mb-4">Ongoing Projects</h2>
            <ul className="space-y-4">
                {data.projects.map((project: any) => (
                    <li key={project.name} className="flex items-center">
                        <div className="flex items-center space-x-4">
                            <img src={project.image} alt={project.name} className="w-10 h-10 rounded-full" />
                            <div>
                                <p className="font-semibold">{project.name}</p>
                                <div className="w-48 h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full mt-1">
                                    <div className={`h-2.5 rounded-full ${theme.class.primaryButtonBg}`} style={{ width: `${project.progress}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

const SettingsContent: FC<{ theme: Theme, themes: Theme[], onApply: (id: string) => void }> = ({ theme, themes, onApply }) => (
    <div className="animate-fade-in max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Appearance</h1>
        <p className={`${theme.class.textSecondary} mb-8`}>Customize the look and feel of your workspace. Choose a theme that suits your style.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {themes.map(t => (
                <div key={t.id} className={`${theme.class.card} border ${theme.class.border} rounded-xl shadow-md p-4 flex flex-col justify-between transition-all hover:shadow-xl hover:scale-105`}>
                    <div>
                        <h3 className="font-semibold text-lg mb-3">{t.name}</h3>
                        <div className="flex space-x-2 mb-4">
                            <div className={`w-8 h-8 rounded-full ${t.class.bg} border-2 ${t.class.border}`}></div>
                            <div className={`w-8 h-8 rounded-full ${t.class.card} border-2 ${t.class.border}`}></div>
                            <div className={`w-8 h-8 rounded-full ${t.class.primaryButtonBg}`}></div>
                        </div>
                        <p className={`text-sm ${theme.class.textSecondary}`}>A theme for {t.name.split(' ')[1].toLowerCase()} productivity.</p>
                    </div>
                    <button
                        onClick={() => onApply(t.id)}
                        className={`mt-4 w-full py-2 font-semibold rounded-md transition-colors duration-300 ${t.class.primaryButtonBg} ${t.class.primaryButtonText} ${t.class.primaryButtonHover}`}
                    >
                        Apply Theme
                    </button>
                </div>
            ))}
        </div>
    </div>
);

const PasswordDisplay: FC = () => (
    <div className="fixed bottom-4 left-4 bg-white shadow-2xl rounded-lg p-4 max-w-xs w-full border-l-4 border-indigo-500 z-50 animate-fade-in">
        <div className="flex items-center">
            <CheckCircleIcon className="h-8 w-8 text-indigo-500 mr-4 flex-shrink-0" />
            <div>
                <p className="text-xs text-slate-600">Secret Password</p>
                <p id="password" className="text-xl font-bold tracking-widest text-indigo-600 font-mono mt-1">{PASSWORD_ChangeTheme}</p>
            </div>
        </div>
        <style>{`@keyframes fade-in{from{opacity:0}to{opacity:1}} .animate-fade-in{animation:fade-in .3s ease-out forwards}`}</style>
    </div>
);

export default ChangeTheme;