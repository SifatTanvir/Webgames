import { useState, useEffect } from "react";
import {
  Search,
  MoreVertical,
  Shield,
  X,
  Check,
  Users,
  Grid,
  List,
  UserX,
  Phone,
  Mail,
  CheckCircle,
} from "lucide-react";

// Task Related constants
export const PASSWORD_ContactApp = "ContactsConnection";
export const TASK_ID_ContactApp = "productivity-decision-managecontacts";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  isBlocked: boolean;
}

interface Theme {
  name: string;
  bg: string;
  cardBg: string;
  text: string;
  accent: string;
  secondary: string;
  border: string;
}

const themes: Theme[] = [
  {
    name: "Ocean",
    bg: "bg-gradient-to-br from-blue-50 to-indigo-100",
    cardBg: "bg-white/80 backdrop-blur-sm",
    text: "text-gray-800",
    accent: "bg-blue-500 hover:bg-blue-600",
    secondary: "bg-gray-100 hover:bg-gray-200",
    border: "border-blue-200",
  },
  {
    name: "Forest",
    bg: "bg-gradient-to-br from-green-50 to-emerald-100",
    cardBg: "bg-white/80 backdrop-blur-sm",
    text: "text-gray-800",
    accent: "bg-green-500 hover:bg-green-600",
    secondary: "bg-gray-100 hover:bg-gray-200",
    border: "border-green-200",
  },
  {
    name: "Sunset",
    bg: "bg-gradient-to-br from-orange-50 to-red-100",
    cardBg: "bg-white/80 backdrop-blur-sm",
    text: "text-gray-800",
    accent: "bg-orange-500 hover:bg-orange-600",
    secondary: "bg-gray-100 hover:bg-gray-200",
    border: "border-orange-200",
  },
  {
    name: "Purple",
    bg: "bg-gradient-to-br from-purple-50 to-pink-100",
    cardBg: "bg-white/80 backdrop-blur-sm",
    text: "text-gray-800",
    accent: "bg-purple-500 hover:bg-purple-600",
    secondary: "bg-gray-100 hover:bg-gray-200",
    border: "border-purple-200",
  },
];

