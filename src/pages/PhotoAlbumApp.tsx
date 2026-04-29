import React, { useState, useEffect } from "react";
import { Camera, Plus, Eye, Heart, Star } from "lucide-react";

// Task Related constants
export const PASSWORD_PhotoAlbumApp = "ArrangeYourImages";
export const TASK_ID_PhotoAlbumApp = "productivity-analysis-album";

// Types
interface Photo {
  id: string;
  url: string;
  name: string;
  category: "cat" | "dog" | "elephant" | "tiger";
}

interface Album {
  id: string;
  name: string;
  photos: Photo[];
  createdAt: Date;
}

interface User {
  name: string;
  email: string;
  avatar: string;
}

interface Theme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  gradient: string;
}

// Dummy data
const dummyPhotos: Photo[] = [
  // Cats
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&h=400&fit=crop",
    name: "White Cat",
    category: "cat",
  },
  {
    id: "6",
    url: "https://plus.unsplash.com/premium_photo-1677545182425-4fb12bdb9faf?q=80&w=1472&auto=format&fit=crop",
    name: "Maine Coon",
    category: "cat",
  },
  {
    id: "8",
    url: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=400&fit=crop",
    name: "Labrador",
    category: "dog",
  },
  {
    id: "9",
    url: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&h=400&fit=crop",
    name: "German Shepherd",
    category: "dog",
  },
  {
    id: "12",
    url: "https://images.unsplash.com/photo-1581852017103-68ac65514cf7?q=80&w=1473&auto=format&fit=crop",
    name: "Baby Elephant",
    category: "elephant",
  },
  {
    id: "10",
    url: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=400&fit=crop",
    name: "Beagle",
    category: "dog",
  },
  {
    id: "11",
    url: "https://plus.unsplash.com/premium_photo-1666777247416-ee7a95235559?q=80&w=687&auto=format&fit=crop",
    name: "Brown Dog",
    category: "dog",
  },
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop",
    name: "Orange Tabby",
    category: "cat",
  },
  {
    id: "18",
    url: "https://images.unsplash.com/photo-1500463959177-e0869687df26?q=80&w=1470&auto=format&fit=crop",
    name: "Caspian Tiger",
    category: "tiger",
  },
  {
    id: "13",
    url: "https://images.unsplash.com/photo-1526226128118-9ef71fc2f34b?q=80&w=1469&auto=format&fit=crop",
    name: "Elephant Herd",
    category: "elephant",
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1561948955-570b270e7c36?q=80&w=601&auto=format&fit=crop",
    name: "Siamese Cat",
    category: "cat",
  },
  {
    id: "14",
    url: "https://images.unsplash.com/photo-1603483080228-04f2313d9f10?q=80&w=765&auto=format&fit=crop",
    name: "Asian Elephant",
    category: "elephant",
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=400&h=400&fit=crop",
    name: "Maine Coon",
    category: "cat",
  },
  {
    id: "7",
    url: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop",
    name: "Golden Retriever",
    category: "dog",
  },
  {
    id: "15",
    url: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400&h=400&fit=crop",
    name: "African Elephant",
    category: "elephant",
  },

  {
    id: "16",
    url: "https://images.unsplash.com/photo-1549480017-d76466a4b7e8?q=80&w=1456&auto=format&fit=crop",
    name: "Siberian Tiger",
    category: "tiger",
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1506755855567-92ff770e8d00?q=80&w=687&auto=format&fit=crop",
    name: "Persian Cat",
    category: "cat",
  },
  {
    id: "17",
    url: "https://images.unsplash.com/photo-1615474286632-e31ac3633d58?q=80&w=764&auto=format&fit=crop",
    name: "Bengal Tiger",
    category: "tiger",
  },
];

const user: User = {
  name: "Alex Johnson",
  email: "alex.johnson@email.com",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
};

