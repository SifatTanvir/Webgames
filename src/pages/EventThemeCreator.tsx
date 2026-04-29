import React, { useState, useMemo } from 'react';

// ### 1. Core Configuration & Data ###

export const TASK_ID_EventThemeCreator = "ebooking-eventplanning-generateinvite";
export const PASSWORD_EventThemeCreator = "CELEBRATE_634d7_PARTY";

// Static data for the task validation
const correctInputs = {
  eventType: "child's 5th birthday party",
  themeToSelect: "Superhero Academy",
};

// Realistic data for the component
const themeDatabase = {
  "child's 5th birthday party": [
    {
      id: "T1",
      name: "Dinosaur Adventure",
      description: "Travel back in time to a land of jurassic giants. Perfect for young explorers.",
      image: "https://picsum.photos/seed/dino/400/200",
      invitation: "Get ready for a ROARING good time! You're invited to a Dinosaur Adventure to celebrate [Name]'s 5th Birthday! Join us for fossil digs, volcano cakes, and prehistoric fun.",
    },
    {
      id: "T2",
      name: "Superhero Academy",
      description: "Calling all heroes! Guests will test their powers with fun challenges and games.",
      image: "https://picsum.photos/seed/hero/400/200",
      invitation: "Your mission, should you choose to accept it, is to celebrate [Name]'s 5th Birthday at our Superhero Academy! Prepare for heroic challenges, super snacks, and a day of adventure.",
    },
    {
      id: "T3",
      name: "Magical Unicorn Gala",
      description: "A whimsical journey into an enchanted forest filled with glitter, rainbows, and magic.",
      image: "https://picsum.photos/seed/unicorn/400/200",
      invitation: "You are magically invited to a Unicorn Gala for [Name]'s 5th Birthday! Join us in an enchanted land for sparkling activities, rainbow treats, and a day of pure magic.",
    },
  ],
  "corporate gala": [
    // Data for other event types to make the app feel more complete
    {
      id: "T4",
      name: "Art Deco Elegance",
      description: "A sophisticated evening with the glamour of the 1920s.",
      image: "https://picsum.photos/seed/deco/400/200",
      invitation: "You are cordially invited to our annual Corporate Gala, an evening of Art Deco Elegance. Please join us for a night of celebration, networking, and success."
    },
    {
      id: "T5",
      name: "Future Forward",
      description: "A sleek, modern theme focused on innovation and technology.",
      image: "https://picsum.photos/seed/future/400/200",
      invitation: "Join us as we look to the future at our annual Corporate Gala. We invite you to an evening celebrating innovation, progress, and the exciting road ahead."
    },
  ],
  "generic": [
    {
      id: "TGEN1",
      name: "Color Splash Bash",
      description: "A vibrant, colorful party theme suitable for any celebration.",
      image: "https://picsum.photos/seed/colorsplash/400/200",
      invitation: "Join us for a Color Splash Bash! Bright colors, fun games, and good vibes await. Let's make memories together!"
    },
    {
      id: "TGEN2",
      name: "Classic Picnic",
      description: "A timeless outdoor picnic with blankets, baskets, and sunshine.",
      image: "https://picsum.photos/seed/picnic/400/200",
      invitation: "You're invited to a Classic Picnic! Bring your favorite snacks and enjoy a relaxing day outdoors with friends and family."
    },
    {
      id: "TGEN3",
      name: "Game Night Extravaganza",
      description: "Board games, card games, and friendly competition for all ages.",
      image: "https://picsum.photos/seed/gamenight/400/200",
      invitation: "Game Night Extravaganza! Join us for an evening of games, laughter, and prizes. All skill levels welcome!"
    }
  ],
};

const backgroundGradients = [
  "from-gray-50 to-gray-100",
  "from-blue-50 to-indigo-100",
  "from-rose-50 to-pink-100",
  "from-emerald-50 to-teal-100",
];

// ### 2. Icon Components (Inline SVG) ###

