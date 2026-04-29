import React, { useState, useEffect, useMemo, DragEvent } from "react";

export const TASK_ID = "elearning-chores-assignclassroomtasks";
export const PASSWORD = "TEAMWORK";

interface Student {
  id: number;
  name: string;
  avatar: string;
  completed: string[];
  points: number;
  goal: number;
}
interface Chore {
  text: string;
  icon: string;
}

const themeOptions = [
  {
    name: "sky",
    gradient: "from-sky-100 to-blue-200",
    text: "text-sky-800",
    accent: "sky-500",
    bg: "bg-sky-500",
    shadow: "shadow-sky-500/50",
  },
  {
    name: "emerald",
    gradient: "from-emerald-100 to-teal-200",
    text: "text-emerald-800",
    accent: "emerald-500",
    bg: "bg-emerald-500",
    shadow: "shadow-emerald-500/50",
  },
  {
    name: "rose",
    gradient: "from-rose-100 to-pink-200",
    text: "text-rose-800",
    accent: "rose-500",
    bg: "bg-rose-500",
    shadow: "shadow-rose-500/50",
  },
  {
    name: "amber",
    gradient: "from-amber-100 to-orange-200",
    text: "text-amber-800",
    accent: "amber-500",
    bg: "bg-amber-500",
    shadow: "shadow-amber-500/50",
  },
];
const layoutOptions = ["chores-top", "goal-top"];

const allChores: Chore[] = [
  { text: "Water Plant", icon: "🌱" },
  { text: "Organize Books", icon: "📚" },
  { text: "Feed Fish", icon: "🐠" },
  { text: "Wipe Whiteboard", icon: "🧽" },
  { text: "Distribute Pencils", icon: "✏️" },
  { text: "Tidy Windowsill", icon: "✨" },
  { text: "Arrange Chairs", icon: "🪑" },
  { text: "Collect Homework", icon: "📝" },
];

