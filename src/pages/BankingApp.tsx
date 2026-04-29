// Task Related constants
export const PASSWORD_BankingApp = "HeroOrZero";
export const TASK_ID_BankingApp = "finance-reasoning-bankstatement";

import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  CreditCard,
  MapPin,
  Building,
  Calendar,
  CheckCircle,
  FileText,
  Download,
  X,
  Check,
} from "lucide-react";

interface Theme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  cardBg: string;
  text: string;
  textSecondary: string;
}

const themes: Theme[] = [
  {
    primary: "from-blue-600 to-purple-600",
    secondary: "from-blue-100 to-purple-100",
    accent: "bg-blue-500",
    background: "bg-gradient-to-br from-blue-50 to-purple-50",
    cardBg: "bg-white",
    text: "text-gray-800",
    textSecondary: "text-gray-600",
  },
  {
    primary: "from-emerald-600 to-teal-600",
    secondary: "from-emerald-100 to-teal-100",
    accent: "bg-emerald-500",
    background: "bg-gradient-to-br from-emerald-50 to-teal-50",
    cardBg: "bg-white",
    text: "text-gray-800",
    textSecondary: "text-gray-600",
  },
  {
    primary: "from-orange-600 to-red-600",
    secondary: "from-orange-100 to-red-100",
    accent: "bg-orange-500",
    background: "bg-gradient-to-br from-orange-50 to-red-50",
    cardBg: "bg-white",
    text: "text-gray-800",
    textSecondary: "text-gray-600",
  },
  {
    primary: "from-indigo-600 to-pink-600",
    secondary: "from-indigo-100 to-pink-100",
    accent: "bg-indigo-500",
    background: "bg-gradient-to-br from-indigo-50 to-pink-50",
    cardBg: "bg-white",
    text: "text-gray-800",
    textSecondary: "text-gray-600",
  },
];
interface TransactionFilter {
  startDate: string;
  endDate: string;
  debit: boolean;
  credit: boolean;
  deliveryMode: string;
}
const BankingApp: React.FC = () => {
  const [requests, setRequests] = useState<TransactionFilter[]>([
    {
      startDate: "2025-07-01",
      endDate: "2025-07-05",
      debit: true,
      credit: false,
      deliveryMode: "post",
    },
    {
      startDate: "2025-07-10",
      endDate: "2025-07-15",
      debit: false,
      credit: true,
      deliveryMode: "email",
    },
  ]);
  const [theme, setTheme] = useState<Theme>(themes[0]);
  const [showStatementForm, setShowStatementForm] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [otpError, setOtpError] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [canComplete, setCanComplete] = useState(true);
  const [isActionCompleted, setIsActionCompleted] = useState<boolean>(false);
  const [formData, setFormData] = useState<TransactionFilter>({
    startDate: "",
    endDate: "",
    debit: false,
    credit: false,
    deliveryMode: "",
  });

  // Dummy user data
  const userData = {
    name: "Rajesh Kumar Sharma",
    email: "rajesh.sharma@email.com",
    phone: "+91 9876543210",
    accountNumber: "1234567890123456",
    ifscCode: "SECU0001234",
    balance: "₹2,45,680.50",
    kycStatus: "Verified",
    address: "123, MG Road, Koramangala, Bengaluru - 560034, Karnataka",
    branchName: "Koramangala Branch",
    openingDate: "15th March, 2019",
    profilePhoto:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  };

  // Change theme on component mount
  useEffect(() => {
    window.scroll(0, 0);
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    setTheme(randomTheme);
  }, []);

  const handleFormChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear errors when user starts fixing the form
    if (formErrors.length > 0) {
      setFormErrors([]);
    }
  };

  const validateForm = (): string[] => {
    const errors: string[] = [];
    const today = new Date();

    if (!formData.startDate) {
      errors.push("Please select a start date");
    }

    if (!formData.endDate) {
      errors.push("Please select an end date");
    }

    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);

      if (endDate < startDate) {
        errors.push("End date cannot be earlier than start date");
      }

      if (startDate > today) {
        errors.push("Start date cannot be in the future");
      }

      if (endDate > today) {
        errors.push("End date cannot be in the future");
      }
    }

    if (!formData.debit && !formData.credit) {
      errors.push("Please select at least one transaction type");
    }

    if (!formData.deliveryMode) {
      errors.push("Please select a mode of delivery");
    }

    return errors;
  };

  const generateOtp = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleRequestStatement = () => {
    const errors = validateForm();

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    // Generate OTP and show OTP form
    const otp = generateOtp();
    setGeneratedOtp(otp);
    setShowStatementForm(false);
    setShowOtpForm(true);
  };

  const handleOtpSubmit = () => {
    if (enteredOtp === generatedOtp) {
      if (
        canComplete &&
        !isActionCompleted &&
        formData.startDate === "2025-06-02" &&
        formData.endDate === "2025-07-15" &&
        formData.debit &&
        !formData.credit &&
        formData.deliveryMode === "email"
      ) {
        setIsActionCompleted(true);
      }
      setShowOtpForm(false);
      setShowSuccess(true);
      setOtpError("");
      setCanComplete(false);
    } else {
      setOtpError("Invalid OTP. Please check and try again.");
    }
  };

  const handleOtpChange = (value: string) => {
    setEnteredOtp(value);
    if (otpError) {
      setOtpError("");
    }
  };

  const resetForms = () => {
    setRequests([...requests, formData]);
    setShowStatementForm(false);
    setShowOtpForm(false);
    setShowSuccess(false);
    setFormErrors([]);
    setOtpError("");
    setGeneratedOtp("");
    setEnteredOtp("");
    setFormData({
      startDate: "",
      endDate: "",
      debit: false,
      credit: false,
      deliveryMode: "",
    });
  };

  return (
    <div
      className={`min-h-screen ${theme.background} transition-all duration-500`}
    >
      {/* Header */}
      <header className={`bg-gradient-to-r ${theme.primary} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-white">
            <h1 className="text-2xl font-bold">🏦 SecureBank</h1>
            <p className="text-sm opacity-90">Your trusted banking partner</p>
          </div>
          <div className="flex items-center space-x-4 text-white">
            <div className="text-right">
              <p className="font-semibold">{userData.name}</p>
              <p className="text-sm opacity-90">{userData.email}</p>
            </div>
            <img
              src={userData.profilePhoto}
              alt="Profile"
              className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
            />
            <button
              className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all duration-200"
              onClick={() => (window.location.href = "/")}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Profile Card */}
          <div className="lg:col-span-2">
            <div
              className={`${theme.cardBg} rounded-2xl shadow-xl overflow-hidden`}
            >
              <div
                className={`bg-gradient-to-r ${theme.primary} p-6 text-white`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      👤 Account Profile
                    </h2>
                    <p className="opacity-90">Complete banking information</p>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => {
                        setShowStatementForm(true);
                      }}
                      className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center gap-1 px-4 border-2 border-white/40"
                    >
                      <FileText size={20} />
                      <span className="font-bold">Request Statement</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-3 ${theme.accent} bg-opacity-10 rounded-full`}
                    >
                      <User
                        className={`${theme.accent.replace(
                          "bg-",
                          "text-"
                        )} w-5 h-5`}
                      />
                    </div>
                    <div>
                      <p className={`${theme.textSecondary} text-sm`}>
                        Full Name
                      </p>
                      <p className={`${theme.text} font-semibold`}>
                        {userData.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-3 ${theme.accent} bg-opacity-10 rounded-full`}
                    >
                      <Mail
                        className={`${theme.accent.replace(
                          "bg-",
                          "text-"
                        )} w-5 h-5`}
                      />
                    </div>
                    <div>
                      <p className={`${theme.textSecondary} text-sm`}>
                        Email Address
                      </p>
                      <p className={`${theme.text} font-semibold`}>
                        {userData.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-3 ${theme.accent} bg-opacity-10 rounded-full`}
                    >
                      <Phone
                        className={`${theme.accent.replace(
                          "bg-",
                          "text-"
                        )} w-5 h-5`}
                      />
                    </div>
                    <div>
                      <p className={`${theme.textSecondary} text-sm`}>
                        Phone Number
                      </p>
                      <p className={`${theme.text} font-semibold`}>
                        {userData.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-3 ${theme.accent} bg-opacity-10 rounded-full`}
                    >
                      <CreditCard
                        className={`${theme.accent.replace(
                          "bg-",
                          "text-"
                        )} w-5 h-5`}
                      />
                    </div>
                    <div>
                      <p className={`${theme.textSecondary} text-sm`}>
                        Account Number
                      </p>
                      <p className={`${theme.text} font-semibold font-mono`}>
                        {userData.accountNumber}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-3 ${theme.accent} bg-opacity-10 rounded-full`}
                    >
                      <Building
                        className={`${theme.accent.replace(
                          "bg-",
                          "text-"
                        )} w-5 h-5`}
                      />
                    </div>
                    <div>
                      <p className={`${theme.textSecondary} text-sm`}>
                        IFSC Code
                      </p>
                      <p className={`${theme.text} font-semibold font-mono`}>
                        {userData.ifscCode}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div
                    className={`p-4 rounded-xl bg-gradient-to-r ${theme.secondary}`}
                  >
                    <p className={`${theme.textSecondary} text-sm mb-1`}>
                      💰 Account Balance
                    </p>
                    <p className="text-3xl font-bold text-green-600">
                      {userData.balance}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-3 ${theme.accent} bg-opacity-10 rounded-full`}
                    >
                      <CheckCircle className="text-green-500 w-5 h-5" />
                    </div>
                    <div>
                      <p className={`${theme.textSecondary} text-sm`}>
                        KYC Status
                      </p>
                      <p className="text-green-600 font-semibold">
                        ✅ {userData.kycStatus}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-3 ${theme.accent} bg-opacity-10 rounded-full`}
                    >
                      <MapPin
                        className={`${theme.accent.replace(
                          "bg-",
                          "text-"
                        )} w-5 h-5`}
                      />
                    </div>
                    <div>
                      <p className={`${theme.textSecondary} text-sm`}>
                        Address
                      </p>
                      <p
                        className={`${theme.text} font-semibold text-sm leading-relaxed`}
                      >
                        {userData.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-3 ${theme.accent} bg-opacity-10 rounded-full`}
                    >
                      <Building
                        className={`${theme.accent.replace(
                          "bg-",
                          "text-"
                        )} w-5 h-5`}
                      />
                    </div>
                    <div>
                      <p className={`${theme.textSecondary} text-sm`}>
                        Branch Name
                      </p>
                      <p className={`${theme.text} font-semibold`}>
                        {userData.branchName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-3 ${theme.accent} bg-opacity-10 rounded-full`}
                    >
                      <Calendar
                        className={`${theme.accent.replace(
                          "bg-",
                          "text-"
                        )} w-5 h-5`}
                      />
                    </div>
                    <div>
                      <p className={`${theme.textSecondary} text-sm`}>
                        Account Opening Date
                      </p>
                      <p className={`${theme.text} font-semibold`}>
                        {userData.openingDate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 text-lg font-bold text-gray-600">
              Your Bank Statement Request(s)
            </div>
            {requests?.length ? (
              <div className="overflow-auto flex-1 max-h-96 mt-4">
                <table className="w-full">
                  <thead
                    className={`bg-gradient-to-r ${theme.primary} sticky top-0`}
                  >
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap rounded-tl-xl">
                        #
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
                        Start Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
                        End Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
                        Debit
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
                        Credit
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
                        Delivery Mode
                      </th>

                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap rounded-tr-xl">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {requests.map((request, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td
                          className={`px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 ${
                            requests.length - 1 === index ? "rounded-bl-xl" : ""
                          }`}
                        >
                          {index + 1}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {request.startDate || "-"}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {request.endDate || "-"}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {request.debit ? "✅" : "❎"}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {request.credit ? "✅" : "❎"}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {request.deliveryMode === "post" ? "📬" : "📧"}
                        </td>
                        <td
                          className={`px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 ${
                            requests.length - 1 === index ? "rounded-br-xl" : ""
                          }`}
                        >
                          <div
                            className={`${theme.accent} ${theme.accent.replace(
                              "bg-",
                              "text-"
                            )} bg-opacity-10 rounded-full text-center py-2 text-sm font-semibold`}
                          >
                            Pending
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div
                className={`mt-4 text-md text-center font-bold text-white p-4 border-2 shadow rounded-xl bg-gradient-to-r ${theme.primary}`}
              >
                No Request Found
              </div>
            )}
          </div>

          {/* Statement Request / OTP / Success Card */}
          <div className="lg:col-span-1">
            {showStatementForm && (
              <div className={`${theme.cardBg} rounded-2xl shadow-xl p-6`}>
                <div className="flex justify-between items-center mb-6">
                  <h3
                    className={`${theme.text} text-xl font-bold flex items-center`}
                  >
                    <FileText className="mr-2" />
                    📄 Request Bank Statement
                  </h3>
                  <button
                    onClick={resetForms}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label
                      className={`${theme.text} text-sm font-semibold mb-2 block`}
                    >
                      📅 Date Range
                    </label>
                    <div className="space-y-2">
                      <input
                        type="date"
                        value={formData.startDate}
                        max={new Date().toISOString().split("T")[0]}
                        onChange={(e) =>
                          handleFormChange("startDate", e.target.value)
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Start Date"
                      />
                      <input
                        type="date"
                        value={formData.endDate}
                        max={new Date().toISOString().split("T")[0]}
                        onChange={(e) =>
                          handleFormChange("endDate", e.target.value)
                        }
                        min={formData.startDate}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="End Date"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className={`${theme.text} text-sm font-semibold mb-2 block`}
                    >
                      💳 Transaction Types
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.debit}
                          onChange={(e) =>
                            handleFormChange("debit", e.target.checked)
                          }
                          className="mr-2 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <span className={theme.text}>
                          💸 Debit Transactions
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.credit}
                          onChange={(e) =>
                            handleFormChange("credit", e.target.checked)
                          }
                          className="mr-2 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <span className={theme.text}>
                          💰 Credit Transactions
                        </span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label
                      className={`${theme.text} text-sm font-semibold mb-2 block`}
                    >
                      🚚 Mode of Delivery
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="deliveryMode"
                          value="email"
                          checked={formData.deliveryMode === "email"}
                          onChange={(e) =>
                            handleFormChange("deliveryMode", e.target.value)
                          }
                          className="mr-2 w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                        />
                        <span className={theme.text}>📧 Email</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="deliveryMode"
                          value="post"
                          checked={formData.deliveryMode === "post"}
                          onChange={(e) =>
                            handleFormChange("deliveryMode", e.target.value)
                          }
                          className="mr-2 w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                        />
                        <span className={theme.text}>📬 Post</span>
                      </label>
                    </div>
                  </div>

                  {/* Error Messages */}
                  {formErrors.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-1">
                      <div className="flex items-center text-red-700 font-semibold text-sm mb-2">
                        <X className="w-4 h-4 mr-2" />
                        Please fix the following errors:
                      </div>
                      {formErrors.map((error, index) => (
                        <p key={index} className="text-red-600 text-xs pl-6">
                          • {error}
                        </p>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={handleRequestStatement}
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center bg-gradient-to-r ${theme.primary} text-white hover:shadow-lg transform hover:-translate-y-0.5`}
                  >
                    <Download className="mr-2" size={18} />
                    Request Statement
                  </button>
                </div>
              </div>
            )}

            {showOtpForm && (
              <div className={`${theme.cardBg} rounded-2xl shadow-xl p-6`}>
                <div className="flex justify-between items-center mb-6">
                  <h3
                    className={`${theme.text} text-xl font-bold flex items-center`}
                  >
                    <span className="mr-2">🔐</span>
                    OTP Verification
                  </h3>
                  <button
                    onClick={resetForms}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div
                    className={`p-4 rounded-lg bg-gradient-to-r ${theme.secondary} text-center`}
                  >
                    <p className={`${theme.text} text-sm mb-2`}>
                      🔒 For your security, please enter the OTP sent to your
                      registered mobile number
                    </p>
                    <p className={`${theme.textSecondary} text-xs`}>
                      📱 +91 98765-XXX10
                    </p>
                  </div>
                  <div
                    className={`p-4 rounded-lg bg-gradient-to-r ${theme.secondary} text-center text-sm font-semibold opacity-75`}
                  >
                    Your OTP: <span className="font-bold">{generatedOtp}</span>
                  </div>
                  <div>
                    <label
                      className={`${theme.text} text-sm font-semibold mb-2 block`}
                    >
                      🔢 Enter 6-digit OTP
                    </label>
                    <input
                      type="text"
                      value={enteredOtp}
                      onChange={(e) =>
                        handleOtpChange(
                          e.target.value.replace(/\D/g, "").slice(0, 6)
                        )
                      }
                      className={`w-full p-3 text-center text-2xl font-mono border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        otpError
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300"
                      }`}
                      placeholder="000000"
                      maxLength={6}
                    />
                  </div>

                  {otpError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <div className="flex items-center text-red-700 text-sm">
                        <X className="w-4 h-4 mr-2" />
                        {otpError}
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        const newOtp = generateOtp();
                        setGeneratedOtp(newOtp);
                        setEnteredOtp("");
                        setOtpError("");
                      }}
                      className="flex-1 py-2 px-4 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-200"
                    >
                      🔄 Resend OTP
                    </button>
                    <button
                      onClick={handleOtpSubmit}
                      disabled={enteredOtp.length !== 6}
                      className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all duration-200 ${
                        enteredOtp.length === 6
                          ? `bg-gradient-to-r ${theme.primary} text-white hover:shadow-lg transform hover:-translate-y-0.5`
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      ✅ Verify OTP
                    </button>
                  </div>

                  <div
                    className={`text-xs ${theme.textSecondary} text-center space-y-1`}
                  >
                    <p>⏱️ OTP is valid for 10 minutes</p>
                    <p>
                      📧 Didn't receive OTP? Check your SMS or try resending
                    </p>
                  </div>
                </div>
              </div>
            )}

            {showSuccess && (
              <div className={`${theme.cardBg} rounded-2xl shadow-xl p-6`}>
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="text-green-600 w-8 h-8" />
                    </div>
                  </div>

                  <h3 className={`${theme.text} text-xl font-bold`}>
                    ✅ Request Submitted!
                  </h3>

                  <div
                    className={`p-4 rounded-lg bg-gradient-to-r ${theme.secondary}`}
                  >
                    <p className={`${theme.text} text-sm leading-relaxed`}>
                      {formData.deliveryMode === "email"
                        ? "📧 Your bank statement will be sent to your registered email within 24 hours."
                        : "📬 Your bank statement will be sent to your registered address within 7 days."}
                    </p>
                  </div>

                  <div className={`text-xs ${theme.textSecondary} space-y-1`}>
                    <p>
                      📅 Date Range: {formData.startDate} to {formData.endDate}
                    </p>
                    <p>
                      💳 Types:{" "}
                      {[formData.debit && "Debit", formData.credit && "Credit"]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                    <p>
                      🚚 Delivery:{" "}
                      {formData.deliveryMode === "email" ? "Email" : "Post"}
                    </p>
                  </div>

                  <button
                    onClick={resetForms}
                    className={`w-full py-2 px-4 bg-gradient-to-r ${theme.primary} text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200`}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {!showStatementForm && !showOtpForm && !showSuccess && (
              <div
                className={`${theme.cardBg} rounded-2xl shadow-xl p-6 text-center`}
              >
                <div className="space-y-4">
                  <div
                    className={`w-16 h-16 mx-auto bg-gradient-to-r ${theme.secondary} rounded-full flex items-center justify-center`}
                  >
                    <FileText
                      className={`${theme.accent.replace(
                        "bg-",
                        "text-"
                      )} w-8 h-8`}
                    />
                  </div>
                  <h3 className={`${theme.text} text-lg font-bold`}>
                    📊 Quick Actions
                  </h3>

                  <div
                    className={`p-3 rounded-lg bg-gradient-to-r ${theme.secondary}`}
                  >
                    <p
                      className={`${theme.text} text-xs font-semibold text-opacity-75`}
                    >
                      💡 Tip: Click on the request statement button for your
                      bank statement.
                    </p>
                  </div>
                </div>
              </div>
            )}
            {isActionCompleted && (
              <div
                className={`bg-gradient-to-r ${theme.primary} bg-opacity-10 p-6 text-white mt-8 rounded-lg`}
              >
                <p
                  className={` text-sm font-semibold font-mono text-center w-full`}
                >
                  Awesome! You have completed the task.
                </p>
                <p
                  className={`text-xs font-semibold font-mono text-center w-full`}
                >
                  Here is your password:{" "}
                  <span className="font-bold text-sm">
                    {PASSWORD_BankingApp}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankingApp;
