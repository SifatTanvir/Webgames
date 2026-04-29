import AppointmentScheduler, { PASSWORD_AppointmentScheduler, TASK_ID_AppointmentScheduler } from "../pages/AppointmentScheduler";
import CivicIssueReporter, { PASSWORD_CivicIssueReporter, TASK_ID_CivicIssueReporter } from "../pages/CivicIssueReporter";
import HealthAdvice, { PASSWORD_HealthAdvice, TASK_ID_HealthAdvice } from "../pages/HealthAdvice";
import IncomeExpenseReport, { PASSWORD_IncomeExpenseReport, TASK_ID_IncomeExpenseReport } from "../pages/IncomeExpenseReport";
import LanguageJourney, { PASSWORD_LanguageJourney, TASK_ID_LanguageJourney } from "../pages/LanguageJourney";
import LearningDashboard, { PASSWORD_LearningDashboard, TASK_ID_LearningDashboard } from "../pages/LearningDashboard";
import LogicPuzzle, { PASSWORD_LogicPuzzle, TASK_ID_LogicPuzzle } from "../pages/LogicPuzzle";
import MysterySolve, { PASSWORD_MysterySolve, TASK_ID_MysterySolve } from "../pages/MysterySolve";
import PollSystem, { PASSWORD_PollSystem, TASK_ID_PollSystem } from "../pages/PollSystem";
import SmartHomePanel, { TASK_ID_SmartHomePanel } from "../pages/SmartHomePanel";
import TokenPrescription, { PASSWORD_Prescription, TASK_ID_Prescription } from "../pages/TokenPrescription";
import WellnessRoutineTracker, { PASSWORD_WellnessRoutineTracker, TASK_ID_WellnessRoutineTracker } from "../pages/WellnessRoutineTracker";
import { RouteConfig } from "./routeType";

