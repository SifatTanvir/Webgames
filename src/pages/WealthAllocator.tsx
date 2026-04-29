import React, { useState } from "react";

// Task Related constants
export const PASSWORD_WealthAllocator = "IncomeWealthIsMainGoal";
export const TASK_ID_WealthAllocator = "finance-budgets-wealthallocation";

interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

interface AllocationAction {
  id: number;
  amount: number;
  debt: number;
  equity: number;
  land: number;
  gold: number;
  bond: number;
}

interface AssetAllocation {
  debt: number;
  equity: number;
  land: number;
  gold: number;
  bond: number;
}
// Sample allocation actions
// These actions can be used to simulate different allocation scenarios
const ALLOCATION_ACTIONS: AllocationAction[] = [
  { id: 1, amount: 106000, debt: 25, equity: 30, land: 20, gold: 15, bond: 10 },
  { id: 2, amount: 320000, debt: 30, equity: 35, land: 15, gold: 10, bond: 10 },
  { id: 3, amount: 400000, debt: 35, equity: 40, land: 10, gold: 5, bond: 10 },
  { id: 4, amount: 990000, debt: 40, equity: 30, land: 15, gold: 10, bond: 5 },
  { id: 5, amount: 1000000, debt: 40, equity: 40, land: 10, gold: 5, bond: 5 },
  { id: 6, amount: 500000, debt: 30, equity: 40, land: 15, gold: 10, bond: 5 },
  { id: 7, amount: 200000, debt: 25, equity: 30, land: 20, gold: 15, bond: 10 },
  { id: 8, amount: 690090, debt: 30, equity: 40, land: 15, gold: 10, bond: 5 },
  { id: 9, amount: 707000, debt: 30, equity: 40, land: 20, gold: 5, bond: 5 },
  {
    id: 10,
    amount: 800880,
    debt: 25,
    equity: 35,
    land: 20,
    gold: 10,
    bond: 10,
  },
];

