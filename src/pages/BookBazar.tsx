"use client";
import type React from "react";
import { useState, useEffect, useRef, useCallback } from "react";

export const TASK_ID_BookBazaar = "ecommerce-bazaar-bookmarketing";
export const PASSWORD_BookBazaar = "bookreading";

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  seller: string;
  condition: string;
  imageUrl: string;
}

const allBooks: Book[] = [
  {
    id: "b1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "A novel about the American Dream, wealth, and social class.",
    price: 12.5,
    seller: "Alice",
    condition: "Used - Good",
    imageUrl: "https://placehold.co/150x200/ADD8E6/000000?text=Gatsby",
  },
  {
    id: "b2",
    title: "1984",
    author: "George Orwell",
    description:
      "Dystopian social science fiction novel by English author George Orwell.",
    price: 9.99,
    seller: "Bob",
    condition: "Used - Fair",
    imageUrl: "https://placehold.co/150x200/90EE90/000000?text=1984",
  },
  {
    id: "b3",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description:
      "A novel about the serious issues of rape and racial inequality.",
    price: 11.0,
    seller: "Charlie",
    condition: "Used - Very Good",
    imageUrl: "https://placehold.co/150x200/FFB6C1/000000?text=Mockingbird",
  },
  {
    id: "b4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description: "A romantic novel of manners written by Jane Austen.",
    price: 8.75,
    seller: "Diana",
    condition: "Used - Good",
    imageUrl: "https://placehold.co/150x200/DDA0DD/000000?text=Pride",
  },
  {
    id: "b5",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    description:
      "A fantasy novel and children's book by English author J.R.R. Tolkien.",
    price: 14.25,
    seller: "Eve",
    condition: "Used - Excellent",
    imageUrl: "https://placehold.co/150x200/F0E68C/000000?text=Hobbit",
  },
  {
    id: "b6",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    description: "A novel about teenage angst and alienation.",
    price: 10.5,
    seller: "Frank",
    condition: "Used - Good",
    imageUrl: "https://placehold.co/150x200/B0C4DE/000000?text=Catcher",
  },
  {
    id: "b7",
    title: "Dune",
    author: "Frank Herbert",
    description: "A science fiction novel by American author Frank Herbert.",
    price: 15.0,
    seller: "Grace",
    condition: "Used - Very Good",
    imageUrl: "https://placehold.co/150x200/D3D3D3/000000?text=Dune",
  },
  {
    id: "b8",
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    description:
      "An epic high-fantasy novel by the English author and scholar J. R. R. Tolkien.",
    price: 25.0,
    seller: "Eve",
    condition: "Used - Excellent",
    imageUrl: "https://placehold.co/150x200/A9A9A9/FFFFFF?text=LOTR",
  },
  {
    id: "b9",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    description:
      "A book by Yuval Noah Harari, first published in Hebrew in 2011.",
    price: 18.0,
    seller: "Alice",
    condition: "Used - Like New",
    imageUrl: "https://placehold.co/150x200/C0C0C0/000000?text=Sapiens",
  },
  {
    id: "b10",
    title: "Educated",
    author: "Tara Westover",
    description: "A memoir by American author Tara Westover.",
    price: 13.75,
    seller: "Bob",
    condition: "Used - Good",
    imageUrl: "https://placehold.co/150x200/F5DEB3/000000?text=Educated",
  },
  {
    id: "b11",
    title: "The Alchemist",
    author: "Paulo Coelho",
    description: "An allegorical novel by Paulo Coelho.",
    price: 10.0,
    seller: "Charlie",
    condition: "Used - Very Good",
    imageUrl: "https://placehold.co/150x200/ADD8E6/000000?text=Alchemist",
  },
  {
    id: "b12",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    description: "A shocking psychological thriller.",
    price: 11.5,
    seller: "Diana",
    condition: "Used - Like New",
    imageUrl: "https://placehold.co/150x200/90EE90/000000?text=SilentPatient",
  },
  {
    id: "b13",
    title: "Becoming",
    author: "Michelle Obama",
    description:
      "A memoir by former First Lady of the United States Michelle Obama.",
    price: 16.0,
    seller: "Eve",
    condition: "Used - Good",
    imageUrl: "https://placehold.co/150x200/FFB6C1/000000?text=Becoming",
  },
  {
    id: "b14",
    title: "Atomic Habits",
    author: "James Clear",
    description: "An easy & proven way to build good habits & break bad ones.",
    price: 14.0,
    seller: "Frank",
    condition: "New",
    imageUrl: "https://placehold.co/150x200/DDA0DD/000000?text=AtomicHabits",
  },
  {
    id: "b15",
    title: "The Midnight Library",
    author: "Matt Haig",
    description: "A novel about a woman who gets a chance to undo her regrets.",
    price: 12.0,
    seller: "Grace",
    condition: "Used - Excellent",
    imageUrl: "https://placehold.co/150x200/F0E68C/000000?text=MidnightLib",
  },
  {
    id: "b16",
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    description: "A a coming-of-age story and a murder mystery.",
    price: 13.0,
    seller: "Alice",
    condition: "Used - Good",
    imageUrl: "https://placehold.co/150x200/B0C4DE/000000?text=Crawdads",
  },
  {
    id: "b17",
    title: "The Vanishing Half",
    author: "Brit Bennett",
    description:
      "A novel about twin sisters, inseparable as children, who choose to live in two very different worlds, one Black and one white.",
    price: 14.5,
    seller: "Bob",
    condition: "Used - Very Good",
    imageUrl: "https://placehold.co/150x200/D3D3D3/000000?text=VanishingHalf",
  },
  {
    id: "b18",
    title: "Project Hail Mary",
    author: "Andy Weir",
    description: "A science fiction novel by Andy Weir.",
    price: 15.5,
    seller: "Charlie",
    condition: "New",
    imageUrl: "https://placehold.co/150x200/A9A9A9/FFFFFF?text=HailMary",
  },
  {
    id: "b19",
    title: "Circe",
    author: "Madeline Miller",
    description: "A novel about the Greek goddess Circe.",
    price: 11.25,
    seller: "Diana",
    condition: "Used - Like New",
    imageUrl: "https://placehold.co/150x200/C0C0C0/000000?text=Circe",
  },
  {
    id: "b20",
    title: "The Song of Achilles",
    author: "Madeline Miller",
    description:
      "A retelling of the Trojan War from the perspective of Patroclus.",
    price: 10.75,
    seller: "Eve",
    condition: "Used - Good",
    imageUrl: "https://placehold.co/150x200/F5DEB3/000000?text=Achilles",
  },
];

