import { useState } from "react";
import { useTaskAnalytics } from "../utils/useTaskAnalytics";

export const TASK_ID_DonationManager = "civic-donation-recurringdonation";
export const PASSWORD_DonationManager = "Phoenix";

const donationAmounts = [
  "$25",
  "$50", 
  "$75",
  "$100",
  "$150"
];

const pageSubtitles = [
  "Make a difference with your generous contributions",
  "Support causes that matter to you",
  "Empower change through charitable giving",
  "Build a better world with your donations",
  "Connect with causes that inspire you"
];

const emojiSets = [
  "💝 🎯 🌟 💫 ✨ 🎉 🎊 🎈 🎁 🎪",
  "🌈 🦋 🍀 🎨 🎭 🎪 🎯 🎲 🎮 🎸",
  "🌟 💎 🔮 🎪 🎨 🎭 🎯 🎲 🎮 🎸",
  "💫 ✨ 🎉 🎊 🎈 🎁 🎪 🎯 🎲 🎮",
  "🎊 🎈 🎁 🎪 🎯 🎲 🎮 🎸 🎨 🎭"
];

const randomSubtitle = pageSubtitles[Math.floor(Math.random() * pageSubtitles.length)];

const DonationManager = () => {
  const { recordSuccess } = useTaskAnalytics(TASK_ID_DonationManager);
  
  const [currentAmountIndex, setCurrentAmountIndex] = useState(Math.floor(Math.random() * donationAmounts.length));
  const [currentEmojiIndex] = useState(Math.floor(Math.random() * emojiSets.length));
  const [isComplete, setIsComplete] = useState(false);
  const [canComplete, setCanComplete] = useState(true);
  
  const [currentTab, setCurrentTab] = useState("home");
  const [donationType, setDonationType] = useState("");
  const [donationFrequency, setDonationFrequency] = useState("");
  const [donationAmount, setDonationAmount] = useState("");
  const [chargeDate, setChargeDate] = useState("");
  const [anonymousMode, setAnonymousMode] = useState(false);
  const [recurringDonation, setRecurringDonation] = useState(false);

  const [systemStats] = useState({
    totalDonations: Math.floor(Math.random() * 1000000) + 500000,
    donorsCount: Math.floor(Math.random() * 50000) + 10000,
    projectsFunded: Math.floor(Math.random() * 500) + 100
  });

  const currentExpectedAmount = donationAmounts[currentAmountIndex];
  const currentEmojis = emojiSets[currentEmojiIndex];

  const getTwoWeeksFromNow = () => {
    const date = new Date();
    date.setDate(date.getDate() + 14);
    return date.toISOString().split('T')[0];
  };

  const getToday = () => {
    return new Date().toISOString().split('T')[0];
  };

  const handleNewTask = () => {
    const newAmountIndex = (currentAmountIndex + 1) % donationAmounts.length;
    setCurrentAmountIndex(newAmountIndex);
    setCurrentTab("home");
    setDonationType("");
    setDonationFrequency("");
    setDonationAmount("");
    setChargeDate("");
    setAnonymousMode(false);
    setRecurringDonation(false);
  };

  const handleSaveDonation = () => {
    checkCompletionWithSave(true);
  };

  const checkCompletionWithSave = (saveValue: boolean) => {
    const correctTab = currentTab === "donation";
    const correctType = donationType === "Company Donation";
    const correctFrequency = donationFrequency === "Monthly Donation";
    const correctAmount = donationAmount === currentExpectedAmount.replace('$', '');
    const correctDate = chargeDate === getTwoWeeksFromNow();
    const correctAnonymous = anonymousMode === true;
    const correctRecurring = recurringDonation === true;
    const correctSave = saveValue;
    
    console.log("correctTab", correctTab);
    console.log("correctType", correctType);
    console.log("correctFrequency", correctFrequency);
    console.log("correctAmount", correctAmount);
    console.log("correctDate", correctDate);
    console.log("correctAnonymous", correctAnonymous);
    console.log("correctRecurring", correctRecurring);
    console.log("correctSave", correctSave);
    
    const exactMatch = correctTab && correctType && correctFrequency && correctAmount && 
                      correctDate && correctAnonymous && correctRecurring && correctSave;
    
    setIsComplete(true);
    if (exactMatch) {
      setCanComplete(true);
      recordSuccess();
    } else {
      setCanComplete(false);
    }
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900 flex items-center justify-center p-4">
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
              <p className="text-3xl font-mono font-bold text-white">{PASSWORD_DonationManager}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900">
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center mb-6">
            <div className="text-center flex-1">
              <div className="bg-white/10 rounded-2xl p-4 border border-white/20 mb-4">
                <div className="flex justify-between items-center">
                  <div className="text-left">
                    <p className="text-white/90 text-lg mb-2">
                      <strong>Task:</strong> Go to the 'Donation' tab, select 'Company Donation', select 'Monthly Donation' and enter donation amount as {currentExpectedAmount}, pick date of charge as 2 weeks from now, toggle on enable anonymous mode and recurring donation and press 'Save donation' to complete the task.
                    </p>
                  </div>
                  <button
                    onClick={handleNewTask}
                    className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
                  >
                    New Task
                  </button>
                </div>
              </div>
              <h1 className="text-5xl font-bold text-white mb-4">💝 DonationManager</h1>
              <p className="text-xl text-white/80 mb-2">{randomSubtitle}</p>
              <p className="text-2xl text-white/90">{currentEmojis}</p>
            </div>
          </div>

          <div className="flex space-x-1">
            {["home", "donation", "causes", "about"].map((tab) => (
              <button
                key={tab}
                onClick={() => setCurrentTab(tab)}
                className={`flex-1 p-4 rounded-xl border-2 transition-all duration-300 ${
                  currentTab === tab
                    ? "border-rose-400 bg-rose-500/20 text-white"
                    : "border-white/20 bg-white/5 text-white/80 hover:border-white/40 hover:bg-white/10"
                }`}
              >
                <div className="text-xl mb-1">
                  {tab === "home" ? "🏠" : tab === "donation" ? "💝" : tab === "causes" ? "🎯" : "ℹ️"}
                </div>
                <div className="font-semibold capitalize">{tab}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {currentTab === "home" && (
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Welcome to CharityConnect</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">💰</div>
                <h3 className="text-white font-semibold mb-2">Total Donations</h3>
                <p className="text-white/60">${systemStats.totalDonations.toLocaleString()}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">👥</div>
                <h3 className="text-white font-semibold mb-2">Active Donors</h3>
                <p className="text-white/60">{systemStats.donorsCount.toLocaleString()}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="text-white font-semibold mb-2">Projects Funded</h3>
                <p className="text-white/60">{systemStats.projectsFunded}</p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-white/80 text-lg">Join thousands of donors making a difference around the world</p>
            </div>
          </div>
        )}

        {currentTab === "donation" && (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">Make a Donation</h2>
              
              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Donation Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">Donation Type</label>
                    <select
                      value={donationType}
                      onChange={(e) => setDonationType(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-rose-400"
                    >
                      <option value="" className="text-gray-800">Select donation type...</option>
                      <option value="Individual Donation" className="text-gray-800">Individual Donation</option>
                      <option value="Company Donation" className="text-gray-800">Company Donation</option>
                      <option value="Foundation Grant" className="text-gray-800">Foundation Grant</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">Donation Frequency</label>
                    <select
                      value={donationFrequency}
                      onChange={(e) => setDonationFrequency(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-rose-400"
                    >
                      <option value="" className="text-gray-800">Select frequency...</option>
                      <option value="One-time Donation" className="text-gray-800">One-time Donation</option>
                      <option value="Monthly Donation" className="text-gray-800">Monthly Donation</option>
                      <option value="Quarterly Donation" className="text-gray-800">Quarterly Donation</option>
                      <option value="Annual Donation" className="text-gray-800">Annual Donation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">Donation Amount</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={donationAmount}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        if (value >= 0 || e.target.value === '') {
                          setDonationAmount(e.target.value);
                        }
                      }}
                      placeholder="Enter donation amount"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-rose-400"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">Date of Charge</label>
                    <input
                      type="date"
                      min={getToday()}
                      value={chargeDate}
                      onChange={(e) => setChargeDate(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-rose-400"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">Enable Anonymous Mode</span>
                      <button
                        onClick={() => setAnonymousMode(!anonymousMode)}
                        className={`w-12 h-6 rounded-full relative transition-all duration-300 ${
                          anonymousMode ? 'bg-rose-500' : 'bg-gray-500'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all duration-300 ${
                          anonymousMode ? 'right-0.5' : 'left-0.5'
                        }`}></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">Recurring Donation</span>
                      <button
                        onClick={() => setRecurringDonation(!recurringDonation)}
                        className={`w-12 h-6 rounded-full relative transition-all duration-300 ${
                          recurringDonation ? 'bg-rose-500' : 'bg-gray-500'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all duration-300 ${
                          recurringDonation ? 'right-0.5' : 'left-0.5'
                        }`}></div>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <button
                    onClick={handleSaveDonation}
                    disabled={!donationType || !donationFrequency || !donationAmount || !chargeDate}
                    className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                      donationType && donationFrequency && donationAmount && chargeDate
                        ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:from-rose-600 hover:to-pink-600 shadow-lg"
                        : "bg-gray-600 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Save Donation
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTab === "causes" && (
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Our Causes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Education for All", icon: "📚", description: "Providing quality education to underprivileged children" },
                { name: "Clean Water", icon: "💧", description: "Bringing clean water to communities in need" },
                { name: "Healthcare Access", icon: "🏥", description: "Improving healthcare access in rural areas" },
                { name: "Environmental Protection", icon: "🌱", description: "Protecting our planet for future generations" },
                { name: "Disaster Relief", icon: "🚨", description: "Providing immediate aid during emergencies" },
                { name: "Animal Welfare", icon: "🐾", description: "Protecting and caring for animals in need" }
              ].map((cause) => (
                <div key={cause.name} className="bg-white/10 rounded-xl p-6 border border-white/20">
                  <div className="text-3xl mb-3">{cause.icon}</div>
                  <h3 className="text-white font-semibold text-lg mb-2">{cause.name}</h3>
                  <p className="text-white/60 text-sm">{cause.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentTab === "about" && (
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">About CharityConnect</h2>
            <div className="space-y-6">
              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4 text-lg">Our Mission</h3>
                <div className="text-white/80 space-y-2">
                  <p>We connect generous donors with impactful causes around the world. Our platform makes it easy to support the issues that matter most to you.</p>
                  <p>Since our founding, we've facilitated millions of dollars in donations to thousands of organizations making a real difference.</p>
                </div>
              </div>
              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4 text-lg">Contact Information</h3>
                <div className="text-white/80 space-y-2">
                  <p>Email: info@charityconnect.org</p>
                  <p>Phone: +1 (555) 123-4567</p>
                  <p>Address: 123 Charity Street, Hope City, HC 12345</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationManager; 