  import { useState, useMemo, FC } from "react";

// ### Asset & Type Definitions ###
interface Article {
  id: string;
  briefTitle: string;
  briefDescription: string;
  fullContent: string;
  correctTags: string[];
  correctCategory: string;
  tagPool: string[];
}

const CATEGORIES = ["Tech Deep Dive", "Industry News", "Developer Guides", "Opinion Piece"];

// ### SVG Icon Components ###
const CheckCircleIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
const ClipboardIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a2.25 2.25 0 01-2.25 2.25h-1.5a2.25 2.25 0 01-2.25-2.25v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
    />
  </svg>
);
const CloseIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const EyeIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.432 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const SparklesIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM18 13.5l.813 2.846a4.5 4.5 0 003.09 3.09L24 18l-2.846.813a4.5 4.5 0 00-3.09 3.09L18 24l-.813-2.846a4.5 4.5 0 00-3.09-3.09L12 18l2.846-.813a4.5 4.5 0 003.09-3.09L18 13.5z"
    />
  </svg>
);

// ### Task Configuration ###
export const TASK_ID_KeywordSuggestion = "cms-publishing-suggesttags";
export const PASSWORD_KeywordSuggestion = "PUBLISH_634h78_SUCCESS";

const ARTICLES_DB: Article[] = [
  {
    id: "art_01",
    briefTitle: "Deep Dive: React Server Components",
    briefDescription:
      "An in-depth technical analysis of the new React Server Components architecture, its performance implications, and how it compares to traditional SSR.",
    fullContent:
      "The web development ecosystem is buzzing with the re-introduction of server-side rendering, but with a modern twist: React Server Components (RSC). Spearheaded by the React team, this architecture allows developers to render UI components on the server, sending minimal interactive JavaScript to the client. This approach significantly boosts initial page load times and improves overall performance, especially on low-powered devices. By moving data fetching and rendering logic to the server, we create faster, more resilient applications without sacrificing the rich, interactive experience that defines modern web apps. It's a paradigm shift that requires a new way of thinking about component architecture.",
    correctTags: ["React", "Server Components", "Performance", "SSR", "Web Development"],
    correctCategory: "Tech Deep Dive",
    tagPool: ["UI", "UX", "Next.js", "Frontend", "JavaScript", "API", "Database", "CSS"]
  },
  {
    id: "art_02",
    briefTitle: "Guide to AI in Content Creation",
    briefDescription:
      "A practical guide for marketing teams on how to leverage Large Language Models (LLMs) to automate and scale their content production pipeline.",
    fullContent:
      "Artificial Intelligence, particularly Large Language Models (LLMs), is revolutionizing content creation. These advanced models can generate articles, summarize complex topics, and even suggest content ideas based on market trends. This level of automation allows marketing teams to scale their output and focus on high-level strategy rather than the minutiae of copywriting. This guide provides a step-by-step walkthrough for integrating AI into your workflow, from prompt engineering to editing and fact-checking AI-generated content. Adopting these tools is no longer a futuristic concept but a practical necessity for staying competitive.",
    correctCategory: "Developer Guides",
    correctTags: ["AI", "Content Creation", "LLM", "Automation", "Marketing"],
    tagPool: ["SEO", "Generative AI", "NLP", "Digital", "Strategy", "Copywriting", "Analytics"]
  }
];

const AdvancedPublishing: FC = () => {
  const [stage, setStage] = useState(1);
  const [selectedBrief, setSelectedBrief] = useState<Article | null>(null);
  const [isBriefSelectionCorrect, setIsBriefSelectionCorrect] = useState(false);
  const [pastedContent, setPastedContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTagInput, setNewTagInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showGenericSuccess, setShowGenericSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const { targetArticle, shuffledBriefs, shuffledCategories, initialSuggestedTags, randomBgColor } =
    useMemo(() => {
      const target = ARTICLES_DB[0];
      const briefs = [...ARTICLES_DB].sort(() => Math.random() - 0.5);
      const categories = [...CATEGORIES].sort(() => Math.random() - 0.5);
      const correctSample = [...target.correctTags].sort(() => 0.5 - Math.random()).slice(0, 3);
      const incorrectSample = [...target.tagPool].sort(() => 0.5 - Math.random()).slice(0, 2);
      const initialTags: string[] = [...new Set([...correctSample, ...incorrectSample])].sort(
        () => 0.5 - Math.random()
      );
      const bgColors = ["bg-gray-900", "bg-slate-900", "bg-zinc-900", "bg-neutral-900"];
      const bgColor = bgColors[Math.floor(Math.random() * bgColors.length)];
      return {
        targetArticle: target,
        shuffledBriefs: briefs,
        shuffledCategories: categories,
        initialSuggestedTags: initialTags,
        randomBgColor: bgColor
      };
    }, []);

  const handleShowContent = (brief: Article) => {
    setIsBriefSelectionCorrect(brief.id === targetArticle.id);
    setSelectedBrief(brief);
  };

  const handleCopyAndProceed = () => {
    if (!selectedBrief) return;
    navigator.clipboard.writeText(selectedBrief.fullContent);
    setTags(initialSuggestedTags);
    setSelectedCategory(shuffledCategories[0]);
    setStage(2);
    setStatusMessage("Content copied! Please paste it in the editor.");
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handlePublish = () => {
    const isPastedContentCorrect = pastedContent.trim() === targetArticle.fullContent.trim();
    const sortedUserTags = [...tags].map((t) => t.toLowerCase()).sort();
    const sortedCorrectTags = [...targetArticle.correctTags].map((t) => t.toLowerCase()).sort();
    const areTagsCorrect = JSON.stringify(sortedUserTags) === JSON.stringify(sortedCorrectTags);
    const isCategoryCorrect = selectedCategory === targetArticle.correctCategory;

    if (isBriefSelectionCorrect && isPastedContentCorrect && areTagsCorrect && isCategoryCorrect) {
      setShowPassword(true);
    } else {
      setShowGenericSuccess(true);
    }
  };

  const handleAddTag = () => {
    if (
      newTagInput.trim() &&
      !tags.some((t) => t.toLowerCase() === newTagInput.trim().toLowerCase())
    ) {
      setTags([...tags, newTagInput.trim()]);
      setNewTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => setTags(tags.filter((t) => t !== tagToRemove));

  const renderEndScreen = (isSuccessWithPassword: boolean) => (
    <div className="text-center p-10 bg-gray-800 rounded-xl shadow-2xl border border-green-500/30">
      <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
      <h1 className="text-2xl font-bold text-gray-100">Article Published!</h1>
      <p className="text-gray-400 mt-2">
        The article has been successfully submitted to the publishing queue.
      </p>
      {isSuccessWithPassword && (
        <div className="mt-6 bg-gray-900 border-2 border-dashed border-green-500 rounded-lg px-8 py-4">
          <p className="text-lg text-gray-300">Password:</p>
          <p id="password" className="text-4xl font-mono tracking-widest text-green-400 font-bold">
            {PASSWORD_KeywordSuggestion}
          </p>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    if (showPassword) return renderEndScreen(true);
    if (showGenericSuccess) return renderEndScreen(false);

    switch (stage) {
      case 1:
        return (
          <div className="w-full max-w-3xl">
            <h2 className="text-2xl font-bold text-center text-gray-100 mb-2">Content Planner</h2>
            <p className="text-center text-gray-400 mb-8">
              Select a brief to view and copy its content.
            </p>
            <div className="space-y-4">
              {shuffledBriefs.map((brief) => (
                <div
                  key={brief.id}
                  className={`bg-gray-800 border border-gray-700 rounded-lg p-5 transition-all ${
                    selectedBrief?.id === brief.id ? "ring-2 ring-cyan-500" : ""
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg text-cyan-400">{brief.briefTitle}</h3>
                      <p className="text-gray-300 mt-2">{brief.briefDescription}</p>
                    </div>
                    <button
                      onClick={() => handleShowContent(brief)}
                      className="flex items-center gap-2 px-3 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 font-semibold transition text-sm"
                    >
                      <EyeIcon className="w-4 h-4" /> Show Content
                    </button>
                  </div>
                  {selectedBrief?.id === brief.id && (
                    <div className="mt-4 pt-4 border-t border-gray-700/50">
                      <textarea
                        readOnly
                        value={selectedBrief.fullContent}
                        className="w-full h-32 p-3 bg-gray-900 border border-gray-600 rounded-md resize-none text-gray-300 focus:outline-none"
                      />
                      <button
                        onClick={handleCopyAndProceed}
                        className="mt-3 w-full text-center px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-500 font-semibold transition"
                      >
                        Copy Content & Proceed
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-gray-100 mb-4">Compose Article</h2>
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                <div className="bg-gray-900 p-2 rounded-t-lg border-b border-gray-600">
                  <h3 className="font-mono text-sm text-cyan-400">
                    {selectedBrief?.briefTitle || "Article"}
                  </h3>
                </div>
                <textarea
                  id="content-editor"
                  value={pastedContent}
                  onChange={(e) => setPastedContent(e.target.value)}
                  placeholder="< Paste copied article content here >"
                  className="w-full h-96 p-4 bg-gray-800 text-gray-200 rounded-b-lg resize-none focus:outline-none placeholder-gray-500"
                />
              </div>
            </div>
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold text-gray-100 mb-4">Publishing Settings</h2>
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 space-y-6">
                <div>
                  <label
                    htmlFor="category-select"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Primary Category
                  </label>
                  <select
                    id="category-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-md p-2 focus:ring-2 focus:ring-indigo-500"
                  >
                    {shuffledCategories.map((cat) => (
                      <option key={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Keywords</label>
                  <div className="flex flex-wrap gap-2 mb-3 min-h-[34px]">
                    {tags.map((tag) => (
                      <div
                        key={tag}
                        className="flex items-center bg-cyan-900/50 text-cyan-300 text-sm font-medium pl-3 pr-2 py-1 rounded-full border border-cyan-700"
                      >
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2 text-cyan-500 hover:text-cyan-300 rounded-full p-0.5"
                        >
                          <CloseIcon className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTagInput}
                      onChange={(e) => setNewTagInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                      placeholder="Add new tag..."
                      className="flex-grow bg-gray-700 border border-gray-600 text-white rounded-md p-2 focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      onClick={handleAddTag}
                      className="px-4 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-md transition"
                    >
                      Add
                    </button>
                  </div>
                </div>
                <button
                  id="publish-btn"
                  onClick={handlePublish}
                  disabled={!pastedContent}
                  className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                >
                  <SparklesIcon className="w-5 h-5" /> Publish Article
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`min-h-screen text-white flex flex-col items-center justify-center p-8 font-sans transition-colors duration-500 ${randomBgColor}`}
    >
      <div className="absolute top-6 left-8">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ClipboardIcon className="w-8 h-8 text-cyan-400" /> CMS Publisher
        </h1>
      </div>
      <div className="w-full flex items-center justify-center">{renderContent()}</div>
      {statusMessage && (
        <div className="absolute bottom-8 px-6 py-3 bg-cyan-800/90 border border-cyan-600 text-white rounded-lg shadow-lg animate-pulse">
          {statusMessage}
        </div>
      )}
    </div>
  );
};

export default AdvancedPublishing;