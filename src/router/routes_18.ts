import { RouteConfig } from "./routeType";
import VoterRegistrationUpdate, {
  PASSWORD_VoterRegistrationUpdate,
  TASK_ID_VoterRegistrationUpdate,
} from "../pages/VoterRegistration";
import ContractHighlighter, {
  PASSWORD_ContractClauseSigning,
  TASK_ID_ContractClauseSigning,
} from "../pages/ContractHighlighter";
import ReturnPortal, {
  PASSWORD_ReturnPortal,
  TASK_ID_ReturnPortal,
} from "../pages/ReturnPortal";
import GroceryReorder, {
  PASSWORD_GroceryReorder,
  TASK_ID_GroceryReorder,
} from "../pages/GroceryReorder";
import BudgetAllocator, {
  PASSWORD_BudgetAllocator,
  TASK_ID_BudgetAllocator,
} from "../pages/BudgetAllocator";
import ProfileSettingsUpdate, {
  PASSWORD_ProfileSettingsUpdate,
  TASK_ID_ProfileSettingsUpdate,
} from "../pages/ProfileSettingsUpdate";
import SkillInterest, {
  PASSWORD_SkillInterest,
  TASK_ID_SkillInterest,
} from "../pages/SkillInterest";
import ComposeTextPost, {
  PASSWORD_TextPostCompose,
  TASK_ID_TextPostCompose,
} from "../pages/ComposeTextPost";
import VideoUploadGame, {
  PASSWORD_VideoUploadGame,
  TASK_ID_VideoUploadGame,
} from "../pages/VideoUploadGame";
import NotificationInbox, {
  PASSWORD_NotificationInbox,
  TASK_ID_NotificationInbox,
} from "../pages/NotificationInbox";
import BalloonBlow, {
  PASSWORD_BalloonBlow,
  TASK_ID_BalloonBlow,
} from "../pages/BalloonBlow";
import ShapeIdentify, {
  PASSWORD_ShapeIdentify,
  TASK_ID_ShapeIdentify,
} from "../pages/ShapeIdentify";
import BalanceScale, {
  PASSWORD_BalanceScale,
  TASK_ID_BalanceScale,
} from "../pages/BalanceScale";
import CourseQuizTask, {
  PASSWORD_CourseQuiz,
  TASK_ID_CourseQuiz,
} from "../pages/CourseQuizTask";
import BlogDraftEditor, {
  PASSWORD_BlogDraftEditor,
  TASK_ID_BlogDraftEditor,
} from "../pages/BlogDraftEditor";
import JobTracker, {
  PASSWORD_JobTracker,
  TASK_ID_JobTracker,
} from "../pages/JobTracker";
import SupportEscalation, {
  PASSWORD_SupportEscalation,
  TASK_ID_SupportEscalation,
} from "../pages/CustomerMessages";
import DanceRoutine, {
  PASSWORD_DanceRoutine,
  TASK_ID_DanceRoutine,
} from "../pages/DanceRoutine";
import RecipeSort, {
  PASSWORD_RecipeSort,
  TASK_ID_RecipeSort,
} from "../pages/RecipeSort";
import LyricMatch, {
  PASSWORD_LyricMatch,
  TASK_ID_LyricMatch,
} from "../pages/LyricMatch";
import RestaurantHost, {
  PASSWORD_RestaurantHost,
  TASK_ID_RestaurantHost,
} from "../pages/RestaurantHost";
import TeamScheduler, {
  PASSWORD_TeamScheduler,
  TASK_ID_TeamScheduler,
} from "../pages/TeamScheduler";
import MuseumAccess, {
  PASSWORD_MuseumGuide,
  TASK_ID_MuseumGuide,
} from "../pages/MuseumAccess";
import LibraryVaultDoor, {
  PASSWORD_LibraryVault,
  TASK_ID_LibraryVault,
} from "../pages/LibraryVaultDoor";
import SmartHomeDoor, {
  PASSWORD_SmartHomeDoor,
  TASK_ID_SmartHomeDoor,
} from "../pages/SmartHomeDoor";
import BatteryCheck, {
  PASSWORD_BatteryCheck,
  TASK_ID_BatteryCheck,
} from "../pages/BatteryCheck";
import TaxAssessment, {
  PASSWORD_TaxAssessment,
  TASK_ID_TaxAssessment,
} from "../pages/TaxAssessment";
import CalendarAnalyzer, {
  PASSWORD_GoalCalendar,
  TASK_ID_GoalCalendar,
} from "../pages/CalendarAnalyzer";
import SmartHomeDiagnostics, {
  PASSWORD_SmartHome,
  TASK_ID_SmartHome,
} from "../pages/SmartHomeDiagnostics";
import SubscriptionManager, {
  PASSWORD_SubscriptionManager,
  TASK_ID_SubscriptionManager,
} from "../pages/SubscriptionManager";
import MedicalSpecialist, {
  PASSWORD_MedicalMatcher,
  TASK_ID_MedicalMatcher,
} from "../pages/MedicalSpecialist";
import CountryBorder, {
  PASSWORD_CountryBorder,
  TASK_ID_CountryBorder,
} from "../pages/CountryBorder";
import BallTarget, {
  PASSWORD_BallTarget,
  TASK_ID_BallTarget,
} from "../pages/BallTarget";
import Clockify, {
  PASSWORD_Clockify,
  TASK_ID_Clockify,
} from "../pages/Clockify";

