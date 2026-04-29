import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LineChart, Line, PieChart, Pie } from 'recharts';

// --- TYPES ---
interface TestResult {
    id: string;
    name: string;
    date: string;
    status: 'New' | 'Viewed';
}

interface BloodPanelDetail {
    value: number;
    unit: string;
    range: string;
    status?: 'normal' | 'high' | 'low';
}

interface Appointment {
    id: string;
    doctor: string;
    specialty: string;
    date: string;
    time: string;
    type?: string;
}

interface Message {
    id: string;
    from: string;
    subject: string;
    date: string;
    read: boolean;
    priority?: 'high' | 'medium' | 'low';
}

interface VitalSign {
    name: string;
    value: string;
    unit: string;
    status: 'good' | 'warning' | 'critical';
    icon: string;
}

// --- CONFIGURATION & STATIC DATA ---
export const TASK_ID_PatientPortalR = "health-patientportal-viewandsendtestresults";
export const PASSWORD_PatientPortalR = "HORIZON";  

// --- TASK DEFINITION ---
const taskDefinition = {
    testName: 'Blood Panel',
    doctorName: 'Dr. Evelyn Reed',
    message: "Could we please discuss these results at our next appointment?",
};

// --- ENHANCED DUMMY DATA FOR HEALTH PORTAL ---
const testResults: TestResult[] = [
    { id: 'tr1', name: 'Blood Panel', date: '2025-07-10', status: 'New' },
    { id: 'tr2', name: 'X-Ray: Chest', date: '2025-07-10', status: 'Viewed' },
    { id: 'tr3', name: 'Urinalysis', date: '2025-06-28', status: 'Viewed' },
    { id: 'tr4', name: 'Blood Panel', date: '2025-04-15', status: 'Viewed' },
    { id: 'tr5', name: 'MRI: Brain', date: '2025-03-22', status: 'Viewed' },
    { id: 'tr6', name: 'ECG', date: '2025-03-15', status: 'Viewed' },
];

const bloodPanelDetails: Record<string, BloodPanelDetail> = {
    'Cholesterol': { value: 198, unit: 'mg/dL', range: 'Below 200', status: 'normal' },
    'Glucose': { value: 95, unit: 'mg/dL', range: '70-100', status: 'normal' },
    'White Blood Cell Count': { value: 6.5, unit: 'x10^9/L', range: '4.5-11.0', status: 'normal' },
    'Red Blood Cell Count': { value: 4.8, unit: 'x10^12/L', range: '4.2-5.9', status: 'normal' },
    'Hemoglobin': { value: 14.2, unit: 'g/dL', range: '12.0-15.5', status: 'normal' },
    'Platelet Count': { value: 285, unit: 'x10^9/L', range: '150-450', status: 'normal' },
};

const appointments: Appointment[] = [
    { id: 'a1', doctor: 'Dr. Evelyn Reed', specialty: 'Primary Care', date: '2025-08-05', time: '10:30 AM', type: 'Follow-up' },
    { id: 'a2', doctor: 'Dr. Ben Carter', specialty: 'Cardiology', date: '2025-08-12', time: '02:00 PM', type: 'Consultation' },
    { id: 'a3', doctor: 'Dr. Sarah Johnson', specialty: 'Dermatology', date: '2025-08-20', time: '11:00 AM', type: 'Annual Check' },
];

const messages: Message[] = [
    { id: 'm1', from: 'Dr. Evelyn Reed', subject: 'Follow-up on your recent visit', date: '2025-07-08', read: false, priority: 'high' },
    { id: 'm2', from: 'Clinic Staff', subject: 'Appointment Reminder', date: '2025-06-10', read: true, priority: 'medium' },
    { id: 'm3', from: 'Lab Department', subject: 'New test results available', date: '2025-07-10', read: false, priority: 'high' },
    { id: 'm4', from: 'Pharmacy', subject: 'Prescription ready for pickup', date: '2025-07-05', read: true, priority: 'low' },
];

const vitalSigns: VitalSign[] = [
    { name: 'Blood Pressure', value: '120/80', unit: 'mmHg', status: 'good', icon: '🫀' },
    { name: 'Heart Rate', value: '72', unit: 'bpm', status: 'good', icon: '💓' },
    { name: 'Temperature', value: '98.6', unit: '°F', status: 'good', icon: '🌡️' },
    { name: 'Weight', value: '165', unit: 'lbs', status: 'good', icon: '⚖️' },
    { name: 'BMI', value: '24.2', unit: '', status: 'good', icon: '📊' },
    { name: 'O2 Saturation', value: '98', unit: '%', status: 'good', icon: '🫁' },
];

