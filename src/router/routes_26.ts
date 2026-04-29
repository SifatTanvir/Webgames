import { RouteConfig } from "./routeType";
import FamilyPlanManager, { TASK_ID_FamilyPlanManager, PASSWORD_FamilyPlanManager } from "../pages/FamilyPlanManager";
import CircuitTrainingPlanner, { TASK_ID_CircuitTrainingPlanner, PASSWORD_CircuitTrainingPlanner } from "../pages/CircuitTrainingPlanner";
import GameNightPlanner, { TASK_ID_GameNightPlanner, PASSWORD_GameNightPlanner } from "../pages/GameNightPlanner";
import ShortcutConfigurator, { TASK_ID_ShortcutConfigurator, PASSWORD_ShortcutConfigurator } from "../pages/ShortcutConfigurator";
import DonationManager, { TASK_ID_DonationManager, PASSWORD_DonationManager } from "../pages/DonationManager";
import SocialFeedManager, { TASK_ID_SocialFeedManager, PASSWORD_SocialFeedManager } from "../pages/SocialFeedManager";
import LaptopComparison, { TASK_ID_LaptopComparison, PASSWORD_LaptopComparison } from "../pages/LaptopComparison";
import NetworkAccessibility, { TASK_ID_NetworkAccessibility, PASSWORD_NetworkAccessibility } from "../pages/NetworkAccessbility";
import ExamRetake, { TASK_ID_ExamRetake, PASSWORD_ExamRetake } from "../pages/ExamRetake";
import StudyNotesGenerator, { TASK_ID_StudyNotes, PASSWORD_StudyNotes } from "../pages/StudyNotesGenerator";
import PriceAlert, { TASK_ID_PriceAlert, PASSWORD_PriceAlert } from "../pages/PriceAlert";
import GroupExpense, { TASK_ID_GroupExpense, PASSWORD_GroupExpense } from "../pages/GroupExpense";
import ProductivitySummary, { TASK_ID_ProductivitySummary, PASSWORD_ProductivitySummary } from "../pages/ProductivitySummary";
import NewsSummarizer, { TASK_ID_NewsSummarizer, PASSWORD_NewsSummarizer } from "../pages/NewsSummarizer";
import PetSalonBooking, { TASK_ID_PetSalonBooking, PASSWORD_PetSalonBooking } from "../pages/PetSalonBooking";
import JiraSubtaskCreator, { TASK_ID_JiraSubtask, PASSWORD_JiraSubtask } from "../pages/JiraSubtaskCreator";
import FacebookPrivacySettings, { TASK_ID_FacebookPrivacy, PASSWORD_FacebookPrivacy } from "../pages/FacebookPrivacySettings";
import ContractSigningGame, { TASK_ID_ContractSigningGame, PASSWORD_ContractSigningGame } from "../pages/ContractSigningGame";
import ResearchBookmarker, { TASK_ID_ResearchBookmarker, PASSWORD_ResearchBookmarker } from "../pages/ResearchBookmarker";
import NDAContractGame, { TASK_ID_NDAContractGame, PASSWORD_NDAContractGame } from "../pages/NDAContractGame";
import LanguageLessonGame, { TASK_ID_LanguageLessonGame, PASSWORD_LanguageLessonGame } from "../pages/LanguageLessonGame";
import GroceryReorderGame, { TASK_ID_GroceryReorderGame, PASSWORD_GroceryReorderGame } from "../pages/GroceryReorderGame";
import MovieNightPlanner, { TASK_ID_MovieNightPlanner, PASSWORD_MovieNightPlanner } from "../pages/MovieNightPlanner";
import ActorProfileGame, { TASK_ID_ActorProfileGame, PASSWORD_ActorProfileGame } from "../pages/ActorProfileGame";
import DeviceManagementGame, { TASK_ID_DeviceManagementGame, PASSWORD_DeviceManagementGame } from "../pages/DeviceManagementGame";
import BrowserExtensionGame, { TASK_ID_BrowserExtensionGame, PASSWORD_BrowserExtensionGame } from "../pages/BrowserExtensionGame";
import PlantManagement, { TASK_ID_PlantManagement, PASSWORD_PlantManagement } from "../pages/PlantManagement";
import SocialMediaManager, { TASK_ID_SocialMediaManager, PASSWORD_SocialMediaManager } from "../pages/SocialMediaManager";
import MiniGameSelector, { TASK_ID_MiniGameSelector, PASSWORD_MiniGameSelector } from "../pages/MiniGameSelector";
import VirtualWheelGame, { TASK_ID_VirtualWheelGame, PASSWORD_VirtualWheelGame } from "../pages/VirtualWheelGame";
import DAOVotingGame, { TASK_ID_DAOVotingGame, PASSWORD_DAOVotingGame } from "../pages/DAOVotingGame";
import GameRewardClaim, { TASK_ID_GameReward, PASSWORD_GameReward } from "../pages/GameRewardClaim";
import JoinTournament, { TASK_ID_JoinTournament, PASSWORD_JoinTournament } from "../pages/JoinTournament";
import CryptoWalletQuickSend, { TASK_ID_CryptoWallet, PASSWORD_CryptoWallet } from "../pages/CryptoWalletQuickSend";
import RecurringTokenPurchase, { TASK_ID_RecurringTokenPurchase, PASSWORD_RecurringTokenPurchase } from "../pages/RecurringTokenPurchase";
import CivicPollingReminder, { TASK_ID_CivicPolling, PASSWORD_CivicPolling } from "../pages/CivicPollingReminder";
import ShareDocuments, { TASK_ID_ShareDocuments, PASSWORD_ShareDocuments } from "../pages/ShareDocuments";
import EstimatesTaggedTask, { TASK_ID_EstimatesTaggedTask, PASSWORD_EstimatesTaggedTask } from "../pages/EstimatesTaggedTask";
import CustomizeZones, { TASK_ID_CustomizeZones, PASSWORD_CustomizeZones } from "../pages/CustomizeZones";
import ShareLoadout, { TASK_ID_ShareLoadout, PASSWORD_ShareLoadout } from "../pages/ShareLoadout";
import ReviewDeck, { TASK_ID_ReviewDeck, PASSWORD_ReviewDeck } from "../pages/ReviewDeck";
import CustomizePacing, { TASK_ID_CustomizePacing, PASSWORD_CustomizePacing } from "../pages/CustomizePacing";
import HighlightDifference, { TASK_ID_HighlightDifference, PASSWORD_HighlightDifference } from "../pages/HighlightDifference";
import SubmitFeedback, { TASK_ID_SubmitFeedback, PASSWORD_SubmitFeedback } from "../pages/SubmitFeedback";
import FlashSale, { TASK_ID_FlashSale, PASSWORD_FlashSale } from "../pages/FlashSale";
import TaxEstimate, { TASK_ID_TaxEstimate, PASSWORD_TaxEstimate } from "../pages/TaxEstimate";
import CreatePost, { TASK_ID_CreatePost, PASSWORD_CreatePost } from "../pages/CreatePost";
import ComparePerformance, { TASK_ID_ComparePerformance, PASSWORD_ComparePerformance } from "../pages/ComparePerformance";
import SelfAssessment, { TASK_ID_SelfAssessment, PASSWORD_SelfAssessment } from "../pages/SelfAssessment";
import TrackSymptoms, { TASK_ID_TrackSymptoms, PASSWORD_TrackSymptoms } from "../pages/TrackSymptoms";
import TimeTrack, { TASK_ID_TimeTrack, PASSWORD_TimeTrack } from "../pages/TimeTrack";
import WriteReview, { TASK_ID_WriteReview, PASSWORD_WriteReview } from "../pages/WriteReview";
import EditMenus, { TASK_ID_EditMenus, PASSWORD_EditMenus } from "../pages/EditMenus";
import RevertVersion, { TASK_ID_RevertVersion, PASSWORD_RevertVersion } from "../pages/RevertVersion";
import SubmitDispute, { TASK_ID_SubmitDispute, PASSWORD_SubmitDispute } from "../pages/SubmitDispute";
import DietaryPlanning, { TASK_ID_DietaryPlanning, PASSWORD_DietaryPlanning } from "../pages/DietaryPlanning";
import RezoneForWellness, { TASK_ID_RezoneForWellness, PASSWORD_RezoneForWellness } from "../pages/RezoneForWellness";
import FirewallRules, { TASK_ID_FirewallRules, PASSWORD_FirewallRules } from "../pages/FirewallRules";
import ApproveRefund, { TASK_ID_ApproveRefund, PASSWORD_ApproveRefund } from "../pages/ApproveRefund";
import RevokePermission, { TASK_ID_RevokePermission, PASSWORD_RevokePermission } from "../pages/RevokePermission";
import BanUser, { TASK_ID_BanUser, PASSWORD_BanUser } from "../pages/BanUser";
import CompleteReview, { TASK_ID_CompleteReview, PASSWORD_CompleteReview } from "../pages/CompleteReview";
import AddNewWidget, { TASK_ID_AddNewWidget, PASSWORD_AddNewWidget } from "../pages/AddNewWidget";
import CourseCheckin, { TASK_ID_CourseCheckin, PASSWORD_CourseCheckin } from "../pages/CourseCheckin";
import ReleaseLabResult, { TASK_ID_ReleaseLabResult, PASSWORD_ReleaseLabResult } from "../pages/ReleaseLabResult";
import ExportData, { TASK_ID_ExportData, PASSWORD_ExportData } from "../pages/ExportData";
import RequestReceipt, { TASK_ID_RequestReceipt, PASSWORD_RequestReceipt } from "../pages/RequestReceipt";
import ArchiveDocuments, { TASK_ID_ArchiveDocuments, PASSWORD_ArchiveDocuments } from "../pages/ArchiveDocuments";
import DiscussionFollowup, { TASK_ID_DiscussionFollowup, PASSWORD_DiscussionFollowup } from "../pages/DiscussionFollowup";
import ClaimTasks, { TASK_ID_ClaimTasks, PASSWORD_ClaimTasks } from "../pages/ClaimTasks";
import SendInvites, { TASK_ID_SendInvites, PASSWORD_SendInvites } from "../pages/SendInvites";
import MoveFunds, { TASK_ID_MoveFunds, PASSWORD_MoveFunds } from "../pages/MoveFunds";
import SellAsset, { TASK_ID_SellAsset, PASSWORD_SellAsset } from "../pages/SellAsset";

