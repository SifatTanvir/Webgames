// ### 1. React Component (TemporalMaze.tsx) ###
import React, { useState, useMemo } from "react";
import { useTaskAnalytics } from "../utils/useTaskAnalytics";

// --- CONFIGURATION & STATIC DATA ---
export const TASK_ID_TemporalMaze = "web-games-maze-temporal";
export const PASSWORD_TemporalMaze = "PASSWORD-web-games-maze";

// --- TYPES & DATA ---
type RoomId = "entry" | "alpha" | "beta" | "gamma" | "delta" | "escaped";

interface Room {
  id: RoomId;
  name: string;
  description: string;
  color: string;
  diagram: string[];
}

const ROOMS: Record<RoomId, Room> = {
  entry: {
    id: "entry",
    name: "Facility Entry Point",
    description:
      "The air hums. The path forward is unstable. One complete sequence is allowed before a temporal lock.",
    color: "gray",
    diagram: [
      "      +------------------+",
      "      |     ENTRANCE     |",
      "----> |                  | ---->",
      "      |    AWAITING      |",
      "      +------------------+",
    ],
  },
  alpha: {
    id: "alpha",
    name: "Node Alpha",
    description:
      "Primary observation chamber. Energy readings are stable but show signs of recent temporal stress.",
    color: "blue",
    diagram: [
      "          /-----\\      ",
      "         /   A   \\     ",
      "        /         \\    ",
      "      -[  PRIMARY  ]-   ",
      "        \\         /    ",
      "         \\-------/     ",
    ],
  },
  beta: {
    id: "beta",
    name: "Node Beta",
    description:
      "Secondary containment field. A low, rhythmic pulse resonates from the core.",
    color: "green",
    diagram: [
      "    +-------------------+",
      "    |  ((( NODE B )))   |",
      "    |   CONTAINMENT     |",
      "    +-------------------+",
    ],
  },
  gamma: {
    id: "gamma",
    name: "Node Gamma",
    description:
      "Energy conduit nexus. The ambient temperature is significantly higher here.",
    color: "yellow",
    diagram: [
      "        ~   ~   ~      ",
      "      <--[ GAMMA ]-->   ",
      "    (     ENERGY      )  ",
      "      <--[ CONDUIT]-->   ",
    ],
  },
  delta: {
    id: "delta",
    name: "Node Delta",
    description:
      "Temporal synchronization hub. The exit protocol can only be initiated from this node.",
    color: "purple",
    diagram: [
      "             ^         ",
      "            / \\        ",
      "           / D \\       ",
      "          /_____\\      ",
      "      [ SYNCHRONIZE ]    ",
    ],
  },
  escaped: {
    id: "escaped",
    name: "Loop Broken",
    description:
      "The temporal field has stabilized. You have successfully broken the loop.",
    color: "white",
    diagram: [
      "==========================",
      "     CONNECTION STABLE    ",
      "        PATH OPENED       ",
      "==========================",
    ],
  },
};

// --- DATA FOR RANDOMIZATION ---
const DYNAMIC_NODES: RoomId[] = ["alpha", "beta", "gamma", "delta"];
const LOG_IDS = ["7B", "3F", "5A", "9C"];
// These templates MUST stay in order to tell a logical story.
const CLUE_TEMPLATES = [
  "The first step in stabilizing the loop is to visit the primary chamber, **{NODE_NAME}**.",
  "After the initial incursion, route power through the main energy nexus at **{NODE_NAME}**.",
  "The resulting energy echo must be contained. Proceed to the secondary field at **{NODE_NAME}**.",
  "Final synchronization is only possible from **{NODE_NAME}**. It's the only way out.",
];

// --- SVG ICONS ---
const AlertIcon = () => (
  <svg
    className="h-5 w-5 mr-2 animate-pulse"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-8a1 1 0 011-1h.008a1 1 0 110 2H10a1 1 0 01-1-1z"
      clipRule="evenodd"
    />
  </svg>
);

