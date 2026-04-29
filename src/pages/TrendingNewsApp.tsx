import React, { useState, useMemo, useEffect } from 'react';

// Task Related constants
export const PASSWORD_TrendingNewsApp = "cmsnewsreadknowledge";
export const TASK_ID_TrendingNewsApp = "cms-community-trendingnews";

interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

interface NewsArticle {
  id: number;
  title: string;
  description: string;
  content: string;
  category: 'politics' | 'technology' | 'finance' | 'entertainment'|'science' | 'health' | 'environment';
  tags: string[];
  publishDate: string;
  author: string;
  views: number;
  likes: number;
  trending: boolean;
}

const dummyNews: NewsArticle[] = [
  {
    id: 1,
    title: "Revolutionary AI Technology Transforms Healthcare Industry",
    description: "Latest breakthroughs in artificial intelligence are reshaping medical diagnosis and treatment approaches worldwide.",
    content: "The healthcare industry is experiencing a revolutionary transformation with the integration of advanced AI technologies. Recent developments have shown promising results in medical diagnosis, drug discovery, and patient care optimization.",
    category: 'technology',
    tags: ['AI', 'Healthcare', 'Innovation', 'Medical'],
    publishDate: '2024-07-08',
    author: 'Dr. Sarah Chen',
    views: 15420,
    likes: 892,
    trending: true
  },
  {
    id: 2,
    title: "Global Markets Rally as Economic Indicators Show Positive Growth",
    description: "Stock markets worldwide experience significant gains following encouraging economic data releases.",
    content: "Financial markets across the globe are celebrating a remarkable surge as key economic indicators paint an optimistic picture of global economic health.",
    category: 'finance',
    tags: ['Markets', 'Economy', 'Growth', 'Investment'],
    publishDate: '2024-07-07',
    author: 'Michael Rodriguez',
    views: 12800,
    likes: 567,
    trending: true
  },
  {
    id: 3,
    title: "Historic Climate Agreement Reached at International Summit",
    description: "World leaders unite on groundbreaking environmental policies to combat climate change.",
    content: "In a historic moment for global environmental policy, world leaders have reached a comprehensive climate agreement that sets ambitious targets for carbon reduction and renewable energy adoption.",
    category: 'politics',
    tags: ['Climate', 'Environment', 'Global', 'Policy'],
    publishDate: '2024-07-06',
    author: 'Emma Thompson',
    views: 18500,
    likes: 1243,
    trending: false
  },
  {
    id: 4,
    title: "Blockbuster Movie Breaks Box Office Records in Opening Weekend",
    description: "The latest superhero film shatters expectations with unprecedented ticket sales globally.",
    content: "The entertainment industry is buzzing with excitement as the newest superhero blockbuster has demolished box office records in its opening weekend.",
    category: 'entertainment',
    tags: ['Movies', 'Box Office', 'Hollywood', 'Superhero'],
    publishDate: '2024-07-05',
    author: 'James Wilson',
    views: 22100,
    likes: 1876,
    trending: true
  },
  {
    id: 5,
    title: "Breakthrough in Quantum Computing Promises Faster Processing",
    description: "Scientists achieve new milestone in quantum technology that could revolutionize computing power.",
    content: "Researchers at leading technology institutes have announced a significant breakthrough in quantum computing that promises to accelerate processing capabilities beyond current limitations.",
    category: 'technology',
    tags: ['Quantum', 'Computing', 'Research', 'Science'],
    publishDate: '2024-07-04',
    author: 'Dr. Robert Kim',
    views: 9800,
    likes: 654,
    trending: false
  },
  {
    id: 6,
    title: "Central Bank Announces New Digital Currency Initiative",
    description: "Major financial institution reveals plans for digital currency implementation and regulatory framework.",
    content: "The central bank has unveiled an ambitious digital currency initiative that will transform the financial landscape over the next five years.",
    category: 'finance',
    tags: ['Digital Currency', 'Banking', 'Fintech', 'Regulation'],
    publishDate: '2024-07-03',
    author: 'Lisa Chang',
    views: 14600,
    likes: 789,
    trending: false
  },
  {
    id: 7,
    title: "New Legislation Aims to Strengthen Cybersecurity Infrastructure",
    description: "Government introduces comprehensive cybersecurity bill to protect critical national infrastructure.",
    content: "Lawmakers have introduced comprehensive cybersecurity legislation designed to strengthen the nation's digital infrastructure against increasing cyber threats.",
    category: 'politics',
    tags: ['Cybersecurity', 'Legislation', 'Infrastructure', 'Security'],
    publishDate: '2024-07-02',
    author: 'David Martinez',
    views: 11300,
    likes: 445,
    trending: false
  },
  {
    id: 8,
    title: "Streaming Platform Announces Original Series with Star-Studded Cast",
    description: "Major streaming service reveals upcoming drama series featuring Academy Award winners.",
    content: "The entertainment industry is abuzz with excitement as a leading streaming platform announced its most ambitious original series to date, featuring an ensemble cast of Academy Award winners and renowned directors.",
    category: 'entertainment',
    tags: ['Streaming', 'Original Series', 'Drama', 'Television'],
    publishDate: '2024-07-01',
    author: 'Jennifer Adams',
    views: 16700,
    likes: 1124,
    trending: true
  },
  {
    id: 9,
    title: "NASA Plans Historic Mission to Mars",
    description: "NASA reveals new mission that will send astronauts to Mars in the next decade.",
    content: "NASA has unveiled plans for a groundbreaking mission that will see human exploration of Mars within the next decade. The project will involve multiple phases, with the first stage launching in 2025.",
    category: 'science',
    tags: ['NASA', 'Mars', 'Space', 'Exploration'],
    publishDate: '2024-06-30',
    author: 'John Stevens',
    views: 13200,
    likes: 540,
    trending: true
  },
  {
    id: 10,
    title: "Global Music Awards Celebrates Diversity in the Industry",
    description: "Award show honors artists from different genres and cultural backgrounds.",
    content: "The prestigious Global Music Awards celebrated diversity in the music industry by honoring artists from all over the world, showcasing a range of genres and cultural influences.",
    category: 'entertainment',
    tags: ['Music', 'Awards', 'Diversity', 'Culture'],
    publishDate: '2024-06-29',
    author: 'Olivia Green',
    views: 8900,
    likes: 432,
    trending: false
  },
  {
    id: 11,
    title: "Virtual Reality Transforms Gaming Experience",
    description: "The rise of virtual reality is reshaping the world of interactive gaming, offering players a fully immersive experience.",
    content: "The world of gaming is changing drastically with the rise of virtual reality (VR), providing gamers with an unparalleled level of immersion.",
    category: 'technology',
    tags: ['Virtual Reality', 'Gaming', 'Tech'],
    publishDate: '2024-06-28',
    author: 'Kevin Daniels',
    views: 10450,
    likes: 675,
    trending: true
  },
  {
    id: 12,
    title: "US President Signs New Healthcare Reform Bill into Law",
    description: "The new healthcare reform bill aims to provide affordable healthcare for millions of uninsured Americans.",
    content: "In a landmark moment for American politics, the US President signed a sweeping healthcare reform bill into law, aiming to provide healthcare access to millions of uninsured citizens.",
    category: 'politics',
    tags: ['Healthcare', 'Reform', 'US', 'Policy'],
    publishDate: '2024-06-27',
    author: 'Emily Richards',
    views: 11250,
    likes: 890,
    trending: true
  },
  {
    id: 13,
    title: "Apple Announces New Line of Augmented Reality Glasses",
    description: "Apple enters the augmented reality space with a new product designed to revolutionize how we interact with technology.",
    content: "Apple has officially announced its new line of augmented reality glasses, set to change the way users interact with the digital world.",
    category: 'technology',
    tags: ['Apple', 'Augmented Reality', 'Tech', 'Innovation'],
    publishDate: '2024-06-26',
    author: 'Chris Walker',
    views: 15730,
    likes: 1100,
    trending: true
  },
  {
    id: 14,
    title: "International Space Station Celebrates 25th Anniversary",
    description: "The International Space Station marks 25 years of space exploration, fostering international collaboration.",
    content: "The International Space Station (ISS) has celebrated its 25th anniversary, a milestone in space exploration and international collaboration.",
    category: 'science',
    tags: ['Space', 'ISS', 'Exploration', 'Anniversary'],
    publishDate: '2024-06-25',
    author: 'Gregory Turner',
    views: 9250,
    likes: 642,
    trending: false
  },
  {
    id: 15,
    title: "Global Food Crisis: Solutions from Innovation and Sustainability",
    description: "Experts explore solutions to combat the growing global food crisis through sustainable farming and technological innovation.",
    content: "As the global food crisis continues to escalate, experts are turning to sustainable farming practices and innovative technologies to ensure food security for future generations.",
    category: 'environment',
    tags: ['Food Security', 'Sustainability', 'Innovation', 'Farming'],
    publishDate: '2024-06-24',
    author: 'Sarah Fisher',
    views: 7850,
    likes: 230,
    trending: false
  },
  {
    id: 16,
    title: "Tesla Unveils New Electric Truck with Advanced Features",
    description: "Tesla introduces a new electric truck designed to revolutionize the logistics and transportation industry.",
    content: "Tesla has revealed a new electric truck, featuring cutting-edge technology and sustainability features to transform the logistics and transportation sectors.",
    category: 'technology',
    tags: ['Tesla', 'Electric Truck', 'Sustainability', 'Automotive'],
    publishDate: '2024-06-23',
    author: 'Michael Lee',
    views: 13250,
    likes: 1005,
    trending: true
  },
  {
    id: 17,
    title: "New Study Reveals Breakthrough in Alzheimer's Treatment",
    description: "Researchers announce a promising new treatment for Alzheimer's disease that could change the future of care.",
    content: "A groundbreaking study reveals a new treatment for Alzheimer's that has shown incredible promise in early trials, offering hope to millions of patients and their families.",
    category: 'health',
    tags: ['Alzheimer\'s', 'Healthcare', 'Medical Research', 'Treatment'],
    publishDate: '2024-06-22',
    author: 'Dr. Emma Brooks',
    views: 13900,
    likes: 1050,
    trending: false
  },
  {
    id: 18,
    title: "China Sets Ambitious Goals for Carbon Neutrality by 2060",
    description: "China unveils a detailed roadmap to achieve carbon neutrality by 2060, marking a major shift in environmental policy.",
    content: "China has announced an ambitious plan to achieve carbon neutrality by 2060, a major move that could set the global stage for future climate change actions.",
    category: 'politics',
    tags: ['Carbon Neutrality', 'China', 'Environment', 'Climate'],
    publishDate: '2024-06-21',
    author: 'Richard Yang',
    views: 11500,
    likes: 870,
    trending: false
  },
  {
    id: 19,
    title: "Exploring the Future of Work: AI, Remote Collaboration, and Automation",
    description: "Experts discuss how AI, automation, and remote collaboration tools will reshape the future of work.",
    content: "The future of work is rapidly evolving with advancements in AI, remote collaboration tools, and automation technologies changing how businesses and employees interact.",
    category: 'technology',
    tags: ['Future of Work', 'AI', 'Automation', 'Remote Collaboration'],
    publishDate: '2024-06-20',
    author: 'Hannah White',
    views: 14720,
    likes: 1124,
    trending: true
  },
  {
    id: 20,
    title: "New Innovations in Electric Vehicle Charging Infrastructure",
    description: "Industry leaders reveal the latest advancements in electric vehicle charging networks, making EV adoption easier.",
    content: "As the demand for electric vehicles grows, advancements in charging infrastructure are being made to accommodate a rapidly expanding EV market.",
    category: 'technology',
    tags: ['Electric Vehicles', 'Charging Infrastructure', 'Sustainability', 'Tech'],
    publishDate: '2024-06-19',
    author: 'David King',
    views: 13050,
    likes: 950,
    trending: true
  },
  {
    id: 21,
    title: "AI-Powered Robotics Revolutionizes Manufacturing Industry",
    description: "Robotic systems equipped with artificial intelligence are transforming manufacturing processes, reducing human error and increasing efficiency.",
    content: "AI-powered robots are now capable of learning complex tasks autonomously, enabling manufacturers to reduce reliance on human workers and improve production speed. These robots are equipped with machine learning algorithms that allow them to adapt to different tasks, optimizing production lines for efficiency and precision. The integration of AI with robotics has not only boosted productivity but has also reduced operating costs. Experts believe this technology will continue to evolve, with robots performing more advanced roles in industries such as automotive, electronics, and even healthcare.",
    category: 'technology',
    tags: ['AI', 'Robotics', 'Manufacturing', 'Innovation'],
    publishDate: '2024-07-08',
    author: 'Laura Green',
    views: 15000,
    likes: 1200,
    trending: true
  },
  {
    id: 22,
    title: "Quantum Computing: The Next Frontier of Data Processing",
    description: "Quantum computers are set to revolutionize data processing by solving problems that are currently unsolvable by classical computers.",
    content: "Quantum computing is pushing the boundaries of what we thought was possible with computing technology. Unlike classical computers that rely on bits to process data, quantum computers use quantum bits (qubits), which can represent and process data in multiple states simultaneously. This breakthrough could lead to advancements in cryptography, drug development, and complex problem-solving that could take classical computers millennia to solve. Tech giants are investing billions into quantum research, with the first commercially viable quantum computers expected in the next decade.",
    category: 'technology',
    tags: ['Quantum Computing', 'Data', 'Innovation', 'Tech'],
    publishDate: '2024-07-07',
    author: 'Ethan Mitchell',
    views: 9800,
    likes: 890,
    trending: true
  },
  {
    id: 23,
    title: "Apple Introduces Groundbreaking AR Glasses for Everyday Use",
    description: "Apple unveils its new line of augmented reality glasses, aiming to change the way we interact with the world around us.",
    content: "Apple has officially entered the augmented reality space with its new AR glasses, designed to seamlessly integrate digital content into the user's real-world view. The glasses are lightweight and stylish, offering features like navigation, notifications, and virtual interactions directly in the user's line of sight. The product is expected to reshape the way we interact with technology, with potential applications in gaming, navigation, education, and remote work. Industry experts predict that Apple's AR glasses could lead the charge in the consumer AR market, making the technology mainstream.",
    category: 'technology',
    tags: ['Apple', 'AR Glasses', 'Augmented Reality', 'Innovation'],
    publishDate: '2024-07-06',
    author: 'Jessica White',
    views: 22000,
    likes: 1450,
    trending: true
  },
  {
    id: 24,
    title: "Next-Gen 5G Technology Unlocks Faster Internet Speeds for All",
    description: "The rollout of 5G networks worldwide is unlocking ultra-fast internet speeds, enabling a new era of connectivity.",
    content: "The global rollout of 5G technology is transforming internet connectivity, with speeds up to 100 times faster than current 4G networks. This leap in technology is expected to impact various sectors, including healthcare, entertainment, and transportation. With 5G, users can download high-definition movies in seconds, play immersive online games without lag, and connect more devices to the internet with minimal latency. 5G is also paving the way for innovations like autonomous vehicles and smart cities, where ultra-fast communication between devices is essential.",
    category: 'technology',
    tags: ['5G', 'Connectivity', 'Innovation', 'Technology'],
    publishDate: '2024-07-05',
    author: 'Oliver King',
    views: 17800,
    likes: 1342,
    trending: false
  },
  {
    id: 25,
    title: "AI Chatbots Revolutionize Customer Service Across Industries",
    description: "AI-driven chatbots are enhancing customer service by providing quick, personalized responses and improving user satisfaction.",
    content: "AI-powered chatbots have become a critical component of customer service strategies across industries. These intelligent systems are capable of handling a wide range of customer queries, providing personalized assistance, and even solving complex issues without human intervention. From e-commerce to healthcare, businesses are deploying chatbots to streamline their operations and offer faster, more efficient customer support. As AI continues to improve, these chatbots are expected to become even more sophisticated, capable of understanding natural language and delivering highly tailored solutions in real-time.",
    category: 'technology',
    tags: ['AI', 'Chatbots', 'Customer Service', 'Automation'],
    publishDate: '2024-07-04',
    author: 'Benjamin Clark',
    views: 10300,
    likes: 765,
    trending: false
  }
];


