import { useState, FC, useCallback, useEffect } from "react";

export const TASK_ID_FlashSale = "ecommerce-promotion-flashsale";
export const PASSWORD_FlashSale = "Melody";

// --- Static Data and Interfaces ---
const PRODUCTS_DATA = [ { id: 'p1', name: 'Quantum Noise-Cancelling Headphones', price: 349.99, image: 'headphones' }, { id: 'p2', name: 'Hyperion Mechanical Keyboard', price: 159.99, image: 'keyboard' }, { id: 'p3', name: 'Aether-HD Webcam', price: 89.99, image: 'webcam' }, { id: 'p4', name: 'Galileo Smart Watch', price: 279.99, image: 'watch' }, { id: 'p5', name: 'Orion Ergonomic Mouse', price: 79.99, image: 'mouse' }, { id: 'p6', name: 'Cosmos VR Headset', price: 499.99, image: 'vr' }, ];
interface Product { id: string; name: string; price: number; image: string; }
interface TaskDefinition { productName: string; salePrice: number; }

// --- Icon Components ---
const ShoppingBagIcon: FC<{ className?: string }> = ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>;
const ClockIcon: FC<{ className?: string }> = ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
const CheckCircleIcon: FC<{ className?: string }> = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd"/></svg>;

// --- Page Components ---
const HomePage: FC = () => (
    <div className="max-w-7xl mx-auto"><div className="relative bg-red-600 text-white text-center py-20 sm:py-32 rounded-b-2xl shadow-lg"><div className="absolute inset-0 overflow-hidden rounded-b-2xl"><img src="https://picsum.photos/seed/herobg/1200/400" className="w-full h-full object-cover opacity-30" alt="Promotional background"/></div><div className="relative"><h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">Deals That Wow</h1><p className="mt-4 text-lg sm:text-xl max-w-2xl mx-auto text-red-100">Your one-stop shop for the latest and greatest in tech.</p></div></div><div className="p-8"><h2 className="text-2xl font-bold text-gray-800 mb-4">Best Sellers</h2><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{PRODUCTS_DATA.slice(0,3).map(p => (<div key={p.id} className="bg-white p-4 rounded-lg border shadow-sm"><img src={`https://picsum.photos/seed/${p.image}/300/150`} alt={p.name} className="rounded-md mb-2" /><h3 className="font-semibold">{p.name}</h3></div>))}</div></div></div>
);
const AccountPage: FC = () => (
    <div className="p-8 max-w-4xl mx-auto"><h1 className="text-3xl font-bold text-gray-800 mb-6">Your Account</h1><div className="bg-white p-6 rounded-2xl border shadow-sm"><h2 className="text-xl font-semibold text-gray-700 mb-4">Order History</h2><div className="space-y-3"><div className="flex justify-between items-center"><p>Order #1138-A</p><p className="font-semibold">$159.99</p><span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Delivered</span></div><div className="flex justify-between items-center"><p>Order #1137-C</p><p className="font-semibold">$349.99</p><span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Shipped</span></div></div></div></div>
);
const CompletionModal: FC<{ password?: string; isSuccess: boolean }> = ({ password, isSuccess }) => (<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full text-center border-2 border-green-500"><CheckCircleIcon className="h-20 w-20 mx-auto text-green-500" /><h2 className="text-2xl font-bold mt-4 text-gray-800">Congratulations! You have completed the task.</h2>{isSuccess && <div className="mt-6"><p className="text-gray-600">Your password is:</p><div className="mt-2 text-4xl font-extrabold text-green-600 tracking-widest bg-gray-100 py-2 px-4 rounded-md inline-block">{password}</div></div>}</div></div>);

// --- Main Component ---
const FlashSale: FC = () => {
  type Page = 'Home' | 'Promotions' | 'Account';
  type View = 'list' | 'confirm';
  type CompletionStatus = "incomplete" | "success" | "failure";
  const FLASH_SALE_DURATION = 15;

  const [page, setPage] = useState<Page>('Promotions');
  const [view, setView] = useState<View>('list');
  const [completionStatus, setCompletionStatus] = useState<CompletionStatus>('incomplete');
  
  const [task, setTask] = useState<TaskDefinition>({ productName: '', salePrice: 0 });
  const [claimedItem, setClaimedItem] = useState<Product | null>(null);

  const [timeLeft, setTimeLeft] = useState(FLASH_SALE_DURATION);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const isTimerExpired = timeLeft <= 0;

  const generateNewTask = useCallback(() => { const saleProduct = PRODUCTS_DATA[Math.floor(Math.random() * PRODUCTS_DATA.length)]; const salePrice = parseFloat((saleProduct.price * 0.5).toFixed(2)); setTask({ productName: saleProduct.name, salePrice }); }, []);
  const resetTask = () => { generateNewTask(); setCompletionStatus('incomplete'); setView('list'); setClaimedItem(null); setTimeLeft(FLASH_SALE_DURATION); setIsSubscribed(false); setPage('Promotions'); };

  useEffect(() => { generateNewTask(); }, [generateNewTask]);

  useEffect(() => { if (view === 'confirm' || isTimerExpired) return; const intervalId = setInterval(() => { setTimeLeft(prev => prev - 1); }, 1000); return () => clearInterval(intervalId); }, [view, isTimerExpired]);
  
  const handleClaimNow = () => { const saleProduct = PRODUCTS_DATA.find(p => p.name === task.productName); if (saleProduct && !isTimerExpired) { setClaimedItem(saleProduct); setView('confirm'); } };
  const handleConfirmOrder = () => { const isCorrect = claimedItem?.name === task.productName && !isTimerExpired && isSubscribed; setCompletionStatus(isCorrect ? 'success' : 'failure'); };
  
  const Header = () => (<header className="bg-white border-b p-4"><div className="max-w-7xl mx-auto flex justify-between items-center"><h1 className="text-xl font-bold text-red-600 flex items-center gap-2"><ShoppingBagIcon className="w-6 h-6"/>FlashShop</h1><div className="flex items-center gap-2">{(['Home', 'Promotions', 'Account'] as Page[]).map(p => (<button key={p} onClick={() => setPage(p)} className={`px-4 py-2 rounded-md text-sm font-semibold transition ${page === p ? 'bg-red-100 text-red-700' : 'text-gray-700 hover:bg-gray-100'}`}>{p}</button>))}</div></div></header>);
  const TaskBar = () => (
    <div className="bg-red-50 border-b border-red-200">
        <div className="max-w-7xl mx-auto py-3 px-4 flex items-center justify-between gap-4">
            <p className="text-sm text-red-900 flex-grow">
                <strong>Task:</strong> Your goal is to hold your spot for the <strong className="font-semibold">{task.productName}</strong> flash sale. Claim the sale before the timer runs out and subscribe to the newsletter to finalize the order.
            </p>
            <button onClick={resetTask} className="flex-shrink-0 px-4 py-2 bg-red-600 text-white rounded-md text-sm font-semibold hover:bg-red-700 transition">New Task</button>
        </div>
    </div>
);  
  const PromotionsPage = () => {
    if (view === 'confirm' && claimedItem) {
      return (
        <div className="p-8 max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-800">You've Claimed It!</h1>
            <div className="bg-white p-6 rounded-2xl border shadow-lg mt-6">
                <div className="flex justify-center"><img src={`https://picsum.photos/seed/${claimedItem.image}/400/200`} alt={claimedItem.name} className="rounded-lg mb-4" /></div>
                <h2 className="text-2xl font-bold">{claimedItem.name}</h2>
                <p className="text-xl font-semibold text-red-600 mt-2">${task.salePrice}</p>
                <div className="mt-6 flex items-center justify-center gap-3"><input id="subscribe" type="checkbox" checked={isSubscribed} onChange={(e) => setIsSubscribed(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500" /><label htmlFor="subscribe" className="text-gray-600">Subscribe to our flash sale newspaper</label></div>
                <button onClick={handleConfirmOrder} className="mt-6 w-full py-4 bg-red-600 text-white font-bold rounded-lg text-lg hover:bg-red-700 transition">Confirm Order</button>
            </div>
        </div>
      );
    }

    const saleProduct = PRODUCTS_DATA.find(p => p.name === task.productName);
    return (
        <div className="p-6 max-w-7xl mx-auto">
            {saleProduct && (
                <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white p-8 rounded-2xl shadow-2xl mb-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div><h2 className="text-3xl font-extrabold uppercase tracking-wider">Flash Sale</h2><p className="text-5xl font-bold mt-2">{saleProduct.name}</p><p className="text-2xl mt-4">Now Only <span className="font-extrabold text-yellow-300">${task.salePrice}</span></p></div>
                        <div className="text-center"><div className="flex items-center gap-3 text-4xl font-mono mb-4 bg-black/20 px-4 py-2 rounded-lg"><ClockIcon className="w-10 h-10"/><span>{Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{ (timeLeft % 60).toString().padStart(2, '0') }</span></div><button onClick={handleClaimNow} disabled={isTimerExpired} className="w-full py-3 bg-yellow-400 text-black font-bold rounded-lg text-xl hover:bg-yellow-300 transition disabled:bg-gray-500 disabled:cursor-not-allowed">{isTimerExpired ? 'Sale Ended' : 'Claim Now'}</button></div>
                    </div>
                </div>
            )}
            <div><h2 className="text-2xl font-bold text-gray-800 mb-4">Other Promotions</h2><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{PRODUCTS_DATA.filter(p => p.name !== task.productName).map(product => (<div key={product.id} className="bg-white p-4 rounded-lg border shadow-sm"><img src={`https://picsum.photos/seed/${product.image}/300/150`} alt={product.name} className="rounded-md mb-2" /><h3 className="font-semibold">{product.name}</h3><p className="text-gray-600">${product.price}</p></div>))}</div></div>
        </div>
    );
  };
  
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {completionStatus !== "incomplete" && <CompletionModal isSuccess={completionStatus === 'success'} password={PASSWORD_FlashSale} />}
      <div className="flex flex-col min-h-screen">
          <Header />
          <TaskBar />
          <main className="flex-grow">
            {page === 'Home' && <HomePage />}
            {page === 'Account' && <AccountPage />}
            {page === 'Promotions' && <PromotionsPage/>}
          </main>
      </div>
    </div>
  );
};

export default FlashSale;