const getLightRandomHexColor = (): string => {
  const minBrightness = 180;
  const toHex = (c: number) => c.toString(16).padStart(2, "0");
  const r = Math.floor(Math.random() * (255 - minBrightness) + minBrightness);
  const g = Math.floor(Math.random() * (255 - minBrightness) + minBrightness);
  const b = Math.floor(Math.random() * (255 - minBrightness) + minBrightness);
  return `${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const shuffleArray = (array: any[]) => {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

const getRandomPrice = (): string => (Math.random() * (25 - 8) + 8).toFixed(2);

const getRandomCondition = (): string => {
  const conditions = [
    "Used - Excellent",
    "Used - Very Good",
    "Used - Good",
    "Used - Fair",
    "New",
    "Used - Like New",
  ];
  return conditions[Math.floor(Math.random() * conditions.length)];
};

const BookBazaarApp: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showChat, setShowChat] = useState<boolean>(false);
  const [purchaseFormData, setPurchaseFormData] = useState<{
    name: string;
    email: string;
    phone: string;
  }>({
    name: "",
    email: "",
    phone: "",
  });
  const [purchaseErrors, setPurchaseErrors] = useState<{
    [key: string]: string;
  }>({});
  const [purchaseSuccess, setPurchaseSuccess] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [filterCondition, setFilterCondition] = useState<string>("All");
  const [filterSeller, setFilterSeller] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<string>("None");
  const [userId] = useState<string>(
    `user-${Math.random().toString(36).substring(2, 9)}`
  );
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isBotTyping, setIsBotTyping] = useState<boolean>(false);
  const [showPurchaseForm, setShowPurchaseForm] = useState<boolean>(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [passwordRevealBookTitle, setPasswordRevealBookTitle] =
    useState<string>("");
  const [hiddenBookId, setHiddenBookId] = useState<string>("");

  const [currentBookTaskState, setCurrentBookTaskState] = useState<{
    bookId: string;
    hasSelectedCorrectBook: boolean;
    hasSentCorrectFirstMessage: boolean;
    hasFilledFormCorrectly: boolean;
    isFirstMessageSent: boolean;
  }>({
    bookId: "",
    hasSelectedCorrectBook: false,
    hasSentCorrectFirstMessage: false,
    hasFilledFormCorrectly: false,
    isFirstMessageSent: false,
  });

  const [sessionContaminated, setSessionContaminated] =
    useState<boolean>(false);

  const generateRandomBooks = useCallback(() => {
    const shuffledAllBooks = shuffleArray([...allBooks]);
    const displayedBooks: Book[] = shuffledAllBooks.slice(0, 8).map((book) => ({
      ...book,
      price: Number.parseFloat(getRandomPrice()),
      condition: getRandomCondition(),
      imageUrl: `https://placehold.co/150x200/${getLightRandomHexColor()}/000000?text=${encodeURIComponent(
        book.title.substring(0, 10)
      )}`,
    }));
    setBooks(displayedBooks);
    const randomIndex = Math.floor(Math.random() * displayedBooks.length);
    setPasswordRevealBookTitle(displayedBooks[randomIndex].title);
    setHiddenBookId(displayedBooks[randomIndex].id);
  }, []);

  useEffect(() => {
    generateRandomBooks();
  }, [generateRandomBooks]);

  const uniqueConditions = [
    "All",
    ...new Set(allBooks.map((book) => book.condition)),
  ];
  const uniqueSellers = [
    "All",
    ...new Set(allBooks.map((book) => book.seller)),
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showChat, isBotTyping]);

  const filteredAndSortedBooks = [...books]
    .filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (book) => filterCondition === "All" || book.condition === filterCondition
    )
    .filter((book) => filterSeller === "All" || book.seller === filterSeller)
    .sort((a, b) => {
      if (sortOrder === "priceAsc") {
        return a.price - b.price;
      } else if (sortOrder === "priceDesc") {
        return b.price - a.price;
      }
      return 0;
    });

  const handlePurchase = () => {
    const errs: { [key: string]: string } = {};
    if (!purchaseFormData.name.trim()) errs.name = "Name is required.";
    if (!/.+@.+\..+/.test(purchaseFormData.email))
      errs.email = "Valid email is required.";
    if (!/^\d{10}$/.test(purchaseFormData.phone))
      errs.phone = "Phone must be 10 digits.";

    setPurchaseErrors(errs);

    if (Object.keys(errs).length > 0) {
      setPurchaseSuccess(false);
      setSessionContaminated(true);
      return;
    }

    setPurchaseSuccess(true);

    const isFormCorrect =
      purchaseFormData.name.toLowerCase() === "alex" &&
      purchaseFormData.email.toLowerCase() === "alex@example.com" &&
      purchaseFormData.phone === "9876543210";

    if (!isFormCorrect) {
      setSessionContaminated(true);
    }

    setCurrentBookTaskState((prev) => ({
      ...prev,
      hasFilledFormCorrectly: isFormCorrect,
    }));

    const allConditionsMet =
      !sessionContaminated &&
      currentBookTaskState.hasSelectedCorrectBook &&
      currentBookTaskState.hasSentCorrectFirstMessage &&
      isFormCorrect;

    setShowPassword(allConditionsMet);
  };

  const handleBuyNowFromChat = () => {
    setShowChat(false);
    setShowPurchaseForm(true);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const userMessage = newMessage;
      setNewMessage("");
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          userId: userId,
          text: userMessage,
          timestamp: new Date(),
        },
      ]);
      setIsBotTyping(true);

      if (!currentBookTaskState.isFirstMessageSent) {
        const isCorrectFirstMessage =
          userMessage.toLowerCase().includes("is this book available?") &&
          selectedBook?.id === hiddenBookId;

        if (!isCorrectFirstMessage) {
          setSessionContaminated(true);
        }

        setCurrentBookTaskState((prev) => ({
          ...prev,
          isFirstMessageSent: true,
          hasSentCorrectFirstMessage: isCorrectFirstMessage,
        }));
      }

      try {
        const chatHistory = [];
        chatHistory.push({ role: "user", parts: [{ text: userMessage }] });
        const payload = { contents: chatHistory };
        const apiKey = "";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        let botResponseText =
          "Sorry, I couldn't process that. Please try again.";
        let isBuyNowButton = false;

        if (userMessage.toLowerCase().includes("is this book available?")) {
          await new Promise((resolve) => setTimeout(resolve, 1500));
          botResponseText = `Yes, "${selectedBook?.title}" is currently available from ${selectedBook?.seller}! Are you interested in purchasing it?`;
          isBuyNowButton = true;
        } else if (apiKey) {
          const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          const result = await response.json();
          if (
            result.candidates &&
            result.candidates.length > 0 &&
            result.candidates[0].content &&
            result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0
          ) {
            botResponseText = result.candidates[0].content.parts[0].text;
          }
        }

        setMessages((prevMessages) => [
          ...prevMessages,
          {
            userId: "BookBazaarBot",
            text: botResponseText,
            timestamp: new Date(),
            isBuyNowButton: isBuyNowButton,
          },
        ]);
      } catch (error) {
        console.error("Error sending message or getting bot response:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            userId: "BookBazaarBot",
            text: "Oops! Something went wrong. Please try again later.",
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsBotTyping(false);
      }
    }
  };

  const resetBookDetailState = () => {
    setSelectedBook(null);
    setPurchaseFormData({ name: "", email: "", phone: "" });
    setPurchaseErrors({});
    setPurchaseSuccess(false);
    setShowPassword(false);
    setShowPurchaseForm(false);
    setMessages([]);

    setCurrentBookTaskState({
      bookId: "",
      hasSelectedCorrectBook: false,
      hasSentCorrectFirstMessage: false,
      hasFilledFormCorrectly: false,
      isFirstMessageSent: false,
    });
  };

  const handleDashboardClick2 = () => {
    resetBookDetailState();
    setSearchTerm("");
    setFilterCondition("All");
    setFilterSeller("All");
    setSortOrder("None");
    generateRandomBooks();
  };

  const handleBookSelection = (book: Book) => {
    const isCorrectBook = book.id === hiddenBookId;

    if (!isCorrectBook) {
      setSessionContaminated(true);
    }

    setSelectedBook(book);
    setShowPurchaseForm(false);
    setMessages([]);

    setCurrentBookTaskState({
      bookId: book.id,
      hasSelectedCorrectBook: isCorrectBook,
      hasSentCorrectFirstMessage: false,
      hasFilledFormCorrectly: false,
      isFirstMessageSent: false,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800 flex">
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col shadow-lg sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-500"
          >
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
          </svg>
          <h1 className="text-2xl font-extrabold text-gray-900">BookBazaar</h1>
        </div>
        <nav className="flex-1">
          <ul>
            <li className="mb-4">
              <button className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-3 rounded-lg w-full text-left transition-colors duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-3"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                Dashboard
              </button>
            </li>
            <li className="mb-4">
              <a
                href="#"
                className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-3 rounded-lg w-full text-left transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-3"
                >
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                </svg>
                My Books
              </a>
            </li>
            <li className="mb-4">
              <a
                href="#"
                className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-3 rounded-lg w-full text-left transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-3"
                >
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                  <path d="M3 6h18"></path>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                Sell a Book
              </a>
            </li>
            <li className="mb-4">
              <a
                href="#"
                className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-3 rounded-lg w-full text-left transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-3"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
                Favorites
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-3 rounded-lg w-full text-left transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-3"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
                Orders
              </a>
            </li>
          </ul>
        </nav>
        <div className="mt-auto pt-6 border-t border-gray-200">
          <a
            href="#"
            className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-3 rounded-lg w-full text-left transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-3"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="17 16 22 12 17 8"></polyline>
              <line x1="22" x2="10" y1="12" y2="12"></line>
            </svg>
            Logout
          </a>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-20 rounded-b-xl">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold text-gray-900">
              BookBazaar
            </h1>
          </div>
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search books by title or author..."
              className="p-3 pl-10 border border-gray-300 rounded-full w-80 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute left-3 text-gray-400"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </div>
        </header>

        <main className="container mx-auto p-8 flex-1">
          <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4 rounded-md shadow-sm">
            <p className="font-semibold">
              <span role="img" aria-label="info">
                ℹ️
              </span>{" "}
              Select the book titled "
              <strong className="text-blue-900">
                {passwordRevealBookTitle}
              </strong>
              ", to proceed for the discussion with dealer. To send message to
              dealer, type "Is this book available?" in the chat box. To return
              the password, fill the form with: Full Name: Alex, Email:
              alex@example.com, Phone: 9876543210.
            </p>
          </div>

          {!selectedBook && (
            <>
              <button
                onClick={handleDashboardClick2}
                className="mb-6 flex items-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path>
                  <path d="M21 3v5h-5"></path>
                </svg>
                New Task
              </button>

              <div className="flex flex-wrap justify-center md:justify-end gap-4 mb-8">
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-blue-500 shadow-sm"
                    value={filterCondition}
                    onChange={(e) => setFilterCondition(e.target.value)}
                  >
                    <option value="All">All Conditions</option>
                    {uniqueConditions
                      .filter((c) => c !== "All")
                      .map((condition) => (
                        <option key={condition} value={condition}>
                          {condition}
                        </option>
                      ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                    </svg>
                  </div>
                </div>

                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-blue-500 shadow-sm"
                    value={filterSeller}
                    onChange={(e) => setFilterSeller(e.target.value)}
                  >
                    <option value="All">All Sellers</option>
                    {uniqueSellers
                      .filter((s) => s !== "All")
                      .map((seller) => (
                        <option key={seller} value={seller}>
                          {seller}
                        </option>
                      ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                  </div>
                </div>

                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-blue-500 shadow-sm"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                  >
                    <option value="None">Sort By Price</option>
                    <option value="priceAsc">Price: Low to High</option>
                    <option value="priceDesc">Price: High to Low</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    {sortOrder === "priceAsc" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m14 9-3-3-3 3"></path>
                        <path d="M11 6v12"></path>
                        <path d="M17 18h-6"></path>
                        <path d="M7 18H6a2 2 0 0 1-2-2v-3.5a2 2 0 0 1 2-2H7"></path>
                      </svg>
                    ) : sortOrder === "priceDesc" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m14 15-3 3-3-3"></path>
                        <path d="M11 18V6"></path>
                        <path d="M17 6h-6"></path>
                        <path d="M7 6H6a2 2 0 0 0-2 2v3.5a2 2 0 0 0 2 2H7"></path>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                      </svg>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredAndSortedBooks.length > 0 ? (
                  filteredAndSortedBooks.map((book) => (
                    <div
                      key={book.id}
                      className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-100"
                      onClick={() => handleBookSelection(book)}
                    >
                      <img
                        src={book.imageUrl || "/placeholder.svg"}
                        alt={book.title}
                        className="w-36 h-48 object-cover rounded-lg shadow-md mb-4"
                        onError={(
                          e: React.SyntheticEvent<HTMLImageElement, Event>
                        ) => {
                          e.currentTarget.src = `https://placehold.co/150x200/E0E0E0/333333?text=${encodeURIComponent(
                            book.title.substring(0, 10)
                          )}`;
                        }}
                      />
                      <h2 className="text-xl font-bold text-gray-900 mb-1">
                        {book.title}
                      </h2>
                      <p className="text-gray-600 text-sm mb-2">
                        by {book.author}
                      </p>
                      <p className="text-blue-700 font-semibold text-lg mb-3">
                        ${book.price.toFixed(2)}
                      </p>
                      <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {book.condition}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-20 text-gray-500 text-xl">
                    No books found matching your criteria.
                  </div>
                )}
              </div>
            </>
          )}

          {selectedBook && !purchaseSuccess && (
            <div className="max-w-2xl mx-auto bg-white p-10 rounded-2xl shadow-2xl border border-gray-100 animate-fade-in-down">
              <button
                onClick={resetBookDetailState}
                className="mb-6 text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center text-md font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Back to Book List
              </button>

              <div className="flex flex-col md:flex-row gap-8">
                <img
                  src={selectedBook.imageUrl || "/placeholder.svg"}
                  alt={selectedBook.title}
                  className="w-48 h-64 object-cover rounded-lg shadow-lg flex-shrink-0"
                  onError={(
                    e: React.SyntheticEvent<HTMLImageElement, Event>
                  ) => {
                    e.currentTarget.src = `https://placehold.co/150x200/E0E0E0/333333?text=${encodeURIComponent(
                      selectedBook.title.substring(0, 10)
                    )}`;
                  }}
                />
                <div className="flex-grow">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {selectedBook.title}
                  </h2>
                  <p className="text-xl text-gray-700 mb-3">
                    by{" "}
                    <span className="font-semibold">{selectedBook.author}</span>
                  </p>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {selectedBook.description}
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mb-6">
                    <p className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 text-blue-500"
                      >
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                      Seller:{" "}
                      <span className="font-medium ml-1">
                        {selectedBook.seller}
                      </span>
                    </p>
                    <p className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 text-blue-500"
                      >
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                      </svg>
                      Price:{" "}
                      <span className="font-medium ml-1">
                        ${selectedBook.price.toFixed(2)}
                      </span>
                    </p>
                    <p className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 text-blue-500"
                      >
                        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                      </svg>
                      Condition:{" "}
                      <span className="font-medium ml-1">
                        {selectedBook.condition}
                      </span>
                    </p>
                    <p className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 text-blue-500"
                      >
                        <rect
                          width="18"
                          height="18"
                          x="3"
                          y="4"
                          rx="2"
                          ry="2"
                        ></rect>
                        <line x1="16" x2="16" y1="2" y2="6"></line>
                        <line x1="8" x2="8" y1="2" y2="6"></line>
                        <line x1="3" x2="21" y1="10" y2="10"></line>
                      </svg>
                      Listed: <span className="font-medium ml-1">Today</span>
                    </p>
                  </div>

                  {!showPurchaseForm && (
                    <button
                      onClick={() => setShowChat(true)}
                      className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-all duration-300 text-lg font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V3a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                      Chat with Dealer
                    </button>
                  )}

                  {showPurchaseForm && (
                    <>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 mt-8">
                        Contact Seller / Purchase
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <input
                            type="text"
                            placeholder="Your Full Name"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm"
                            value={purchaseFormData.name}
                            onChange={(e) =>
                              setPurchaseFormData({
                                ...purchaseFormData,
                                name: e.target.value,
                              })
                            }
                          />
                          {purchaseErrors.name && (
                            <p className="text-red-600 text-sm mt-1">
                              {purchaseErrors.name}
                            </p>
                          )}
                        </div>
                        <div>
                          <input
                            type="email"
                            placeholder="Your Email Address"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm"
                            value={purchaseFormData.email}
                            onChange={(e) =>
                              setPurchaseFormData({
                                ...purchaseFormData,
                                email: e.target.value,
                              })
                            }
                          />
                          {purchaseErrors.email && (
                            <p className="text-red-600 text-sm mt-1">
                              {purchaseErrors.email}
                            </p>
                          )}
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="Your Phone Number (10 digits)"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm"
                            value={purchaseFormData.phone}
                            onChange={(e) =>
                              setPurchaseFormData({
                                ...purchaseFormData,
                                phone: e.target.value,
                              })
                            }
                          />
                          {purchaseErrors.phone && (
                            <p className="text-red-600 text-sm mt-1">
                              {purchaseErrors.phone}
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={handlePurchase}
                        className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 text-lg font-semibold shadow-md hover:shadow-lg"
                      >
                        Confirm Purchase
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {purchaseSuccess && (
            <div className="max-w-md mx-auto mt-12 text-center bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 animate-fade-in-up">
              <h3 className="text-3xl font-bold text-green-600 mb-4 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-3"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Success!
              </h3>
              <p className="mb-6 text-gray-700 text-lg">
                Your request for "{selectedBook?.title}" has been sent. The
                seller will contact you shortly.
              </p>
              {showPassword ? (
                <p className="mt-6 font-bold text-blue-700 text-xl bg-blue-50 p-3 rounded-lg border border-blue-200">
                  🔐 PASSWORD:{" "}
                  <span className="text-blue-900">{PASSWORD_BookBazaar}</span>
                </p>
              ) : (
                <p className="mt-6 text-gray-600 text-md bg-gray-50 p-3 rounded-lg border border-gray-200">
                  ✔️ Your request was successful!
                </p>
              )}
              {!showPassword && (
                <button
                  onClick={resetBookDetailState}
                  className="mt-8 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300 text-md font-semibold shadow"
                >
                  Browse More Books
                </button>
              )}
            </div>
          )}
        </main>
      </div>

      {showChat && (
        <div className="fixed bottom-[100px] left-1/2 -translate-x-1/2 w-full max-w-lg flex z-50 p-4 max-h-[80vh]">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col">
            <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-blue-600 text-white rounded-t-2xl">
              <h2 className="text-2xl font-bold flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V3a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                Global BookBazaar Chat
              </h2>
              <button
                onClick={() => setShowChat(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 py-10">
                  No messages yet. Start the conversation!
                </div>
              )}
              {messages.map((msg, index) => (
                <div
                  key={msg.id || index}
                  className={`flex ${
                    msg.userId === userId || msg.userId === "BookBazaarBot"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] p-3 rounded-xl shadow-sm ${
                      msg.userId === userId
                        ? "bg-blue-500 text-white rounded-br-none"
                        : msg.userId === "BookBazaarBot"
                        ? "bg-blue-100 text-blue-800 rounded-bl-none"
                        : "bg-gray-200 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    <p className="text-xs font-semibold mb-1 opacity-80">
                      {msg.userId === userId
                        ? "You"
                        : msg.userId === "BookBazaarBot"
                        ? "BookBazaar Bot"
                        : `User: ${msg.userId.substring(0, 8)}...`}
                    </p>
                    <p className="text-sm">{msg.text}</p>
                    {msg.isBuyNowButton && msg.userId === "BookBazaarBot" && (
                      <button
                        onClick={handleBuyNowFromChat}
                        className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
                      >
                        Buy Now
                      </button>
                    )}
                    {msg.timestamp && (
                      <p className="text-xs mt-1 opacity-60">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-5 border-t border-gray-200 bg-white flex gap-3">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors duration-200 shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m22 2-7 20-4-9-9-4 20-7Z"></path>
                  <path d="M9 9l5 5"></path>
                </svg>
              </button>
            </div>
            {userId && (
              <div className="text-center text-xs text-gray-500 p-2 bg-gray-100 rounded-b-2xl">
                Your User ID:{" "}
                <span className="font-mono text-gray-700">{userId}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookBazaarApp;
