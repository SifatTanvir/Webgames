// ### 1. React Component (FlightsBookCheapest.tsx) ###
import React, { useState, useMemo, useCallback } from 'react';
import { useTaskAnalytics } from '../utils/useTaskAnalytics';

// ### EXPORTED CONSTANTS ###
export const TASK_ID_FlightsBookCheapest = "eBookings-flights-bookcheapest1";
export const PASSWORD_FlightsBookCheapest = "FlightBooked";

// ### TYPE DEFINITIONS ###
interface Flight {
  id: string;
  airline: string;
  from: { code: string; city: string };
  to: { code: string; city: string };
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
}

type SortKey = 'price' | 'duration' | 'departureTime';
type SortDirection = 'ascending' | 'descending';
type Page = 'list' | 'confirmation';

// ### SVG ICONS ###
const PlaneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
);


// ### MAIN COMPONENT ###
const FlightsBookCheapest: React.FC = () => {
    const { recordSuccess } = useTaskAnalytics(TASK_ID_FlightsBookCheapest);
    
    const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection }>({ key: 'departureTime', direction: 'ascending' });
    const [page, setPage] = useState<Page>('list');
    const [isTaskSuccessful, setIsTaskSuccessful] = useState(false);
    const [bookedFlight, setBookedFlight] = useState<Flight | null>(null);

    const flightData = useMemo(() => {
        const airlines = [
            { name: "AeroSwift", logo: "✈️" },
            { name: "Velocity Air", logo: "🚀" },
            { name: "Horizon Wings", logo: "🌍" },
            { name: "Quantum Jet", logo: "✨" },
            { name: "Starlight Airways", logo: "🌟" },
        ];

        const generateRandomTime = () => {
            const hour = String(Math.floor(Math.random() * 24)).padStart(2, '0');
            const minute = String(Math.floor(Math.random() * 60)).padStart(2, '0');
            return `${hour}:${minute}`;
        };

        let flights: Flight[] = Array.from({ length: 5 }, (_, i) => {
            const departureTime = generateRandomTime();
            const arrivalHour = (parseInt(departureTime.split(':')[0]) + Math.floor(Math.random() * 8) + 2) % 24;
            const arrivalTime = `${String(arrivalHour).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`;
            const durationHours = Math.abs(arrivalHour - parseInt(departureTime.split(':')[0]));
            const durationMinutes = Math.abs(parseInt(arrivalTime.split(':')[1]) - parseInt(departureTime.split(':')[1]));

            return {
                id: `flight-${i}-${Date.now()}`,
                airline: airlines[i % airlines.length].name,
                airlineLogoUrl: `https://via.placeholder.com/40x40.png?text=${airlines[i % airlines.length].logo}`,
                from: { code: 'JFK', city: 'New York' },
                to: { code: 'LAX', city: 'Los Angeles' },
                departureTime,
                arrivalTime,
                duration: `${durationHours}h ${durationMinutes}m`,
                price: Math.floor(Math.random() * (600 - 150 + 1)) + 150,
            };
        });

        const cheapestFlight = [...flights].sort((a, b) => a.price - b.price)[0];
        
        // Shuffle the array for initial display
        flights.sort(() => Math.random() - 0.5);
        
        return {
            flights,
            cheapestFlightId: cheapestFlight.id,
        };
    }, []);

    const sortedFlights = useMemo(() => {
        const sortableFlights = [...flightData.flights];
        sortableFlights.sort((a, b) => {
            let aValue: string | number = a[sortConfig.key];
            let bValue: string | number = b[sortConfig.key];
    
            if (sortConfig.key === 'duration') {
                const parseDuration = (d: string) => {
                    const parts = d.match(/(\d+)h\s*(\d+)m/);
                    return parts ? parseInt(parts[1]) * 60 + parseInt(parts[2]) : 0;
                };
                aValue = parseDuration(a.duration);
                bValue = parseDuration(b.duration);
            }
    
            if (aValue < bValue) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
        return sortableFlights;
    }, [flightData.flights, sortConfig]);

    const handleBookFlight = useCallback((flight: Flight) => {
        setBookedFlight(flight);
        if (flight.id === flightData.cheapestFlightId) {
            setIsTaskSuccessful(true);
            recordSuccess();
        }
        setPage('confirmation');
    }, [flightData.cheapestFlightId, recordSuccess]);
    
    const handleReturnHome = () => {
        setPage('list');
        setBookedFlight(null);
    }

    return (
        <div className="bg-slate-50 min-h-screen font-sans flex flex-col">
            <header className="bg-blue-600 text-white shadow-lg sticky top-0 z-20">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center space-x-3 cursor-pointer" onClick={handleReturnHome}>
                            <PlaneIcon />
                            <span className="text-2xl font-bold tracking-tight">eBookings Flights</span>
                        </div>
                    </div>
                </nav>
            </header>

            {isTaskSuccessful && (
                <div className="bg-green-600 text-white py-3 shadow-lg animate-fade-in sticky top-20 z-10">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p className="font-bold">
                            Task Complete! Secret Password: <span className="font-mono bg-green-700 px-2 py-1 rounded-md">{PASSWORD_FlightsBookCheapest}</span>
                        </p>
                    </div>
                </div>
            )}

            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex-grow w-full">
                {page === 'list' ? (
                    <div className="animate-fade-in">
                        <section className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 mb-8">
                            <h1 className="text-3xl font-extrabold text-slate-800">Find your next flight</h1>
                            <p className="text-slate-600 mt-2">One-way flight from New York (JFK) to Los Angeles (LAX)</p>
                        </section>

                        <section className="bg-white p-4 rounded-xl shadow-md border border-slate-200 mb-8">
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <span className="text-sm font-medium text-slate-600">Sort by:</span>
                                <select
                                    aria-label="Sort by criteria"
                                    value={sortConfig.key}
                                    onChange={(e) => setSortConfig({ ...sortConfig, key: e.target.value as SortKey })}
                                    className="w-full sm:w-auto px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                                >
                                    <option value="price">Price</option>
                                    <option value="duration">Duration</option>
                                    <option value="departureTime">Departure Time</option>
                                </select>
                                <select
                                    aria-label="Sort direction"
                                    value={sortConfig.direction}
                                    onChange={(e) => setSortConfig({ ...sortConfig, direction: e.target.value as SortDirection })}
                                    className="w-full sm:w-auto px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                                >
                                    <option value="ascending">Ascending</option>
                                    <option value="descending">Descending</option>
                                </select>
                            </div>
                        </section>

                        <div className="space-y-4">
                            {sortedFlights.map((flight) => (
                                <article key={flight.id} className="bg-white p-4 rounded-xl shadow-lg border border-slate-200 flex flex-col sm:flex-row items-center gap-4 transition-shadow hover:shadow-xl">
                                    <div className="flex-none w-full sm:w-1/4 flex items-center gap-3">
                                        <span className="font-semibold text-slate-800">{flight.airline}</span>
                                    </div>
                                    <div className="flex-grow w-full sm:w-1/2 flex items-center justify-between">
                                        <div className="text-center">
                                            <div className="text-xl font-bold text-slate-900">{flight.departureTime}</div>
                                            <div className="text-sm text-slate-500">{flight.from.code}</div>
                                        </div>
                                        <div className="flex-grow flex flex-col items-center text-slate-500 px-2">
                                            <span className="text-xs">{flight.duration}</span>
                                            <ArrowRightIcon />
                                            <span className="text-xs">Nonstop</span>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-xl font-bold text-slate-900">{flight.arrivalTime}</div>
                                            <div className="text-sm text-slate-500">{flight.to.code}</div>
                                        </div>
                                    </div>
                                    <div className="flex-none w-full sm:w-1/4 flex flex-col items-end gap-2">
                                        <div className="text-2xl font-bold text-slate-800">${flight.price.toFixed(2)}</div>
                                        <button 
                                            onClick={() => handleBookFlight(flight)}
                                            className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            Book Flight
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="animate-fade-in text-center max-w-2xl mx-auto bg-white p-10 rounded-2xl shadow-2xl border border-slate-200">
                        <CheckCircleIcon />
                        <h1 className="text-4xl font-extrabold text-slate-800 mt-4">Booking Confirmed!</h1>
                        {bookedFlight && (
                            <div className="mt-6 text-left border-t border-b border-slate-200 py-4">
                                <h2 className="text-xl font-bold text-slate-700 mb-3 text-center">Your Itinerary</h2>
                                <p className="text-slate-600"><span className="font-semibold">Airline:</span> {bookedFlight.airline}</p>
                                <p className="text-slate-600"><span className="font-semibold">From:</span> {bookedFlight.from.city} ({bookedFlight.from.code})</p>
                                <p className="text-slate-600"><span className="font-semibold">To:</span> {bookedFlight.to.city} ({bookedFlight.to.code})</p>
                                <p className="text-slate-600"><span className="font-semibold">Departure:</span> {bookedFlight.departureTime}</p>
                                <p className="text-slate-600"><span className="font-semibold">Total Price:</span> <span className="font-bold">${bookedFlight.price.toFixed(2)}</span></p>
                            </div>
                        )}
                        <p className="mt-6 text-slate-500 text-lg">A confirmation email has been sent. Thank you for booking with us.</p>
                        <button onClick={handleReturnHome} className="mt-8 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors">
                            Book Another Flight
                        </button>
                    </div>
                )}
            </main>
            <footer className="bg-slate-800 text-slate-400 py-8 mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
                    <p className="mb-2">© {new Date().getFullYear()} eBookings Corporation. All Rights Reserved.</p>
                    <div className="flex justify-center space-x-4">
                        <a href="#" className="hover:text-white">Privacy Policy</a>
                        <span>·</span>
                        <a href="#" className="hover:text-white">Terms of Service</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default FlightsBookCheapest;

