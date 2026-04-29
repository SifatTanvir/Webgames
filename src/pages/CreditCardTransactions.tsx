import React, { useState, useMemo } from 'react';

export const TASK_ID = 'finance-history-chargedispute';
export const PASSWORD = 'THEORY-BIG-BANG';
const TARGET_MERCHANT = 'Pizza Palace';
const TARGET_DISPUTE_REASON = 'incorrect-amount';
const TARGET_PERIOD = 'last-month';

type Category = 'Restaurants' | 'Shopping' | 'Gas' | 'Groceries' | 'Entertainment' | 'Utilities';
interface Transaction { id: string; date: string; merchant: string; category: Category; amount: number; status: string; }

const themeOptions = [
    { name: 'indigo', gradient: 'from-indigo-500 to-purple-600', text: 'text-indigo-400', shadow: 'shadow-indigo-500/50', bg: 'bg-indigo-500' },
    { name: 'teal', gradient: 'from-teal-400 to-cyan-500', text: 'text-teal-300', shadow: 'shadow-teal-500/50', bg: 'bg-teal-500' },
    { name: 'rose', gradient: 'from-rose-500 to-red-500', text: 'text-rose-400', shadow: 'shadow-rose-500/50', bg: 'bg-rose-500' },
];
const categories: Category[] = ['Restaurants', 'Shopping', 'Gas', 'Groceries', 'Entertainment', 'Utilities'];

const CategoryIcons: Record<Category, () => JSX.Element> = {
    'Restaurants': () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 2a2 2 0 012-2h12a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V2zm4.5 1a.5.5 0 00-.5.5v2.755l.26.155a1.5 1.5 0 011.48 0L8 6.405V3.5a.5.5 0 00-.5-.5h-1zM5 11a1 1 0 100-2 1 1 0 000 2zm1-3a1 1 0 100-2 1 1 0 000 2zm3 3a1 1 0 100-2 1 1 0 000 2zm1-3a1 1 0 100-2 1 1 0 000 2zm3 3a1 1 0 100-2 1 1 0 000 2zm1-3a1 1 0 100-2 1 1 0 000 2z" /></svg>,
    'Shopping': () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v2a2 2 0 01-2 2H7a2 2 0 01-2-2V4zm2 2a1 1 0 001 1h4a1 1 0 100-2H8a1 1 0 00-1 1z" /><path d="M5 8a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2H5zm2 2a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" /></svg>,
    'Gas': () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 2.293a1 1 0 010 1.414L9.414 7.414a1 1 0 01-1.414 0L4.293 3.707a1 1 0 011.414-1.414L9 5.586l3.293-3.293a1 1 0 011.414 0z" clipRule="evenodd" /><path fillRule="evenodd" d="M3 8a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /><path fillRule="evenodd" d="M4 11a1 1 0 100 2h12a1 1 0 100-2H4zM4 15a1 1 0 100 2h12a1 1 0 100-2H4z" clipRule="evenodd" /></svg>,
    'Groceries': () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" /></svg>,
    'Entertainment': () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM6 8a2 2 0 100 4 2 2 0 000-4z" /></svg>,
    'Utilities': () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>,
};

