import React, { useState, useMemo } from 'react';

export const TASK_ID_HighlightDifference = 'contracts-compare-highlightdifference';
export const PASSWORD_HighlightDifference = 'MATRIX';

const CheckIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const RefreshIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 4l1.5 1.5A9 9 0 0120.5 16" />
    </svg>
);

const DashboardIcon = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13 3V9H21V3M13 21H21V11H13M3 21H11V15H3M3 13H11V3H3V13Z" /></svg>;
const DocsIcon = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M12,19L8,15H11V12H13V15H16L12,19M13,9V3.5L18.5,9H13Z" /></svg>;
const TemplatesIcon = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22,15V22H15V19H18V16H15V13H21V15H22M3,2V14H5V9H10V14H12V2H3M5,4H10V7H5V4Z" /></svg>;
const NDATemplateIcon = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12,3C10.89,3 10,3.89 10,5H14C14,3.89 13.11,3 12,3M19,19H5V8H19M19,6H5C3.89,6 3,6.89 3,8V19C3,20.11 3.89,21 5,21H19C20.11,21 21,20.11 21,19V8C21,6.89 20.11,6 19,6Z" /></svg>;
const MSATemplateIcon = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15 22L17.5 20.5L20 22L18.5 18L21 16.5L17.5 15L20 12L17.5 13.5L15 12L16.5 16L14 17.5L15 22M13 17H2V15H13V17M13 13H2V11H13V13M13 9H2V7H13V9M22 3H2V5H22V3Z" /></svg>;

type Document = { id: string; name: string; version: string; modified: string; };
type ActiveView = 'dashboard' | 'documents' | 'templates';
type TaskParams = { doc1Name: string; doc2Name: string; };

const ALL_DOCS: Omit<Document, 'id' | 'modified'>[] = [
    { name: 'MSA_AcmeCorp_Q3.docx', version: 'v2.1' },
    { name: 'NDA_InnovateLLC.docx', version: 'v1.0' },
    { name: 'SOW_ProjectPhoenix.docx', version: 'v3.5' },
    { name: 'MSA_AcmeCorp_Q4.docx', version: 'v1.0-draft' },
    { name: 'TermSheet_BetaCo.docx', version: 'v0.8' },
    { name: 'SOW_ProjectPhoenix.docx', version: 'v3.6-final' },
    { name: 'NDA_InnovateLLC.docx', version: 'v1.1-redline' },
    { name: 'MSA_AcmeCorp_Q3.docx', version: 'v2.2-final' },
];

const generateNewTask = (): TaskParams => {
    const shuffled = [...ALL_DOCS].sort(() => 0.5 - Math.random());
    return { doc1Name: shuffled[0].name, doc2Name: shuffled[1].name };
};