const healthMetricsData = [
    { month: 'Jan', weight: 168, bloodPressure: 125, heartRate: 75 },
    { month: 'Feb', weight: 167, bloodPressure: 122, heartRate: 73 },
    { month: 'Mar', weight: 166, bloodPressure: 120, heartRate: 72 },
    { month: 'Apr', weight: 165, bloodPressure: 118, heartRate: 71 },
    { month: 'May', weight: 165, bloodPressure: 120, heartRate: 72 },
    { month: 'Jun', weight: 164, bloodPressure: 119, heartRate: 70 },
];

const medicationAdherence = [
    { name: 'Taken', value: 85, color: '#10b981' },
    { name: 'Missed', value: 15, color: '#ef4444' },
];

// --- UI SUB-COMPONENTS ---
const Header: React.FC = () => (
    <header className="w-full p-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white sticky top-0 z-30 shadow-lg">
        <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-full">
                    <span className="text-2xl">🏥</span>
                </div>
                <div>
                    <h1 className="text-3xl font-bold">MyHealth Portal</h1>
                    <p className="text-blue-100 text-sm">Your comprehensive health dashboard</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="bg-blue-700 px-3 py-1 rounded-full text-sm">
                    <span>Patient ID: {useMemo(() => `98-45B-${Math.floor(Math.random() * 90) + 10}`, [])}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="bg-green-500 w-3 h-3 rounded-full animate-pulse"></div>
                    <span className="text-sm">Online</span>
                </div>
                <img src="https://i.pravatar.cc/150?u=patient" alt="User Avatar" className="w-12 h-12 rounded-full border-2 border-blue-300" />
            </div>
        </div>
    </header>
);

