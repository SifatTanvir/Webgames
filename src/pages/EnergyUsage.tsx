import React, { useState, useMemo } from "react";

export const PASSWORD_EnergyUsage: string = "EnergySever2323";
export const TASK_ID_EnergyUsage: string = "iot-automation-viewenergyusage";

// Types
interface Appliance {
  id: string;
  name: string;
  consumption: number;
  icon: string;
  status: "on" | "off" | "standby";
}

interface Room {
  id: string;
  name: string;
  totalConsumption: number;
  appliances: Appliance[];
  color: string;
}

// Color themes
const colorThemes = [
  {
    primary: "from-blue-500 to-cyan-500",
    secondary: "from-green-400 to-emerald-500",
    accent: "from-purple-500 to-pink-500",
    background: "from-slate-50 to-blue-50",
    card: "bg-white/80",
    text: "text-gray-800",
  },
  {
    primary: "from-emerald-500 to-teal-500",
    secondary: "from-orange-400 to-red-500",
    accent: "from-indigo-500 to-purple-500",
    background: "from-emerald-50 to-teal-50",
    card: "bg-white/90",
    text: "text-gray-900",
  },
  {
    primary: "from-orange-500 to-amber-500",
    secondary: "from-blue-400 to-indigo-500",
    accent: "from-pink-500 to-rose-500",
    background: "from-orange-50 to-amber-50",
    card: "bg-white/85",
    text: "text-gray-800",
  },
];