type CategoryType = 'all' | 'politics' | 'technology' | 'finance' | 'entertainment';
const ArrowLeft: React.FC<IconProps> = ({
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
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
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
    <path d="M16 21v-2a4 4 0 0 0-8 0v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);  

const Eye: React.FC<IconProps> = ({
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
    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const Tag: React.FC<IconProps> = ({
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
<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>
  </svg>
);

const Heart: React.FC<IconProps> = ({
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
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.66l-1.06-1.05a5.5 5.5 0 0 0-7.78 7.78l8.49 8.48a1.5 1.5 0 0 0 2.12 0l8.49-8.48a5.5 5.5 0 0 0 .01-7.77z" />
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

const TrendingNewsApp: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [showTrending, setShowTrending] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null);
  const [isValidActionCompleted, setIsValidActionCompleted] =useState<boolean>(false);
  const [canComplete, setCanComplete] = useState<boolean>(true);
  useEffect(()=>{
    window.scroll(0,0);
  },[]);
  const filteredNews = useMemo(() => {
    let filtered = dummyNews;
    console.log("Filtered News: ", filtered);
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(news => news.category === selectedCategory);
    }

    if (showTrending) {
      filtered = filtered.filter(news => news.trending);
    }

    return filtered.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  }, [selectedCategory, showTrending]);

  const handleCategoryClick = (category: CategoryType) => {
    if( category !== "technology"  && canComplete) {
      setCanComplete(false);
    }
    setSelectedCategory(category);
    setShowTrending(false);
  };

  const handleTrendingClick = () => {
    if (selectedCategory !== 'technology' && canComplete && !showTrending) {
      setCanComplete(false);
    }
    setShowTrending(!showTrending);
  };

  const handleNewsClick = (news: NewsArticle) => {
    if( news.category !== 'technology' && canComplete && news.id !== 11) {
      setCanComplete(false);
    }
    setSelectedNews(news);
  };

  const handleBackClick = () => {
    if(canComplete && !isValidActionCompleted) {
      setCanComplete(false);
      setIsValidActionCompleted(true);
    }
    setSelectedNews(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'politics': return 'bg-blue-100 text-blue-800';
      case 'technology': return 'bg-green-100 text-green-800';
      case 'finance': return 'bg-yellow-100 text-yellow-800';
      case 'entertainment': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (selectedNews) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleBackClick}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft size={20} />
                  <span>Back</span>
                </button>
                <h1 className="text-2xl font-bold text-gray-900">News Point</h1>
              </div>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Article Header */}
            <div className="p-6 border-b">
              <div className="flex items-center space-x-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedNews.category)}`}>
                  {selectedNews.category.charAt(0).toUpperCase() + selectedNews.category.slice(1)}
                </span>
                {selectedNews.trending && (
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                    Trending
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedNews.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <User size={16} />
                  <span>{selectedNews.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar size={16} />
                  <span>{formatDate(selectedNews.publishDate)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye size={16} />
                  <span>{selectedNews.views.toLocaleString()} views</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart size={16} />
                  <span>{selectedNews.likes.toLocaleString()} likes</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {selectedNews.tags.map((tag, index) => (
                  <span key={index} className="flex items-center space-x-1 bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                    <Tag size={12} />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Article Body */}
            <div className="p-6">
              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 mb-6 leading-relaxed font-medium">
                  {selectedNews.description}
                </p>
                <div className="text-gray-900 leading-relaxed">
                  {selectedNews.content.split('. ').map((sentence, index) => (
                    <p key={index} className="mb-4">
                      {sentence}{index < selectedNews.content.split('. ').length - 1 ? '.' : ''}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.location.href = '/'}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Home</span>
              </button>
              <h1 className="text-2xl font-bold text-gray-900">News Point</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Category Filters */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryClick('all')}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === 'all' && !showTrending
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleCategoryClick('politics')}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === 'politics' && !showTrending
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Politics
            </button>
            <button
              onClick={() => handleCategoryClick('technology')}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === 'technology' && !showTrending
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Technology
            </button>
            <button
              onClick={() => handleCategoryClick('finance')}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === 'finance' && !showTrending
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Finance
            </button>
            <button
              onClick={() => handleCategoryClick('entertainment')}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === 'entertainment' && !showTrending
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Entertainment
            </button>
            <button
              onClick={handleTrendingClick}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                showTrending
                  ? 'bg-red-600 text-white'
                  : 'bg-red-100 text-red-700 hover:bg-red-200'
              }`}
            >
              🔥 Trending
            </button>
          </div>
        </div>
      </div>
     
      {/* News List */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {isValidActionCompleted && (
          <div className="flex items-center justify-center bg-gradient-to-r from-blue-700 to-pink-800  shadow-md rounded-xl border hover:shadow-lg transition-shadow mb-4">
            <div className="text-center p-4 my-2">
              <p className="text-base font-bold text-green-200 mb-2">
                "Awesome! You have successfully read the news!"
              </p>
              <p className="text-pink-300 text-base font-semibold">
                The secret password is:{" "}
                <span className="font-mono font-bold text-lg">
                  {PASSWORD_TrendingNewsApp}
                </span>
              </p>
            </div>
          </div>
        )}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredNews.map((news) => (
            <div
              key={news.id}
              onClick={() => handleNewsClick(news)}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(news.category)}`}>
                    {news.category.charAt(0).toUpperCase() + news.category.slice(1)}
                  </span>
                  {news.trending && (
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                      Trending
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {news.title}
                </h3>
                
                <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                  {news.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {news.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <User size={14} />
                    <span>{news.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>{formatDate(news.publishDate)}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3 pt-3 border-t">
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Eye size={14} />
                    <span className="text-sm">{news.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Heart size={14} />
                    <span className="text-sm">{news.likes.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No news articles found for the selected filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingNewsApp;