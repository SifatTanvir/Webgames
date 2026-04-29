import { useState, useMemo, useEffect, CSSProperties } from 'react';

export const TASK_ID = 'productivity-content-createmeetingnote';
export const PASSWORD = 'LINEAR-LOCOMOTION';

interface Note { id: string; title: string; body: string; tags: string[]; createdAt: Date; updatedAt: Date; }

const generateSampleNotes = () => [
    { id: 'sample-1', title: 'Project Roadmap Updates', body: 'Updated the project timeline based on stakeholder feedback. Need to adjust Q4 deliverables and reassign resources for the mobile app development.', tags: ['#project', '#roadmap', '#mobile'], createdAt: new Date('2024-01-15'), updatedAt: new Date('2024-01-15') },
    { id: 'sample-2', title: 'Team Standup Notes', body: 'Daily standup highlights: Sarah completed the authentication module, Mike is working on the payment gateway integration, and Lisa is finalizing the UI components.', tags: ['#standup', '#team', '#development'], createdAt: new Date('2024-01-14'), updatedAt: new Date('2024-01-14') },
    { id: 'sample-3', title: 'Client Feedback Review', body: 'Client provided feedback on the latest prototype. They want to see more vibrant colors in the dashboard and suggested adding a dark mode toggle.', tags: ['#client', '#feedback', '#ui'], createdAt: new Date('2024-01-13'), updatedAt: new Date('2024-01-13') },
    { id: 'sample-4', title: 'Budget Analysis Q1', body: 'Reviewed Q1 budget allocation. Marketing spent 15% under budget while development exceeded by 8%. Need to reallocate funds for Q2.', tags: ['#budget', '#q1', '#analysis'], createdAt: new Date('2024-01-12'), updatedAt: new Date('2024-01-12') },
    { id: 'sample-5', title: 'Technical Architecture Review', body: 'Evaluated current system architecture. Recommend migrating to microservices and implementing Redis for caching to improve performance.', tags: ['#architecture', '#technical', '#performance'], createdAt: new Date('2024-01-11'), updatedAt: new Date('2024-01-11') }
].sort(() => Math.random() - 0.5);

const SearchIcon = ({c=""}) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const PlusIcon = ({c=""}) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
const MenuIcon = ({c=""}) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>;
const LogoIcon = ({c=""}) => <svg className={c} viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.648.5.5 5.648.5 12S5.648 23.5 12 23.5 23.5 18.352 23.5 12 .5 12 .5zm-.25 18.55l-1.7-1.7 5.8-5.8-5.8-5.8 1.7-1.7 5.8 5.8 5.8-5.8 1.7 1.7-5.8 5.8 5.8 5.8-1.7 1.7-5.8-5.8-5.8 5.8z" /></svg>;

const GlobalStyles = () => (
    <style>{`
    @keyframes stagger-in { from { transform: translateY(15px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
    @keyframes gradient-pan { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
    `}</style>
);

const themes = [
    { 
        name: 'Cyberpunk Neon',
        '--bg-gradient': 'linear-gradient(135deg, hsl(230, 15%, 12%), hsl(260, 20%, 8%))', 
        '--ui-bg': 'hsl(240, 18%, 15%)',
        '--ui-bg-subtle': 'hsl(240, 18%, 18%)',
        '--text-primary': 'hsl(0, 0%, 58%)',
        '--text-secondary': 'hsl(0, 0%, 65%)',
        '--text-tertiary': 'hsl(0, 0%, 65%)', 
        '--border-color': 'hsl(240, 15%, 25%)', 
        '--accent-primary': 'hsl(320, 90%, 60%)',
        '--accent-bg': 'hsla(320, 90%, 60%, 0.15)',
    },
    { 
        name: 'Tidal Teal',
        '--bg-gradient': 'linear-gradient(135deg, hsl(210, 25%, 10%), hsl(190, 30%, 8%))', 
        '--ui-bg': 'hsl(200, 20%, 14%)',
        '--ui-bg-subtle': 'hsl(200, 20%, 17%)',
        '--text-primary': 'hsl(0, 0%, 58%)',
        '--text-secondary': 'hsl(0, 0%, 65%)',
        '--text-tertiary': 'hsl(0, 0%, 65%)', 
        '--border-color': 'hsl(200, 15%, 25%)', 
        '--accent-primary': 'hsl(180, 90%, 55%)',
        '--accent-bg': 'hsla(180, 90%, 55%, 0.15)',
    },
    { 
        name: 'Citrus Punch',
        '--bg-gradient': 'linear-gradient(135deg, hsl(0, 0%, 100%), hsl(0, 0%, 97%))', 
        '--ui-bg': 'hsl(0, 0%, 96%)',
        '--ui-bg-subtle': 'hsl(0, 0%, 93%)',
        '--text-primary': 'hsl(210, 20%, 10%)',
        '--text-secondary': 'hsl(210, 15%, 30%)',
        '--text-tertiary': 'hsl(210, 10%, 50%)', 
        '--border-color': 'hsl(210, 10%, 88%)', 
        '--accent-primary': 'hsl(30, 95%, 55%)',
        '--accent-bg': 'hsla(30, 95%, 55%, 0.15)',
    },
];

