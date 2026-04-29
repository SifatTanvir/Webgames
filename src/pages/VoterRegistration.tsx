import React, { useState } from "react";

export const PASSWORD_VoterRegistrationUpdate = "UpdatedVoterId";
export const TASK_ID_VoterRegistrationUpdate = "civic-utlitiy-updateregistration";

const VALID_USERNAME = "Amli";
const VALID_ADDRESS = "42B Civic Center Road, Springfield";
const VALID_LOCATION = "Springfield High School";
const VALID_ID_URL = "https://tinyurl.com/yd7pybpa";

const VoterRegistrationUpdate: React.FC = () => {
  const [step, setStep] = useState(1);

  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [idUrl, setIdUrl] = useState("");
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileError, setFileError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");

  const handleNextFromForm = () => {
    if (!username.trim() || !address.trim() || !location || !fileUploaded || !idUrl.startsWith("http")) {

      setFormError("⚠️ All fields must be filled.");
      return;
    }

    setFormError("");

    const isValid =
      username.trim() === VALID_USERNAME &&
      address.trim() === VALID_ADDRESS &&
      location === VALID_LOCATION &&
      idUrl === VALID_ID_URL;

    setShowPassword(isValid);
    setStep(3);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 px-4 py-10">
      <div className="w-full max-w-2xl bg-white p-8 rounded-3xl shadow-[0_10px_25px_rgba(0,0,0,0.1)] space-y-6 border-2 border-pink-300">
        {step === 1 && (
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-extrabold text-rose-700">👋 Welcome to the Voter Portal</h1>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-rose-300"
            />
            <button
              disabled={!username.trim()}
              onClick={() => setStep(2)}
              className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition disabled:opacity-50"
            >
              🎯 Start Update
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-purple-800 text-center">🗳️ Voter Registration</h1>
            <div className="text-center font-medium text-gray-700 mb-4">
              👤 Hello, <span className="text-purple-700 font-semibold">{username}</span>
            </div>

            <div className="space-y-5 bg-gradient-to-tr from-white to-indigo-50 p-6 rounded-xl border border-indigo-300 shadow-inner">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">🏠 New Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your new address"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">🪪 ID Proof URL</label>
                <input
                  type="url"
                  value={idUrl}
                  onChange={(e) => {
                    const input = e.target.value.trim();
                    setIdUrl(input);

                    try {
                      new URL(input);
                      setFileUploaded(true);
                      setFileError("");
                    } catch {
                      setFileUploaded(false);
                      setFileError("Please enter a valid URL");
                    }
                  }}
                  placeholder="Paste your ID Proof URL"
                  className={`w-full px-4 py-2 rounded-xl border ${fileUploaded ? "border-green-400" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                />
                {fileError && <p className="text-red-600 text-sm mt-1">{fileError}</p>}
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">📍 New Polling Location</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  <option value="">-- Choose a location --</option>
                  <option value="Downtown Library">Downtown Library</option>
                  <option value="Community Hall East">Community Hall East</option>
                  <option value="Springfield High School">Springfield High School</option>
                  <option value="City Mall Voting Center">City Mall Voting Center</option>
                </select>
              </div>
            </div>

            {formError && <p className="text-red-500 font-semibold text-center">{formError}</p>}

            <div className="text-center">
              <button
                onClick={handleNextFromForm}
                className="bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-bold px-6 py-3 rounded-full shadow-lg transition"
              >
                ✅ Confirm Changes
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 text-center">
            <h2 className="text-3xl font-bold text-pink-700">📋 Review Summary</h2>

            <div className="text-left bg-white border-l-4 border-fuchsia-400 p-6 rounded-xl shadow-md">
              <ul className="space-y-2 text-gray-800 font-medium">
                <li><strong>👤 Name:</strong> {username}</li>
                <li><strong>🏠 Address:</strong> {address}</li>
                <li><strong>📍 Location:</strong> {location}</li>
                <li>
                  <strong>🪪 ID Proof URL:</strong>{" "}
                  <span className={fileUploaded ? "text-green-600" : "text-red-500"}>{fileUploaded ? "Valid" : "Invalid"}</span>
                </li>
              </ul>
            </div>

            {fileUploaded && (
              <div className="bg-white border border-indigo-300 p-4 rounded-xl shadow-sm text-left">
                <h3 className="text-lg font-bold text-indigo-700 mb-2">🪪 ID Preview</h3>
                <img
                  src={idUrl}
                  alt="ID Proof Preview"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://www.klippa.com/wp-content/uploads/2023/05/Spot_fake_ID_Header.jpg";
                  }}
                  className="w-full h-64 object-contain rounded-xl border border-gray-300"
                /> 
              </div>
            )}

            {showPassword ? (
              <div className="bg-green-100 border border-green-300 p-4 rounded-xl shadow-md">
                <h2 className="text-green-700 text-xl font-bold">
                  🎉 Registration Verified!
                </h2>
                <p className="mt-1 font-semibold text-green-800">
                  Password: <span className="font-bold">{PASSWORD_VoterRegistrationUpdate}</span>
                </p>
              </div>
            ) : (
              <div className="bg-yellow-100 border border-yellow-300 p-4 rounded-xl shadow-md">
                <h2 className="text-yellow-800 text-lg font-bold">✅ Your profile is updated.</h2>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VoterRegistrationUpdate;
