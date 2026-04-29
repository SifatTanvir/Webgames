// ### 1. React Component (DeliveryRouteOptimizer.tsx) ###
import React, { useState, useMemo, useEffect } from 'react';
import { useTaskAnalytics } from "../utils/useTaskAnalytics";

// ### EXPORTED CONSTANTS ###
export const TASK_ID_DeliveryRouteOptimizer = "productivity-planner-transportationroute";
export const PASSWORD_DeliveryRouteOptimizer = "ROUTEOPTIMIZED";

// ### TYPE DEFINITIONS ###
type PackageSize = 'Small' | 'Medium' | 'Large' | 'XL';
interface Package {
  id: number;
  name: string;
  address: string;
  size: PackageSize;
  timeWindow: string;
  isHighPriority: boolean;
  zone: 'North' | 'South' | 'East' | 'West' | 'Downtown';
}
interface Vehicle {
  id: number;
  name: string;
  maxSize: PackageSize;
  description: string;
}
interface Constraint {
    id: string;
    type: 'Weather' | 'Traffic' | 'Vehicle';
    description: string;
    affects: string;
}

// ### SVG ICONS ###
const MapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 015 3h10a1 1 0 01.707.293l2 2a1 1 0 010 1.414l-2 2a1 1 0 01-.707.293H5a1 1 0 01-.707-.293l-2-2a1 1 0 010-1.414l2-2z" clipRule="evenodd" /></svg>;
const TruckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M11.91,1.81a2,2,0,0,0-1.82,0L4.32,5.25A2,2,0,0,0,3,7.06V16.5A1.5,1.5,0,0,0,4.5,18H6a1,1,0,0,0,1-1V13a1,1,0,0,1,1-1H9.5a1,1,0,0,1,1,1v4a1,1,0,0,0,1,1h1.5a1.5,1.5,0,0,0,1.5-1.5V7.06a2,2,0,0,0-1.32-1.81ZM10,11H7V8.86l3-1.72Zm2-4.14L15.68,8.6A1,1,0,0,1,15,10.32V12H12Z" /></svg>;
const ArrowUpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" /></svg>;
const ArrowDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;

