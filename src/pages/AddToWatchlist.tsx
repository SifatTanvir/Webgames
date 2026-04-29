import React, { useState, useMemo } from "react";

// ### Asset Imports (Inline SVG) ###
const Icon = ({
  path,
  className = "h-5 w-5",
}: {
  path: string;
  className?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d={path} />
  </svg>
);
const PlusCircleIcon = (props: { className?: string }) => (
  <Icon
    path="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 8v8m-4-4h8"
    {...props}
  />
);
const ArrowUpIcon = (props: { className?: string }) => (
  <Icon path="M12 19V5M5 12l7-7 7 7" {...props} />
);
const ArrowDownIcon = (props: { className?: string }) => (
  <Icon path="M12 5v14M19 12l-7 7-7-7" {...props} />
);
const XIcon = (props: { className?: string }) => (
  <Icon path="M18 6L6 18M6 6l12 12" {...props} />
);

// ### Type Definitions ###
type Asset = {
  id: string;
  name: string;
  ticker: string;
  category: string;
  price: number;
  volume24h: number;
  change24h: number;
};
type AlertSettings = { type: "above" | "below"; targetPrice: string };
type Theme = { name: string; colors: Record<string, string> };

// ### Named Exports ###
export const TASK_ID_AddToWatchlist = "crypto-watchlist-additem";
export const PASSWORD_AddToWatchlist = "CRYPTO_67fd76_ALERT";

// ### Main Component ###
const AddToWatchlist = () => {
  // ### State Management ###
  const [activeCategory, setActiveCategory] = useState("All");
  const [watchlist, setWatchlist] = useState<
    Map<string, { asset: Asset; isCorrect: boolean }>
  >(new Map());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [alertSettings, setAlertSettings] = useState<AlertSettings>({
    type: "above",
    targetPrice: "",
  });
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultMessage, setResultMessage] = useState<{
    type: "success" | "failure";
    message: string;
  } | null>(null);

  // ### Data & Theme Generation ###
  const { theme, assets, categories, correctAsset, correctTargetPrice } =
    useMemo(() => {
      // Dynamic Theming
      const themes: Theme[] = [
        {
          name: "ocean",
          colors: {
            "--c-bg": "hsl(210 40% 98%)",
            "--c-card": "hsl(0 0% 100%)",
            "--c-border": "hsl(214 32% 91%)",
            "--c-text-primary": "hsl(222 84% 5%)",
            "--c-text-secondary": "hsl(215 16% 47%)",
            "--c-accent": "hsl(221 83% 53%)",
          },
        },
        {
          name: "emerald",
          colors: {
            "--c-bg": "hsl(150 14% 95%)",
            "--c-card": "hsl(0 0% 100%)",
            "--c-border": "hsl(150 10% 85%)",
            "--c-text-primary": "hsl(150 20% 4%)",
            "--c-text-secondary": "hsl(150 10% 40%)",
            "--c-accent": "hsl(142 76% 36%)",
          },
        },
        {
          name: "sunset",
          colors: {
            "--c-bg": "hsl(30 20% 97%)",
            "--c-card": "hsl(0 0% 100%)",
            "--c-border": "hsl(30 10% 90%)",
            "--c-text-primary": "hsl(30 20% 4%)",
            "--c-text-secondary": "hsl(30 10% 45%)",
            "--c-accent": "hsl(25 95% 53%)",
          },
        },
        {
          name: "lavender",
          colors: {
            "--c-bg": "hsl(250 20% 97%)",
            "--c-card": "hsl(0 0% 100%)",
            "--c-border": "hsl(250 10% 90%)",
            "--c-text-primary": "hsl(250 20% 4%)",
            "--c-text-secondary": "hsl(250 10% 45%)",
            "--c-accent": "hsl(250 66% 76%)",
          },
        },
      ];

      // Dynamic Background Colors
      const backgroundColors = [
        "hsl(210 40% 98%)", // Ocean blue
        "hsl(150 14% 95%)", // Emerald green
        "hsl(30 20% 97%)", // Sunset orange
        "hsl(250 20% 97%)", // Lavender purple
        "hsl(0 20% 97%)", // Cool gray
        "hsl(60 20% 97%)", // Warm yellow
        "hsl(180 20% 97%)", // Mint cyan
        "hsl(300 20% 97%)", // Pink rose
        "hsl(120 20% 97%)", // Spring green
        "hsl(240 20% 97%)", // Cool blue
        "hsl(20 20% 97%)", // Peach
        "hsl(280 20% 97%)", // Violet
        "hsl(40 20% 97%)", // Golden
        "hsl(160 20% 97%)", // Teal
        "hsl(320 20% 97%)", // Magenta
      ];

      const cardColors = [
        "hsl(0 0% 100%)", // Pure white
        "hsl(0 0% 99%)", // Off white
        "hsl(0 0% 98%)", // Light gray
        "hsl(0 0% 97%)", // Very light gray
        "hsl(0 0% 96%)", // Lighter gray
        "hsl(210 40% 99%)", // Very light blue
        "hsl(150 14% 99%)", // Very light green
        "hsl(30 20% 99%)", // Very light orange
        "hsl(250 20% 99%)", // Very light purple
        "hsl(60 20% 99%)", // Very light yellow
        "hsl(180 20% 99%)", // Very light cyan
        "hsl(300 20% 99%)", // Very light pink
        "hsl(120 20% 99%)", // Very light lime
        "hsl(240 20% 99%)", // Very light indigo
        "hsl(20 20% 99%)", // Very light peach
      ];

      const accentColors = [
        "hsl(221 83% 53%)", // Blue
        "hsl(142 76% 36%)", // Green
        "hsl(25 95% 53%)", // Orange
        "hsl(250 66% 76%)", // Purple
        "hsl(0 84% 60%)", // Red
        "hsl(45 93% 47%)", // Yellow
        "hsl(162 84% 39%)", // Teal
        "hsl(330 81% 60%)", // Pink
        "hsl(200 98% 39%)", // Sky blue
        "hsl(120 84% 39%)", // Lime
        "hsl(280 84% 60%)", // Violet
        "hsl(15 93% 47%)", // Amber
        "hsl(180 84% 39%)", // Cyan
        "hsl(340 84% 60%)", // Rose
        "hsl(220 84% 60%)", // Indigo
      ];

      const textColors = [
        "hsl(222 84% 5%)", // Dark blue
        "hsl(150 20% 4%)", // Dark green
        "hsl(30 20% 4%)", // Dark brown
        "hsl(250 20% 4%)", // Dark purple
        "hsl(0 20% 4%)", // Dark gray
        "hsl(60 20% 4%)", // Dark yellow
        "hsl(180 20% 4%)", // Dark cyan
        "hsl(300 20% 4%)", // Dark magenta
        "hsl(120 20% 4%)", // Dark lime
        "hsl(240 20% 4%)", // Dark indigo
        "hsl(20 20% 4%)", // Dark orange
        "hsl(280 20% 4%)", // Dark violet
        "hsl(40 20% 4%)", // Dark amber
        "hsl(160 20% 4%)", // Dark teal
        "hsl(320 20% 4%)", // Dark rose
      ];

      const borderColors = [
        "hsl(214 32% 91%)", // Light blue
        "hsl(150 10% 85%)", // Light green
        "hsl(30 10% 90%)", // Light orange
        "hsl(250 10% 90%)", // Light purple
        "hsl(0 10% 90%)", // Light gray
        "hsl(60 10% 90%)", // Light yellow
        "hsl(180 10% 90%)", // Light cyan
        "hsl(300 10% 90%)", // Light magenta
        "hsl(120 10% 90%)", // Light lime
        "hsl(240 10% 90%)", // Light indigo
        "hsl(20 10% 90%)", // Light peach
        "hsl(280 10% 90%)", // Light violet
        "hsl(40 10% 90%)", // Light golden
        "hsl(160 10% 90%)", // Light teal
        "hsl(320 10% 90%)", // Light rose
      ];

      // Random color selection
      const colorIndex = Math.floor(Math.random() * backgroundColors.length);
      const cardIndex = Math.floor(Math.random() * cardColors.length);

      // Create dynamic theme
      const dynamicTheme: Theme = {
        name: `dynamic-${colorIndex}`,
        colors: {
          "--c-bg": backgroundColors[colorIndex],
          "--c-card": cardColors[cardIndex],
          "--c-border": borderColors[colorIndex],
          "--c-text-primary": textColors[colorIndex],
          "--c-text-secondary": textColors[colorIndex].replace("4%)", "45%)"),
          "--c-accent": accentColors[colorIndex],
        },
      };

      // Increase probability of dynamic themes for more variety
      const randomTheme =
        Math.random() > 0.3
          ? dynamicTheme
          : themes[Math.floor(Math.random() * themes.length)];

      // Dynamic Data Generation
      const createAsset = (o: Partial<Asset>): Asset => ({
        id: `asset_${Math.random()}`,
        name: "Asset",
        ticker: "AST",
        category: "DeFi",
        price: parseFloat((Math.random() * 2000).toFixed(2)),
        volume24h: Math.floor(Math.random() * 5e9) + 1e9,
        change24h: parseFloat(((Math.random() - 0.5) * 20).toFixed(2)),
        ...o,
      });
      const generatedAssets: Asset[] = [
        createAsset({
          name: "Bitcoin",
          ticker: "BTC",
          category: "Layer 1",
          price: 68430.21,
          change24h: 1.25,
        }),
        createAsset({
          name: "Ethereum",
          ticker: "ETH",
          category: "Layer 1",
          price: 3560.88,
          change24h: -2.1,
        }),
        createAsset({
          name: "ChainLink",
          ticker: "LINK",
          category: "DeFi",
          price: 17.5,
          volume24h: 3e8,
        }),
        createAsset({
          name: "Uniswap",
          ticker: "UNI",
          category: "DeFi",
          price: 10.2,
          volume24h: 2.5e8,
        }),
        createAsset({
          name: "Aave",
          ticker: "AAVE",
          category: "DeFi",
          price: 92.45,
          volume24h: 4e8,
        }), // This will be the target
        createAsset({
          name: "Axie Infinity",
          ticker: "AXS",
          category: "Gaming",
          price: 7.8,
          change24h: 5.8,
        }),
        createAsset({
          name: "Solana",
          ticker: "SOL",
          category: "Layer 1",
          price: 150.11,
          change24h: 0.5,
        }),
        createAsset({
          name: "The Sandbox",
          ticker: "SAND",
          category: "Gaming",
          price: 0.45,
          change24h: -3.2,
        }),
      ].sort(() => Math.random() - 0.5);

      const assetCategories = [
        "All",
        ...new Set(generatedAssets.map((a) => a.category)),
      ];
      const defiAssets = generatedAssets.filter((a) => a.category === "DeFi");
      const targetAsset = defiAssets.reduce((prev, current) =>
        prev.volume24h > current.volume24h ? prev : current
      );
      const targetPrice = parseFloat((targetAsset.price * 1.05).toFixed(4));
      return {
        theme: randomTheme,
        assets: generatedAssets,
        categories: assetCategories,
        correctAsset: targetAsset,
        correctTargetPrice: targetPrice,
      };
    }, []);

  // ### Event Handlers ###
  const handleSelectAsset = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsModalOpen(true);
    // Pre-fill target price based on current price for better UX, but agent must calculate the correct one.
    setAlertSettings((s) => ({ ...s, targetPrice: asset.price.toFixed(2) }));
  };

  const handleAddToWatchlist = () => {
    if (!selectedAsset) return;

    const isAssetCorrect = selectedAsset.id === correctAsset.id;
    const isTypeCorrect = alertSettings.type === "above";
    // Allow for minor floating point or rounding differences
    const isPriceCorrect =
      Math.abs(parseFloat(alertSettings.targetPrice) - correctTargetPrice) <
      0.01;
    const isFilterCorrect = activeCategory === "DeFi";

    const wasSuccessful =
      isAssetCorrect && isTypeCorrect && isPriceCorrect && isFilterCorrect;

    setWatchlist((prev) =>
      new Map(prev).set(selectedAsset.id, {
        asset: selectedAsset,
        isCorrect: wasSuccessful,
      })
    );
    setIsModalOpen(false);
    setSelectedAsset(null);

    // Show result in popup
    if (wasSuccessful) {
      setResultMessage({
        type: "success",
        message: `Password: ${PASSWORD_AddToWatchlist}`,
      });
    } else {
      setResultMessage({
        type: "failure",
        message: "Alerts Set Successfully!.",
      });
    }
    setShowResultModal(true);
  };

  // ### Rendering Logic ###
  const filteredAssets =
    activeCategory === "All"
      ? assets
      : assets.filter((a) => a.category === activeCategory);
  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(val);
  const watchlistArray = Array.from(watchlist.values());

  return (
    <div
      className="min-h-screen font-sans p-4 md:p-8"
      style={theme.colors as React.CSSProperties}
    >
      <main className="max-w-7xl mx-auto space-y-8">
        {/* Watchlist Section */}
        <div>
          <h1 className="text-2xl font-bold text-[--c-text-primary] mb-4">
            My Watchlist
          </h1>
          <div className="bg-[--c-card] rounded-lg border border-[--c-border] overflow-hidden">
            {watchlistArray.length === 0 ? (
              <p className="p-6 text-[--c-text-secondary]">
                Your watchlist is empty. Add assets from the market list below.
              </p>
            ) : (
              <ul className="divide-y divide-[--c-border]">
                {watchlistArray.map(({ asset, isCorrect }) => (
                  <li
                    key={asset.id}
                    className="p-4 grid grid-cols-3 md:grid-cols-5 items-center gap-4"
                  >
                    <div className="font-bold text-[--c-text-primary] col-span-1">
                      {asset.name}{" "}
                      <span className="text-[--c-text-secondary]">
                        {asset.ticker}
                      </span>
                    </div>
                    <div className="font-semibold text-right md:text-left text-[--c-text-primary] col-span-1">
                      {formatCurrency(asset.price)}
                    </div>
                    <div
                      className={`font-semibold text-right md:text-left ${
                        asset.change24h > 0 ? "text-green-500" : "text-red-500"
                      } col-span-1`}
                    >
                      {asset.change24h.toFixed(2)}%
                    </div>
                    <div className="col-span-3 md:col-span-2">
                      <div className="text-sm text-[--c-text-secondary]">
                        {isCorrect ? (
                          <span className="text-green-400">
                            ✓ Added successfully
                          </span>
                        ) : (
                          <span className="text-yellow-400">
                            ⚠ Added to watchlist
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Market List Section */}
        <div>
          <h2 className="text-2xl font-bold text-[--c-text-primary] mb-4">
            Market
          </h2>
          <div className="mb-4 flex space-x-2 border-b border-[--c-border]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 font-semibold text-sm rounded-t-md transition-colors ${
                  activeCategory === cat
                    ? "bg-[--c-card] text-[--c-accent]"
                    : "text-[--c-text-secondary] hover:bg-[--c-card]/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="bg-[--c-card] rounded-lg border border-[--c-border]">
            <table className="w-full">
              <thead className="border-b border-[--c-border]">
                <tr className="text-left text-xs text-[--c-text-secondary] uppercase tracking-wider">
                  <th className="p-4">Asset</th>
                  <th className="p-4">Price</th>
                  <th className="p-4 hidden md:table-cell">24h Change</th>
                  <th className="p-4 hidden md:table-cell">24h Volume</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {filteredAssets.map((asset) => (
                  <tr
                    key={asset.id}
                    className="border-b border-[--c-border] last:border-none hover:bg-[--c-bg] transition-colors"
                  >
                    <td className="p-4">
                      <div className="font-bold text-[--c-text-primary]">
                        {asset.name}{" "}
                        <span className="text-[--c-text-secondary]">
                          {asset.ticker}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 font-mono text-[--c-text-primary]">
                      {formatCurrency(asset.price)}
                    </td>
                    <td
                      className={`p-4 font-mono hidden md:table-cell ${
                        asset.change24h > 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {asset.change24h > 0 && "+"}
                      {asset.change24h.toFixed(2)}%
                    </td>
                    <td className="p-4 font-mono text-[--c-text-secondary] hidden md:table-cell">
                      {formatCurrency(asset.volume24h)}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleSelectAsset(asset)}
                        disabled={watchlist.has(asset.id)}
                        className="text-[--c-accent] hover:opacity-80 disabled:text-[--c-text-secondary] disabled:cursor-not-allowed"
                      >
                        <PlusCircleIcon className="h-6 w-6" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal for Alert Configuration */}
        {isModalOpen && selectedAsset && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-[--c-card] border border-[--c-border] rounded-xl shadow-2xl w-full max-w-md p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-[--c-text-primary]">
                  Add {selectedAsset.name} to Watchlist
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-[--c-text-secondary] hover:text-[--c-text-primary]"
                >
                  <XIcon />
                </button>
              </div>
              <p className="text-[--c-text-secondary]">
                Set a price alert to be notified of market movements.
              </p>

              {/* Alert Type */}
              <fieldset className="grid grid-cols-2 gap-4">
                <label
                  htmlFor="type_above"
                  className={`p-4 rounded-lg border-2 cursor-pointer text-center ${
                    alertSettings.type === "above"
                      ? "border-[--c-accent] bg-[--c-accent]/10"
                      : "border-[--c-border]"
                  }`}
                >
                  <input
                    id="type_above"
                    type="radio"
                    name="alertType"
                    value="above"
                    checked={alertSettings.type === "above"}
                    onChange={(e) =>
                      setAlertSettings((s) => ({
                        ...s,
                        type: e.target.value as "above" | "below",
                      }))
                    }
                    className="sr-only"
                  />
                  <ArrowUpIcon className="h-6 w-6 mx-auto mb-2 text-green-400" />
                  <span className="font-semibold text-[--c-text-primary]">
                    Price Rises Above
                  </span>
                </label>
                <label
                  htmlFor="type_below"
                  className={`p-4 rounded-lg border-2 cursor-pointer text-center ${
                    alertSettings.type === "below"
                      ? "border-[--c-accent] bg-[--c-accent]/10"
                      : "border-[--c-border]"
                  }`}
                >
                  <input
                    id="type_below"
                    type="radio"
                    name="alertType"
                    value="below"
                    checked={alertSettings.type === "below"}
                    onChange={(e) =>
                      setAlertSettings((s) => ({
                        ...s,
                        type: e.target.value as "above" | "below",
                      }))
                    }
                    className="sr-only"
                  />
                  <ArrowDownIcon className="h-6 w-6 mx-auto mb-2 text-red-400" />
                  <span className="font-semibold text-[--c-text-primary]">
                    Price Drops Below
                  </span>
                </label>
              </fieldset>

              {/* Target Price Input */}
              <div>
                <label
                  htmlFor="target_price"
                  className="block text-sm font-medium text-[--c-text-secondary] mb-1"
                >
                  Target Price (USD)
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-[--c-text-secondary]">$</span>
                  </div>
                  <input
                    type="number"
                    id="target_price"
                    value={alertSettings.targetPrice}
                    onChange={(e) =>
                      setAlertSettings((s) => ({
                        ...s,
                        targetPrice: e.target.value,
                      }))
                    }
                    className="bg-[--c-bg] border border-[--c-border] rounded-md w-full p-2 pl-7 font-mono text-[--c-text-primary] focus:ring-1 focus:ring-[--c-accent] focus:border-[--c-accent]"
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>
              </div>

              <button
                onClick={handleAddToWatchlist}
                className="w-full font-bold py-3 px-4 rounded-lg text-[--c-text-primary] bg-[--c-accent] hover:opacity-90 transition-all"
              >
                Set Alert & Add to Watchlist
              </button>
            </div>
          </div>
        )}

        {/* Result Modal */}
        {showResultModal && resultMessage && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-[--c-card] border border-[--c-border] rounded-xl shadow-2xl w-full max-w-md h-48 p-6 space-y-12">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-[--c-text-primary]">
                  {"Success!"}
                </h3>
              </div>
              <h1 className="font-bold text-center">{resultMessage.message}</h1>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AddToWatchlist;
