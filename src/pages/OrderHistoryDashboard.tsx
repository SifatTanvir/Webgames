import React, { useState, useEffect, useMemo } from "react";

export const PASSWORD_OrderHistoryDashboard = "Frequentreturns";
export const TASK_ID_OrderHistoryDashboard = "ecommerce-pattern-orderhistory";

interface OrderData {
  id: string;
  sku: string;
  productName: string;
  category: string;
  buyerRegion: string;
  orderDate: string;
  returnCount: number;
  revenue: number;
  units: number;
}

const OrderHistoryDashboard: React.FC = () => {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [selectedSKUs, setSelectedSKUs] = useState<Set<string>>(new Set());
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [regionFilter, setRegionFilter] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [secretRevealed, setSecretRevealed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState(false);
  const [colorTheme, setColorTheme] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [returnCount, setReturnCount] = useState<number>(0);
  const [prompt, setPrompt] = useState<string>("");

  // Random color themes
  const colorThemes = [
    {
      name: "blue",
      primary: "#3B82F6",
      secondary: "#EFF6FF",
      accent: "#1E40AF",
      text: "#1E3A8A",
    },
    {
      name: "purple",
      primary: "#8B5CF6",
      secondary: "#F3E8FF",
      accent: "#7C3AED",
      text: "#5B21B6",
    },
    {
      name: "green",
      primary: "#10B981",
      secondary: "#ECFDF5",
      accent: "#059669",
      text: "#065F46",
    },
    {
      name: "orange",
      primary: "#F59E0B",
      secondary: "#FFFBEB",
      accent: "#D97706",
      text: "#92400E",
    },
    {
      name: "teal",
      primary: "#14B8A6",
      secondary: "#F0FDFA",
      accent: "#0D9488",
      text: "#134E4A",
    },
  ];

  // Generate random data
  const generateRandomData = (): OrderData[] => {
    const categories = [
      "Electronics",
      "Clothing",
      "Home & Garden",
      "Sports",
      "Books",
      "Toys",
      "Beauty",
      "Automotive",
    ];
    const regions = [
      "North America",
      "Europe",
      "Asia Pacific",
      "Latin America",
      "Middle East",
      "Africa",
    ];
    const productPrefixes = ["PRO", "ADV", "ULT", "PRE", "ECO", "LUX"];

    const data: OrderData[] = [];

    for (let i = 1; i <= 5; i++) {
      const category =
        categories[Math.floor(Math.random() * categories.length)];
      const prefix =
        productPrefixes[Math.floor(Math.random() * productPrefixes.length)];
      const returnCount = Math.floor(Math.random() * 50);

      data.push({
        id: `ORD-${String(i).padStart(3, "0")}`,
        sku: `${prefix}-${String(1000 + i).slice(-3)}-${category
          .slice(0, 3)
          .toUpperCase()}`,
        productName: generateProductName(category),
        category,
        buyerRegion: "Latin America",
        orderDate: generateRandomDate(),
        returnCount,
        revenue: Math.floor(Math.random() * 10000) + 500,
        units: Math.floor(Math.random() * 100) + 1,
      });
    }

    // Step 2: Generate the remaining 30 randomly
    for (let i = 6; i <= 35; i++) {
      const category =
        categories[Math.floor(Math.random() * categories.length)];
      const region = regions[Math.floor(Math.random() * regions.length)];
      const prefix =
        productPrefixes[Math.floor(Math.random() * productPrefixes.length)];
      const returnCount = Math.floor(Math.random() * 50);

      data.push({
        id: `ORD-${String(i).padStart(3, "0")}`,
        sku: `${prefix}-${String(1000 + i).slice(-3)}-${category
          .slice(0, 3)
          .toUpperCase()}`,
        productName: generateProductName(category),
        category,
        buyerRegion: region,
        orderDate: generateRandomDate(),
        returnCount,
        revenue: Math.floor(Math.random() * 10000) + 500,
        units: Math.floor(Math.random() * 100) + 1,
      });
    }
    return data.sort((a, b) => b.returnCount - a.returnCount);
  };

  const generateProductName = (category: string): string => {
    const productNames: { [key: string]: string[] } = {
      Electronics: [
        "Wireless Headphones",
        "Smart Watch",
        "Tablet Pro",
        "Gaming Mouse",
        "Bluetooth Speaker",
      ],
      Clothing: [
        "Cotton T-Shirt",
        "Denim Jacket",
        "Running Shoes",
        "Wool Sweater",
        "Casual Pants",
      ],
      "Home & Garden": [
        "Coffee Maker",
        "Garden Hose",
        "LED Lamp",
        "Storage Box",
        "Plant Pot",
      ],
      Sports: [
        "Yoga Mat",
        "Dumbbells",
        "Basketball",
        "Tennis Racket",
        "Running Belt",
      ],
      Books: [
        "Programming Guide",
        "Mystery Novel",
        "Cookbook",
        "History Book",
        "Science Fiction",
      ],
      Toys: [
        "Building Blocks",
        "Action Figure",
        "Puzzle Game",
        "Remote Car",
        "Board Game",
      ],
      Beauty: ["Face Cream", "Shampoo", "Lipstick", "Perfume", "Moisturizer"],
      Automotive: [
        "Car Cover",
        "Floor Mats",
        "Air Freshener",
        "Phone Mount",
        "Cleaning Kit",
      ],
    };

    const names = productNames[category] || ["Generic Product"];
    return names[Math.floor(Math.random() * names.length)];
  };

  const generateRandomDate = (): string => {
    const start = new Date(2024, 0, 1);
    const end = new Date();
    const randomDate = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
    return randomDate.toISOString().split("T")[0];
  };

  // Initialize data and theme on component mount
  useEffect(() => {
    const newData = generateRandomData();
    setOrders(newData);
    const regions = [...new Set(newData.map((order) => order.buyerRegion))];
    console.log(regions);

    const customeRegion = regions[Math.floor(Math.random() * regions.length)];
    console.log(customeRegion);
    setLocation(() => customeRegion);
    const length =
      newData.filter((d) => d.buyerRegion === customeRegion).length || 1;
    const tagNumber =
      length < Math.floor(Math.random() * 3)
        ? length
        : Math.floor(Math.random() * 3) + 1;
    setReturnCount(() => tagNumber);
    const prompt = `You are on an e-commerce Order History dashboard. Filter the orders by region "${customeRegion}". Sort the list by Return Count in descending order. From the sorted data, identify the top ${tagNumber} SKUs with the highest returns and mark them as “High Risk” using the provided tagging option. If done correctly, a secret password will appear. Return this password as answer.`;
    setPrompt(() => prompt);
    const randomTheme =
      colorThemes[Math.floor(Math.random() * colorThemes.length)];
    setColorTheme(randomTheme.name);

    // Apply CSS variables for the theme
    document.documentElement.style.setProperty(
      "--theme-primary",
      randomTheme.primary
    );
    document.documentElement.style.setProperty(
      "--theme-secondary",
      randomTheme.secondary
    );
    document.documentElement.style.setProperty(
      "--theme-accent",
      randomTheme.accent
    );
    document.documentElement.style.setProperty(
      "--theme-text",
      randomTheme.text
    );
  }, [newTask]);

  // Filter and sort data
  const filteredAndSortedOrders = useMemo(() => {
    let filtered = orders.filter((order) => {
      const categoryMatch =
        !categoryFilter || order.category === categoryFilter;
      const regionMatch = !regionFilter || order.buyerRegion === regionFilter;
      return categoryMatch && regionMatch;
    });

    return filtered.sort((a, b) => {
      if (sortOrder === "desc") {
        return b.returnCount - a.returnCount;
      } else {
        return a.returnCount - b.returnCount;
      }
    });
  }, [orders, categoryFilter, regionFilter, sortOrder]);

  // Get unique categories and regions for filters
  const categories = [...new Set(orders.map((order) => order.category))].sort();
  const regions = [...new Set(orders.map((order) => order.buyerRegion))].sort();

  // Get top 3 highest return SKUs from original data (not filtered)
  const topThreeHighestReturns = useMemo(() => {
    return [...orders]
      .filter((o) => o.buyerRegion === location)
      .sort((a, b) => b.returnCount - a.returnCount)
      .slice(0, returnCount)
      .map((order) => order.sku);
  }, [orders]);

  const handleSKUSelection = (sku: string) => {
    const newSelected = new Set(selectedSKUs);
    if (newSelected.has(sku)) {
      newSelected.delete(sku);
    } else {
      newSelected.add(sku);
    }
    setSelectedSKUs(newSelected);
  };

  const handleTagHighRisk = () => {
    const selectedArray = Array.from(selectedSKUs);
    const isCorrect =
      selectedArray.length === returnCount &&
      selectedArray.every((sku) => topThreeHighestReturns.includes(sku));

    if (
      isCorrect &&
      regionFilter === location &&
      regionFilter === location &&
      sortOrder === "desc"
    ) {
      setSecretRevealed(true);
    }
    setShowModal(true);
  };

  return (
    <div>
      <div className="sticky top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-xl">
        <div className="max-w-7xl mx-auto flex justify-center items-center p-4">
          <div className="flex-1 mr-4">
            <h1 className="text-xl font-bold mb-2 flex items-center">
              ⚡ Order History Dashboard
            </h1>
            <p className="text-sm opacity-90 leading-relaxed">{prompt}</p>
          </div>
          <button
            onClick={() => setNewTask((prev) => !prev)}
            className="bg-white text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors whitespace-nowrap flex items-center gap-2"
          >
            🔄 New Task
          </button>
        </div>
      </div>

      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "var(--theme-secondary)",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: "var(--theme-primary)",
            color: "white",
            padding: "1.5rem 2rem",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <h1 style={{ margin: 0, fontSize: "1.875rem", fontWeight: "bold" }}>
              Order History Dashboard
            </h1>
            <p style={{ margin: "0.5rem 0 0 0", opacity: 0.9 }}>
              E-commerce Analytics • Theme:{" "}
              {colorTheme.charAt(0).toUpperCase() + colorTheme.slice(1)}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
          {/* Controls Section */}
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "1.5rem",
              marginBottom: "1.5rem",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              border: "1px solid #e5e7eb",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1rem",
                alignItems: "end",
              }}
            >
              {/* Category Filter */}
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                    color: "var(--theme-text)",
                  }}
                >
                  Product Category
                </label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "2px solid #e5e7eb",
                    borderRadius: "6px",
                    fontSize: "0.875rem",
                    backgroundColor: "white",
                  }}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Region Filter */}
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                    color: "var(--theme-text)",
                  }}
                >
                  Buyer Region
                </label>
                <select
                  value={regionFilter}
                  onChange={(e) => setRegionFilter(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "2px solid #e5e7eb",
                    borderRadius: "6px",
                    fontSize: "0.875rem",
                    backgroundColor: "white",
                  }}
                >
                  <option value="">All Regions</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Control */}
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                    color: "var(--theme-text)",
                  }}
                >
                  Sort by Return Count
                </label>
                <select
                  value={sortOrder}
                  onChange={(e) =>
                    setSortOrder(e.target.value as "asc" | "desc")
                  }
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "2px solid #e5e7eb",
                    borderRadius: "6px",
                    fontSize: "0.875rem",
                    backgroundColor: "white",
                  }}
                >
                  <option value="desc">Highest First</option>
                  <option value="asc">Lowest First</option>
                </select>
              </div>

              {/* Reset Button */}
              <div></div>
            </div>
          </div>

          {/* High Risk Tagging Section */}
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "1.5rem",
              marginBottom: "1.5rem",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              border: "1px solid #e5e7eb",
            }}
          >
            <h3
              style={{
                margin: "0 0 1rem 0",
                color: "var(--theme-text)",
                fontSize: "1.125rem",
                fontWeight: "600",
              }}
            >
              🎯 High Risk SKU Identification
            </h3>
            <p
              style={{
                margin: "0 0 1rem 0",
                color: "#6B7280",
                fontSize: "0.875rem",
              }}
            >
              Select the SKUs with the highest return counts and tag them as
              "High Risk".
            </p>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <button
                onClick={handleTagHighRisk}
                disabled={selectedSKUs.size === 0}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor:
                    selectedSKUs.size !== 0
                      ? "var(--theme-primary)"
                      : "#9CA3AF",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  cursor: selectedSKUs.size !== 0 ? "pointer" : "not-allowed",
                  transition: "all 0.2s",
                }}
              >
                🏷️ Tag as High Risk
              </button>
              {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-lg p-8 mx-60 w-full text-center shadow-2xl">
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl text-white">🎉</span>
                      </div>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        High Risk Tagged
                      </h2>
                      <p className="text-gray-600 mt-2">
                        SKU(s) with high risks tagged successfully
                      </p>
                    </div>
                    {secretRevealed && (
                      <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-lg border-2 border-dashed border-green-300">
                        <p className="text-sm text-green-500 mb-2">
                          Secret Password:
                        </p>
                        <div className="text-3xl font-mono font-bold text-green-600 tracking-wider">
                          {PASSWORD_OrderHistoryDashboard}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Data Table */}
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              border: "1px solid #e5e7eb",
            }}
          >
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "var(--theme-secondary)" }}>
                    <th style={headerStyle}>Select</th>
                    <th style={headerStyle}>SKU</th>
                    <th style={headerStyle}>Product Name</th>
                    <th style={headerStyle}>Category</th>
                    <th style={headerStyle}>Buyer Region</th>
                    <th style={headerStyle}>Order Date</th>
                    <th
                      style={{
                        ...headerStyle,
                        backgroundColor: "var(--theme-primary)",
                        color: "white",
                      }}
                    >
                      Return Count
                    </th>
                    <th style={headerStyle}>Revenue</th>
                    <th style={headerStyle}>Units</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedOrders.map((order, index) => (
                    <tr
                      key={order.id}
                      style={{
                        backgroundColor: index % 2 === 0 ? "white" : "#F9FAFB",
                        borderBottom: "1px solid #E5E7EB",
                      }}
                    >
                      <td style={cellStyle}>
                        <input
                          type="checkbox"
                          checked={selectedSKUs.has(order.sku)}
                          onChange={() => handleSKUSelection(order.sku)}
                          style={{
                            width: "16px",
                            height: "16px",
                            cursor: "pointer",
                            accentColor: "var(--theme-primary)",
                          }}
                        />
                      </td>
                      <td
                        style={{
                          ...cellStyle,
                          fontFamily: "monospace",
                          fontWeight: "600",
                        }}
                      >
                        {order.sku}
                      </td>
                      <td style={cellStyle}>{order.productName}</td>
                      <td style={cellStyle}>
                        <span
                          style={{
                            padding: "0.25rem 0.5rem",
                            backgroundColor: "var(--theme-secondary)",
                            color: "var(--theme-text)",
                            borderRadius: "4px",
                            fontSize: "0.75rem",
                            fontWeight: "500",
                          }}
                        >
                          {order.category}
                        </span>
                      </td>
                      <td style={cellStyle}>{order.buyerRegion}</td>
                      <td style={cellStyle}>{order.orderDate}</td>
                      <td
                        style={{
                          ...cellStyle,
                          fontWeight: "bold",
                          color:
                            order.returnCount > 20
                              ? "#DC2626"
                              : order.returnCount > 10
                              ? "#D97706"
                              : "#059669",
                        }}
                      >
                        {order.returnCount}
                      </td>
                      <td style={cellStyle}>
                        ${order.revenue.toLocaleString()}
                      </td>
                      <td style={cellStyle}>{order.units}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
              marginTop: "1.5rem",
            }}
          >
            <div style={statCardStyle}>
              <h4 style={statTitleStyle}>Total Orders</h4>
              <p style={statValueStyle}>{filteredAndSortedOrders.length}</p>
            </div>
            <div style={statCardStyle}>
              <h4 style={statTitleStyle}>Total Returns</h4>
              <p style={statValueStyle}>
                {filteredAndSortedOrders.reduce(
                  (sum, order) => sum + order.returnCount,
                  0
                )}
              </p>
            </div>
            <div style={statCardStyle}>
              <h4 style={statTitleStyle}>Total Revenue</h4>
              <p style={statValueStyle}>
                $
                {filteredAndSortedOrders
                  .reduce((sum, order) => sum + order.revenue, 0)
                  .toLocaleString()}
              </p>
            </div>
            <div style={statCardStyle}>
              <h4 style={statTitleStyle}>Avg Return Rate</h4>
              <p style={statValueStyle}>
                {filteredAndSortedOrders.length > 0
                  ? Math.round(
                      (filteredAndSortedOrders.reduce(
                        (sum, order) => sum + order.returnCount,
                        0
                      ) /
                        filteredAndSortedOrders.length) *
                        100
                    ) / 100
                  : 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles
const headerStyle: React.CSSProperties = {
  padding: "1rem",
  textAlign: "left",
  fontWeight: "600",
  fontSize: "0.875rem",
  color: "var(--theme-text)",
  borderBottom: "2px solid #E5E7EB",
};

const cellStyle: React.CSSProperties = {
  padding: "0.75rem 1rem",
  fontSize: "0.875rem",
  color: "#374151",
};

const statCardStyle: React.CSSProperties = {
  backgroundColor: "white",
  padding: "1.5rem",
  borderRadius: "8px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  border: "1px solid #e5e7eb",
  textAlign: "center",
};

const statTitleStyle: React.CSSProperties = {
  margin: "0 0 0.5rem 0",
  fontSize: "0.875rem",
  fontWeight: "500",
  color: "#6B7280",
};

const statValueStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "1.5rem",
  fontWeight: "bold",
  color: "var(--theme-primary)",
};

export default OrderHistoryDashboard;
