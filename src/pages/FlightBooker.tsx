import React, { useState, useMemo, useCallback } from "react";

export const TASK_ID_FlightBooker = "ebooking-optimization-flightbooker";
export const PASSWORD_FlightBooker = "JOURNEY";

type Flight = {
  id: string;
  from: string;
  to: string;
  airline: string;
  cost: number;
  time: number;
};
type CompletionStatus = "perfect" | "corrected" | "incorrect";

const allFlights: Flight[] = [
  {
    id: "NY-LON-S",
    from: "New York",
    to: "London",
    airline: "SkyLink Airways",
    cost: 350,
    time: 7,
  },
  {
    id: "NY-LON-F",
    from: "New York",
    to: "London",
    airline: "AeroJet Global",
    cost: 550,
    time: 6,
  },
  {
    id: "LON-PAR-S",
    from: "London",
    to: "Paris",
    airline: "CloudHopper Express",
    cost: 120,
    time: 1.5,
  },
  {
    id: "LON-PAR-F",
    from: "London",
    to: "Paris",
    airline: "StarWing Alliance",
    cost: 200,
    time: 1,
  },
  {
    id: "PAR-TYO-S",
    from: "Paris",
    to: "Tokyo",
    airline: "SkyLink Airways",
    cost: 800,
    time: 12,
  },
  {
    id: "PAR-TYO-F",
    from: "Paris",
    to: "Tokyo",
    airline: "AeroJet Global",
    cost: 1100,
    time: 11,
  },
  {
    id: "LON-TYO-S",
    from: "London",
    to: "Tokyo",
    airline: "StarWing Alliance",
    cost: 950,
    time: 11.5,
  },
  {
    id: "NY-PAR-D",
    from: "New York",
    to: "Paris",
    airline: "AeroJet Global",
    cost: 480,
    time: 8,
  },
];

const correctItineraryIds = ["NY-LON-S", "LON-PAR-S", "PAR-TYO-S"];
const maxBudget = 1300;
const maxTime = 22;
const route = ["New York", "London", "Paris", "Tokyo"];

const PaperAirplaneIcon = () => (
  <svg
    className="w-6 h-6 text-cyan-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
    />
  </svg>
);
const CheckCircleIcon = () => (
  <svg
    className="w-8 h-8 text-cyan-300 mx-auto mb-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const MemoizedCompletionDisplay = React.memo(
  ({
    status,
    onReload,
  }: {
    status: CompletionStatus;
    onReload: () => void;
  }) => {
    const isPerfect = status === "perfect";
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4">
        <div className="relative z-50 text-center bg-gray-900/80 p-10 rounded-2xl shadow-2xl border border-cyan-500/50 max-w-lg">
          <CheckCircleIcon />
          <h2 className="text-3xl font-bold text-white mb-2">Trip Booked!</h2>
          {isPerfect ? (
            <>
              <p className="text-gray-300 mb-6">
                You found the most optimal route. Excellent work!
              </p>
              <div className="bg-black/50 p-4 rounded-lg">
                <p className="text-cyan-300 font-mono text-lg">PASSWORD</p>
                <p className="text-white text-4xl font-bold tracking-widest">
                  {PASSWORD_FlightBooker}
                </p>
              </div>
            </>
          ) : (
            <p className="text-gray-300 mb-6">Your trip has been confirmed.</p>
          )}
          <button
            onClick={onReload}
            className="mt-6 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors"
          >
            Reload the page
          </button>
        </div>
      </div>
    );
  }
);

