import React, { useState, useMemo, useEffect } from "react";
import type { FC } from "react";

// ### Asset & Type Definitions ###
type AssetClass = "Stocks" | "Bonds" | "Real Estate" | "Commodities" | "Crypto";

interface Holding {
  id: string;
  name: string;
  ticker: string;
  value: number;
  assetClass: AssetClass;
  icon: React.ComponentType<{ className?: string }>;
}

// ### SVG Icon Components ###
const StockIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 3v18h18" />
    <path d="m19 9-5 5-4-4-3 3" />
  </svg>
);
const BondIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);
const RealEstateIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const CommodityIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22a2.83 2.83 0 0 0 2-5 2.83 2.83 0 0 0-4 0 2.83 2.83 0 0 0 2 5zM12 2a2.83 2.83 0 0 0-2 5 2.83 2.83 0 0 0 4 0 2.83 2.83 0 0 0-2-5zM22 12a2.83 2.83 0 0 0-5-2 2.83 2.83 0 0 0 0 4 2.83 2.83 0 0 0 5-2zM2 12a2.83 2.83 0 0 0 5 2 2.83 2.83 0 0 0 0-4 2.83 2.83 0 0 0-5 2z" />
  </svg>
);
const CryptoIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5.5 10.5h2M7.5 10.5v3M15 15.5h2M17 15.5v-3M12 2a10 10 0 1 0 10 10" />
    <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
  </svg>
);
const SearchIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);
const MissionIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);

// ### Helper Functions ###
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const TASK_ID_PortfolioDashboard =
  "finance-investment-portfoliodashboard";
export const PASSWORD_PortfolioDashboard = "CAPITAL_78dffdfd_SUCCESS";

