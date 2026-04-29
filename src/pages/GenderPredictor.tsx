import React, { useState } from "react";
export const TASK_ID_GenderPredictor = "productivity-gender-gendersense";
export const PASSWORD_GenderPredictor = "namegender";

type GenderResult = {
  name: string;
  gender: string;
  probability: number;
};

const GenderPredictor: React.FC = () => {
  const [name, setName] = useState("");
  const [result, setResult] = useState<GenderResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const isValidName = (value: string) => /^[A-Za-z\s]+$/.test(value.trim());

  const fetchGender = async () => {
    setError("");
    setResult(null);

    if (!name.trim()) {
      setError("Please enter a name.");
      return;
    }

    if (!isValidName(name)) {
      setError("Name must contain only alphabetic characters.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://api.genderize.io/?name=${name}`);
      const data = await response.json();
      setResult(data);
      setDisabled(true);
      setShowPassword(true);
    } catch (error) {
      console.error("Error fetching gender:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 flex flex-col items-center pt-24 px-4 font-sans">
      <div className="bg-white/90 backdrop-blur-sm p-10 rounded-3xl shadow-xl w-full max-w-lg text-center">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-500 mb-8">
          🧬 Gender Predictor
        </h1>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          <input
            type="text"
            value={name}
            disabled={disabled}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a name"
            className={`w-full sm:w-auto flex-1 px-5 py-3 rounded-xl border ${
              error ? "border-red-400" : "border-gray-300"
            } shadow focus:outline-none focus:ring-2 ${
              error ? "focus:ring-red-300" : "focus:ring-purple-400"
            } transition`}
          />
          <button
            onClick={fetchGender}
            disabled={loading || disabled}
            className={`px-6 py-3 rounded-xl text-white font-semibold transition ${
              loading || disabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {loading ? "Predicting..." : "Submit"}
          </button>
        </div>

        {error && (
          <p className="text-red-600 text-sm mb-4">{error}</p>
        )}

        {result && (
          <div className="bg-gray-50 border border-purple-200 p-6 rounded-2xl text-left shadow-inner transition-all">
            <div className="mb-3">
              <span className="font-semibold text-gray-600">🔤 Name:</span>{" "}
              <span className="text-lg font-bold text-gray-800">{result.name}</span>
            </div>
            <div className="mb-3">
              <span className="font-semibold text-gray-600">👤 Predicted Gender:</span>{" "}
              <span className="text-lg font-bold capitalize text-blue-600">{result.gender}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-600">📊 Confidence:</span>{" "}
              <span className="text-lg font-bold text-green-700">
                {(result.probability * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        )}

        {showPassword && (
          <div className="mt-8 border border-indigo-300 bg-indigo-50 p-5 rounded-xl shadow-inner text-center">
            <p className="text-green-600 text-lg font-medium mb-2">✅ Gender prediction complete!</p>
            <p className="text-gray-700 text-sm mb-2">Unlock password:</p>
            <div className="bg-white border border-indigo-500 text-indigo-700 font-bold px-6 py-2 rounded-lg tracking-widest text-lg inline-block shadow">
              {PASSWORD_GenderPredictor}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenderPredictor;
