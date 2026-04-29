import React, { useState, useEffect, useMemo } from "react";

export const TASK_ID = "productivity-routine-eveningwinddown";
export const PASSWORD = "SERENITY";

const initialTaskOptions = [
  "Drink a glass of water", "Stretch lightly", "Write a journal entry",
  "Tidy up your desk", "Turn off notifications", "Review your calendar",
];
const REQUIRED_TASKS = [
  "Read for 20 minutes", "Prepare for tomorrow", "Meditate for 5 minutes",
];

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

type IconProps = React.SVGProps<SVGSVGElement>;

const PlusIcon = (props: IconProps) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>;
const TrashIcon = (props: IconProps) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const ClockIcon = (props: IconProps) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const PencilIcon = (props: IconProps) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>;
const CheckIcon = (props: IconProps) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>;
const ListIcon = (props: IconProps) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}><path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>;

type Task = { id: string; label: string; done: boolean; custom?: boolean };
type SavedRoutine = { id: string; name: string; time: string; tasks: Task[] };
type Notification = { id: string; message: string; type: 'success' | 'error' };

const EveningRoutineSetup: React.FC = () => {
  const [routineName, setRoutineName] = useState("Evening Wind-Down");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [customTask, setCustomTask] = useState("");
  const [time, setTime] = useState("22:00");
  const [savedRoutines, setSavedRoutines] = useState<SavedRoutine[]>([]);
  const [activeTab, setActiveTab] = useState<"setup" | "saved">("setup");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [editingRoutineId, setEditingRoutineId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [passwordRevealed, setPasswordRevealed] = useState(false);
  const [actionLog, setActionLog] = useState<string[]>([]);

  const uncompletedTasksCount = useMemo(() => tasks.filter(t => !t.done).length, [tasks]);

  const getRandomTasks = () => [...initialTaskOptions].sort(() => 0.5 - Math.random()).slice(0, 3).map(label => ({ id: generateId(), label, done: false }));

  useEffect(() => {
    setTasks(getRandomTasks());
  }, []);

  const addNotification = (message: string, type: 'success' | 'error') => {
    const newNotif = { id: generateId(), message, type };
    setNotifications(prev => [newNotif, ...prev]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== newNotif.id)), 4000);
  };

  const handleRoutineNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActionLog(prev => [...prev, 'ACTION_CHANGE_NAME']);
    setRoutineName(e.target.value);
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActionLog(prev => [...prev, 'ACTION_CHANGE_TIME']);
    setTime(e.target.value);
  }

  const handleTabChange = (tab: 'setup' | 'saved') => {
    if (tab === 'saved' && !passwordRevealed) {
      setActionLog(prev => [...prev, 'ACTION_SWITCH_TAB']);
    }
    setActiveTab(tab);
  }

  const handleAddTask = () => {
    if (passwordRevealed) return;
    const trimmedTask = customTask.trim();
    if (trimmedTask) {
      if (REQUIRED_TASKS.includes(trimmedTask)) {
        setActionLog(prev => [...prev, `ADD_REQUIRED:${trimmedTask}`]);
      } else {
        setActionLog(prev => [...prev, 'ACTION_ADD_INVALID_TASK']);
      }
      setTasks([...tasks, { id: generateId(), label: trimmedTask, done: false, custom: true }]);
      addNotification('Task added!', 'success');
      setCustomTask("");
    }
  };

  const handleRemoveTask = (id: string) => {
    if (passwordRevealed) return;
    setActionLog(prev => [...prev, 'ACTION_REMOVE_TASK']);
    setTasks(tasks.filter(task => task.id !== id));
  }
  const toggleTaskDone = (id: string) => {
    if (passwordRevealed) return;
    setActionLog(prev => [...prev, 'ACTION_TOGGLE_TASK']);
    setTasks(tasks.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const handleConfirm = () => {
    if (passwordRevealed) return;

    // --- Secret Check for the "Golden Path" ---
    const wasGoldenPathFollowed = () => {
      // 1. Check if any invalidating action was ever taken.
      const hasInvalidAction = actionLog.some(action => action.startsWith('ACTION_'));
      if (hasInvalidAction) return false;
      
      // 2. Check if the set of logged "add" actions matches the required tasks exactly.
      const addedTasksFromLog = new Set(actionLog.map(action => action.substring('ADD_REQUIRED:'.length)));
      if (addedTasksFromLog.size !== REQUIRED_TASKS.length) return false;
      
      const allRequiredTasksInLog = REQUIRED_TASKS.every(task => addedTasksFromLog.has(task));
      if (!allRequiredTasksInLog) return false;

      // 3. Final check on the current state to ensure no direct manipulation occurred.
      if (routineName.trim() !== 'Evening Wind-Down') return false;

      return true;
    }
    const shouldRevealPassword = wasGoldenPathFollowed();
    // --- End of Secret Check ---

    // --- Normal Routine Saving Logic ---
    const tasksToSave = tasks.filter(t => !t.done);
    const trimmedName = routineName.trim();

    if (tasksToSave.length === 0) {
      addNotification("Please add some tasks to your routine.", 'error');
      return;
    }

    if (savedRoutines.some(r => r.name.toLowerCase() === trimmedName.toLowerCase() && r.time === time)) {
      addNotification(`A routine named "${trimmedName}" at ${time} already exists.`, 'error');
      return;
    }

    const newRoutine: SavedRoutine = { id: generateId(), name: trimmedName, time, tasks: tasksToSave };
    setSavedRoutines(prev => [...prev, newRoutine]);
    addNotification(`Routine "${trimmedName}" saved!`, 'success');

    if (shouldRevealPassword) {
      setPasswordRevealed(true);
    }

    // Reset the form regardless of the outcome.
    setRoutineName("Evening Wind-Down");
    setTime("22:00");
    setTasks(getRandomTasks());
    setActiveTab("saved");
  };

  const handleStartEdit = (routine: SavedRoutine) => {
    setActionLog(prev => [...prev, 'ACTION_EDIT_ROUTINE']);
    if (passwordRevealed) return;
    setEditingRoutineId(routine.id);
    setEditingName(routine.name);
  };

  const handleSaveEdit = () => {
    setActionLog(prev => [...prev, 'ACTION_EDIT_ROUTINE']);
    if (passwordRevealed) return;
    if (!editingRoutineId) return;
    const trimmedEditingName = editingName.trim();
    if (!trimmedEditingName) {
      addNotification("Routine name cannot be empty.", "error");
      return;
    }
    setSavedRoutines(savedRoutines.map(r => r.id === editingRoutineId ? { ...r, name: trimmedEditingName } : r));
    addNotification("Routine name updated!", "success");
    setEditingRoutineId(null);
  };

  const inputClasses = "block w-full rounded-lg border-slate-300/70 bg-white/60 px-4 py-2.5 text-slate-800 shadow-sm transition-colors duration-300 focus:border-purple-500 focus:bg-white/80 focus:ring focus:ring-purple-500 focus:ring-opacity-50 focus:shadow-inner";

  return (
    <>
      <style>{`
        body { font-family: 'Inter', sans-serif; }
        @keyframes blob { 0% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } 100% { transform: translate(0px, 0px) scale(1); } }
        @keyframes scale-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes slide-in { from { opacity: 0; transform: translateX(100%); } to { opacity: 1; transform: translateX(0); } }
        .grid-bg { background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="rgb(226 232 240 / 0.25)"><path d="M0 .5H31.5V32"/></svg>'); }
      `}</style>

      <div className={`grid-bg relative min-h-screen overflow-hidden bg-slate-50 font-sans ${passwordRevealed ? 'pointer-events-none opacity-60' : ''}`}>
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-[blob_8s_infinite]"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-[blob_8s_infinite_2s]"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-[blob_8s_infinite_4s]"></div>

        <div className="fixed top-4 right-4 z-50 w-full max-w-xs space-y-3">
          {notifications.map(notif => (
            <div key={notif.id} className={`p-4 rounded-lg shadow-lg text-white font-semibold ${notif.type === 'success' ? 'bg-green-500' : 'bg-red-500'} animate-[slide-in_0.5s_cubic-bezier(0.25,1,0.5,1)]`}>
              {notif.message}
            </div>
          ))}
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-4xl bg-white/60 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8 border border-white/30">
            <header className="mb-8 text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                Routine Builder
              </h1>
              <p className="mt-2 text-slate-500">Design your perfect evening wind-down.</p>
            </header>

            <div className="flex justify-center space-x-2 mb-8 border-b border-slate-300/70">
              {['setup', 'saved'].map(tab => (
                <button key={tab} disabled={passwordRevealed} className={`px-6 py-2.5 text-base font-semibold capitalize transition-all duration-300 ${activeTab === tab ? 'border-b-2 border-purple-600 text-purple-700' : 'text-slate-500 hover:text-purple-600'} ${passwordRevealed ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => handleTabChange(tab as any)}>
                  {tab === 'setup' ? 'Routine Setup' : `My Routines (${savedRoutines.length})`}
                </button>
              ))}
            </div>

            {activeTab === 'setup' && (
              <div className="md:grid md:grid-cols-2 md:gap-x-8 lg:gap-x-12 space-y-8 md:space-y-0">
                <div className="space-y-8">
                  <label className="block">
                    <span className="font-semibold text-slate-700">Routine Name</span>
                    <input type="text" value={routineName} onChange={handleRoutineNameChange} className={`mt-2 ${inputClasses}`} disabled={passwordRevealed} />
                  </label>
                  <label className="block">
                    <span className="font-semibold text-slate-700">Trigger Time</span>
                    <div className="relative mt-2">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4"><ClockIcon className="h-5 w-5 text-slate-400"/></div>
                      <input type="time" value={time} onChange={handleTimeChange} className={`${inputClasses} pl-12 [color-scheme:light]`} disabled={passwordRevealed} />
                    </div>
                  </label>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-700">Tasks ({uncompletedTasksCount} remaining)</h3>
                  <div className="p-4 bg-white/50 rounded-lg border border-slate-200/80 space-y-3">
                    <ul className="space-y-2 max-h-48 overflow-y-auto pr-2">
                      {tasks.map(task => (
                        <li key={task.id} className="flex items-center group">
                          <input id={`task-${task.id}`} type="checkbox" checked={task.done} onChange={() => toggleTaskDone(task.id)} className="h-5 w-5 rounded border-slate-400 text-purple-600 focus:ring-purple-500 transition" disabled={passwordRevealed} />
                          <label htmlFor={`task-${task.id}`} className={`ml-3 flex-grow cursor-pointer ${task.done ? "line-through text-slate-400" : "text-slate-800"}`}>{task.label}</label>
                          <button onClick={() => handleRemoveTask(task.id)} disabled={passwordRevealed} className={`ml-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity ${passwordRevealed ? 'cursor-not-allowed' : ''}`}><TrashIcon className="h-5 w-5" /></button>
                        </li>
                      ))}
                    </ul>
                    <div className="flex space-x-2 pt-2 border-t border-slate-200">
                      <input type="text" value={customTask} onChange={e => setCustomTask(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAddTask()} placeholder="Add a custom task..." className="flex-grow rounded-lg border-slate-300 bg-white/70 px-3 py-2 text-slate-800 shadow-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500" disabled={passwordRevealed} />
                      <button onClick={handleAddTask} disabled={passwordRevealed} className={`flex-shrink-0 h-10 w-10 bg-gradient-to-br from-purple-500 to-indigo-500 text-white rounded-full hover:from-purple-600 hover:to-indigo-600 shadow-md transition-all transform hover:scale-105 flex items-center justify-center ${passwordRevealed ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        <PlusIcon className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 pt-4">
                  <button onClick={handleConfirm} disabled={uncompletedTasksCount === 0 || passwordRevealed} className={`w-full py-3.5 px-4 font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ${uncompletedTasksCount === 0 || passwordRevealed ? 'from-slate-400 to-slate-400 shadow-none transform-none cursor-not-allowed' : ''}`}>
                    Confirm Routine
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'saved' && (
              <div className="space-y-4">
                {savedRoutines.length === 0 ? (
                  <p className="text-slate-500 italic text-center py-12">No routines saved yet. Create one in the Setup tab!</p>
                ) : (
                  savedRoutines.map(routine => (
                    <div key={routine.id} className="p-1 rounded-lg bg-gradient-to-br from-purple-200 via-pink-200 to-yellow-100">
                      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-md">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <ListIcon className="h-5 w-5 text-purple-500" />
                            <div className="font-semibold text-slate-800">{routine.name} — {routine.time}</div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {editingRoutineId === routine.id ? (
                              <button onClick={handleSaveEdit} disabled={passwordRevealed} className={`text-green-500 hover:text-green-400 ${passwordRevealed ? 'opacity-50 cursor-not-allowed' : ''}`}><CheckIcon className="h-5 w-5" /></button>
                            ) : (
                              <button onClick={() => handleStartEdit(routine)} disabled={passwordRevealed} className={`text-slate-500 hover:text-purple-500 ${passwordRevealed ? 'opacity-50 cursor-not-allowed' : ''}`}><PencilIcon className="h-4 w-4" /></button>
                            )}
                          </div>
                        </div>
                        {editingRoutineId === routine.id && (
                          <input type="text" value={editingName} onChange={e => setEditingName(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSaveEdit()} onBlur={handleSaveEdit} autoFocus className="mt-2 w-full py-1 px-2 rounded bg-purple-100 text-slate-800 font-semibold" disabled={passwordRevealed} />
                        )}
                        <ul className="list-disc list-inside text-slate-600 mt-2 ml-8 text-sm space-y-1">
                          {routine.tasks.map((t: Task) => (<li key={t.id}>{t.label}</li>))}
                        </ul>
                      </div>
                    </div>
                  ))
                )}
                {passwordRevealed && (
                  <div className="mt-8 p-6 bg-green-100 border border-green-300 text-green-800 rounded-xl shadow-lg text-center">
                    <p className="text-xl font-bold mb-2">🎉 Routine Confirmed! 🎉</p>
                    <p className="text-lg">Your password is: <span className="font-mono text-2xl text-green-900 select-all">{PASSWORD}</span></p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EveningRoutineSetup;
