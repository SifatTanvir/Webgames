// ### 1. React Component (ShippingCalculator.tsx) ###
import React, { useState, useMemo, useRef, useEffect, FC } from "react";
import { useTaskAnalytics } from "../utils/useTaskAnalytics";

// --- Task Configuration ---
export const TASK_ID_ShippingCalculator = "ecommerce-delivery-calculateshippingcost";
export const PASSWORD_ShippingCalculator = "VELOCITY";

// --- Static Validation Data (Pattern A) ---
const CORRECT_VALUES = {
  origin: "Canada",
  destination: "Mexico",
  weight: "15",
  length: "40",
  width: "30",
  height: "20",
  service: "priority-express",
};

// --- Component Data ---
const COUNTRIES = ["USA", "Canada", "Mexico", "Brazil", "Germany", "France", "UK", "Japan", "Australia", "China"];
const ALL_SERVICES = [
  { id: "standard-ground", name: "Standard Ground", time: "5-7 Business Days", baseRate: 1.5, perKg: 0.5, icon: 'truck', description: "Reliable and cost-effective delivery for less urgent, domestic shipments." },
  { id: "priority-express", name: "Priority Express", time: "1-2 Business Days", baseRate: 5.0, perKg: 1.5, icon: 'plane', description: "Our fastest shipping option for time-sensitive packages, available worldwide." },
  { id: "economy-air", name: "Economy Air", time: "3-5 Business Days", baseRate: 3.0, perKg: 1.0, icon: 'air', description: "A balance of speed and cost for international shipping." },
  { id: "international-sea", name: "International Sea Freight", time: "15-30 Business Days", baseRate: 0.8, perKg: 0.2, icon: 'ship', description: "The most economical choice for large or heavy international shipments." },
];