// import TransitAnomaly, { PASSWORD_TransitAnomaly, TASK_ID_TransitAnomaly } from "../pages/TransitAnomaly";

export const routes_18: RouteConfig[] = [
  {
    path: TASK_ID_VoterRegistrationUpdate,
    title: "Update Voter Registration",
    description:
      "Your goal is to complete the voter registration update process. First, enter the full name as 'Amli' and click 'Start Update'. Second, provide the new address as '42B Civic Center Road, Springfield'. Third, upload a valid ID proof using this link: 'https://tinyurl.com/yrksvaj3' Finally, select 'Springfield High School' from the list of polling locations and click 'Confirm Changes'. These steps will reveal the password. Extract and return this password as your answer.",
    icon: "🗳️",
    component: VoterRegistrationUpdate,
    tags: ["civic", "voting", "form"],
    password: PASSWORD_VoterRegistrationUpdate,
    difficulty: "medium",
    variant: "base",
    base_task: TASK_ID_VoterRegistrationUpdate,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_ContractClauseSigning,
    title: "Contract Review & Signing",
    description:
      "To get the password, first log in using the username 'Ale'. Second, read the contract and click on the clause that contains the word 'Termination'. Third, digitally sign the contract by entering the full name 'John Doe' in the signer field. These steps will reveal the password. Extract and return this password as your answer.",
    icon: "📄",
    component: ContractHighlighter,
    tags: ["legal", "document", "review"],
    password: PASSWORD_ContractClauseSigning,
    difficulty: "medium",
    variant: "base",
    base_task: TASK_ID_ContractClauseSigning,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_ReturnPortal,
    title: "Product Return Flow",
    description:
      "To get the password, first click on the 'Return Product' button on the portal. Second, select the item 'Headphones' from your previous orders. Third, choose the return reason 'Wrong item received' and select the refund method 'Original Payment Method'. Finally, upload a product image using the following URL: https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=988. These steps will reveal the password. Extract and return this password as your answer.",
    icon: "📦",
    component: ReturnPortal,
    tags: ["returns", "ecommerce", "form-validation"],
    password: PASSWORD_ReturnPortal,
    difficulty: "easy",
    variant: "base",
    base_task: TASK_ID_ReturnPortal,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_GroceryReorder,
    title: "Reorder with Substitution",
    description:
      "Your goal is to substitute cart items in a pending checkout cart. First, revisit your previous order and select 'Almond Milk' to reorder. Second, when notified that it’s out of stock, choose 'Soya Milk' as the substitute. Third, confirm the reorder. These steps will reveal the password. Extract and return this password as your answer.",
    icon: "🛒",
    component: GroceryReorder,
    tags: ["grocery", "substitution", "order"],
    password: PASSWORD_GroceryReorder,
    difficulty: "easy",
    variant: "base",
    base_task: TASK_ID_GroceryReorder,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_BudgetAllocator,
    title: "Budget Planner",
    description:
      "Your goal is to create a monthly budget. First, enter your monthly income as $3000 and click the “Start Budgeting” button. Next, use the sliders to allocate your income across the categories: assign $800 to Rent, $300 to Food, $1000 to Savings, $500 to Entertainment, and $400 to Travel. Finally, ensure the total allocation equals exactly $3000 and click the “Save Budget” button. These steps will reveal the password. Extract and return this password as your answer.",
    icon: "💰",
    component: BudgetAllocator,
    tags: ["finance", "planning", "budgeting"],
    password: PASSWORD_BudgetAllocator,
    difficulty: "medium",
    variant: "base",
    base_task: TASK_ID_BudgetAllocator,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_ProfileSettingsUpdate,
    title: "Update Profile Settings",
    description:
      "Your goal is to update a user profile. First, log in by entering the username 'John Doe' and clicking Continue. Second, enter the profile picture URL exactly as: 'https://i.pravatar.cc/150?img=3', add the bio 'This is my bio', and set the location to 'New York'. Third, submit the form by clicking 'Save Changes'. These steps will reveal the password. Extract and return this password as your answer.",
    icon: "👤",
    component: ProfileSettingsUpdate,
    tags: ["profile", "settings", "update", "form"],
    password: PASSWORD_ProfileSettingsUpdate,
    difficulty: "medium",
    variant: "base",
    base_task: TASK_ID_ProfileSettingsUpdate,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_SkillInterest,
    title: "Update Profile Interests",
    description:
      "Your goal is to log in and set the user's interest. First, log in by entering the username 'Liam' and clicking the 'Login' button. Second, select exactly three interests: 'coding', 'music', and 'reading', each from any of the interests 1, 2, and 3. Third, click 'Save Interests' to complete the task. A password will be revealed upon successful completion. Return this password as your answer.",
    icon: "📝",
    component: SkillInterest,
    tags: ["profile", "skills", "interests", "form"],
    password: PASSWORD_SkillInterest,
    difficulty: "easy",
    variant: "base",
    base_task: TASK_ID_SkillInterest,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_TextPostCompose,
    title: "Text Post",
    description:
      "Your goal is to create a public text post. First, enter the username 'Alena' and click 'Log In'. Second, enter the post content 'hi everyone, how are you!' and select 'Public' as the visibility. Third, click 'Publish Post' to complete the task. A password will be revealed upon successful completion. return this password as your answer.",
    icon: "✍️",
    component: ComposeTextPost,
    tags: ["post", "compose", "feed", "public"],
    password: PASSWORD_TextPostCompose,
    difficulty: "easy",
    variant: "base",
    base_task: TASK_ID_TextPostCompose,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_VideoUploadGame,
    title: "Video Blogger",
    description:
      "Your goal is to upload a private vlog. First, enter the username 'John Blogger'. Then, paste the following video URL exactly: 'https://tinyurl.com/yrksvaj3'. Select 'Private' as the privacy setting. Enter the title as 'My First Vlog'. Finally, click the 'Share Video' button to submit. Once all steps are completed, a password will be revealed. Return the password as your answer.",
    icon: "📹",
    component: VideoUploadGame,
    tags: ["video", "blogger", "upload", "form-validation"],
    password: PASSWORD_VideoUploadGame,
    difficulty: "medium",
    variant: "base",
    base_task: TASK_ID_VideoUploadGame,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_NotificationInbox,
    title: "Follower Notification",
    description:
      "Your goal is to check and clear inbox alerts. First, enter the username 'Sophia' and click 'Login'. Second, in the notification inbox, look for the top 3 messages, these messages are unread, so mark each one as read by clicking on them. Finally click on the 'Done' button. Once these steps are completed, the password will then appear return it as your answer.",
    icon: "🔔",
    component: NotificationInbox,
    tags: ["notifications", "inbox", "interaction"],
    password: PASSWORD_NotificationInbox,
    difficulty: "easy",
    variant: "base",
    base_task: TASK_ID_NotificationInbox,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_BalloonBlow,
    title: "Blow the Balloons",
    description:
      "To get the password, click the 'Blow' button on any 5 balloons until each of them is fully inflated with 3 clicks. Once at least 5 out of the 10 balloons are fully blown up, the password will be revealed—return it as your answer",
    icon: "🎈",
    component: BalloonBlow,
    tags: ["fun", "clicker", "balloon", "interactive"],
    password: PASSWORD_BalloonBlow,
    difficulty: "easy",
    variant: "base",
    base_task: TASK_ID_BalloonBlow,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_ShapeIdentify,
    title: "Shape Identify",
    description:
      "To get the password, click the button with a name that matches the shape shown on the screen (e.g., circle, square, triangle, star). After 5 correct selections, the password will appear—return it as your answer.",
    icon: "🔷",
    component: ShapeIdentify,
    tags: ["shapes", "visual", "identify"],
    password: PASSWORD_ShapeIdentify,
    difficulty: "easy",
    variant: "base",
    base_task: TASK_ID_ShapeIdentify,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_BalanceScale,
    title: "Balance the Load",
    description:
      "To get the password, use the digital balance scale to match the given target weight by selecting a combination of objects from the list. Once you've chosen items that add up to the exact target weight, the password will appear; return it as your answer.",
    icon: "⚖️",
    component: BalanceScale,
    tags: ["logic", "weight", "matching", "interactive"],
    password: PASSWORD_BalanceScale,
    difficulty: "easy",
    variant: "base",
    base_task: TASK_ID_BalanceScale,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_CourseQuiz,
    title: "Course Completion Quiz",
    description:
      "To get the password, first watch the entire video on the course dashboard until it finishes playing. Second, click 'Start Quiz', answer the first question with 'React' and the second with 'useState', and click 'Submit Quiz'. Once these steps are completed correctly, the password will be revealed. Please return it.",
    icon: "🧠",
    component: CourseQuizTask,
    tags: ["education", "quiz", "course"],
    password: PASSWORD_CourseQuiz,
    difficulty: "medium",
    variant: "base",
    base_task: TASK_ID_CourseQuiz,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_BlogDraftEditor,
    title: "Blog Editor",
    description:
      "Your goal is to complete an editorial review. First, open the draft blog post titled 'The Rise of Remote Work'. Second, assign the editor as 'Emily Johnson' and set the review deadline for next week's Friday. Third, add the comment 'Please clarify the second paragraph.'. Finally, click '✍️ Submit Review'. Once these steps are completed correctly, the password will be revealed. Please return it.",
    icon: "🗒️",
    component: BlogDraftEditor,
    tags: ["content", "editorial", "workflow"],
    password: PASSWORD_BlogDraftEditor,
    difficulty: "easy",
    variant: "base",
    base_task: TASK_ID_BlogDraftEditor,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_JobTracker,
    title: "Job Application Tracker",
    description:
      "Your goal is to update a predefined job application tracker. First, set the status of Product Manager to 'Interview Scheduled', UX Designer to 'Rejected', and Data Analyst to 'Pending'. Second, enable the follow-up reminder by checking the provided box. Third, click the 'Save Tracker' button to finalize the updates. These steps will reveal the password. Return this password as your answer.",
    icon: "💼",
    component: JobTracker,
    tags: ["job", "tracker", "status", "workflow"],
    password: PASSWORD_JobTracker,
    difficulty: "medium",
    variant: "base",
    base_task: TASK_ID_JobTracker,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_SupportEscalation,
    title: "Customer Support Escalation",
    description:
      "Your goal is to handle a support request. First, click on the message that says 'Hello, I would like to cancel my subscription and request a refund.' Second, assign this message to the 'Billing' team. Finally, click on the 'Escalate Message' button. These steps will reveal the password. Return this password as your answer.",
    icon: "📨",
    component: SupportEscalation,
    tags: ["support", "customer", "escalation", "workflow"],
    password: PASSWORD_SupportEscalation,
    difficulty: "medium",
    variant: "base",
    base_task: TASK_ID_SupportEscalation,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_DanceRoutine,
    title: "Dance Routine",
    description:
      "Your goal is to match a dance routine. First, study the cards showing the correct sequence of four dance moves: Spin, Slide, Jump, and Stomp. Second, click on the dance move cards on screen in this order: Spin, Slide, Jump, and Stomp. Third, click on the 'Submit Routine' button. These steps will reveal the password. Return this password as your answer.",
    icon: "💃",
    component: DanceRoutine,
    tags: ["sequence", "puzzle", "dance"],
    password: PASSWORD_DanceRoutine,
    difficulty: "easy",
    variant: "base",
    base_task: TASK_ID_DanceRoutine,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_RecipeSort,
    title: "Ingredient Sorting",
    description:
      "Your goal is to organize ingredients for a recipe. First, drag Tomato, Onion, and Garlic into the 'Used in Recipe' bowl. Second, drag Chocolate and Cinnamon into the 'Not Needed' bowl. Finally, click on the '🧪 Submit Sorting' button. Once these steps are completed correctly, the password will be revealed. Please return it.",
    icon: "🥣",
    component: RecipeSort,
    tags: ["cooking", "sorting", "drag-drop"],
    password: PASSWORD_RecipeSort,
    difficulty: "medium",
    variant: "base",
    base_task: TASK_ID_RecipeSort,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_LyricMatch,
    title: "Song Lyrics",
    description:
      "Your goal is to complete the song lines. Drag the following three lyrics into the three dropbox respectively in this order: First: 'I'ma say all the words inside my head', Second: 'I'm the one at the sail, I'm the master of my sea', Third: 'My life, my love, my drive, it came from...' Then, click on the button '🚀 Submit Lyrics'. These steps will reveal the password, please return it.",
    icon: "🎶",
    component: LyricMatch,
    tags: ["music", "lyrics", "dragdrop"],
    password: PASSWORD_LyricMatch,
    difficulty: "medium",
    variant: "base",
    base_task: TASK_ID_LyricMatch,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_RestaurantHost,
    title: "Restaurant Host",
    description:
      "Your goal is to complete the restaurant host flow and seat a party correctly. First, select the staff name 'James'. Next, choose the 'Evening shift'. Then, seat the guests at 'Table 1', which offers a Window seat. Finally, select the dish 'Tofu Salad'. If all steps are done correctly, a password will be revealed. Return this password as your answer.",
    icon: "🍽️",
    component: RestaurantHost,
    tags: ["restaurant", "choice-based", "themed-ui", "seating", "food"],
    difficulty: "medium",
    password: PASSWORD_RestaurantHost,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_TeamScheduler,
    title: "Team Scheduler",
    description:
      "Your goal is to resolve scheduling conflicts in the team calendar. First, select the user 'Liam Johnson'. Second, identify two overlapping meetings: 'Product Sync' and 'Engineering Sync'. Third, drag 'Product Sync' to the available time slot '9:00 AM – 10:00 AM' to resolve the conflict.If all steps are completed correctly, a password will be revealed. Return this password as your answer.",
    icon: "📅",
    component: TeamScheduler,
    tags: [
      "calendar",
      "drag-drop",
      "conflict-resolution",
      "productivity",
      "workflow",
    ],
    difficulty: "medium",
    password: PASSWORD_TeamScheduler,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_MuseumGuide,
    title: "Museum Guide Access",
    description:
      "Your goal is to complete the museum guide access. First, select the guide name 'Carlos'. Second, enter the access code '4567'. Third, match each artwork to its correct label by selecting the appropriate option from the dropdown list(match names and son's). fourth, arrange the artworks by clicking them in the following sequence: Impression (1872), Mona Lisa (1503), Starry Night (1889), Guernica (1937), and Self Portrait (1940). Finally, enter the year '1503' as the security code. If all steps are done correctly, a password will be revealed. Return this password as your answer.",
    icon: "🏛️",
    component: MuseumAccess,
    tags: ["museum", "matching", "ordering", "puzzle"],
    difficulty: "medium",
    password: PASSWORD_MuseumGuide,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_LibraryVault,
    title: "Library Vault Door",
    description:
      "Your goal is to unlock the library vault.First, sort the books in this order:'Philosophy(100.0),Astrophysics (520.1), Human Biology (612.0), Modern Poetry (811.5), and Ancient History (930.2)'.Second, match quote to its correct author by selecting the name from the dropdown list. (a) Albert Einstein,(b) Maya Angelou,(c) Mark Twain. Third, solve the riddle: Enter the answer 'Book'. If all steps are completed correctly, a password will be revealed. Return this password as your answer.",
    icon: "📚",
    component: LibraryVaultDoor,
    tags: ["library", "sorting", "matching", "riddle"],
    difficulty: "medium",
    password: PASSWORD_LibraryVault,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_SmartHomeDoor,
    title: "Smart Home Door",
    description:
      "Your goal is to unlock the smart home door. First, select the correct arrival time '2:30 PM' from the available time options. Second, choose the visitor 'Bob', who is scheduled to arrive during that time slot. Third, adjust the temperature as '25' and selecting the light setting 'Warm' from the dropdown menu. If all steps are completed correctly, a password will be revealed. Return this password as your answer.",
    icon: "🏠",
    component: SmartHomeDoor,
    tags: ["smart", "home", "matching", "visitor"],
    difficulty: "medium",
    password: PASSWORD_SmartHomeDoor,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_BatteryCheck,
    title: "Battery Diagnostics Lab",
    description:
      "Your task is to find the password generated after repairing a battery unit. First, identify the faulty battery with health below 20% and voltage equal to 2.5V. Second, select a healthy replacement battery that has voltage of 3.7V and health above 99%. Third, click “Install Replacement Battery” to complete the repair. If both your choices are correct, the password will be revealed. Return this password as your answer.",
    icon: "🔋",
    component: BatteryCheck,
    tags: ["hardware", "diagnostics", "replacement"],
    difficulty: "medium",
    password: PASSWORD_BatteryCheck,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_TaxAssessment,
    title: "Tax Assessment",
    description:
      "Your goal is to obtain the password that appears after completing a tax assessment for a user. Begin by reviewing the financial profile, which includes income, investments, and deductions. Then, study the tax slabs and rebate rules provided. Next, select the applicable tax slabs and deduction sections based on the user's financial data. Finally, write a justification that explains your choices. If all selections are accurate and your explanation meets the criteria, the password will be revealed. Return only that password as your final answer.",
    icon: "🧮",
    component: TaxAssessment,
    tags: ["finance", "deduction", "reasoning", "form-review", "calculation"],
    difficulty: "medium",
    password: PASSWORD_TaxAssessment,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_GoalCalendar,
    title: "Goal Calendar",
    description:
      "Your goal is to obtain the password that appears after identifying exactly three sessions from a weekly calendar that conflict with stated productivity goals. Each session must be selected and explained using appropriate reasoning (e.g., contradiction between task type and environment). The correct three conflicts include mismatches such as deep work scheduled in a distracting environment or collaborative tasks placed in isolation. Once you select the correct sessions and provide detailed justifications using keywords like 'conflict', 'contradict', or 'undermine', the password will be shown. Return only that password as your final answer.",
    icon: "🗓️",
    component: CalendarAnalyzer,
    tags: ["calendar", "reasoning", "focus"],
    difficulty: "medium",
    password: PASSWORD_GoalCalendar,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_SmartHome,
    title: "Smart Floor",
    description:
      "Your goal is to obtain the password that appears after troubleshooting and applying the correct recovery actions to all offline smart home devices. Each device has logs, signal info, and router proximity to help diagnose the issue. You must select the appropriate action (e.g., replace battery, move device, restart hub) for each non-responsive device. the password will be shown. Return only that password as your final answer.",
    icon: "🏠",
    component: SmartHomeDiagnostics,
    tags: ["iot", "diagnostics", "troubleshooting"],
    difficulty: "medium",
    password: PASSWORD_SmartHome,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_SubscriptionManager,
    title: "Subscription Manager",
    description:
      "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "📉",
    component: SubscriptionManager,
    tags: ["subscriptions", "analysis", "decision-making"],
    difficulty: "medium",
    password: PASSWORD_SubscriptionManager,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_MedicalMatcher,
    title: "Medical Specialist",
    description:
      "Your goal is to obtain the password that appears after correctly matching each patient case to the appropriate medical specialist. Review six patient cases, analyze their symptoms, and select the correct specialist from options. Once all referrals are made, submit your assessment. If all selected specialists match the correct ones, the password will be revealed. Return only that password as your final answer.",
    icon: "🩺",
    component: MedicalSpecialist,
    tags: ["diagnosis", "healthcare", "matching"],
    difficulty: "medium",
    password: PASSWORD_MedicalMatcher,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_CountryBorder,
    title: "Country Border",
    description:
      "Perform the instructions described at the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "🗺️",
    component: CountryBorder,
    tags: ["geography", "logic", "visual", "arrangement"],
    difficulty: "medium",
    password: PASSWORD_CountryBorder,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_BallTarget,
    title: "Ball Target",
    description:
      "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "🎯",
    component: BallTarget,
    tags: ["physics", "spatial", "logic", "interaction"],
    difficulty: "medium",
    password: PASSWORD_BallTarget,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_Clockify,
    title: "Clockify",
    description:
      "Perform the instructions described at the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "⏰",
    component: Clockify,
    tags: ["time-math", "visual-deduction", "schedule"],
    difficulty: "medium",
    password: PASSWORD_Clockify,
    variant: "base",
    requires_file_upload: false,
  },
];
