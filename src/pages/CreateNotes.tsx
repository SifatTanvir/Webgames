import React, { useState, useMemo } from "react";

// --- Helper: SVG Icons ---
const DocumentIcon = ({ className = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a.375.375 0 01-.375-.375V6.75A3.75 3.75 0 0010.5 3H5.625z" />
    <path d="M12.971 1.816A5.23 5.23 0 0114.25 1.5a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-4.5a.75.75 0 01-.75-.75A5.23 5.23 0 019 6.75a.75.75 0 01.75-.75h2.471l.552-1.654a1.125 1.125 0 00.97-1.53z" />
  </svg>
);

const SaveIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M19.95 21a.75.75 0 01-.75-.75V12.382a.75.75 0 01.22-.53l3.25-3.25a.75.75 0 011.06 1.06l-2.72 2.72v7.868a.75.75 0 01-.75.75z"
      clipRule="evenodd"
    />
    <path d="M18 6.75a.75.75 0 00-.75-.75h-9a.75.75 0 000 1.5h9a.75.75 0 00.75-.75zM17.25 9a.75.75 0 01.75.75v.008a.75.75 0 01-1.5 0V9.75a.75.75 0 01.75-.75zM12 9.75a.75.75 0 00-.75-.75h-3a.75.75 0 000 1.5h3a.75.75 0 00.75-.75zM11.25 12a.75.75 0 01.75.75v.008a.75.75 0 01-1.5 0V12.75a.75.75 0 01.75-.75zM8.25 12.75a.75.75 0 00-.75-.75h-3a.75.75 0 000 1.5h3a.75.75 0 00.75-.75zM7.5 15a.75.75 0 01.75.75v.008a.75.75 0 01-1.5 0V15.75a.75.75 0 01.75-.75zM4.5 15.75a.75.75 0 00-.75-.75h-3a.75.75 0 000 1.5h3a.75.75 0 00.75-.75zM4.5 18a.75.75 0 01.75.75v.008a.75.75 0 01-1.5 0V18.75a.75.75 0 01.75-.75z" />
    <path d="M19.5 2.25a.75.75 0 01.75.75v6a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75z" />
    <path
      fillRule="evenodd"
      d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm3-1.5A1.5 1.5 0 004.5 6v12A1.5 1.5 0 006 19.5h12A1.5 1.5 0 0019.5 18V6A1.5 1.5 0 0018 4.5H6z"
      clipRule="evenodd"
    />
  </svg>
);

const RefreshIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z"
      clipRule="evenodd"
    />
  </svg>
);

// --- Constants & Types ---
export const TASK_ID_CreateMeetingNotes =
  "contracts-documentmanagement-createdoc";
export const PASSWORD_CreateMeetingNotes = "PASSWORD_dfdf9d_contracts";

interface Template {
  id: string;
  name: string;
  description: string;
}

const ALL_TEMPLATES: Template[] = [
  {
    id: "meeting-notes",
    name: "Meeting Notes",
    description: "Standard template for meeting minutes.",
  },
  {
    id: "project-proposal",
    name: "Project Proposal",
    description: "Outline a new project, scope, and goals.",
  },
  {
    id: "nda",
    name: "Non-Disclosure Agreement",
    description: "Standard legal NDA for partnerships.",
  },
  {
    id: "invoice",
    name: "Invoice",
    description: "Bill a client for services rendered.",
  },
];

function getFutureDate(daysAhead: number) {
  const today = new Date();
  today.setDate(today.getDate() + daysAhead);

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// --- Helper: Randomization ---
const DATES = [
  getFutureDate(148),
  getFutureDate(152),
  getFutureDate(108),
  getFutureDate(126),
];
const ATTENDEE_LISTS = [
  "Alice, Bob, Charlie",
  "Dana, Evan, Fiona",
  "Grace, Henry, Isla",
  "Jack, Kelly, Liam",
];
const ACTION_ITEMS = [
  "Deploy V2 to production by EOD",
  "Finalize project scope by next week",
  "Send follow-up emails to all attendees",
  "Prepare budget report for review",
];
const COLOR_THEMES = ["indigo", "blue", "green", "purple", "pink", "orange"];

// --- Main Component ---
const CreateMeetingNotes = () => {
  // --- THEME STATE ---
  const [themeColor, setThemeColor] = useState("indigo");
  // --- PROMPT STATE ---
  const [promptKey, setPromptKey] = useState(0);
  const [suggestedPrompt, setSuggestedPrompt] = useState("");
  // --- RANDOMIZED VALUES ---
  const [correctDate, setCorrectDate] = useState(DATES[0]);
  const [correctAttendees, setCorrectAttendees] = useState(ATTENDEE_LISTS[0]);
  const [correctActionItem, setCorrectActionItem] = useState(ACTION_ITEMS[0]);
  const [correctTemplate, setCorrectTemplate] = useState<Template | null>(
    ALL_TEMPLATES[0]
  );

  // --- EXISTING STATE ---
  const [view, setView] = useState<"template_selection" | "editor">(
    "template_selection"
  );
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  const [formData, setFormData] = useState({
    date: "",
    attendees: "",
    actionItems: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [save, setSave] = useState(false);

  // --- RANDOMIZATION LOGIC ---
  const generateNewTask = () => {
    const date = DATES[Math.floor(Math.random() * DATES.length)];
    const attendees =
      ATTENDEE_LISTS[Math.floor(Math.random() * ATTENDEE_LISTS.length)];
    const actionItem =
      ACTION_ITEMS[Math.floor(Math.random() * ACTION_ITEMS.length)];
    const template =
      ALL_TEMPLATES[Math.floor(Math.random() * ALL_TEMPLATES.length)];
    // Pick a new theme color
    const newColor =
      COLOR_THEMES[Math.floor(Math.random() * COLOR_THEMES.length)];
    setThemeColor(newColor);
    setCorrectDate(date);
    setCorrectAttendees(attendees);
    setCorrectActionItem(actionItem);
    setCorrectTemplate(template);
    setPromptKey((k) => k + 1);
    setView("template_selection");
    setSelectedTemplate(null);
    setFormData({ date: "", attendees: "", actionItems: "" });
    setShowSuccess(false);
    setSave(false);
    // Prompts
    setSuggestedPrompt(
      `Your task is to create a new document for a recent project kickoff meeting. Start by selecting the '${
        template.name
      }' template. In the editor, set the meeting date to ${new Date(
        date
      ).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}. List the attendees as '${attendees}'. For the main content, add a single action item: '${actionItem}'. After you have filled in all the fields correctly, save the document to reveal the password.`
    );
  };

  // Generate on mount
  React.useEffect(() => {
    generateNewTask();
  }, []);

  // --- RANDOMIZED TEMPLATES FOR UI (but only one is correct) ---
  const shuffledTemplates = useMemo(() => {
    // Use promptKey to force recalculation
    void promptKey;
    return [...ALL_TEMPLATES].sort(() => Math.random() - 0.5);
  }, [promptKey]);

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setView("editor");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Validation logic
    const isTemplateCorrect = selectedTemplate?.id === correctTemplate?.id;
    const isDateCorrect = formData.date === correctDate;
    const areAttendeesCorrect = formData.attendees.trim() === correctAttendees;
    const areActionItemsCorrect =
      formData.actionItems.trim() === correctActionItem;

    setSave(true);

    // Silent Failure: show a generic "Saved" notification regardless of success
    if (
      isTemplateCorrect &&
      isDateCorrect &&
      areAttendeesCorrect &&
      areActionItemsCorrect
    ) {
      setShowSuccess(true);
    }
  };

  const EditorHeader = () => {
    const isFormComplete =
      formData.date && formData.attendees && formData.actionItems;
    return (
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <DocumentIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              {selectedTemplate?.name || "New Document"}
            </h2>
            <p className="text-slate-400 text-sm">
              {selectedTemplate?.description || "Create a new document"}
            </p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={showSuccess || !isFormComplete || save}
          className={`flex items-center justify-center disabled:opacity-50 px-6 py-3 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 ${
            showSuccess
              ? "bg-green-600 text-white cursor-not-allowed shadow-lg"
              : !isFormComplete
              ? "bg-gray-600 text-gray-300 cursor-not-allowed opacity-50"
              : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg hover:shadow-xl"
          }`}
        >
          <SaveIcon className="mr-2" />
          {save ? "Saved!" : "Save Document"}
        </button>
      </div>
    );
  };

  return (
    <div
      className={`min-h-screen w-full font-sans transition-colors duration-500 bg-gradient-to-br from-${themeColor}-900 to-gray-900 text-slate-300 flex flex-col`}
    >
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-${themeColor}-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse`}
        ></div>
        <div
          className={`absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-${themeColor}-500/20 rounded-full blur-3xl animate-pulse delay-1000`}
        ></div>
      </div>

      {/* PROMPT HEADER */}
      <div
        className={`w-full mx-auto mb-8 bg-${themeColor}-800/80 backdrop-blur-xl border border-${themeColor}-700/50 rounded-2xl shadow-2xl p-6 m-4 flex flex-col md:flex-row md:items-center md:justify-between gap-6 sticky top-4 z-20 transition-colors duration-500`}
      >
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <h3 className={`text-base font-semibold text-${themeColor}-300`}>
              Task Instructions
            </h3>
          </div>
          <p className={`text-sm text-${themeColor}-100 leading-relaxed`}>
            {suggestedPrompt}
          </p>
        </div>
        <button
          onClick={generateNewTask}
          className={`bg-gradient-to-r from-${themeColor}-600 to-purple-600 hover:from-${themeColor}-500 hover:to-purple-500 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap flex items-center space-x-2`}
        >
          <RefreshIcon className="w-5 h-5" />
          <span>New Task</span>
        </button>
      </div>

      <div className="w-full max-w-6xl mx-auto p-4 flex-1">
        {view === "template_selection" && (
          <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 p-8 rounded-2xl shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Create a New Document
              </h1>
              <p className="text-slate-400 text-lg">
                Select a template to get started on your project.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {shuffledTemplates.map((template, index) => (
                <button
                  key={template.id}
                  onClick={() => handleSelectTemplate(template)}
                  className="bg-slate-700/80 backdrop-blur-sm border border-slate-600/50 p-6 rounded-xl text-left hover:bg-slate-600/80 hover:border-indigo-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <DocumentIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors duration-300">
                        {template.name}
                      </h3>
                      <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                        {template.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {view === "editor" && (
          <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 p-8 rounded-2xl shadow-2xl">
            <EditorHeader />

            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-semibold text-slate-300 mb-3"
                  >
                    Meeting Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="block w-full bg-slate-700/80 backdrop-blur-sm border border-slate-600/50 text-white rounded-xl p-3 shadow-inner focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label
                    htmlFor="attendees"
                    className="block text-sm font-semibold text-slate-300 mb-3"
                  >
                    Attendees
                  </label>
                  <input
                    type="text"
                    id="attendees"
                    name="attendees"
                    value={formData.attendees}
                    onChange={handleInputChange}
                    placeholder="e.g., Alice, Bob, Charlie"
                    className="block w-full bg-slate-700/80 backdrop-blur-sm border border-slate-600/50 text-white rounded-xl p-3 shadow-inner focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 placeholder-slate-400"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="actionItems"
                  className="block text-sm font-semibold text-slate-300 mb-3"
                >
                  Action Items
                </label>
                <textarea
                  id="actionItems"
                  name="actionItems"
                  rows={6}
                  value={formData.actionItems}
                  onChange={handleInputChange}
                  placeholder="Enter each action item on a new line..."
                  className="block w-full bg-slate-700/80 backdrop-blur-sm border border-slate-600/50 text-white rounded-xl p-3 shadow-inner focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 placeholder-slate-400 resize-none"
                />
              </div>
            </div>

            {save && (
              <div className="mt-8 p-6 bg-gradient-to-r from-green-900/50 to-emerald-900/50 backdrop-blur-sm border border-green-500/30 rounded-xl text-center shadow-xl">
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <h3 className="font-bold text-green-300 text-lg">
                    Document Saved Successfully
                  </h3>
                </div>
                {showSuccess && (
                  <div className="animate-fadeIn">
                    <p className="text-slate-300 mb-4">
                      🎉 Congratulations! Here's your password:
                    </p>
                    <div className="bg-slate-900/80 backdrop-blur-sm border border-yellow-500/30 rounded-xl p-4 shadow-inner">
                      <p className="text-3xl font-mono tracking-widest text-yellow-400 break-all">
                        {PASSWORD_CreateMeetingNotes}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateMeetingNotes;