// --- SVG Icon Components ---
const LocationPinIcon = ({ className }: { className?: string }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>);
const PackageIcon = ({ className }: { className?: string }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor"><path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" /><path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" /></svg>);
const CheckCircleIcon = ({ className }: { className?: string }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const GlobeIcon = ({ className }: { className?: string }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.758 16.242a3.5 3.5 0 01-4.474 0l-.001-.001a3.5 3.5 0 010-4.474l.001-.001a3.5 3.5 0 014.474 0l-.001.001zM16.242 7.758a3.5 3.5 0 010 4.474l-.001.001a3.5 3.5 0 01-4.474 0l.001-.001a3.5 3.5 0 010-4.474l-.001-.001a3.5 3.5 0 014.474 0z" /></svg>);
const ShieldCheckIcon = ({ className }: { className?: string }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>);
const LightningBoltIcon = ({ className }: { className?: string }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>);
const TruckIcon = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1z" /><path strokeLinecap="round" strokeLinejoin="round" d="M18 17h-5l-2-2" /></svg>;
const PaperAirplaneIcon = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>;
const MailIcon = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;


// --- Reusable Input Component with Decimal Validation ---
const InputField = ({ label, value, onChange, placeholder, unit, id }: { label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder: string, unit: string, id: string }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input type="text" inputMode="decimal" name={id} id={id} className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 pl-4 py-3 sm:text-sm border-gray-300 rounded-md" placeholder={placeholder} value={value} onChange={onChange}/>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"><span className="text-gray-500 sm:text-sm">{unit}</span></div>
      </div>
    </div>
);

// --- New Page Components ---
const CalculatorPage = ({ calculatorRef, ...props }: any) => (
    <div ref={calculatorRef} id="calculator" className="relative max-w-3xl mx-auto bg-white p-8 sm:p-10 rounded-xl shadow-lg -mt-16 z-10 scroll-mt-20">
        <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">Quickly estimate your shipping costs. Fill in the details below to get an instant quote for your package.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
            <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center"><LocationPinIcon className="h-6 w-6 mr-2 text-indigo-600" /> Shipment Route</h2>
                <div className="space-y-4">
                    <select id="origin" value={props.origin} onChange={e => props.setOrigin(e.target.value)} className="w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                        <option value="">Select Origin Country</option>
                        {COUNTRIES.map(c => <option key={`from-${c}`} value={c}>{c}</option>)}
                    </select>
                    <select id="destination" value={props.destination} onChange={e => props.setDestination(e.target.value)} className="w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                        <option value="">Select Destination Country</option>
                        {COUNTRIES.map(c => <option key={`to-${c}`} value={c}>{c}</option>)}
                    </select>
                </div>
            </div>
            <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center"><PackageIcon className="h-6 w-6 mr-2 text-indigo-600" /> Package Details</h2>
                <div className="space-y-4">
                    <InputField label="Weight" id="weight" value={props.weight} onChange={props.handleDecimalChange(props.setWeight)} placeholder="0" unit="kg" />
                    <div className="grid grid-cols-3 gap-4">
                    <InputField label="Length" id="length" value={props.length} onChange={props.handleDecimalChange(props.setLength)} placeholder="0" unit="cm" />
                    <InputField label="Width" id="width" value={props.width} onChange={props.handleDecimalChange(props.setWidth)} placeholder="0" unit="cm" />
                    <InputField label="Height" id="height" value={props.height} onChange={props.handleDecimalChange(props.setHeight)} placeholder="0" unit="cm" />
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Service Type</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {props.shuffledServices.map((s:any) => (<label key={s.id} htmlFor={s.id} className={`relative flex p-4 border rounded-lg cursor-pointer transition-all ${props.service === s.id ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-500' : 'border-gray-300 bg-white hover:bg-gray-50'}`}><input type="radio" name="service-type" id={s.id} value={s.id} checked={props.service === s.id} onChange={e => props.setService(e.target.value)} className="sr-only" /><div className="flex-1 flex flex-col"><span className="text-base font-medium text-gray-900">{s.name}</span><span className="text-sm text-gray-500 mt-1">{s.time}</span></div></label>))}
            </div>
        </div>
        <div className="mt-8 border-t pt-6 flex justify-end"><button onClick={props.handleCalculate} disabled={props.isFormIncomplete} className="w-full md:w-auto inline-flex justify-center items-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">Calculate Shipping</button></div>
        {props.submitted && props.result && (<div className="mt-10 p-6 bg-indigo-50 rounded-lg"><h3 className="text-lg font-medium leading-6 text-indigo-900">Your Shipping Estimate</h3><div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4"><div className="text-center sm:text-left"><p className="text-sm text-indigo-700">Estimated Delivery</p><p className="text-lg font-semibold text-indigo-900">{props.result.time}</p></div><div className="text-center sm:text-right"><p className="text-sm text-indigo-700">Estimated Cost</p><p className="text-4xl font-bold text-indigo-600">${props.result.cost.toLocaleString()}</p></div></div>{props.showPassword && (<div className="mt-6 border-t border-dashed border-indigo-200 pt-5"><div className="flex items-start p-4 bg-green-50 border-l-4 border-green-400 rounded-md"><div className="flex-shrink-0"><CheckCircleIcon className="h-6 w-6 text-green-500" /></div><div className="ml-3 flex-1"><h3 className="text-sm font-medium text-green-800">Calculation Confirmed</h3><div className="mt-2 text-sm text-green-700"><p>Please use the following password to complete your task:</p><div className="mt-2 p-3 bg-white border border-green-200 rounded-md font-mono text-xl text-center tracking-widest text-gray-800 select-all">{PASSWORD_ShippingCalculator}</div></div></div></div></div>)}</div>)}
    </div>
);

const ServicesPage = () => {
    const serviceIcons: { [key: string]: JSX.Element } = {
        truck: <TruckIcon className="h-8 w-8 text-white" />,
        plane: <PaperAirplaneIcon className="h-8 w-8 text-white" />,
        air: <PaperAirplaneIcon className="h-8 w-8 text-white" />,
        ship: <GlobeIcon className="h-8 w-8 text-white" />,
    };
    return(
        <div className="relative max-w-3xl mx-auto bg-white p-8 sm:p-10 rounded-xl shadow-lg -mt-16 z-10 scroll-mt-20">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center">Our Shipping Services</h2>
            <p className="mt-4 text-lg text-gray-500 text-center">Tailored solutions for every need and budget.</p>
            <div className="mt-12 space-y-8">
                {ALL_SERVICES.map(service => (
                    <div key={service.id} className="flex items-start gap-6">
                        <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-indigo-600">
                            {serviceIcons[service.icon]}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">{service.name}</h3>
                            <p className="text-indigo-600 font-semibold">{service.time}</p>
                            <p className="mt-2 text-gray-600">{service.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const TrackPackagePage = () => (
    <div className="relative max-w-3xl mx-auto bg-white p-8 sm:p-10 rounded-xl shadow-lg -mt-16 z-10 scroll-mt-20">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">Track Your Shipment</h2>
        <p className="mt-4 text-lg text-gray-500 text-center">Enter your tracking number below for real-time updates.</p>
        <div className="mt-8 flex gap-2">
            <input type="text" placeholder="e.g., SS123456789" className="flex-grow focus:ring-indigo-500 focus:border-indigo-500 block w-full px-4 py-3 sm:text-sm border-gray-300 rounded-md" />
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">Track</button>
        </div>
        <div className="mt-8 h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Tracking information will appear here.</p>
        </div>
    </div>
);

const ContactUsPage = () => (
    <div className="relative max-w-3xl mx-auto bg-white p-8 sm:p-10 rounded-xl shadow-lg -mt-16 z-10 scroll-mt-20">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">Get In Touch</h2>
        <p className="mt-4 text-lg text-gray-500 text-center">We're here to help. Reach out to us with any questions.</p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800">Contact Information</h3>
                <p className="flex items-center gap-3"><LocationPinIcon className="h-5 w-5 text-indigo-600" /> 123 Shipping Lane, Metropolis, 10101</p>
                <p className="flex items-center gap-3"><MailIcon className="h-5 w-5 text-indigo-600" /> support@shipswift.com</p>
                <p className="flex items-center gap-3"><LightningBoltIcon className="h-5 w-5 text-indigo-600" /> 1-800-555-SWFT</p>
            </div>
            <form className="space-y-4">
                <input type="text" placeholder="Your Name" className="w-full px-4 py-3 border-gray-300 rounded-md" />
                <input type="email" placeholder="Your Email" className="w-full px-4 py-3 border-gray-300 rounded-md" />
                <textarea placeholder="Your Message" rows={4} className="w-full px-4 py-3 border-gray-300 rounded-md"></textarea>
                <button type="submit" onClick={e => e.preventDefault()} className="w-full py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md font-semibold">Send Message</button>
            </form>
        </div>
    </div>
);


const ShippingCalculator = () => {
  const [activeView, setActiveView] = useState('calculator');
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [service, setService] = useState("");
  const [result, setResult] = useState<{ cost: number; time: string; } | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { recordSuccess } = useTaskAnalytics(TASK_ID_ShippingCalculator);

  const calculatorRef = useRef<HTMLElement>(null);

  const shuffledServices = useMemo(() => [...ALL_SERVICES].sort(() => Math.random() - 0.5), []);
  const heroImage = useMemo(() => `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/1200/400`, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeView]);

  const handleDecimalChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) { setter(value); }
  };

  const handleCalculate = () => {
    setSubmitted(true);
    const isCorrect = origin === CORRECT_VALUES.origin && destination === CORRECT_VALUES.destination && weight === CORRECT_VALUES.weight && length === CORRECT_VALUES.length && width === CORRECT_VALUES.width && height === CORRECT_VALUES.height && service === CORRECT_VALUES.service;
    
    if (!showPassword) {
      if (isCorrect && !hasFailed) {
        setShowPassword(true);
        recordSuccess();
      } else if (!isCorrect) {
        setHasFailed(true);
      }
    }
    
    const selectedServiceData = ALL_SERVICES.find(s => s.id === service);
    const weightNum = parseFloat(weight) || 0;
    let calculatedCost: number, deliveryTime: string;

    if(selectedServiceData){
      calculatedCost = selectedServiceData.baseRate + (selectedServiceData.perKg * weightNum);
      deliveryTime = selectedServiceData.time;
    } else {
      calculatedCost = 0;
      deliveryTime = "N/A";
    }
    
    setResult({ cost: parseFloat(calculatedCost.toFixed(2)), time: deliveryTime });
  };
  
  const isFormIncomplete = !origin || !destination || !weight || !length || !width || !height || !service;

  const NavLink: FC<{ view: string; children: React.ReactNode }> = ({ view, children }) => (
    <a href="#" onClick={(e) => { e.preventDefault(); setActiveView(view); }}
        className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium
            ${activeView === view ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}>
        {children}
    </a>
  );

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center"><PackageIcon className="h-8 w-8 text-indigo-600" /><span className="ml-2 text-xl font-bold text-gray-800">ShipSwift</span></div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavLink view="calculator">Calculator</NavLink>
              <NavLink view="services">Services</NavLink>
            </div>
            <div className="hidden sm:flex items-center">
              {/* <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900">Login</a> */}
            </div>
          </div>
        </nav>
      </header>

      <div className="relative bg-gray-200">
        <img src={heroImage} alt="Global logistics theme" className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-4xl font-extrabold text-white tracking-tight text-center px-4">Global Shipping Calculator</h1>
        </div>
      </div>
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {activeView === 'calculator' && 
            <CalculatorPage
                calculatorRef={calculatorRef}
                origin={origin} setOrigin={setOrigin}
                destination={destination} setDestination={setDestination}
                weight={weight} setWeight={setWeight}
                length={length} setLength={setLength}
                width={width} setWidth={setWidth}
                height={height} setHeight={setHeight}
                service={service} setService={setService}
                result={result}
                showPassword={showPassword}
                submitted={submitted}
                handleDecimalChange={handleDecimalChange}
                handleCalculate={handleCalculate}
                isFormIncomplete={isFormIncomplete}
                shuffledServices={shuffledServices}
            />
        }
        {activeView === 'services' && <ServicesPage />}
        {activeView === 'track' && <TrackPackagePage />}
        {activeView === 'contact' && <ContactUsPage />}

        <section className="py-16 sm:py-24"><div className="max-w-xl mx-auto text-center"><h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Why Choose ShipSwift?</h2><p className="mt-4 text-lg text-gray-500">We provide reliable and fast shipping solutions tailored to your needs.</p></div><div className="mt-12 grid gap-8 md:grid-cols-3"><div className="text-center"><div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto"><GlobeIcon className="h-6 w-6"/></div><div className="mt-5"><h3 className="text-lg leading-6 font-medium text-gray-900">Global Reach</h3><p className="mt-2 text-base text-gray-500">Ship to over 200 countries with our expansive logistics network.</p></div></div><div className="text-center"><div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto"><ShieldCheckIcon className="h-6 w-6"/></div><div className="mt-5"><h3 className="text-lg leading-6 font-medium text-gray-900">Secure Handling</h3><p className="mt-2 text-base text-gray-500">Your packages are handled with the utmost care and security.</p></div></div><div className="text-center"><div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto"><LightningBoltIcon className="h-6 w-6"/></div><div className="mt-5"><h3 className="text-lg leading-6 font-medium text-gray-900">Fast Delivery</h3><p className="mt-2 text-base text-gray-500">Choose from a range of express services for time-sensitive deliveries.</p></div></div></div></section>
      </main>
      <footer className="bg-white border-t border-gray-200"><div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8"><div className="grid grid-cols-2 md:grid-cols-4 gap-8"><div><h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Solutions</h3><ul className="mt-4 space-y-4"><li><a href="#" className="text-base text-gray-500 hover:text-gray-900">E-commerce</a></li><li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Freight</a></li><li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Enterprise</a></li></ul></div><div><h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Company</h3><ul className="mt-4 space-y-4"><li><a href="#" className="text-base text-gray-500 hover:text-gray-900">About</a></li><li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Careers</a></li><li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Press</a></li></ul></div><div><h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Legal</h3><ul className="mt-4 space-y-4"><li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Privacy</a></li><li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Terms</a></li></ul></div><div><h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Connect</h3><div className="flex space-x-6 mt-4"><a href="#" className="text-gray-400 hover:text-gray-500"><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg></a></div></div></div><div className="mt-8 border-t border-gray-200 pt-8"><p className="text-base text-gray-400 text-center">© {new Date().getFullYear()} ShipSwift Logistics. All rights reserved.</p></div></div></footer>
    </div>
  );
};

export default ShippingCalculator;