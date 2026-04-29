import React, { useState, useEffect } from 'react';


export const TASK_ID_CountryCapital = "elearning-knowladge-findcapital";
export const PASSWORD_CountryCapital = "CapitalCrack";

interface CountryCapital {
  country: string;
  capital: string;
}

interface GameColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  card: string;
  text: string;
  success: string;
}

const CountryCapital: React.FC = () => {
  const allCountries: CountryCapital[] = [
    { country: 'France', capital: 'Paris' },
    { country: 'Germany', capital: 'Berlin' },
    { country: 'Italy', capital: 'Rome' },
    { country: 'Spain', capital: 'Madrid' },
    { country: 'United Kingdom', capital: 'London' },
    { country: 'Japan', capital: 'Tokyo' },
    { country: 'Australia', capital: 'Canberra' },
    { country: 'Brazil', capital: 'Brasília' },
    { country: 'Canada', capital: 'Ottawa' },
    { country: 'India', capital: 'New Delhi' },
    { country: 'Russia', capital: 'Moscow' },
    { country: 'China', capital: 'Beijing' },
    { country: 'Mexico', capital: 'Mexico City' },
    { country: 'Argentina', capital: 'Buenos Aires' },
    { country: 'Egypt', capital: 'Cairo' },
    { country: 'South Africa', capital: 'Cape Town' },
    { country: 'Norway', capital: 'Oslo' },
    { country: 'Sweden', capital: 'Stockholm' },
    { country: 'Netherlands', capital: 'Amsterdam' },
    { country: 'Switzerland', capital: 'Bern' },
  ];

  const colorSchemes: GameColors[] = [
    {
      primary: '#3B82F6',
      secondary: '#1E40AF',
      accent: '#F59E0B',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      card: 'rgba(255, 255, 255, 0.95)',
      text: '#1F2937',
      success: '#10B981'
    },
    {
      primary: '#EC4899',
      secondary: '#BE185D',
      accent: '#8B5CF6',
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      card: 'rgba(255, 255, 255, 0.95)',
      text: '#1F2937',
      success: '#059669'
    },
    {
      primary: '#10B981',
      secondary: '#047857',
      accent: '#F59E0B',
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      card: 'rgba(255, 255, 255, 0.95)',
      text: '#1F2937',
      success: '#DC2626'
    },
    {
      primary: '#8B5CF6',
      secondary: '#7C3AED',
      accent: '#F97316',
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      card: 'rgba(255, 255, 255, 0.95)',
      text: '#1F2937',
      success: '#059669'
    }
  ];

  const goalPrompts = [
    'Match each country to its capital using the dropdowns below',
    'Select the correct capital city for each country from the dropdown menus',
    'Choose the right capital for every country to unlock your secret code',
    'Connect each nation with its capital city using the selection menus',
    'Pick the correct capital from each dropdown to complete the challenge'
  ];

  const [gameCountries, setGameCountries] = useState<CountryCapital[]>([]);
  const [allCapitals, setAllCapitals] = useState<string[]>([]);
  const [userSelections, setUserSelections] = useState<{ [key: string]: string }>({});
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState(false);
  const [colors, setColors] = useState<GameColors>(colorSchemes[0]);
  const [goalPrompt, setGoalPrompt] = useState('');

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const initializeGame = () => {
    // Select random countries (8-12)
    const numCountries = Math.floor(Math.random() * 2) + 3;
    const selectedCountries = shuffleArray(allCountries).slice(0, numCountries);
    
    // Create pool of all capitals (correct + distractors)
    const correctCapitals = selectedCountries.map(c => c.capital);
    const distractorCapitals = shuffleArray(
      allCountries
        .filter(c => !selectedCountries.some(sc => sc.country === c.country))
        .map(c => c.capital)
    ).slice(0, Math.min(8, allCountries.length - selectedCountries.length));
    
    const allCapitalsPool = shuffleArray([...correctCapitals, ...distractorCapitals]);
    
    setGameCountries(shuffleArray(selectedCountries));
    setAllCapitals(allCapitalsPool);
    setUserSelections({});
    setShowResult(false);
    
    // Random styling
    setColors(colorSchemes[Math.floor(Math.random() * colorSchemes.length)]);
    setGoalPrompt(goalPrompts[Math.floor(Math.random() * goalPrompts.length)]);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleSelectionChange = (country: string, capital: string) => {
    setUserSelections(prev => ({
      ...prev,
      [country]: capital
    }));
  };
    const isAllCorrect = () => {
    return gameCountries.every(country => 
      userSelections[country.country] === country.capital
    );
  };

  const handleSubmit = () => {
    if (Object.keys(userSelections).length !== gameCountries.length) {
      setError(true)
      setShowResult(false)
      return;
    }
    setError(false)
    if(isAllCorrect())
    setShowResult(true)
  };




  const dynamicStyles = {
    container: {
      background: colors.background,
      color: colors.text,
      minHeight: '100vh',
      padding: '2rem 1rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    card: {
      background: colors.card,
      borderRadius: '1rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto',
      backdropFilter: 'blur(10px)'
    },
    title: {
      color: colors.primary,
      fontSize: '2.5rem',
      fontWeight: 'bold',
      textAlign: 'center' as const,
      marginBottom: '1rem',
      textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
    },
    subtitle: {
      color: colors.secondary,
      fontSize: '1.2rem',
      textAlign: 'center' as const,
      marginBottom: '2rem',
      fontWeight: '500'
    },
    countryRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem',
      marginBottom: '1rem',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      borderRadius: '0.75rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    },
    countryName: {
      fontSize: '1.1rem',
      fontWeight: '600',
      color: colors.text,
      minWidth: '140px'
    },
    dropdown: {
      padding: '0.75rem 1rem',
      borderRadius: '0.5rem',
      border: `2px solid ${colors.primary}`,
      backgroundColor: 'white',
      color: colors.text,
      fontSize: '1rem',
      minWidth: '180px',
      cursor: 'pointer',
      transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
    },
    submitButton: {
      backgroundColor: colors.primary ,
      color: 'white',
      padding: '1rem 2rem',
      borderRadius: '0.75rem',
      border: 'none',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow:'0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      transform: 'translateY(-2px)'
    },
    resultCard: {
      backgroundColor: isAllCorrect() ? colors.success : '#EF4444',
      color: 'white',
      padding: '2rem',
      borderRadius: '1rem',
      textAlign: 'center' as const,
      marginTop: '2rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
      animation: 'slideIn 0.5s ease-out'
    },
    passwordBox: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      padding: '1rem',
      borderRadius: '0.5rem',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      letterSpacing: '0.1em',
      marginTop: '1rem',
      border: '2px dashed rgba(255, 255, 255, 0.5)'
    },
    newGameButton: {
      backgroundColor: 'white',
      color: colors.primary,
      padding: '0.75rem 1.5rem',
      borderRadius: '0.5rem',
      border: 'none',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '1rem',
      transition: 'transform 0.2s ease'
    }
  };

  return (
    <div style={dynamicStyles.container}>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .country-row:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.15);
        }
        
        .dropdown:hover {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .dropdown:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
        }
        
        .submit-button:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 15px 20px -3px rgba(0, 0, 0, 0.2);
        }
        
        .new-game-button:hover {
          transform: scale(1.05);
        }
        
        @media (max-width: 768px) {
          .country-row {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
          
          .country-name {
            min-width: auto;
          }
          
          .dropdown {
            min-width: 200px;
          }
        }
      `}</style>
      
      <div style={dynamicStyles.card}>
        <h1 style={dynamicStyles.title}>🌍 Geography Challenge</h1>
        <p style={dynamicStyles.subtitle}>{goalPrompt}</p>
        
        <div>
          {gameCountries.map((country, index) => (
            <div 
              key={country.country} 
              className="country-row"
              style={{
                ...dynamicStyles.countryRow,
                animationDelay: `${index * 100}ms`
              }}
            >
              <span style={dynamicStyles.countryName}>{country.country}</span>
              <select
                className="dropdown"
                style={dynamicStyles.dropdown}
                value={userSelections[country.country] || ''}
                onChange={(e) => handleSelectionChange(country.country, e.target.value)}
                // disabled={isSubmitted}
              >
                <option value="">Choose capital...</option>
                {allCapitals.map(capital => (
                  <option key={capital} value={capital}>{capital}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button
            className="submit-button"
            style={dynamicStyles.submitButton}
            onClick={handleSubmit}
          >
            {'Submit Answers'}
          </button>
          {error&&<p className='text-red-600 mt-4'>Please field all fields before submitting.</p>}
        </div>
        
        {showResult && (
          <div>
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                     <div className="bg-white rounded-lg p-8 mx-60 w-full text-center shadow-2xl">
                       <div className="mb-6">
                         <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                           <span className="text-2xl text-white">🎉</span>
                         </div>
                         <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                           Secret Unlocked!
                         </h2>
                         <p className="text-gray-600 mt-2">
                           Special task conditions met!
                         </p>
                       </div>
               
                       <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-lg border-2 border-dashed border-green-300">
                         <p className="text-sm text-green-500 mb-2">Secret Password:</p>
                         <div className="text-3xl font-mono font-bold text-green-600 tracking-wider">
                           {PASSWORD_CountryCapital}
                         </div>
                       </div>
                     </div>
                   </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryCapital;