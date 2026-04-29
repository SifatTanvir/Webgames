import React, { useState } from "react";
import { useTaskAnalytics } from "../utils/useTaskAnalytics";

export const PASSWORD_RestaurantHost = "BonAppetite";
export const TASK_ID_RestaurantHost = "ecommerce-restaurant-guestseating";

const originalStaffNames = ["Emily", "James", "Olivia", "Liam", "Sophia", "Noah"];
const staffNames = [...originalStaffNames].sort(() => Math.random() - 0.5);
const shiftTimes = ["Morning", "Afternoon", "Evening"];

const guestPreferences = {
  dietary: "Vegetarian",
  seat: "Window"
};

type Table = {
  id: number;
  seat: string;
};

type Dish = {
  name: string;
  type: string;
};

const tables: Table[] = [
  { id: 1, seat: "Window" },
  { id: 2, seat: "Center" },
  { id: 3, seat: "Patio" }
];

const dishes: Dish[] = [
  { name: "Grilled Veggie Platter", type: "Vegetarian" },
  { name: "Steak & Fries", type: "Non-Vegetarian" },
  { name: "Tofu Salad", type: "Vegetarian" },
  { name: "Stuffed Bell Peppers", type: "Vegetarian" }
];

const RestaurantHost: React.FC = () => {
  const { recordSuccess } = useTaskAnalytics(TASK_ID_RestaurantHost)
  const [step, setStep] = useState(1);
  const [selectedStaff, setSelectedStaff] = useState("");
  const [selectedShift, setSelectedShift] = useState("");
  const [seatedTable, setSeatedTable] = useState<Table | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSeating = (table: Table) => {
    setSeatedTable(table);
    setStep(4);
  };

  const handleDishClick = (dish: Dish) => {
    const isCorrectCombo =
      selectedStaff === "James" &&
      selectedShift === "Evening" &&
      seatedTable?.id === 1 &&
      dish.name === "Tofu Salad" &&
      dish.type === guestPreferences.dietary;

    if (isCorrectCombo) {
      setShowPassword(true);
      recordSuccess();
    } else {
      setShowPassword(false);
    }
    setStep(5);
  };

  const handleStaffClick = (name: string) => {
    setSelectedStaff(name);
    setStep(2);
  };

  const handleShiftClick = (shift: string) => {
    setSelectedShift(shift);
    setStep(3);
  };

  return (
    <div className="min-h-screen w-full font-sans">
      {step === 1 && (
        <div
          className="bg-cover bg-center min-h-screen flex items-center justify-center text-white"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1579027989536-b7b1f875659b?q=80&w=2070)` }}
        >
          <div className="w-1/2 p-10 flex items-center justify-center border-r border-white border-opacity-20">
            <h1 className="text-4xl font-bold text-left">🍽️ Welcome,<br />To The Restaurant</h1>
          </div>

          <div className="w-1/2 p-10 grid grid-cols-1 gap-4">
          <div className="bg-black bg-opacity-60 backdrop-blur p-4 rounded-3xl w-full max-w-xl">
            <h1 className="text-3xl font-bold mb-6">👨🏻‍🍳 Select Your Staff Name 👩🏻‍🍳</h1>
          </div>
            {staffNames.map((name) => (
              <button
                key={name}
                onClick={() => handleStaffClick(name)}
                className={` flex w-full max-w-6xl py-4 px-6 rounded-3xl shadow text-lg font-semibold transition-all duration-200 ${selectedStaff === name ? 'bg-yellow-300 text-black' : ' text-white bg-black bg-opacity-60 backdrop-blur rounded-3xl overflow-hidden'} hover:bg-red-200 transform hover:-translate-y-2 transition duration-200`}
              >
                {name === "Emily" || name === "Olivia" || name === "Sophia" ? "👩" : "👨"} {name}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div
          className="bg-cover bg-center min-h-screen flex flex-col items-center justify-center text-white gap-2"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1517638851339-a711cfcf3279?q=80&w=2070)` }}
        >
          <div className="bg-black bg-opacity-60 backdrop-blur p-4 rounded-3xl w-full max-w-xl">
            <h1 className="text-3xl font-bold mb-6">⏰ Select Your Shift</h1>
          </div>
          <div className="w-1/2 p-10 flex items-center justify-center border-r border-white border-opacity-20">
            <div className="w-1/2 p-10 grid grid-cols-1 gap-4">
              {shiftTimes.map((shift) => (
                <button
                  key={shift}
                  onClick={() => handleShiftClick(shift)}
                  className={`flex w-full max-w-6xl py-4 px-6 rounded-3xl shadow text-lg font-semibold transition-all duration-200 ${selectedShift === shift ? 'bg-yellow-300 text-black' : 'text-white bg-black bg-opacity-60 backdrop-blur rounded-3xl overflow-hidden'} hover:bg-red-200 transform hover:-translate-y-2 transition duration-200`}
                >
                  {shift}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div
          className="bg-cover bg-center min-h-screen flex flex-col items-center justify-center text-white gap-6"
          style={{ backgroundImage: "url(https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?q=80&w=2089)" }}
        >
          <div className="bg-black bg-opacity-60 backdrop-blur p-4 rounded-3xl w-full max-w-xl">
            <h2 className="text-3xl font-bold mb-2 text-center">🪑 Seat the Guests</h2>
          </div>

          <div className="p-10 rounded-3xl max-w-6xl flex flex-col items-center space-y-8">
            {tables.map((table, index) => (
              <div
                key={table.id}
                className={`flex w-full ${index % 2 === 0 ? "justify-end" : "justify-start"}`}
              >
                <button
                  onClick={() => handleSeating(table)}
                  className="w-96 flex items-center justify-between bg-black bg-opacity-60 backdrop-blur p-6 rounded-3xl transition duration-300 hover:bg-red-200 transform hover:-translate-y-2 transition duration-200"
                >
                  <div className="text-lg font-semibold">🍽️ Table {table.id}</div>
                  <div className="text-2xl px-2">→</div>
                  <div className="text-lg font-semibold">{table.seat} Seat</div>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 4 && (
        <div
          className="bg-cover bg-center min-h-screen flex flex-col items-center justify-center text-white text-center gap-4"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1565895405227-31cffbe0cf86?q=80&w=2070)` }}
        >
          <div className="bg-black bg-opacity-60 backdrop-blur p-10 rounded-3xl max-w-3xl">
            <h2 className="text-3xl font-bold mb-4">👨‍🍳 Pick the Dish</h2>
          </div>
          <div className="bg-black bg-opacity-60 backdrop-blur p-10 rounded-3xl max-w-3xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {dishes.map((dish) => (
                <button
                  key={dish.name}
                  onClick={() => handleDishClick(dish)}
                  className="text-white py-3 px-6 rounded-3xl font-semibold shadow hover:bg-red-200 transform hover:-translate-y-2 transition duration-200 bg-black bg-opacity-60 backdrop-blur p-10 rounded-3xl max-w-3xl"
                >
                  🍽️ {dish.name} ({dish.type})
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 5 && (
        <div
          className="bg-cover bg-center min-h-screen flex items-center justify-center text-white"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1502301103665-0b95cc738daf?w=900&q=60)` }}
        >
          <div className="bg-black bg-opacity-60 backdrop-blur p-10 rounded-3xl text-center">
            {showPassword ? (
              <>
                <h2 className="text-3xl font-bold mb-4">✅ Table Booked</h2>
                🎉 Congratulations! Your seat is reserved.🍽️✨
                <p className="text-2xl">Password:</p>
                <p className="text-3xl font-bold mt-2 text-green-300">{PASSWORD_RestaurantHost}</p>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-4">✅ Table Booked</h2>
                🎉 Congratulations! Your seat is reserved.🍽️✨
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantHost;