const ClockIcon = () => (
  <svg
    className="h-6 w-6 mr-3 text-cyan-400"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

// --- MAIN COMPONENT ---
const TemporalMaze: React.FC = () => {
  const { recordSuccess } = useTaskAnalytics(TASK_ID_TemporalMaze);

  const { solutionSequence, clues } = useMemo(() => {
    // 1. Create the random solution sequence by shuffling the available nodes.
    const newSolutionSequence = [...DYNAMIC_NODES].sort(
      () => Math.random() - 0.5,
    );

    // 2. Shuffle log IDs for flavor. This is safe to randomize.
    const randomizedLogIds = [...LOG_IDS].sort(() => Math.random() - 0.5);

    // 3. Create clues by pairing the *ordered* solution sequence with the *ordered* clue templates.
    // This ensures the logic of the clues (e.g., "first step") matches the solution order.
    const newClues = newSolutionSequence.map((nodeId, index) => {
      const nodeName = ROOMS[nodeId].name;
      // Use the template from the same index, ensuring "first step" maps to the first item, etc.
      const populatedClueText = CLUE_TEMPLATES[index].replace(
        "{NODE_NAME}",
        nodeName,
      );

      return {
        text: `Log ${randomizedLogIds[index]}: ${populatedClueText}`,
      };
    });

    return { solutionSequence: newSolutionSequence, clues: newClues };
  }, []);

  const [currentRoomId, setCurrentRoomId] = useState<RoomId>("entry");
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [isAttemptComplete, setIsAttemptComplete] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Final shuffle for display so the user doesn't get the clues in order.
  const shuffledClues = useMemo(
    () => [...clues].sort(() => Math.random() - 0.5),
    [clues],
  );
  const time = moveHistory.length;

  const handleNavigation = (destinationId: RoomId) => {
    if (isAttemptComplete) return;

    const newHistory = [...moveHistory, destinationId];
    setMoveHistory(newHistory);
    setCurrentRoomId(destinationId);

    if (newHistory.length === solutionSequence.length) {
      setIsAttemptComplete(true);
      const isCorrect =
        JSON.stringify(newHistory) === JSON.stringify(solutionSequence);

      if (isCorrect) {
        recordSuccess();
        setShowSuccess(true);
        setTimeout(() => setCurrentRoomId("escaped"), 500);
      }
    }
  };

  const currentRoom = ROOMS[currentRoomId];

  return (
    <div className="bg-slate-900 min-h-screen text-slate-300 font-mono flex flex-col">
      <header className="bg-black/30 backdrop-blur-md border-b border-slate-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold text-white">
              AETHELBURG FACILITY
            </h1>
            {currentRoomId !== "escaped" && !isAttemptComplete && (
              <div className="flex items-center bg-yellow-500/20 text-red-300 px-3 py-1 rounded-full text-sm">
                <AlertIcon />
                STATUS: TEMPORAL ANOMALY DETECTED
              </div>
            )}
            {currentRoomId === "escaped" && (
              <div className="flex items-center bg-yellow-500/20 text-red-300 px-3 py-1 rounded-full text-sm">
                STATUS: ACTION RECORDED
              </div>
            )}
            {isAttemptComplete && !showSuccess && (
              <div className="flex items-center bg-yellow-500/20 text-red-300 px-3 py-1 rounded-full text-sm">
                STATUS: ACTION RECORDED
              </div>
            )}
          </div>
        </div>
      </header>

      {showSuccess && (
        <div className="bg-green-600 text-white text-center p-4 shadow-lg animate-fade-in-down">
          <p className="mt-2 text-md">Secret Password:</p>
          <div className="mt-2 text-3xl font-mono bg-slate-800 inline-block px-6 py-2 rounded-lg tracking-widest">
            {PASSWORD_TemporalMaze}
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 w-full flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <section
              id="viewscreen"
              className="bg-slate-800/50 p-6 rounded-lg border border-slate-700"
            >
              <h2 className="text-cyan-400 text-lg mb-2">
                VIEWSCREEN: {currentRoom.name}
              </h2>
              <div className="bg-black rounded-md p-4 flex items-center justify-center h-48">
                <pre className="text-cyan-300 text-sm leading-relaxed text-center">
                  {currentRoom.diagram.join("\n")}
                </pre>
              </div>
              <p className="mt-4 text-slate-400">{currentRoom.description}</p>
            </section>

            <section
              id="clues"
              className="bg-slate-800/50 p-6 rounded-lg border border-slate-700"
            >
              <h2 className="text-cyan-400 text-lg mb-4">
                RECOVERED AUDITORY LOGS
              </h2>
              <div className="space-y-3">
                {shuffledClues.map((clue, index) => (
                  <p
                    key={index}
                    className="text-sm text-slate-400 bg-slate-800 p-2 rounded"
                    dangerouslySetInnerHTML={{
                      __html: `<span class="text-yellow-500">> ${clue.text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-yellow-400 font-bold">$1</strong>')}`,
                    }}
                  />
                ))}
              </div>
            </section>

            <section
              id="alert-system"
              className="bg-red-900/40 p-6 rounded-lg border border-red-700"
            >
              <h2 className="text-red-400 text-lg mb-2">
                FACILITY ALERT SYSTEM
              </h2>
              <p className="text-red-300">
                CRITICAL: Unstable temporal field detected. Cascade failure
                imminent. All personnel must follow stabilization protocol
                without deviation. The loop is growing stronger with every
                cycle.
              </p>
            </section>
            <section
              id="researcher-note"
              className="bg-slate-800/50 p-6 rounded-lg border border-slate-700"
            >
              <h2 className="text-cyan-400 text-lg mb-2">
                RESEARCHER'S LAST MESSAGE
              </h2>
              <p className="text-slate-400 italic">
                "If you're reading this, I didn't make it. The reset got me.
                Don't trust the silence, don't trust the echoes. The sequence is
                everything. The logs... listen to the order in the logs. It's
                the only way out before the system locks you out for good. Don't
                end up like me."
              </p>
            </section>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <section
              id="clock"
              className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 text-center"
            >
              <h2 className="text-cyan-400 text-lg mb-3 flex items-center justify-center">
                <ClockIcon /> TEMPORAL CLOCK
              </h2>
              <p className="text-6xl font-bold text-white">{time}</p>
              <p className="text-slate-500">cycles in this attempt</p>
            </section>

            <section
              id="navigation"
              className="bg-slate-800/50 p-6 rounded-lg border border-slate-700"
            >
              <h2 className="text-cyan-400 text-lg mb-4">NAVIGATION CONSOLE</h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.values(ROOMS)
                  .filter((r) => r.id !== "entry" && r.id !== "escaped")
                  .map((room) => (
                    <button
                      key={room.id}
                      onClick={() => handleNavigation(room.id)}
                      disabled={isAttemptComplete}
                      className="p-4 rounded-md bg-slate-700 text-white font-semibold border-2 border-slate-600 hover:bg-cyan-500 hover:border-cyan-400 transition-all duration-200 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed disabled:border-slate-700 disabled:hover:bg-slate-800"
                    >
                      GOTO: {room.name}
                    </button>
                  ))}
              </div>
            </section>

            <section
              id="system-log"
              className="bg-slate-800/50 p-6 rounded-lg border border-slate-700"
            >
              <h2 className="text-cyan-400 text-lg mb-4">SYSTEM LOG</h2>
              <div className="bg-black p-4 rounded-md h-40 overflow-y-auto text-sm">
                {moveHistory.length === 0 && (
                  <p className="text-slate-500">Awaiting input...</p>
                )}
                {moveHistory.map((move, index) => (
                  <p key={index} className="text-green-400">
                    <span className="text-slate-500">T+{index + 1}:</span>{" "}
                    Navigated to Node{" "}
                    {move.charAt(0).toUpperCase() + move.slice(1)}.
                  </p>
                ))}
                {isAttemptComplete && (
                  <p className="text-yellow-400">
                    T+{moveHistory.length}: Sequence attempt complete. System
                    processing...
                  </p>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="bg-black/30 border-t border-slate-700 mt-auto">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-slate-500 text-xs">
          <p>
            © {new Date().getFullYear()} Aethelburg Research. All rights
            reserved. Property of the Temporal Studies Division.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TemporalMaze;
