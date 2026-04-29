import React, { useState, useMemo, useEffect } from 'react';

// --- CONFIGURATION & STATIC DATA ---
export const TASK_ID_MindMap = "productivity-mindmapping-createandbuildbranches";
export const PASSWORD_MindMap = "GENESIS"; 

// --- TYPES ---
interface MindMapNode {
    id: string;
    text: string;
    children: MindMapNode[];
    color: string;
}

interface Template {
    id: string;
    name: string;
    description: string;
    preview: string;
    data: MindMapNode;
}

// --- TASK DEFINITION ---
const taskDefinition = {
    centralTopic: "Q3 Marketing Plan",
    mainBranches: ["Social Media", "Content", "Ads"],
    subTopics: ["Blog Posts", "Videos"],
    colorChangeBranch: "Ads",
    targetColor: "red",
};

// --- TEMPLATES ---
const templates = [
 
    {
        id: 'project-planning',
        name: 'Project Planning',
        description: 'Template for organizing project tasks and milestones',
        preview: '📋 Project structure with Timeline, Resources, and Goals',
        data: {
            id: 'root',
            text: 'Project Plan',
            children: [
                { id: 'timeline', text: 'Timeline', children: [], color: 'default' },
                { id: 'resources', text: 'Resources', children: [], color: 'default' },
                { id: 'goals', text: 'Goals', children: [], color: 'default' }
            ],
            color: 'default'
        }
    },
    {
        id: 'brainstorming',
        name: 'Brainstorming Session',
        description: 'Free-form brainstorming with multiple idea branches',
        preview: '💡 Central idea with multiple creative branches',
        data: {
            id: 'root',
            text: 'Central Idea',
            children: [
                { id: 'idea1', text: 'Idea 1', children: [], color: 'default' },
                { id: 'idea2', text: 'Idea 2', children: [], color: 'default' },
                { id: 'idea3', text: 'Idea 3', children: [], color: 'default' }
            ],
            color: 'default'
        }
    },
    {
        id: 'swot-analysis',
        name: 'SWOT Analysis',
        description: 'Strategic planning framework for business analysis',
        preview: '⚡ SWOT with Strengths, Weaknesses, Opportunities, Threats',
        data: {
            id: 'root',
            text: 'SWOT Analysis',
            children: [
                { id: 'strengths', text: 'Strengths', children: [], color: 'green' },
                { id: 'weaknesses', text: 'Weaknesses', children: [], color: 'red' },
                { id: 'opportunities', text: 'Opportunities', children: [], color: 'blue' },
                { id: 'threats', text: 'Threats', children: [], color: 'default' }
            ],
            color: 'default'
        }
    }
];

// --- DUMMY DATA & HELPERS ---
const colorPalettes = [
    { primary: 'blue', secondary: 'orange' },
    { primary: 'indigo', secondary: 'rose' },
    { primary: 'teal', secondary: 'amber' },
];

const nodeColors = {
    default: 'bg-white',
    red: 'bg-red-200 border-red-500',
    blue: 'bg-blue-200 border-blue-500',
    green: 'bg-green-200 border-green-500',
};

// --- UI SUB-COMPONENTS ---
const Header: React.FC = () => (
    <header className="w-full p-4 bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">MindFlow</h1>
            <div className="text-right text-gray-600 text-sm">
                <p><span className="font-semibold text-gray-800">Workspace:</span> Marketing Team</p>
                <p><span className="font-semibold text-gray-800">Active Projects:</span> {useMemo(() => Math.floor(Math.random() * 10) + 5, [])}</p>
            </div>
        </div>
    </header>
);

const Sidebar: React.FC<{ activeView: string, setActiveView: (view: string) => void }> = ({ activeView, setActiveView }) => {
    const links = [ 
        { id: 'dashboard', name: 'Dashboard', icon: '📊' }, 
        { id: 'maps', name: 'My Mind Maps', icon: '🧠' }, 
        { id: 'templates', name: 'Templates', icon: '📋' } 
    ];
    return (
        <aside className="w-64 bg-white p-6 border-r border-gray-200 h-screen sticky top-[89px]">
            <nav className="space-y-2">
                {links.map(link => (
                    <button key={link.id} onClick={() => setActiveView(link.id)}
                           className={`w-full flex items-center gap-3 p-3 rounded-lg text-left font-semibold transition-colors ${activeView === link.id ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)]' : 'text-gray-600 hover:bg-gray-100'}`}>
                        <span className="text-xl">{link.icon}</span>
                        {link.name}
                    </button>
                ))}
            </nav>
        </aside>
    );
};