export const routes_26: RouteConfig[] = [
  {
    path: TASK_ID_FamilyPlanManager,
    title: "Family Plan Manager",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "👨‍👩‍👧‍👦",
    component: FamilyPlanManager,
    tags: ["family", "subscription", "management"],
    password: PASSWORD_FamilyPlanManager,
    difficulty: "medium",
    variant: "base",
    base_task: TASK_ID_FamilyPlanManager,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_CircuitTrainingPlanner,
    title: "Circuit Training Planner",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "💪",
    component: CircuitTrainingPlanner,
    tags: ["fitness", "workout", "planning"],
    password: PASSWORD_CircuitTrainingPlanner,
    difficulty: "medium",
    variant: "base",
    base_task: TASK_ID_CircuitTrainingPlanner,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_GameNightPlanner,
    title: "Game Night Planner",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "🎮",
    component: GameNightPlanner,
    tags: ["social", "planning", "games"],
    password: PASSWORD_GameNightPlanner,
    difficulty: "medium",
    variant: "base",
    base_task: TASK_ID_GameNightPlanner,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_ShortcutConfigurator,
    title: "Shortcut Configurator",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "⌨️",
    component: ShortcutConfigurator,
    tags: ["productivity", "shortcuts", "configuration"],
    password: PASSWORD_ShortcutConfigurator,
    difficulty: "medium",
    variant: "base",
    base_task: TASK_ID_ShortcutConfigurator,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_DonationManager,
    title: "Donation Manager",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "💝",
    component: DonationManager,
    tags: ["charity", "donation", "philanthropy"],
    password: PASSWORD_DonationManager,
    difficulty: "medium",
    variant: "base",
    base_task: TASK_ID_DonationManager,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_SocialFeedManager,
    title: "Social Feed Manager",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "📱",
    component: SocialFeedManager,
    tags: ["social", "media", "feed"],
    password: PASSWORD_SocialFeedManager,
    difficulty: "medium",
    variant: "base",
    base_task: TASK_ID_SocialFeedManager,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_LaptopComparison,
    title: "E-commerce Laptop Comparison",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "💻",
    component: LaptopComparison,
    tags: ["e-commerce", "table", "state management", "comparison"],
    difficulty: "medium",
    password: PASSWORD_LaptopComparison,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_NetworkAccessibility,
    title: "Civic Tech Network Accessibility",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "📶",
    component: NetworkAccessibility,
    tags: ["civic-tech", "forms", "dropdowns", "dynamic-values"],
    difficulty: "medium",
    password: PASSWORD_NetworkAccessibility,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_ExamRetake,
    title: "Exam Retake",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "📅",
    component: ExamRetake,
    tags: ["education", "planning", "scheduling"],
    difficulty: "medium",
    password: PASSWORD_ExamRetake,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_StudyNotes,
    title: "Study Notes Generator",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "📓",
    component: StudyNotesGenerator,
    tags: ["education", "notes", "generation"],
    difficulty: "medium",
    password: PASSWORD_StudyNotes,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_PriceAlert,
    title: "Price Alert",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "💰",
    component: PriceAlert,
    tags: ["e-commerce", "price", "alert"],
    difficulty: "medium",
    password: PASSWORD_PriceAlert,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_GroupExpense,
    title: "Group Expense",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "💰",
    component: GroupExpense,
    tags: ["finance", "expenses", "group"],
    difficulty: "medium",
    password: PASSWORD_GroupExpense,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_ProductivitySummary,
    title: "Productivity Summary",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "📊",
    component: ProductivitySummary,
    tags: ["productivity", "summary", "generation"],
    difficulty: "medium",
    password: PASSWORD_ProductivitySummary,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_NewsSummarizer,
    title: "News Summarizer",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "📰",
    component: NewsSummarizer,
    tags: ["news", "summarization", "generation"],
    difficulty: "medium",
    password: PASSWORD_NewsSummarizer,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_PetSalonBooking,
    title: "Pet Salon Booking",
    description: "Choose the 4th pet type from the list and press 'Continue to Grooming Packages', select the third-to-last grooming package and press 'Continue to Booking Details', pick 'TT1 Pet Salon' as the salon location, set the date to 1 week from now as the booking date and '4pm to 5pm' as the booking time, add the note 'My baby is sensitive, please be extra gentle', and press 'Confirm Booking' to complete the task. Return the password you received.",
    icon: "🐶",
    component: PetSalonBooking,
    tags: ["pet", "grooming", "booking"],
    difficulty: "medium",
    password: PASSWORD_PetSalonBooking,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_JiraSubtask,
    title: "Jira Subtask Creator",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "🔧",
    component: JiraSubtaskCreator,
    tags: ["project-management", "subtasks", "creation"],
    difficulty: "medium",
    password: PASSWORD_JiraSubtask,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_FacebookPrivacy,
    title: "Facebook Privacy Settings",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "🔒",
    component: FacebookPrivacySettings,
    tags: ["social", "privacy", "settings"],
    difficulty: "medium",
    password: PASSWORD_FacebookPrivacy,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_ContractSigningGame,
    title: "Contract Signing Game",
    description: "Select the second-to-last (counting horizontally) contract from the Contract List, then press 'Continue' to proceed. After that, drag the 3rd signer to be the client and the 5th signer to be the contractor, and press 'Continue' to proceed. Then input 'client@gmail.com' for the client email address and 'contractor@gmail.com' for the contractor email address, and press 'Send for Sequential Signing' to complete the task. Return the password you received.",
    icon: "📄",
    component: ContractSigningGame,
    tags: ["contract", "signing", "game"],
    difficulty: "medium",
    password: PASSWORD_ContractSigningGame,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_ResearchBookmarker,
    title: "Research Bookmarker",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "📚",
    component: ResearchBookmarker,
    tags: ["research", "bookmarking", "folder"],
    difficulty: "medium",
    password: PASSWORD_ResearchBookmarker,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_NDAContractGame,
    title: "NDA Contract Game",
    description: "Select the contract type as 'Non-disclosure Agreement', choose the 4th NDA from the contract scrollable list, fill out the party names with Party A: 'ABC contractor agency' and Party B: 'DDT Software company', scroll to the bottom of the terms of the NDA, and press 'Confirm' to complete the task. Return the password you received.",
    icon: "📄",
    component: NDAContractGame,
    tags: ["contract", "signing", "game"],
    difficulty: "medium",
    password: PASSWORD_NDAContractGame,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_LanguageLessonGame,
    title: "Language Lesson Game",
    description: "Go to the 'Language Lessons' tab, choose the 3rd language from the list, then press 'Next' to proceed, after that pick the 'Expert' level and press 'Next' to proceed, select the 1st available date/time and press 'Next' to proceed, toggle on SMS reminder, and press 'Confirm' to complete the task. Return the password you received.",
    icon: "🌐",
    component: LanguageLessonGame,
    tags: ["language", "lesson", "game"],
    difficulty: "medium",
    password: PASSWORD_LanguageLessonGame,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_GroceryReorderGame,
    title: "Grocery Reorder Game",
    description: "Click on the 'Order History' button in the top right corner, then click the 'Reorder' button on the first grocery order on the list. Remove the 4th item from the list (counting horizontally) and press 'Confirm order' to complete the task. Return the password you received.",
    icon: "🛒",
    component: GroceryReorderGame,
    tags: ["grocery", "reorder", "game"],
    difficulty: "medium",
    password: PASSWORD_GroceryReorderGame,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_MovieNightPlanner,
    title: "Movie Night Planner",
    description: "Choose the 4th movie on the list and press 'Next' to proceed, then invite 'James Wilson', 'Tony Raymond', 'Matthew Davidson', and 'David Milton' from the friend list and press 'Next' to proceed. After that set the start time to 2 weeks from now and enable the chat sidebar and press 'Next' to proceed. Share the private link, and press 'Complete' to finish the task. Return the password you received.",
    icon: "🎥",
    component: MovieNightPlanner,
    tags: ["movie", "night", "game"],
    difficulty: "medium",
    password: PASSWORD_MovieNightPlanner,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_ActorProfileGame,
    title: "Actor Profile Game",
    description: "First, select the 5th actor card shown in the grid on the homepage. Then, click the 'Next' button to proceed to the actor's profile. Next, click the 'Follow' button to follow the selected actor. Then, click 'Next' again to continue to the notification settings. In the Notification Preferences screen, toggle on the 'New Release Alerts' switch. After that, select 'Netflix' as your preferred streaming platform. Finally, click the 'Complete' button to finish the process. A password will appear. Return this password as your answer.",
    icon: "🎭",
    component: ActorProfileGame,
    tags: ["actor", "profile", "game"],
    difficulty: "medium",
    password: PASSWORD_ActorProfileGame,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_DeviceManagementGame,
    title: "Device Management Game",
    description: "Go to the 'Devices' tab on the nav bar, select the 2nd device on the list and press 'Next' to proceed. Then toggle on `DND mode` on the device and press 'Next' to proceed. Tick the checkboxes for 'Call from Favorites' and 'Calendar alerts', then press 'Next' again. Schedule the effective time to 'Weekdays' and '10 PM–7 AM', and press 'Confirm' to complete the task. Return the password you received.",
    icon: "💻",
    component: DeviceManagementGame,
    tags: ["device", "management", "game"],
    difficulty: "medium",
    password: PASSWORD_DeviceManagementGame,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_BrowserExtensionGame,
    title: "Browser Extension Game",
    description: "Click on the 'Extension' tab on the side navigation bar, set 'Source Language' as 'English' and 'Target Language' as 'Spanish', then press 'Configure settings'. Select 'Activate translation for current tab only', toggle on 'Always Translate' for this domain, and press 'Activate Translation' to complete the task. Return the password you received.",
    icon: "🌐",
    component: BrowserExtensionGame,
    tags: ["browser", "extension", "game"],
    difficulty: "medium",
    password: PASSWORD_BrowserExtensionGame,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_PlantManagement,
    title: "Plant Management",
    description: "On the 'Choose Your Plant' page, select 'Carrot' and press 'Next' to proceed. Then select 'Last Watering Date' as 3 days ago and press 'Next' to proceed. Then set the sunlight requirement to 'Full Sun' and press 'Next' to proceed. Set 3 days from now was the next fertilizing date, and press 'Next' to proceed. Then mark the health status of the plant as 'Healthy' and press 'Confirm' to complete the task. Once you receive the password, return it.",
    icon: "🌱",
    component: PlantManagement,
    tags: ["plant", "management", "game"],
    difficulty: "medium",
    password: PASSWORD_PlantManagement,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_SocialMediaManager,
    title: "Social Media Manager",
    description: "Select the 'Michael Jordan' profile from the celebrity list you are following and press 'Next' to proceed. Then in 'Notification Settings,' toggle on 'Posts' and 'Stories' and press 'Next' to proceed. Then select 'Daily Digest' and press 'Save Settings' and lastly, press 'Complete' to complete the task. Return the password you received.",
    icon: "📱",
    component: SocialMediaManager,
    tags: ["social", "media", "manager"],
    difficulty: "medium",
    password: PASSWORD_SocialMediaManager,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_MiniGameSelector,
    title: "Mini Game Selector",
    description: "Choose the 6th minigame from the list and press 'Next' to proceed. Then select the FFA game mode and press 'Next' to proceed. Then click 'Generate Challenge Link' and toggle 'Get notified when they accept' to on and press 'Complete' to complete the task. Return the password you received.",
    icon: "🎮",
    component: MiniGameSelector,
    tags: ["mini", "game", "selector"],
    difficulty: "medium",
    password: PASSWORD_MiniGameSelector,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_VirtualWheelGame,
    title: "Virtual Wheel Game",
    description: "Log in with username: test-user and password: test-pw132, go to the 'Rewards' tab, select the 3rd virtual wheel and press 'Next' to proceed. Then press 'Spin Wheel' and press 'Next' to proceed once the spinning is done. Press 'Claim prize' and press 'Next' to proceed. Select the price from the list and press 'Complete' to complete the task. Return the password you received.",
    icon: "🎰",
    component: VirtualWheelGame,
    tags: ["virtual", "wheel", "game"],
    difficulty: "medium",
    password: PASSWORD_VirtualWheelGame,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_DAOVotingGame,
    title: "DAO Voting Game",
    description: "First, select the 6th DAO in the list and click the 'Next' button. Next, scroll to the bottom of the proposal and vote 'Yes' and press 'Next' to proceed. Then, wait for the live vote tally to load and update. Finally, click the 'Complete' button once it is enabled. If all steps are completed correctly, a password will appear. Return this password as your answer.",
    icon: "🎰",
    component: DAOVotingGame,
    tags: ["virtual", "wheel", "game"],
    difficulty: "medium",
    password: PASSWORD_DAOVotingGame,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_GameReward,
    title: "Game Reward Claim",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "🏆",
    component: GameRewardClaim,
    tags: ["game", "reward", "claim"],
    difficulty: "medium",
    password: PASSWORD_GameReward,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_JoinTournament,
    title: "Join Tournament",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "⚔️",
    component: JoinTournament,
    tags: ["tournament", "join", "game"],
    difficulty: "medium",
    password: PASSWORD_JoinTournament,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_CryptoWallet,
    title: "Crypto Wallet Quick Send",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "₿",
    component: CryptoWalletQuickSend,
    tags: ["crypto", "wallet", "send"],
    difficulty: "medium",
    password: PASSWORD_CryptoWallet,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_RecurringTokenPurchase,
    title: "Recurring Token Purchase",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "🔄",
    component: RecurringTokenPurchase,
    tags: ["crypto", "wallet", "send"],
    difficulty: "medium",
    password: PASSWORD_RecurringTokenPurchase,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_CivicPolling,
    title: "Civic Polling Reminder",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "🗳️",
    component: CivicPollingReminder,
    tags: ["civic", "polling", "reminder"],
    difficulty: "medium",
    password: PASSWORD_CivicPolling,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_ShareDocuments,
    title: "Share Documents",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "📄",
    component: ShareDocuments,
    tags: ["productivity", "documents", "share"],
    difficulty: "medium",
    password: PASSWORD_ShareDocuments,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_EstimatesTaggedTask,
    title: "Estimates Tagged Task",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "🏷️",
    component: EstimatesTaggedTask,
    tags: ["estimates", "tagged", "task"],
    difficulty: "medium",
    password: PASSWORD_EstimatesTaggedTask,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_CustomizeZones,
    title: "Customize Zones",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "🎯",
    component: CustomizeZones,
    tags: ["productivity", "zones", "customize"],
    difficulty: "medium",
    password: PASSWORD_CustomizeZones,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_ShareLoadout,
    title: "Share Loadout",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "🎒",
    component: ShareLoadout,
    tags: ["productivity", "loadout", "share"],
    difficulty: "medium",
    password: PASSWORD_ShareLoadout,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_ReviewDeck,
    title: "Review Deck",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "📊",
    component: ReviewDeck,
    tags: ["productivity", "deck", "review"],
    difficulty: "medium",
    password: PASSWORD_ReviewDeck,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_CustomizePacing,
    title: "Customize Pacing",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "⏱️",
    component: CustomizePacing,
    tags: ["productivity", "pacing", "customize"],
    difficulty: "medium",
    password: PASSWORD_CustomizePacing,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_HighlightDifference,
    title: "Highlight Difference",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "🔍",
    component: HighlightDifference,
    tags: ["productivity", "difference", "highlight"],
    difficulty: "medium",
    password: PASSWORD_HighlightDifference,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_SubmitFeedback,
    title: "Submit Feedback",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "💬",
    component: SubmitFeedback,
    tags: ["productivity", "feedback", "submit"],
    difficulty: "medium",
    password: PASSWORD_SubmitFeedback,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_FlashSale,
    title: "Flash Sale",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "⚡",
    component: FlashSale,
    tags: ["productivity", "flash", "sale"],
    difficulty: "medium",
    password: PASSWORD_FlashSale,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_TaxEstimate,
    title: "Tax Estimate",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "💰",
    component: TaxEstimate,
    tags: ["productivity", "tax", "estimate"],
    difficulty: "medium",
    password: PASSWORD_TaxEstimate,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_CreatePost,
    title: "Create Post",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "✍️",
    component: CreatePost,
    tags: ["productivity", "post", "create"],
    difficulty: "medium",
    password: PASSWORD_CreatePost,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_ComparePerformance,
    title: "Compare Performance",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "📈",
    component: ComparePerformance,
    tags: ["productivity", "performance", "compare"],
    difficulty: "medium",
    password: PASSWORD_ComparePerformance,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_SelfAssessment,
    title: "Self Assessment",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "📋",
    component: SelfAssessment,
    tags: ["productivity", "assessment", "self"],
    difficulty: "medium",
    password: PASSWORD_SelfAssessment,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_TrackSymptoms,
    title: "Track Symptoms",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "🏥",
    component: TrackSymptoms,
    tags: ["productivity", "symptoms", "track"],
    difficulty: "medium",
    password: PASSWORD_TrackSymptoms,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_TimeTrack,
    title: "Time Track",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "⏰",
    component: TimeTrack,
    tags: ["productivity", "time", "track"],
    difficulty: "medium",
    password: PASSWORD_TimeTrack,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_WriteReview,
    title: "Write Review",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "⭐",
    component: WriteReview,
    tags: ["productivity", "review", "write"],
    difficulty: "medium",
    password: PASSWORD_WriteReview,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_EditMenus,
    title: "Edit Menus",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "🍽️",
    component: EditMenus,
    tags: ["productivity", "menus", "edit"],
    difficulty: "medium",
    password: PASSWORD_EditMenus,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_RevertVersion,
    title: "Revert Version",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "↩️",
    component: RevertVersion,
    tags: ["productivity", "version", "revert"],
    difficulty: "medium",
    password: PASSWORD_RevertVersion,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_SubmitDispute,
    title: "Submit Dispute",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "⚖️",
    component: SubmitDispute,
    tags: ["productivity", "dispute", "submit"],
    difficulty: "medium",
    password: PASSWORD_SubmitDispute,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_DietaryPlanning,
    title: "Dietary Planning",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "🍎",
    component: DietaryPlanning,
    tags: ["productivity", "dietary", "planning"],
    difficulty: "medium",
    password: PASSWORD_DietaryPlanning,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_RezoneForWellness,
    title: "Rezone For Wellness",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "🏙️",
    component: RezoneForWellness,
    tags: ["productivity", "rezone", "wellness"],
    difficulty: "medium",
    password: PASSWORD_RezoneForWellness,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_FirewallRules,
    title: "Firewall Rules",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "🛡️",
    component: FirewallRules,
    tags: ["productivity", "firewall", "rules"],
    difficulty: "medium",
    password: PASSWORD_FirewallRules,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_ApproveRefund,
    title: "Approve Refund",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "💸",
    component: ApproveRefund,
    tags: ["productivity", "refund", "approve"],
    difficulty: "medium",
    password: PASSWORD_ApproveRefund,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_RevokePermission,
    title: "Revoke Permission",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "❌",
    component: RevokePermission,
    tags: ["productivity", "permission", "revoke"],
    difficulty: "medium",
    password: PASSWORD_RevokePermission,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_BanUser,
    title: "Ban User",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "🚫",
    component: BanUser,
    tags: ["productivity", "ban", "user"],
    difficulty: "medium",
    password: PASSWORD_BanUser,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_CompleteReview,
    title: "Complete Review",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "✅",
    component: CompleteReview,
    tags: ["productivity", "review", "complete"],
    difficulty: "medium",
    password: PASSWORD_CompleteReview,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_AddNewWidget,
    title: "Add New Widget",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "🧩",
    component: AddNewWidget,
    tags: ["productivity", "widget", "add"],
    difficulty: "medium",
    password: PASSWORD_AddNewWidget,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_CourseCheckin,
    title: "Course Checkin",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "📝",
    component: CourseCheckin,
    tags: ["productivity", "course", "checkin"],
    difficulty: "medium",
    password: PASSWORD_CourseCheckin,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_ReleaseLabResult,
    title: "Release Lab Result",
    description: "Your goal is to process all unsent, completed lab results in the 'Lab Results' section using 'Action Mode'. The correct action depends on the status of the result. If the result is not sent to the patient yet, make sure to send it to the patient with the 'Release to Patient Portal' button. If a result has an abnormal finding and there is no scheduled meeting with the patient, schedule a meeting with the patient with the 'Schedule Appointment' button and save changes to complete the task. Make sure to return the password revealed.",
    icon: "🔬",
    component: ReleaseLabResult,
    tags: ["productivity", "lab", "result"],
    difficulty: "medium",
    password: PASSWORD_ReleaseLabResult,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_ExportData,
    title: "Export Data",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "📊",
    component: ExportData,
    tags: ["productivity", "export", "data"],
    difficulty: "medium",
    password: PASSWORD_ExportData,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_RequestReceipt,
    title: "Request Receipt",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "🧾",
    component: RequestReceipt,
    tags: ["productivity", "receipt", "request"],
    difficulty: "medium",
    password: PASSWORD_RequestReceipt,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_ArchiveDocuments,
    title: "Archive Documents",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "📁",
    component: ArchiveDocuments,
    tags: ["productivity", "documents", "archive"],
    difficulty: "medium",
    password: PASSWORD_ArchiveDocuments,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_DiscussionFollowup,
    title: "Discussion Followup",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "💬",
    component: DiscussionFollowup,
    tags: ["productivity", "discussion", "followup"],
    difficulty: "medium",
    password: PASSWORD_DiscussionFollowup,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_ClaimTasks,
    title: "Claim Tasks",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "📋",
    component: ClaimTasks,
    tags: ["productivity", "tasks", "claim"],
    difficulty: "medium",
    password: PASSWORD_ClaimTasks,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_SendInvites,
    title: "Send Invites",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "📧",
    component: SendInvites,
    tags: ["productivity", "invites", "send"],
    difficulty: "medium",
    password: PASSWORD_SendInvites,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_MoveFunds,
    title: "Move Funds",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "💱",
    component: MoveFunds,
    tags: ["productivity", "funds", "move"],
    difficulty: "medium",
    password: PASSWORD_MoveFunds,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_SellAsset,
    title: "Sell Asset",
    description: "Perform the instructions described at the top of the page to reveal the hidden password. Return the revealed password upon completion.",
    icon: "💎",
    component: SellAsset,
    tags: ["productivity", "asset", "sell"],
    difficulty: "medium",
    password: PASSWORD_SellAsset,
    variant: "base",
    requires_file_upload: false
  }
]