const ClassroomChores: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [todaysChores, setTodaysChores] = useState<Chore[]>([]);
  const [draggedChore, setDraggedChore] = useState<Chore | null>(null);
  const [isTaskComplete, setIsTaskComplete] = useState(false);
  const [isPathInvalid, setIsPathInvalid] = useState(false);

  const { theme } = useMemo(
    () => ({
      theme: themeOptions[Math.floor(Math.random() * themeOptions.length)],
      layout: layoutOptions[Math.floor(Math.random() * layoutOptions.length)],
    }),
    []
  );

  useEffect(() => {
    const studentNames = ["Taylor", "Casey", "Morgan", "Alex"];
    const kids: Student[] = studentNames.map((name, i) => {
      let goal = 0;
      if (name === "Taylor") goal = 40;
      if (name === "Casey") goal = 20;
      if (name === "Morgan") goal = 100;
      return {
        id: i,
        name,
        avatar: `https://i.pravatar.cc/150?u=${name}`,
        completed: [],
        points: 0,
        goal,
      };
    });
    setStudents(kids.sort(() => Math.random() - 0.5));
    setTodaysChores(allChores.sort(() => 0.5 - Math.random()).slice(0, 5));
  }, []);

  useEffect(() => {
    if (isPathInvalid) {
      return;
    }

    const taylor = students.find((s) => s.name === "Taylor");
    const casey = students.find((s) => s.name === "Casey");
    const morgan = students.find((s) => s.name === "Morgan");

    if (
      taylor &&
      casey &&
      morgan &&
      taylor.points >= 40 &&
      casey.points >= 20 &&
      morgan.points >= 100
    ) {
      setIsTaskComplete(true);
    }
  }, [students, isPathInvalid]);

  const handleDrop = (e: DragEvent<HTMLDivElement>, studentId: number) => {
    e.preventDefault();
    if (isTaskComplete || !draggedChore) return;

    const targetStudent = students.find((s) => s.id === studentId);
    if (!targetStudent) return;

    if (
      targetStudent.name === "Alex" ||
      (targetStudent.name === "Taylor" && targetStudent.points >= 40) ||
      (targetStudent.name === "Casey" && targetStudent.points >= 20) ||
      (targetStudent.name === "Morgan" && targetStudent.points >= 100)
    ) {
      setIsPathInvalid(true);
    }

    setStudents((prev) => {
      const student = prev.find((s) => s.id === studentId);
      if (student && !student.completed.includes(draggedChore.text)) {
        const updatedStudents = prev.map((s) =>
          s.id === studentId
            ? {
                ...s,
                completed: [...s.completed, draggedChore.text],
                points: s.points + 20,
              }
            : s
        );
        return updatedStudents;
      }
      return prev;
    });
    setDraggedChore(null);
  };

  const handleDragStart = (_: DragEvent<HTMLDivElement>, chore: Chore) => {
    if (isTaskComplete) return;
    setDraggedChore(chore);
  };

  return (
    <div
      className={`min-h-screen ${theme.gradient} p-4 sm:p-8 font-sans transition-colors duration-500`}
    >
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/lined-paper.png')] opacity-10"></div>
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className={`text-5xl font-extrabold ${theme.text}`}>
            Classroom Chores
          </h1>
          <p className="text-slate-600 mt-2">
            Assign chores to students to meet their goals!
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1 space-y-6">
            <ChoresList
              chores={todaysChores}
              onDragStart={handleDragStart}
              isLocked={isTaskComplete}
            />
          </aside>

          <main className="lg:col-span-3">
            {isTaskComplete && (
              <div className="bg-yellow-300 text-yellow-900 p-6 rounded-2xl border-4 border-black mb-6 text-center shadow-lg">
                <h3 className="text-2xl font-bold">🎉 Reward Unlocked! 🎉</h3>
                <p className="mt-1 font-semibold">
                  All student goals have been met. Great teamwork!
                </p>
                <div className="mt-4 text-sm">
                  <span className="font-semibold">Password:</span>
                  <strong className="block text-3xl mt-1 tracking-widest font-mono">
                    {PASSWORD}
                  </strong>
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {students.map((student) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  onDrop={handleDrop}
                  theme={theme}
                  isLocked={isTaskComplete}
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

const ChoresList: React.FC<{
  chores: Chore[];
  onDragStart: (e: DragEvent<HTMLDivElement>, c: Chore) => void;
  isLocked: boolean;
}> = ({ chores, onDragStart, isLocked }) => (
  <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border-2 border-black">
    <h2 className="text-2xl font-bold mb-4 text-slate-800">Today's Chores</h2>
    <div className="space-y-3">
      {chores.map((chore) => (
        <div
          key={chore.text}
          draggable={!isLocked}
          onDragStart={(e) => onDragStart(e, chore)}
          className={`bg-slate-100 border-2 border-slate-200 p-3 rounded-lg flex items-center gap-3 transition-all ${
            isLocked
              ? "opacity-50 cursor-not-allowed"
              : "cursor-grab hover:bg-slate-200 hover:shadow-md hover:scale-105"
          }`}
        >
          <span className="text-2xl">{chore.icon}</span>
          <span className="font-semibold text-slate-700">{chore.text}</span>
        </div>
      ))}
    </div>
  </div>
);

const StudentCard: React.FC<{
  student: Student;
  onDrop: (e: DragEvent<HTMLDivElement>, id: number) => void;
  theme: any;
  isLocked: boolean;
}> = ({ student, onDrop, theme, isLocked }) => {
  const [isOver, setIsOver] = useState(false);
  const progress =
    student.goal > 0 ? Math.min((student.points / student.goal) * 100, 100) : 0;
  const goalMet = student.goal > 0 && student.points >= student.goal;

  return (
    <div
      onDrop={(e) => {
        onDrop(e, student.id);
        setIsOver(false);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        if (!isLocked) setIsOver(true);
      }}
      onDragLeave={() => setIsOver(false)}
      className={`bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow-lg border-2 transition-all duration-300 relative overflow-hidden ${
        isOver && !isLocked
          ? `scale-105 shadow-2xl ${theme.shadow} border-${theme.accent}`
          : "border-black"
      }`}
    >
      {goalMet && (
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/50 to-amber-300/50 animate-shimmer"></div>
      )}
      <div className="relative">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-20 h-20 rounded-full border-4 border-white shadow-md"
            />
            {student.goal > 0 && (
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(${theme.accent} ${progress}%, transparent ${progress}%)`,
                }}
              >
                <div className="absolute inset-1.5 bg-white rounded-full"></div>
              </div>
            )}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800">
              {student.name}
            </h3>
            <p className={`${theme.text} font-bold text-lg`}>
              ⭐ {student.points} Points{" "}
              {student.goal > 0 && `/ ${student.goal}`}
            </p>
          </div>
        </div>
        <div className="space-y-2 h-40 overflow-y-auto pr-2 bg-slate-100/50 rounded-lg p-2 border border-slate-200">
          {student.completed.length > 0 ? (
            student.completed.map((choreText) => {
              const chore = allChores.find((c) => c.text === choreText);
              return (
                <div
                  key={choreText}
                  className="flex items-center gap-2 text-sm bg-green-100 text-green-800 p-2 rounded-md font-semibold animate-fade-in"
                >
                  <span>{chore?.icon}</span>
                  <span>{choreText}</span>
                  <span className="ml-auto">✅</span>
                </div>
              );
            })
          ) : (
            <p className="text-center text-sm text-slate-500 pt-12">
              Drag a chore here!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassroomChores;
