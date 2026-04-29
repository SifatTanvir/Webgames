import React, { useState, useMemo, useEffect } from "react";
import { useTaskAnalytics } from "../utils/useTaskAnalytics";

export const PASSWORD_CheapestFlight = "FlyAirways";

export const TASK_ID_CheapestFlight = "ebookings-flights-bookcheapest";

interface FlightTicketData {
  id: number;
  airline: string;
  airlineLogo: React.ReactNode;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
}

const PlaneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-white transform -rotate-45 -translate-y-1"
  >
    <path d="M2 21h12l7-7-7-7H2v4l7 3-7 3v4z" />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const SuccessIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-green-500"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const airlines = [
  "Delta",
  "American Airlines",
  "United",
  "Southwest",
  "JetBlue",
  "Alaska",
  "Spirit",
  "Frontier",
  "British Airways",
  "Lufthansa",
  "Air France",
  "KLM",
  "Emirates",
  "Qatar Airways",
  "Singapore Airlines",
  "Cathay Pacific",
  "Qantas",
  "ANA",
  "JAL",
  "Turkish Airlines",
  "Etihad",
  "Virgin Atlantic",
  "Swiss",
  "Austrian",
  "SAS",
  "Finnair",
  "Iberia",
  "Aer Lingus",
  "LATAM",
  "Copa Airlines",
  "WestJet",
  "Air Canada",
];

const cities = [
  "New York",
  "London",
  "Paris",
  "Tokyo",
  "Dubai",
  "Los Angeles",
  "Singapore",
  "Hong Kong",
  "Sydney",
  "Chicago",
];

const generateMockFlights = (count: number): FlightTicketData[] => {
  const flights: FlightTicketData[] = [];
  for (let i = 1; i <= count; i++) {
    const fromCity = cities[Math.floor(Math.random() * cities.length)];
    let toCity = cities[Math.floor(Math.random() * cities.length)];
    while (fromCity === toCity) {
      toCity = cities[Math.floor(Math.random() * cities.length)];
    }

    const departureHour = Math.floor(Math.random() * 24);
    const departureMinute = Math.floor(Math.random() * 60);
    const durationHours = Math.floor(Math.random() * 12) + 2;
    const durationMinutes = Math.floor(Math.random() * 60);
    const arrivalHour =
      (departureHour +
        durationHours +
        Math.floor((departureMinute + durationMinutes) / 60)) %
      24;
    const arrivalMinute = (departureMinute + durationMinutes) % 60;

    flights.push({
      id: i,
      airline: airlines[i % airlines.length],
      airlineLogo: (
        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
          {airlines[i % airlines.length].charAt(0)}
        </div>
      ),
      from: fromCity,
      to: toCity,
      departureTime: `${String(departureHour).padStart(2, "0")}:${String(
        departureMinute,
      ).padStart(2, "0")}`,
      arrivalTime: `${String(arrivalHour).padStart(2, "0")}:${String(
        arrivalMinute,
      ).padStart(2, "0")}`,
      duration: `${durationHours}h ${durationMinutes}m`,
      price: Math.floor(Math.random() * 1800) + 200,
    });
  }
  return flights;
};

const mockFlights = generateMockFlights(52);

const SuccessModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 m-4 max-w-sm w-full text-center transform scale-95 hover:scale-100 transition-transform duration-300">
        <div className="flex justify-center mb-4">
          <SuccessIcon />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Booking Successful!
        </h2>
        <p className="text-slate-400 mb-6">
          Congratulations! You've booked the best deal available.
        </p>
        <button
          onClick={onClose}
          className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-500 transition-colors duration-300 w-full flex items-center justify-center gap-2"
        >
          <CloseIcon /> Close
        </button>
      </div>
    </div>
  );
};