const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M16 17v4M15 19h4M10 3a1 1 0 011 1v1a1 1 0 11-2 0V4a1 1 0 011-1zM21 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM12 21a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zM4 12a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1z" />
  </svg>
);

const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ClipboardCopyIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

// ### 3. Main React Component ###

const EventThemeCreator: React.FC = () => {
  const [step, setStep] = useState(1);
  const [eventType, setEventType] = useState('');
  const [audience, setAudience] = useState('');
  const [suggestedThemes, setSuggestedThemes] = useState<typeof themeDatabase["child's 5th birthday party"]>([]);
  const [selectedTheme, setSelectedTheme] = useState<typeof themeDatabase["child's 5th birthday party"][0] | null>(null);
  const [copiedInvitation, setCopiedInvitation] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isTaskCorrect, setIsTaskCorrect] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [noThemesFound, setNoThemesFound] = useState(false);

  // Randomize background and theme order on mount
  const [bgIndex] = useState(() => Math.floor(Math.random() * backgroundGradients.length));
  const randomBackground = backgroundGradients[bgIndex];
  const shuffledThemes = useMemo(() => [...suggestedThemes].sort(() => Math.random() - 0.5), [suggestedThemes]);

  const handleFindThemes = () => {
    const lowerCaseEventType = eventType.toLowerCase();
    let themes: typeof themeDatabase["child's 5th birthday party"] = [];
    if (lowerCaseEventType.includes("child") || lowerCaseEventType.includes("birthday")) {
      themes = themeDatabase["child's 5th birthday party"];
    } else if (lowerCaseEventType.includes("corporate") || lowerCaseEventType.includes("gala")) {
      themes = themeDatabase["corporate gala"];
    } else {
      themes = themeDatabase["generic"];
    }
    setSuggestedThemes(themes);
    setNoThemesFound(themes.length === 0);
    setStep(2);
  };

  const handleSelectTheme = (theme: typeof themeDatabase["child's 5th birthday party"][0]) => {
    setSelectedTheme(theme);
    setStep(3);
  };
  
  const handleCopyToClipboard = () => {
    if (selectedTheme) {
        navigator.clipboard.writeText(selectedTheme.invitation.replace('[Name]', 'the birthday star'));
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const finalizeInvitation = () => {
    // Final validation happens here
    const isEventTypeCorrect = eventType.toLowerCase() === correctInputs.eventType;
    const isThemeCorrect = selectedTheme?.name === correctInputs.themeToSelect;
    const generatedText = selectedTheme?.invitation.replace('[Name]', 'the birthday star') || '';
    const isTextMatch = copiedInvitation === generatedText;

    if (isEventTypeCorrect && isThemeCorrect && isTextMatch) {
      setIsTaskCorrect(true);
    } else {
      setIsTaskCorrect(false);
    }
    setShowSuccessModal(true);
  };

  return (
    <div className={`min-h-screen font-sans bg-gradient-to-br ${randomBackground} text-gray-800 flex items-center justify-center p-4`}>
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden transition-all duration-500">
        
        <div className="p-8 border-b border-gray-200">
            <div className="flex items-center space-x-4">
                <SparklesIcon className="w-10 h-10 text-indigo-500"/>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">EventCraft AI</h1>
                    <p className="text-gray-600">Your personal event planning assistant</p>
                </div>
            </div>
        </div>

        <div className="p-8">
          {/* Step 1: Event Details */}
          {step === 1 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-semibold mb-2">Let's plan your event!</h2>
              <p className="text-gray-600 mb-6">Start by telling us a little bit about what you're planning.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                  <input
                    id="eventType"
                    type="text"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    placeholder="e.g., birthday party"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  />
                </div>
                <div>
                  <label htmlFor="audience" className="block text-sm font-medium text-gray-700 mb-1">Audience Size</label>
                  <input
                    id="audience"
                    type="number"
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    placeholder="e.g., 15"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  />
                </div>
              </div>
              <div className="mt-8 text-right">
                <button
                  onClick={handleFindThemes}
                  disabled={eventType.trim() === '' || audience.trim() === ''}
                  className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/30 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                >
                  Suggest Themes
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Select Theme */}
          {step === 2 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-semibold mb-2">Choose a Creative Theme</h2>
              <p className="text-gray-600 mb-6">Here are a few ideas based on your event. Select one to continue.</p>
              {noThemesFound ? (
                <div className="mb-6 p-4 bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 rounded">
                  No themes found for this event type. You can still proceed, but no suggestions are available.
                </div>
              ) : null}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {shuffledThemes.map((theme) => (
                  <div key={theme.id} onClick={() => handleSelectTheme(theme)} className="border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-xl hover:border-indigo-500 hover:-translate-y-1 transition-all group">
                    <img src={theme.image} alt={theme.name} className="w-full h-32 object-cover" />
                    <div className="p-4 bg-white">
                      <h3 className="font-bold text-lg text-gray-800 group-hover:text-indigo-600">{theme.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{theme.description}</p>
                    </div>
                  </div>
                ))}
              </div>
                <button onClick={() => setStep(1)} className="mt-8 text-sm text-gray-600 hover:text-indigo-600">← Back to details</button>
            </div>
          )}

          {/* Step 3: Generate Invitation */}
          {step === 3 && selectedTheme && (
             <div className="animate-fade-in">
                <h2 className="text-2xl font-semibold mb-2">Invitation Draft Ready!</h2>
                <p className="text-gray-600 mb-6">We've drafted an invitation for the <span className='font-bold text-indigo-600'>{selectedTheme.name}</span> theme. Copy the text below and paste it in the box to confirm.</p>
                <div className="relative bg-gray-100 p-6 rounded-lg border border-gray-200">
                    <button onClick={handleCopyToClipboard} className="absolute top-2 right-2 p-2 bg-white rounded-md hover:bg-gray-200 transition">
                       {copySuccess ? <CheckCircleIcon className="w-5 h-5 text-green-500" /> : <ClipboardCopyIcon className="w-5 h-5 text-gray-500" />}
                    </button>
                    <p className="text-gray-700 italic">"{selectedTheme.invitation.replace('[Name]', 'the birthday star')}"</p>
                </div>
                
                <div className="mt-6">
                    <label htmlFor="invitation-paste" className="block text-sm font-medium text-gray-700 mb-1">Paste invitation text here to finalize:</label>
                    <textarea 
                        id="invitation-paste"
                        rows={4}
                        value={copiedInvitation}
                        onChange={(e) => setCopiedInvitation(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        placeholder="Paste the generated text here..."
                    />
                </div>

                <div className="mt-8 flex justify-between items-center">
                    <button onClick={() => setStep(2)} className="text-sm text-gray-600 hover:text-indigo-600">← Change Theme</button>
                    <button onClick={finalizeInvitation} className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-all shadow-lg shadow-green-500/30">
                        Finalize Invitation
                    </button>
                </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="w-full max-w-2xl bg-white rounded-2xl p-8 shadow-2xl text-center">
                <h2 className={`text-3xl font-bold mb-3 ${isTaskCorrect ? 'text-green-600' : 'text-gray-800'}`}>
                    {isTaskCorrect ? "Invitation Confirmed!" : "Submission Received"}
                </h2>
                <p className="text-gray-600 mb-6">
                    {isTaskCorrect ? "Your event details are saved. Great job!" : "Your event has been submitted for review."}
                </p>
                {isTaskCorrect ? (
                    <div className="bg-gray-100 p-6 rounded-lg border-2 border-dashed border-gray-300">
                        <p className="text-sm font-semibold text-gray-500">PASSWORD:</p>
                        <p className="mt-2 text-4xl font-mono tracking-widest text-indigo-700">{PASSWORD_EventThemeCreator}</p>
                    </div>
                ) : null}
            </div>
        </div>
      )}

      {/* Tailwind animation utility class */}
      <style>{`.animate-fade-in { animation: fadeIn 0.5s ease-in-out; } @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
};

export default EventThemeCreator;