import React, { useState } from "react";

export const PASSWORD_GroceryReorder = "SoyaMilkReorderd";
export const TASK_ID_GroceryReorder = "ecommerce-cart-substituteitem";

const pastOrders = ["Almond Milk", "Bread", "Eggs", "Apples"];
const substituteSuggestions = ["Soya Milk", "Oat Milk", "Coconut Milk"];

const GroceryReorderSubstitution: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [substitute, setSubstitute] = useState<string>("");
  const [confirmed, setConfirmed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleReorder = () => {
    const newErrors: { [key: string]: string } = {};

    if (!selectedItem) newErrors.selectedItem = "Please select an item.";
    if (selectedItem === "Almond Milk" && !substitute)
      newErrors.substitute = "Please select a substitute.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setConfirmed(true);
    if (selectedItem === "Almond Milk" && substitute === "Soya Milk") {
      setShowPassword(true);
    } else {
      setShowPassword(false);
    }
  };

  if (confirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-8 space-y-10 font-sans">
        <header className="bg-green-600 text-white py-4 px-8 rounded-lg shadow">
          <h1 className="text-3xl font-bold">🛒 Order Groceries</h1>
          <p className="text-sm mt-1">
            Review your past order and complete your reorder.
          </p>
        </header>

        <section className="bg-white p-6 rounded-xl shadow-lg max-w-3xl mx-auto text-center space-y-6">
          {showPassword ? (
            <div className="bg-green-100 border border-green-400 rounded p-4 text-green-800 font-semibold text-lg">
              ✅ Substitution accepted and Order completed!
              <br />
              Password:{" "}
              <span className="font-bold">{PASSWORD_GroceryReorder}</span>
            </div>
          ) : (
            <div className="text-yellow-700 font-medium">
              🛒 Your Order has been submitted successfully.
            </div>
          )}
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-8 space-y-10 font-sans">
      <header className="bg-green-600 text-white py-4 px-8 rounded-lg shadow">
        <h1 className="text-3xl font-bold">🛒 Order Groceries</h1>
        <p className="text-sm mt-1">
          Review your past order and complete your reorder.
        </p>
      </header>

      <section className="bg-white p-6 rounded-xl shadow-lg max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold text-green-700 mb-4">
          Past Order Items
        </h2>
        <ul className="list-disc pl-5 space-y-1 text-gray-800">
          {pastOrders.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="mt-6">
          <label className="block font-medium text-gray-700 mb-1">
            Select item to reorder
          </label>
          <select
            value={selectedItem}
            onChange={(e) => {
              setSelectedItem(e.target.value);
              setSubstitute("");
              setErrors((prev) => ({ ...prev, selectedItem: "" }));
            }}
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">-- Choose an item --</option>
            {pastOrders.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          {errors.selectedItem && (
            <p className="text-red-600 text-sm mt-1">{errors.selectedItem}</p>
          )}
        </div>

        {selectedItem === "Almond Milk" && (
          <div className="mt-4">
            <label className="block font-medium text-gray-700 mb-1">
              "{selectedItem}" is out of stock. Select a substitute:
            </label>
            <select
              value={substitute}
              onChange={(e) => {
                setSubstitute(e.target.value);
                setErrors((prev) => ({ ...prev, substitute: "" }));
              }}
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="">-- Choose a substitute --</option>
              {substituteSuggestions.map((alt) => (
                <option key={alt} value={alt}>
                  {alt}
                </option>
              ))}
            </select>
            {errors.substitute && (
              <p className="text-red-600 text-sm mt-1">{errors.substitute}</p>
            )}
          </div>
        )}

        {selectedItem && selectedItem !== "Almond Milk" && (
          <div className="mt-4 text-green-700 font-medium">
            ✅ "{selectedItem}" is in stock.
          </div>
        )}

        <div className="text-center mt-6">
          <button
            onClick={handleReorder}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-bold"
          >
            Confirm Reorder
          </button>
        </div>
      </section>
    </div>
  );
};

export default GroceryReorderSubstitution;