// ### MAIN COMPONENT ###
const DeliveryRouteOptimizer: React.FC = () => {
    const { recordSuccess } = useTaskAnalytics(TASK_ID_DeliveryRouteOptimizer);
    
    const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(null);
    const [deliverySequence, setDeliverySequence] = useState<Package[]>([]);
    const [isSuccess, setIsSuccess] = useState(false);
    const [, setHasAttempted] = useState(false);
    const [simulationResultText, setSimulationResultText] = useState('');

    const { packages, vehicles, constraints } = useMemo(() => {
        const packagePool: Omit<Package, 'id' | 'coords'>[] = [
            { name: "Industrial Components", address: "88 Industrial Way", size: 'Large', timeWindow: 'Anytime', isHighPriority: false, zone: 'South' },
            { name: "Fresh Produce Box", address: "123 Main St", size: 'Medium', timeWindow: '9am - 12pm', isHighPriority: true, zone: 'Downtown' },
            { name: "Legal Documents", address: "45 Court Sq", size: 'Small', timeWindow: '2pm - 5pm', isHighPriority: true, zone: 'North' },
            { name: "Server Rack", address: "21 Tech Tower", size: 'XL', timeWindow: 'Anytime', isHighPriority: false, zone: 'East' },
            { name: "Medical Supplies", address: "77 Health Ave", size: 'Medium', timeWindow: '10am - 1pm', isHighPriority: true, zone: 'West' },
            { name: "Book Collection", address: "32 Knowledge Ln", size: 'Large', timeWindow: 'Anytime', isHighPriority: false, zone: 'North' },
            { name: "Art Supplies", address: "15 Creative Ct", size: 'Small', timeWindow: '1pm - 4pm', isHighPriority: false, zone: 'Downtown' },
            { name: "Office Furniture", address: "100 Business Blvd", size: 'XL', timeWindow: '9am - 5pm', isHighPriority: false, zone: 'South' },
            { name: "Catering Order", address: "500 Commerce St", size: 'Medium', timeWindow: '11am - 1pm', isHighPriority: true, zone: 'East' },
            { name: "Flower Delivery", address: "9 Gardenia Rd", size: 'Small', timeWindow: 'Anytime', isHighPriority: false, zone: 'West' },
        ];
        
        const numPackages = 5 + Math.floor(Math.random() * 4);
        const todaysPackages = [...packagePool].sort(() => 0.5 - Math.random()).slice(0, numPackages).map((p, i) => ({ ...p, id: i + 1, coords: {top: '0', left: '0'} }));

        const vehiclePool: Vehicle[] = [
            { id: 101, name: "Electric Cargo Bike", maxSize: 'Medium', description: 'Eco-friendly, best for Downtown.'},
            { id: 102, name: "Standard Delivery Van", maxSize: 'Large', description: 'Reliable for most package sizes.'},
            { id: 103, name: "Heavy Duty Truck", maxSize: 'XL', description: 'Required for XL packages.'},
        ];
        
        const constraintPool: Constraint[] = [
            { id: 'c1', type: 'Weather', description: "Heavy rain expected after 2 PM, causing major delays.", affects: 'All' },
            { id: 'c2', type: 'Traffic', description: "Parade route closes all roads in Downtown from 11 AM to 2 PM.", affects: 'Downtown'},
            { id: 'c3', type: 'Vehicle', description: "The Electric Cargo Bike is currently recharging, unavailable until 1 PM.", affects: 'Bike' },
            { id: 'c4', type: 'Traffic', description: "Bridge maintenance causing single-lane traffic to the North District.", affects: 'North' },
        ];
        const todaysConstraints = [...constraintPool].sort(() => 0.5 - Math.random()).slice(0, 3);
        
        return { 
            packages: todaysPackages, 
            vehicles: vehiclePool.sort(() => 0.5 - Math.random()), 
            constraints: todaysConstraints,
        };
    }, []);

    useEffect(() => {
        setDeliverySequence(packages);
    }, [packages]);
    
    const handleMove = (index: number, direction: 'up' | 'down') => {
        if ((direction === 'up' && index === 0) || (direction === 'down' && index === deliverySequence.length - 1)) return;
        const newSequence = [...deliverySequence];
        const item = newSequence.splice(index, 1)[0];
        newSequence.splice(direction === 'up' ? index - 1 : index + 1, 0, item);
        setDeliverySequence(newSequence);
    };

    const calculateEfficiency = () => {
        let score = 100;
        const sizeMap = { 'Small': 1, 'Medium': 2, 'Large': 3, 'XL': 4 };
        const selectedVehicle = vehicles.find(v => v.id === selectedVehicleId);

        if (!selectedVehicle) return { score: 0 };
        
        const maxPackageSize = Math.max(...deliverySequence.map(p => sizeMap[p.size]));
        if (sizeMap[selectedVehicle.maxSize] < maxPackageSize) score -= 50;
        else if (sizeMap[selectedVehicle.maxSize] > maxPackageSize + 1) score -= 15;

        let zoneHops = 0;
        for (let i = 1; i < deliverySequence.length; i++) {
            if (deliverySequence[i].zone !== deliverySequence[i-1].zone) zoneHops++;
        }
        const idealHops = new Set(deliverySequence.map(p => p.zone)).size - 1;
        if (zoneHops > idealHops + 1) score -= (zoneHops - idealHops) * 5;

        return { score: Math.max(0, score) };
    };

    const handleSubmit = () => {
        const { score } = calculateEfficiency();
        
        if (score > 90) {
            if (!isSuccess) {
                recordSuccess();
            }
            setIsSuccess(true);
            setSimulationResultText(`Optimal route found! Efficiency Score: ${score}%`);
        } else {
             setSimulationResultText(`Route simulated. Efficiency score: ${score}%.`);
        }
        setHasAttempted(true);
    };
    
    return (
        <div className="bg-slate-100 min-h-screen font-sans">
            <header className="bg-white shadow-sm sticky top-0 z-20">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center"><div className="flex items-center space-x-3"><MapIcon/><span className="text-2xl font-bold text-slate-800">LogicFlow Dispatch</span></div></nav>
            </header>
            {isSuccess && <div className="bg-green-600 text-white py-3 shadow-lg animate-fade-in"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"><p className="font-bold">Password: <span className="font-mono bg-green-700 px-2 py-1 rounded-md">{PASSWORD_DeliveryRouteOptimizer}</span></p></div></div>}
             <section className="relative bg-indigo-800 py-16 text-white overflow-hidden"><div className="absolute inset-0 opacity-10" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6h-2zM28 12c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6h-2zM46 14c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}></div><div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"><h1 className="text-4xl font-extrabold tracking-tight">Daily Delivery Route Planner</h1><p className="mt-4 max-w-2xl mx-auto text-indigo-200 text-lg">Optimize today's deliveries by synthesizing all active constraints to create the most efficient route.</p></div></section>

            <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white p-6 rounded-xl shadow-lg border">
                            <h2 className="text-xl font-bold text-slate-800 mb-4">Constraints & Conditions</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{constraints.map(c => <div key={c.id} className="p-3 bg-red-100 text-red-800 rounded-lg border border-red-200"><strong className="font-bold block">{c.type} Alert:</strong>{c.description}</div>)}</div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-lg border">
                            <h2 className="text-xl font-bold text-slate-800 mb-4">Today's Packages ({packages.length})</h2>
                            <div className="h-[34rem] overflow-y-auto pr-2 space-y-3">{packages.map(p => (<div key={p.id} className="p-3 bg-slate-50 rounded-md border grid grid-cols-3 gap-2 items-center"><div className="font-semibold">{p.name}</div><div className="text-sm text-slate-600">{p.address}, {p.zone}</div><div className="text-sm text-right">{p.isHighPriority && <span className="font-bold text-red-600 block">High Priority</span>}<span className="font-semibold">Size:</span> {p.size}<br/><span className="font-semibold">Window:</span> {p.timeWindow}</div></div>))}</div>
                        </div>
                    </div>
                    <div className="lg:col-span-1 space-y-8 lg:sticky top-24">
                        <div className="bg-white p-6 rounded-xl shadow-lg border">
                             <h2 className="text-xl font-bold text-slate-800 mb-4">Set Route Plan</h2>
                             <p className="text-sm text-slate-500 mb-3">Order the packages for delivery. #1 is the first stop.</p>
                             <div className="space-y-2 max-h-96 overflow-y-auto pr-2">{deliverySequence.map((p, index) => (<div key={p.id} className="p-2 bg-slate-100 rounded-lg flex items-center justify-between"><div className="flex items-center"><span className="text-lg font-bold text-indigo-600 w-8 text-center">{index + 1}</span><span className="font-semibold text-sm">{p.name}</span></div><div className="space-x-1"><button onClick={() => handleMove(index, 'up')} disabled={index===0} className="p-1.5 rounded-full bg-white hover:bg-slate-200 disabled:opacity-50"><ArrowUpIcon /></button><button onClick={() => handleMove(index, 'down')} disabled={index === deliverySequence.length - 1} className="p-1.5 rounded-full bg-white hover:bg-slate-200 disabled:opacity-50"><ArrowDownIcon /></button></div></div>))}</div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-lg border">
                            <h2 className="text-xl font-bold text-slate-800 mb-2">Select Vehicle</h2>
                            <fieldset className="space-y-3">{vehicles.map(v => (<label key={v.id} className={`flex p-3 border rounded-lg cursor-pointer transition-all ${selectedVehicleId === v.id ? 'border-indigo-500 ring-2 ring-indigo-500' : 'border-slate-300'}`}><input type="radio" name="vehicle" value={v.id} checked={selectedVehicleId === v.id} onChange={(e) => setSelectedVehicleId(Number(e.target.value))} className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 mt-1" /><span className="ml-3"><span className="font-bold text-slate-800 block">{v.name}</span><span className="text-sm text-slate-600">{v.description}</span></span></label>))}
                            </fieldset>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-lg border">
                            <h2 className="text-xl font-bold text-slate-800 mb-2">Simulate Route</h2>
                            <button onClick={handleSubmit} disabled={!selectedVehicleId} className="w-full flex items-center justify-center bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-all disabled:bg-slate-400">
                                <TruckIcon /><span>Simulate Route</span>
                            </button>
                            {simulationResultText && <div className="mt-4 p-4 bg-slate-100 rounded-lg text-center font-semibold animate-fade-in">{simulationResultText}</div>}
                        </div>
                    </div>
                </div>
            </main>
            <footer className="bg-slate-800 text-slate-400 mt-12 py-8"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm"><p>© {new Date().getFullYear()} LogicFlow Dispatch Inc. All Rights Reserved.</p></div></footer>
             <style>{`.animate-fade-in { animation: fadeIn 0.5s ease-out; } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
        </div>
    );
};

export default DeliveryRouteOptimizer;