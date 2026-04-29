import React, { useState, useMemo, useEffect } from 'react';
import { useTaskAnalytics } from "../utils/useTaskAnalytics";

// --- CONFIGURATION & STATIC DATA ---
export const TASK_ID_ReorderHistory = "ecommerce-ordering-reorderhistory";
export const PASSWORD_ReorderHistory = "HELIX";

// --- TYPES ---
interface Dish {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface Order {
  id: string;
  date: Date;
  items: Dish[];
  total: number;
}

interface ValidationState {
  navigatedToHistory: boolean;
  reorderedCorrectItem: boolean;
}

type Page = 'menu' | 'history' ;

// --- SVG ICONS ---
const HistoryIcon = ({ className }: { className: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const MenuIcon = ({ className }: { className: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" /></svg>;
const CartIcon = ({ className }: { className: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const CheckCircleIcon = ({ className }: { className: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>;


// --- MAIN COMPONENT ---
const ReorderHistory: React.FC = () => {
    const { recordSuccess } = useTaskAnalytics(TASK_ID_ReorderHistory);
    const [page, setPage] = useState<Page>('menu');
    const [cartCount, setCartCount] = useState(0);
    const [hasAttempted, setHasAttempted] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [isTaskPermanentlyCompleted, setIsTaskPermanentlyCompleted] = useState<boolean>(false);
    const [validationState, setValidationState] = useState<ValidationState>({
        navigatedToHistory: false, reorderedCorrectItem: false,
    });
    
    const { orderHistory, menuItems, targetDate, restaurantName } = useMemo(() => {
        const allDishes: Dish[] = [
            { id: 1, name: 'Pad Thai', price: 12.99, imageUrl: `https://picsum.photos/seed/padthai/400/300` },
            { id: 2, name: 'Green Curry', price: 11.50, imageUrl: `https://picsum.photos/seed/greencurry/400/300` },
            { id: 3, name: 'Tom Yum Soup', price: 8.99, imageUrl: `https://picsum.photos/seed/tomyum/400/300` },
            { id: 4, name: 'Spring Rolls', price: 6.50, imageUrl: `https://picsum.photos/seed/springrolls/400/300` },
            { id: 5, name: 'Mango Sticky Rice', price: 7.00, imageUrl: `https://picsum.photos/seed/mango/400/300` },
            { id: 6, name: 'Massaman Curry', price: 12.50, imageUrl: `https://picsum.photos/seed/massaman/400/300` },
            { id: 7, name: 'Red Curry Duck', price: 15.99, imageUrl: `https://picsum.photos/seed/redcurry/400/300` },
            { id: 8, name: 'Drunken Noodles', price: 13.50, imageUrl: `https://picsum.photos/seed/drunken/400/300` },
        ];
        
        const today = new Date();
        const dayOfWeek = today.getDay();
        const daysToSubtract = (dayOfWeek - 2 + 7) % 7;
        const lastTuesday = new Date(today);
        lastTuesday.setDate(today.getDate() - (daysToSubtract === 0 ? 7 : daysToSubtract));
        lastTuesday.setHours(0,0,0,0);
        
        const createRandomOrder = (date: Date, includeTargetDish: boolean): Order => {
            const items = [...allDishes].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 2) + 2);
            if (includeTargetDish && !items.some(d => d.id === 1)) {
                items.pop(); items.push(allDishes.find(d => d.id === 1)!);
            }
            const total = items.reduce((sum, item) => sum + item.price, 0);
            return { id: `order-${Math.random()}`, date, items, total };
        };
        
        const history: Order[] = [createRandomOrder(lastTuesday, true)];
        for (let i = 0; i < 4; i++) {
            const randomDate = new Date(lastTuesday);
            randomDate.setDate(lastTuesday.getDate() - (Math.floor(Math.random() * 20) + 1));
            history.push(createRandomOrder(randomDate, false));
        }

        const names = ['Thai Express', 'Siam Spoon', 'Bangkok Bites'];
        return {
            orderHistory: history.sort((a,b) => b.date.getTime() - a.date.getTime()),
            menuItems: allDishes.sort(() => 0.5 - Math.random()),
            targetDate: lastTuesday, restaurantName: names[Math.floor(Math.random() * names.length)],
        };
    }, []);

    const isTaskComplete = validationState.navigatedToHistory && validationState.reorderedCorrectItem;

    useEffect(() => {
        if (isTaskComplete && !isTaskPermanentlyCompleted) {
            recordSuccess();
            setIsTaskPermanentlyCompleted(true);
        }
    }, [isTaskComplete, isTaskPermanentlyCompleted, recordSuccess]);

    const handleNavigate = (targetPage: Page) => {
        setPage(targetPage);
        if (targetPage === 'history') {
            setValidationState(prev => ({ ...prev, navigatedToHistory: true }));
        }
    };
    
    const handleOrder = () => {
        setCartCount(prev => prev + 1);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500);
    }

    const handleReorder = (orderDate: Date, dish: Dish) => {
        if (!hasAttempted) {
            const isDateCorrect = orderDate.getTime() === targetDate.getTime();
            const isDishCorrect = dish.id === 1; // Pad Thai
            if (validationState.navigatedToHistory && isDateCorrect && isDishCorrect) {
                setValidationState(prev => ({...prev, reorderedCorrectItem: true}));
            }
            setHasAttempted(true);
        }
        handleOrder();
    };

    const formatDate = (date: Date) => new Intl.DateTimeFormat('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(date);
    
    return (
        <div className="bg-gray-100 min-h-screen font-sans">
            <div className="flex">
                <aside className="w-64 bg-white shadow-lg h-screen flex flex-col fixed">
                    <div className="flex items-center justify-center h-20 border-b-2 border-gray-100">
                        <h1 className="text-2xl font-bold text-orange-600">{restaurantName}</h1>
                    </div>
                    <nav className="flex-grow p-4">
                        {[
                            { id: 'menu' as Page, name: 'Menu', icon: MenuIcon },
                            { id: 'history' as Page, name: 'Order History', icon: HistoryIcon },
                        ].map(item => (
                             <a key={item.id} href="#" onClick={(e) => { e.preventDefault(); handleNavigate(item.id); }} className={`flex items-center px-4 py-3 rounded-lg transition-colors text-lg ${page === item.id ? 'bg-orange-100 text-orange-700 font-bold' : 'text-gray-600 hover:bg-gray-100'}`}>
                                <item.icon className="h-6 w-6 mr-4" />
                                <span>{item.name}</span>
                            </a>
                        ))}
                    </nav>
                </aside>

                <main className="ml-64 flex-1">
                    <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-10 flex justify-between items-center h-20 px-8">
                         {isTaskPermanentlyCompleted && (
                             <div className="bg-100 border border-300 rounded-lg px-4 py-2 text-center shadow-sm animate-fade-in">
                                <span className="text-xs font-bold text-800">Secret Password:</span>
                                <span className="ml-2 font-mono text-lg text-800 tracking-wider">{PASSWORD_ReorderHistory}</span>
                            </div>
                        )}
                        <div className="flex-grow"></div>
                        <div className="relative">
                            <CartIcon className="h-8 w-8 text-gray-700" />
                            {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full font-bold border-2 border-white">{cartCount}</span>}
                        </div>
                    </header>
                    
                    <div className="p-8">
                        {page === 'history' ? (
                            <div className="animate-fade-in">
                                <h2 className="text-4xl font-extrabold text-gray-800 mb-6">Your Past Orders</h2>
                                <div className="space-y-8">
                                    {orderHistory.map(order => (
                                        <div key={order.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                                                <div>
                                                    <h3 className="font-bold text-lg text-gray-800">Order from {formatDate(order.date)}</h3>
                                                    <p className="text-sm text-gray-500">Order ID: {order.id.substring(6, 14).toUpperCase()}</p>
                                                </div>
                                                <span className="font-bold text-xl text-gray-700">${order.total.toFixed(2)}</span>
                                            </div>
                                            <div className="p-4 divide-y divide-gray-100">
                                                {order.items.map(dish => (
                                                    <div key={dish.id} className="flex items-center justify-between py-4">
                                                        <div className="flex items-center"><img src={dish.imageUrl} alt={dish.name} className="h-16 w-16 rounded-md object-cover mr-4" />
                                                            <div><p className="font-semibold text-gray-900">{dish.name}</p><p className="text-sm text-gray-600">${dish.price.toFixed(2)}</p></div>
                                                        </div>
                                                        <button onClick={() => handleReorder(order.date, dish)} className="px-4 py-2 text-sm font-semibold text-orange-700 bg-orange-100 rounded-full hover:bg-orange-200 transition-colors">Re-order</button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                             <div className="animate-fade-in">
                                <h2 className="text-4xl font-extrabold text-gray-800 mb-6">Today's Menu</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                     {menuItems.map(dish => (
                                        <div key={dish.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                                            <img src={dish.imageUrl} alt={dish.name} className="h-48 w-full object-cover" />
                                            <div className="p-4 flex flex-col flex-grow">
                                                <h3 className="text-xl font-semibold text-gray-800 flex-grow">{dish.name}</h3>
                                                <div className="mt-4 flex justify-between items-center">
                                                    <span className="text-xl font-bold text-gray-900">${dish.price.toFixed(2)}</span>
                                                    <button onClick={handleOrder} className="px-4 py-2 bg-orange-600 text-white font-semibold rounded-full hover:bg-orange-700 transition-colors">Order</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
            {showToast && (
                <div className="fixed bottom-8 right-8 bg-gray-900 text-white px-6 py-4 rounded-lg shadow-xl animate-toast-in-out">
                    <p className="flex items-center font-semibold"><CheckCircleIcon className="h-6 w-6 mr-3 text-400" /> Item added to cart!</p>
                </div>
            )}
            <style>{`
                .animate-fade-in { animation: fadeIn 0.5s ease-in-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .animate-toast-in-out { animation: toast-in-out 2.5s ease-in-out; }
                @keyframes toast-in-out { 0% { opacity: 0; transform: translateY(20px); } 10% { opacity: 1; transform: translateY(0); } 90% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; transform: translateY(20px); } }
            `}</style>
        </div>
    );
};

export default ReorderHistory;