const HighlightDifference: React.FC = () => {
    const [taskParams, setTaskParams] = useState<TaskParams>(generateNewTask);
    const documents = useMemo<Document[]>(() => {
        const today = new Date();
        return [...ALL_DOCS]
            .sort(() => 0.5 - Math.random())
            .map((doc, i) => ({
                ...doc,
                id: `doc-${i}`,
                modified: new Date(today.setDate(today.getDate() - i * 3)).toLocaleDateString(),
            }));
    }, [taskParams]);

    const recentActivity = useMemo(() => [
        { action: 'uploaded', who: 'Alice', subject: 'MSA_AcmeCorp_Q4.docx' },
        { action: 'commented on', who: 'Bob', subject: 'SOW_ProjectPhoenix.docx' },
        { action: 'signed', who: 'Charlie', subject: 'NDA_InnovateLLC.docx' },
        { action: 'viewed', who: 'Alice', subject: 'TermSheet_BetaCo.docx' },
    ].sort(() => 0.5 - Math.random()), []);

    const [activeView, setActiveView] = useState<ActiveView>('dashboard');
    const [selectedDocIds, setSelectedDocIds] = useState<Set<string>>(new Set());
    const [isComparing, setIsComparing] = useState<boolean>(false);
    const [highlighted, setHighlighted] = useState<boolean>(false);
    const [isCompleted, setIsCompleted] = useState<boolean>(false);
    const [isCorrect, setIsCorrect] = useState<boolean>(false);
    
    const handleSelectDoc = (docId: string) => {
        const newSelection = new Set(selectedDocIds);
        if (newSelection.has(docId)) {
            newSelection.delete(docId);
        } else {
            newSelection.add(docId);
        }
        setSelectedDocIds(newSelection);
    };

    const handleExport = () => {
        const selectedDocs = documents.filter(doc => selectedDocIds.has(doc.id));
        const selectedNames = new Set(selectedDocs.map(d => d.name));
        const requiredNames = new Set([taskParams.doc1Name, taskParams.doc2Name]);
        
        const namesMatch = selectedNames.size === 2 && requiredNames.has(taskParams.doc1Name) && requiredNames.has(taskParams.doc2Name);
        const actionCorrect = highlighted;

        setIsCorrect(namesMatch && actionCorrect);
        setIsCompleted(true);
    };

    const handleCreateNewTask = () => {
        setTaskParams(generateNewTask());
        setActiveView('dashboard');
        setSelectedDocIds(new Set());
        setIsComparing(false);
        setHighlighted(false);
        setIsCompleted(false);
        setIsCorrect(false);
    };
    
    const TaskDescription = () => (
        <div className="bg-gray-800 text-white p-4 rounded-lg mb-6 shadow-lg">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="font-bold text-lg">Your Task</h2>
                    <p className="text-sm text-gray-300 max-w-4xl">
                        Your goal is to export a PDF showing a comparison between two contract drafts. In the <strong>Documents</strong> section, compare versions for the draft <strong className="text-amber-300">{taskParams.doc1Name}</strong> and <strong className="text-amber-300">{taskParams.doc2Name}</strong>. Ensure that you highlight the differences between the two drafts before exporting to PDF to complete the task.
                    </p>
                </div>
                <button
                    onClick={handleCreateNewTask}
                    className="flex-shrink-0 flex items-center bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md transition"
                >
                    <RefreshIcon />
                    New Task
                </button>
            </div>
        </div>
    );
    
    const CompletionModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white rounded-lg shadow-2xl p-8 m-4 max-w-md w-full text-center animate-slide-in-up">
                <CheckIcon className="mx-auto text-green-500 w-16 h-16" />
                <h2 className="text-2xl font-bold text-gray-800 mt-4">Congratulations, you have completed all stages!</h2>
                {isCorrect && (
                     <div className="mt-4 text-lg">
                        <p className="text-gray-600">Password:</p>
                        <p className="text-3xl font-bold text-indigo-600 tracking-widest bg-gray-100 px-6 py-3 rounded-lg mt-2 inline-block">{PASSWORD_HighlightDifference}</p>
                    </div>
                )}
            </div>
        </div>
    );
    
    const ComparisonModal = () => {
        const text1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.";
        const text2 = "Lorem ipsum dolor sit amet, consectetur elit. Sed non. Suspendisse lectus tortor, dignissim sit, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est.";
        
        return (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-40 p-4 animate-fade-in">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[90vh] flex flex-col p-4">
                    <div className="flex-shrink-0 flex justify-between items-center p-2 border-b">
                        <h3 className="text-xl font-bold text-gray-800">Compare Document Versions</h3>
                        <div className="flex items-center space-x-2">
                             <button onClick={() => setHighlighted(true)} className="px-4 py-2 rounded-md bg-yellow-400 text-yellow-900 hover:bg-yellow-500 font-semibold disabled:bg-gray-300" disabled={highlighted}>Highlight Differences</button>
                             <button onClick={handleExport} className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 font-semibold">Export to PDF</button>
                             <button onClick={() => setIsComparing(false)} className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 font-semibold">Close</button>
                        </div>
                    </div>
                    <div className="flex-grow grid grid-cols-2 gap-4 overflow-y-auto p-4">
                        <div className="bg-gray-50 p-3 rounded font-serif text-gray-700 leading-relaxed">
                            <p>{text1.substring(0,45)}<span className={highlighted ? "bg-red-200" : ""}>{text1.substring(45,69)}</span>{text1.substring(69,96)}<span className={highlighted ? "bg-yellow-200" : ""}>{text1.substring(96,110)}</span>{text1.substring(110)}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded font-serif text-gray-700 leading-relaxed">
                            <p>{text2.substring(0,34)}<span className={highlighted ? "bg-red-200" : ""}>{text2.substring(34,51)}</span>{text2.substring(51,89)}<span className={highlighted ? "bg-yellow-200" : ""}>{text2.substring(89,114)}</span>{text2.substring(114)}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    const renderDocuments = () => {
        const isCompareDisabled = selectedDocIds.size !== 2;
        const buttonText = isCompareDisabled 
            ? `Select two documents to compare (${selectedDocIds.size}/2)`
            : 'Compare Versions';

        return (
            <div className="bg-white rounded-lg shadow-lg">
                <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-800">All Documents</h3>
                    <button onClick={() => setIsComparing(true)} disabled={isCompareDisabled} className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed">
                        {buttonText}
                    </button>
                </div>
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50 border-b">
                            <th className="p-4 w-12"><input type="checkbox" disabled/></th>
                            <th className="p-4 font-semibold text-gray-600">Name</th>
                            <th className="p-4 font-semibold text-gray-600">Version</th>
                            <th className="p-4 font-semibold text-gray-600">Last Modified</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documents.map(doc => (
                            <tr key={doc.id} className="border-b hover:bg-gray-50">
                                <td className="p-4"><input type="checkbox" checked={selectedDocIds.has(doc.id)} onChange={() => handleSelectDoc(doc.id)} /></td>
                                <td className="p-4 text-gray-800 font-medium">{doc.name}</td>
                                <td className="p-4 text-gray-600">{doc.version}</td>
                                <td className="p-4 text-gray-600">{doc.modified}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const renderTemplates = () => (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Contract Templates (Feature Coming Soon!)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 <div className="p-6 border rounded-lg text-center flex flex-col items-center bg-gray-50">
                    <NDATemplateIcon className="w-12 h-12 mb-4 text-indigo-500" />
                    <h4 className="text-lg font-semibold text-gray-800">Non-Disclosure Agreement</h4>
                    <p className="text-sm text-gray-500 mt-2">Feature Coming Soon!</p>
                </div>
                <div className="p-6 border rounded-lg text-center flex flex-col items-center bg-gray-50">
                    <MSATemplateIcon className="w-12 h-12 mb-4 text-indigo-500" />
                    <h4 className="text-lg font-semibold text-gray-800">Master Services Agreement</h4>
                    <p className="text-sm text-gray-500 mt-2">Feature Coming Soon!</p>
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        switch(activeView) {
            case 'dashboard': return (
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h3>
                    <ul className="divide-y divide-gray-200">
                        {recentActivity.map((act, i) => (
                             <li key={i} className="py-3 text-gray-700"><strong>{act.who}</strong> {act.action} <strong>{act.subject}</strong></li>
                        ))}
                    </ul>
                </div>
            );
            case 'templates': return renderTemplates();
            case 'documents': return renderDocuments();
        }
    };
    
    return (
        <div className="min-h-screen bg-gray-200 font-sans">
            <main className="p-8 pb-24">
                <TaskDescription />
                {renderContent()}
            </main>
            <nav className="fixed bottom-0 left-0 w-full bg-gray-900 text-white flex justify-around p-2 shadow-inner z-10">
                {(['dashboard', 'documents', 'templates'] as ActiveView[]).map(view => (
                     <button key={view} onClick={() => setActiveView(view)} className={`flex flex-col items-center justify-center p-2 rounded-lg w-28 font-semibold transition-colors capitalize ${activeView === view ? 'bg-indigo-700 text-white' : 'hover:bg-gray-800 text-gray-400'}`}>
                        {view === 'dashboard' && <DashboardIcon className="h-6 w-6 mb-1"/>}
                        {view === 'documents' && <DocsIcon className="h-6 w-6 mb-1"/>}
                        {view === 'templates' && <TemplatesIcon className="h-6 w-6 mb-1"/>}
                        {view}
                    </button>
                ))}
            </nav>
            {isComparing && <ComparisonModal />}
            {isCompleted && <CompletionModal />}
        </div>
    );
};

export default HighlightDifference;