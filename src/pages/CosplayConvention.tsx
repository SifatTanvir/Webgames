import React, { useState, useMemo, useEffect } from 'react';

export const TASK_ID_CosplayConvention = "enternainment-cosplay-convention";
export const PASSWORD_CosplayConvention = "PLANNER-ALPH-A789";

interface Destination {
  name: string;
  description: string;
}

interface Activity {
  id: string;
  name: string;
  description: string;
}

interface PackingItem {
  id: string;
  name: string;
  imageUrl: string;
}

type Page = 'start' | 'dashboard' | 'schedule' | 'budget' | 'packing' | 'summary';

const MAX_BUDGET = 150;
const MAX_ACTIVITIES = 3;
const MAX_PACKING_ITEMS = 3;


const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 3.817 1.48-8.279-6.064-5.828 8.332-1.151z"/>
  </svg>
);

const CosplayConvention: React.FC = () => {
  const [page, setPage] = useState<Page>('start');
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [selectedActivities, setSelectedActivities] = useState<Set<string>>(new Set());
  const [budget, setBudget] = useState<{ transportation: number; hotel: number; meals: number }>({ transportation: 0, hotel: 0, meals: 0 });
  const [packedItems, setPackedItems] = useState<Set<string>>(new Set());
  const [, setIsFinalized] = useState(false);

  const [validationState, setValidationState] = useState({
    destinationCorrect: false,
    activitiesCorrect: false,
    budgetCorrect: false,
    packingCorrect: false,
  });

  const { destinations, activities, budgetOptions, packingItems } = useMemo(() => {
    const allDestinations: Destination[] = [
      { name: 'NeoCon 2025', description: 'The premier futuristic cosplay convention.' },
      { name: 'Fantasy Faire', description: 'A medieval-themed gathering of knights and mages.' },
      { name: 'Starbound Summit', description: 'Explore the cosmos with fellow space enthusiasts.' },
    ];

    const allActivities: Activity[] = [
      { id: 'foam-armor', name: 'Foam Armor Workshop', description: 'Learn to craft durable cosplay armor.' },
      { id: 'cosplay-parade', name: 'Cosplay Parade', description: 'Showcase your creations on the main stage.' },
      { id: 'voice-actors', name: 'Meet the Voice Actors', description: 'Q&A session with industry legends.' },
      { id: 'prop-making', name: 'Advanced Prop Making', description: 'Techniques for realistic prop creation.' },
      { id: 'photo-shoot', name: 'Professional Photo Shoot', description: 'Capture your best cosplay moments.' },
    ];

    const allBudgetOptions = {
      transportation: [
        { name: 'Bus', cost: 20 },
        { name: 'Train', cost: 40 },
        { name: 'Flight', cost: 80 },
      ],
      hotel: [
        { name: 'Budget Inn', cost: 50 },
        { name: 'Mid-Range Hotel', cost: 80 },
        { name: 'Luxury Suite', cost: 120 },
      ],
      meals: [
        { name: 'Food Court', cost: 30 },
        { name: 'Restaurant Dining', cost: 60 },
        { name: 'Gourmet Experience', cost: 90 },
      ],
    };

    const allPackingItems: PackingItem[] = [
      { id: 'wig-glue', name: 'Wig Glue', imageUrl: 'https://placehold.co/50x50/FFD700/000?text=WG' },
      { id: 'prop-repair', name: 'Prop Repair Kit', imageUrl: 'https://placehold.co/50x50/C0C0C0/000?text=PR' },
      { id: 'shoes', name: 'Comfortable Shoes', imageUrl: 'https://placehold.co/50x50/8B4513/FFF?text=CS' },
      { id: 'sewing-kit', name: 'Mini Sewing Kit', imageUrl: 'https://placehold.co/50x50/ADD8E6/000?text=SK' },
      { id: 'makeup', name: 'Special FX Makeup', imageUrl: 'https://placehold.co/50x50/FF69B4/000?text=MU' },
    ];
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const shuffle = (array: any[]) => [...array].sort(() => Math.random() - 0.5);

    return {
      destinations: shuffle(allDestinations),
      activities: shuffle(allActivities),
      budgetOptions: {
        transportation: shuffle(allBudgetOptions.transportation),
        hotel: shuffle(allBudgetOptions.hotel),
        meals: shuffle(allBudgetOptions.meals),
      },
      packingItems: shuffle(allPackingItems),
    };
  }, []);

  useEffect(() => {
    setValidationState(prevVal => ({
      ...prevVal,
      destinationCorrect: selectedDestination === 'NeoCon 2025',
    }));
  }, [selectedDestination]);

  useEffect(() => {
    const requiredActivities = new Set(["Foam Armor Workshop", "Cosplay Parade", "Meet the Voice Actors"]);
    const allRequiredSelected = [...requiredActivities].every(activity => selectedActivities.has(activity));
    setValidationState(prevVal => ({
      ...prevVal,
      activitiesCorrect: allRequiredSelected && selectedActivities.size === 3,
    }));
  }, [selectedActivities]);

  useEffect(() => {
    const currentTotalBudget = budget.transportation + budget.hotel + budget.meals;
    setValidationState(prevVal => ({
      ...prevVal,
      budgetCorrect: currentTotalBudget <= MAX_BUDGET,
    }));
  }, [budget]);

  useEffect(() => {
    const requiredPackingItems = new Set(["Wig Glue", "Prop Repair Kit", "Comfortable Shoes"]);
    const allRequiredPacked = [...requiredPackingItems].every(item => packedItems.has(item));
    setValidationState(prevVal => ({
      ...prevVal,
      packingCorrect: allRequiredPacked && packedItems.size === 3,
    }));
  }, [packedItems]);

  const handleStartPlanning = () => {
    setPage('dashboard');
  };

  const handleSelectDestination = (destinationName: string) => {
    setSelectedDestination(destinationName);
    setPage('schedule');
  };

  const handleToggleActivity = (activityName: string) => {
    setSelectedActivities(prev => {
      const newSet = new Set(prev);
      if (newSet.has(activityName)) {
        newSet.delete(activityName);
      } else if (newSet.size < MAX_ACTIVITIES) { 
        newSet.add(activityName);
      }
      return newSet;
    });
  };

  const handleBudgetChange = (category: 'transportation' | 'hotel' | 'meals', cost: number) => {
    setBudget(prev => ({
      ...prev,
      [category]: cost,
    }));
  };
  
  const handleTogglePackingItem = (itemName: string) => {
    setPackedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemName)) {
        newSet.delete(itemName);
      } else if (newSet.size < MAX_PACKING_ITEMS) {
        newSet.add(itemName);
      }
      return newSet;
    });
  };

  const handleFinalizeTrip = () => {
    setIsFinalized(true);
    setPage('summary');
  };

  const isTaskSuccessful = useMemo(() => {
    return (
      validationState.destinationCorrect &&
      validationState.activitiesCorrect &&
      validationState.budgetCorrect &&
      validationState.packingCorrect
    );
  }, [validationState]);

  // New memoized values for button disabling
  const canProceedToBudget = selectedActivities.size > 0;
  const canProceedToPacking = budget.transportation > 0 && budget.hotel > 0 && budget.meals > 0;
  const canFinalizeTrip = packedItems.size > 0;


  const renderPage = () => {
    const currentBudgetTotal = budget.transportation + budget.hotel + budget.meals;

    return (
      <div className="min-h-screen bg-[#1A1A2E] font-inter text-[#E0E0E0] p-4 flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2A2A4A] to-[#1A1A2E]">
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Roboto+Mono:wght@400;700&family=Inter:wght@400;700&display=swap');
            .font-orbitron { font-family: 'Orbitron', sans-serif; }
            .font-roboto-mono { font-family: 'Roboto Mono', monospace; }
            .font-inter { font-family: 'Inter', sans-serif; }
            .animate-fade-in { animation: fadeIn 0.5s ease-in-out; }
            @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            .spotlight { position: relative; animation: reveal 2s ease-out forwards; }
            @keyframes reveal {
              0% { filter: brightness(0) blur(20px); transform: scale(1.2); }
              30% { filter: brightness(1) blur(10px); }
              100% { filter: brightness(1) blur(0); transform: scale(1); }
            }
            .animate-pulse-slow { animation: pulseSlow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
            @keyframes pulseSlow {
              0%, 100% { opacity: 0.9; box-shadow: 0 0 0 0 rgba(191, 0, 255, 0.5); } /* Fuchsia pulse */
              50% { opacity: 1; box-shadow: 0 0 20px 10px rgba(191, 0, 255, 0); }
            }
          `}
        </style>
        
        <div className="flex flex-col items-center justify-center w-full h-full">
          {page === 'start' && (
            <div className="text-center">
              <h1 className="text-5xl font-bold font-orbitron text-[#E0E0E0] mb-2 drop-shadow-[0_2px_2px_rgba(0,255,255,0.5)]">Convention Weekend Planner</h1>
              <p className="text-[#00FFFF] text-lg mb-8">Plan your ultimate cosplay adventure!</p>
              <button onClick={handleStartPlanning} className="px-8 py-3 bg-[#00FFFF] text-[#1A1A2E] font-bold rounded-full shadow-lg shadow-[#00FFFF]/30 hover:bg-[#00E0E0] hover:scale-105 transition-all duration-300">Start Planning</button>
            </div>
          )}

          {page === 'dashboard' && (
            <div className="w-full max-w-5xl animate-fade-in text-center">
              <h2 className="text-3xl font-bold font-orbitron text-[#E0E0E0] mb-8">Select Your Convention Destination</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {destinations.map(dest => (
                  <div key={dest.name} onClick={() => handleSelectDestination(dest.name)} className="bg-[#2A2A4A]/50 backdrop-blur-sm rounded-lg p-6 cursor-pointer group transition-all duration-300 hover:shadow-[#00FFFF]/40 hover:shadow-lg hover:scale-105 border border-[#BF00FF]">
                    <h3 className="text-xl font-bold font-orbitron text-[#E0E0E0] group-hover:text-[#00FFFF] mb-2">{dest.name}</h3>
                    <p className="text-sm text-[#E0E0E0]">{dest.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {page === 'schedule' && (
            <div className="w-full max-w-5xl animate-fade-in">
              <h2 className="text-3xl font-bold font-orbitron text-center text-[#E0E0E0] mb-8">Plan Your Schedule ({selectedActivities.size}/{MAX_ACTIVITIES})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activities.map(activity => {
                  const isSelected = selectedActivities.has(activity.name);
                  const isFull = selectedActivities.size >= MAX_ACTIVITIES;
                  const isDisabled = isFull && !isSelected;
                  
                  return (
                    <button 
                      key={activity.id} 
                      onClick={() => handleToggleActivity(activity.name)} 
                      disabled={isDisabled}
                      className={`w-full text-left p-4 rounded-md flex flex-col transition-all relative 
                        ${isSelected ? 'bg-[#00FFFF]/20' : 'bg-[#2A2A4A]/80 hover:bg-[#3A3A5A]/80'}
                        ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {isSelected && <StarIcon className="absolute right-2 top-2 h-6 w-6 text-[#00FFFF]" />}
                      <h3 className="text-lg font-bold font-inter text-[#E0E0E0] mb-1">{activity.name}</h3>
                      <p className="text-sm font-inter text-[#E0E0E0]">{activity.description}</p>
                    </button>
                  );
                })}
              </div>
              <div className="mt-8 text-center">
                <button 
                  onClick={() => setPage('budget')} 
                  disabled={!canProceedToBudget} // Disabled until at least one activity is selected
                  className={`px-8 py-3 font-bold rounded-full shadow-lg transition-all duration-300 
                    ${canProceedToBudget ? 'bg-[#BF00FF] text-[#E0E0E0] shadow-[#BF00FF]/30 hover:bg-[#A000D0] hover:scale-105' : 'bg-gray-600 text-gray-300 cursor-not-allowed'}`}
                >
                  Next: Manage Budget
                </button>
              </div>
            </div>
          )}

          {page === 'budget' && (
            <div className="w-full max-w-5xl animate-fade-in">
              <h2 className="text-3xl font-bold font-orbitron text-center text-[#E0E0E0] mb-8">Manage Your Budget (Total: ${currentBudgetTotal}/{MAX_BUDGET})</h2>
              {!validationState.budgetCorrect && currentBudgetTotal > MAX_BUDGET && (
                <p className="text-[#FF007F] text-center mb-4">Budget exceeded! Please adjust your choices.</p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.keys(budgetOptions).map(categoryKey => {
                  const category = categoryKey as keyof typeof budgetOptions;
                  return (
                    <div key={category} className="bg-[#2A2A4A]/50 backdrop-blur-sm rounded-lg p-6 border border-[#BF00FF]">
                      <h3 className="text-xl font-bold font-orbitron text-[#E0E0E0] mb-4 capitalize">{category}</h3>
                      {budgetOptions[category].map(option => (
                        <button key={option.name} onClick={() => handleBudgetChange(category, option.cost)} className={`w-full text-left p-2 rounded-md flex justify-between items-center transition-colors mb-2 ${budget[category] === option.cost ? 'bg-[#BF00FF]/20' : 'hover:bg-[#3A3A5A]/80'}`}>
                          <span className="text-[#E0E0E0] font-inter">{option.name}</span>
                          <span className="text-[#00FFFF] font-inter">${option.cost}</span>
                        </button>
                      ))}
                    </div>
                  );
                })}
              </div>
              <div className="mt-8 text-center">
                <button 
                  onClick={() => setPage('packing')} 
                  disabled={!canProceedToPacking} // Disabled until all budget categories have a selection
                  className={`px-8 py-3 font-bold rounded-full shadow-lg transition-all duration-300 
                    ${canProceedToPacking ? 'bg-[#00FFFF] text-[#1A1A2E] shadow-[#00FFFF]/30 hover:bg-[#00E0E0] hover:scale-105' : 'bg-gray-600 text-gray-300 cursor-not-allowed'}`}
                >
                  Next: Pack Essentials
                </button>
              </div>
            </div>
          )}

          {page === 'packing' && (
            <div className="w-full max-w-5xl animate-fade-in">
              <h2 className="text-3xl font-bold font-orbitron text-center text-[#E0E0E0] mb-8">Pack Your Essentials ({packedItems.size}/{MAX_PACKING_ITEMS})</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {packingItems.map(item => {
                  const isSelected = packedItems.has(item.name);
                  const isFull = packedItems.size >= MAX_PACKING_ITEMS;
                  const isDisabled = isFull && !isSelected;

                  return (
                    <button 
                      key={item.id} 
                      onClick={() => handleTogglePackingItem(item.name)} 
                      disabled={isDisabled}
                      className={`flex flex-col items-center p-3 rounded-md transition-all 
                        ${isSelected ? 'bg-[#BF00FF]/20' : 'bg-[#2A2A4A]/80 hover:bg-[#3A3A5A]/80'}
                        ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <img src={item.imageUrl} alt={item.name} className="w-12 h-12 mb-2 rounded-full object-cover" />
                      <span className="text-[#E0E0E0] text-center text-sm font-inter">{item.name}</span>
                      {isSelected && <StarIcon className="h-5 w-5 text-[#00FFFF] mt-1" />}
                    </button>
                  );
                })}
              </div>
              <div className="mt-8 text-center">
                <button 
                  onClick={handleFinalizeTrip} 
                  disabled={!canFinalizeTrip} // Disabled until at least one packing item is selected
                  className={`px-8 py-3 font-bold rounded-full shadow-lg transition-all duration-300 
                    ${canFinalizeTrip ? 'bg-[#BF00FF] text-[#E0E0E0] shadow-[#BF00FF]/30 hover:bg-[#A000D0] hover:scale-105' : 'bg-gray-600 text-gray-300 cursor-not-allowed'}`}
                >
                  Finalize Trip
                </button>
              </div>
            </div>
          )}

          {page === 'summary' && (
            <div className="text-center animate-fade-in flex flex-col items-center">
              <div className="spotlight">
                <h1 className="text-5xl font-bold font-orbitron text-[#E0E0E0] mb-2 drop-shadow-[0_2px_2px_rgba(0,255,255,0.5)]">Trip Summary!</h1>
                <p className="text-[#00FFFF] text-lg mb-8">Your convention weekend is all set.</p>
              </div>
              {isTaskSuccessful && (
                <div className="mt-8 bg-[#2A2A4A]/80 p-6 rounded-lg border border-[#00FFFF] animate-pulse-slow w-full max-w-md">
                    <p className="text-[#00FFFF] text-lg font-semibold font-orbitron">CONFIRMATION CODE:</p>
                    <p className="text-4xl font-roboto-mono text-[#E0E0E0] tracking-[0.2em] mt-2">{PASSWORD_CosplayConvention}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return renderPage();
};

export default CosplayConvention;