const Sidebar: React.FC<{ activeView: string, setActiveView: (view: string) => void }> = ({ activeView, setActiveView }) => {
    const links = [
        { id: 'dashboard', name: 'Dashboard', icon: '📊', color: 'from-blue-500 to-blue-600' },
        { id: 'results', name: 'Test Results', icon: '🔬', color: 'from-green-500 to-green-600' },
        { id: 'appointments', name: 'Appointments', icon: '🗓️', color: 'from-purple-500 to-purple-600' },
        { id: 'messages', name: 'Messages', icon: '✉️', color: 'from-orange-500 to-orange-600' },
        { id: 'medications', name: 'Medications', icon: '💊', color: 'from-red-500 to-red-600' },
        { id: 'vitals', name: 'Vital Signs', icon: '🫀', color: 'from-pink-500 to-pink-600' },
    ];
    
    return (
        <aside className="w-72 bg-white p-6 border-r border-gray-200 h-screen sticky top-0 shadow-sm">
            <nav className="space-y-3">
                {links.map(link => (
                    <button 
                        key={link.id} 
                        onClick={() => setActiveView(link.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl text-left font-semibold transition-all duration-200 transform hover:scale-105 ${
                            activeView === link.id 
                                ? `bg-gradient-to-r ${link.color} text-white shadow-lg` 
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                        }`}
                    >
                        <span className="text-2xl">{link.icon}</span>
                        <div>
                            <div>{link.name}</div>
                            {activeView === link.id && <div className="text-xs opacity-80">Active</div>}
                        </div>
                    </button>
                ))}
            </nav>
            
            <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                <h3 className="font-bold text-blue-800 mb-2">🎯 Health Goals</h3>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span>Daily Steps</span>
                        <span className="font-semibold text-blue-600">8,432/10,000</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Water Intake</span>
                        <span className="font-semibold text-blue-600">6/8 glasses</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

const HealthStatsCard: React.FC<{ title: string; value: string; subtitle: string; icon: string; color: string }> = 
    ({ title, value, subtitle, icon, color }) => (
    <div className={`bg-gradient-to-br ${color} p-6 rounded-xl text-white shadow-lg transform hover:scale-105 transition-all duration-200`}>
        <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">{icon}</span>
            <div className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">Live</div>
        </div>
        <h3 className="text-lg font-semibold opacity-90">{title}</h3>
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-sm opacity-80">{subtitle}</p>
    </div>
);

// --- MAIN COMPONENT ---
const PatientPortalExperience: React.FC = () => {
    const [activeView, setActiveView] = useState('dashboard');
    const [selectedResult, setSelectedResult] = useState<TestResult | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [formError, setFormError] = useState('');
    const [isTaskComplete, setIsTaskComplete] = useState(false);
    const [isTaskSuccessful, setIsTaskSuccessful] = useState(false);

    const [correctness, setCorrectness] = useState({ navigated: false, resultSelected: false, messageSent: false });
    
    const randomizedResults = useMemo(() => [...testResults].sort(() => 0.5 - Math.random()), []);

    const handleNavigate = (view: string) => {
        setActiveView(view);
        if (view === 'results') {
            setCorrectness(prev => ({ ...prev, navigated: true }));
        }
    };

    const handleViewDetails = (result: TestResult) => {
        setSelectedResult(result);
        if (correctness.navigated && result.name === taskDefinition.testName && result.date === '2025-07-10') {
             setCorrectness(prev => ({ ...prev, resultSelected: true }));
        }
        setActiveView('result-detail');
    };

    const handleSendMessage = () => {
        if (!message.trim()) {
            setFormError('Message cannot be empty.');
            return;
        }
        setFormError('');
        
        if (correctness.resultSelected && message === taskDefinition.message) {
            setIsTaskSuccessful(true);
        }
        
        setIsTaskComplete(true);
        setIsModalOpen(false);
    };
    
 

    const renderMainView = () => {
        switch(activeView) {
            case 'dashboard': 
                return (
                    <div className="animate-fade-in space-y-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-4xl font-bold text-gray-800">Welcome Back, John! 👋</h2>
                                <p className="text-gray-600 mt-2">Here's your health overview for today</p>
                            </div>
                            <div className="bg-green-100 px-4 py-2 rounded-full">
                                <span className="text-green-800 font-semibold">Overall Health: Excellent</span>
                            </div>
                        </div>

                        {/* Health Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <HealthStatsCard 
                                title="Blood Pressure" 
                                value="120/80" 
                                subtitle="Normal range" 
                                icon="🫀" 
                                color="from-red-500 to-red-600" 
                            />
                            <HealthStatsCard 
                                title="Heart Rate" 
                                value="72 BPM" 
                                subtitle="Resting rate" 
                                icon="💓" 
                                color="from-pink-500 to-pink-600" 
                            />
                            <HealthStatsCard 
                                title="Weight" 
                                value="165 lbs" 
                                subtitle="Goal: 160 lbs" 
                                icon="⚖️" 
                                color="from-blue-500 to-blue-600" 
                            />
                            <HealthStatsCard 
                                title="Next Appointment" 
                                value="Aug 5" 
                                subtitle="Dr. Reed - 10:30 AM" 
                                icon="📅" 
                                color="from-purple-500 to-purple-600" 
                            />
                        </div>

                        {/* Charts Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Health Trends Chart */}
                            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                <h3 className="text-xl font-bold mb-4 text-gray-800">Health Trends (6 months)</h3>
                                <ResponsiveContainer width="100%" height={250}>
                                    <LineChart data={healthMetricsData}>
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="weight" stroke="#3b82f6" strokeWidth={3} name="Weight (lbs)" />
                                        <Line type="monotone" dataKey="heartRate" stroke="#ef4444" strokeWidth={3} name="Heart Rate" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Medication Adherence */}
                            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                <h3 className="text-xl font-bold mb-4 text-gray-800">Medication Adherence</h3>
                                <ResponsiveContainer width="100%" height={250}>
                                    <PieChart>
                                        <Pie 
                                            data={medicationAdherence} 
                                            cx="50%" 
                                            cy="50%" 
                                            outerRadius={80} 
                                            dataKey="value"
                                        >
                                            {medicationAdherence.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="flex justify-center gap-4 mt-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        <span className="text-sm">Taken (85%)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                        <span className="text-sm">Missed (15%)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                            <h3 className="text-xl font-bold mb-4 text-gray-800">Quick Actions</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <button onClick={() => setActiveView('results')} className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all text-center">
                                    <span className="text-2xl block mb-2">🔬</span>
                                    <span className="text-sm font-semibold">View Results</span>
                                </button>
                                <button onClick={() => setActiveView('appointments')} className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all text-center">
                                    <span className="text-2xl block mb-2">📅</span>
                                    <span className="text-sm font-semibold">Appointment</span>
                                </button>
                                <button onClick={() => setActiveView('messages')} className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all text-center">
                                    <span className="text-2xl block mb-2">💬</span>
                                    <span className="text-sm font-semibold">Messages</span>
                                </button>
                               
                            </div>
                        </div>
                    </div>
                );

            case 'vitals':
                return (
                    <div className="animate-fade-in space-y-6">
                        <h2 className="text-3xl font-bold mb-6">Your Vital Signs</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {vitalSigns.map((vital, index) => (
                                <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-3xl">{vital.icon}</span>
                                        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                            vital.status === 'good' ? 'bg-green-100 text-green-800' :
                                            vital.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {vital.status.toUpperCase()}
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-700">{vital.name}</h3>
                                    <p className="text-2xl font-bold text-gray-800">{vital.value} <span className="text-lg text-gray-500">{vital.unit}</span></p>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'appointments': 
                return (
                    <div className="animate-fade-in space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-3xl font-bold">Your Appointments</h2>
                           
                        </div>
                        <div className="grid gap-4">
                            {appointments.map(appointment => (
                                <div key={appointment.id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-blue-100 p-3 rounded-full">
                                                <span className="text-2xl">👨‍⚕️</span>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-800">{appointment.doctor}</h3>
                                                <p className="text-gray-600">{appointment.specialty} • {appointment.type}</p>
                                                <p className="text-sm text-gray-500">{appointment.date} at {appointment.time}</p>
                                            </div>
                                        </div>
                                       
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'messages': 
                return (
                    <div className="animate-fade-in space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-3xl font-bold">Your Messages</h2>
                           
                        </div>
                        <div className="space-y-4">
                            {messages.map(message => (
                                <div key={message.id} className={`bg-white p-6 rounded-xl shadow-lg border transition-all hover:shadow-xl ${
                                    message.read ? 'border-gray-100' : 'border-blue-200 bg-blue-50'
                                }`}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-3 h-3 rounded-full ${message.read ? 'bg-gray-300' : 'bg-blue-500'}`}></div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-800">{message.subject}</h3>
                                                <p className="text-gray-600">From: {message.from}</p>
                                                <p className="text-sm text-gray-500">{message.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                message.priority === 'high' ? 'bg-red-100 text-red-800' :
                                                message.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {message.priority?.toUpperCase()}
                                            </div>
                                          
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'medications':
                return (
                    <div className="animate-fade-in space-y-6">
                        <h2 className="text-3xl font-bold mb-6">Your Medications</h2>
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <h3 className="text-xl font-bold mb-4">Current Prescriptions</h3>
                            <div className="space-y-4">
                                {['Lisinopril 10mg', 'Metformin 500mg', 'Vitamin D3 1000IU'].map((med, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-4">
                                            <span className="text-2xl">💊</span>
                                            <div>
                                                <p className="font-semibold">{med}</p>
                                                <p className="text-sm text-gray-600">Take once daily with food</p>
                                            </div>
                                        </div>
                                      
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'results':
                return (
                    <div className="animate-fade-in space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-3xl font-bold">Your Test Results</h2>
                            <div className="bg-blue-100 px-4 py-2 rounded-full">
                                <span className="text-blue-800 font-semibold">📊 {testResults.length} Results Available</span>
                            </div>
                        </div>
                        
                        {/* Results Overview Chart */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                            <h3 className="text-xl font-bold mb-4">Results Overview</h3>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={testResults.slice(0, 4).map(result => ({ 
                                    name: result.name, 
                                    count: 1,
                                    status: result.status === 'New' ? 2 : 1 
                                }))}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="status" fill="#3b82f6" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                            {randomizedResults.map((result, index) => (
                                <div key={result.id} className={`p-6 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                                    index !== randomizedResults.length - 1 ? 'border-b border-gray-100' : ''
                                }`}>
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-full ${result.status === 'New' ? 'bg-green-100' : 'bg-gray-100'}`}>
                                            <span className="text-2xl">
                                                {result.name.includes('Blood') ? '🩸' : 
                                                 result.name.includes('X-Ray') ? '🦴' : 
                                                 result.name.includes('MRI') ? '🧠' : 
                                                 result.name.includes('ECG') ? '💓' : '🔬'}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800">{result.name}</h3>
                                            <p className="text-gray-600">Date: {result.date}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className={`w-2 h-2 rounded-full ${result.status === 'New' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                                                <span className={`text-sm font-semibold ${result.status === 'New' ? 'text-green-700' : 'text-gray-600'}`}>
                                                    {result.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => handleViewDetails(result)} 
                                        className="py-3 px-6 font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
                                    >
                                        View Details
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'result-detail':
                 if (!selectedResult) return null;
                 return (
                     <div className="animate-fade-in space-y-6">
                        <button onClick={() => setActiveView('results')} className="mb-4 text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-2">
                            ← Back to All Results
                        </button>
                        <div className="flex justify-between items-start">
                             <div>
                                <h2 className="text-3xl font-bold mb-2">{selectedResult.name}</h2>
                                <p className="text-gray-600">Date: {selectedResult.date} • Status: <span className="font-semibold text-green-600">{selectedResult.status}</span></p>
                             </div>
                             <button onClick={() => setIsModalOpen(true)} className="py-3 px-6 font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105 transition-all shadow-lg">
                                📧 Send to Doctor
                             </button>
                        </div>
                        
                        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                             <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                🔬 Detailed Report
                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">All Normal</span>
                             </h3>
                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {Object.entries(bloodPanelDetails).map(([key, data]: [string, BloodPanelDetail]) => (
                                    <div key={key} className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-lg transition-all">
                                        <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide">{key}</p>
                                        <p className="text-3xl font-bold mt-2 text-gray-800">
                                            {data.value} 
                                            <span className="text-lg text-gray-500 ml-1">{data.unit}</span>
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">Range: {data.range}</p>
                                        <div className={`mt-3 px-3 py-1 rounded-full text-xs font-semibold inline-block ${
                                            data.status === 'normal' ? 'bg-green-100 text-green-800' :
                                            data.status === 'high' ? 'bg-red-100 text-red-800' :
                                            'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {data.status?.toUpperCase() || 'NORMAL'}
                                        </div>
                                    </div>
                                ))}
                             </div>
                             
                             <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
                                <h4 className="font-bold text-blue-800 mb-3">📋 Doctor's Notes</h4>
                                <p className="text-gray-700 leading-relaxed">
                                    All values are within normal ranges. Continue current medication regimen and lifestyle habits. 
                                    Recommend follow-up in 3 months for routine monitoring.
                                </p>
                             </div>
                        </div>
                     </div>
                 );
            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-sans text-gray-800">
            <Header />
            <div className="flex">
                <Sidebar activeView={activeView} setActiveView={handleNavigate} />
                <main className="flex-1 p-8">
                    {renderMainView()}
                </main>
            </div>

            {isModalOpen && (
                 <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40 animate-fade-in">
                    <div className="w-full max-w-lg bg-white rounded-2xl p-8 shadow-2xl relative">
                        <button onClick={() => {
                            setIsModalOpen(false);
                            setMessage('');
                            setFormError('');
                        }} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-2xl">📧</span>
                            <h3 className="text-2xl font-bold">Send Result to Doctor</h3>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg mb-6">
                            <p className="text-blue-800 font-semibold">To: {taskDefinition.doctorName}</p>
                            <p className="text-blue-600 text-sm">Primary Care Physician</p>
                        </div>
                        <textarea 
                            value={message} 
                            onChange={e => setMessage(e.target.value)} 
                            placeholder="Add an optional message..." 
                            className="w-full p-4 border border-gray-300 rounded-lg h-32 resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        ></textarea>
                        {formError && <p className="text-red-500 mt-2 font-semibold">{formError}</p>}
                        <button 
                            onClick={handleSendMessage} 
                            className="w-full mt-6 py-4 font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
                        >
                            📤 Send Result
                        </button>
                    </div>
                </div>
            )}

            {isTaskComplete && (
                <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
                    <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl text-center">
                        <div className="text-6xl mb-4">
                            {isTaskSuccessful ? '✅' : '📤'}
                        </div>
                        <h2 className="text-3xl font-bold mb-4 text-green-600">
                            {isTaskSuccessful ? 'Result Sent Successfully!' : 'Action Completed'}
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">Your doctor has been notified and will review your results.</p>
                        {isTaskSuccessful ? (
                            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-dashed border-blue-300">
                                <p className="text-sm font-semibold text-blue-600 mb-2">🔐 Task Completion Password:</p>
                                <p className="text-3xl font-mono tracking-widest text-blue-800 font-bold">{PASSWORD_PatientPortalR}</p>
                            </div>
                        ) : (<></>)}
                    </div>
                </div>
            )}

            <style>{`
                .animate-fade-in { animation: fadeIn 0.5s ease-in-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};

export default PatientPortalExperience;