const CreditCardTransactions: React.FC = () => {
    // --- STATE ---
    const [selectedPeriod, setSelectedPeriod] = useState('all');
    const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all'); // FIX: Added state for category filter
    const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null);
    const [disputeReason, setDisputeReason] = useState('');
    const [disputeSubmitted, setDisputeSubmitted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    const theme = useMemo(() => themeOptions[Math.floor(Math.random() * themeOptions.length)], []);

    const allTransactions = useMemo<Transaction[]>(() => {
        const today = new Date();
        const merchants = ['Amazon', 'Target', 'Shell Gas', 'Walmart', 'Netflix', 'Golden Dragon', 'Burger Station', 'Cafe Mocha', 'Sushi Express'];
        const transactions: Transaction[] = Array.from({ length: 49 }, (_, i) => {
            const date = new Date(today.getTime() - Math.random() * 90 * 24 * 60 * 60 * 1000);
            const category = categories[Math.floor(Math.random() * categories.length)];
            return {
                id: `tx_${i}`, date: date.toISOString().split('T')[0], merchant: merchants[i % merchants.length],
                category, amount: parseFloat((Math.random() * 200 + 5).toFixed(2)), status: 'Posted'
            };
        });
        const pizzaDate = new Date(today.getTime() - Math.random() * 28 * 24 * 60 * 60 * 1000);
        transactions.push({ id: 'tx_pizza', date: pizzaDate.toISOString().split('T')[0], merchant: 'Pizza Palace', category: 'Restaurants', amount: parseFloat((Math.random() * 80 + 10).toFixed(2)), status: 'Posted' });
        return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, []);

    const filteredTransactions = useMemo(() => {
        let transactions = [...allTransactions];
        if (selectedPeriod !== 'all') {
            const days = selectedPeriod === 'last-7-days' ? 7 : selectedPeriod === 'last-month' ? 30 : 90;
            const cutoff = new Date();
            cutoff.setDate(cutoff.getDate() - days);
            transactions = transactions.filter(t => new Date(t.date) >= cutoff);
        }
        if (selectedCategory !== 'all') { 
            transactions = transactions.filter(t => t.category === selectedCategory);
        }
        return transactions;
    }, [allTransactions, selectedPeriod, selectedCategory]);

    const spendingSummary = useMemo(() => {
        const summary = categories.reduce((acc, cat) => ({...acc, [cat]: 0}), {} as Record<Category, number>);
        filteredTransactions.forEach(t => { summary[t.category] += t.amount; });
        return Object.entries(summary).map(([category, total]) => ({ category: category as Category, total }));
    }, [filteredTransactions]);
    const maxSpending = useMemo(() => Math.max(...spendingSummary.map(s => s.total)) || 1, [spendingSummary]);

    const handleDisputeSubmit = () => {
        if (disputeReason === TARGET_DISPUTE_REASON && filteredTransactions.find(t => t.id === selectedTransactionId)?.merchant === TARGET_MERCHANT && selectedPeriod === TARGET_PERIOD) {
            setShowPassword(true);
        }
        setDisputeSubmitted(true);
    };

    return (
        <div className="min-h-screen w-full bg-gray-900 font-sans text-white overflow-hidden">
            <div className="fixed inset-0 bg-grid-slate-900 [mask-image:linear-gradient(0deg,#000000,rgba(0,0,0,0.6))]"></div>
            <div className="fixed inset-0 bg-gradient-to-t from-gray-900 via-gray-900 to-indigo-900/20 animate-aurora"></div>
            
            <div className="relative max-w-7xl mx-auto p-4 sm:p-8">
                <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                    <div><h1 className="text-3xl font-bold">Transactions</h1><p className="text-gray-400">Account ending in 4892</p></div>
                    <div className="flex items-center p-1 bg-black/20 backdrop-blur-lg border border-white/10 rounded-full">
                        {['all', 'last-7-days', 'last-month', 'last-3-months'].map(p => (
                            <button key={p} onClick={() => setSelectedPeriod(p)} className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-all duration-300 ${selectedPeriod === p ? `${theme.bg} text-white shadow-md ${theme.shadow}` : 'text-gray-400 hover:text-white'}`}>
                                {p.replace('-', ' ').replace('all', 'All Time').replace(/\b\w/g, l => l.toUpperCase())}
                            </button>
                        ))}
                    </div>
                </header>

                <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-1 space-y-6 lg:sticky top-8">
                        <GlassCard>
                            <h2 className="font-bold mb-4">Filters</h2>
                            <div className="flex flex-wrap gap-2">
                                <FilterPill label="All" isActive={selectedCategory === 'all'} onClick={() => setSelectedCategory('all')} theme={theme} />
                                {categories.map(cat => <FilterPill key={cat} label={cat} isActive={selectedCategory === cat} onClick={() => setSelectedCategory(cat)} theme={theme} />)}
                            </div>
                        </GlassCard>
                        <GlassCard>
                            <h2 className="font-bold mb-4">Spending Summary</h2>
                            <div className="space-y-4">
                                {spendingSummary.map(({ category, total }) => (
                                    <div key={category} className="group">
                                        <div className="flex justify-between items-center mb-1 text-sm"><span className="font-medium text-gray-300">{category}</span><span className="font-bold text-white">${total.toFixed(2)}</span></div>
                                        <div className="h-2 bg-white/10 rounded-full"><div className={`h-2 rounded-full bg-gradient-to-r ${theme.gradient} transition-all duration-500 ease-out`} style={{ width: `${(total / maxSpending) * 100}%` }}></div></div>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    </div>

                    <div className="lg:col-span-2 space-y-4">
                        {filteredTransactions.map(t => <TransactionCard key={t.id} transaction={t} onDisputeClick={() => setSelectedTransactionId(t.id === selectedTransactionId ? null : t.id)} isSelected={selectedTransactionId === t.id} theme={theme} />)}
                        {selectedTransactionId && <DisputeForm transaction={filteredTransactions.find(t => t.id === selectedTransactionId)!} onReasonChange={setDisputeReason} onSubmit={handleDisputeSubmit} onCancel={() => setSelectedTransactionId(null)} />}
                    </div>
                </main>
            </div>
            {disputeSubmitted && <ConfirmationModal showPassword={showPassword} onClose={() => { setDisputeSubmitted(false); setSelectedTransactionId(null); }} theme={theme} />}
        </div>
    );
};

const GlassCard: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <div className={`bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-2xl shadow-black/20 ${className}`}>{children}</div>
);

const FilterPill: React.FC<{ label: string, isActive: boolean, onClick: () => void, theme: any }> = ({ label, isActive, onClick, theme }) => (
    <button onClick={onClick} className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 border ${isActive ? `${theme.bg} text-white border-transparent shadow-lg ${theme.shadow}` : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'}`}>
        {label}
    </button>
);

const TransactionCard: React.FC<{ transaction: Transaction, onDisputeClick: () => void, isSelected: boolean, theme: any }> = ({ transaction, onDisputeClick, isSelected, theme }) => {
    const Icon = CategoryIcons[transaction.category];
    return (
        <div className={`bg-black/30 backdrop-blur-xl border-2 rounded-2xl p-4 transition-all duration-300 group transform-gpu ${isSelected ? `border-${theme.name}-500/80 ${theme.shadow}` : 'border-white/10 hover:border-white/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30'}`} style={{ perspective: '1000px' }}>
            <div className={`flex items-center gap-4 transition-all duration-300 ${isSelected ? '' : 'group-hover:[transform:translateZ(20px)]'}`}>
                <div className={`w-10 h-10 flex-shrink-0 flex items-center justify-center bg-white/10 rounded-lg text-${theme.name}-400`}><Icon /></div>
                <div className="flex-1"><p className="font-bold">{transaction.merchant}</p><p className="text-sm text-gray-400">{formatDate(transaction.date)}</p></div>
                <div className="text-right"><p className="font-bold text-lg">${transaction.amount.toFixed(2)}</p><p className="text-xs text-green-400 font-semibold">{transaction.status}</p></div>
                <button onClick={onDisputeClick} className={`w-24 text-center px-3 py-2 rounded-lg font-semibold transition-all duration-300 transform-gpu ${isSelected ? `bg-${theme.name}-600 text-white shadow-lg ${theme.shadow}` : `bg-white/10 text-gray-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4`}`}>Dispute</button>
            </div>
        </div>
    );
};

const DisputeForm: React.FC<{ transaction: Transaction, onReasonChange: (reason: string) => void, onSubmit: () => void, onCancel: () => void }> = ({ transaction, onReasonChange, onSubmit, onCancel }) => (
    <div className="bg-black/30 backdrop-blur-xl border-2 border-rose-500/50 rounded-2xl p-6 animate-fade-in-up">
        <h3 className="font-bold text-lg mb-4">Dispute Charge: {transaction.merchant}</h3>
        <div className="grid grid-cols-2 gap-3 mb-4">{['unauthorized', 'incorrect-amount', 'duplicate', 'not-received'].map(reason => (
            <label key={reason} className="p-3 bg-white/5 rounded-lg border-2 border-white/10 has-[:checked]:bg-rose-500/20 has-[:checked]:border-rose-500/50 cursor-pointer transition-colors duration-200">
                <input type="radio" name="disputeReason" value={reason} onChange={e => onReasonChange(e.target.value)} className="sr-only" />
                <span className="text-sm font-medium">{reason.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
            </label>
        ))}</div>
        <div className="flex justify-end gap-3 mt-6"><button onClick={onCancel} className="px-5 py-2 text-sm font-semibold bg-white/10 rounded-lg hover:bg-white/20 transition-colors z-10">Cancel</button><button onClick={onSubmit} className="px-5 py-2 text-sm font-semibold bg-rose-600 text-white rounded-lg hover:bg-rose-700 shadow-lg shadow-rose-500/30 transition-all">Submit Dispute</button></div>
    </div>
);

const ConfirmationModal: React.FC<{ showPassword: boolean, onClose: () => void, theme: any }> = ({ showPassword, onClose, theme }) => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
        <div className={`relative bg-gray-900/80 border border-white/10 rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center overflow-hidden`}>
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[200%] bg-gradient-to-t ${theme.gradient} opacity-20 animate-spin-slow -z-10`}></div>
            <div className={`relative w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-white/10 bg-gray-800`}><div className={`w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br ${theme.gradient}`}><svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></div></div>
            <h2 className="text-2xl font-bold text-white mb-2">Dispute Submitted</h2>
            <p className="text-gray-400 mb-6">Your dispute will be reviewed within 5-7 business days.</p>
            {showPassword && (<div className={`p-4 bg-gradient-to-br ${theme.gradient} rounded-xl inline-block shadow-lg ${theme.shadow}`}>
                <p className="text-sm text-white/80">Confirmation Code:</p><p className="text-2xl font-mono font-bold text-white tracking-widest mt-1">{PASSWORD}</p>
            </div>)}
            {!showPassword && <button onClick={onClose} className={`mt-4 px-6 py-2 text-sm font-semibold bg-white/10 text-white rounded-lg hover:bg-white/20`}>Close</button>}
        </div>
    </div>
);

const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

export default CreditCardTransactions;