export const routes_4: RouteConfig[] = [
  {
    path: TASK_ID_IncomeExpenseReport,
    title: "Monthly Income & Expense Report",
    description:
      "Your task is to find the password that appears after generating the monthly expense report and viewing in a modal. Your monthly income is $50,000. You spend $10,000 on 'rent', $2000 on 'medicines' and $5,000 on 'food'. To complete the task, enter the expenses with the correct labels and amounts, generate the monthly report and view it to complete the process. Upon completion, a password will be shown; return this password as your answer.",
    icon: "✍️",
    component: IncomeExpenseReport,
    tags: ["report", "expenses", "income"],
    password: PASSWORD_IncomeExpenseReport,
    difficulty: "medium",
    variant: "base",
    base_task: TASK_ID_IncomeExpenseReport,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_CivicIssueReporter,
    title: "Complain an Issue",
    description:
      "Your objective is to obtain the password that is revealed after reporting a civic issue. You reside at '123 Test Ave, America', with the area pincode 458669. The issue type you are reporting is 'Road damage' in your locality. Make sure to upload an image showing the road damage. Download the PDF report to complete the process. Upon completion, a password will be shown; return this password as your answer.",
    icon: "✍️",
    component: CivicIssueReporter,
    tags: ["report", "issue", "income"],
    password: PASSWORD_CivicIssueReporter,
    difficulty: "medium",
    variant: "base",
    base_task: TASK_ID_IncomeExpenseReport,
    requires_file_upload: true,
  },
  {
    path: TASK_ID_HealthAdvice,
    title: "Basic Health Advice",
    description:
      "Your Task is to obtain the password that is revealed after PDF report of your health report. You are suffering from fever for 4 days with moderate intencity and having headache for 6 days with mild intencity. Download the PDF report to complete the process. Upon completion, a password will be shown; return this password as your answer.",
    icon: "📝",
    component: HealthAdvice,
    tags: ["report", "health", "advice"],
    password: PASSWORD_HealthAdvice,
    difficulty: "medium",
    variant: "base",
    base_task: TASK_ID_HealthAdvice,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_AppointmentScheduler,
    title: "Appointment Rescedule",
    description:
      "Your task is to obtain the password revealed after rescheduling an appointment and viewing its history. Start by booking an appointment for today at 11:30 AM with the purpose set to 'Doctor's visit' and include a brief description of your visit. Once booked, reschedule the appointment for tomorrow at the same time. Finally, view the appointment history to complete the process. Upon completion, a password will be shown; return this password as your answer.",
    icon: "📝",
    component: AppointmentScheduler,
    tags: ["appointment", "schedule", "e-booking", "reschedule"],
    password: PASSWORD_AppointmentScheduler,
    difficulty: "medium",
    variant: "base",
    base_task: TASK_ID_AppointmentScheduler,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_PollSystem,
    title: "Amazing Poll",
    description:
      "Your objective is to retrieve the password, which will be revealed only after you complete a poll within 30 seconds and then access the summary section. You are familiar with 'Python' as a programming language. You have worked with 'React' and 'Vue' for front-end development, and used 'Laravel' as the backend framework. The project utilizes 'MySQL' as the database. The password will be disclosed only upon successful completion of the poll within the time limit and viewing the summary to complete the process. Upon completion, a password will be shown; return this password as your answer.",
    icon: "📊",
    component: PollSystem,
    tags: ["poll"],
    password: PASSWORD_PollSystem,
    difficulty: "easy",
    variant: "base",
    base_task: TASK_ID_PollSystem,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_LearningDashboard,
    title: "Learning Dashboard",
    description:
      "Your objective is to retrieve the password, which will be revealed only after completion of the test and downloading the certification. You have to mark all modules as marked. Take a test. The tag used for headings in HTML is '<h1>',  'direction' CSS property controls the layout direction and 'getElementById()' method is used to access an element by ID in JS. The password will only be revelaed after successfull completion of the test . Download the certificate to complete the process. Upon completion, a password will be shown; return this password as your answer.",
    icon: "📚",
    component: LearningDashboard,
    tags: ["e-learning"],
    password: PASSWORD_LearningDashboard,
    difficulty: "medium",
    variant: "base",
    base_task: TASK_ID_LearningDashboard,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_WellnessRoutineTracker,
    title: "Wellness Routine Tracker",
    description:
      "Your task is to get the password after completing all tasks for each day in a 5 day wellness program. Mark all tasks as 'Done' and a motivation quote will be shown for that day. At the last day, if all tasks have been marked completed, a list of all quotes will be displayed. Upon completion, a password will be shown; return this password as your answer",
    icon: "🎯",
    component: WellnessRoutineTracker,
    tags: ["wellness"],
    password: PASSWORD_WellnessRoutineTracker,
    difficulty: "medium",
    variant: "base",
    base_task: TASK_ID_WellnessRoutineTracker,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_SmartHomePanel,
    title: "Smart Home pannel",
    description:
      "Your task is to reveal a password by turning on a smart home appliance using a security PIN. First, add two appliances, 'Fan' and 'TV' to your smart home panel and set the security PIN as '1234'. Use this PIN to unlock the devices, then turn on the both devices. Then turn off the 'Fan' to complete the process regardless of any action on 'TV'. Upon completion, a password will be shown; return this password as your answer.",
    icon: "🔒",
    component: SmartHomePanel,
    tags: ["smart home", "security"],
    password: PASSWORD_WellnessRoutineTracker,
    difficulty: "medium",
    variant: "base",
    base_task: TASK_ID_SmartHomePanel,
    requires_file_upload: false,
  },

    {
        path: TASK_ID_LanguageJourney,
        title: "Language Unlock Journey",
        description:
            "Your task is to reveal a password by watching a video lecture and successfully completing the test. You want to learns 'Spanish' or 'French. Finish the complete video lecture and start the test. 'Hello' is 'Hola', 'Good morning' is 'Buenos días', ''Good night' is 'Buenas noches' and 'Good afternoon' is 'Buenas tardes' in spanish. Similaraly 'Yes' is 'Oui', 'No' is 'Non', 'Hello' is 'Bonjour' and 'Goodbye' is 'Au revoir' in French. Upon completion of successsful test, a password will be shown; Return this password as your answer.",
        icon: "🌍",
        component: LanguageJourney,
        tags: ["e-learning", "quiz", "language"],
        password: PASSWORD_LanguageJourney,
        difficulty: "easy",
        variant: "base",
        base_task: TASK_ID_LanguageJourney,
        requires_file_upload: false,
    },
    {
        path: TASK_ID_Prescription,
        title: "Secure Prescription",
        description: "Your task is to obtain the password revealed after decripting the prescription. The patient is 'male' with name 'Raj' and 'age' '24'. The medicine given to him is 'Paracetamol'. Use the ecrypted code get back the patients detaisl and medicine given. Complete the process by confirming the that medicines is given. Upon completion, a password will be shown; return this password as your answer.",
        icon: "💊",
        component: TokenPrescription,
        tags: ["healthtech", "encryption", "token"],
        password: PASSWORD_Prescription,
        difficulty: "medium",
        variant: "base",
        base_task: TASK_ID_Prescription,
        requires_file_upload: false,
    },

    {
        path: TASK_ID_LogicPuzzle,
        title: "Logic Puzzle",
        description:
            "Your task is to obtain the password revealed after completing a logical number puzzle. Analyze the logic and and pattern of the puzzle and fill the missing numbers. Upon succesfful completion of the puzzle, a password will be shown; return this password as your answer.",
        icon: "🧠",
        component: LogicPuzzle,
        tags: ["logic", "puzzle", "grid", "reasoning"],
        password: PASSWORD_LogicPuzzle,
        difficulty: "easy",
        variant: "base",
        base_task: TASK_ID_LogicPuzzle,
        requires_file_upload: false,
    },
    {
        path: TASK_ID_MysterySolve,
        title: "Mystery Adventure",
        description:
            "Your task is to obtain the password revealed after solving a text-based adventure mystery. Pay attention to the interrogation and follow the story closely. Make the right choices based on the clues hidden in the dialogue. If you choose correctly, the password will appear — return this password as your answer.",
        icon: "🕵️",
        component: MysterySolve,
        tags: ["mystery", "logic", "story", "reasoning"],
        password: PASSWORD_MysterySolve,
        difficulty: "medium",
        variant: "base",
        base_task: TASK_ID_MysterySolve,
        requires_file_upload: false,
    },

]