// Flight Ticket Card Component
const FlightTicket: React.FC<{
  ticket: FlightTicketData;
  onBook: (price: number) => void;
}> = ({ ticket, onBook }) => {
  return (
    <div className="bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row items-center gap-6">
      <div className="flex items-center gap-4 w-full sm:w-1/3">
        {ticket.airlineLogo}
        <span className="font-semibold text-white text-lg">
          {ticket.airline}
        </span>
      </div>
      <div className="flex-grow flex items-center justify-between w-full">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">
            {ticket.departureTime}
          </div>
          <div className="text-sm text-slate-400">{ticket.from}</div>
        </div>
        <div className="text-center text-slate-500 flex items-center gap-2">
          <div className="w-12 h-px bg-slate-600"></div>
          <PlaneIcon />
          <div className="w-12 h-px bg-slate-600"></div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">
            {ticket.arrivalTime}
          </div>
          <div className="text-sm text-slate-400">{ticket.to}</div>
        </div>
      </div>
      <div className="w-full sm:w-1/4 flex flex-col items-center sm:items-end gap-2">
        <div className="text-3xl font-bold text-indigo-400">
          ${ticket.price}
        </div>
        <button
          onClick={() => onBook(ticket.price)}
          className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-500 transition-colors w-full sm:w-auto"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default function CheapestFlight() {
  const { recordSuccess } = useTaskAnalytics(TASK_ID_CheapestFlight);

  // Initialize state with an empty array, to be populated by the shuffled data
  const [flights, setFlights] = useState<FlightTicketData[]>([]);
  const [sortBy, setSortBy] = useState<"price" | "departureTime" | "">("");
  const [orderBy, setOrderBy] = useState<"asc" | "desc" | "">("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskProgress, setTaskProgress] = useState({
    hasSortedByPrice: false,
    hasOrderedByAscending: false,
    hasBooked: false,
  });
  const [canComplete, setCanComplete] = useState(true);

  // Effect to shuffle flights on initial component mount
  useEffect(() => {
    // Fisher-Yates (aka Knuth) Shuffle algorithm
    const shuffleArray = (array: FlightTicketData[]) => {
      let currentIndex = array.length,
        randomIndex;
      // While there remain elements to shuffle.
      while (currentIndex !== 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }
      return array;
    };

    // Create a copy of mockFlights to avoid mutating the original array, then shuffle and set state
    const shuffled = shuffleArray([...mockFlights]);
    setFlights(shuffled);
  }, []); // The empty dependency array ensures this effect runs only once on mount

  const lowestPrice = useMemo(() => {
    // Guard against an empty flights array before calculating min price
    if (flights.length === 0) return 0;
    return Math.min(...flights.map((f) => f.price));
  }, [flights]);

  const sortedFlights = useMemo(() => {
    const sortableFlights = [...flights];
    if (!sortBy || !orderBy) {
      // Initially, this will return the shuffled list of flights
      return sortableFlights;
    }

    sortableFlights.sort((a, b) => {
      const valA = sortBy === "price" ? a.price : a.departureTime;
      const valB = sortBy === "price" ? b.price : b.departureTime;

      let comparison = 0;
      if (valA > valB) {
        comparison = 1;
      } else if (valA < valB) {
        comparison = -1;
      }

      return orderBy === "desc" ? comparison * -1 : comparison;
    });

    return sortableFlights;
  }, [flights, sortBy, orderBy]);

  const handleBookNow = (price: number) => {
    if (price === lowestPrice) {
      setIsModalOpen(true);
      if (
        canComplete &&
        taskProgress.hasSortedByPrice &&
        taskProgress.hasOrderedByAscending
      ) {
        setTaskProgress((prev) => ({
          ...prev,
          hasBooked: true,
        }));
      } else if (canComplete) {
        setCanComplete(false);
      }
    } else {
      console.log(`Booking flight with price: $${price}. (Not the cheapest)`);
      alert("Flight booked");
      setCanComplete(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const selectClassName =
    "bg-slate-700 text-white px-4 py-2 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer";

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    if (canComplete && Object.values(taskProgress).every((el) => el)) {
      window.scroll(0, 0);
      recordSuccess();
    }
  }, [recordSuccess, taskProgress, canComplete]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 font-sans p-4 sm:p-8">
      <SuccessModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-white mb-2">
            Flight Finder
          </h1>
          <p className="text-lg text-indigo-400">
            Your portal to the best flight deals across the globe.
          </p>
        </header>

        {Object.values(taskProgress).every((el) => el) ? (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 mb-8 flex flex-col sm:flex-row items-center justify-center gap-4 sticky top-4 z-10">
            <div className="text-lg font-semibold text-white">
              Secret Password:{" "}
              <span className="text-orange-400">{PASSWORD_CheapestFlight}</span>
            </div>
          </div>
        ) : null}

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-4 z-10">
          <div className="text-lg font-semibold text-white">
            Showing {sortedFlights.length} available flights
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="sort-by" className="text-slate-400 font-medium">
                Sort By:
              </label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => {
                  const value = e.target.value;

                  if (canComplete && value === "price") {
                    setTaskProgress((prev) => ({
                      ...prev,
                      hasSortedByPrice: true,
                    }));
                  } else if (canComplete) {
                    setCanComplete(false);
                  }

                  setSortBy(e.target.value as "price" | "departureTime" | "");
                }}
                className={selectClassName}
              >
                <option value="" disabled>
                  Select...
                </option>
                <option value="price">Price</option>
                <option value="departureTime">Departure Time</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="order-by" className="text-slate-400 font-medium">
                Order:
              </label>
              <select
                id="order-by"
                value={orderBy}
                onChange={(e) => {
                  const value = e.target.value;

                  if (
                    canComplete &&
                    taskProgress.hasSortedByPrice &&
                    value === "asc"
                  ) {
                    setTaskProgress((prev) => ({
                      ...prev,
                      hasOrderedByAscending: true,
                    }));
                  } else if (canComplete) {
                    setCanComplete(false);
                  }

                  setOrderBy(e.target.value as "asc" | "desc" | "");
                }}
                className={selectClassName}
              >
                <option value="" disabled>
                  Select...
                </option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>

        <main className="space-y-4">
          {sortedFlights.map((ticket) => (
            <FlightTicket
              key={ticket.id}
              ticket={ticket}
              onBook={handleBookNow}
            />
          ))}
        </main>
        <footer className="text-center mt-12 text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} Flight Finder. All rights
            reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
