import React, { useState, useMemo, useEffect, useRef } from "react";

// Task Related constants
export const PASSWORD_CelebrityApp = "NowYouKnowEverything";
export const TASK_ID_CelebrityApp = "socialmedia-profileanalysis-reviewcelebrity";

interface ColorTheme {
  bg: string;
  text: string;
  accent: string;
  card: string;
  border: string;
}

interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

interface Celebrity {
  id: number;
  name: string;
  avatar: string;
  followers: number;
  dob: string;
  birthplace: string;
  country: string;
  gender: "Male" | "Female";
  profession: string;
  wealth: number;
  biography: string;
  platform: "Instagram" | "Facebook" | "Twitter";
}

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
}

const mockUser: UserProfile = {
  name: "Alex Johnson",
  email: "alex.johnson@email.com",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
};

const Twitter: React.FC<IconProps> = ({
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
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Facebook: React.FC<IconProps> = ({
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
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Instagram: React.FC<IconProps> = ({
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
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Menu: React.FC<IconProps> = ({
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
    <path d="M4 12h16" />
    <path d="M4 18h16" />
    <path d="M4 6h16" />
  </svg>
);

const Filter: React.FC<IconProps> = ({
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
    <path d="M10 18h4" />
    <path d="M11 6H3" />
    <path d="M15 6h6" />
    <path d="M18 9V3" />
    <path d="M7 12h8" />
  </svg>
);

const X: React.FC<IconProps> = ({
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
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const Search: React.FC<IconProps> = ({
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
    <path d="m21 21-4.34-4.34" />
    <circle cx="11" cy="11" r="8" />
  </svg>
);

const Users: React.FC<IconProps> = ({
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
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <path d="M16 3.128a4 4 0 0 1 0 7.744" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <circle cx="9" cy="7" r="4" />
  </svg>
);

const Star: React.FC<IconProps> = ({
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
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
  </svg>
);

const Calendar: React.FC<IconProps> = ({
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
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
  </svg>
);

const User: React.FC<IconProps> = ({
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
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MapPin: React.FC<IconProps> = ({
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
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

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

const colorThemes: ColorTheme[] = [
  {
    bg: "bg-gradient-to-br from-blue-50 to-indigo-100",
    text: "text-blue-900",
    accent: "bg-blue-600",
    card: "bg-white",
    border: "border-blue-200",
  },
  {
    bg: "bg-gradient-to-br from-purple-50 to-pink-100",
    text: "text-purple-900",
    accent: "bg-purple-600",
    card: "bg-white",
    border: "border-purple-200",
  },
  {
    bg: "bg-gradient-to-br from-green-50 to-emerald-100",
    text: "text-green-900",
    accent: "bg-green-600",
    card: "bg-white",
    border: "border-green-200",
  },
  {
    bg: "bg-gradient-to-br from-orange-50 to-red-100",
    text: "text-orange-900",
    accent: "bg-orange-600",
    card: "bg-white",
    border: "border-orange-200",
  },
  {
    bg: "bg-gradient-to-br from-teal-50 to-cyan-100",
    text: "text-teal-900",
    accent: "bg-teal-600",
    card: "bg-white",
    border: "border-teal-200",
  },
];

const mockCelebrities: Celebrity[] = [
  {
    id: 1,
    name: "Samantha Grey",
    avatar: "https://randomuser.me/api/portraits/women/21.jpg",
    followers: 21200000,
    dob: "1991-07-13",
    birthplace: "Miami, Florida",
    country: "USA",
    gender: "Female",
    profession: "Actress",
    wealth: 30000000,
    biography: "Rising star known for indie hits and strong social presence.",
    platform: "Instagram",
  },
  {
    id: 2,
    name: "Jake Romano",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    followers: 18500000,
    dob: "1987-02-24",
    birthplace: "Austin, Texas",
    country: "USA",
    gender: "Male",
    profession: "Actor",
    wealth: 27000000,
    biography: "TV heartthrob and adventure vlogger.",
    platform: "Instagram",
  },
  {
    id: 3,
    name: "Lila Rose",
    avatar: "https://randomuser.me/api/portraits/women/47.jpg",
    followers: 32600000,
    dob: "1995-04-11",
    birthplace: "Los Angeles, California",
    country: "USA",
    gender: "Female",
    profession: "Model",
    wealth: 15000000,
    biography: "Fashion model and influencer with global campaigns.",
    platform: "Instagram",
  },
  {
    id: 4,
    name: "Chris D’Angelo",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    followers: 41000000,
    dob: "1990-08-15",
    birthplace: "Chicago, Illinois",
    country: "USA",
    gender: "Male",
    profession: "Influencer",
    wealth: 18000000,
    biography: "Lifestyle content creator and brand ambassador.",
    platform: "Instagram",
  },
  {
    id: 5,
    name: "Maya Thompson",
    avatar: "https://randomuser.me/api/portraits/women/39.jpg",
    followers: 23000000,
    dob: "1993-06-05",
    birthplace: "San Diego, California",
    country: "USA",
    gender: "Female",
    profession: "Singer",
    wealth: 25000000,
    biography: "Pop sensation with millions of streams.",
    platform: "Instagram",
  },
  {
    id: 6,
    name: "Leo Martins",
    avatar: "https://randomuser.me/api/portraits/men/88.jpg",
    followers: 33000000,
    dob: "1985-12-01",
    birthplace: "Madrid, Spain",
    country: "Spain",
    gender: "Male",
    profession: "Dancer",
    wealth: 12000000,
    biography: "International choreographer and performer.",
    platform: "Instagram",
  },
  {
    id: 7,
    name: "Ariana Banks",
    avatar: "https://randomuser.me/api/portraits/women/15.jpg",
    followers: 39000000,
    dob: "1996-03-17",
    birthplace: "London, UK",
    country: "UK",
    gender: "Female",
    profession: "Actress",
    wealth: 34000000,
    biography: "Award-winning actress and humanitarian.",
    platform: "Instagram",
  },
  {
    id: 8,
    name: "Kevin Hartley",
    avatar: "https://randomuser.me/api/portraits/men/33.jpg",
    followers: 29000000,
    dob: "1983-09-20",
    birthplace: "Toronto, Canada",
    country: "Canada",
    gender: "Male",
    profession: "Comedian",
    wealth: 60000000,
    biography: "Stand-up comic turned actor.",
    platform: "Instagram",
  },
  {
    id: 9,
    name: "Noah Lin",
    avatar: "https://randomuser.me/api/portraits/men/89.jpg",
    followers: 50000000,
    dob: "1992-11-12",
    birthplace: "Seoul, South Korea",
    country: "South Korea",
    gender: "Male",
    profession: "Singer",
    wealth: 28000000,
    biography: "K-pop artist with massive global following.",
    platform: "Instagram",
  },
  {
    id: 10,
    name: "Ella Monroe",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    followers: 45000000,
    dob: "1998-01-04",
    birthplace: "Melbourne, Australia",
    country: "Australia",
    gender: "Female",
    profession: "Influencer",
    wealth: 17000000,
    biography: "Beauty vlogger and social media entrepreneur.",
    platform: "Instagram",
  },
  {
    id: 11,
    name: "Chris Hemthworth",
    avatar: "https://randomuser.me/api/portraits/men/21.jpg",
    followers: 21000000,
    dob: "1998-01-04",
    birthplace: "Chicago, Illinois",
    country: "USA",
    gender: "Male",
    profession: "Actor",
    wealth: 28000000,
    biography: "Lifestyle content creator and brand ambassador.",
    platform: "Instagram",
  },
  {
    id: 12,
    name: "Jr. Chris ",
    avatar: "https://randomuser.me/api/portraits/men/23.jpg",
    followers: 21000000,
    dob: "1994-01-04",
    birthplace: "Chicago, Illinois",
    country: "UAE",
    gender: "Male",
    profession: "Influencer",
    wealth: 33000000,
    biography: "Lifestyle content creator and brand ambassador.",
    platform: "Instagram",
  },
  {
    id: 13,
    name: "Chris Lady ",
    avatar: "https://randomuser.me/api/portraits/women/23.jpg",
    followers: 21000000,
    dob: "1974-01-04",
    birthplace: "Chicago, Illinois",
    country: "UAE",
    gender: "Female",
    profession: "Influencer",
    wealth: 18000000,
    biography: "Lifestyle content creator and brand ambassador.",
    platform: "Instagram",
  },
  // Facebook Celebrities
  {
    id: 101,
    name: "Carlos Mendoza",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    followers: 6000000,
    dob: "1972-10-03",
    birthplace: "Bogotá, Colombia",
    country: "Colombia",
    gender: "Male",
    profession: "Journalist",
    wealth: 5000000,
    biography: "Award-winning reporter and media personality.",
    platform: "Facebook",
  },
  {
    id: 102,
    name: "Monica Belle",
    avatar: "https://randomuser.me/api/portraits/women/58.jpg",
    followers: 17000000,
    dob: "1980-05-09",
    birthplace: "Paris, France",
    country: "France",
    gender: "Female",
    profession: "Singer",
    wealth: 25000000,
    biography: "Pop icon with over a decade of hits.",
    platform: "Facebook",
  },
  {
    id: 103,
    name: "Arjun Patel",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    followers: 22000000,
    dob: "1985-02-11",
    birthplace: "Mumbai, India",
    country: "India",
    gender: "Male",
    profession: "Entrepreneur",
    wealth: 75000000,
    biography: "Founder of major e-commerce platform.",
    platform: "Facebook",
  },
  {
    id: 104,
    name: "Linda Gao",
    avatar: "https://randomuser.me/api/portraits/women/66.jpg",
    followers: 9000000,
    dob: "1978-09-30",
    birthplace: "Shanghai, China",
    country: "China",
    gender: "Female",
    profession: "Scientist",
    wealth: 8000000,
    biography: "AI researcher and public speaker.",
    platform: "Facebook",
  },

  // Twitter Celebrities
  {
    id: 201,
    name: "Tommy Walsh",
    avatar: "https://randomuser.me/api/portraits/men/25.jpg",
    followers: 1800000,
    dob: "1982-06-14",
    birthplace: "Dublin, Ireland",
    country: "Ireland",
    gender: "Male",
    profession: "Author",
    wealth: 4000000,
    biography: "Best-selling mystery novelist.",
    platform: "Twitter",
  },
  {
    id: 202,
    name: "Keira Jones",
    avatar: "https://randomuser.me/api/portraits/women/71.jpg",
    followers: 2800000,
    dob: "1990-08-19",
    birthplace: "Boston, Massachusetts",
    country: "USA",
    gender: "Female",
    profession: "Comedian",
    wealth: 9500000,
    biography: "Witty and sharp — a viral Twitter favorite.",
    platform: "Twitter",
  },
  {
    id: 203,
    name: "Amir Khalil",
    avatar: "https://randomuser.me/api/portraits/men/80.jpg",
    followers: 7600000,
    dob: "1989-01-29",
    birthplace: "Cairo, Egypt",
    country: "Egypt",
    gender: "Male",
    profession: "Activist",
    wealth: 2000000,
    biography: "Social justice advocate and columnist.",
    platform: "Twitter",
  },
  {
    id: 204,
    name: "Bianca Rossi",
    avatar: "https://randomuser.me/api/portraits/women/34.jpg",
    followers: 5000000,
    dob: "1994-12-12",
    birthplace: "Rome, Italy",
    country: "Italy",
    gender: "Female",
    profession: "Singer/Songwriter",
    wealth: 11000000,
    biography: "Indie artist with chart-topping tracks.",
    platform: "Twitter",
  },
];

const platforms = [
  { name: "Instagram", icon: Instagram, color: "text-pink-500" },
  { name: "Facebook", icon: Facebook, color: "text-blue-600" },
  { name: "Twitter", icon: Twitter, color: "text-blue-400" },
];

const CelebrityApp: React.FC = () => {
  const hasInitialized = useRef(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState<string>("All");
  const [professionFilter, setProfessionFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("followers");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedCelebrity, setSelectedCelebrity] = useState<Celebrity | null>(
    null
  );
  const [canComplete, setCanComplete] = useState<boolean>(false);

  const [showFilters, setShowFilters] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ColorTheme>(colorThemes[0]);

  const applyTheme = () => {
    const randomTheme =
      colorThemes[Math.floor(Math.random() * colorThemes.length)];
    setCurrentTheme(randomTheme);
  };
  useEffect(() => {
    if (!hasInitialized.current) {
      applyTheme();
      hasInitialized.current = true;
    }
  }, []);

  const calculateAge = (dob: string): number => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const formatCurrency = (amount: number): string => {
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(1)}B`;
    } else if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else {
      return `$${amount.toLocaleString()}`;
    }
  };

  const formatFollowers = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    } else {
      return count.toString();
    }
  };

  const filteredAndSortedCelebrities = useMemo(() => {
    let filtered = mockCelebrities.filter((celebrity) => {
      if (selectedPlatform && celebrity.platform !== selectedPlatform)
        return false;
      if (
        searchTerm &&
        !celebrity.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
        return false;
      if (genderFilter !== "All" && celebrity.gender !== genderFilter)
        return false;
      if (
        professionFilter !== "All" &&
        !celebrity.profession
          .toLowerCase()
          .includes(professionFilter.toLowerCase())
      )
        return false;
      return true;
    });

    filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortBy) {
        case "name":
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case "followers":
          aValue = a.followers;
          bValue = b.followers;
          break;
        case "dob":
          aValue = new Date(a.dob).getTime();
          bValue = new Date(b.dob).getTime();
          break;
        case "wealth":
          aValue = a.wealth;
          bValue = b.wealth;
          break;
        case "age":
          aValue = calculateAge(a.dob);
          bValue = calculateAge(b.dob);
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [
    selectedPlatform,
    searchTerm,
    genderFilter,
    professionFilter,
    sortBy,
    sortOrder,
  ]);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  const uniqueProfessions = [
    ...new Set(mockCelebrities.map((c) => c.profession)),
  ];

  return (
    <div className={`min-h-screen bg-gray-50 flex ${currentTheme.bg}`}>
      {/* Sidebar - Always visible on md+ screens, toggleable on small screens */}
      <div
        className={`${
          currentTheme.bg
        } shadow-lg transform transition-transform duration-300 ease-in-out 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        fixed md:static md:translate-x-0 inset-y-0 left-0 z-50 w-80`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className={`text-2xl font-bold ${currentTheme.text}`}>
              Dashboard
            </h2>
            {/* Close button only visible on small screens */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-md hover:bg-gray-100 md:hidden"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* User Profile */}
          <div className="mb-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <img
                src={mockUser.avatar}
                alt={mockUser.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3
                  className={`text-base lg:text-lg font-semibold ${currentTheme.text}`}
                >
                  {mockUser.name}
                </h3>
                <p className="text-gray-600 text-xs truncate text-wrap w-[70%] lg:w-[100%]">
                  {mockUser.email}
                </p>
              </div>
            </div>
          </div>

          {/* Platform List */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${currentTheme.text}`}>
              Platforms
            </h3>
            <div className="space-y-2">
              {platforms.map((platform) => {
                const Icon = platform.icon;
                return (
                  <button
                    key={platform.name}
                    onClick={() => {
                      setSelectedPlatform(platform.name);
                      // Only close sidebar on small screens
                      if (window.innerWidth < 768) {
                        setSidebarOpen(false);
                      }
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      selectedPlatform === platform.name
                        ? "bg-blue-100 text-blue-700"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${platform.color}`} />
                    <span className="font-medium">{platform.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-0">
        {/* Header */}
        <header className={` ${currentTheme.bg}  shadow-sm border-b`}>
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Menu button only visible on small screens */}
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 rounded-md hover:bg-gray-100 md:hidden"
                >
                  <Menu className="h-6 w-6" />
                </button>
                <h1 className={`text-2xl font-bold ${currentTheme.text}`}>
                  Celebrity Platform Analytics
                </h1>
              </div>
              {selectedPlatform && (
                <div className="flex items-center space-x-2">
                  {platforms.find((p) => p.name === selectedPlatform) && (
                    <>
                      {React.createElement(
                        platforms.find((p) => p.name === selectedPlatform)!
                          .icon,
                        {
                          className: `h-6 w-6 ${
                            platforms.find((p) => p.name === selectedPlatform)!
                              .color
                          }`,
                        }
                      )}
                      <span className="text-lg font-semibold">
                        {selectedPlatform}
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          {!selectedPlatform ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Users className="h-24 w-24 text-gray-400 mx-auto mb-4" />
                <h2
                  className={`text-2xl font-semibold ${currentTheme.text} mb-2`}
                >
                  Select a platform first
                </h2>
                <p className="text-gray-600">
                  Choose a platform from the sidebar to view celebrity analytics
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {canComplete && (
                <div
                  className={`${currentTheme.accent} text-white p-4 shadow-lg hover:shadow-2xl rounded-lg mb-4 text-center`}
                >
                  <h3 className={`text-xl font-semibold mb-2`}>
                    Great Job, You have completed the task!
                  </h3>

                  <p className="font-mono">
                    Your secret password is:{" "}
                    <span className="font-bold"> {PASSWORD_CelebrityApp}</span>
                  </p>
                </div>
              )}
              {/* Search and Filter Controls */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="flex-1 max-w-md">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Search
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search celebrities..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${currentTheme.accent}`}
                  >
                    <Filter className="h-5 w-5" />
                    <span>Filters</span>
                  </button>
                </div>

                {showFilters && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gender
                      </label>
                      <select
                        value={genderFilter}
                        onChange={(e) => setGenderFilter(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="All">All Genders</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Profession
                      </label>
                      <select
                        value={professionFilter}
                        onChange={(e) => setProfessionFilter(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="All">All Professions</option>
                        {uniqueProfessions.map((profession) => (
                          <option key={profession} value={profession}>
                            {profession}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Celebrity Table */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <button
                            onClick={() => handleSort("name")}
                            className="flex items-center space-x-1 hover:text-gray-700"
                          >
                            <span>Name</span>
                            {sortBy === "name" && (
                              <span className="text-blue-600">
                                {sortOrder === "asc" ? "↑" : "↓"}
                              </span>
                            )}
                          </button>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <button
                            onClick={() => handleSort("followers")}
                            className="flex items-center space-x-1 hover:text-gray-700"
                          >
                            <span>Followers</span>
                            {sortBy === "followers" && (
                              <span className="text-blue-600">
                                {sortOrder === "asc" ? "↑" : "↓"}
                              </span>
                            )}
                          </button>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <button
                            onClick={() => handleSort("age")}
                            className="flex items-center space-x-1 hover:text-gray-700"
                          >
                            <span>Age</span>
                            {sortBy === "age" && (
                              <span className="text-blue-600">
                                {sortOrder === "asc" ? "↑" : "↓"}
                              </span>
                            )}
                          </button>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Gender
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Profession
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <button
                            onClick={() => handleSort("wealth")}
                            className="flex items-center space-x-1 hover:text-gray-700"
                          >
                            <span>Wealth</span>
                            {sortBy === "wealth" && (
                              <span className="text-blue-600">
                                {sortOrder === "asc" ? "↑" : "↓"}
                              </span>
                            )}
                          </button>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Country
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredAndSortedCelebrities.map((celebrity) => (
                        <tr
                          key={celebrity.id}
                          onClick={() => setSelectedCelebrity(celebrity)}
                          className="hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                src={celebrity.avatar}
                                alt={celebrity.name}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                              <div className="ml-4">
                                <div
                                  className={`text-sm font-medium ${currentTheme.text}`}
                                >
                                  {celebrity.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td
                            className={`px-6 py-4 whitespace-nowrap text-sm ${currentTheme.text}`}
                          >
                            {formatFollowers(celebrity.followers)}
                          </td>
                          <td
                            className={`px-6 py-4 whitespace-nowrap text-sm ${currentTheme.text}`}
                          >
                            {calculateAge(celebrity.dob)}
                          </td>
                          <td
                            className={`px-6 py-4 whitespace-nowrap text-sm ${currentTheme.text}`}
                          >
                            {celebrity.gender}
                          </td>
                          <td
                            className={`px-6 py-4 whitespace-nowrap text-sm ${currentTheme.text}`}
                          >
                            {celebrity.profession}
                          </td>
                          <td
                            className={`px-6 py-4 whitespace-nowrap text-sm ${currentTheme.text}`}
                          >
                            {formatCurrency(celebrity.wealth)}
                          </td>
                          <td
                            className={`px-6 py-4 whitespace-nowrap text-sm ${currentTheme.text}`}
                          >
                            {celebrity.country}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Celebrity Detail Modal */}
      {selectedCelebrity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${currentTheme.text}`}>
                  Celebrity Details
                </h2>
                <button
                  onClick={() => {
                    if (
                      selectedCelebrity.id === 12 &&
                      !canComplete &&
                      genderFilter === "Male" &&
                      professionFilter === "Influencer" &&
                      searchTerm === "chris"
                    ) {
                      setCanComplete(true);
                    }
                    setSelectedCelebrity(null);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Header with Avatar and Basic Info */}
                <div className="flex items-center space-x-6">
                  <img
                    src={selectedCelebrity.avatar}
                    alt={selectedCelebrity.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {selectedCelebrity.name}
                    </h3>
                    <p className="text-lg text-gray-600">
                      {selectedCelebrity.profession}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span className="text-sm text-gray-600">
                        {formatFollowers(selectedCelebrity.followers)} followers
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium text-blue-600">
                        Age
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-blue-900">
                      {calculateAge(selectedCelebrity.dob)}
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-green-600">
                        Wealth
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-green-900">
                      {formatCurrency(selectedCelebrity.wealth)}
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-purple-600" />
                      <span className="text-sm font-medium text-purple-600">
                        Gender
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-purple-900">
                      {selectedCelebrity.gender}
                    </p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-orange-600" />
                      <span className="text-sm font-medium text-orange-600">
                        Country
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-orange-900">
                      {selectedCelebrity.country}
                    </p>
                  </div>
                </div>

                {/* Detailed Information */}
                <div className="space-y-4">
                  <div>
                    <h4
                      className={`text-lg font-semibold mb-2 ${currentTheme.text}`}
                    >
                      Personal Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Date of Birth:
                        </span>
                        <p className="text-gray-900">
                          {new Date(selectedCelebrity.dob).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Birthplace:
                        </span>
                        <p className="text-gray-900">
                          {selectedCelebrity.birthplace}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Platform:
                        </span>
                        <p className="text-gray-900">
                          {selectedCelebrity.platform}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Followers:
                        </span>
                        <p className="text-gray-900">
                          {selectedCelebrity.followers.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4
                      className={`text-lg font-semibold mb-2 ${currentTheme.text}`}
                    >
                      Biography
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedCelebrity.biography}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CelebrityApp;
