import React, { useState, useMemo, useEffect } from 'react';
import { useTaskAnalytics } from "../utils/useTaskAnalytics";

// --- CONFIGURATION & STATIC DATA ---
export const TASK_ID_PizzaCustomization = "ecommerce-ordering-pizzacustomization";
export const PASSWORD_PizzaCustomization = "ORBIT";

// --- TYPES ---
interface Pizza {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  defaultToppings: string[];
  imageUrl: string;
}

interface Customization {
  pizza: Pizza;
  crust: string;
  toppings: Set<string>;
  price: number;
}

interface ValidationState {
  correctPizzaSelected: boolean;
  pepperoniRemoved: boolean;
  mushroomsAdded: boolean;
  onionsAdded: boolean;
  crustCorrect: boolean;
}

// --- SVG ICONS ---
const CartIcon = ({ className }: { className: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const PizzaIcon = ({ className }: { className: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM6.33 5.043a5.96 5.96 0 017.34 0 5.955 5.955 0 012.235 4.514 8.06 8.06 0 00-1.02-.323 1 1 0 00-.82.12l-1.954 1.303a1 1 0 01-1.175 0l-1.955-1.303a1 1 0 00-.819-.12 8.06 8.06 0 00-1.02.323A5.955 5.955 0 016.33 5.043zM4.032 9.252a9.55 9.55 0 00-.235-.43 5.95 5.95 0 01-.133-4.243 6.03 6.03 0 01.986-1.632A7.967 7.967 0 002 10c0 .54.053 1.07.152 1.585a1 1 0 00.819.819 8.03 8.03 0 004.055.595 1 1 0 00.8-.4l1.954-2.606a1 1 0 011.2-.4l1.954 1.303a1 1 0 00.947 0l1.955-1.303a1 1 0 011.2.4l1.954 2.606a1 1 0 00.8.4 8.03 8.03 0 004.055-.595 1 1 0 00.819-.819A7.967 7.967 0 0018 10a7.967 7.967 0 00-2.6-5.553 6.03 6.03 0 01.986 1.632 5.95 5.95 0 01-.133 4.243 9.55 9.55 0 00-.235.43 1 1 0 000 .996 9.55 9.55 0 00.235.43 5.95 5.95 0 01.133 4.243 6.03 6.03 0 01-.986 1.632A7.967 7.967 0 0018 10a7.967 7.967 0 00-.152-1.585 1 1 0 00-.819-.819 8.03 8.03 0 00-4.055-.595 1 1 0 00-.8.4l-1.954-2.606a1 1 0 01-1.2-.4L8.27 6.299a1 1 0 00-.947 0L5.368 7.602a1 1 0 01-1.2-.4l-1.954 2.606a1 1 0 00-.8.4 8.03 8.03 0 00-4.055.595 1 1 0 00-.819.819A7.967 7.967 0 002 10a7.967 7.967 0 002.032 5.248 6.03 6.03 0 01-.986-1.632 5.95 5.95 0 01.133-4.243 9.55 9.55 0 00.235-.43 1 1 0 000-.996z" /></svg>;
const CheckCircleIcon = ({ className }: { className: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>;

// --- MAIN COMPONENT ---
const PizzaCustomization: React.FC = () => {
    const { recordSuccess } = useTaskAnalytics(TASK_ID_PizzaCustomization);
    const [cart, setCart] = useState<Customization[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);
    const [customToppings, setCustomToppings] = useState<Set<string>>(new Set());
    const [customCrust, setCustomCrust] = useState<string>('');
    const [hasAttempted, setHasAttempted] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isTaskPermanentlyCompleted, setIsTaskPermanentlyCompleted] = useState<boolean>(false);
    const [validationState, setValidationState] = useState<ValidationState>({
        correctPizzaSelected: false, pepperoniRemoved: false, mushroomsAdded: false, onionsAdded: false, crustCorrect: false,
    });

    const { menu, allToppings, allCrusts, restaurantName } = useMemo(() => {
        const baseMenu: Pizza[] = [
            { id: 1, name: 'Large Pepperoni Pizza', description: 'Classic pepperoni on our signature tomato sauce.', basePrice: 15.99, defaultToppings: ['Pepperoni', 'Cheese'], imageUrl: 'https://picsum.photos/seed/pepperoni/400/300' },
            { id: 2, name: 'Medium Veggie Supreme', description: 'A garden of fresh vegetables.', basePrice: 14.50, defaultToppings: ['Mushrooms', 'Onions', 'Bell Peppers', 'Olives'], imageUrl: 'https://picsum.photos/seed/veggie/400/300' },
            { id: 3, name: 'Large Meat Lover\'s', description: 'For the carnivore in you.', basePrice: 18.99, defaultToppings: ['Pepperoni', 'Sausage', 'Bacon'], imageUrl: 'https://picsum.photos/seed/meat/400/300' },
            { id: 4, name: 'Personal Cheese Pizza', description: 'Simple and delicious.', basePrice: 9.99, defaultToppings: ['Cheese'], imageUrl: 'https://picsum.photos/seed/cheese/400/300' },
            { id: 5, name: 'Large Hawaiian Paradise', description: 'A tropical delight of sweet pineapple and savory ham.', basePrice: 17.50, defaultToppings: ['Ham', 'Pineapple', 'Cheese'], imageUrl: 'https://picsum.photos/seed/hawaiian/400/300' },
            { id: 6, name: 'Medium BBQ Chicken', description: 'Tangy BBQ sauce, grilled chicken, and red onions.', basePrice: 16.50, defaultToppings: ['Chicken', 'Onions', 'BBQ Sauce', 'Cheese'], imageUrl: 'https://picsum.photos/seed/bbqchicken/400/300' },
            { id: 7, name: 'Large Margherita Classico', description: 'Fresh mozzarella, ripe tomatoes, and aromatic basil.', basePrice: 16.99, defaultToppings: ['Tomatoes', 'Basil', 'Fresh Mozzarella'], imageUrl: 'https://picsum.photos/seed/margherita/400/300' },
            { id: 8, name: 'Large Buffalo Ranch Chicken', description: 'Spicy buffalo chicken cooled with a creamy ranch drizzle.', basePrice: 19.50, defaultToppings: ['Chicken', 'Buffalo Sauce', 'Ranch', 'Cheese'], imageUrl: 'https://picsum.photos/seed/buffalo/400/300' },
        ];
        const toppings = ['Pepperoni', 'Mushrooms', 'Onions', 'Sausage', 'Bacon', 'Bell Peppers', 'Olives', 'Extra Cheese', 'Ham', 'Pineapple'];
        const crusts = ['Hand-Tossed', 'Thin Crust', 'Stuffed Crust', 'Gluten-Free'];
        const names = ['Slice of Heaven', 'Pizza Planet', 'The Dough Factory', 'Crust & Co.'];

        return {
            menu: [...baseMenu].sort(() => Math.random() - 0.5), allToppings: [...toppings].sort(() => Math.random() - 0.5),
            allCrusts: [...crusts].sort(() => Math.random() - 0.5), restaurantName: names[Math.floor(Math.random() * names.length)],
        };
    }, []);
    
    const isTaskComplete = Object.values(validationState).every(Boolean);

    useEffect(() => {
        if (isTaskComplete && !isTaskPermanentlyCompleted) {
            recordSuccess();
            setIsTaskPermanentlyCompleted(true);
        }
    }, [isTaskComplete, isTaskPermanentlyCompleted, recordSuccess]);

    const handleOpenModal = (pizza: Pizza) => {
        setSelectedPizza(pizza);
        setCustomToppings(new Set(pizza.defaultToppings));
        setCustomCrust(allCrusts[0]);
        setIsModalOpen(true);
    };

    const handleToggleTopping = (topping: string) => {
        setCustomToppings(prev => {
            const newToppings = new Set(prev);
            if (newToppings.has(topping)) newToppings.delete(topping); else newToppings.add(topping);
            return newToppings;
        });
    };
    
    const handleAddToCart = () => {
        if (!selectedPizza) return;
        if (!hasAttempted) {
            setValidationState({
                correctPizzaSelected: selectedPizza.id === 1,
                pepperoniRemoved: !customToppings.has('Pepperoni'),
                mushroomsAdded: customToppings.has('Mushrooms'),
                onionsAdded: customToppings.has('Onions'),
                crustCorrect: customCrust === 'Thin Crust',
            });
            setHasAttempted(true);
        }
        
        setCart(prev => [...prev, {
            pizza: selectedPizza, crust: customCrust, toppings: customToppings,
            price: selectedPizza.basePrice + (customToppings.size - selectedPizza.defaultToppings.length) * 1.50,
        }]);
        setIsModalOpen(false);
        setShowConfirmation(true);
        setTimeout(() => setShowConfirmation(false), 2500);
    };

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            <header className="bg-white shadow-md sticky top-0 z-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
                    <div className="flex items-center space-x-2">
                        <PizzaIcon className="h-8 w-8 text-red-600" />
                        <h1 className="text-2xl font-bold text-gray-800">{restaurantName}</h1>
                    </div>
                    <div className="relative">
                        <CartIcon className="h-8 w-8 text-gray-600" />
                        {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{cart.length}</span>}
                    </div>
                </div>
            </header>

            {isTaskPermanentlyCompleted && (
                <div className="bg-green-600 text-white py-4 shadow-lg animate-fade-in">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p className="font-bold text-lg">
                            Task Complete! Secret Password: <span className="font-mono bg-green-700 px-2 py-1 rounded-md">{PASSWORD_PizzaCustomization}</span>
                        </p>
                    </div>
                </div>
            )}

            <section className="relative h-96 bg-cover bg-center" style={{backgroundImage: `url(https://picsum.photos/seed/${useMemo(() => Math.random(), [])}/1200/400)`}}>
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center text-white p-4">
                        <h2 className="text-5xl font-extrabold">The Best Pizza in Town</h2>
                        <p className="mt-4 text-xl">Hand-crafted with the freshest ingredients, delivered to your door.</p>
                    </div>
                </div>
            </section>

            <section className="bg-white py-16">
                 <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-800">Why Choose Us?</h2>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-4">
                            <h3 className="text-xl font-semibold">Fresh Ingredients</h3>
                            <p className="mt-2 text-gray-600">We source local, high-quality ingredients for the best taste.</p>
                        </div>
                        <div className="p-4">
                             <h3 className="text-xl font-semibold">Fast Delivery</h3>
                            <p className="mt-2 text-gray-600">Our expert drivers get your hot pizza to you in record time.</p>
                        </div>
                        <div className="p-4">
                            <h3 className="text-xl font-semibold">Fully Customizable</h3>
                            <p className="mt-2 text-gray-600">Build your perfect pizza with our wide range of toppings and crusts.</p>
                        </div>
                    </div>
                </div>
            </section>

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h2 id="menu" className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Our Menu</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {menu.map(pizza => (
                        <div key={pizza.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transform hover:-translate-y-1 transition-transform duration-300">
                            <img src={pizza.imageUrl} alt={pizza.name} className="h-48 w-full object-cover" />
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-semibold text-gray-800">{pizza.name}</h3>
                                <p className="text-gray-600 mt-2 flex-grow">{pizza.description}</p>
                                <div className="mt-4 flex justify-between items-center">
                                    <span className="text-2xl font-bold text-gray-900">${pizza.basePrice.toFixed(2)}</span>
                                    <button onClick={() => handleOpenModal(pizza)} className="px-4 py-2 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-colors">Customize</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <footer className="bg-gray-800 text-white mt-16">
                <div className="container mx-auto px-6 py-8 text-center">
                    <p>© {new Date().getFullYear()} {restaurantName}. All Rights Reserved.</p>
                </div>
            </footer>
            
            {isModalOpen && selectedPizza && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in-fast">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                        <div className="p-6 border-b"><h2 className="text-2xl font-bold text-gray-900">Customize: {selectedPizza.name}</h2></div>
                        <div className="p-6 overflow-y-auto space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Crust</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {allCrusts.map(crust => (
                                        <label key={crust} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${customCrust === crust ? 'border-red-500 ring-2 ring-red-500' : 'border-gray-300'}`}>
                                            <input type="radio" name="crust" value={crust} checked={customCrust === crust} onChange={() => setCustomCrust(crust)} className="h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500" />
                                            <span className="ml-3 text-gray-700">{crust}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                             <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Toppings</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {allToppings.map(topping => (
                                        <label key={topping} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${customToppings.has(topping) ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}>
                                            <input type="checkbox" checked={customToppings.has(topping)} onChange={() => handleToggleTopping(topping)} className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500" />
                                            <span className="ml-3 text-gray-700">{topping}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center rounded-b-xl border-t">
                            <span className="text-xl font-bold text-gray-900">Total: ${ (selectedPizza.basePrice + (customToppings.size - selectedPizza.defaultToppings.length) * 1.50).toFixed(2) }</span>
                            <div className="space-x-3">
                                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-full text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 font-semibold">Cancel</button>
                                <button onClick={handleAddToCart} className="px-6 py-2 rounded-full text-white bg-red-600 hover:bg-red-700 font-semibold">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showConfirmation && (
                <div className="fixed bottom-5 right-5 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-xl animate-fade-in-out">
                    <p className="flex items-center"><CheckCircleIcon className="h-5 w-5 mr-2 text-green-400" /> Item added to cart!</p>
                </div>
            )}
             <style>{`
                .animate-fade-in-fast, .animate-fade-in { animation: fadeIn 0.5s ease-out; }
                .animate-fade-in-out { animation: fadeInOut 2.5s ease-in-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes fadeInOut { 0% { opacity: 0; transform: translateY(10px); } 10% { opacity: 1; transform: translateY(0); } 90% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; transform: translateY(10px); } }
            `}</style>
        </div>
    );
};

export default PizzaCustomization;