const NotesManager = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [newNote, setNewNote] = useState({ title: '', body: '', tags: '' });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const theme = useMemo(() => themes[Math.floor(Math.random() * themes.length)], []);
    
    useEffect(() => { setNotes(generateSampleNotes()); }, []);

    const filteredNotes = useMemo(() => {
        if (!searchQuery) return notes;
        const query = searchQuery.toLowerCase();
        return notes.filter(note => note.title.toLowerCase().includes(query) || note.body.toLowerCase().includes(query) || note.tags.some(tag => tag.toLowerCase().includes(query)));
    }, [notes, searchQuery]);

    const isTaskCompleted = useMemo(() => {
        const requiredNote = notes.find(note => note.title === 'Meeting Summary - Q3 Planning' && note.tags.includes('#meeting') && note.tags.includes('#q3') && note.tags.includes('#planning') && note.body.trim().length > 0);
        const searchedForPlanning = searchQuery.toLowerCase().includes('#planning');
        const noteAppearsInSearch = searchedForPlanning && filteredNotes.some(note => note.title === 'Meeting Summary - Q3 Planning');
        return !!requiredNote && searchedForPlanning && noteAppearsInSearch;
    }, [notes, searchQuery, filteredNotes]);
    
    const handleCreateNote = () => { setIsCreating(true); setSelectedNote(null); setNewNote({ title: '', body: '', tags: '' }); setSearchQuery(''); setIsSidebarOpen(false); };
    const handleSaveNote = () => {
        if (!newNote.title.trim()) return;
        const tagsArray = newNote.tags.split(/[\s,]+/).filter(tag => tag.trim()).map(tag => tag.startsWith('#') ? tag : `#${tag}`);
        const note: Note = { id: Date.now().toString(), title: newNote.title, body: newNote.body, tags: tagsArray, createdAt: new Date(), updatedAt: new Date() };
        setNotes(prev => [note, ...prev]); setIsCreating(false); setSelectedNote(note);
    };
    const handleCancelCreate = () => { setIsCreating(false); };
    const handleSelectNote = (note: Note) => { setSelectedNote(note); setIsCreating(false); setIsSidebarOpen(false); };
    const formatDate = (date: Date) => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const activeInputStyles = "w-full bg-[var(--ui-bg-subtle)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] transition-shadow,border-color";

    return (
        <div style={theme as CSSProperties} className="font-sans text-[var(--text-primary)]">
            <GlobalStyles/>
            <div className="absolute inset-0 -z-10 bg-[var(--bg-gradient)]" style={{ backgroundSize: '400% 400%', animation: 'gradient-pan 15s ease infinite' }} />

            <div className="relative min-h-screen w-full flex">
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden fixed top-4 left-4 z-30 p-2 bg-[var(--ui-bg)] rounded-full shadow-lg border border-[var(--border-color)]">
                    <MenuIcon c="w-6 h-6"/>
                </button>

                <div className={`fixed inset-y-0 left-0 z-20 w-full lg:w-auto lg:static lg:flex transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                    <aside className="w-20 bg-[var(--ui-bg)] border-r border-[var(--border-color)] flex-col items-center py-6 hidden sm:flex">
                        <LogoIcon c="w-8 h-8 text-[var(--accent-primary)] mb-10"/>
                        <button onClick={handleCreateNote} className="p-3 mb-4 rounded-xl bg-[var(--accent-primary)] text-black hover:brightness-125 transition-all"><PlusIcon c="w-6 h-6"/></button>
                    </aside>
                    <aside className="w-full sm:w-80 bg-[var(--ui-bg)] border-r border-[var(--border-color)] flex flex-col">
                        <div className="p-4 border-b border-[var(--border-color)]">
                            <h1 className="text-xl font-bold mb-4">All Notes</h1>
                            <div className="relative">
                                <SearchIcon c="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]"/>
                                <input type="text" placeholder="Search..." value={searchQuery} disabled={isTaskCompleted} onChange={e => setSearchQuery(e.target.value)} className={`${activeInputStyles} pl-9 pr-4 py-2`}/>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            {filteredNotes.map((note, i) => (
                                <div key={note.id} onClick={() => handleSelectNote(note)} className={`p-4 cursor-pointer border-l-4 transition-all duration-200 animate-[stagger-in_0.5s_ease-out] group ${ selectedNote?.id === note.id ? 'bg-[var(--accent-bg)] border-[var(--accent-primary)]' : 'border-transparent hover:bg-[var(--accent-bg)]' }`} style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'backwards' }}>
                                    <h3 className="font-semibold text-[var(--text-primary)] mb-1 truncate">{note.title}</h3>
                                    <p className="text-sm text-[var(--text-secondary)] mb-3 line-clamp-2">{note.body}</p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs text-[var(--text-tertiary)]">{formatDate(note.updatedAt)}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {note.tags.slice(0, 2).map((tag, i) => <span key={i} className="bg-[var(--accent-bg)] text-[var(--accent-primary)] text-xs px-2 py-0.5 rounded-full font-medium">{tag}</span>)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </aside>
                </div>

                <main className="flex-1 p-4 sm:p-6 md:p-8 relative">
                    <div className="w-full h-full max-w-4xl mx-auto animate-[fade-in_0.5s_ease-out]">
                    {isCreating ? (
                        <>
                            <h2 className="text-3xl font-bold mb-6 text-[var(--text-primary)]">New Note</h2>
                            <div className="space-y-4">
                                <input type="text" value={newNote.title} onChange={e => setNewNote(p => ({...p, title: e.target.value}))} placeholder="Note Title" className={`${activeInputStyles} text-2xl font-bold p-3 placeholder:text-[var(--text-secondary)]`} />
                                <textarea value={newNote.body} onChange={e => setNewNote(p => ({...p, body: e.target.value}))} placeholder="Start writing..." rows={15} className={`${activeInputStyles} text-lg p-3 resize-none placeholder:text-[var(--text-secondary)]`} />
                                <input type="text" value={newNote.tags} onChange={e => setNewNote(p => ({...p, tags: e.target.value}))} placeholder="#add #tags separated by space" className={`${activeInputStyles} p-3 placeholder:text-[var(--text-secondary)]`} />
                            </div>
                            <div className="flex gap-4 mt-8">
                                <button onClick={handleSaveNote} className="px-6 py-2 bg-[var(--accent-primary)] text-black font-semibold rounded-lg hover:brightness-125 transition-all">Save</button>
                                <button onClick={handleCancelCreate} className="px-6 py-2 bg-[var(--ui-bg-subtle)] border border-[var(--border-color)] font-semibold rounded-lg hover:brightness-110 transition-all">Cancel</button>
                            </div>
                        </>
                    ) : selectedNote ? (
                        <>
                            <div className="mb-8">
                                <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-2">{selectedNote.title}</h2>
                                <p className="text-sm text-[var(--text-tertiary)]">Last updated: {formatDate(selectedNote.updatedAt)}</p>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {selectedNote.tags.map((tag, i) => <span key={i} className="bg-[var(--accent-bg)] text-[var(--accent-primary)] text-sm px-3 py-1 rounded-full font-semibold">{tag}</span>)}
                            </div>
                            <div className="prose prose-xl max-w-none text-[var(--text-secondary)] whitespace-pre-wrap leading-relaxed">
                                {selectedNote.body}
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <LogoIcon c="w-24 h-24 text-[var(--ui-bg-subtle)] mb-4"/>
                            <h3 className="text-2xl font-semibold text-[var(--text-primary)]">Welcome to Notes</h3>
                            <p className="text-lg text-[var(--text-secondary)] max-w-sm mt-2">Select a note from the list to get started, or create a new one.</p>
                        </div>
                    )}
                    </div>
                </main>
            </div>

            {isTaskCompleted && (
                <div className="fixed bottom-6 right-6 bg-green-500 text-white px-5 py-3 rounded-lg shadow-2xl animate-[stagger-in_0.5s_ease-out]">
                    <span className="font-semibold">Password: </span>
                    <span className="font-mono tracking-wider">{PASSWORD}</span>
                </div>
            )}
        </div>
    );
};

export default NotesManager;