const dummyContacts: Contact[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@email.com",
    phone: "+1 (555) 123-4567",
    isBlocked: false,
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@email.com",
    phone: "+1 (555) 234-5678",
    isBlocked: false,
  },
  {
    id: "3",
    name: "Charlie Brown",
    email: "charlie@email.com",
    phone: "+1 (555) 345-6789",
    isBlocked: false,
  },
  {
    id: "4",
    name: "Diana Prince",
    email: "diana@email.com",
    phone: "+1 (555) 456-7890",
    isBlocked: false,
  },
  {
    id: "5",
    name: "Edward Norton",
    email: "edward@email.com",
    phone: "+1 (555) 567-8901",
    isBlocked: false,
  },
  {
    id: "6",
    name: "Fiona Apple",
    email: "fiona@email.com",
    phone: "+1 (555) 678-9012",
    isBlocked: false,
  },
  {
    id: "7",
    name: "George Washington",
    email: "george@email.com",
    phone: "+1 (555) 789-0123",
    isBlocked: false,
  },
  {
    id: "8",
    name: "Hannah Montana",
    email: "hannah@email.com",
    phone: "+1 (555) 890-1234",
    isBlocked: false,
  },
  {
    id: "9",
    name: "Ivan Petrov",
    email: "ivan@email.com",
    phone: "+1 (555) 901-2345",
    isBlocked: false,
  },
  {
    id: "10",
    name: "Spam Marketing",
    email: "spam@marketing.com",
    phone: "+1 (555) 000-0000",
    isBlocked: true,
  },

  {
    id: "11",
    name: "Alice Carter",
    email: "alice.carter@email.com",
    phone: "+1 (555) 112-2233",
    isBlocked: false,
  },
  {
    id: "12",
    name: "Bob Marley",
    email: "bob.marley@email.com",
    phone: "+1 (555) 223-3344",
    isBlocked: false,
  },
  {
    id: "13",
    name: "Charlie Day",
    email: "charlie.day@email.com",
    phone: "+1 (555) 334-4455",
    isBlocked: false,
  },
  {
    id: "14",
    name: "Diana Ross",
    email: "diana.ross@email.com",
    phone: "+1 (555) 445-5566",
    isBlocked: false,
  },
  {
    id: "15",
    name: "Edward Cullen",
    email: "edward.cullen@email.com",
    phone: "+1 (555) 556-6677",
    isBlocked: false,
  },

  {
    id: "16",
    name: "Alice Walker",
    email: "alice.walker@email.com",
    phone: "+1 (555) 667-7788",
    isBlocked: false,
  },
  {
    id: "17",
    name: "Bob Dylan",
    email: "bob.dylan@email.com",
    phone: "+1 (555) 778-8899",
    isBlocked: false,
  },
  {
    id: "18",
    name: "Charlie Sheen",
    email: "charlie.sheen@email.com",
    phone: "+1 (555) 889-9900",
    isBlocked: false,
  },
  {
    id: "19",
    name: "Diana King",
    email: "diana.king@email.com",
    phone: "+1 (555) 990-0011",
    isBlocked: false,
  },
  {
    id: "20",
    name: "Edward Scissorhands",
    email: "edward.scissor@email.com",
    phone: "+1 (555) 101-1122",
    isBlocked: false,
  },

  {
    id: "21",
    name: "Fiona Shaw",
    email: "fiona.shaw@email.com",
    phone: "+1 (555) 212-2233",
    isBlocked: false,
  },
  {
    id: "22",
    name: "George Clooney",
    email: "george.clooney@email.com",
    phone: "+1 (555) 323-3344",
    isBlocked: false,
  },
  {
    id: "23",
    name: "Hannah Baker",
    email: "hannah.baker@email.com",
    phone: "+1 (555) 434-4455",
    isBlocked: false,
  },
  {
    id: "24",
    name: "Ivan Ivanov",
    email: "ivan.ivanov@email.com",
    phone: "+1 (555) 545-5566",
    isBlocked: false,
  },
  {
    id: "25",
    name: "Alice Smith",
    email: "alice.smith@email.com",
    phone: "+1 (555) 656-6677",
    isBlocked: false,
  },

  {
    id: "26",
    name: "Bob Williams",
    email: "bob.williams@email.com",
    phone: "+1 (555) 767-7788",
    isBlocked: false,
  },
  {
    id: "27",
    name: "Charlie Hunnam",
    email: "charlie.hunnam@email.com",
    phone: "+1 (555) 878-8899",
    isBlocked: false,
  },
  {
    id: "28",
    name: "Diana Spencer",
    email: "diana.spencer@email.com",
    phone: "+1 (555) 989-9900",
    isBlocked: false,
  },
  {
    id: "29",
    name: "Edward Snowden",
    email: "edward.snowden@email.com",
    phone: "+1 (555) 090-0011",
    isBlocked: false,
  },
  {
    id: "30",
    name: "Fiona Hill",
    email: "fiona.hill@email.com",
    phone: "+1 (555) 202-2233",
    isBlocked: false,
  },
];

const currentUser = {
  name: "John Doe",
  email: "john.doe@email.com",
  phone: "+1 (555) 123-0000",
  avatar: "JD",
};

interface TestData {
  name: string;
  count: number;
}
const nameCounts = [
  { name: "Alice", count: 4 },
  { name: "Bob", count: 4 },
  { name: "Charlie", count: 4 },
  { name: "Diana", count: 4 },
  { name: "Edward", count: 4 },
  { name: "Fiona", count: 3 },
  { name: "George", count: 2 },
  { name: "Hannah", count: 2 },
  { name: "Ivan", count: 2 },
];