const FlightBooker: React.FC = () => {
  const [itinerary, setItinerary] = useState<Flight[]>([]);
  const [completionStatus, setCompletionStatus] =
    useState<CompletionStatus | null>(null);
  const hasMadeMistake = React.useRef(false);

  const randomizedFlights = useMemo(
    () => [...allFlights].sort(() => Math.random() - 0.5),
    []
  );

  const handleAddToItinerary = useCallback((flight: Flight) => {
    if (!correctItineraryIds.includes(flight.id)) {
      hasMadeMistake.current = true;
    }
    setItinerary((prev) => {
      if (prev.some((f) => f.from === flight.from)) return prev;
      const newItinerary = [...prev, flight];
      return newItinerary.sort(
        (a, b) => route.indexOf(a.from) - route.indexOf(b.from)
      );
    });
  }, []);

  const handleRemoveFromItinerary = useCallback((flightId: string) => {
    hasMadeMistake.current = true;
    setItinerary((prev) => prev.filter((f) => f.id !== flightId));
  }, []);

  const metrics = useMemo(() => {
    return itinerary.reduce(
      (acc, flight) => {
        acc.totalCost += flight.cost;
        acc.totalTime += flight.time;
        return acc;
      },
      { totalCost: 0, totalTime: 0 }
    );
  }, [itinerary]);

  const isFinalStateCorrect = useMemo(() => {
    if (itinerary.length !== correctItineraryIds.length) return false;
    const itineraryIds = itinerary.map((f) => f.id);
    return correctItineraryIds.every((id) => itineraryIds.includes(id));
  }, [itinerary]);

  const handleBookTrip = useCallback(() => {
    if (isFinalStateCorrect) {
      setCompletionStatus("perfect");
    } else {
      setCompletionStatus("incorrect");
    }
  }, [isFinalStateCorrect]);

  const handleReload = useCallback(() => {
    setCompletionStatus(null);
    setItinerary([]);
    hasMadeMistake.current = false;
  }, []);

  if (completionStatus) {
    return (
      <MemoizedCompletionDisplay
        status={completionStatus}
        onReload={handleReload}
      />
    );
  }

  return (
    <div className="min-h-screen w-full p-4 sm:p-6 font-sans text-white bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-3 text-white">
            <PaperAirplaneIcon /> Flight Booker
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Available Flights
            </h3>
            <div className="max-h-[60vh] overflow-y-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-300 uppercase sticky top-0 bg-gray-800/80 backdrop-blur-sm">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Route
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Airline
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Cost
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Time
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {randomizedFlights.map((flight) => (
                    <tr
                      key={flight.id}
                      className="border-b border-gray-700/50 hover:bg-white/5"
                    >
                      <td className="px-6 py-4 font-bold text-white">
                        {flight.from} → {flight.to}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {flight.airline}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        ${flight.cost}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {flight.time} hrs
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleAddToItinerary(flight)}
                          className="font-medium text-cyan-400 hover:underline disabled:text-gray-500 disabled:cursor-not-allowed"
                          disabled={itinerary.some(
                            (f) => f.from === flight.from
                          )}
                        >
                          Add
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:col-span-1 p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm flex flex-col">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Your Itinerary
            </h3>
            <div className="flex-grow space-y-3">
              {itinerary.length > 0 ? (
                itinerary.map((flight) => (
                  <div
                    key={flight.id}
                    className="p-3 bg-black/20 rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <p className="font-bold text-white">
                        {flight.from} → {flight.to}
                      </p>
                      <p className="text-xs opacity-70">
                        ${flight.cost} • {flight.time} hrs
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveFromItinerary(flight.id)}
                      className="text-xs font-bold text-red-400 hover:text-red-300"
                    >
                      REMOVE
                    </button>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <p>Add flights from the list</p>
                </div>
              )}
            </div>
            <div className="mt-4 border-t border-white/10 pt-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="opacity-70">Total Cost:</span>{" "}
                  <span
                    className={`font-bold ${
                      metrics.totalCost > maxBudget
                        ? "text-red-400"
                        : "text-white"
                    }`}
                  >
                    ${metrics.totalCost} / ${maxBudget}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">Total Time:</span>{" "}
                  <span
                    className={`font-bold ${
                      metrics.totalTime > maxTime
                        ? "text-red-400"
                        : "text-white"
                    }`}
                  >
                    {metrics.totalTime} hrs / {maxTime}
                  </span>
                </div>
              </div>
              <button
                onClick={handleBookTrip}
                disabled={itinerary.length === 0}
                className="mt-4 w-full font-bold py-3 px-6 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-sky-500/20"
              >
                Book Trip
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightBooker;