const DollarSign: React.FC<IconProps> = ({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="12" x2="12" y1="2" y2="22" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const Banknote: React.FC<IconProps> = ({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="5" width="20" height="14" rx="2" ry="2" />
    <circle cx="12" cy="12" r="3" />
    <line x1="8" x2="16" y1="12" y2="12" />
  </svg>
);

const Building: React.FC<IconProps> = ({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01" />
    <path d="M16 6h.01" />
    <path d="M12 6h.01" />
    <path d="M12 10h.01" />
    <path d="M12 14h.01" />
    <path d="M16 10h.01" />
    <path d="M16 14h.01" />
    <path d="M8 10h.01" />
    <path d="M8 14h.01" />
  </svg>
);

const Coins: React.FC<IconProps> = ({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="8" cy="8" r="6" />
    <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
    <path d="M7 6h1v4" />
    <path d="m16.71 13.88.7.71-2.82 2.82" />
  </svg>
);

const PieChart: React.FC<IconProps> = ({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z" />
    <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
  </svg>
);

const TrendingUp: React.FC<IconProps> = ({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 7h6v6" />
    <path d="m22 7-8.5 8.5-5-5L2 17" />
  </svg>
);

const WealthAllocator: React.FC = () => {
  const randomNumber = Math.floor(Math.random() * 9);
  const [canComplete, setCanComplete] = useState<boolean>(false);
  const [steps, setSteps] = useState<AllocationAction>(
    ALLOCATION_ACTIONS[randomNumber]
  );
  const [investmentAmount, setInvestmentAmount] = useState<number>(0);
  const [allocations, setAllocations] = useState<AssetAllocation>({
    debt: 0,
    equity: 0,
    land: 0,
    gold: 0,
    bond: 0,
  });
  const [showResults, setShowResults] = useState<boolean>(false);

  const resetAllocations = () => {
    setAllocations({
      debt: 0,
      equity: 0,
      land: 0,
      gold: 0,
      bond: 0,
    });
    setShowResults(false);
    setInvestmentAmount(0);
    const randomNumber = Math.floor(Math.random() * 9);
    setSteps(ALLOCATION_ACTIONS[randomNumber]);
  };
  const assetConfig = [
    {
      key: "debt" as keyof AssetAllocation,
      label: "Debt",
      color: "bg-red-500",
      icon: TrendingUp,
    },
    {
      key: "equity" as keyof AssetAllocation,
      label: "Equity",
      color: "bg-blue-500",
      icon: TrendingUp,
    },
    {
      key: "land" as keyof AssetAllocation,
      label: "Land",
      color: "bg-green-500",
      icon: Building,
    },
    {
      key: "gold" as keyof AssetAllocation,
      label: "Gold",
      color: "bg-yellow-500",
      icon: Coins,
    },
    {
      key: "bond" as keyof AssetAllocation,
      label: "Bond",
      color: "bg-purple-500",
      icon: Banknote,
    },
  ];

  const totalAllocation = Object.values(allocations).reduce(
    (sum, value) => sum + value,
    0
  );
  const isValidAllocation = totalAllocation <= 100;
  const remainingPercentage = 100 - totalAllocation;
  const remainingAmount = (investmentAmount * remainingPercentage) / 100;

  const handleAllocationChange = (
    asset: keyof AssetAllocation,
    value: number
  ) => {
    setAllocations((prev) => ({
      ...prev,
      [asset]: value,
    }));
  };

  const handleAllocateFunds = () => {
    if (investmentAmount > 0 && isValidAllocation) {
      setShowResults(true);
    }
    if (
      !canComplete &&
      steps.amount === investmentAmount &&
      allocations.debt === steps.debt &&
      allocations.equity === steps.equity &&
      allocations.land === steps.land &&
      allocations.gold === steps.gold &&
      allocations.bond === steps.bond
    ) {
      setCanComplete(true);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const renderPassword = () => {
    return (
      canComplete && (
        <div className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-pink-600  shadow-md rounded-xl border hover:shadow-lg transition-shadow mb-4">
          <div className="text-center p-4 my-2">
            <p className="text-base font-semibold text-green-200 mb-2">
              "Awesome! You have successfully allocated your wealth across
              various asset classes.!"
            </p>
            <p className="text-pink-200 text-base font-semibold">
              The secret password is:{" "}
              <span className="font-mono font-bold text-lg">
                {PASSWORD_WealthAllocator}
              </span>
            </p>
          </div>
        </div>
      )
    );
  };
  const renderHeader = () => {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200 flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3">
            <PieChart className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">
              Wealth Allocator
            </h1>
          </div>
          <p className="text-gray-600 mt-2">
            Distribute your wealth smartly across different asset classes
          </p>
        </div>
        {showResults && (
          <button
            onClick={resetAllocations}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Back to Allocator
          </button>
        )}
      </div>
    );
  };
  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          {renderHeader()}
          {renderPassword()}

          {/* Results Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Investment Summary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Total Investment</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(investmentAmount)}
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Allocated Amount</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(investmentAmount - remainingAmount)}
                </p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Remaining Amount</p>
                <p className="text-2xl font-bold text-orange-600">
                  {formatCurrency(remainingAmount)}
                </p>
                <p className="text-sm text-gray-500">
                  {remainingPercentage.toFixed(1)}% remaining
                </p>
              </div>
            </div>
          </div>

          {/* Asset Allocation Details */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Asset Allocation Breakdown
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {assetConfig.map(({ key, label, color, icon: Icon }) => {
                const percentage = allocations[key];
                const amount = (investmentAmount * percentage) / 100;

                if (percentage === 0) return null;

                return (
                  <div
                    key={key}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div
                        className={`w-10 h-10 ${color} rounded-full flex items-center justify-center`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{label}</h3>
                        <p className="text-sm text-gray-600">
                          {percentage}% allocated
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Amount:</span>
                        <span className="font-semibold">
                          {formatCurrency(amount)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${color.replace(
                            "bg-",
                            "bg-"
                          )} transition-all duration-300`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        {renderHeader()}
        {renderPassword()}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
          Enter the <span className="font-bold">${steps.amount}</span> in the
          "Investment Amount"
          <br />
          Do the following asset allocations: Debt:{" "}
          <span className="font-bold">{steps.debt}%</span>, Equity:{" "}
          <span className="font-bold">{steps.equity}%</span>, Land:{" "}
          <span className="font-bold">{steps.land}%</span>, Gold:{" "}
          <span className="font-bold">{steps.gold}%</span>, Bond:{" "}
          <span className="font-bold">{steps.bond}%</span>. <br />
          <span className="font-bold">Scroll</span> down and click the{" "}
          <span className="font-bold">"Allocate Funds"</span> button to see the
          breakdown of your investments.
        </div>
        {/* Investment Amount Input */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Investment Amount
          </h2>

          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="number"
              value={investmentAmount || ""}
              onChange={(e) => setInvestmentAmount(Number(e.target.value))}
              placeholder="Enter investment amount in USD"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              min="0"
            />
          </div>
          {investmentAmount > 0 && (
            <p className="text-sm text-gray-600 mt-2">
              Total available: {formatCurrency(investmentAmount)}
            </p>
          )}
        </div>

        {/* Asset Allocation Sliders */}
        {investmentAmount > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Asset Allocation
            </h2>
            <div className="space-y-6">
              {assetConfig.map(({ key, label, color, icon: Icon }) => {
                const percentage = allocations[key];
                const amount = (investmentAmount * percentage) / 100;

                return (
                  <div key={key} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 ${color} rounded-full flex items-center justify-center`}
                        >
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium text-gray-800">
                          {label}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-semibold text-gray-800">
                          {percentage}%
                        </span>
                        <p className="text-sm text-gray-600">
                          {formatCurrency(amount)}
                        </p>
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={percentage}
                        onChange={(e) => {
                          handleAllocationChange(key, Number(e.target.value));
                        }}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        style={{
                          background: `linear-gradient(to right, ${color.replace(
                            "bg-",
                            "#"
                          )} 0%, ${color.replace(
                            "bg-",
                            "#"
                          )} ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Allocation Summary */}
        {investmentAmount > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Allocation Summary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className={`p-4 rounded-lg ${
                  totalAllocation <= 100 ? "bg-green-50" : "bg-red-50"
                }`}
              >
                <p className="text-sm text-gray-600">Total Allocated</p>
                <p
                  className={`text-2xl font-bold ${
                    totalAllocation <= 100 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {totalAllocation.toFixed(1)}%
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Remaining</p>
                <p className="text-2xl font-bold text-blue-600">
                  {remainingPercentage.toFixed(1)}%
                </p>
                <p className="text-sm text-gray-500">
                  {formatCurrency(remainingAmount)}
                </p>
              </div>
            </div>

            {totalAllocation > 100 && (
              <div className="mt-4 p-3 bg-red-100 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">
                  ⚠️ Total allocation exceeds 100%. Please adjust your
                  percentages.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Allocate Funds Button */}
        {investmentAmount > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <button
              onClick={handleAllocateFunds}
              disabled={!isValidAllocation || totalAllocation === 0}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-colors ${
                isValidAllocation && totalAllocation > 0
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Allocate Funds
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WealthAllocator;