const themes: Theme[] = [
  {
    primary: "from-purple-600 to-pink-600",
    secondary: "from-purple-100 to-pink-100",
    accent: "purple-600",
    background: "purple-50",
    text: "purple-900",
    gradient: "bg-gradient-to-br from-purple-600 to-pink-600",
  },
  {
    primary: "from-blue-600 to-cyan-600",
    secondary: "from-blue-100 to-cyan-100",
    accent: "blue-600",
    background: "blue-50",
    text: "blue-900",
    gradient: "bg-gradient-to-br from-blue-600 to-cyan-600",
  },
  {
    primary: "from-green-600 to-teal-600",
    secondary: "from-green-100 to-teal-100",
    accent: "green-600",
    background: "green-50",
    text: "green-900",
    gradient: "bg-gradient-to-br from-green-600 to-teal-600",
  },
  {
    primary: "from-orange-600 to-red-600",
    secondary: "from-orange-100 to-red-100",
    accent: "orange-600",
    background: "orange-50",
    text: "orange-900",
    gradient: "bg-gradient-to-br from-orange-600 to-red-600",
  },
  {
    primary: "from-indigo-600 to-purple-600",
    secondary: "from-indigo-100 to-purple-100",
    accent: "indigo-600",
    background: "indigo-50",
    text: "indigo-900",
    gradient: "bg-gradient-to-br from-indigo-600 to-purple-600",
  },
];

const PhotoAlbumApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"images" | "albums">("images");
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [isCreatingAlbum, setIsCreatingAlbum] = useState(false);
  const [albumName, setAlbumName] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [theme, setTheme] = useState<Theme>(themes[0]);
  const [currentTestSelection, setCurrentTestSelection] = useState<{
    category: "dog" | "cat" | "elephant" | "tiger";
    albumName: string;
  }>();
  const [canComplete, setCanComplete] = useState(true);
  const [isActionCompleted, setIsActionCompleted] = useState<boolean>(false);
  // Set random theme on component mount
  useEffect(() => {
    window.scroll(0, 0);
    const array: Array<"dog" | "cat" | "elephant" | "tiger"> = [
      "dog",
      "cat",
      "elephant",
      "tiger",
    ];
    const category: "dog" | "cat" | "elephant" | "tiger" =
      array[Math.floor(Math.random() * array.length)];
    setCurrentTestSelection({
      category: category,
      albumName: `${category}_${Date.now()}`,
    });
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    setTheme(randomTheme);
  }, []);

  const filteredPhotos = dummyPhotos;

  const togglePhotoSelection = (photoId: string) => {
    setSelectedPhotos((prev) =>
      prev.includes(photoId)
        ? prev.filter((id) => id !== photoId)
        : [...prev, photoId]
    );
  };

  const renderPassword = () => {
    if (!isActionCompleted) return null;
    return (
      <div
        className={`${theme.gradient} shadow-lg p-4 rounded-lg mb-4 text-white`}
      >
        <p
          className={`text-white text-base font-medium font-mono text-center w-full`}
        >
          ✅ Awesome! Here is secret Password:{" "}
          <span className="font-bold">{PASSWORD_PhotoAlbumApp}</span>
        </p>
      </div>
    );
  };

  const createAlbum = () => {
    if (albumName.trim() && selectedPhotos.length > 0) {
      const _category = currentTestSelection?.category;
      const _albumName = currentTestSelection?.albumName;
      const categoryPhotoIds = dummyPhotos
        .filter((photo) => _category === photo.category)
        .map((photo) => photo.id);
      const isOtherPhotoPresent = selectedPhotos.find(
        (id) => !categoryPhotoIds.includes(id)
      );

      if (
        canComplete &&
        !isActionCompleted &&
        _albumName === albumName &&
        categoryPhotoIds.length === selectedPhotos.length &&
        !isOtherPhotoPresent
      ) {
        setIsActionCompleted(true);
      }
      setCanComplete(false);

      const newAlbum: Album = {
        id: Date.now().toString(),
        name: albumName.trim(),
        photos: dummyPhotos.filter((photo) =>
          selectedPhotos.includes(photo.id)
        ),
        createdAt: new Date(),
      };
      setAlbums((prev) => [...prev, newAlbum]);
      setAlbumName("");
      setSelectedPhotos([]);
      setIsCreatingAlbum(false);
      setActiveTab("albums");
    }
  };

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case "cat":
        return "🐱";
      case "dog":
        return "🐶";
      case "elephant":
        return "🐘";
      case "tiger":
        return "🐅";
      default:
        return "📸";
    }
  };

  return (
    <div
      className={`min-h-screen bg-${theme.background} transition-all duration-500`}
    >
      {/* Header */}
      <header className={`${theme.gradient} shadow-lg`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Camera className="text-white w-8 h-8" />
              <h1 className="text-2xl font-bold text-white">
                PhotoAlbum Manager ✨
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <img
                src={user.avatar}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-white shadow-md"
              />
              <div className="text-white">
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm opacity-90">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-4">
        {renderPassword()}
        <div
          className={`${theme.gradient} shadow-lg p-4 rounded-lg mb-4 text-white`}
        >
          <p>Follow the below instructions</p>
          <p>
            Select all{" "}
            <span className="font-bold">{currentTestSelection?.category}</span>{" "}
            photos, then click <span className="font-bold">+ Create Album</span>{" "}
            to add them to the album named{" "}
            <span className="font-bold">{currentTestSelection?.albumName}</span>
          </p>
        </div>
        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => {
              setActiveTab("images");
              setSelectedAlbum(null);
            }}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              activeTab === "images"
                ? `bg-gradient-to-r ${theme.primary} text-white shadow-lg`
                : `bg-white text-${theme.text} hover:bg-${theme.secondary} border-2 border-${theme.accent}`
            }`}
          >
            <Camera className="w-5 h-5" />
            <span>Your Images 📸</span>
          </button>
          <button
            onClick={() => {
              setActiveTab("albums");
              setSelectedAlbum(null);
            }}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              activeTab === "albums"
                ? `bg-gradient-to-r ${theme.primary} text-white shadow-lg`
                : `bg-white text-${theme.text} hover:bg-${theme.secondary} border-2 border-${theme.accent}`
            }`}
          >
            <Heart className="w-5 h-5" />
            <span>Your Albums 💝 ({albums.length})</span>
          </button>
        </div>

        {/* Your Images Tab */}
        {activeTab === "images" && !selectedAlbum && (
          <div>
            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
              <div className="flex items-center space-x-4">
                <button
                  disabled={!selectedPhotos.length}
                  onClick={() => setIsCreatingAlbum(true)}
                  className={`flex items-center space-x-2 bg-gradient-to-r ${theme.primary} text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-60`}
                >
                  <Plus className="w-5 h-5" />
                  <span>Create Album ✨</span>
                </button>
                {selectedPhotos.length > 0 && (
                  <div
                    className={`bg-${theme.secondary} text-${theme.text} px-4 py-2 rounded-lg font-semibold`}
                  >
                    {selectedPhotos.length} selected 🎯
                  </div>
                )}
              </div>
            </div>

            {/* Photo Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className={`relative group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer ${
                    selectedPhotos.includes(photo.id)
                      ? `ring-4 ring-${theme.accent}`
                      : ""
                  }`}
                  onClick={() => togglePhotoSelection(photo.id)}
                >
                  <img
                    src={photo.url}
                    alt={photo.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="font-semibold">
                      {getCategoryEmoji(photo.category)} {photo.name}
                    </p>
                  </div>
                  {selectedPhotos.includes(photo.id) && (
                    <div
                      className={`absolute top-2 right-2 w-6 h-6 bg-${theme.accent} rounded-full flex items-center justify-center`}
                    >
                      <Star
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Your Albums Tab */}
        {activeTab === "albums" && !selectedAlbum && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold text-${theme.text}`}>
                Your Albums 💝
              </h2>
              <div
                className={`bg-${theme.secondary} text-${theme.text} px-4 py-2 rounded-lg font-semibold`}
              >
                {albums.length} album{albums.length !== 1 ? "s" : ""} created
              </div>
            </div>

            {albums.length === 0 ? (
              <div
                className={`text-center py-16 bg-white rounded-xl shadow-lg border-2 border-dashed border-${theme.accent}`}
              >
                <Camera
                  className={`w-16 h-16 text-${theme.accent} mx-auto mb-4`}
                />
                <p className={`text-${theme.text} text-lg`}>
                  No albums created yet! 📸
                </p>
                <p className={`text-${theme.text} opacity-60 mt-2`}>
                  Go to "Your Images" tab to create your first album ✨
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {albums.map((album) => (
                  <div
                    key={album.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                    onClick={() => setSelectedAlbum(album)}
                  >
                    <div className="relative">
                      <img
                        src={album.photos[0]?.url}
                        alt={album.name}
                        className="w-full h-48 object-cover"
                      />
                      <div
                        className={`absolute top-2 right-2 bg-${theme.accent} text-white px-3 py-1 rounded-full text-sm font-semibold`}
                      >
                        {album.photos.length} photos
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className={`font-bold text-${theme.text} mb-2`}>
                        💝 {album.name}
                      </h3>
                      <p className={`text-${theme.text} opacity-60 text-sm`}>
                        Created {album.createdAt.toLocaleDateString()}
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex -space-x-2">
                          {album.photos.slice(0, 4).map((photo, index) => (
                            <img
                              key={index}
                              src={photo.url}
                              alt=""
                              className="w-8 h-8 rounded-full border-2 border-white object-cover"
                            />
                          ))}
                          {album.photos.length > 4 && (
                            <div
                              className={`w-8 h-8 rounded-full bg-${theme.accent} text-white text-xs flex items-center justify-center border-2 border-white`}
                            >
                              +{album.photos.length - 4}
                            </div>
                          )}
                        </div>
                        <Eye className={`w-5 h-5 text-${theme.accent}`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Selected Album View */}
        {selectedAlbum && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSelectedAlbum(null)}
                  className={`flex items-center space-x-2 text-${theme.accent} hover:text-${theme.text} transition-colors duration-200`}
                >
                  <span>← Back to Albums</span>
                </button>
                <h2 className={`text-2xl font-bold text-${theme.text}`}>
                  💝 {selectedAlbum.name}
                </h2>
              </div>
              <div
                className={`bg-${theme.secondary} text-${theme.text} px-4 py-2 rounded-lg font-semibold`}
              >
                {selectedAlbum.photos.length} photo
                {selectedAlbum.photos.length !== 1 ? "s" : ""}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {selectedAlbum.photos.map((photo) => (
                <div
                  key={photo.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <img
                    src={photo.url}
                    alt={photo.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <p className={`font-semibold text-${theme.text}`}>
                      {getCategoryEmoji(photo.category)} {photo.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Create Album Modal */}
        {isCreatingAlbum && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <h3 className={`text-xl font-bold text-${theme.text} mb-4`}>
                Create New Album ✨
              </h3>
              <input
                type="text"
                value={albumName}
                onChange={(e) => setAlbumName(e.target.value)}
                placeholder="Enter album name... 📝"
                className={`w-full px-4 py-3 border-2 border-${theme.accent} rounded-lg focus:outline-none focus:ring-2 focus:ring-${theme.accent} mb-4`}
              />
              <p className={`text-${theme.text} opacity-60 mb-4`}>
                {selectedPhotos.length} photo
                {selectedPhotos.length !== 1 ? "s" : ""} selected
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={createAlbum}
                  disabled={!albumName.trim() || selectedPhotos.length === 0}
                  className={`flex-1 bg-gradient-to-r ${theme.primary} text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  Create Album 🎉
                </button>
                <button
                  onClick={() => setIsCreatingAlbum(false)}
                  className={`flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200`}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoAlbumApp;
