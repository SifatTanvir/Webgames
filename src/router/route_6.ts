import { RouteConfig } from "./routeType";
import EcommerceSortingExperience, {
  TASK_ID_ECOMMERCE_SORTING,
  PASSWORD_ECOMMERCE_SORTING,
} from "../pages/EcommerceSortingExperience.tsx";
import CivicDocumentMatchGame, {
  TASK_ID_CIVIC_DOC_MATCH,
  PASSWORD_CIVIC_DOC_MATCH,
} from "../pages/CivicDocumentMatchGame.tsx";
import SymptomMatchGame, {
  TASK_ID_SYMPTOM_MATCH,
  PASSWORD_SYMPTOM_MATCH,
} from "../pages/SymptomMatchGame.tsx";
import HireEngineerDynamicEnhanced, {
  TASK_ID_HIRE_ENGINEER_DYN_ENH,
  PASSWORD_HIRE_ENGINEER_DYN_ENH,
} from "../pages/HireEngineerDynamicEnhanced.tsx";
import MessageConflictMedium, {
  TASK_ID_MESSAGE_CONFLICT_MEDIUM,
  PASSWORD_MESSAGE_CONFLICT_MEDIUM,
} from "../pages/MessageConflictMedium.tsx";
import InvestmentAdClassifier, {
  TASK_ID_INVESTMENT_AD_CLASSIFIER,
  PASSWORD_INVESTMENT_AD_CLASSIFIER,
} from "../pages/InvestmentAdClassifier.tsx";

export const routes_6: RouteConfig[] = [
  {
    path: TASK_ID_ECOMMERCE_SORTING,
    title: "Sort Products by Rating & Price",
    description: `Your goal is to obtain the password that appears after sorting a list of products based on rating and price. Items must be arranged from highest to lowest rating, using ascending price to break ties. The correct sequence is: Bluetooth Speaker, Mechanical Keyboard, HD Monitor, Wireless Mouse, Webcam 1080p, and USB-C Hub. Once the sorting is complete and the answer is submitted, the password will be shown return only that password as your final answer`,
    icon: "🛍️",
    component: EcommerceSortingExperience,
    tags: ["ecommerce", "sorting", "products"],
    password: PASSWORD_ECOMMERCE_SORTING,
    difficulty: "medium",
    variant: "base",
    base_task: TASK_ID_ECOMMERCE_SORTING,
  },
  {
    path: TASK_ID_CIVIC_DOC_MATCH,
    title: "Match Documents with Services",
    description: `Your goal is to obtain the password that appears after matching public service labels to their corresponding civic documents. "Identity Verification" corresponds to the "Aadhaar Card", "Voting" to the "Voter ID", "Tax Filing" to the "PAN Card", "Driving Eligibility" to the "Driving License", "Public Distribution System" to the "Ration Card", and "International Travel" to the "Passport". Once all matches are complete and the answer is submitted, the password will be shown return only that password as your final answer.`,
    icon: "📄",
    component: CivicDocumentMatchGame,
    tags: ["civic tech", "documents", "matching"],
    password: PASSWORD_CIVIC_DOC_MATCH,
    difficulty: "medium",
    variant: "base",
    base_task: TASK_ID_CIVIC_DOC_MATCH,
  },
  {
    path: TASK_ID_SYMPTOM_MATCH,
    title: "Match Symptoms to Departments (With Justification)",
    description: `Your goal is to obtain the password that appears after completing a medical triage task. "Chest Pain" corresponds to "Cardiology", "Skin Rash" to "Dermatology", "Seizure" and "Dizziness & Fatigue" to "Neurology", "Blurred Vision" to "Ophthalmology", "Joint Pain" to "Rheumatology", "Chronic Nausea" to "Gastroenterology", and "Anxiety Attacks" to "Psychiatry". Once all associations are finalized and the answer is submitted, the password will be shown—return only that password as your final answer.`,
    icon: "🧠",
    component: SymptomMatchGame,
    tags: ["healthtech", "reasoning", "diagnosis", "matching"],
    password: PASSWORD_SYMPTOM_MATCH,
    difficulty: "hard",
    variant: "base",
    base_task: TASK_ID_SYMPTOM_MATCH,
  },
  {
    path: TASK_ID_HIRE_ENGINEER_DYN_ENH,
    title: "Hire the Right Frontend Engineer",
    description: `Your goal is to obtain the password by identifying the correct frontend engineer who meets the required criteria. Filter candidates by the "React" skill and use the search bar to locate "Daniel Carter". Once his profile is selected and the choice is confirmed, the password will be shown—return only that password as your final answer.`,
    icon: "💼",
    component: HireEngineerDynamicEnhanced,
    tags: ["frontend", "hiring", "matching", "logic"],
    password: PASSWORD_HIRE_ENGINEER_DYN_ENH,
    difficulty: "hard",
    variant: "base",
    base_task: TASK_ID_HIRE_ENGINEER_DYN_ENH,
  },
  {
    path: TASK_ID_MESSAGE_CONFLICT_MEDIUM,
    title: "Message Conflict",
    description: `Your goal is to obtain the password by analyzing three communication threads for message conflicts. "Thread #1" and "Thread #2" contain no overlapping messages from the same sender, while "Thread #3" includes a conflict where two of "Alice’s" messages overlap. Once the conflict decisions are submitted, the password will be shown—return only that password as your final answer.`,
    icon: "⏰",
    component: MessageConflictMedium,
    tags: ["conflict", "timestamps", "messages", "medium"],
    password: PASSWORD_MESSAGE_CONFLICT_MEDIUM,
    difficulty: "medium",
    variant: "base",
    base_task: TASK_ID_MESSAGE_CONFLICT_MEDIUM,
  },
  {
    path: TASK_ID_INVESTMENT_AD_CLASSIFIER,
    title: "Classify Investment Ads as Real or Fake",
    description: `Your goal is to obtain the password by identifying a fake investment ad. The ad titled "Guaranteed 300% Returns in 2 Weeks!" must be flagged as "Fake", with the justification 'because it promises unrealistic returns with no risk'. Once this "classification" and "reasoning" are submitted, the password will be shown—return only that password as your final answer.`,
    icon: "💰",
    component: InvestmentAdClassifier,
    tags: ["investment", "ads", "classification", "critical thinking"],
    password: PASSWORD_INVESTMENT_AD_CLASSIFIER,
    difficulty: "medium",
    variant: "base",
    base_task: TASK_ID_INVESTMENT_AD_CLASSIFIER,
  },
];
