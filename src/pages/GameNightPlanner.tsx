import { useState } from "react";
import { useTaskAnalytics } from "../utils/useTaskAnalytics";

export const TASK_ID_GameNightPlanner = "entertainment-online-gamesession";
export const PASSWORD_GameNightPlanner = "Konbu";

const eventNames = [
  "Fun Game Night",
  "Epic Gaming Session", 
  "Virtual Party Time",
  "Digital Hangout",
  "Online Gaming Fest"
];

const pageSubtitles = [
  "Craft the perfect digital gaming experience!",
  "Design your ultimate virtual hangout!",
  "Build an amazing online gaming session!",
  "Create the best remote gaming party!",
  "Plan an epic digital gaming adventure!"
];

const randomSubtitle = pageSubtitles[Math.floor(Math.random() * pageSubtitles.length)];

const GameNightPlanner = () => {
  const { recordSuccess } = useTaskAnalytics(TASK_ID_GameNightPlanner);
  
  const [currentEventNameIndex, setCurrentEventNameIndex] = useState(Math.floor(Math.random() * eventNames.length));
  const [step, setStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [canComplete, setCanComplete] = useState(true);
  
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [platform, setPlatform] = useState("");
  const [selectedGames, setSelectedGames] = useState<string[]>([]);
  const [invitedPeople, setInvitedPeople] = useState<string[]>([]);
  const [rsvpTracked, setRsvpTracked] = useState(false);

  const currentEventName = eventNames[currentEventNameIndex];

  const handleNewTask = () => {
    const newIndex = (currentEventNameIndex + 1) % eventNames.length;
    setCurrentEventNameIndex(newIndex);
    setEventName("");
    setEventDescription("");
    setPlatform("");
    setSelectedGames([]);
    setInvitedPeople([]);
    setRsvpTracked(false);
    setStep(0);
  };

  const games = ["Jackbox", "Fall Guys", "CSGO", "Among Us", "Minecraft", "Fortnite"];
  const people = ["Tommy Wilson", "Suji Kim", "Alfred Chan", "Sarah Johnson", "Mike Davis", "Lisa Chen"];

  const gameEmojis = ["🎲", "🏆", "🔫", "👻", "⛏️", "🏰"];
  const peopleEmojis = ["🎭", "🌸", "🎪", "🌺", "🎨", "🎯"];

  const handleGameToggle = (game: string) => {
    setSelectedGames(prev => 
      prev.includes(game) 
        ? prev.filter(g => g !== game)
        : [...prev, game]
    );
  };

  const handlePersonToggle = (person: string) => {
    setInvitedPeople(prev => 
      prev.includes(person) 
        ? prev.filter(p => p !== person)
        : [...prev, person]
    );
  };

  const checkCompletion = () => {
    const expectedGames = ["Jackbox", "Fall Guys", "CSGO"];
    const expectedPeople = ["Tommy Wilson", "Suji Kim", "Alfred Chan"];
    
    const gamesCorrect = expectedGames.every(game => selectedGames.includes(game)) && 
                        selectedGames.length === expectedGames.length;
    const peopleCorrect = expectedPeople.every(person => invitedPeople.includes(person)) && 
                         invitedPeople.length === expectedPeople.length;
    
    const exactMatch = eventName === currentEventName && 
                      eventDescription === "Let's have some fun!" && 
                      platform === "Zoom" && 
                      gamesCorrect && 
                      peopleCorrect && 
                      rsvpTracked;
    
    setIsComplete(true);
    if (exactMatch && canComplete) {
      recordSuccess();
    } else {
      setCanComplete(false);
    }
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      checkCompletion();
    }
  };

  const canProceed = () => {
    switch (step) {
      case 0:
        return eventName.trim() !== "" && eventDescription.trim() !== "";
      case 1:
        return platform !== "";
      case 2:
        return selectedGames.length > 0;
      case 3:
        return invitedPeople.length > 0;
      case 4:
        return true;
      default:
        return false;
    }
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 max-w-2xl w-full text-center border border-white/20 shadow-2xl">
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Congratulations, you have completed all stages!</h1>
          </div>
          
          {canComplete && (
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-2xl">
              <h2 className="text-2xl font-bold text-white mb-2">Your Password:</h2>
              <p className="text-3xl font-mono font-bold text-white">{PASSWORD_GameNightPlanner}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 max-w-4xl w-full border border-white/20 shadow-2xl">
        <div className="text-center mb-8">
          <div className="bg-white/10 rounded-2xl p-6 border border-white/20 mb-6">
            <div className="flex justify-between items-center">
              <div className="text-left">
                <p className="text-white/90 text-lg mb-2">
                  <strong>Task:</strong> Create an event with name '{currentEventName}' and description as 'Let's have some fun!'. Then choose the platform as 'Zoom', add 'Jackbox', 'Fall Guys', and 'CSGO' to the game list. After that, invite 'Tommy Wilson', 'Suji Kim', and 'Alfred Chan'. Lastly, press 'Track RSVPs' and press 'Complete Setup' to complete the task.
                </p>
              </div>
              <button
                onClick={handleNewTask}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
              >
                New Task
              </button>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">🎮 GameNightPlanner</h1>
          <p className="text-xl text-white/80">{randomSubtitle}</p>
        </div>

        {step === 0 && (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">Create Your Event</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-white text-lg font-semibold mb-3">Event Name</label>
                  <input
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white text-lg placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder="Enter event name..."
                  />
                </div>
                <div>
                  <label className="block text-white text-lg font-semibold mb-3">Event Description</label>
                  <textarea
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white text-lg placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                    rows={3}
                    placeholder="Describe your event..."
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Choose Platform</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Zoom", "Discord", "Teams", "Google Meet"].map((p) => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                    platform === p
                      ? "border-purple-400 bg-purple-500/20 text-white"
                      : "border-white/20 bg-white/5 text-white/80 hover:border-white/40 hover:bg-white/10"
                  }`}
                >
                  <div className="text-2xl mb-2">{p === "Zoom" ? "📹" : p === "Discord" ? "🎮" : p === "Teams" ? "💼" : "🎥"}</div>
                  <div className="font-semibold">{p}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Select Games</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {games.map((game, index) => (
                <button
                  key={game}
                  onClick={() => handleGameToggle(game)}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                    selectedGames.includes(game)
                      ? "border-green-400 bg-green-500/20 text-white"
                      : "border-white/20 bg-white/5 text-white/80 hover:border-white/40 hover:bg-white/10"
                  }`}
                >
                  <div className="text-2xl mb-2">{gameEmojis[index]}</div>
                  <div className="font-semibold">{game}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Invite Friends</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {people.map((person, index) => (
                <button
                  key={person}
                  onClick={() => handlePersonToggle(person)}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                    invitedPeople.includes(person)
                      ? "border-blue-400 bg-blue-500/20 text-white"
                      : "border-white/20 bg-white/5 text-white/80 hover:border-white/40 hover:bg-white/10"
                  }`}
                >
                  <div className="text-2xl mb-2">{peopleEmojis[index]}</div>
                  <div className="font-semibold text-sm">{person}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Track RSVPs</h2>
            <div className="text-center">
              <button
                onClick={() => setRsvpTracked(!rsvpTracked)}
                className={`px-12 py-6 rounded-2xl text-xl font-bold transition-all duration-300 ${
                  rsvpTracked
                    ? "bg-green-500 text-white"
                    : "bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600"
                }`}
              >
                {rsvpTracked ? "✅ RSVPs Tracked!" : "Track RSVPs"}
              </button>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="px-12 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-xl text-lg hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {step === 4 ? "Complete Setup" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameNightPlanner; 