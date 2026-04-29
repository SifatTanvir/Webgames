import React, { useState, useMemo, useEffect } from 'react';
import { useTaskAnalytics } from "../utils/useTaskAnalytics";

// --- CONFIGURATION & STATIC DATA ---
export const TASK_ID_PropertyComparison = "ecommerce-comparison-propertycomparison";
export const PASSWORD_PropertyComparison = "SPECTRA";


// --- TYPES ---
interface Property {
  id: number;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  imageUrl: string;
}

interface ValidationState {
  selectedMaple: boolean;
  selectedBirch: boolean;
  onlyTwoSelected: boolean;
}

type PageState = 'list' | 'compare';

// --- SVG ICONS ---
const BedIcon = ({ className }: { className: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>;
const BathIcon = ({ className }: { className: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;
const RulerIcon = ({ className }: { className: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5" /></svg>;
const CheckIcon = ({ className }: { className: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>;
const BalanceIcon = ({ className }: { className: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>;


// --- MAIN COMPONENT ---
const PropertyComparison: React.FC = () => {
    const { recordSuccess } = useTaskAnalytics(TASK_ID_PropertyComparison);
    const [page, setPage] = useState<PageState>('list');
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
    const [hasAttempted, setHasAttempted] = useState(false);
    const [validationState, setValidationState] = useState<ValidationState>({
        selectedMaple: false, selectedBirch: false, onlyTwoSelected: false,
    });
    const [isTaskPermanentlyCompleted, setIsTaskPermanentlyCompleted] = useState<boolean>(false);

    const { propertyList, targetIds } = useMemo(() => {
        const createRandomProperty = (id: number, address?: string): Property => ({
            id, address: address || `${100 + Math.floor(Math.random() * 899)} ${['Oak', 'Pine', 'Elm', 'Cedar'][id%4]} Ave`,
            price: 350000 + Math.floor(Math.random() * 500000), bedrooms: Math.floor(Math.random() * 3) + 2,
            bathrooms: Math.floor(Math.random() * 2) + 2, sqft: 1200 + Math.floor(Math.random() * 1800),
            imageUrl: `https://picsum.photos/seed/prop${id}/500/300`
        });
        
        const targetMapleId = 1; const targetBirchId = 2;
        const list: Property[] = [
            createRandomProperty(targetMapleId, "111 Maple St"), createRandomProperty(targetBirchId, "222 Birch Rd"),
            ...Array.from({ length: 6 }, (_, i) => createRandomProperty(i + 3))
        ];
        return {
            propertyList: [...list].sort(() => Math.random() - 0.5),
            targetIds: { maple: targetMapleId, birch: targetBirchId },
        };
    }, []);

    const isTaskComplete = Object.values(validationState).every(Boolean);

    useEffect(() => {
        if (isTaskComplete && !isTaskPermanentlyCompleted) {
            recordSuccess();
            setIsTaskPermanentlyCompleted(true);
        }
    }, [isTaskComplete, isTaskPermanentlyCompleted, recordSuccess]);
    
    const handleSelect = (id: number) => {
        setSelectedIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) newSet.delete(id);
            else newSet.add(id);
            return newSet;
        });
    };
    
    const handleCompare = () => {
        if (!hasAttempted) {
            const hasMaple = selectedIds.has(targetIds.maple);
            const hasBirch = selectedIds.has(targetIds.birch);
            const isSizeCorrect = selectedIds.size === 2;
            setValidationState({ selectedMaple: hasMaple, selectedBirch: hasBirch, onlyTwoSelected: isSizeCorrect });
            setHasAttempted(true);
        }
        setPage('compare');
    };

    const selectedProperties = propertyList.filter(p => selectedIds.has(p.id));
    
    const renderList = () => (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {propertyList.map(prop => (
                    <div key={prop.id} className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ${selectedIds.has(prop.id) ? 'ring-4 ring-blue-500 scale-105' : 'hover:shadow-xl'}`}>
                        <img src={prop.imageUrl} alt={prop.address} className="h-56 w-full object-cover" />
                        <div className="p-4">
                            <p className="text-2xl font-bold text-gray-900">${prop.price.toLocaleString()}</p>
                            <p className="font-semibold text-gray-700 mt-1 h-12">{prop.address}</p>
                            <div className="mt-4 flex justify-around text-gray-600 border-t pt-3">
                                <span className="flex items-center text-sm"><BedIcon className="h-5 w-5 mr-1.5"/> {prop.bedrooms} beds</span>
                                <span className="flex items-center text-sm"><BathIcon className="h-5 w-5 mr-1.5"/> {prop.bathrooms} baths</span>
                                <span className="flex items-center text-sm"><RulerIcon className="h-5 w-5 mr-1.5"/> {prop.sqft} sqft</span>
                            </div>
                        </div>
                        <label className="block bg-gray-50 p-4 cursor-pointer hover:bg-gray-100 border-t">
                            <div className="flex items-center">
                                <input type="checkbox" checked={selectedIds.has(prop.id)} onChange={() => handleSelect(prop.id)} className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                <span className="ml-3 font-semibold text-gray-700">Select for comparison</span>
                            </div>
                        </label>
                    </div>
                ))}
            </div>
            <div className="sticky bottom-0 left-0 right-0 p-4 mt-8">
                 <div className={`container mx-auto bg-gray-800/90 backdrop-blur-sm text-white rounded-xl shadow-2xl p-4 flex justify-between items-center transition-all duration-500 transform ${selectedIds.size > 0 ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                    <p className="font-bold text-lg">{selectedIds.size} {selectedIds.size === 1 ? 'property' : 'properties'} selected</p>
                    <button onClick={handleCompare} disabled={selectedIds.size < 2} className="px-8 py-3 bg-blue-600 font-bold rounded-lg hover:bg-blue-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors">
                        Compare
                    </button>
                </div>
            </div>
        </>
    );
    
    const renderComparison = () => (
         <div className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedProperties.map(prop => (
                    <div key={prop.id} className="bg-white rounded-xl shadow-lg">
                        <img src={prop.imageUrl} alt={prop.address} className="h-56 w-full object-cover rounded-t-xl" />
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-800 h-14">{prop.address}</h3>
                            <div className="space-y-3 mt-4">
                                <div className="flex justify-between border-b pb-2"><span className="text-gray-500">Price</span><span className="font-bold text-gray-900">${prop.price.toLocaleString()}</span></div>
                                <div className="flex justify-between border-b pb-2"><span className="text-gray-500">Bedrooms</span><span className="font-bold text-gray-900">{prop.bedrooms}</span></div>
                                <div className="flex justify-between border-b pb-2"><span className="text-gray-500">Bathrooms</span><span className="font-bold text-gray-900">{prop.bathrooms}</span></div>
                                <div className="flex justify-between"><span className="text-gray-500">Sq. Ft.</span><span className="font-bold text-gray-900">{prop.sqft}</span></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
    
    return (
        <div className="bg-gray-100 min-h-screen font-sans">
            <header className="bg-white border-b py-5">
                <div className="container mx-auto px-6 flex items-center space-x-3">
                    <BalanceIcon className="h-8 w-8 text-blue-600" />
                    <h1 className="text-3xl font-bold text-gray-800">PropertyCompare</h1>
                </div>
            </header>
            <main className="container mx-auto p-6">
                {isTaskPermanentlyCompleted && (
                    <div className="mt-10 bg-50 text-center p-8 rounded-xl border-2 border-dashed border-300 animate-fade-in">
                        <CheckIcon className="h-12 w-12 mx-auto text-500"/>
                        <p className="mt-2 text-600">Secret Password:</p>
                        <p className="mt-2 text-4xl font-mono text-600 tracking-widest">{PASSWORD_PropertyComparison}</p>
                    </div>
                )} <br />
                {page === 'list' ? renderList() : 
                (
                    <div>
                        <button onClick={() => setPage('list')} className="mb-8 px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-gray-700 hover:bg-gray-50">
                            ← Back to List
                        </button>
                        {renderComparison()}
                    </div>
                )}
                
            </main>
             <style>{`.animate-fade-in { animation: fadeIn 0.5s ease; } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
        </div>
    );
};

export default PropertyComparison;