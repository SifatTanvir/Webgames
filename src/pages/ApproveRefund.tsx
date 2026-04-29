import React, { useState, useMemo } from 'react';

export const TASK_ID_ApproveRefund = 'ecommerce-return-approverefund';
export const PASSWORD_ApproveRefund = 'MAMMAL';

const CheckIcon = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const RefreshIcon = () => <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 4l1.5 1.5A9 9 0 0120.5 16" /></svg>;
const DashboardIcon = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l3.75-3.75m0 0h11.25m-11.25 0v11.25" /></svg>;
const ReturnsIcon = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" /></svg>;
const ReportsIcon = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 100 15h8.25a7.5 7.5 0 000-15H10.5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6L21 6m-10.5 9L21 15" /></svg>;

type ActiveView = 'dashboard' | 'returns' | 'reports';
type Reason = 'Incorrect Item' | 'Damaged in Transit' | 'No Longer Needed' | 'Defective Product';
type RefundMethod = 'Store Credit' | 'Original Payment Method';
type ReturnStatus = 'Pending' | 'Approved' | 'Rejected';
type ReturnRequest = { id: string; customerName: string; orderId: string; purchaseDate: Date; purchaseAmount: number; reason: Reason; preferredMethod: RefundMethod; status: ReturnStatus; };
type TaskParams = { filterReason: Reason; };

const REASONS: Reason[] = ['Incorrect Item', 'Damaged in Transit', 'No Longer Needed', 'Defective Product'];
const NAMES = ['John Smith', 'Maria Garcia', 'Chen Wei', 'Fatima Al-Fassi', 'David Miller'];

const generateNewTask = (): TaskParams => ({ filterReason: REASONS[Math.floor(Math.random() * REASONS.length)] });
const generateReturnRequests = (taskParams: TaskParams): ReturnRequest[] => {
    const today = new Date();
    let requests: ReturnRequest[] = [];
    for (let i = 0; i < 5; i++) {
        requests.push({ id: `req-valid-${i}`, customerName: NAMES[i % NAMES.length], orderId: `ORD-V${1000 + i}`, purchaseDate: new Date(new Date(today).setDate(today.getDate() - (i % 6 + 1))), purchaseAmount: 200 - i * 20, reason: taskParams.filterReason, preferredMethod: i % 2 === 0 ? 'Store Credit' : 'Original Payment Method', status: 'Pending' });
    }
    for (let i = 0; i < 10; i++) {
        requests.push({ id: `req-random-${i}`, customerName: NAMES[i % NAMES.length], orderId: `ORD-R${2000 + i}`, purchaseDate: new Date(new Date(today).setDate(today.getDate() - (i + 8))), purchaseAmount: Math.random() * 150 + 20, reason: REASONS[Math.floor(Math.random() * REASONS.length)], preferredMethod: i % 2 === 0 ? 'Store Credit' : 'Original Payment Method', status: 'Pending' });
    }
    return requests.sort(() => Math.random() - 0.5);
};