// ### Main Component ###
const PortfolioDashboard: FC = () => {
  const [rebalanceInputs, setRebalanceInputs] = useState<
    Record<string, string>
  >({});
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<
    { id: string; name: string; amount: number }[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [taskSeed, setTaskSeed] = useState<number>(() =>
    Math.floor(Math.random() * 100000)
  );

  // Memoize task data based on taskSeed for 'New Task' button
  const {
    initialHoldings,
    totalValue,
    targetHolding,
    newTargetValue,
    correctRebalanceAction,
  } = useMemo(() => {
    const baseHoldings: Omit<Holding, "value">[] = [
      {
        id: "us-stocks-1",
        name: "US Equity Fund",
        ticker: "USEF",
        assetClass: "Stocks",
        icon: StockIcon,
      },
      {
        id: "us-stocks-2",
        name: "Global Tech Innovators",
        ticker: "GTI",
        assetClass: "Stocks",
        icon: StockIcon,
      },
      {
        id: "us-stocks-3",
        name: "Domestic Blue Chip",
        ticker: "DBC",
        assetClass: "Stocks",
        icon: StockIcon,
      },
      {
        id: "bonds-1",
        name: "Global Bond Index",
        ticker: "GBI",
        assetClass: "Bonds",
        icon: BondIcon,
      },
      {
        id: "bonds-2",
        name: "Corporate Debt Fund",
        ticker: "CDF",
        assetClass: "Bonds",
        icon: BondIcon,
      },
      {
        id: "reit-1",
        name: "Commercial Real Estate Trust",
        ticker: "CREIT",
        assetClass: "Real Estate",
        icon: RealEstateIcon,
      },
      {
        id: "reit-2",
        name: "Residential Property REIT",
        ticker: "RPR",
        assetClass: "Real Estate",
        icon: RealEstateIcon,
      },
      {
        id: "gold",
        name: "Gold Commodity ETF",
        ticker: "GLD",
        assetClass: "Commodities",
        icon: CommodityIcon,
      },
      {
        id: "silver",
        name: "Silver Futures Fund",
        ticker: "SFF",
        assetClass: "Commodities",
        icon: CommodityIcon,
      },
      {
        id: "crypto-1",
        name: "Digital Asset Fund",
        ticker: "DAF",
        assetClass: "Crypto",
        icon: CryptoIcon,
      },
      {
        id: "crypto-2",
        name: "Blockchain Ventures",
        ticker: "BCV",
        assetClass: "Crypto",
        icon: CryptoIcon,
      },
      {
        id: "bonds-3",
        name: "Municipal Bond Fund",
        ticker: "MBF",
        assetClass: "Bonds",
        icon: BondIcon,
      },
    ];
    // Use taskSeed for deterministic shuffling/randomization
    const rng = (seed: number) => () => (
      (seed = (seed * 9301 + 49297) % 233280), seed / 233280
    );
    const seededRandom = rng(taskSeed);
    const shuffled = [...baseHoldings].sort(() => seededRandom() - 0.5);
    const holdingsWithValues = shuffled.map((h) => ({
      ...h,
      value: Math.floor(seededRandom() * (250000 - 50000 + 1)) + 50000,
    }));
    const localTotalValue = holdingsWithValues.reduce(
      (acc, h) => acc + h.value,
      0
    );
    const target =
      holdingsWithValues[
        Math.floor(seededRandom() * holdingsWithValues.length)
      ];
    const newTargetVal =
      Math.round((target.value * (seededRandom() * 0.4 + 0.8)) / 1000) * 1000;
    const correctAction = newTargetVal - target.value;
    return {
      initialHoldings: holdingsWithValues,
      totalValue: localTotalValue,
      targetHolding: target,
      newTargetValue: newTargetVal,
      correctRebalanceAction: correctAction,
    };
  }, [taskSeed]);

  const backgroundImage = useMemo(
    () =>
      `https://picsum.photos/seed/${Math.floor(Math.random() * 100)}/1920/1080`,
    []
  );
  const filteredHoldings = useMemo(() => {
    if (!searchTerm) return initialHoldings;
    return initialHoldings.filter(
      (h) =>
        h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.ticker.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, initialHoldings]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [taskSeed]);

  const handleInputChange = (id: string, value: string) => {
    setRebalanceInputs({ [id]: value });
  };

  const handlePreviewRebalance = () => {
    const [id, amountStr] = Object.entries(rebalanceInputs)[0] || [];
    if (!id || !amountStr) return;
    const amount = parseFloat(amountStr) || 0;
    const holding = initialHoldings.find((h) => h.id === id);
    const changes = [{ id, name: holding?.name ?? "", amount }];
    if (changes.length > 0 && changes[0].amount !== 0) {
      setModalContent(changes);
      setIsModalOpen(true);
    }
  };

  const handleConfirmRebalance = () => {
    setIsModalOpen(false);
    const userAmount = parseFloat(rebalanceInputs[targetHolding.id] || "0");
    const isCorrect = Math.abs(correctRebalanceAction - userAmount) < 100;
    const isFiltered =
      searchTerm.trim().toLowerCase() === targetHolding.name.toLowerCase() ||
      searchTerm.trim().toLowerCase() === targetHolding.ticker.toLowerCase();
    if (isCorrect && isFiltered && !showSuccess) {
      setShowPassword(true);
    } else {
      setShowSuccess(true);
      setShowPassword(false);
      setRebalanceInputs({});
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat font-sans"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="min-h-screen w-full bg-black bg-opacity-70 backdrop-blur-sm">
        <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8 text-white">
          <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex-1">
              {/* Dynamic Prompt */}
              <div className="mb-6 p-4 rounded-lg bg-cyan-900/50 border border-cyan-700 flex items-start space-x-4">
                <MissionIcon className="w-8 h-8 text-cyan-300 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg text-cyan-300">
                    Current Task
                  </h3>
                  <p className="text-gray-200 mt-1">
                    Your goal is to{" "}
                    <b>
                      search for the{" "}
                      <span className="text-white underline decoration-wavy decoration-cyan-400">
                        {targetHolding.name}
                      </span>
                    </b>{" "}
                    fund and adjust its value to{" "}
                    <b className="text-white underline decoration-wavy decoration-cyan-400">
                      {formatCurrency(newTargetValue)}
                    </b>
                    .<br />
                    Enter the correct buy/sell amount for this fund, preview,
                    and confirm to reveal the password.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setTaskSeed(Math.floor(Math.random() * 100000));
                    setShowPassword(false);
                    setShowSuccess(false);
                    setRebalanceInputs({});
                    setSearchTerm("");
                  }}
                  className="ml-6 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-semibold shadow active:scale-95 focus:ring-2 focus:ring-cyan-400"
                >
                  New Task
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Total Portfolio Value</p>
              <p className="text-4xl font-semibold">
                {formatCurrency(totalValue)}
              </p>
            </div>
          </header>

          {showPassword ? (
            <div className="flex flex-col items-center justify-center bg-gray-900 bg-opacity-80 p-10 rounded-lg shadow-2xl text-center">
              <h2 className="text-2xl font-bold text-green-400">
                Rebalance Successful!
              </h2>
              <p className="mt-2 text-gray-300">
                The portfolio adjustment has been confirmed.
              </p>
              <div className="mt-6 bg-green-900 border-2 border-green-400 rounded-lg px-8 py-4">
                <p className="text-lg text-gray-200">Password:</p>
                <p
                  id="password"
                  className="text-4xl font-mono tracking-widest text-white"
                >
                  {PASSWORD_PortfolioDashboard}
                </p>
              </div>
            </div>
          ) : (
            <>
              {showSuccess && (
                <div className="flex flex-col items-center justify-center bg-green-900 bg-opacity-80 p-6 rounded-lg shadow text-center mb-6">
                  <h2 className="text-xl font-bold text-green-400">Success!</h2>
                  <p className="mt-2 text-gray-300">
                    Your changes have been saved.
                  </p>
                </div>
              )}
              <div className="bg-gray-900 bg-opacity-70 p-6 rounded-lg shadow-xl">
                <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
                  <h2 className="text-xl font-bold">Manage Holdings</h2>
                  <div className="relative">
                    <input
                      type="search"
                      id="search-asset"
                      placeholder="Search by name or ticker..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-64 bg-gray-800 border border-gray-600 rounded-md py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none focus:border-cyan-500 transition"
                    />
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="border-b border-gray-600">
                      <tr>
                        <th className="py-2 pr-4">Asset</th>
                        <th className="py-2 px-4 text-right">Current Value</th>
                        <th className="py-2 px-4 text-right">Allocation</th>
                        <th className="py-2 pl-4 text-center">
                          Rebalance Amount (USD)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredHoldings.map((holding) => (
                        <tr
                          key={holding.id}
                          className="border-b border-gray-700"
                        >
                          <td className="py-4 pr-4">
                            <div className="flex items-center">
                              <holding.icon className="w-8 h-8 mr-4 text-cyan-400" />
                              <div>
                                <p className="font-semibold">{holding.name}</p>
                                <p className="text-sm text-gray-400">
                                  {holding.ticker}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-right font-mono">
                            {formatCurrency(holding.value)}
                          </td>
                          <td className="py-4 px-4 text-right font-mono">
                            {((holding.value / totalValue) * 100).toFixed(2)}%
                          </td>
                          <td className="py-4 pl-4 min-w-[200px]">
                            <input
                              type="text"
                              id={`rebalance-${holding.id}`}
                              placeholder="e.g., -5000"
                              value={rebalanceInputs[holding.id] || ""}
                              onChange={(e) =>
                                handleInputChange(holding.id, e.target.value)
                              }
                              className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white text-right placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none focus:border-cyan-500 transition"
                            />
                          </td>
                        </tr>
                      ))}
                      {filteredHoldings.length === 0 && (
                        <tr>
                          <td
                            colSpan={4}
                            className="text-center py-8 text-gray-400"
                          >
                            No assets found for "{searchTerm}".
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    id="preview-rebalance"
                    onClick={handlePreviewRebalance}
                    disabled={Object.keys(rebalanceInputs).length === 0}
                    className="px-6 py-3 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500"
                  >
                    Preview Rebalance
                  </button>
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg shadow-xl p-8 max-w-lg w-full border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-4">
              Confirm Changes
            </h3>
            <p className="text-gray-400 mb-6">
              Please review the following transaction before confirming.
            </p>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {modalContent.map((change) => (
                <div
                  key={change.id}
                  className="flex justify-between items-center bg-gray-800 p-3 rounded"
                >
                  <span className="text-white">{change.name}</span>
                  <span
                    className={`font-mono font-semibold ${
                      change.amount >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {change.amount >= 0 ? "BUY " : "SELL "}{" "}
                    {formatCurrency(Math.abs(change.amount))}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                id="confirm-rebalance"
                onClick={handleConfirmRebalance}
                className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-500 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioDashboard;