const Widget: React.FC<{ title: string; value: string; subtitle: string; icon: string; color: string }> = ({ title, value, subtitle, icon, color }) => (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-600 font-medium">{title}</p>
                <p className={`text-3xl font-bold ${color}`}>{value}</p>
                <p className="text-sm text-gray-500">{subtitle}</p>
            </div>
            <div className="text-4xl">{icon}</div>
        </div>
    </div>
);

const DashboardView: React.FC<{ onCreateNew: () => void }> = ({ onCreateNew }) => {
    const stats = useMemo(() => ({
        totalMaps: Math.floor(Math.random() * 25) + 15,
        thisWeek: Math.floor(Math.random() * 8) + 3,
        templates: templates.length,
        collaborators: Math.floor(Math.random() * 12) + 8
    }), []);

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-4xl font-extrabold text-gray-900">Dashboard</h2>
                <button 
                    onClick={onCreateNew}
                    className="py-3 px-6 font-semibold rounded-lg bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-colors"
                >
                    Create New Map
                </button>
            </div>
            
            {/* Stats Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Widget 
                    title="Total Mind Maps" 
                    value={stats.totalMaps.toString()} 
                    subtitle="All time" 
                    icon="🧠" 
                    color="text-blue-600"
                />
                <Widget 
                    title="Created This Week" 
                    value={stats.thisWeek.toString()} 
                    subtitle="Last 7 days" 
                    icon="📈" 
                    color="text-green-600"
                />
                <Widget 
                    title="Available Templates" 
                    value={stats.templates.toString()} 
                    subtitle="Ready to use" 
                    icon="📋" 
                    color="text-purple-600"
                />
                <Widget 
                    title="Collaborators" 
                    value={stats.collaborators.toString()} 
                    subtitle="Active members" 
                    icon="👥" 
                    color="text-orange-600"
                />
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 text-sm">🧠</span>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Q2 Marketing Plan</p>
                                <p className="text-sm text-gray-600">Last edited 2 hours ago</p>
                            </div>
                        </div>
                        <span className="text-sm text-gray-500">In Progress</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                <span className="text-green-600 text-sm">✅</span>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Project Roadmap</p>
                                <p className="text-sm text-gray-600">Completed yesterday</p>
                            </div>
                        </div>
                        <span className="text-sm text-gray-500">Completed</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                <span className="text-purple-600 text-sm">🎨</span>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Creative Brainstorm</p>
                                <p className="text-sm text-gray-600">Shared with team</p>
                            </div>
                        </div>
                        <span className="text-sm text-gray-500">Shared</span>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button 
                        onClick={onCreateNew}
                        className="p-4 text-left bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:from-blue-100 hover:to-blue-200 transition-all group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                <span className="text-white text-lg">➕</span>
                            </div>
                            <div>
                                <p className="font-semibold text-blue-900">Create New Map</p>
                                <p className="text-sm text-blue-700">Start from scratch</p>
                            </div>
                        </div>
                    </button>
                    <button className="p-4 text-left bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200 hover:from-purple-100 hover:to-purple-200 transition-all group">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                <span className="text-white text-lg">📋</span>
                            </div>
                            <div>
                                <p className="font-semibold text-purple-900">Browse Templates</p>
                                <p className="text-sm text-purple-700">Use pre-made structures</p>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

const TemplatesView: React.FC<{ onUseTemplate: (template: Template) => void }> = ({ onUseTemplate }) => (
    <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-extrabold text-gray-900">Templates</h2>
            <p className="text-gray-600">Choose a template to get started quickly</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {templates.map(template => (
                <div key={template.id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">{template.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                        </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <p className="text-sm text-gray-700">{template.preview}</p>
                    </div>
                    
                    <button 
                        onClick={() => onUseTemplate(template)}
                        className="w-full py-3 px-4 bg-[var(--color-primary)] text-white font-semibold rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors"
                    >
                        Use This Template
                    </button>
                </div>
            ))}
        </div>
    </div>
);

const MindMapNode: React.FC<{ 
    node: MindMapNode; 
    onUpdate: (id: string, text: string) => void; 
    onAddChild: (id: string) => void; 
    onColorChange: (id: string, color: string) => void; 
}> = ({ node, onUpdate, onAddChild, onColorChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(node.text);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleBlur = () => {
        setIsEditing(false);
        onUpdate(node.id, text);
    };

    return (
        <div className="flex items-center">
            <div className={`relative p-4 rounded-lg border-2 shadow-md transition-all ${node.color ? nodeColors[node.color as keyof typeof nodeColors] : 'bg-white border-gray-300'}`}>
                {isEditing ? (
                    <input 
                        type="text" 
                        value={text} 
                        onChange={e => setText(e.target.value)} 
                        onBlur={handleBlur} 
                        onKeyPress={e => e.key === 'Enter' && handleBlur()}
                        autoFocus 
                        className="bg-transparent outline-none font-semibold min-w-[120px]"
                    />
                ) : (
                    <p onClick={() => setIsEditing(true)} className="font-semibold cursor-pointer">{node.text}</p>
                )}
                <button 
                    onClick={() => onAddChild(node.id)} 
                    className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[var(--color-primary-dark)] transition-colors"
                >
                    +
                </button>
                <button 
                    onClick={() => setMenuOpen(!menuOpen)} 
                    className="absolute -top-3 -right-3 w-6 h-6 bg-gray-200 text-gray-600 text-xs rounded-full flex items-center justify-center shadow-md hover:bg-gray-300 transition-colors"
                >
                    ...
                </button>
                {menuOpen && (
                    <div className="absolute top-full mt-2 left-0 bg-white border rounded-lg shadow-xl p-2 z-10">
                        <p className="text-xs text-gray-500 mb-2">Change Color:</p>
                        <div className="flex gap-1">
                            {Object.keys(nodeColors).filter(c => c !== 'default').map(color => (
                                <button 
                                    key={color} 
                                    onClick={() => { onColorChange(node.id, color); setMenuOpen(false); }} 
                                    className={`w-6 h-6 rounded-full ${nodeColors[color as keyof typeof nodeColors]} border-2 border-gray-300 hover:border-gray-400 transition-colors`}
                                    title={color}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
            {node.children.length > 0 && (
                <div className="pl-16 border-l-2 border-gray-300 ml-4">
                    <div className="space-y-8">
                        {node.children.map((child: MindMapNode) => (
                            <MindMapNode 
                                key={child.id} 
                                node={child} 
                                onUpdate={onUpdate} 
                                onAddChild={onAddChild} 
                                onColorChange={onColorChange} 
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// --- MAIN COMPONENT ---
const MindMapExperience: React.FC = () => {
    const [activeView, setActiveView] = useState('dashboard');
    const [nodes, setNodes] = useState<MindMapNode>({ id: 'root', text: 'Click to Edit', children: [], color: 'default' });
    const [_, setSavedState] = useState<MindMapNode | null>(null); // Store the state for restoration
    const [isTaskComplete, setIsTaskComplete] = useState(false);
    const [isTaskSuccessful, setIsTaskSuccessful] = useState(false);

    const selectedPalette = useMemo(() => colorPalettes[Math.floor(Math.random() * colorPalettes.length)], []);

    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--color-primary', `var(--color-${selectedPalette.primary})`);
        root.style.setProperty('--color-primary-dark', `var(--color-${selectedPalette.primary}-dark)`);
        root.style.setProperty('--color-primary-light', `var(--color-${selectedPalette.primary}-light)`);
    }, [selectedPalette]);

    const updateNode = (id: string, newText: string) => {
        const update = (node: MindMapNode): MindMapNode => {
            if (node.id === id) return { ...node, text: newText };
            return { ...node, children: node.children.map(update) };
        };
        setNodes(update(nodes));
    };

    const addChild = (parentId: string) => {
        const newNode: MindMapNode = { id: `node-${Date.now()}`, text: 'New Branch', children: [], color: 'default' };
        const add = (node: MindMapNode): MindMapNode => {
            if (node.id === parentId) return { ...node, children: [...node.children, newNode] };
            return { ...node, children: node.children.map(add) };
        };
        setNodes(add(nodes));
    };
    
    const changeColor = (id: string, color: string) => {
        const change = (node: MindMapNode): MindMapNode => {
            if (node.id === id) return { ...node, color: color };
            return { ...node, children: node.children.map(change) };
        };
        setNodes(change(nodes));
    };

    const handleSaveMap = () => {
        const centralTopicCorrect = nodes.text === taskDefinition.centralTopic;
        const mainBranches = new Set(nodes.children.map((n: MindMapNode) => n.text));
        const mainBranchesCorrect = taskDefinition.mainBranches.every(b => mainBranches.has(b));
        
        const contentBranch = nodes.children.find((n: MindMapNode) => n.text === "Content");
        const subTopics = new Set(contentBranch?.children.map((n: MindMapNode) => n.text) || []);
        const subTopicsCorrect = taskDefinition.subTopics.every(s => subTopics.has(s));

        const adsBranch = nodes.children.find((n: MindMapNode) => n.text === taskDefinition.colorChangeBranch);
        const colorCorrect = adsBranch?.color === taskDefinition.targetColor;

        if (centralTopicCorrect && mainBranchesCorrect && subTopicsCorrect && colorCorrect) {
            setIsTaskSuccessful(true);
        } else {
            // Save current state for restoration
            setSavedState(JSON.parse(JSON.stringify(nodes)));
        }
        setIsTaskComplete(true);
    };
    
 

    const handleCreateNew = () => {
        setNodes({ id: 'root', text: 'New Mind Map', children: [], color: 'default' });
        setActiveView('maps');
    };

    const handleUseTemplate = (template: Template) => {
        setNodes(JSON.parse(JSON.stringify(template.data)));
        setActiveView('maps');
    };
    
    const renderMainView = () => {
        switch (activeView) {
            case 'dashboard':
                return <DashboardView onCreateNew={handleCreateNew} />;
            case 'templates':
                return <TemplatesView onUseTemplate={handleUseTemplate} />;
            case 'maps':
                return (
                    <div className="animate-fade-in">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-4xl font-extrabold text-gray-900">Mind Map Editor</h2>
                            <div className="flex gap-4">
                                <button 
                                    onClick={() => setActiveView('templates')}
                                    className="py-3 px-6 font-semibold rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Use Template
                                </button>
                                <button 
                                    onClick={handleSaveMap} 
                                    className="py-3 px-6 font-semibold rounded-lg bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-colors"
                                >
                                    Save Map
                                </button>
                            </div>
                        </div>
                        <div className="p-8 bg-white rounded-lg border border-gray-200 shadow-sm min-h-[60vh] overflow-auto">
                            <div className="p-8 bg-dots">
                                <MindMapNode 
                                    node={nodes} 
                                    onUpdate={updateNode} 
                                    onAddChild={addChild} 
                                    onColorChange={changeColor} 
                                />
                            </div>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="animate-fade-in">
                        <h2 className="text-4xl font-extrabold text-gray-900">{activeView.charAt(0).toUpperCase() + activeView.slice(1)}</h2>
                        <p className="mt-4 text-gray-600">This is a placeholder for the {activeView} page.</p>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
            <Header />
            <div className="flex">
                <Sidebar activeView={activeView} setActiveView={setActiveView} />
                <main className="flex-1 p-8">
                    {renderMainView()}
                </main>
            </div>

            {isTaskComplete && (
                <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
                    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-2xl text-center">
                        <h2 className="text-4xl font-bold mb-4 text-green-600">
                            {isTaskSuccessful ? 'Mind Map Saved!' : 'Action Completed'}
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            {isTaskSuccessful 
                                ? 'Your brainstorming session has been saved successfully!' 
                                : 'Your mind map has been saved. Continue editing to complete the task.'
                            }
                        </p>
                        {isTaskSuccessful ? (
                            <div className="bg-gray-100 p-6 rounded-lg border-2 border-dashed">
                                <p className="text-sm font-semibold text-gray-500">Final Password:</p>
                                <p className="mt-2 text-3xl font-mono tracking-widest text-blue-800">{PASSWORD_MindMap}</p>
                            </div>
                        ) : (<></>)}
                    </div>
                </div>
            )}
            
            <div className="hidden">
                <style>{`
                    .bg-dots { background-image: radial-gradient(#e5e7eb 1px, transparent 1px); background-size: 16px 16px; }
                    .animate-fade-in { animation: fadeIn 0.5s ease-in-out; }
                    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                    :root {
                        --color-indigo: #6366f1; --color-indigo-dark: #4f46e5; --color-indigo-light: #e0e7ff;
                        --color-amber: #f59e0b; --color-amber-dark: #d97706; --color-amber-light: #fef3c7;
                        --color-blue: #3b82f6; --color-blue-dark: #2563eb; --color-blue-light: #dbeafe;
                        --color-rose: #f43f5e; --color-rose-dark: #e11d48; --color-rose-light: #ffe4e6;
                        --color-teal: #14b8a6; --color-teal-dark: #0d9488; --color-teal-light: #ccfbf1;
                        --color-orange: #f97316; --color-orange-dark: #ea580c; --color-orange-light: #ffedd5;
                        --color-primary: var(--color-indigo); --color-primary-dark: var(--color-indigo-dark); --color-primary-light: var(--color-indigo-light);
                        --color-secondary: var(--color-amber);
                    }
                `}</style>
            </div>
        </div>
    );
};

export default MindMapExperience;