const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean; onChange: (e: boolean) => void }) => (
    <button onClick={() => onChange(!enabled)} className={`${enabled ? 'bg-cyan-600' : 'bg-zinc-700'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}><span className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}/></button>
);

type ApprovalDialogProps = { request: ReturnRequest; onConfirm: (method: RefundMethod) => void; onClose: () => void; };
const ApprovalDialog: React.FC<ApprovalDialogProps> = ({ request, onConfirm, onClose }) => {
    const [selectedMethod, setSelectedMethod] = useState<RefundMethod>(request.preferredMethod);
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-zinc-800 border border-zinc-700 rounded-lg shadow-2xl p-6 m-4 max-w-md w-full">
                <h3 className="text-lg font-bold text-gray-100">Approve Refund for {request.orderId}</h3>
                <p className="text-sm text-gray-400 mt-2">Customer's preferred method: <strong className="text-cyan-400">{request.preferredMethod}</strong></p>
                <div className="my-4 space-y-2">
                    {(['Store Credit', 'Original Payment Method'] as RefundMethod[]).map(method => (
                        <label key={method} className="flex items-center p-3 bg-zinc-900 rounded-md cursor-pointer has-[:checked]:ring-2 has-[:checked]:ring-cyan-500">
                            <input type="radio" name="refundMethod" value={method} checked={selectedMethod === method} onChange={() => setSelectedMethod(method)} className="h-4 w-4 text-cyan-600 bg-zinc-700 border-zinc-600 focus:ring-cyan-500"/>
                            <span className="ml-3 text-sm font-medium text-gray-200">{method}</span>
                        </label>
                    ))}
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <button onClick={onClose} className="px-4 py-2 rounded-md bg-zinc-600 text-white hover:bg-zinc-500 font-semibold">Cancel</button>
                    <button onClick={() => onConfirm(selectedMethod)} className="px-4 py-2 rounded-md bg-cyan-600 text-white hover:bg-cyan-700 font-semibold">Confirm Approval</button>
                </div>
            </div>
        </div>
    );
};

const ApproveRefund: React.FC = () => {
    const [taskParams, setTaskParams] = useState<TaskParams>(generateNewTask);
    const [allRequests, setAllRequests] = useState<ReturnRequest[]>(() => generateReturnRequests(taskParams));
    
    const dashboardMetrics = useMemo(() => ({ processed: Math.floor(Math.random() * 50 + 20), pending: Math.floor(Math.random() * 10 + 5), avgTime: `${(Math.random() * 24 + 12).toFixed(1)}h` }), []);
    
    const [activeView, setActiveView] = useState<ActiveView>('dashboard');
    const [filterReason, setFilterReason] = useState<string>('All');
    const [isHandling, setIsHandling] = useState(false);
    const [showApprovalModalFor, setShowApprovalModalFor] = useState<ReturnRequest | null>(null);
    const [stagedApprovals, setStagedApprovals] = useState<Map<string, string>>(new Map());
    const [stagedRejections, setStagedRejections] = useState<Set<string>>(new Set());
    const [isCompleted, setIsCompleted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const handleToggleHandlingMode = (newMode: boolean) => {
        setIsHandling(newMode);
        if (!newMode) {
            const stagedApprovalIds = new Set(stagedApprovals.keys());
            const allStagedIds = new Set([...stagedApprovalIds, ...stagedRejections]);
            
            setAllRequests(prev => prev.map(req => allStagedIds.has(req.id) ? { ...req, status: 'Pending' } : req));
            
            setStagedApprovals(new Map());
            setStagedRejections(new Set());
        }
    };

    const confirmApproval = (method: RefundMethod) => {
        if (!showApprovalModalFor) return;
        const reqId = showApprovalModalFor.id;
        setStagedApprovals(prev => new Map(prev).set(reqId, method));
        setAllRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: 'Approved' } : r));
        setShowApprovalModalFor(null);
    };
    
    const handleReject = (requestId: string) => {
        setStagedRejections(prev => new Set(prev).add(requestId));
        setAllRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: 'Rejected' } : r));
    };

    const handleSaveChanges = () => {
        const today = new Date();
        const oneWeekAgo = new Date(new Date(today).setDate(today.getDate() - 7));
        const correctApprovals = allRequests
            .filter(r => r.reason === taskParams.filterReason && r.purchaseDate >= oneWeekAgo)
            .sort((a, b) => b.purchaseAmount - a.purchaseAmount)
            .slice(0, 3);
        
        let isTaskCorrect = false;
        if (correctApprovals.length === 3 && stagedApprovals.size === 3) {
            const correctIds = new Set(correctApprovals.map(r => r.id));
            let correctCount = 0;
            stagedApprovals.forEach((method, id) => {
                const originalRequest = correctApprovals.find(r => r.id === id);
                if (correctIds.has(id) && originalRequest && originalRequest.preferredMethod === method) {
                    correctCount++;
                }
            });
            if (correctCount === 3) {
                isTaskCorrect = true;
            }
        }
        setIsCorrect(isTaskCorrect);
        setIsCompleted(true);
    };

    const handleCreateNewTask = () => {
        const newParams = generateNewTask();
        setTaskParams(newParams);
        setAllRequests(generateReturnRequests(newParams));
        setActiveView('dashboard');
        setFilterReason('All');
        setIsHandling(false);
        setStagedApprovals(new Map());
        setStagedRejections(new Set());
        setShowApprovalModalFor(null);
        setIsCompleted(false);
        setIsCorrect(false);
    };
    
    const filteredRequests = useMemo(() => {
        if (filterReason === 'All') return allRequests;
        return allRequests.filter(r => r.reason === filterReason);
    }, [allRequests, filterReason]);

    const TaskDescription = () => (
        <div className="bg-zinc-800 border border-zinc-700 text-gray-200 p-4 rounded-lg mb-6 shadow-lg">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="font-bold text-lg text-gray-100">Your Task</h2>
                    <p className="text-sm text-gray-400 max-w-4xl">
                        Your goal is to have specific customer returns approved and the changes saved. The returns requiring approval are in the <strong>'Customer Returns'</strong> queue and must meet all of the following criteria: a return reason of <strong className="text-cyan-400">'{taskParams.filterReason}'</strong>; a purchase date within 1-week before today; and have the top 3 highest purchase amount among the returns with the same return reason. Ensure to approve these returns with their preferred refund method selected.
                    </p>
                </div>
                <button onClick={handleCreateNewTask} className="flex-shrink-0 flex items-center bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-2 px-4 rounded-md transition"><RefreshIcon /> New Task</button>
            </div>
        </div>
    );
    
    const CompletionModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-zinc-800 border-zinc-700 rounded-lg shadow-2xl p-8 m-4 max-w-md w-full text-center">
                <CheckIcon className="mx-auto text-green-500 w-16 h-16" />
                <h2 className="text-2xl font-bold text-gray-100 mt-4">Congratulations! You have completed the task.</h2>
                {isCorrect && <div className="mt-4 text-lg"><p className="text-gray-400">Password:</p><p className="text-2xl font-bold text-cyan-400 tracking-widest bg-zinc-900 px-4 py-2 rounded-lg mt-2 inline-block">{PASSWORD_ApproveRefund}</p></div>}
            </div>
        </div>
    );
    
    const renderReturns = () => {
        const hasStagedChanges = stagedApprovals.size > 0 || stagedRejections.size > 0;
        return (
            <div className="bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg">
                <div className="p-4 border-b border-zinc-700 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-200">Customer Returns</h3>
                    <div className="flex items-center gap-4">
                        {isHandling && <button onClick={handleSaveChanges} disabled={!hasStagedChanges} className="px-4 py-2 rounded-md bg-cyan-600 text-white font-semibold hover:bg-cyan-700 disabled:bg-zinc-600 disabled:cursor-not-allowed animate-fade-in">Save Changes</button>}
                        <div className="flex items-center gap-2">
                            <label htmlFor="handle-toggle" className="text-sm font-medium text-gray-300">Handle Requests</label>
                            <ToggleSwitch enabled={isHandling} onChange={handleToggleHandlingMode} />
                        </div>
                        <select value={filterReason} onChange={e => setFilterReason(e.target.value)} className="p-2 bg-zinc-700 text-white border border-zinc-600 rounded-md focus:ring-2 focus:ring-cyan-500">
                            <option value="All">All Reasons</option>
                            {REASONS.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                    </div>
                </div>
                 <div className="overflow-x-auto"><table className="w-full text-left">
                    <thead className="bg-zinc-900 border-b border-zinc-700"><tr className="text-sm">
                        <th className="p-3 font-semibold text-gray-400">Customer</th>
                        <th className="p-3 font-semibold text-gray-400">Order ID</th>
                        <th className="p-3 font-semibold text-gray-400">Date / Amount</th>
                        <th className="p-3 font-semibold text-gray-400">Reason</th>
                        <th className="p-3 font-semibold text-gray-400">Preferred Method</th>
                        <th className="p-3 font-semibold text-gray-400">Status</th>
                        <th className="p-3 font-semibold text-gray-400">Actions</th>
                    </tr></thead>
                    <tbody>{filteredRequests.map(req => (
                        <tr key={req.id} className="border-b border-zinc-700 text-sm text-gray-300 hover:bg-zinc-700/50">
                            <td className="p-3">{req.customerName}</td>
                            <td className="p-3 font-mono">{req.orderId}</td>
                            <td className="p-3">{req.purchaseDate.toLocaleDateString()}<br/><span className="font-mono text-gray-400">${req.purchaseAmount.toFixed(2)}</span></td>
                            <td className="p-3">{req.reason}</td>
                            <td className="p-3 text-cyan-400">{req.preferredMethod}</td>
                            <td className="p-3"><span className={`px-2 py-1 font-medium rounded-full text-xs ${req.status === 'Approved' ? 'bg-green-900 text-green-300' : req.status === 'Rejected' ? 'bg-red-900 text-red-300' : 'bg-yellow-900 text-yellow-300'}`}>{req.status}</span></td>
                            <td className="p-3 h-16">{isHandling && req.status === 'Pending' && <div className="flex gap-2 animate-fade-in"><button onClick={() => setShowApprovalModalFor(req)} className="px-3 py-1 font-medium text-green-300 bg-green-800 rounded-full hover:bg-green-700">Approve</button><button onClick={() => handleReject(req.id)} className="px-3 py-1 font-medium text-red-300 bg-red-800 rounded-full hover:bg-red-700">Reject</button></div>}</td>
                        </tr>)
                    )}</tbody>
                </table></div>
            </div>
        );
    };

    const renderContent = () => {
        switch(activeView) {
            case 'dashboard': return (
                <div className="bg-zinc-800 border border-zinc-700 rounded-lg shadow p-6">
                    <h2 className="text-2xl font-bold text-gray-200 mb-4">Returns Dashboard</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div className="p-4 bg-zinc-900 rounded-lg"><p className="text-3xl font-bold text-cyan-400">{dashboardMetrics.processed}</p><p className="text-sm text-gray-400">Processed Today</p></div>
                        <div className="p-4 bg-zinc-900 rounded-lg"><p className="text-3xl font-bold text-cyan-400">{dashboardMetrics.pending}</p><p className="text-sm text-gray-400">Pending Queue</p></div>
                        <div className="p-4 bg-zinc-900 rounded-lg"><p className="text-3xl font-bold text-cyan-400">{dashboardMetrics.avgTime}</p><p className="text-sm text-gray-400">Avg. Processing Time</p></div>
                    </div>
                </div>
            );
            case 'reports': return <div className="bg-zinc-800 border border-zinc-700 rounded-lg shadow p-6"><h2 className="text-2xl font-bold text-gray-200">Reports</h2><p className="mt-2 text-gray-400">Monthly return rate reports will be displayed here.</p></div>;
            case 'returns': return renderReturns();
        }
    };
    
    return (
        <div className="min-h-screen bg-zinc-950 text-gray-200 font-sans flex">
            <nav className="w-60 bg-zinc-900 border-r border-zinc-800 p-4 flex flex-col">
                <h1 className="text-2xl font-bold text-cyan-400 mb-10 text-center">Returns Center</h1>
                <ul className="space-y-2">
                    {(['dashboard', 'returns', 'reports'] as ActiveView[]).map(view => (
                        <li key={view}><button onClick={() => setActiveView(view)} className={`w-full flex items-center p-3 rounded-lg font-semibold transition-colors capitalize ${activeView === view ? 'bg-cyan-600/20 text-cyan-400' : 'hover:bg-zinc-800 text-gray-400'}`}><span className="mr-3">{view === 'dashboard' && <DashboardIcon className="h-6 w-6"/>}{view === 'returns' && <ReturnsIcon className="h-6 w-6"/>}{view === 'reports' && <ReportsIcon className="h-6 w-6"/>}</span>{view}</button></li>
                    ))}
                </ul>
            </nav>
            <main className="flex-1 p-8 overflow-y-auto">
                <TaskDescription />
                {renderContent()}
            </main>
            {showApprovalModalFor && <ApprovalDialog request={showApprovalModalFor} onConfirm={confirmApproval} onClose={() => setShowApprovalModalFor(null)} />}
            {isCompleted && <CompletionModal />}
        </div>
    );
};

export default ApproveRefund;