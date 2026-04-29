import React, { useEffect, useMemo, useState } from "react";
import { useTaskAnalytics } from "../utils/useTaskAnalytics";

export const TASK_ID_BatteryCheck = "iot-filtering-batteryswap";
export const PASSWORD_BatteryCheck = "PowerRestored";

type Battery = {
  id: number;
  name: string;
  voltage: number;
  health: number;
};

const shuffleArray = <T,>(array: T[]): T[] => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};


const baseBatteries: Battery[] = [
  { id: 1, name: "Battery A1", voltage: 3.7, health: 98 },
  { id: 2, name: "Battery B4", voltage: 3.6, health: 91 },
  { id: 3, name: "Battery C7", voltage: 3.7, health: 95 },
  { id: 4, name: "Battery D2", voltage: 3.8, health: 88 },
  { id: 5, name: "Battery E3", voltage: 3.8, health: 92 },
];



const BatteryCheck: React.FC = () => {
  const { recordSuccess } = useTaskAnalytics(TASK_ID_BatteryCheck)
  const [step, setStep] = useState(1);
  const [batteries, setBatteries] = useState<Battery[]>([...baseBatteries]);
  const [selectedFaulty, setSelectedFaulty] = useState<number | null>(null);
  const [selectedReplacement, setSelectedReplacement] = useState<number | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [timers, setTimers] = useState<{ [id: number]: number }>({});
  const replacements: Battery[] = useMemo(() => shuffleArray([
    { id: 6, name: "Replacement W", voltage: 3.7, health: 99 },
    { id: 7, name: "Replacement X", voltage: 2.9, health: 72 },
    { id: 8, name: "Replacement Y", voltage: 3.7, health: 97 },
    { id: 9, name: "Replacement Z", voltage: 3.6, health: 85 },
  ]), []);

  useEffect(() => {
    const initTimers: { [id: number]: number } = {};
    baseBatteries.forEach((b) => {
      initTimers[b.id] = 14400; 
    });
    setTimers(initTimers);
    refreshBatteryHealth();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) => {
        const updated = { ...prev };
        let shouldRefresh = false;
        Object.keys(updated).forEach((id) => {
          if (updated[+id] > 0) {
            updated[+id]--;
          } else {
            shouldRefresh = true;
          }
        });

        if (shouldRefresh) {
          refreshBatteryHealth();
          baseBatteries.forEach((b) => {
            updated[b.id] = 14400;
          });
        }

        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [batteries]);

  const refreshBatteryHealth = () => {
    const refreshed = batteries.map((b) => ({ ...b }));
    const faultyIndex = Math.floor(Math.random() * refreshed.length);

    refreshed.forEach((battery, idx) => {
      if (idx === faultyIndex) {
        battery.health = Math.floor(Math.random() * 15) + 1;
        battery.voltage = 2.5;
      } else {
        battery.health = Math.floor(Math.random() * 20) + 80;
        battery.voltage = 3.6 + Math.random() * 0.3;
      }
    });

    setBatteries(refreshed);
    setSelectedFaulty(null);
    setSelectedReplacement(null);
    setShowPassword(false);
  };

  const faultyBattery = batteries.find((b) => b.health < 20 && b.voltage <= 2.5);
  const isCorrectFaulty = selectedFaulty === faultyBattery?.id;

  const replacement = replacements.find((r) => r.id === selectedReplacement);
  const isCorrectReplacement =
    replacement && replacement.voltage === 3.7 && replacement.health > 95;

  const handleInstall = () => {
    setShowPassword(true); 

    if (isCorrectFaulty && isCorrectReplacement) {
      recordSuccess();
    }
  };

  const formatTime = (s: number) => {
    const hrs = Math.floor(s / 3600)
      .toString()
      .padStart(2, "0");
    const mins = Math.floor((s % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const secs = (s % 60).toString().padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-mono">
      <header className="bg-[#1e293b] py-4 px-8 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold">🔋 Battery Diagnostics Lab</h1>
        <p className="text-sm text-gray-400">System Mode: Technician</p>
      </header>

      <div className="flex">
        <aside className="w-64 bg-[#FFB38E] p-6 border-r border-[#DE8F5F] min-h-screen">
          <h2 className="text-xl font-semibold mb-4">Steps</h2>
          <ul className="space-y-4 text-sm text-gray-800 font-medium">
            <li className={step === 1 ? "text-black font-bold" : ""}>1. Identify Faulty Battery</li>
            <li className={step === 2 ? "text-black font-bold" : ""}>2. Select Replacement</li>
            <li className={step === 3 ? "text-black font-bold" : ""}>3. Install & Confirm</li>
          </ul>
        </aside>

        <main className="flex-1 p-10 space-y-6">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">🔍 Step 1: Identify the Faulty Battery</h2>
              <p className="mb-4 text-sm text-gray-300">Find the battery with health below 20% and abnormal voltage.</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {batteries.map((battery) => (
                  <button
                    key={battery.id}
                    onClick={() => setSelectedFaulty(battery.id)}
                    className={`relative p-4 rounded-lg text-left border text-black ${
                      selectedFaulty === battery.id
                        ? "bg-[#E2A96B] border-green-600"
                        : "bg-[#FFCF9D] hover:bg-[#FFB26F] border-transparent"
                    }`}
                    
                  >
                    <h3 className="font-bold">{battery.name}</h3>
                    <p className="text-sm">Voltage: {battery.voltage.toFixed(2)}V</p>
                    <p className="text-sm">Health: {battery.health}%</p>
                    <span className="absolute bottom-2 right-3 text-xs bg-white/60 text-black px-2 py-0.5 rounded">
                      ⏳ {formatTime(timers[battery.id] || 0)}
                    </span>
                  </button>
                ))}
              </div>
              {selectedFaulty && (
                <button
                  onClick={() => setStep(2)}
                  className="mt-6 bg-green-600 hover:bg-green-700 px-6 py-2 rounded-md"
                >
                  Proceed to Replacement Selection
                </button>
              )}
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">🧪 Step 2: Select a Replacement Battery</h2>
              <p className="mb-4 text-sm text-gray-300">Choose a healthy battery with proper voltage.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {replacements.map((battery) => (
                  <button
                    key={battery.id}
                    onClick={() => setSelectedReplacement(battery.id)}
                    className={`p-4 rounded-lg text-left border text-black ${
                      selectedReplacement === battery.id
                        ? "bg-[#C9774C] border-yellow-600"
                        : "bg-[#DE8F5F] hover:bg-[#FFB26F] border-transparent"
                    }`}
                    
                  >
                    <h3 className="font-bold">{battery.name}</h3>
                    <p className="text-sm">Voltage: {battery.voltage}V</p>
                    <p className="text-sm">Health: {battery.health}%</p>
                  </button>
                ))}
              </div>
              {selectedReplacement && (
                <button
                  onClick={() => setStep(3)}
                  className="mt-6 bg-yellow-500 hover:bg-yellow-600 px-6 py-2 rounded-md"
                >
                  Confirm Installation
                </button>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">✅ Step 3: Confirm Installation</h2>
              <button
                onClick={handleInstall}
                className="bg-[#A55B4B] hover:bg-[#DCA06D] px-8 py-3 rounded-md font-semibold"
              >
                Install Replacement Battery
              </button>

              {showPassword && (
                <div className="mt-6 bg-[#210F37] border border-[#4F1C51] p-4 rounded-lg">
                  {showPassword && (
                    <div className="mt-6 bg-[#210F37] border border-[#4F1C51] p-4 rounded-lg">
                      <h3 className="text-xl font-bold text-[#DCA06D]">⚡ 🔋 Battery Replaced Successfully!</h3>
                      {isCorrectFaulty && isCorrectReplacement && (
                        <>
                          <p className="mt-2">Password:</p>
                          <p className="text-2xl font-bold text-[#A55B4B]">{PASSWORD_BatteryCheck}</p>
                        </>
                      )}
                    </div>
                  )}

                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default BatteryCheck;
