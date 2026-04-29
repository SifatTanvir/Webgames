import { useState, useEffect, useCallback, useMemo } from "react";

type Answers = {
  genre: string;
  name: string;
  avatar: string;
  backstory: string;
  scene: string;
};

export const PASSWORD_LOST_CITY = "LOST_CITY_7H8JK9L0";
export const TASK_ID_LOST_CITY = "entertainment-story-startinteractive";

// Reusable function to generate the prompt string
const makePrompt = (
  genre: string,
  name: string,
  avatar: string,
  backstory: string,
  scene: string
) =>
  `Your goal is to create an interactive adventure story titled 'The Lost City'. First, select <b>'${genre}'</b> using the 'Genre' dropdown. enter <b>'${name}'</b> in the 'Character Name' field, then select the <b>'${avatar}'</b> card, then click the 'Continue to Backstory' button. Third, select the <b>'${backstory}'</b> card, then click the 'Continue to Story Editor' button. Fourth, enter <b>'${scene}'</b> in the 'Scene Editor' field, then click the 'Publish Chapter' button. Upon completion, a password will be shown; return this password as your answer.`;

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const LostCityGame = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [characterName, setCharacterName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [selectedBackstory, setSelectedBackstory] = useState("");
  const [sceneText, setSceneText] = useState("");
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState<Answers>({
    genre: "",
    name: "",
    avatar: "",
    backstory: "",
    scene: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [uiTheme, setUiTheme] = useState("blue");
  const [avatarGridCols, setAvatarGridCols] = useState(3);
  const [shuffledAvatars, setShuffledAvatars] = useState([
    "Explorer",
    "Detective",
    "Mage",
    "Scientist",
    "Soldier",
    "Scholar",
  ]);

  // UI Theme variations
  const themes = useMemo(
    () => ({
      blue: {
        primary: "bg-blue-600 hover:bg-blue-700",
        secondary: "bg-blue-100 border-blue-300",
        text: "text-blue-800",
        accent: "border-blue-500",
      },
      green: {
        primary: "bg-green-600 hover:bg-green-700",
        secondary: "bg-green-100 border-green-300",
        text: "text-green-800",
        accent: "border-green-500",
      },
      purple: {
        primary: "bg-purple-600 hover:bg-purple-700",
        secondary: "bg-purple-100 border-purple-300",
        text: "text-purple-800",
        accent: "border-purple-500",
      },
      indigo: {
        primary: "bg-indigo-600 hover:bg-indigo-700",
        secondary: "bg-indigo-100 border-indigo-300",
        text: "text-indigo-800",
        accent: "border-indigo-500",
      },
    }),
    []
  );

  // Prompt templates
  const promptTemplates = useMemo(
    () => [
      {
        text: makePrompt(
          "Adventure",
          "Elena Drake",
          "Explorer",
          "Archaeologist seeking ancient truths",
          "jungle-covered ruins"
        ),
        answers: {
          genre: "Adventure",
          name: "Elena Drake",
          avatar: "Explorer",
          backstory: "Archaeologist seeking ancient truths",
          scene: "jungle-covered ruins",
        },
      },
      {
        text: makePrompt(
          "Mystery",
          "Jack Carter",
          "Detective",
          "Former cop turned treasure hunter",
          "hidden chamber beneath"
        ),
        answers: {
          genre: "Mystery",
          name: "Jack Carter",
          avatar: "Detective",
          backstory: "Former cop turned treasure hunter",
          scene: "hidden chamber beneath",
        },
      },
      {
        text: makePrompt(
          "Fantasy",
          "Lyra Swift",
          "Mage",
          "Scholar of forgotten magic",
          "city of the ancients"
        ),
        answers: {
          genre: "Fantasy",
          name: "Lyra Swift",
          avatar: "Mage",
          backstory: "Scholar of forgotten magic",
          scene: "city of the ancients",
        },
      },
      {
        text: makePrompt(
          "Sci-Fi",
          "Dr. Kael Ren",
          "Scientist",
          "Xenoarchaeologist from the future",
          "advanced alien technology"
        ),
        answers: {
          genre: "Sci-Fi",
          name: "Dr. Kael Ren",
          avatar: "Scientist",
          backstory: "Xenoarchaeologist from the future",
          scene: "advanced alien technology",
        },
      },
    ],
    []
  );

  const generateNewTask = useCallback(() => {
    const randomPrompt =
      promptTemplates[Math.floor(Math.random() * promptTemplates.length)];
    const randomTheme =
      Object.keys(themes)[
        Math.floor(Math.random() * Object.keys(themes).length)
      ];

    setCurrentPrompt(randomPrompt.text);
    setCorrectAnswers(randomPrompt.answers);
    setUiTheme(randomTheme);
    setCurrentStage(1);
    setSelectedGenre("");
    setCharacterName("");
    setSelectedAvatar("");
    setSelectedBackstory("");
    setSceneText("");
    setShowPassword(false);
    // Shuffle avatars and randomize grid columns (2, 3, or 4)
    setAvatarGridCols([2, 3, 4][Math.floor(Math.random() * 3)]);
    setShuffledAvatars(
      shuffleArray([
        "Explorer",
        "Detective",
        "Mage",
        "Scientist",
        "Soldier",
        "Scholar",
      ])
    );
  }, [promptTemplates, themes]);

  useEffect(() => {
    generateNewTask();
  }, [generateNewTask]);

  const checkAllAnswers = () => {
    return (
      selectedGenre === correctAnswers.genre &&
      characterName === correctAnswers.name &&
      selectedAvatar === correctAnswers.avatar &&
      selectedBackstory === correctAnswers.backstory &&
      sceneText.includes(correctAnswers.scene)
    );
  };

  const handleSubmit = () => {
    setShowPassword(true);
  };

  const theme = themes[uiTheme as keyof typeof themes];

  // Validation for each step
  const isStage1Valid = selectedGenre && characterName && selectedAvatar;
  const isStage2Valid = !!selectedBackstory;
  const isStage3Valid = !!sceneText;

  return (
    <div
      className="min-h-screen flex flex-col items-center relative"
      style={{
        background: `linear-gradient(to bottom right, #2e3c2f 0%, #5a6e4f 100%), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a2a1a]/80 via-[#3a4d2c]/70 to-[#2e3c2f]/80 pointer-events-none z-0"></div>
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Sticky Header & Prompt */}
        <div className="w-full sticky top-0 left-0 right-0 z-30 shadow-md">
          <div className="w-full max-w-full px-[20%] flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white  p-4">
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-gray-800 mb-2">
                Task Instructions:
              </h1>
              <p
                className="text-sm text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: currentPrompt }}
              />
            </div>
            <button
              onClick={generateNewTask}
              className={`mt-4 sm:mt-0 sm:ml-4 px-4 py-2 rounded-md font-medium text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${theme.primary} active:scale-95 focus:ring-blue-300 shadow`}
            >
              New Task
            </button>
          </div>
        </div>

        {/* Main Card and Progress Bar Layout */}
        <div className="flex flex-row mt-16 items-start justify-center w-full max-w-5xl mb-8 gap-8 relative z-10">
          {/* Main Card */}
          <div
            className={`w-full  max-w-3xl bg-white rounded-3xl shadow-2xl p-6 animate-fadeIn border-t-8 ${
              theme.primary.split(" ")[0]
            }`}
          >
            {/* Stage 1: Genre & Character Setup */}
            {currentStage === 1 && (
              <div className="space-y-6">
                <h2 className={`text-2xl font-bold mb-6 ${theme.text}`}>
                  The Lost City - Story Setup
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Genre
                  </label>
                  <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className={`w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${theme.secondary} ${theme.accent}`}
                  >
                    <option value="">Choose a genre...</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Mystery">Mystery</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Sci-Fi">Sci-Fi</option>
                    <option value="Horror">Horror</option>
                    <option value="Historical">Historical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Character Name
                  </label>
                  <input
                    type="text"
                    value={characterName}
                    onChange={(e) => setCharacterName(e.target.value)}
                    placeholder="Enter your character's name"
                    className={`w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${theme.secondary} ${theme.accent}`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Choose Avatar
                  </label>
                  <div
                    className={`grid grid-cols-1 md:grid-cols-${avatarGridCols} gap-3`}
                  >
                    {shuffledAvatars.map((avatar) => (
                      <button
                        key={avatar}
                        onClick={() => setSelectedAvatar(avatar)}
                        className={`p-3 border-2 rounded-md transition-colors font-semibold text-base ${
                          selectedAvatar === avatar
                            ? `${theme.secondary} ${theme.accent} ring-2 ring-offset-2 ring-blue-300 bg-blue-100 text-blue-900 scale-105`
                            : "border-gray-200 hover:border-gray-300 bg-white text-gray-700"
                        }`}
                      >
                        {avatar}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => setCurrentStage(2)}
                    disabled={!isStage1Valid}
                    className={`px-6 py-3 text-white rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      theme.primary
                    } active:scale-95 focus:ring-blue-300 ${
                      !isStage1Valid ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    Continue to Backstory
                  </button>
                </div>
              </div>
            )}

            {/* Stage 2: Backstory Selection */}
            {currentStage === 2 && (
              <div className="space-y-6">
                <h2 className={`text-2xl font-bold mb-6 ${theme.text}`}>
                  Character Backstory
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Backstory
                  </label>
                  <div className="space-y-3">
                    {[
                      "Archaeologist seeking ancient truths",
                      "Former cop turned treasure hunter",
                      "Scholar of forgotten magic",
                      "Xenoarchaeologist from the future",
                      "Disgraced professor on redemption quest",
                      "Adventurer searching for lost family",
                    ].map((story) => (
                      <div
                        key={story}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-colors font-semibold text-base ${
                          selectedBackstory === story
                            ? `${theme.secondary} ${theme.accent} ring-2 ring-offset-2 ring-blue-300 bg-blue-100 text-blue-900 scale-105`
                            : "border-gray-200 hover:border-gray-300 bg-white text-gray-700"
                        }`}
                        onClick={() => setSelectedBackstory(story)}
                      >
                        <p className="text-gray-800">{story}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setCurrentStage(1)}
                    className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 focus:ring-gray-300"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStage(3)}
                    disabled={!isStage2Valid}
                    className={`px-6 py-3 text-white rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      theme.primary
                    } active:scale-95 focus:ring-blue-300 ${
                      !isStage2Valid ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    Continue to Story Editor
                  </button>
                </div>
              </div>
            )}

            {/* Stage 3: Scene Writing */}
            {currentStage === 3 && (
              <div className="space-y-6">
                <h2 className={`text-2xl font-bold mb-6 ${theme.text}`}>
                  Write Opening Scene
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Scene Editor
                  </label>
                  <textarea
                    value={sceneText}
                    onChange={(e) => setSceneText(e.target.value)}
                    placeholder="Write the opening scene of your story..."
                    rows={8}
                    className={`w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${theme.secondary} ${theme.accent}`}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Make sure to include the required phrase from the
                    instructions.
                  </p>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setCurrentStage(2)}
                    disabled={showPassword}
                    className="px-6 py-3 bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 text-white rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 focus:ring-gray-300"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!isStage3Valid || showPassword}
                    className={`px-6 py-3 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      theme.primary
                    } active:scale-95 focus:ring-blue-300 ${
                      !isStage3Valid ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    Publish Chapter
                  </button>
                </div>

                {/* Success Message */}
                {showPassword && (
                  <div
                    className="mt-6 p-4 rounded-lg border-2 text-center shadow-lg transition-all duration-300 animate-fadeIn"
                    style={{
                      borderColor: checkAllAnswers() ? "#22c55e" : "#3b82f6",
                      background: checkAllAnswers() ? "#dcfce7" : "#dbeafe",
                    }}
                  >
                    <h3
                      className={`font-bold mb-2 ${
                        checkAllAnswers() ? "text-green-800" : "text-blue-800"
                      }`}
                    >
                      {checkAllAnswers()
                        ? "Chapter Published!"
                        : "Submission Complete"}
                    </h3>
                    <p
                      className={`${
                        checkAllAnswers() ? "text-green-700" : "text-blue-700"
                      } mb-2`}
                    >
                      {checkAllAnswers()
                        ? "Your story has been successfully published."
                        : "Your submission has been received."}
                    </p>
                    {checkAllAnswers() && (
                      <p className="text-sm text-green-600">
                        <strong>Password:</strong>{" "}
                        <span className="font-mono bg-green-200 px-2 py-1 rounded">
                          {PASSWORD_LOST_CITY}
                        </span>
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
          {/* Vertical Progress Bar on the right, outside the card */}
          <div className="flex flex-col items-center pt-8 pr-2 h-full min-h-[350px]">
            <div className="flex flex-col items-center h-full justify-center gap-2">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg mb-1 transition-all duration-300 ${
                      currentStage >= step
                        ? "bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 text-white shadow-lg scale-110"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-1 h-8 rounded-full transition-all duration-300 ${
                        currentStage > step
                          ? "bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400"
                          : "bg-gray-200"
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LostCityGame;