const EnergyUsage: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Generate completely new random data on every render
  const { rooms, layout, theme } = useMemo(() => {
    const generateAppliances = (roomType: string): Appliance[] => {
      const appliancesByRoom = {
        kitchen: [
          {
            name: "Refrigerator",
            icon: "🧊",
            baseConsumption: [0.8, 1.2, 1.5, 2.0],
          },
          { name: "Oven", icon: "🔥", baseConsumption: [1.8, 2.5, 3.2, 4.1] },
          {
            name: "Microwave",
            icon: "📡",
            baseConsumption: [0.9, 1.3, 1.8, 2.2],
          },
          {
            name: "Dishwasher",
            icon: "🍽️",
            baseConsumption: [1.1, 1.6, 2.1, 2.8],
          },
          {
            name: "Coffee Maker",
            icon: "☕",
            baseConsumption: [0.6, 0.9, 1.2, 1.7],
          },
          {
            name: "Toaster",
            icon: "🍞",
            baseConsumption: [0.8, 1.1, 1.4, 1.9],
          },
          {
            name: "Blender",
            icon: "🥤",
            baseConsumption: [0.5, 0.8, 1.1, 1.5],
          },
        ],
        "living room": [
          { name: "TV", icon: "📺", baseConsumption: [0.3, 0.5, 0.7, 0.9] },
          {
            name: "Sound System",
            icon: "🔊",
            baseConsumption: [0.2, 0.4, 0.6, 0.8],
          },
          {
            name: "Air Conditioner",
            icon: "❄️",
            baseConsumption: [1.5, 2.2, 2.8, 3.5],
          },
          {
            name: "Gaming Console",
            icon: "🎮",
            baseConsumption: [0.6, 0.9, 1.2, 1.6],
          },
          {
            name: "Router",
            icon: "📶",
            baseConsumption: [0.1, 0.15, 0.2, 0.25],
          },
        ],
        bedroom: [
          {
            name: "Air Conditioner",
            icon: "❄️",
            baseConsumption: [1.2, 1.8, 2.3, 2.9],
          },
          { name: "Laptop", icon: "💻", baseConsumption: [0.2, 0.4, 0.6, 0.8] },
          { name: "Lamp", icon: "💡", baseConsumption: [0.05, 0.1, 0.15, 0.2] },
          {
            name: "Phone Charger",
            icon: "🔌",
            baseConsumption: [0.02, 0.05, 0.08, 0.1],
          },
          { name: "Fan", icon: "🌀", baseConsumption: [0.3, 0.5, 0.7, 1.0] },
        ],
        bathroom: [
          {
            name: "Water Heater",
            icon: "🚿",
            baseConsumption: [2.0, 2.8, 3.5, 4.2],
          },
          {
            name: "Hair Dryer",
            icon: "💨",
            baseConsumption: [1.0, 1.4, 1.8, 2.3],
          },
          {
            name: "Ventilation Fan",
            icon: "🌪️",
            baseConsumption: [0.15, 0.25, 0.35, 0.45],
          },
          {
            name: "Electric Toothbrush",
            icon: "🦷",
            baseConsumption: [0.01, 0.02, 0.03, 0.04],
          },
        ],
      };

      const roomAppliances =
        appliancesByRoom[roomType as keyof typeof appliancesByRoom] || [];
      const shuffledAppliances = [...roomAppliances].sort(
        () => Math.random() - 0.5
      );
      const numAppliances = Math.floor(Math.random() * 3) + 3; // 3-5 appliances per room

      return shuffledAppliances
        .slice(0, numAppliances)
        .map((appliance, index) => {
          const consumptionOptions = appliance.baseConsumption;
          const randomConsumption =
            consumptionOptions[
              Math.floor(Math.random() * consumptionOptions.length)
            ];
          const variation = 0.8 + Math.random() * 0.4; // 80% to 120% of base

          return {
            id: `${roomType}-${index}`,
            name: appliance.name,
            consumption: Number((randomConsumption * variation).toFixed(2)),
            icon: appliance.icon,
            status:
              Math.random() > 0.3
                ? "on"
                : Math.random() > 0.5
                ? "standby"
                : "off",
          };
        });
    };

    const roomNames = ["kitchen", "living room", "bedroom", "bathroom"];
    const roomColors = [
      "from-red-400 to-orange-500",
      "from-blue-400 to-indigo-500",
      "from-green-400 to-emerald-500",
      "from-purple-400 to-pink-500",
    ];

    // Shuffle room colors
    const shuffledColors = [...roomColors].sort(() => Math.random() - 0.5);

    const generatedRooms = roomNames.map((name, index) => {
      const appliances = generateAppliances(name);
      return {
        id: name,
        name: name.charAt(0).toUpperCase() + name.slice(1),
        totalConsumption: Number(
          appliances.reduce((sum, app) => sum + app.consumption, 0).toFixed(2)
        ),
        appliances,
        color: shuffledColors[index],
      };
    });

    return {
      rooms: generatedRooms,
      layout: Math.random() > 0.5 ? "grid" : "list",
      theme: colorThemes[Math.floor(Math.random() * colorThemes.length)],
    };
  }, []); // Empty dependency array ensures new data on every component mount

  const totalConsumption = rooms.reduce(
    (sum, room) => sum + room.totalConsumption,
    0
  );

  const handleApplianceClick = (appliance: Appliance) => {
    if (selectedRoom?.name === "Kitchen") {
      // Find the appliance with highest consumption in the kitchen
      const highestConsumptionAppliance = selectedRoom.appliances.reduce(
        (max, current) =>
          current.consumption > max.consumption ? current : max
      );

      // Only reveal password if clicked appliance is the one with highest consumption
      if (appliance.id === highestConsumptionAppliance.id) {
        setShowPassword(true);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on":
        return "text-green-500";
      case "standby":
        return "text-yellow-500";
      case "off":
        return "text-gray-400";
      default:
        return "text-gray-400";
    }
  };

  // Force re-render function
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${theme.background} p-4 transition-all duration-500`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className={`inline-flex items-center gap-3 bg-gradient-to-r ${theme.primary} text-white px-6 py-3 rounded-2xl shadow-lg mb-4`}
          >
            <span className="text-2xl">🏠</span>
            <h1 className="text-2xl font-bold">Smart Home Energy Dashboard</h1>
            <button
              onClick={handleRefresh}
              className="ml-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
              title="Refresh data"
            >
              🔄
            </button>
          </div>
          <p className="text-gray-600 text-lg">
            Monitor your energy consumption in real-time
          </p>
        </div>

        {!selectedRoom ? (
          <>
            {/* Total Usage Card */}
            <div
              className={`${theme.card} backdrop-blur-sm rounded-3xl p-8 shadow-xl mb-8 border border-white/20`}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className={`text-3xl font-bold ${theme.text} mb-2`}>
                    Today's Usage
                  </h2>
                  <p className="text-gray-600">Real-time energy monitoring</p>
                </div>
                <div
                  className={`bg-gradient-to-r ${theme.primary} p-4 rounded-2xl`}
                >
                  <span className="text-white text-3xl">⚡</span>
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span
                  className={`text-6xl font-bold bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent`}
                >
                  {totalConsumption.toFixed(1)}
                </span>
                <span className="text-2xl text-gray-500 font-semibold">
                  kWh
                </span>
              </div>
              <div className="mt-4 flex gap-4">
                <div className="text-sm text-gray-600">
                  <span className="text-green-500 font-semibold">
                    ↓ {Math.floor(Math.random() * 20 + 5)}%
                  </span>{" "}
                  vs yesterday
                </div>
                <div className="text-sm text-gray-600">
                  <span className="text-blue-500 font-semibold">Peak:</span>{" "}
                  {Math.floor(Math.random() * 12 + 1)}:
                  {String(Math.floor(Math.random() * 60)).padStart(2, "0")}{" "}
                  {Math.random() > 0.5 ? "AM" : "PM"}
                </div>
              </div>
            </div>

            {/* Rooms Grid/List */}
            <div
              className={
                layout === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {rooms.map((room, index) => (
                <div
                  key={room.id}
                  onClick={() => setSelectedRoom(room)}
                  className={`${theme.card} backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-white/20 hover:scale-105 animate-fade-in`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-xl font-bold ${theme.text}`}>
                      {room.name}
                    </h3>
                    <div
                      className={`bg-gradient-to-r ${room.color} p-2 rounded-xl`}
                    >
                      <div className="w-6 h-6 text-white flex items-center justify-center text-sm">
                        {room.name === "Kitchen"
                          ? "🍳"
                          : room.name === "Living room"
                          ? "🛋️"
                          : room.name === "Bedroom"
                          ? "🛏️"
                          : "🚿"}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-baseline gap-2">
                      <span
                        className={`text-3xl font-bold bg-gradient-to-r ${room.color} bg-clip-text text-transparent`}
                      >
                        {room.totalConsumption.toFixed(1)}
                      </span>
                      <span className="text-lg text-gray-500">kWh</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {room.appliances.length} appliances
                    </div>
                    <div
                      className={`w-full bg-gray-200 rounded-full h-2 overflow-hidden`}
                    >
                      <div
                        className={`h-full bg-gradient-to-r ${room.color} transition-all duration-1000`}
                        style={{
                          width: `${Math.min(
                            (room.totalConsumption / totalConsumption) * 100,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Room Detail View */
          <div className="animate-fade-in">
            <button
              onClick={() => {
                setSelectedRoom(null);
                setShowPassword(false);
              }}
              className={`flex items-center gap-2 ${theme.card} backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg mb-6 hover:shadow-xl transition-all duration-300 border border-white/20`}
            >
              <span>←</span>
              Back to Dashboard
            </button>

            <div
              className={`${theme.card} backdrop-blur-sm rounded-3xl p-8 shadow-xl mb-8 border border-white/20`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`bg-gradient-to-r ${selectedRoom.color} p-4 rounded-2xl`}
                >
                  <div className="w-8 h-8 text-white flex items-center justify-center text-2xl">
                    {selectedRoom.name === "Kitchen"
                      ? "🍳"
                      : selectedRoom.name === "Living room"
                      ? "🛋️"
                      : selectedRoom.name === "Bedroom"
                      ? "🛏️"
                      : "🚿"}
                  </div>
                </div>
                <div>
                  <h2 className={`text-3xl font-bold ${theme.text}`}>
                    {selectedRoom.name}
                  </h2>
                  <p className="text-gray-600">
                    Appliance-level energy consumption
                  </p>
                </div>
              </div>
              <div className="flex items-baseline gap-2 mb-4">
                <span
                  className={`text-5xl font-bold bg-gradient-to-r ${selectedRoom.color} bg-clip-text text-transparent`}
                >
                  {selectedRoom.totalConsumption.toFixed(1)}
                </span>
                <span className="text-2xl text-gray-500">kWh</span>
              </div>
            </div>

            {/* Appliances List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedRoom.appliances.map((appliance, index) => {
                return (
                  <div
                    key={appliance.id}
                    onClick={() => handleApplianceClick(appliance)}
                    className={`${theme.card} backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-white/20 hover:scale-105 animate-fade-in`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-3xl">{appliance.icon}</div>
                      <div
                        className={`w-3 h-3 rounded-full ${
                          appliance.status === "on"
                            ? "bg-green-400 shadow-lg shadow-green-400/50"
                            : appliance.status === "standby"
                            ? "bg-yellow-400 shadow-lg shadow-yellow-400/50"
                            : "bg-gray-300"
                        } animate-pulse`}
                      ></div>
                    </div>
                    <h4 className={`font-bold text-lg ${theme.text} mb-2`}>
                      {appliance.name}
                    </h4>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span
                        className={`text-2xl font-bold ${
                          appliance.consumption > 1.5
                            ? "text-red-500"
                            : appliance.consumption > 0.8
                            ? "text-orange-500"
                            : "text-green-500"
                        }`}
                      >
                        {appliance.consumption.toFixed(2)}
                      </span>
                      <span className="text-gray-500">kWh</span>
                    </div>
                    <div
                      className={`text-sm capitalize ${getStatusColor(
                        appliance.status
                      )} font-semibold`}
                    >
                      {appliance.status}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Secret Password Reveal */}
            {showPassword && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg p-8 max-w-md w-full text-center shadow-2xl">
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
                    <p className="text-sm text-gray-600 mb-2">
                      Secret Password:
                    </p>
                    <div className="text-3xl font-mono font-bold text-green-600 tracking-wider">
                      {PASSWORD_EnergyUsage}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnergyUsage;