const ContactApp = () => {
  const [contacts, setContacts] = useState<Contact[]>(dummyContacts);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>(contacts);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showBlockedModal, setShowBlockedModal] = useState(false);
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [canComplete, setCanComplete] = useState(true);
  const [isActionCompleted, setIsActionCompleted] = useState<boolean>(false);
  const [blockedKeywords] = useState<string[]>(["spam", "marketing", "promo"]);
  const [theme, setTheme] = useState<Theme>(themes[0]);
  const [userProfile, setUserProfile] = useState(currentUser);
  const [currentTestData, setCurrentTestData] = useState<TestData>();
  // Set random theme on component mount
  useEffect(() => {
    window.scroll(0, 0);
    setCurrentTestData(
      nameCounts[Math.floor(Math.random() * nameCounts.length)]
    );
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    setTheme(randomTheme);
  }, []);

  // Filter contacts based on blocked keywords
  useEffect(() => {
    const filtered = contacts.filter((contact) => {
      const hasBlockedKeyword = blockedKeywords.some(
        (keyword) =>
          contact.name.toLowerCase().includes(keyword.toLowerCase()) ||
          contact.email.toLowerCase().includes(keyword.toLowerCase())
      );
      if (hasBlockedKeyword && !contact.isBlocked) {
        contact.isBlocked = true;
      }
      return true;
    });
    setContacts(filtered);
  }, [blockedKeywords]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      const filtered = contacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !contact.isBlocked
      );
      setFilteredContacts(filtered);
      setIsSearching(true);
    } else {
      setFilteredContacts(contacts.filter((c) => !c.isBlocked));
      setIsSearching(false);
    }
  };

  const handleReset = () => {
    setSearchTerm("");
    setFilteredContacts(contacts.filter((c) => !c.isBlocked));
    setIsSearching(false);
    setSelectedContacts([]);
  };

  const handleSelectContact = (contactId: string) => {
    setSelectedContacts((prev) =>
      prev.includes(contactId)
        ? prev.filter((id) => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleBlockSelected = () => {
    setContacts((prev) =>
      prev.map((contact) =>
        selectedContacts.includes(contact.id)
          ? { ...contact, isBlocked: true }
          : contact
      )
    );
    if (
      canComplete &&
      !isActionCompleted &&
      selectedContacts.length === currentTestData?.count &&
      searchTerm?.toLowerCase() === currentTestData.name?.toLowerCase()
    ) {
      setIsActionCompleted(true);
    }
    setCanComplete(false);
    handleReset();
    setSelectedContacts([]);
    setFilteredContacts((prev) =>
      prev.filter((c) => !selectedContacts.includes(c.id))
    );
  };

  const handleUnblockContact = (contactId: string) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === contactId ? { ...contact, isBlocked: false } : contact
      )
    );
    setCanComplete(false);
  };

  const getAvatar = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getBlockedContacts = () => contacts.filter((c) => c.isBlocked);

  const ContactCard = ({
    contact,
    showCheckbox = false,
  }: {
    contact: Contact;
    showCheckbox?: boolean;
  }) => (
    <div
      className={`${theme.cardBg} ${theme.border} border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
    >
      <div className="flex items-center space-x-4">
        {showCheckbox && (
          <input
            type="checkbox"
            checked={selectedContacts.includes(contact.id)}
            onChange={() => handleSelectContact(contact.id)}
            className="w-8 h-8 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
          />
        )}
        <div
          className={`w-12 h-12 rounded-full ${theme.accent} flex items-center justify-center text-white font-bold text-lg shadow-md`}
        >
          {getAvatar(contact.name)}
        </div>
        <div className="flex-1">
          <h3 className={`font-semibold text-lg ${theme.text}`}>
            {contact.name}
          </h3>
          <div
            className={`flex items-center space-x-2 ${theme.text} opacity-75 text-sm mt-1`}
          >
            <Mail className="w-4 h-4" />
            <span>{contact.email}</span>
          </div>
          <div
            className={`flex items-center space-x-2 ${theme.text} opacity-75 text-sm mt-1`}
          >
            <Phone className="w-4 h-4" />
            <span>{contact.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const ContactTableRow = ({
    contact,
    showCheckbox = false,
  }: {
    contact: Contact;
    showCheckbox?: boolean;
  }) => (
    <tr
      className={`${theme.cardBg} border-b ${theme.border} hover:bg-gray-50/50 transition-colors`}
    >
      {showCheckbox && (
        <td className="px-6 py-4">
          <input
            type="checkbox"
            checked={selectedContacts.includes(contact.id)}
            onChange={() => handleSelectContact(contact.id)}
            className="w-8 h-8 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
          />
        </td>
      )}
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <div
            className={`w-10 h-10 rounded-full ${theme.accent} flex items-center justify-center text-white font-bold text-sm`}
          >
            {getAvatar(contact.name)}
          </div>
          <span className={`font-medium ${theme.text}`}>{contact.name}</span>
        </div>
      </td>
      <td className={`px-6 py-4 ${theme.text}`}>{contact.email}</td>
      <td className={`px-6 py-4 ${theme.text}`}>{contact.phone}</td>
    </tr>
  );

  return (
    <div className={`min-h-screen ${theme.bg} p-6`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`${theme.cardBg} ${theme.border} border p-4 text-center mb-4 w-full flex flex-col justify-start items-start rounded-2xl`}
        >
          <h1 className={`text-xl font-bold ${theme.text}`}>
            📱 Contact Manager
          </h1>
          <p className={`${theme.text} text-sm opacity-75`}>
            Manage your contacts with style!
          </p>
        </div>

        {isActionCompleted && (
          <div
            className={`${theme.cardBg} ${theme.border} border p-4 text-center mb-4 w-full flex flex-col justify-start items-start rounded-2xl`}
          >
            <p
              className={`text-green-600 text-base font-semibold font-mono text-center w-full flex justify-center items-center`}
            >
              <span className="px-4">
                <CheckCircle />
              </span>{" "}
              Awesome! Here is secret Password:{" "}
              <span className="font-bold text-lg pl-2 text-pink-600">
                {PASSWORD_ContactApp}
              </span>
            </p>
          </div>
        )}
        <div
          className={`${theme.cardBg} ${theme.border} border p-4 text-center mb-4 w-full flex flex-col justify-start items-start rounded-2xl`}
        >
          <p className={`${theme.text} text-sm opacity-90 font-semibold`}>
            Follow the below instructions
          </p>
          <p className={`${theme.text} text-sm opacity-90 font-normal`}>
            I want to block all my contacts that have{" "}
            <span className="font-bold">{currentTestData?.name}</span> keyword
            in their name,{" "}
            <span className="font-bold">
              search, select and block those contacts.
            </span>
          </p>
        </div>

        {/* User Profile Card */}
        <div
          className={`${theme.cardBg} ${theme.border} border rounded-2xl p-4 mb-8 shadow-xl`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div
                className={`w-20 h-20 rounded-full ${theme.accent} flex items-center justify-center text-white font-bold text-2xl shadow-lg`}
              >
                {getAvatar(userProfile.name)}
              </div>
              <div>
                <h2 className={`text-lg font-bold ${theme.text}`}>
                  {userProfile.name}
                </h2>
                <div
                  className={`flex items-center space-x-2 ${theme.text} opacity-75 mt-1`}
                >
                  <Mail className="w-4 h-4" />
                  <span>{userProfile.email}</span>
                </div>
                <div
                  className={`flex items-center space-x-2 ${theme.text} opacity-75 mt-1`}
                >
                  <Phone className="w-4 h-4" />
                  <span>{userProfile.phone}</span>
                </div>
              </div>
            </div>
            <div className="relative z-20">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className={`${theme.secondary} ${theme.text} p-3 rounded-full hover:shadow-md transition-all`}
              >
                <MoreVertical className="w-6 h-6" />
              </button>
              {showDropdown && (
                <div
                  className={`absolute right-0 mt-2 min-w-56 ${theme.cardBg} border ${theme.border} rounded-lg shadow-xl z-10`}
                >
                  <button
                    onClick={() => {
                      setShowBlockedModal(true);
                      setShowDropdown(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 ${theme.text} hover:bg-gray-50 transition-colors`}
                  >
                    <Shield className="w-4 h-4" />
                    <span>See Blocked Contacts</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div
          className={`${theme.cardBg} ${theme.border} border rounded-xl p-6 mb-8 shadow-lg -z-50`}
        >
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme.text} opacity-50`}
              />
              <input
                type="text"
                placeholder="🔍 Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className={`w-full pl-10 pr-4 py-3 ${theme.secondary} ${theme.text} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
              />
            </div>
            <button
              onClick={handleSearch}
              className={`${theme.accent} text-white px-6 py-3 rounded-lg hover:shadow-md transition-all flex items-center space-x-2`}
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
            <button
              onClick={handleReset}
              className={`${theme.secondary} ${theme.text} px-6 py-3 rounded-lg hover:shadow-md transition-all flex items-center space-x-2`}
            >
              <X className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* View Toggle and Block Button */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <div
              className={`${theme.cardBg} ${theme.border} border rounded-lg p-1 shadow-sm`}
            >
              <button
                onClick={() => setViewMode("card")}
                className={`p-2 rounded ${
                  viewMode === "card"
                    ? `${theme.accent} text-white`
                    : `${theme.text} hover:bg-gray-100`
                } transition-all`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`p-2 rounded ${
                  viewMode === "table"
                    ? `${theme.accent} text-white`
                    : `${theme.text} hover:bg-gray-100`
                } transition-all`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
            <div className={`${theme.text} opacity-75`}>
              {filteredContacts.length} contacts
            </div>
          </div>

          {selectedContacts.length > 0 && (
            <button
              onClick={handleBlockSelected}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 shadow-lg transition-all"
            >
              <UserX className="w-5 h-5" />
              <span>Block Selected ({selectedContacts.length})</span>
            </button>
          )}
        </div>

        {/* Contacts Display */}
        {viewMode === "card" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContacts.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                showCheckbox={isSearching}
              />
            ))}
          </div>
        ) : (
          <div
            className={`${theme.cardBg} ${theme.border} border rounded-xl overflow-hidden shadow-lg`}
          >
            <table className="w-full">
              <thead className={`${theme.secondary}`}>
                <tr>
                  {isSearching && (
                    <th className={`px-6 py-4 text-left ${theme.text}`}>
                      Select
                    </th>
                  )}
                  <th className={`px-6 py-4 text-left ${theme.text}`}>Name</th>
                  <th className={`px-6 py-4 text-left ${theme.text}`}>Email</th>
                  <th className={`px-6 py-4 text-left ${theme.text}`}>Phone</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map((contact) => (
                  <ContactTableRow
                    key={contact.id}
                    contact={contact}
                    showCheckbox={isSearching}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Edit Profile Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div
              className={`${theme.cardBg} ${theme.border} border rounded-2xl p-8 max-w-md w-full shadow-2xl`}
            >
              <h3 className={`text-2xl font-bold ${theme.text} mb-6`}>
                ✏️ Edit Profile
              </h3>
              <div className="space-y-4">
                <div>
                  <label className={`block ${theme.text} font-medium mb-2`}>
                    Name *
                  </label>
                  <input
                    type="text"
                    value={userProfile.name}
                    onChange={(e) =>
                      setUserProfile({ ...userProfile, name: e.target.value })
                    }
                    className={`w-full px-4 py-3 ${theme.secondary} ${theme.text} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                  />
                </div>
                <div>
                  <label className={`block ${theme.text} font-medium mb-2`}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={userProfile.email}
                    onChange={(e) =>
                      setUserProfile({ ...userProfile, email: e.target.value })
                    }
                    className={`w-full px-4 py-3 ${theme.secondary} ${theme.text} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                <div>
                  <label className={`block ${theme.text} font-medium mb-2`}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={userProfile.phone}
                    onChange={(e) =>
                      setUserProfile({ ...userProfile, phone: e.target.value })
                    }
                    className={`w-full px-4 py-3 ${theme.secondary} ${theme.text} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
              </div>
              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => setShowEditModal(false)}
                  className={`flex-1 ${theme.secondary} ${theme.text} py-3 rounded-lg hover:shadow-md transition-all`}
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowEditModal(false)}
                  className={`flex-1 ${theme.accent} text-white py-3 rounded-lg hover:shadow-md transition-all flex items-center justify-center space-x-2`}
                >
                  <Check className="w-4 h-4" />
                  <span>Save</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Blocked Contacts Modal */}
        {showBlockedModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div
              className={`${theme.cardBg} ${theme.border} border rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl`}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-2xl font-bold ${theme.text}`}>
                  🚫 Blocked Contacts
                </h3>
                <button
                  onClick={() => {
                    setShowBlockedModal(false);
                    setCanComplete(false);
                  }}
                  className={`${theme.secondary} ${theme.text} p-2 rounded-full hover:shadow-md transition-all`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                {getBlockedContacts().map((contact) => (
                  <div
                    key={contact.id}
                    className={`${theme.secondary} rounded-lg p-4 flex items-center justify-between`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
                        {getAvatar(contact.name)}
                      </div>
                      <div>
                        <h4 className={`font-semibold ${theme.text}`}>
                          {contact.name}
                        </h4>
                        <p className={`${theme.text} opacity-75 text-sm`}>
                          {contact.email}
                        </p>
                        <p className={`${theme.text} opacity-75 text-sm`}>
                          {contact.phone}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleUnblockContact(contact.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all flex items-center space-x-2"
                    >
                      <Check className="w-4 h-4" />
                      <span>Unblock</span>
                    </button>
                  </div>
                ))}
                {getBlockedContacts().length === 0 && (
                  <div className={`text-center ${theme.text} opacity-75 py-8`}>
                    <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No blocked contacts found! 🎉</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactApp;
