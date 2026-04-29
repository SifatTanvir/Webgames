import { RouteConfig } from "./routeType";
import StockTrading, {
  PASSWORD_StockBuyOrder,
  TASK_ID_StockBuyOrder,
} from "../pages/StockTrading";
import StockApp, {
  PASSWORD_StockTrading,
  TASK_ID_StockTrading,
} from "../pages/StockApp";
import HiringPipelineExperience, {
  PASSWORD_HiringPipeline,
  TASK_ID_HiringPipeline,
} from "../pages/HiringManagement";
import JobPostingExperience, {
  PASSWORD_JobPosting,
  TASK_ID_JobPosting,
} from "../pages/JobPosting";
import ProjectTaskExperience, {
  PASSWORD_ProjectTask,
  TASK_ID_ProjectTask,
} from "../pages/ProjectColloboration";
import TeamHuddleExperience, {
  PASSWORD_TeamHuddle,
  TASK_ID_TeamHuddle,
} from "../pages/TeamHuddle";
import DocCollabExperience, {
  PASSWORD_DocHistory,
  TASK_ID_DocHistory,
} from "../pages/DocCollab";
import ContentBranchingExperience, {
  PASSWORD_ContentBranching,
  TASK_ID_ContentBranching,
} from "../pages/ContentBranching";
import RetirementPlanExperience, {
  PASSWORD_RetirementPlan,
  TASK_ID_RetirementPlan,
} from "../pages/RetirementPlan";
import CryptoStakingExperience, {
  PASSWORD_CryptoStaking,
  TASK_ID_CryptoStaking,
} from "../pages/CryptoStaking";
import IoTExperience, {
  PASSWORD_IoT,
  TASK_ID_IoT,
} from "../pages/IOT-Troubleshooting";
import NetworkDiagnosticExperience, {
  PASSWORD_NetworkDiagnostic,
  TASK_ID_NetworkDiagnostic,
} from "../pages/NetworkDiagnostic";
import GuidedWorkoutExperience, {
  PASSWORD_GuidedWorkout,
  TASK_ID_GuidedWorkout,
} from "../pages/GuidedWorkout";
import RetirementCalculatorExperience, {
  PASSWORD_RetirementCalculator,
  TASK_ID_RetirementCalculator,
} from "../pages/RetirementCalculator";
import GoalCreationExperience, {
  PASSWORD_GoalCreation,
  TASK_ID_GoalCreation,
} from "../pages/PersonalGoal";
import GoalManagementExperience, {
  PASSWORD_GoalManagement,
  TASK_ID_GoalManagement,
} from "../pages/PersonalRunGoal";
import TimeBased, {
  PASSWORD_TimeTracking,
  TASK_ID_TimeTracking,
} from "../pages/TimeBased";
import UserManagementExperience, {
  PASSWORD_UserPermissions,
  TASK_ID_UserPermissions,
} from "../pages/UserManagementRole";
import TeamInvitationExperience, {
  TASK_ID_TeamInvitation,
  PASSWORD_TeamInvitation,
} from "../pages/TeamInvitation";
import NewsletterBuilderExperience, {
  PASSWORD_NewsletterBuilder,
  TASK_ID_NewsletterBuilder,
} from "../pages/NewsletterMod";
import NewsletterSchedulingExperience, {
  PASSWORD_NewsletterSchedule,
  TASK_ID_NewsletterSchedule,
} from "../pages/NewsletterSchedule";
import ContractReviewExperience, {
  TASK_ID_ContractReview,
  PASSWORD_ContractReview,
} from "../pages/ContractReview";
import ContractClauseReviewExperience, {
  TASK_ID_ClauseReview,
  PASSWORD_ClauseReview,
} from "../pages/ClauseReview";
import CrowdfundingExperience, {
  TASK_ID_CrowdfundingD,
  PASSWORD_CrowdfundingD,
} from "../pages/CrowdPledge";
import ProjectHistoryExperience, {
  TASK_ID_ProjectHistory,
  PASSWORD_ProjectHistory,
} from "../pages/CrowdfundHistory";
import BillPaymentExperience, {
  PASSWORD_CreditBillPayment,
  TASK_ID_CreditBillPayment,
} from "../pages/CreditBill";
import BankPayee, {
  PASSWORD_PayeeSetup,
  TASK_ID_PayeeSetup,
} from "../pages/BankPayee";
import ParticipatoryBudgetExperience, {
  PASSWORD_ParticipatoryBudget,
  TASK_ID_ParticipatoryBudget,
} from "../pages/PTBudget";
import CommunityProjectsExperience, {
  PASSWORD_CommunityProjects,
  TASK_ID_CommunityProjects,
} from "../pages/CommunityProject";
import PatientPortalExperience, {
  TASK_ID_PatientPortalR,
  PASSWORD_PatientPortalR,
} from "../pages/PatientPortalT";
import PatientCheckInExperience, {
  PASSWORD_PatientCheckIn,
  TASK_ID_PatientCheckIn,
} from "../pages/PreCheckin";
import RealEstateExperience, {
  PASSWORD_RealEstateSearch,
  TASK_ID_RealEstateSearch,
} from "../pages/RealStateListing";
import PropertyTourExperience, {
  PASSWORD_PropertyTour,
  TASK_ID_PropertyTour,
} from "../pages/DimensionPic";
import RecipeApp, {
  PASSWORD_RecipeApp,
  TASK_ID_RecipeApp,
} from "../pages/ReceipeAdjust";
import CookAlongExperience, {
  PASSWORD_CookAlong,
  TASK_ID_CookAlong,
} from "../pages/CookAlong";
import StudyGroupExperience, {
  PASSWORD_StudyGroup,
  TASK_ID_StudyGroup,
} from "../pages/StudyGroup";
import StudyGroupCollabExperience, {
  PASSWORD_StudyGroupCollab,
  TASK_ID_StudyGroupCollab,
} from "../pages/StudyGroupFile";
import LoyaltyRewardsExperience, {
  PASSWORD_LoyaltyRewards,
  TASK_ID_LoyaltyRewards,
} from "../pages/LoyaltyProgram";
import LoyaltyOfferExperience, {
  PASSWORD_LoyaltyOffer,
  TASK_ID_LoyaltyOffer,
} from "../pages/LoyaltyOfferAct";
import InventoryManagementExperience, {
  TASK_ID_InventoryManagement,
  PASSWORD_InventoryManagement,
} from "../pages/InventoryManagement";
import AddProductExperience, {
  PASSWORD_AddProduct,
  TASK_ID_AddProduct,
} from "../pages/InventoryAddition";
import MindMapExperience, {
  TASK_ID_MindMap,
  PASSWORD_MindMap,
} from "../pages/MindMap";
import MindMapExportExperience, {
  PASSWORD_MindMapExport,
  TASK_ID_MindMapExport,
} from "../pages/PreExistMindMap";

import ApiKeyManagementExperience, { PASSWORD_ApiKeyRotation, TASK_ID_ApiKeyRotation } from "../pages/APIKeyManagement";
import ContactResolutionExperience, { PASSWORD_ContactResolution, TASK_ID_ContactResolution } from "../pages/ContactResolution";
import MediaLibraryExperience , { PASSWORD_MediaLibrary, TASK_ID_MediaLibrary } from "../pages/LibraryBulkTaging";
import SmartCollectionExperience , { PASSWORD_SmartCollection, TASK_ID_SmartCollection } from "../pages/SmartCollection";
import WorkflowAutomationExperience , { PASSWORD_WorkflowAutomation, TASK_ID_WorkflowAutomation } from "../pages/WorkflowAutomation";
import AutomationManagementExperience, { PASSWORD_AutomationManagement, TASK_ID_AutomationManagement } from "../pages/RuleManagement";
import DataExportExperience, {  PASSWORD_DataExport, TASK_ID_DataExport } from "../pages/AccountDataExport";
import DataExportManagementExperience, { PASSWORD_DataExportManagement, TASK_ID_DataExportManagement } from "../pages/ExportManagement";
import SiteCraftExperience, { PASSWORD_SiteDesignV2, TASK_ID_SiteDesignV2 } from "../pages/DesignSettings";
import FreshBoxExperience, { PASSWORD_FreshBox, TASK_ID_FreshBox } from "../pages/ShippmentManagement";
import CombinedProjectManagement, { PASSWORD_ProjectManagement, TASK_ID_ProjectManagement } from "../pages/projectmanagement/CombinedProjectManagement";
import CombinedProjectManagement2, { PASSWORD_ProjectManagement2, TASK_ID_ProjectManagement2 } from "../pages/projectmanagement/CombinedProjectManagement2";
import CombinedProjectManagement3, { PASSWORD_ProjectManagement3, TASK_ID_ProjectManagement3 } from "../pages/projectmanagement/CombinedProjectManagement3";
import CombinedProjectManagement4, { PASSWORD_ProjectManagement4, TASK_ID_ProjectManagement4 } from "../pages/projectmanagement/CombinedProjectManagement4";
import TrainingPlatform1, {
  TASK_ID_TrainingPlatform1,

} from "../pages/logicalgames/TrainingPlatform1";
import {  PASSWORD_TrainingPlatform1} from '../pages/logicalgames/passwords'
import TrainingPlatform2, {
  TASK_ID_TrainingPlatform2,
  PASSWORD_TrainingPlatform2,
} from "../pages/logicalgames/TrainingPlatform2";
import TrainingPlatform3, {
  TASK_ID_TrainingPlatform3,
  PASSWORD_TrainingPlatform3,
} from "../pages/logicalgames/TrainingPlatform3";
import TrainingPlatform4, {
  TASK_ID_TrainingPlatform4,
  PASSWORD_TrainingPlatform4,
} from "../pages/logicalgames/TrainingPlatform4";


import RegionalPerformance, { PASSWORD_SynergyHub, TASK_ID_SynergyHub } from "../pages/RegionalPerformance";
import CognosysExperience, { PASSWORD_Cognosys, TASK_ID_Cognosys } from "../pages/AbstractSummary";
import SentinelGuardExperience, { PASSWORD_SentinelGuard, TASK_ID_SentinelGuard } from "../pages/ServerLog";
import TalentSphereExperience, { PASSWORD_TalentSphere, TASK_ID_TalentSphere } from "../pages/TalentSphereExperience";
import DeductionGridExperience, { PASSWORD_DeductionGrid, TASK_ID_DeductionGrid } from "../pages/DeductionGridExperience";
import ActionItemConsolidator, { PASSWORD_ActionItemConsolidator, TASK_ID_ActionItemConsolidator } from "../pages/ActionItemExtractor";
import MarketMatrixExperience, { TASK_ID_MarketMatrix ,PASSWORD_MarketMatrix } from "../pages/ShareHolder";
import VisaQuestExperience, { PASSWORD_VisaQuest, TASK_ID_VisaQuest } from "../pages/VisaRequirement";
import SystemLockExperience, { TASK_ID_SystemLock ,PASSWORD_SystemLock } from "../pages/ColorPicker";
import MediVerseExperience, { PASSWORD_MediVerse, TASK_ID_MediVerse } from "../pages/MedicalComparison";
 import InsightStreamExperience, { PASSWORD_InsightStream, TASK_ID_InsightStream } from "../pages/TrafficAnalysis";
import CircuitCoreExperience, { PASSWORD_CircuitCore, TASK_ID_CircuitCore } from "../pages/CircuitCoreLogic";
import PatternRecall, { PASSWORD_CogniGrid, TASK_ID_CogniGrid } from "../pages/PatternRecall";
import AlchemistsRiddleExperience, { TASK_ID_AlchemistsRiddle  , PASSWORD_AlchemistsRiddle } from "../pages/AlchemistRide";
import WordWeaverExperience, { PASSWORD_WordWeaver, TASK_ID_WordWeaver } from "../pages/WordWeaver";


export const routes_12: RouteConfig[] = [
 
 {
  path: TASK_ID_StockTrading,
  title: "Stock Trading Experience",
  description: "Your goal is to place a 'Trailing Stop' order for 'Innovate Inc.' stock. First, click the 'Portfolio' button in the sidebar. Second, click the 'Trade' button next to 'INVC' (Innovate Inc.). Third, click 'Trailing Stop' to set the order type. Fourth, click the '% Percentage' button, enter '5' as the trail value, and select 'Good 'til Canceled (GTC)' from the 'Time in Force' dropdown. Fifth, click the 'Preview Order' button. In the review modal, enter '142.50' in the 'Trade Notes' field and click the 'Confirm and Place Order' button. Upon completion, a password will be revealed; return this password as your answer.", 
  icon: "📈",
  component: StockApp,
  tags: ["stock", "trading", "forms", "multi-step", "finance"],
  password: PASSWORD_StockTrading,
  difficulty: "hard",
  variant: "base",
  base_task: TASK_ID_StockTrading,
  requires_file_upload: false,
}, {
  path: TASK_ID_StockBuyOrder,
  title: "Stock Trading Buy Order",
  description: "Your goal is to complete a multi-step stock trading workflow with specific details. First, from the randomized list of stocks, find and click on the one with the ticker symbol 'TSLA'. Second, in the buy order screen, enter '25' into the shares input field and click 'Place Market Order'. Third, on the confirmation screen, click the 'Set Stop-Loss' button. Fourth, enter '250.75' into the 'Stop Price' input field and click 'Set Stop-Loss Order'. Fifth, on the final review screen, click 'View Portfolio'. Upon completion, a password will be shown; return this password as your answer.", 
  icon: "📈",
  component: StockTrading,
  tags: ["stock", "trading", "forms", "multi-step", "finance"],
  password: PASSWORD_StockBuyOrder,
  difficulty: "hard",
  variant: "base",
  base_task: TASK_ID_StockBuyOrder,
  requires_file_upload: false,
},
{
  path: TASK_ID_HiringPipeline,
  title: "Dynamic Hiring Pipeline Management",
  description: "Your goal is to manage a candidate's application in the hiring pipeline. First, click the 'Candidate Pipeline' link in the sidebar to navigate to the Kanban board. Second, read the task instructions in the header to identify the target candidate and the required salary. Third, find the specified candidate's card in the 'Interview' stage and drag and drop it into the 'Offer' stage. Fourth, on the candidate's card, click the 'Generate Offer' button. Fifth, in the offer letter modal, enter the specified salary from the header into the 'Salary' field and click 'Send Offer Letter' button. Finally, click the 'Confirm Pipeline Changes' button at the top of the page. Upon completion, a password will be shown; return this password as your answer.",
  icon: "👥",
  component: HiringPipelineExperience,
  tags: ["dashboard", "kanban", "drag-and-drop", "dynamic", "multi-step"],
  difficulty: "hard",
  password:PASSWORD_HiringPipeline ,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_JobPosting,
  title: "Dynamic Job Posting Creation",
  description: "Your goal is to create and publish a new job posting. First, click the 'Job Postings' link in the sidebar. Second, click the '+ Create New Posting' button. Third, read the task instructions in the header to get the details for the new role. In the `New Job Posting` modal, enter the specified Job Title and click 'Next'. Fourth, select the three required skills and from dropdown select the correct location, and then click 'Next'. Fifth, select next week's Monday as the Application Deadline. Finally, click the 'Publish Job Posting' button. Upon completion, a password will be shown; return this password as your answer.",  icon: "📝",
  component: JobPostingExperience,
  tags: ["dashboard", "saas", "forms", "dynamic", "multi-step"],
  difficulty: "hard",
  password: PASSWORD_JobPosting,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_ProjectTask,
  title: "Dynamic Project Task Collaboration",
  description: "Your goal is to collaborate on a project task using the details in the header. First, click 'Project Board' in the sidebar, then find and click the task card specified in the header to open its details. In the modal window, enter a comment that includes the required @mention and click 'Add Comment & Continue'. On the next screen, create the poll by entering the task's title as the 'Poll Description', followed by the two specific poll options from the header into the option fields, and then click 'Create Poll'. Once the poll appears, vote for the first option by clicking on it. Finally, click the 'Confirm Task Update' button. A password will be shown upon completion; return this password as your answer.",
  icon: "💬",
  component: ProjectTaskExperience,
  tags: ["dashboard", "kanban", "form", "dynamic", "multi-step"],
  difficulty: "hard",
  password: PASSWORD_ProjectTask,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_TeamHuddle,
  title: "Dynamic Team Huddle Video Call",
  description: "Your goal is to start and manage a team video call. From the dashboard, click the 'Start Huddle' button, which is located inside the 'Quick Actions' card. On the next screen, click the '+ Start a New Huddle' button. In the lobby window that appears, enter the specific meeting code from the header into the input field and click 'Join Now'. Once you are in the call, click the share screen button (the one with the 🖥️ icon). From the modal, select the specific window to share as instructed in the header. Finally, click the red hang-up button (the one with the 📞 icon) to end the call. A password will be shown upon completion; return this password as your answer.",
  icon: "📹",
  component: TeamHuddleExperience,
  tags: ["dashboard", "collaboration", "video-call", "dynamic", "multi-step"],
  difficulty: "hard",
  password: PASSWORD_TeamHuddle,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_DocHistory,
  title: "Dynamic Document Version Restoration",
  description: "Your goal is to restore a specific change from a document's version history. First, read the task header to identify the target document and the specific paragraph to restore. Second, from the dashboard, find and click the specified document to open it. Third, click the 'Version History' icon in the toolbar. Fourth, click the 'Compare Versions' button to see the changes between the two most recent versions. Fifth, find the deleted paragraph that matches the one from the header instruction and click the 'Revert this change' button next to it. Sixth, click the 'Save as New Version' button. Finally, click the 'Return to Dashboard' button. Upon completion, a password will be shown; return this password as your answer.",
  icon: "📄",
  component: DocCollabExperience,
  tags: ["dashboard", "documents", "collaboration", "diff", "dynamic", "multi-step"],
  difficulty: "hard",
  password: PASSWORD_DocHistory,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_ContentBranching,
  title: "Dynamic Content Branching and Review",
  description: "Your goal is to create a new content branch, modify it, and submit it for review. First, click the 'Content' link in the sidebar. Second, read the task instructions in the header to identify the target page, the new branch name, the banner URL, and the required reviewer. Third, find the specified page and click its 'Create Branch' button. In the modal, enter the specified branch name and click 'Create'. Fourth, in the branch editor, paste the specified banner URL into the 'Banner Image URL' field. Fifth, click the 'Submit for Review' button. In the next modal, select the specified reviewer from the dropdown and click 'Submit'. Finally, click the 'Return to Dashboard' button. Upon completion, a password will be shown; return this password as your answer.",
  icon: "🌿",
  component: ContentBranchingExperience,
  tags: ["dashboard", "cms", "git", "branching", "dynamic", "multi-step"],
  difficulty: "hard",
  password: PASSWORD_ContentBranching,
  variant: "base",
  requires_file_upload: false
},{
  path:  TASK_ID_RetirementPlan,
  title: "Dynamic Retirement Plan Adjustment",
  description: "Your goal is to adjust your retirement plan by following the multi-step process using the instructions in the header. First, click the 'Retirement Plan' link in the sidebar. In the 'Monthly Contribution' step, use the slider to set your contribution to the exact dollar amount specified in the header, then click 'Next'. On the 'Investment Risk Tolerance' screen, select the risk profile required by the header instructions and click 'Next'. On the final 'Retirement Goals' screen, select the specific goal mentioned in the header from the list of options. Finally, click the 'Save Changes' button. A password will be shown upon completion; return this password as your answer.",
  icon: "💰",
  component: RetirementPlanExperience,
  tags: ["dashboard", "fintech", "forms", "slider", "dynamic", "multi-step"],
  difficulty: "hard",
  password: PASSWORD_RetirementPlan,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_CryptoStaking,
  title: "Dynamic Crypto Token Staking",
  description: "Your goal is to stake a specific crypto token with a chosen validator. First, read the task instructions in the header to identify the target token, the validator, and the amount to stake. Second, from the dashboard, find the specified token in the 'My Assets' list and click its 'Stake' button. Third, on the staking page, find the specified validator (ensure their commission is less than 5%) and click 'Delegate' button of that validator. Fourth, in the modal, enter the specified amount of tokens to stake and click 'Confirm Stake' button. Finally, click the 'Return to Dashboard' button. Upon completion, a password will be shown; return this password as your answer.",  icon: "🪙",
  component: CryptoStakingExperience,
  tags: ["crypto", "staking", "dashboard", "dynamic", "multi-step"],
  difficulty: "hard",
  password: PASSWORD_CryptoStaking,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_IoT,
  title: "IoT Device Troubleshooting",
  description: "Your goal is to troubleshoot an unresponsive smart device. First, on the dashboard, find the 'Living Room Light' which is marked as 'Unresponsive' and click on it. Second, in the troubleshooting guide that appears, click the 'Power Cycle' button. Third, click the 'Check Wi-Fi' button. Finally, after the device status updates to 'Online', click the 'Done' button to close the guide. Upon completion, a password will be shown; return this password as your answer.",
  icon: "💡",
  component: IoTExperience,
  tags: ["dashboard", "iot", "troubleshooting", "multi-step"],
  difficulty: "hard",
  password:  PASSWORD_IoT,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_NetworkDiagnostic,
  title: "Network Diagnostic & Help Center",
  description: "Your goal is to troubleshoot a network error using the help center. First, click the 'Settings' link in the sidebar. Second, in the 'Network' section, click the 'Run Diagnostic' button. Third, when the test fails, click the 'Copy Error Code' button to copy the error code. Fourth, click the 'Help Center' link in the sidebar. Fifth, paste the copied error code into the search bar and click 'Search'. Finally, click the 'Mark as Resolved' button that appears. Upon completion, a password will be shown; return this password as your answer.",
  icon: "🌐",
  component: NetworkDiagnosticExperience,
  tags: ["dashboard", "settings", "help-center", "dynamic-data", "multi-step"],
  difficulty: "hard",
  password: PASSWORD_NetworkDiagnostic,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_GuidedWorkout,
  title: " Guided Workout Session",
  description: "Your goal is to complete the 'Full Body Strength' guided workout by performing a specific sequence of actions. First, from the dashboard, find the 'Full Body Strength' workout card and click its 'Start Workout' button. For the first exercise (Push-ups), use the rep controls to set the count to '13', and then click the 'Check Form' button. On the second exercise (Squats), set the reps to '8', and then click the 'Next Exercise' button. For the final exercise (Plank), click 'Finish Exercise'. After the workout is complete, give it a 5-star rating by clicking the fifth star, and finally, click the 'Back to Dashboard' button. A password will be shown upon completion; return this password as your answer.",
  icon: "💪",
  component: GuidedWorkoutExperience,
  tags: ["dashboard", "fitness", "ui-interaction", "multi-step"],
  difficulty: "hard",
  password: PASSWORD_GuidedWorkout,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_RetirementCalculator,
  title: "Retirement Calculator Interaction",
  description: "Your goal is to use the retirement calculator to model a new scenario. First, click the 'Calculators' link in the sidebar, then select the 'Retirement Calculator'. Second, on the calculator page, use the slider to change your planned retirement age from 65 to 62. Third, after observing the change in the projected monthly income, click the 'Schedule a consultation' button. Finally, in the confirmation modal, click the 'Return to Dashboard' button. Upon completion, a password will be shown; return this password as your answer.",
  icon: "🧮",
  component: RetirementCalculatorExperience,
  tags: ["dashboard", "fintech", "calculator", "slider", "multi-step"],
  difficulty: "hard",
  password: PASSWORD_RetirementCalculator,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_GoalCreation,
  title: "Personal Goal Creation",
  description: "Your goal is to create a new personal wellness goal. First, click the 'My Goals' link in the sidebar. Second, click the '+ Create New Goal' button. Third, in the 'Define Your Goal' step, enter 'Drink More Water' as the Goal Name, enter '8' as value in target input field, select  'glasses' from the Target dropdown, and select '7-day streak' from the Completion Metric dropdown, then click 'Next'. Fourth, in the 'Choose an Icon' step, select the 'trophy' icon from the grid. Finally, click the 'Save Goal' button. Upon completion, a password will be shown; return this password as your answer.",
  icon: "🎯",
  component:  GoalCreationExperience,
  tags: ["dashboard", "wellness", "forms", "multi-step"],
  difficulty: "hard",
  password: PASSWORD_GoalCreation,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_GoalManagement,
  title: "Goal Management",
  description: "Your goal is to manage an existing fitness goal. First, from the dashboard, find the 'Run 5k' goal and click on it to open its details. Second, in the 'Log Progress' section, enter '3k' into the input field and click 'Log Entry'. Third, click the 'Change Deadline' button, and in the calendar, select the date that is exactly one week after the original deadline. Fourth, in the 'Motivational Notes' section, enter the text 'Keep pushing!'. Finally, click the 'Save Changes' button, and then click 'Return to Dashboard'. Upon completion, a password will be shown; return this password as your answer.",
  icon: "🏃",
  component: GoalManagementExperience,
  tags: ["dashboard", "wellness", "forms", "calendar", "multi-step"],
  difficulty: "hard",
  password: PASSWORD_GoalManagement,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_TimeTracking,
  title: "Time Tracking and Entry Finalization",
  description: "Your goal is to log time for a specific task and finalize the entry. The process begins by starting a timer for a task named 'New Feature Scoping'. After stopping the timer, a draft entry is created. This draft must be edited to adjust the duration to '00:15:00' and assign it to the 'Client Meeting' category. Saving this finalized entry will reveal the password.",
  icon: "⏱️",
  component: TimeBased,
  tags: ["project management", "time tracking", "forms", "multi-stage"],
  difficulty: "medium",
  password: PASSWORD_TimeTracking,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_UserPermissions,
  title: "User Promotion and Permission Granting",
  description: "Your goal is to modify a user's role and permissions. In the user management dashboard, find the user named 'Alex Ray' who currently has the 'Contributor' role. Promote this user to 'Editor' by using Change Role option  accessible via menu button. This action will reveal a new set of permissions for that user. Grant them the 'Publish Content' permission by checking the corresponding box to complete the task and reveal the password.",
  icon: "🔐",
  component: UserManagementExperience,
  tags: ["user management", "permissions", "roles", "multi-step", "dashboard"],
  difficulty: "hard",
  password: PASSWORD_UserPermissions,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_TeamInvitation,
  title: "Team Member Invitation Workflow",
  description: "Your goal is to invite a new member to the team with specific settings. From the dashboard, initiate the invitation process. The new member's email is 'new.hire@example.com' and they should be assigned the 'Viewer' role. Next, add them to the 'Marketing Team' group. Finally, set their access to expire in '90 days'. Sending the invite after correctly configuring all steps will reveal the password.",
  icon: "✉️",
  component: TeamInvitationExperience,
  tags: ["user management", "invite", "forms", "multi-stage", "dashboard"],
  difficulty: "hard",
  password: PASSWORD_TeamInvitation,
  variant: "base",
  requires_file_upload: false,
},
{
  path: TASK_ID_NewsletterBuilder,
  title: "Newsletter Builder Drag & Drop",
  description: "Your goal is to prepare a newsletter draft. First, start by selecting the 'Weekly Digest' template. In the editor, drag the 'Featured Article' content block to be the first section directly below the header of the newsletter. Next, select the 'Featured Article' block and replace its placeholder image by pasting 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0' into the Image URL field. Finally, send a test version of the newsletter to complete the task and reveal the password.",  icon: "📰",
  component: NewsletterBuilderExperience,
  tags: ["newsletter", "builder", "drag-and-drop", "multi-stage", "editor"],
  difficulty: "hard",
  password: PASSWORD_NewsletterBuilder,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_NewsletterSchedule,
  title: "Newsletter Audience and Scheduling",
  description: "Your goal is to schedule a newsletter for a specific audience segment. From the newsletter editor, open the scheduling modal. First, create an audience rule to include subscribers where their 'Email activity' shows they have 'opened the last' '5' emails. Next, schedule the newsletter to be sent tomorrow at '9:00 AM'. Finally, ensure the option to 'send in recipient's local timezone' is enabled and confirm the schedule to reveal the password.",
  icon: "🗓️",
  component: NewsletterSchedulingExperience,
  tags: ["newsletter", "scheduling", "audience", "rules", "multi-stage"],
  difficulty: "hard",
  password: PASSWORD_NewsletterSchedule,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_ContractReview,
  title: "Contract Clause Review and Commenting",
  description: "Your goal is to review a legal document and add a specific comment. First, use the 'Highlight Clauses' tool from the right-hand panel. From the list of clause types that appears, select 'Confidentiality'. This will highlight the relevant clause in the document. Next, click on the highlighted 'Confidentiality' clause to open a comment box. In the text area, enter the comment: 'Clarify the definition of 'Confidential Information'.'. Finally, submit the comment to complete the task and reveal the password.",
  icon: "⚖️",
  component: ContractReviewExperience,
  tags: ["legal", "document review", "annotation", "forms", "multi-stage"],
  difficulty: "hard",
  password: PASSWORD_ContractReview,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_ClauseReview,
  title: "Non-Standard Contract Clause Review",
  description: "Your goal is to review several non-standard clauses in a contract. First, locate the 'Liability' clause in the review queue and accept it. Next, find the 'Jurisdiction' clause and reject it. After rejecting the clause, you must provide a reason for the rejection by entering 'Clause conflicts with local regulations.' into the text box that appears. Submit the reason to complete the review and confirm action. This will reveal the password.",
  icon: "⚖️",
  component: ContractClauseReviewExperience,
  tags: ["legal", "document review", "decision making", "forms", "multi-stage"],
  difficulty: "hard",
  password: PASSWORD_ClauseReview,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_CrowdfundingD,
  title: "Crowdfunding Pledge and Reward Selection",
  description: "Your goal is to back a crowdfunding project with a specific pledge. On the project page, find and select the reward tier named 'Digital Enthusiast'. On the next page, increase the pledge amount by exactly $10 more than the tier's minimum value. Finally, complete the process by entering the payment details: Full Name: 'Casey Becker', Card Number: '1234-5678-9012-3456', and confirming the pledge to reveal the password.",
  icon: "🎁",
  component: CrowdfundingExperience,
  tags: ["crowdfunding", "e-commerce", "payment", "forms", "multi-stage"],
  difficulty: "hard",
  password: PASSWORD_CrowdfundingD,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_ProjectHistory,
  title: "Project History and Update Commenting",
  description: "Your goal is to find a previously backed project and leave a supportive comment on its latest update. From your dashboard of backed projects, find and view the project named 'Project Aether'. Navigate to its 'Updates' tab. On the latest update (the first one in the list), leave the exact comment: 'This is looking great! Keep up the fantastic work.'. Posting the comment will complete the task and reveal the password.",
  icon: "💬",
  component: ProjectHistoryExperience,
  tags: ["dashboard", "navigation", "community", "forms", "multi-stage"],
  difficulty: "hard",
  password:PASSWORD_ProjectHistory,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_CreditBillPayment,
  title: "Bill Payment Scheduling",
  description: "Your goal is to schedule a credit card payment from your dashboard. First, find the 'Credit Card' bill and begin the scheduling process. In the scheduling modal, select the bill's due date from the calendar. Next, when presented with payment options, choose to pay the 'Minimum Amount Due' instead of the full balance. Finally, review and confirm the scheduled payment to complete the task and reveal the password.",
  icon: "💵",
  component: BillPaymentExperience,
  tags: ["fintech", "payment", "scheduling", "forms", "multi-stage"],
  difficulty: "hard",
  password: PASSWORD_CreditBillPayment,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_PayeeSetup ,
  title: " New Payee and Auto-Pay Setup",
  description: "Your task is to find the password generated after successfully setting up a new bill payee and enabling its auto-payment. The new payee information is for 'AquaFlow Utilities', a bill in the 'Water' category, using the account number 'AF-90210-C'. After the payee is created, its auto-payment must be activated with a monthly limit of $150. The process requires navigating to the 'Bill Pay' section, using the 'Add a Payee' feature, and then finding that new payee in the list to configure and activate its auto-pay settings.",
  icon: "⚙️",
  component: BankPayee,
  tags: ["fintech", "payment", "forms", "multi-stage", "dashboard"],
  difficulty: "hard",
  password: PASSWORD_PayeeSetup,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_ParticipatoryBudget,
  title: "Participatory Budget Allocation",
  description: "Your task is to find the password generated after submitting a correctly allocated city budget plan. The plan requires a precise allocation of $50,000 for 'Parks & Recreation' and $30,000 for 'Public Libraries'; the remainder of the budget will be assigned automatically. The submission must also be accompanied by the exact comment: 'Investing in libraries is crucial for community education and access to information.' The process involves using the on-screen sliders to set the funding for each category, entering the required comment into the text area, and then submitting the final budget plan.",
  icon: "🗳️",
  component: ParticipatoryBudgetExperience,
  tags: ["civic-tech", "budgeting", "interactive", "slider", "forms", "multi-stage"],
  difficulty: "hard",
  password: PASSWORD_ParticipatoryBudget,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_CommunityProjects,
  title: "Community Project Voting & Pledging",
  description: "Your goal is to review and provide feedback on several community projects. First, find the project named 'New Playground for Westside Park' and click the 'Upvote' button. Next, find the 'Downtown Parking Garage Expansion' project and click its 'Downvote' button. After upvoting the playground project, a new section will appear on its card; from the dropdown menu in this new section, pledge '5 volunteer hours' to complete the task and reveal the password.",
  icon: "👍",
  component: CommunityProjectsExperience,
  tags: ["community", "voting", "interactive", "multi-stage"],
  difficulty: "hard",
  password: PASSWORD_CommunityProjects,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_PatientPortalR,
  title: "Patient Portal Test Result Sharing",
  description: "Your task is to find the password generated by sharing a specific lab result with your doctor. The result to be shared is the 'Blood Panel' from July 10, 2025. This result must be sent with the exact accompanying message: 'Could we please discuss these results at our next appointment?'. The process involves navigating to the 'Test Results' section via the sidebar, locating and viewing the details of the correct result, and then using the 'Send to Doctor' feature to attach the message and send the report.",
  icon: "⚕️",
  component:  PatientPortalExperience,
  tags: ["healthcare", "patient portal", "forms", "multi-stage", "dashboard"],
  difficulty: "hard",
  password: PASSWORD_PatientPortalR,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_PatientCheckIn,
  title: "Patient Pre-Check-in and Consent",
  description: "Your task is to find the password generated by completing the pre-check-in for your upcoming appointment. The check-in requires you to first confirm that your personal details are correct. You must then update your current symptoms so that 'Fatigue' is removed and 'Sore Throat' is added to the list. The final step involves signing the consent form with your full name, 'Alex Chen'. The process begins by navigating to the 'Appointments' section to find and start the pre-check-in, then moving through the separate stages for details, symptoms, and consent before completing the submission.",
  icon: "📋",
  component:  PatientCheckInExperience,
  tags: ["healthcare", "patient portal", "forms", "multi-stage", "signature"],
  difficulty: "hard",
  password: PASSWORD_PatientCheckIn,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_RealEstateSearch,
  title: " Real Estate Filter and Save Search",
  description: "Your task is to find the password generated by filtering for specific real estate properties and saving the search criteria. The search must be configured to show only properties of the type 'Apartment', with '2+' or more bedrooms, and must include the 'Balcony' amenity. The process involves applying all specified criteria from the filter panel, then saving the search and confirming this choice in the pop-up modal that appears.",
  icon: "🏠",
  component: RealEstateExperience,
  tags: ["real estate", "filtering", "search", "forms", "multi-stage"],
  difficulty: "hard",
  password: PASSWORD_RealEstateSearch,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_PropertyTour,
  title: "Interactive Property Tour Scheduling",
  description: "Your task is to find the password by booking a viewing for the 'Modern Downtown Loft' property. To schedule the tour, you must first unlock the calendar by finding a hidden piece of information in the property's photo gallery. The required information is the kitchen countertop's width, which is '120 inches'. Once the calendar is unlocked with this dimension, a viewing must be booked for the '9:00 AM' time slot. The overall process involves selecting the correct property, navigating its photo gallery to find the info icon on the kitchen picture, using the revealed dimension to unlock the scheduling tool, and then booking the correct time.",
  icon: "🔑",
  component: PropertyTourExperience,
  tags: ["real estate", "interactive", "gallery", "forms", "multi-stage"],
  difficulty: "hard",
  password: PASSWORD_PropertyTour,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_RecipeApp,
  title: "Interactive Recipe and Shopping List",
  description: "Your goal is to adjust a recipe for a larger batch and add its ingredients to a shopping list. First, from the main page, find and view the recipe for 'Chocolate Chip Cookies'. On the recipe details page, use the 'Adjust Servings' feature to change the serving size from 12 to 24. After observing the ingredient quantities update, add all the ingredients to your shopping list to complete the task and reveal the password.",
  icon: "🍪",
  component: RecipeApp, 
  tags: ["recipe", "interactive", "slider", "shopping list", "multi-stage"],
  difficulty: "hard", 
  password: PASSWORD_RecipeApp,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_CookAlong,
  title: "Interactive Cook-Along Mode",
  description: "Your task is to find the password by correctly following a guided 'Cook-Along' recipe session. The key part of this session is to interact with the built-in baking timer, which becomes available on the baking step (Step 4) of the recipe instructions. The process requires you to start the 'Cook-Along' mode, navigate through the recipe steps until you reach the baking instruction, start the simulated 10-minute timer when it appears, and then immediately click the active timer again to mark it as complete. After the timer step is done, proceed to the final instruction and finish the recipe.",
  icon: "🧑‍🍳",
  component: CookAlongExperience,
  tags: ["recipe", "interactive", "guided-mode", "timer", "multi-stage"],
  difficulty: "hard",
  password: PASSWORD_CookAlong,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_StudyGroup,
  title: "Study Group Creation and Scheduling",
  description: "Your task is to find the password by creating and scheduling a new study group. The group must be for the 'Quantum Physics 101' course and configured as 'Private' (you can provide any valid name). The members to invite are 'b.carter' and 's.jones', and the first session must be scheduled for the upcoming Friday at 3:00 PM. The process requires navigating to the 'My Courses' page, selecting the correct course to start the group creation, and then completing all steps in the setup modal—settings, member invites, scheduling, and final review—to create the group.",
  icon: "👥",
  component: StudyGroupExperience,
  tags: ["education", "study-group", "scheduling", "forms", "multi-step"],
  difficulty: "hard",
  password: PASSWORD_StudyGroup,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_StudyGroupCollab,
  title: "Study Group File Upload and Discussion",
  description: "Your task is to find the password by sharing a file and starting a related discussion in your 'Quantum Physics 101' study group. A new file must be shared using the URL 'https://example.com/research-paper.pdf'. Subsequently, a new discussion thread must be created with the exact title 'Question about the research paper' and the message 'Can anyone explain the methodology described on page 3?'. The process involves navigating first to the 'Shared Files' tab to use the upload feature, and then switching to the 'Discussion Forum' tab to start and post the new thread.",
  icon: "💬",
  component: StudyGroupCollabExperience,
  tags: ["education", "collaboration", "file upload", "forum", "multi-stage"],
  difficulty: "hard",
  password: PASSWORD_StudyGroupCollab,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_LoyaltyRewards,
  title: " Loyalty Rewards Redemption",
  description: "Your task is to find the password by redeeming loyalty points for a specific coupon. From the list of available options, the reward to be redeemed is the '$5 Off Coupon', which costs 500 points. The process requires you to select the correct reward, confirm the redemption in the pop-up modal, and then use the copy feature on the subsequent screen to copy the generated coupon code.",
  icon: "🎁",
  component:  LoyaltyRewardsExperience ,
  tags: ["ecommerce", "loyalty", "rewards", "coupon", "multi-stage"],
  difficulty: "hard",
  password: PASSWORD_LoyaltyRewards,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_LoyaltyOffer,
  title: "Loyalty Offer Activation",
  description: "Your task is to find the password by activating a specific loyalty offer. The required offer is the '2x Points' multiplier for the 'Electronics' category. The process involves navigating to the 'Activate Offers' page, selecting the correct offer from the available list, proceeding to the confirmation screen, and then checking the confirmation box before finalizing the activation.",
  icon: "✨",
  component: LoyaltyOfferExperience,
  tags: ["ecommerce", "loyalty", "rewards", "interactive", "multi-stage"],
  difficulty: "hard",
  password: PASSWORD_LoyaltyOffer,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_InventoryManagement,
  title: "Product Inventory Management",
  description: "Your task is to find the password generated by correctly updating a product's inventory settings. The product to be updated is the 'Classic Leather Wallet'. Its stock quantity must be changed to 8, and the low stock alert needs to be enabled with a threshold of 5. The process requires navigating to the 'Inventory' page from the sidebar, finding the correct product, opening its edit panel to make the specified changes, and then saving the updates.",
  icon: "📦",
  component: InventoryManagementExperience,
  tags: ["ecommerce", "inventory", "dashboard", "forms", "multi-stage"],
  difficulty: "hard",
  password: PASSWORD_InventoryManagement,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_AddProduct,
  title: "Add Product to Inventory",
  description: "Your task is to find the password by adding a new product to the inventory. The new product is a 'Premium Leather Journal', which should be assigned the SKU 'JRNL-BLK-01'. For pricing, its 'Cost per item' is $15.00 and its 'Retail Price' is $45.00. The process requires navigating to the 'Inventory' page, initiating the 'Add Product' workflow, entering all the specified details into the form, and then saving the new product.",
  icon: "➕",
  component: AddProductExperience,
  tags: ["ecommerce", "inventory", "forms", "dashboard", "multi-stage"],
  difficulty: "hard",
  password: PASSWORD_AddProduct,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_MindMap,
  title: "Interactive Mind Map Creation",
  description: "Your task is to find the password by building and customizing a mind map. The central topic of the map must be 'Q3 Marketing Plan'. Three main branches must be added directly to this central topic with the names 'Social Media', 'Content', and 'Ads'. Two sub-topics, named 'Blog Posts' and 'Videos', must be added directly to the 'Content' branch. As a final step, the color of the 'Ads' branch must be changed to red by using menu options. The process requires creating a new map, using the editor to add and edit nodes to build this specific structure, applying the color change using the node's menu, and then saving the completed map.",
  icon: "🧠",
  component: MindMapExperience,
  tags: ["brainstorming", "mind map", "interactive", "canvas", "multi-stage"],
  difficulty: "hard",
  password: PASSWORD_MindMap,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_MindMapExport,
  title: "Mind Map View Management and Export",
  description: "Your task is to find the password by exporting a specifically configured view of the 'Q3 Marketing Plan' mind map. The map's structure must be adjusted before exporting. The branches named 'Social Media' and 'Ads' must be collapsed using '-' feature, to hide their sub-topics. The 'Content' branch, however, must be left expanded so its sub-topics are visible. The process involves navigating to the 'My Mind Maps' page, selecting the 'Q3 Marketing Plan' mind map to open the editor, performing the collapse actions on the specified branches, and then using the export feature to generate and copy the text in the 'Export as Outline' format.",
  icon: "📋",
  component: MindMapExportExperience,
  tags: ["brainstorming", "mind map", "interactive", "export", "multi-stage"],
  difficulty: "hard",
  password: PASSWORD_MindMapExport,
  variant: "base",
  requires_file_upload: false
},
  {
    path: TASK_ID_StockTrading,
    title: "Stock Trading Experience",
    description:
      "Your goal is to place a 'Trailing Stop' order for 'Innovate Inc.' stock. First, click the 'Portfolio' button in the sidebar. Second, click the 'Trade' button next to 'INVC' (Innovate Inc.). Third, click 'Trailing Stop' to set the order type. Fourth, click the '% Percentage' button, enter '5' as the trail value, and select 'Good 'til Canceled (GTC)' from the 'Time in Force' dropdown. Fifth, click the 'Preview Order' button. In the review modal, enter '142.50' in the 'Trade Notes' field and click the 'Confirm and Place Order' button. Upon completion, a password will be revealed; return this password as your answer.",
    icon: "📈",
    component: StockApp,
    tags: ["stock", "trading", "forms", "multi-step", "finance"],
    password: PASSWORD_StockTrading,
    difficulty: "hard",
    variant: "base",
    base_task: TASK_ID_StockTrading,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_StockBuyOrder,
    title: "Stock Trading Buy Order",
    description:
      "Your goal is to complete a multi-step stock trading workflow with specific details. First, from the randomized list of stocks, find and click on the one with the ticker symbol 'TSLA'. Second, in the buy order screen, enter '25' into the shares input field and click 'Place Market Order'. Third, on the confirmation screen, click the 'Set Stop-Loss' button. Fourth, enter '250.75' into the 'Stop Price' input field and click 'Set Stop-Loss Order'. Fifth, on the final review screen, click 'View Portfolio'. Upon completion, a password will be shown; return this password as your answer.",
    icon: "📈",
    component: StockTrading,
    tags: ["stock", "trading", "forms", "multi-step", "finance"],
    password: PASSWORD_StockBuyOrder,
    difficulty: "hard",
    variant: "base",
    base_task: TASK_ID_StockBuyOrder,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_HiringPipeline,
    title: "Dynamic Hiring Pipeline Management",
    description:
      "Your goal is to manage a candidate's application in the hiring pipeline. First, click the 'Candidate Pipeline' link in the sidebar to navigate to the Kanban board. Second, read the task instructions in the header to identify the target candidate and the required salary. Third, find the specified candidate's card in the 'Interview' stage and drag and drop it into the 'Offer' stage. Fourth, on the candidate's card, click the 'Generate Offer' button. Fifth, in the offer letter modal, enter the specified salary from the header into the 'Salary' field and click 'Send Offer Letter' button. Finally, click the 'Confirm Pipeline Changes' button at the top of the page. Upon completion, a password will be shown; return this password as your answer.",
    icon: "👥",
    component: HiringPipelineExperience,
    tags: ["dashboard", "kanban", "drag-and-drop", "dynamic", "multi-step"],
    difficulty: "hard",
    password: PASSWORD_HiringPipeline,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_JobPosting,
    title: "Dynamic Job Posting Creation",
    description:
      "Your goal is to create and publish a new job posting. First, click the 'Job Postings' link in the sidebar. Second, click the '+ Create New Posting' button. Third, read the task instructions in the header to get the details for the new role. In the `New Job Posting` modal, enter the specified Job Title and click 'Next'. Fourth, select the three required skills and from dropdown select the correct location, and then click 'Next'. Fifth, select next week's Monday as the Application Deadline. Finally, click the 'Publish Job Posting' button. Upon completion, a password will be shown; return this password as your answer.",
    icon: "📝",
    component: JobPostingExperience,
    tags: ["dashboard", "saas", "forms", "dynamic", "multi-step"],
    difficulty: "hard",
    password: PASSWORD_JobPosting,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_ProjectTask,
    title: "Dynamic Project Task Collaboration",
    description:
      "Your goal is to collaborate on a project task using the details in the header. First, click 'Project Board' in the sidebar, then find and click the task card specified in the header to open its details. In the modal window, enter a comment that includes the required @mention and click 'Add Comment & Continue'. On the next screen, create the poll by entering the task's title as the 'Poll Description', followed by the two specific poll options from the header into the option fields, and then click 'Create Poll'. Once the poll appears, vote for the first option by clicking on it. Finally, click the 'Confirm Task Update' button. A password will be shown upon completion; return this password as your answer.",
    icon: "💬",
    component: ProjectTaskExperience,
    tags: ["dashboard", "kanban", "form", "dynamic", "multi-step"],
    difficulty: "hard",
    password: PASSWORD_ProjectTask,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_TeamHuddle,
    title: "Dynamic Team Huddle Video Call",
    description:
      "Your goal is to start and manage a team video call. From the dashboard, click the 'Start Huddle' button, which is located inside the 'Quick Actions' card. On the next screen, click the '+ Start a New Huddle' button. In the lobby window that appears, enter the specific meeting code from the header into the input field and click 'Join Now'. Once you are in the call, click the share screen button (the one with the 🖥️ icon). From the modal, select the specific window to share as instructed in the header. Finally, click the red hang-up button (the one with the 📞 icon) to end the call. A password will be shown upon completion; return this password as your answer.",
    icon: "📹",
    component: TeamHuddleExperience,
    tags: ["dashboard", "collaboration", "video-call", "dynamic", "multi-step"],
    difficulty: "hard",
    password: PASSWORD_TeamHuddle,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_DocHistory,
    title: "Dynamic Document Version Restoration",
    description:
      "Your goal is to restore a specific change from a document's version history. First, read the task header to identify the target document and the specific paragraph to restore. Second, from the dashboard, find and click the specified document to open it. Third, click the 'Version History' icon in the toolbar. Fourth, click the 'Compare Versions' button to see the changes between the two most recent versions. Fifth, find the deleted paragraph that matches the one from the header instruction and click the 'Revert this change' button next to it. Sixth, click the 'Save as New Version' button. Finally, click the 'Return to Dashboard' button. Upon completion, a password will be shown; return this password as your answer.",
    icon: "📄",
    component: DocCollabExperience,
    tags: [
      "dashboard",
      "documents",
      "collaboration",
      "diff",
      "dynamic",
      "multi-step",
    ],
    difficulty: "hard",
    password: PASSWORD_DocHistory,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_ContentBranching,
    title: "Dynamic Content Branching and Review",
    description:
      "Your goal is to create a new content branch, modify it, and submit it for review. First, click the 'Content' link in the sidebar. Second, read the task instructions in the header to identify the target page, the new branch name, the banner URL, and the required reviewer. Third, find the specified page and click its 'Create Branch' button. In the modal, enter the specified branch name and click 'Create'. Fourth, in the branch editor, paste the specified banner URL into the 'Banner Image URL' field. Fifth, click the 'Submit for Review' button. In the next modal, select the specified reviewer from the dropdown and click 'Submit'. Finally, click the 'Return to Dashboard' button. Upon completion, a password will be shown; return this password as your answer.",
    icon: "🌿",
    component: ContentBranchingExperience,
    tags: ["dashboard", "cms", "git", "branching", "dynamic", "multi-step"],
    difficulty: "hard",
    password: PASSWORD_ContentBranching,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_RetirementPlan,
    title: "Dynamic Retirement Plan Adjustment",
    description:
      "Your goal is to adjust your retirement plan by following the multi-step process using the instructions in the header. First, click the 'Retirement Plan' link in the sidebar. In the 'Monthly Contribution' step, use the slider to set your contribution to the exact dollar amount specified in the header, then click 'Next'. On the 'Investment Risk Tolerance' screen, select the risk profile required by the header instructions and click 'Next'. On the final 'Retirement Goals' screen, select the specific goal mentioned in the header from the list of options. Finally, click the 'Save Changes' button. A password will be shown upon completion; return this password as your answer.",
    icon: "💰",
    component: RetirementPlanExperience,
    tags: ["dashboard", "fintech", "forms", "slider", "dynamic", "multi-step"],
    difficulty: "hard",
    password: PASSWORD_RetirementPlan,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_CryptoStaking,
    title: "Dynamic Crypto Token Staking",
    description:
      "Your goal is to stake a specific crypto token with a chosen validator. First, read the task instructions in the header to identify the target token, the validator, and the amount to stake. Second, from the dashboard, find the specified token in the 'My Assets' list and click its 'Stake' button. Third, on the staking page, find the specified validator (ensure their commission is less than 5%) and click 'Delegate' button of that validator. Fourth, in the modal, enter the specified amount of tokens to stake and click 'Confirm Stake' button. Finally, click the 'Return to Dashboard' button. Upon completion, a password will be shown; return this password as your answer.",
    icon: "🪙",
    component: CryptoStakingExperience,
    tags: ["crypto", "staking", "dashboard", "dynamic", "multi-step"],
    difficulty: "hard",
    password: PASSWORD_CryptoStaking,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_IoT,
    title: "IoT Device Troubleshooting",
    description:
      "Your goal is to troubleshoot an unresponsive smart device. First, on the dashboard, find the 'Living Room Light' which is marked as 'Unresponsive' and click on it. Second, in the troubleshooting guide that appears, click the 'Power Cycle' button. Third, click the 'Check Wi-Fi' button. Finally, after the device status updates to 'Online', click the 'Done' button to close the guide. Upon completion, a password will be shown; return this password as your answer.",
    icon: "💡",
    component: IoTExperience,
    tags: ["dashboard", "iot", "troubleshooting", "multi-step"],
    difficulty: "hard",
    password: PASSWORD_IoT,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_NetworkDiagnostic,
    title: "Network Diagnostic & Help Center",
    description:
      "Your goal is to troubleshoot a network error using the help center. First, click the 'Settings' link in the sidebar. Second, in the 'Network' section, click the 'Run Diagnostic' button. Third, when the test fails, click the 'Copy Error Code' button to copy the error code. Fourth, click the 'Help Center' link in the sidebar. Fifth, paste the copied error code into the search bar and click 'Search'. Finally, click the 'Mark as Resolved' button that appears. Upon completion, a password will be shown; return this password as your answer.",
    icon: "🌐",
    component: NetworkDiagnosticExperience,
    tags: [
      "dashboard",
      "settings",
      "help-center",
      "dynamic-data",
      "multi-step",
    ],
    difficulty: "hard",
    password: PASSWORD_NetworkDiagnostic,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_GuidedWorkout,
    title: " Guided Workout Session",
    description:
      "Your goal is to complete the 'Full Body Strength' guided workout by performing a specific sequence of actions. First, from the dashboard, find the 'Full Body Strength' workout card and click its 'Start Workout' button. For the first exercise (Push-ups), use the rep controls to set the count to '13', and then click the 'Check Form' button. On the second exercise (Squats), set the reps to '8', and then click the 'Next Exercise' button. For the final exercise (Plank), click 'Finish Exercise'. After the workout is complete, give it a 5-star rating by clicking the fifth star, and finally, click the 'Back to Dashboard' button. A password will be shown upon completion; return this password as your answer.",
    icon: "💪",
    component: GuidedWorkoutExperience,
    tags: ["dashboard", "fitness", "ui-interaction", "multi-step"],
    difficulty: "hard",
    password: PASSWORD_GuidedWorkout,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_RetirementCalculator,
    title: "Retirement Calculator Interaction",
    description:
      "Your goal is to use the retirement calculator to model a new scenario. First, click the 'Calculators' link in the sidebar, then select the 'Retirement Calculator'. Second, on the calculator page, use the slider to change your planned retirement age from 65 to 62. Third, after observing the change in the projected monthly income, click the 'Schedule a consultation' button. Finally, in the confirmation modal, click the 'Return to Dashboard' button. Upon completion, a password will be shown; return this password as your answer.",
    icon: "🧮",
    component: RetirementCalculatorExperience,
    tags: ["dashboard", "fintech", "calculator", "slider", "multi-step"],
    difficulty: "hard",
    password: PASSWORD_RetirementCalculator,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_GoalCreation,
    title: "Personal Goal Creation",
    description:
      "Your goal is to create a new personal wellness goal. First, click the 'My Goals' link in the sidebar. Second, click the '+ Create New Goal' button. Third, in the 'Define Your Goal' step, enter 'Drink More Water' as the Goal Name, enter '8' as value in target input field, select  'glasses' from the Target dropdown, and select '7-day streak' from the Completion Metric dropdown, then click 'Next'. Fourth, in the 'Choose an Icon' step, select the 'trophy' icon from the grid. Finally, click the 'Save Goal' button. Upon completion, a password will be shown; return this password as your answer.",
    icon: "🎯",
    component: GoalCreationExperience,
    tags: ["dashboard", "wellness", "forms", "multi-step"],
    difficulty: "hard",
    password: PASSWORD_GoalCreation,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_GoalManagement,
    title: "Goal Management",
    description:
      "Your goal is to manage an existing fitness goal. First, from the dashboard, find the 'Run 5k' goal and click on it to open its details. Second, in the 'Log Progress' section, enter '3k' into the input field and click 'Log Entry'. Third, click the 'Change Deadline' button, and in the calendar, select the date that is exactly one week after the original deadline. Fourth, in the 'Motivational Notes' section, enter the text 'Keep pushing!'. Finally, click the 'Save Changes' button, and then click 'Return to Dashboard'. Upon completion, a password will be shown; return this password as your answer.",
    icon: "🏃",
    component: GoalManagementExperience,
    tags: ["dashboard", "wellness", "forms", "calendar", "multi-step"],
    difficulty: "hard",
    password: PASSWORD_GoalManagement,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_TimeTracking,
    title: "Time Tracking and Entry Finalization",
    description:
      "Your goal is to log time for a specific task and finalize the entry. The process begins by starting a timer for a task named 'New Feature Scoping'. After stopping the timer, a draft entry is created. This draft must be edited to adjust the duration to '00:15:00' and assign it to the 'Client Meeting' category. Saving this finalized entry will reveal the password.",
    icon: "⏱️",
    component: TimeBased,
    tags: ["project management", "time tracking", "forms", "multi-stage"],
    difficulty: "medium",
    password: PASSWORD_TimeTracking,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_UserPermissions,
    title: "User Promotion and Permission Granting",
    description:
      "Your goal is to modify a user's role and permissions. In the user management dashboard, find the user named 'Alex Ray' who currently has the 'Contributor' role. Promote this user to 'Editor' by using Change Role option  accessible via menu button. This action will reveal a new set of permissions for that user. Grant them the 'Publish Content' permission by checking the corresponding box to complete the task and reveal the password.",
    icon: "🔐",
    component: UserManagementExperience,
    tags: [
      "user management",
      "permissions",
      "roles",
      "multi-step",
      "dashboard",
    ],
    difficulty: "hard",
    password: PASSWORD_UserPermissions,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_TeamInvitation,
    title: "Team Member Invitation Workflow",
    description:
      "Your goal is to invite a new member to the team with specific settings. From the dashboard, initiate the invitation process. The new member's email is 'new.hire@example.com' and they should be assigned the 'Viewer' role. Next, add them to the 'Marketing Team' group. Finally, set their access to expire in '90 days'. Sending the invite after correctly configuring all steps will reveal the password.",
    icon: "✉️",
    component: TeamInvitationExperience,
    tags: ["user management", "invite", "forms", "multi-stage", "dashboard"],
    difficulty: "hard",
    password: PASSWORD_TeamInvitation,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_NewsletterBuilder,
    title: "Newsletter Builder Drag & Drop",
    description:
      "Your goal is to prepare a newsletter draft. First, start by selecting the 'Weekly Digest' template. In the editor, drag the 'Featured Article' content block to be the first section directly below the header of the newsletter. Next, select the 'Featured Article' block and replace its placeholder image by pasting 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0' into the Image URL field. Finally, send a test version of the newsletter to complete the task and reveal the password.",
    icon: "📰",
    component: NewsletterBuilderExperience,
    tags: ["newsletter", "builder", "drag-and-drop", "multi-stage", "editor"],
    difficulty: "hard",
    password: PASSWORD_NewsletterBuilder,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_NewsletterSchedule,
    title: "Newsletter Audience and Scheduling",
    description:
      "Your goal is to schedule a newsletter for a specific audience segment. From the newsletter editor, open the scheduling modal. First, create an audience rule to include subscribers where their 'Email activity' shows they have 'opened the last' '5' emails. Next, schedule the newsletter to be sent tomorrow at '9:00 AM'. Finally, ensure the option to 'send in recipient's local timezone' is enabled and confirm the schedule to reveal the password.",
    icon: "🗓️",
    component: NewsletterSchedulingExperience,
    tags: ["newsletter", "scheduling", "audience", "rules", "multi-stage"],
    difficulty: "hard",
    password: PASSWORD_NewsletterSchedule,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_ContractReview,
    title: "Contract Clause Review and Commenting",
    description:
      "Your goal is to review a legal document and add a specific comment. First, use the 'Highlight Clauses' tool from the right-hand panel. From the list of clause types that appears, select 'Confidentiality'. This will highlight the relevant clause in the document. Next, click on the highlighted 'Confidentiality' clause to open a comment box. In the text area, enter the comment: 'Clarify the definition of 'Confidential Information'.'. Finally, submit the comment to complete the task and reveal the password.",
    icon: "⚖️",
    component: ContractReviewExperience,
    tags: ["legal", "document review", "annotation", "forms", "multi-stage"],
    difficulty: "hard",
    password: PASSWORD_ContractReview,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_ClauseReview,
    title: "Non-Standard Contract Clause Review",
    description:
      "Your goal is to review several non-standard clauses in a contract. First, locate the 'Liability' clause in the review queue and accept it. Next, find the 'Jurisdiction' clause and reject it. After rejecting the clause, you must provide a reason for the rejection by entering 'Clause conflicts with local regulations.' into the text box that appears. Submit the reason to complete the review and confirm action. This will reveal the password.",
    icon: "⚖️",
    component: ContractClauseReviewExperience,
    tags: [
      "legal",
      "document review",
      "decision making",
      "forms",
      "multi-stage",
    ],
    difficulty: "hard",
    password: PASSWORD_ClauseReview,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_CrowdfundingD,
    title: "Crowdfunding Pledge and Reward Selection",
    description:
      "Your goal is to back a crowdfunding project with a specific pledge. On the project page, find and select the reward tier named 'Digital Enthusiast'. On the next page, increase the pledge amount by exactly $10 more than the tier's minimum value. Finally, complete the process by entering the payment details: Full Name: 'Casey Becker', Card Number: '1234-5678-9012-3456', and confirming the pledge to reveal the password.",
    icon: "🎁",
    component: CrowdfundingExperience,
    tags: ["crowdfunding", "e-commerce", "payment", "forms", "multi-stage"],
    difficulty: "hard",
    password: PASSWORD_CrowdfundingD,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_ProjectHistory,
    title: "Project History and Update Commenting",
    description:
      "Your goal is to find a previously backed project and leave a supportive comment on its latest update. From your dashboard of backed projects, find and view the project named 'Project Aether'. Navigate to its 'Updates' tab. On the latest update (the first one in the list), leave the exact comment: 'This is looking great! Keep up the fantastic work.'. Posting the comment will complete the task and reveal the password.",
    icon: "💬",
    component: ProjectHistoryExperience,
    tags: ["dashboard", "navigation", "community", "forms", "multi-stage"],
    difficulty: "hard",
    password: PASSWORD_ProjectHistory,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_CreditBillPayment,
    title: "Bill Payment Scheduling",
    description:
      "Your goal is to schedule a credit card payment from your dashboard. First, find the 'Credit Card' bill and begin the scheduling process. In the scheduling modal, select the bill's due date from the calendar. Next, when presented with payment options, choose to pay the 'Minimum Amount Due' instead of the full balance. Finally, review and confirm the scheduled payment to complete the task and reveal the password.",
    icon: "💵",
    component: BillPaymentExperience,
    tags: ["fintech", "payment", "scheduling", "forms", "multi-stage"],
    difficulty: "hard",
    password: PASSWORD_CreditBillPayment,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_PayeeSetup,
    title: " New Payee and Auto-Pay Setup",
    description:
      "Your task is to find the password generated after successfully setting up a new bill payee and enabling its auto-payment. The new payee information is for 'AquaFlow Utilities', a bill in the 'Water' category, using the account number 'AF-90210-C'. After the payee is created, its auto-payment must be activated with a monthly limit of $150. The process requires navigating to the 'Bill Pay' section, using the 'Add a Payee' feature, and then finding that new payee in the list to configure and activate its auto-pay settings.",
    icon: "⚙️",
    component: BankPayee,
    tags: ["fintech", "payment", "forms", "multi-stage", "dashboard"],
    difficulty: "hard",
    password: PASSWORD_PayeeSetup,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_ParticipatoryBudget,
    title: "Participatory Budget Allocation",
    description:
      "Your task is to find the password generated after submitting a correctly allocated city budget plan. The plan requires a precise allocation of $50,000 for 'Parks & Recreation' and $30,000 for 'Public Libraries'; the remainder of the budget will be assigned automatically. The submission must also be accompanied by the exact comment: 'Investing in libraries is crucial for community education and access to information.' The process involves using the on-screen sliders to set the funding for each category, entering the required comment into the text area, and then submitting the final budget plan.",
    icon: "🗳️",
    component: ParticipatoryBudgetExperience,
    tags: [
      "civic-tech",
      "budgeting",
      "interactive",
      "slider",
      "forms",
      "multi-stage",
    ],
    difficulty: "hard",
    password: PASSWORD_ParticipatoryBudget,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_CommunityProjects,
    title: "Community Project Voting & Pledging",
    description:
      "Your goal is to review and provide feedback on several community projects. First, find the project named 'New Playground for Westside Park' and click the 'Upvote' button. Next, find the 'Downtown Parking Garage Expansion' project and click its 'Downvote' button. After upvoting the playground project, a new section will appear on its card; from the dropdown menu in this new section, pledge '5 volunteer hours' to complete the task and reveal the password.",
    icon: "👍",
    component: CommunityProjectsExperience,
    tags: ["community", "voting", "interactive", "multi-stage"],
    difficulty: "hard",
    password: PASSWORD_CommunityProjects,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_PatientPortalR,
    title: "Patient Portal Test Result Sharing",
    description:
      "Your task is to find the password generated by sharing a specific lab result with your doctor. The result to be shared is the 'Blood Panel' from July 10, 2025. This result must be sent with the exact accompanying message: 'Could we please discuss these results at our next appointment?'. The process involves navigating to the 'Test Results' section via the sidebar, locating and viewing the details of the correct result, and then using the 'Send to Doctor' feature to attach the message and send the report.",
    icon: "⚕️",
    component: PatientPortalExperience,
    tags: ["healthcare", "patient portal", "forms", "multi-stage", "dashboard"],
    difficulty: "hard",
    password: PASSWORD_PatientPortalR,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_PatientCheckIn,
    title: "Patient Pre-Check-in and Consent",
    description:
      "Your task is to find the password generated by completing the pre-check-in for your upcoming appointment. The check-in requires you to first confirm that your personal details are correct. You must then update your current symptoms so that 'Fatigue' is removed and 'Sore Throat' is added to the list. The final step involves signing the consent form with your full name, 'Alex Chen'. The process begins by navigating to the 'Appointments' section to find and start the pre-check-in, then moving through the separate stages for details, symptoms, and consent before completing the submission.",
    icon: " clipboard",
    component: PatientCheckInExperience,
    tags: ["healthcare", "patient portal", "forms", "multi-stage", "signature"],
    difficulty: "hard",
    password: PASSWORD_PatientCheckIn,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_RealEstateSearch,
    title: " Real Estate Filter and Save Search",
    description:
      "Your task is to find the password generated by filtering for specific real estate properties and saving the search criteria. The search must be configured to show only properties of the type 'Apartment', with '2+' or more bedrooms, and must include the 'Balcony' amenity. The process involves applying all specified criteria from the filter panel, then saving the search and confirming this choice in the pop-up modal that appears.",
    icon: "🏠",
    component: RealEstateExperience,
    tags: ["real estate", "filtering", "search", "forms", "multi-stage"],
    difficulty: "hard",
    password: PASSWORD_RealEstateSearch,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_PropertyTour,
    title: "Interactive Property Tour Scheduling",
    description:
      "Your task is to find the password by booking a viewing for the 'Modern Downtown Loft' property. To schedule the tour, you must first unlock the calendar by finding a hidden piece of information in the property's photo gallery. The required information is the kitchen countertop's width, which is '120 inches'. Once the calendar is unlocked with this dimension, a viewing must be booked for the '9:00 AM' time slot. The overall process involves selecting the correct property, navigating its photo gallery to find the info icon on the kitchen picture, using the revealed dimension to unlock the scheduling tool, and then booking the correct time.",
    icon: "🔑",
    component: PropertyTourExperience,
    tags: ["real estate", "interactive", "gallery", "forms", "multi-stage"],
    difficulty: "hard",
    password: PASSWORD_PropertyTour,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_RecipeApp,
    title: "Interactive Recipe and Shopping List",
    description:
      "Your goal is to adjust a recipe for a larger batch and add its ingredients to a shopping list. First, from the main page, find and view the recipe for 'Chocolate Chip Cookies'. On the recipe details page, use the 'Adjust Servings' feature to change the serving size from 12 to 24. After observing the ingredient quantities update, add all the ingredients to your shopping list to complete the task and reveal the password.",
    icon: "🍪",
    component: RecipeApp,
    tags: ["recipe", "interactive", "slider", "shopping list", "multi-stage"],
    difficulty: "hard",
    password: PASSWORD_RecipeApp,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_CookAlong,
    title: "Interactive Cook-Along Mode",
    description:
      "Your task is to find the password by correctly following a guided 'Cook-Along' recipe session. The key part of this session is to interact with the built-in baking timer, which becomes available on the baking step (Step 4) of the recipe instructions. The process requires you to start the 'Cook-Along' mode, navigate through the recipe steps until you reach the baking instruction, start the simulated 10-minute timer when it appears, and then immediately click the active timer again to mark it as complete. After the timer step is done, proceed to the final instruction and finish the recipe.",
    icon: "🧑‍🍳",
    component: CookAlongExperience,
    tags: ["recipe", "interactive", "guided-mode", "timer", "multi-stage"],
    difficulty: "hard",
    password: PASSWORD_CookAlong,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_StudyGroup,
    title: "Study Group Creation and Scheduling",
    description:
      "Your task is to find the password by creating and scheduling a new study group. The group must be for the 'Quantum Physics 101' course and configured as 'Private' (you can provide any valid name). The members to invite are 'b.carter' and 's.jones', and the first session must be scheduled for the upcoming Friday at 3:00 PM. The process requires navigating to the 'My Courses' page, selecting the correct course to start the group creation, and then completing all steps in the setup modal—settings, member invites, scheduling, and final review—to create the group.",
    icon: "👥",
    component: StudyGroupExperience,
    tags: ["education", "study-group", "scheduling", "forms", "multi-step"],
    difficulty: "hard",
    password: PASSWORD_StudyGroup,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_StudyGroupCollab,
    title: "Study Group File Upload and Discussion",
    description:
      "Your task is to find the password by sharing a file and starting a related discussion in your 'Quantum Physics 101' study group. A new file must be shared using the URL 'https://example.com/research-paper.pdf'. Subsequently, a new discussion thread must be created with the exact title 'Question about the research paper' and the message 'Can anyone explain the methodology described on page 3?'. The process involves navigating first to the 'Shared Files' tab to use the upload feature, and then switching to the 'Discussion Forum' tab to start and post the new thread.",
    icon: "💬",
    component: StudyGroupCollabExperience,
    tags: ["education", "collaboration", "file upload", "forum", "multi-stage"],
    difficulty: "hard",
    password: PASSWORD_StudyGroupCollab,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_LoyaltyRewards,
    title: " Loyalty Rewards Redemption",
    description:
      "Your task is to find the password by redeeming loyalty points for a specific coupon. From the list of available options, the reward to be redeemed is the '$5 Off Coupon', which costs 500 points. The process requires you to select the correct reward, confirm the redemption in the pop-up modal, and then use the copy feature on the subsequent screen to copy the generated coupon code.",
    icon: "🎁",
    component: LoyaltyRewardsExperience,
    tags: ["ecommerce", "loyalty", "rewards", "coupon", "multi-stage"],
    difficulty: "hard",
    password: PASSWORD_LoyaltyRewards,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_LoyaltyOffer,
    title: "Loyalty Offer Activation",
    description:
      "Your task is to find the password by activating a specific loyalty offer. The required offer is the '2x Points' multiplier for the 'Electronics' category. The process involves navigating to the 'Activate Offers' page, selecting the correct offer from the available list, proceeding to the confirmation screen, and then checking the confirmation box before finalizing the activation.",
    icon: "✨",
    component: LoyaltyOfferExperience,
    tags: ["ecommerce", "loyalty", "rewards", "interactive", "multi-stage"],
    difficulty: "hard",
    password: PASSWORD_LoyaltyOffer,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_InventoryManagement,
    title: "Product Inventory Management",
    description:
      "Your task is to find the password generated by correctly updating a product's inventory settings. The product to be updated is the 'Classic Leather Wallet'. Its stock quantity must be changed to 8, and the low stock alert needs to be enabled with a threshold of 5. The process requires navigating to the 'Inventory' page from the sidebar, finding the correct product, opening its edit panel to make the specified changes, and then saving the updates.",
    icon: "📦",
    component: InventoryManagementExperience,
    tags: ["ecommerce", "inventory", "dashboard", "forms", "multi-stage"],
    difficulty: "hard",
    password: PASSWORD_InventoryManagement,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_AddProduct,
    title: "Add Product to Inventory",
    description:
      "Your task is to find the password by adding a new product to the inventory. The new product is a 'Premium Leather Journal', which should be assigned the SKU 'JRNL-BLK-01'. For pricing, its 'Cost per item' is $15.00 and its 'Retail Price' is $45.00. The process requires navigating to the 'Inventory' page, initiating the 'Add Product' workflow, entering all the specified details into the form, and then saving the new product.",
    icon: "➕",
    component: AddProductExperience,
    tags: ["ecommerce", "inventory", "forms", "dashboard", "multi-stage"],
    difficulty: "hard",
    password: PASSWORD_AddProduct,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_MindMap,
    title: "Interactive Mind Map Creation",
    description:
      "Your task is to find the password by building and customizing a mind map. The central topic of the map must be 'Q3 Marketing Plan'. Three main branches must be added directly to this central topic with the names 'Social Media', 'Content', and 'Ads'. Two sub-topics, named 'Blog Posts' and 'Videos', must be added directly to the 'Content' branch. As a final step, the color of the 'Ads' branch must be changed to red by using menu options. The process requires creating a new map, using the editor to add and edit nodes to build this specific structure, applying the color change using the node's menu, and then saving the completed map.",
    icon: "🧠",
    component: MindMapExperience,
    tags: ["brainstorming", "mind map", "interactive", "canvas", "multi-stage"],
    difficulty: "hard",
    password: PASSWORD_MindMap,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_MindMapExport,
    title: "Mind Map View Management and Export",
    description:
      "Your task is to find the password by exporting a specifically configured view of the 'Q3 Marketing Plan' mind map. The map's structure must be adjusted before exporting. The branches named 'Social Media' and 'Ads' must be collapsed using '-' feature, to hide their sub-topics. The 'Content' branch, however, must be left expanded so its sub-topics are visible. The process involves navigating to the 'My Mind Maps' page, selecting the 'Q3 Marketing Plan' mind map to open the editor, performing the collapse actions on the specified branches, and then using the export feature to generate and copy the text in the 'Export as Outline' format.",
    icon: "📋",
    component: MindMapExportExperience,
    tags: ["brainstorming", "mind map", "interactive", "export", "multi-stage"],
    difficulty: "hard",
    password: PASSWORD_MindMapExport,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_StockTrading,
    title: "Stock Trading Experience",
    description:
      "Your goal is to place a 'Trailing Stop' order for 'Innovate Inc.' stock. First, click the 'Portfolio' button in the sidebar. Second, click the 'Trade' button next to 'INVC' (Innovate Inc.). Third, click 'Trailing Stop' to set the order type. Fourth, click the '% Percentage' button, enter '5' as the trail value, and select 'Good 'til Canceled (GTC)' from the 'Time in Force' dropdown. Fifth, click the 'Preview Order' button. In the review modal, enter '142.50' in the 'Trade Notes' field and click the 'Confirm and Place Order' button. Upon completion, a password will be revealed; return this password as your answer.",
    icon: "📈",
    component: StockApp,
    tags: ["stock", "trading", "forms", "multi-step", "finance"],
    password: PASSWORD_StockTrading,
    difficulty: "hard",
    variant: "base",
    base_task: TASK_ID_StockTrading,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_StockBuyOrder,
    title: "Stock Trading Buy Order",
    description:
      "Your goal is to complete a multi-step stock trading workflow with specific details. First, from the randomized list of stocks, find and click on the one with the ticker symbol 'TSLA'. Second, in the buy order screen, enter '25' into the shares input field and click 'Place Market Order'. Third, on the confirmation screen, click the 'Set Stop-Loss' button. Fourth, enter '250.75' into the 'Stop Price' input field and click 'Set Stop-Loss Order'. Fifth, on the final review screen, click 'View Portfolio'. Upon completion, a password will be shown; return this password as your answer.",
    icon: "📈",
    component: StockTrading,
    tags: ["stock", "trading", "forms", "multi-step", "finance"],
    password: PASSWORD_StockBuyOrder,
    difficulty: "hard",
    variant: "base",
    base_task: TASK_ID_StockBuyOrder,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_HiringPipeline,
    title: "Dynamic Hiring Pipeline Management",
    description:
      "Your goal is to manage a candidate's application in the hiring pipeline. First, click the 'Candidate Pipeline' link in the sidebar to navigate to the Kanban board. Second, read the task instructions in the header to identify the target candidate and the required salary. Third, find the specified candidate's card in the 'Interview' stage and drag and drop it into the 'Offer' stage. Fourth, on the candidate's card, click the 'Generate Offer' button. Fifth, in the offer letter modal, enter the specified salary from the header into the 'Salary' field and click 'Send Offer Letter' button. Finally, click the 'Confirm Pipeline Changes' button at the top of the page. Upon completion, a password will be shown; return this password as your answer.",
    icon: "👥",
    component: HiringPipelineExperience,
    tags: ["dashboard", "kanban", "drag-and-drop", "dynamic", "multi-step"],
    difficulty: "hard",
    password: PASSWORD_HiringPipeline,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_JobPosting,
    title: "Dynamic Job Posting Creation",
    description:
      "Your goal is to create and publish a new job posting. First, click the 'Job Postings' link in the sidebar. Second, click the '+ Create New Posting' button. Third, read the task instructions in the header to get the details for the new role. In the `New Job Posting` modal, enter the specified Job Title and click 'Next'. Fourth, select the three required skills and from dropdown select the correct location, and then click 'Next'. Fifth, select next week's Monday as the Application Deadline. Finally, click the 'Publish Job Posting' button. Upon completion, a password will be shown; return this password as your answer.",
    icon: "📝",
    component: JobPostingExperience,
    tags: ["dashboard", "saas", "forms", "dynamic", "multi-step"],
    difficulty: "hard",
    password: PASSWORD_JobPosting,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_ProjectTask,
    title: "Dynamic Project Task Collaboration",
    description:
      "Your goal is to collaborate on a project task using the details in the header. First, click 'Project Board' in the sidebar, then find and click the task card specified in the header to open its details. In the modal window, enter a comment that includes the required @mention and click 'Add Comment & Continue'. On the next screen, create the poll by entering the task's title as the 'Poll Description', followed by the two specific poll options from the header into the option fields, and then click 'Create Poll'. Once the poll appears, vote for the first option by clicking on it. Finally, click the 'Confirm Task Update' button. A password will be shown upon completion; return this password as your answer.",
    icon: "💬",
    component: ProjectTaskExperience,
    tags: ["dashboard", "kanban", "form", "dynamic", "multi-step"],
    difficulty: "hard",
    password: PASSWORD_ProjectTask,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_TeamHuddle,
    title: "Dynamic Team Huddle Video Call",
    description:
      "Your goal is to start and manage a team video call. From the dashboard, click the 'Start Huddle' button, which is located inside the 'Quick Actions' card. On the next screen, click the '+ Start a New Huddle' button. In the lobby window that appears, enter the specific meeting code from the header into the input field and click 'Join Now'. Once you are in the call, click the share screen button (the one with the 🖥️ icon). From the modal, select the specific window to share as instructed in the header. Finally, click the red hang-up button (the one with the 📞 icon) to end the call. A password will be shown upon completion; return this password as your answer.",
    icon: "📹",
    component: TeamHuddleExperience,
    tags: ["dashboard", "collaboration", "video-call", "dynamic", "multi-step"],
    difficulty: "hard",
    password: PASSWORD_TeamHuddle,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_DocHistory,
    title: "Dynamic Document Version Restoration",
    description:
      "Your goal is to restore a specific change from a document's version history. First, read the task header to identify the target document and the specific paragraph to restore. Second, from the dashboard, find and click the specified document to open it. Third, click the 'Version History' icon in the toolbar. Fourth, click the 'Compare Versions' button to see the changes between the two most recent versions. Fifth, find the deleted paragraph that matches the one from the header instruction and click the 'Revert this change' button next to it. Sixth, click the 'Save as New Version' button. Finally, click the 'Return to Dashboard' button. Upon completion, a password will be shown; return this password as your answer.",
    icon: "📄",
    component: DocCollabExperience,
    tags: [
      "dashboard",
      "documents",
      "collaboration",
      "diff",
      "dynamic",
      "multi-step",
    ],
    difficulty: "hard",
    password: PASSWORD_DocHistory,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_ContentBranching,
    title: "Dynamic Content Branching and Review",
    description:
      "Your goal is to create a new content branch, modify it, and submit it for review. First, click the 'Content' link in the sidebar. Second, read the task instructions in the header to identify the target page, the new branch name, the banner URL, and the required reviewer. Third, find the specified page and click its 'Create Branch' button. In the modal, enter the specified branch name and click 'Create'. Fourth, in the branch editor, paste the specified banner URL into the 'Banner Image URL' field. Fifth, click the 'Submit for Review' button. In the next modal, select the specified reviewer from the dropdown and click 'Submit'. Finally, click the 'Return to Dashboard' button. Upon completion, a password will be shown; return this password as your answer.",
    icon: "🌿",
    component: ContentBranchingExperience,
    tags: ["dashboard", "cms", "git", "branching", "dynamic", "multi-step"],
    difficulty: "hard",
    password: PASSWORD_ContentBranching,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_RetirementPlan,
    title: "Dynamic Retirement Plan Adjustment",
    description:
      "Your goal is to adjust your retirement plan by following the multi-step process using the instructions in the header. First, click the 'Retirement Plan' link in the sidebar. In the 'Monthly Contribution' step, use the slider to set your contribution to the exact dollar amount specified in the header, then click 'Next'. On the 'Investment Risk Tolerance' screen, select the risk profile required by the header instructions and click 'Next'. On the final 'Retirement Goals' screen, select the specific goal mentioned in the header from the list of options. Finally, click the 'Save Changes' button. A password will be shown upon completion; return this password as your answer.",
    icon: "💰",
    component: RetirementPlanExperience,
    tags: ["dashboard", "fintech", "forms", "slider", "dynamic", "multi-step"],
    difficulty: "hard",
    password: PASSWORD_RetirementPlan,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_CryptoStaking,
    title: "Dynamic Crypto Token Staking",
    description:
      "Your goal is to stake a specific crypto token with a chosen validator. First, read the task instructions in the header to identify the target token, the validator, and the amount to stake. Second, from the dashboard, find the specified token in the 'My Assets' list and click its 'Stake' button. Third, on the staking page, find the specified validator (ensure their commission is less than 5%) and click 'Delegate' button of that validator. Fourth, in the modal, enter the specified amount of tokens to stake and click 'Confirm Stake' button. Finally, click the 'Return to Dashboard' button. Upon completion, a password will be shown; return this password as your answer.",
    icon: "🪙",
    component: CryptoStakingExperience,
    tags: ["crypto", "staking", "dashboard", "dynamic", "multi-step"],
    difficulty: "hard",
    password: PASSWORD_CryptoStaking,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_IoT,
    title: "IoT Device Troubleshooting",
    description:
      "Your goal is to troubleshoot an unresponsive smart device. First, on the dashboard, find the 'Living Room Light' which is marked as 'Unresponsive' and click on it. Second, in the troubleshooting guide that appears, click the 'Power Cycle' button. Third, click the 'Check Wi-Fi' button. Finally, after the device status updates to 'Online', click the 'Done' button to close the guide. Upon completion, a password will be shown; return this password as your answer.",
    icon: "💡",
    component: IoTExperience,
    tags: ["dashboard", "iot", "troubleshooting", "multi-step"],
    difficulty: "hard",
    password: PASSWORD_IoT,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_NetworkDiagnostic,
    title: "Network Diagnostic & Help Center",
    description:
      "Your goal is to troubleshoot a network error using the help center. First, click the 'Settings' link in the sidebar. Second, in the 'Network' section, click the 'Run Diagnostic' button. Third, when the test fails, click the 'Copy Error Code' button to copy the error code. Fourth, click the 'Help Center' link in the sidebar. Fifth, paste the copied error code into the search bar and click 'Search'. Finally, click the 'Mark as Resolved' button that appears. Upon completion, a password will be shown; return this password as your answer.",
    icon: "🌐",
    component: NetworkDiagnosticExperience,
    tags: [
      "dashboard",
      "settings",
      "help-center",
      "dynamic-data",
      "multi-step",
    ],
    difficulty: "hard",
    password: PASSWORD_NetworkDiagnostic,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_GuidedWorkout,
    title: " Guided Workout Session",
    description:
      "Your goal is to complete the 'Full Body Strength' guided workout by performing a specific sequence of actions. First, from the dashboard, find the 'Full Body Strength' workout card and click its 'Start Workout' button. For the first exercise (Push-ups), use the rep controls to set the count to '13', and then click the 'Check Form' button. On the second exercise (Squats), set the reps to '8', and then click the 'Next Exercise' button. For the final exercise (Plank), click 'Finish Exercise'. After the workout is complete, give it a 5-star rating by clicking the fifth star, and finally, click the 'Back to Dashboard' button. A password will be shown upon completion; return this password as your answer.",
    icon: "💪",
    component: GuidedWorkoutExperience,
    tags: ["dashboard", "fitness", "ui-interaction", "multi-step"],
    difficulty: "hard",
    password: PASSWORD_GuidedWorkout,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_RetirementCalculator,
    title: "Retirement Calculator Interaction",
    description:
      "Your goal is to use the retirement calculator to model a new scenario. First, click the 'Calculators' link in the sidebar, then select the 'Retirement Calculator'. Second, on the calculator page, use the slider to change your planned retirement age from 65 to 62. Third, after observing the change in the projected monthly income, click the 'Schedule a consultation' button. Finally, in the confirmation modal, click the 'Return to Dashboard' button. Upon completion, a password will be shown; return this password as your answer.",
    icon: "🧮",
    component: RetirementCalculatorExperience,
    tags: ["dashboard", "fintech", "calculator", "slider", "multi-step"],
    difficulty: "hard",
    password: PASSWORD_RetirementCalculator,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_GoalCreation,
    title: "Personal Goal Creation",
    description:
      "Your goal is to create a new personal wellness goal. First, click the 'My Goals' link in the sidebar. Second, click the '+ Create New Goal' button. Third, in the 'Define Your Goal' step, enter 'Drink More Water' as the Goal Name, enter '8' as value in target input field, select  'glasses' from the Target dropdown, and select '7-day streak' from the Completion Metric dropdown, then click 'Next'. Fourth, in the 'Choose an Icon' step, select the 'trophy' icon from the grid. Finally, click the 'Save Goal' button. Upon completion, a password will be shown; return this password as your answer.",
    icon: "🎯",
    component: GoalCreationExperience,
    tags: ["dashboard", "wellness", "forms", "multi-step"],
    difficulty: "hard",
    password: PASSWORD_GoalCreation,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_GoalManagement,
    title: "Goal Management",
    description:
      "Your goal is to manage an existing fitness goal. First, from the dashboard, find the 'Run 5k' goal and click on it to open its details. Second, in the 'Log Progress' section, enter '3k' into the input field and click 'Log Entry'. Third, click the 'Change Deadline' button, and in the calendar, select the date that is exactly one week after the original deadline. Fourth, in the 'Motivational Notes' section, enter the text 'Keep pushing!'. Finally, click the 'Save Changes' button, and then click 'Return to Dashboard'. Upon completion, a password will be shown; return this password as your answer.",
    icon: "🏃",
    component: GoalManagementExperience,
    tags: ["dashboard", "wellness", "forms", "calendar", "multi-step"],
    difficulty: "hard",
    password: PASSWORD_GoalManagement,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_TimeTracking,
    title: "Time Tracking and Entry Finalization",
    description:
      "Your goal is to log time for a specific task and finalize the entry. The process begins by starting a timer for a task named 'New Feature Scoping'. After stopping the timer, a draft entry is created. This draft must be edited to adjust the duration to '00:15:00' and assign it to the 'Client Meeting' category. Saving this finalized entry will reveal the password.",
    icon: "⏱️",
    component: TimeBased,
    tags: ["project management", "time tracking", "forms", "multi-stage"],
    difficulty: "medium",
    password: PASSWORD_TimeTracking,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_UserPermissions,
    title: "User Promotion and Permission Granting",
    description:
      "Your goal is to modify a user's role and permissions. In the user management dashboard, find the user named 'Alex Ray' who currently has the 'Contributor' role. Promote this user to 'Editor' by using Change Role option  accessible via menu button. This action will reveal a new set of permissions for that user. Grant them the 'Publish Content' permission by checking the corresponding box to complete the task and reveal the password.",
    icon: "🔐",
    component: UserManagementExperience,
    tags: [
      "user management",
      "permissions",
      "roles",
      "multi-step",
      "dashboard",
    ],
    difficulty: "hard",
    password: PASSWORD_UserPermissions,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_TeamInvitation,
    title: "Team Member Invitation Workflow",
    description:
      "Your goal is to invite a new member to the team with specific settings. From the dashboard, initiate the invitation process. The new member's email is 'new.hire@example.com' and they should be assigned the 'Viewer' role. Next, add them to the 'Marketing Team' group. Finally, set their access to expire in '90 days'. Sending the invite after correctly configuring all steps will reveal the password.",
    icon: "✉️",
    component: TeamInvitationExperience,
    tags: ["user management", "invite", "forms", "multi-stage", "dashboard"],
    difficulty: "hard",
    password: PASSWORD_TeamInvitation,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_NewsletterBuilder,
    title: "Newsletter Builder Drag & Drop",
    description:
      "Your goal is to prepare a newsletter draft. First, start by selecting the 'Weekly Digest' template. In the editor, drag the 'Featured Article' content block to be the first section directly below the header of the newsletter. Next, select the 'Featured Article' block and replace its placeholder image by pasting 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0' into the Image URL field. Finally, send a test version of the newsletter to complete the task and reveal the password.",
    icon: "📰",
    component: NewsletterBuilderExperience,
    tags: ["newsletter", "builder", "drag-and-drop", "multi-stage", "editor"],
    difficulty: "hard",
    password: PASSWORD_NewsletterBuilder,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_NewsletterSchedule,
    title: "Newsletter Audience and Scheduling",
    description:
      "Your goal is to schedule a newsletter for a specific audience segment. From the newsletter editor, open the scheduling modal. First, create an audience rule to include subscribers where their 'Email activity' shows they have 'opened the last' '5' emails. Next, schedule the newsletter to be sent tomorrow at '9:00 AM'. Finally, ensure the option to 'send in recipient's local timezone' is enabled and confirm the schedule to reveal the password.",
    icon: "🗓️",
    component: NewsletterSchedulingExperience,
    tags: ["newsletter", "scheduling", "audience", "rules", "multi-stage"],
    difficulty: "hard",
    password: PASSWORD_NewsletterSchedule,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_ContractReview,
    title: "Contract Clause Review and Commenting",
    description:
      "Your goal is to review a legal document and add a specific comment. First, use the 'Highlight Clauses' tool from the right-hand panel. From the list of clause types that appears, select 'Confidentiality'. This will highlight the relevant clause in the document. Next, click on the highlighted 'Confidentiality' clause to open a comment box. In the text area, enter the comment: 'Clarify the definition of 'Confidential Information'.'. Finally, submit the comment to complete the task and reveal the password.",
    icon: "⚖️",
    component: ContractReviewExperience,
    tags: ["legal", "document review", "annotation", "forms", "multi-stage"],
    difficulty: "hard",
    password: PASSWORD_ContractReview,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_ClauseReview,
    title: "Non-Standard Contract Clause Review",
    description:
      "Your goal is to review several non-standard clauses in a contract. First, locate the 'Liability' clause in the review queue and accept it. Next, find the 'Jurisdiction' clause and reject it. After rejecting the clause, you must provide a reason for the rejection by entering 'Clause conflicts with local regulations.' into the text box that appears. Submit the reason to complete the review and confirm action. This will reveal the password.",
    icon: "⚖️",
    component: ContractClauseReviewExperience,
    tags: [
      "legal",
      "document review",
      "decision making",
      "forms",
      "multi-stage",
    ],
    difficulty: "hard",
    password: PASSWORD_ClauseReview,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_CrowdfundingD,
    title: "Crowdfunding Pledge and Reward Selection",
    description:
      "Your goal is to back a crowdfunding project with a specific pledge. On the project page, find and select the reward tier named 'Digital Enthusiast'. On the next page, increase the pledge amount by exactly $10 more than the tier's minimum value. Finally, complete the process by entering the payment details: Full Name: 'Casey Becker', Card Number: '1234-5678-9012-3456', and confirming the pledge to reveal the password.",
    icon: "🎁",
    component: CrowdfundingExperience,
    tags: ["crowdfunding", "e-commerce", "payment", "forms", "multi-stage"],
    difficulty: "hard",
    password: PASSWORD_CrowdfundingD,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_ProjectHistory,
    title: "Project History and Update Commenting",
    description:
      "Your goal is to find a previously backed project and leave a supportive comment on its latest update. From your dashboard of backed projects, find and view the project named 'Project Aether'. Navigate to its 'Updates' tab. On the latest update (the first one in the list), leave the exact comment: 'This is looking great! Keep up the fantastic work.'. Posting the comment will complete the task and reveal the password.",
    icon: "💬",
    component: ProjectHistoryExperience,
    tags: ["dashboard", "navigation", "community", "forms", "multi-stage"],
    difficulty: "hard",
    password: PASSWORD_ProjectHistory,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_CreditBillPayment,
    title: "Bill Payment Scheduling",
    description:
      "Your goal is to schedule a credit card payment from your dashboard. First, find the 'Credit Card' bill and begin the scheduling process. In the scheduling modal, select the bill's due date from the calendar. Next, when presented with payment options, choose to pay the 'Minimum Amount Due' instead of the full balance. Finally, review and confirm the scheduled payment to complete the task and reveal the password.",
    icon: "💵",
    component: BillPaymentExperience,
    tags: ["fintech", "payment", "scheduling", "forms", "multi-stage"],
    difficulty: "hard",
    password: PASSWORD_CreditBillPayment,
    variant: "base",
    requires_file_upload: false,
 
  }, {
  path: TASK_ID_SynergyHub,
  title: "Regional Performance Task Assignment",
  description: "Your task is to find the password by analyzing sales data and assigning a detailed performance review. First, you must analyze the Sales Dashboard to identify two key pieces of information: the region with the lowest overall sales, and the top-selling product within that specific region. With this information, you must then assign a 'Performance Review' task to that region's manager. The content of this task is critical: the 'Good Aspects' field must mention the top-selling product you identified, and the 'Areas to Improve' field must contain the exact phrase 'low sales in the region'. The process involves analyzing the dashboard, navigating to the team directory to find the correct manager, and using the task assignment form to submit the review with all the required details.",
  icon: "🎯",
  component: RegionalPerformance,
  tags: ["dashboard", "charts", "reasoning", "data analysis", "forms", "multi-step", "hard"],
  difficulty: "hard",
  password: PASSWORD_SynergyHub,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_Cognosys,
  title: "Scientific Abstract Summary",
  description: "Your goal is to analyze a scientific abstract and submit a summary. In the library, find the paper titled 'The Impact of Neural Oscillations on Memory Consolidation' and view its abstract. From the text, you must identify the stated hypothesis and the conclusion. Then, proceed to the summary form, where you will select the correct hypothesis from the dropdown menu and paste the exact conclusion into the text area. Submitting the correct information will reveal the password.",
  icon: "🔬",
  component: CognosysExperience,
  tags: ["documents", "forms", "reasoning", "comprehension", "multi-step", "hard"],
  difficulty: "hard",
  password: PASSWORD_Cognosys,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_SentinelGuard,
    title: "Server Log Analysis and IP Blocking",
  description: "Your task is to find the password by acting as a security analyst to identify and neutralize a threat. A potential security incident is underway, and you must analyze the server logs to find the source. The threat is characterized by a high number of 'Failed Login' errors originating from a single IP address, all occurring within the last 15 minutes. After identifying the malicious IP, you must block it and provide the exact reason: 'Brute-force attempt detected'. The process involves using the Log Explorer's time range filter to isolate the suspicious activity, identifying the correct IP address from the log entries, and then using the block action to submit the block with the required reason.",
  icon: "🛡️",
  component: SentinelGuardExperience,
  tags: ["security", "logs", "data analysis", "filtering", "devops", "hard"],
  difficulty: "hard",
  password: PASSWORD_SentinelGuard,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_TalentSphere,
  title: "Employee Performance and Promotion",
  description: "Your goal is to analyze performance data to identify and promote the top-performing employee. First, navigate to the 'Performance' page and download the 'Q2 Sales Team Performance.csv' file. Second, go to the 'Downloads' page and use the 'Analyze & Generate Chart' tool for that file to visualize the data. From the chart, identify the employee with the highest 'Quarterly Sales'. Finally, navigate to 'User Management', find that employee, and promote them to the 'Team Lead' role. Completing this process correctly will reveal the password.",
  icon: "🏆",
  component: TalentSphereExperience,
  tags: ["hris", "data analysis", "charts", "file management", "forms", "hard"],
  difficulty: "hard",
  password: PASSWORD_TalentSphere,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_DeductionGrid,
  title: "The Deduction Grid Challenge",
  description: "Your task is to find the password by solving a logic grid puzzle. The specific question you must answer for this puzzle is displayed dynamically in the header at the top of the page. To find the solution, you must use the list of clues provided to deduce the correct relationships between the items in each category. The process involves analyzing the clues, using the interactive grid to mark true (✓) and false (✗) associations to help your reasoning, and submitting the final answer to the header's question in the solution box.",
  icon: "🧠",
  component: DeductionGridExperience,
  tags: ["puzzle", "logic", "reasoning", "dynamic", "game", "hard"],
  difficulty: "hard",
  password: PASSWORD_DeductionGrid,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_ActionItemConsolidator,
  title: "Meeting Note Consolidation",
  description: "Your goal is to consolidate action items from two separate meeting notes. First, on the 'Extract Notes' page, enter the following two URLs into the provided fields: 'https://example.com/project-alpha-notes-1' and 'https://example.com/project-alpha-notes-2', then fetch the documents. Second, navigate to the 'Review Notes' page. Third, view the contents of both fetched documents to identify the three action items that are mentioned in both and add only those three common action items to the 'Final Action Items' list. Finally, finalize the list to reveal the password.",
  icon: "📂",
  component: ActionItemConsolidator,
  tags: ["documents", "comprehension", "reasoning", "forms", "hard"],
  difficulty: "hard",
  password: PASSWORD_ActionItemConsolidator,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_MarketMatrix,
  title: "Shareholder Letter Analysis",
  description: "Your goal is to analyze two shareholder letters to determine the difference in their reported revenue growth. First, on the 'Fetch Documents' page, add the following two URLs one by one: 'https://example.com/innova-corp-q2-letter' and 'https://example.com/synertech-q2-letter', then process them. Second, navigate to the 'Documents' page, select both fetched documents, and use the 'Compare' tool to view them side-by-side. Third, read both letters to find the stated 'revenue growth percentage' in each. Calculate the absolute difference between these two percentages. Finally, enter your calculated result into the 'Growth Delta (%)' box and submit your analysis to reveal the password.",
  icon: "📈",
  component: MarketMatrixExperience,
  tags: ["finance", "documents", "reasoning", "comprehension", "calculation", "hard"],
  difficulty: "hard",
  password: PASSWORD_MarketMatrix,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_VisaQuest,
  title: "Visa Requirement Research",
  description: "Your task is to find the password by researching the correct visa requirement for the travel scenario detailed in the header at the top of the page. The header will specify the traveler's nationality and their destination country. To find the answer, you must visit the correct official embassy website by selecting and entering the matching URL from this list: https://embassy.example.com/jp-ca, https://embassy.example.com/fr-br, https://embassy.example.com/uk-in, https://embassy.example.com/us-au. The process requires navigating to the 'Research Tool', inputting the correct URL for the given scenario to launch a simulated browser, reading the document to find the visa requirement for a 30-day tourist trip, and then returning to the tool to submit your answer ('Yes' or 'No').",
  icon: "🌍",
  component: VisaQuestExperience,
  tags: ["research", "comprehension", "dynamic", "forms", "hard"],
  difficulty: "hard",
  password: PASSWORD_VisaQuest,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_SystemLock,
  title: "System Lock Codebreaker",
  description: "Your task is to find the password by breaking a 4-color secret code to bypass the system lock. You have 10 attempts to guess the correct sequence. After you submit each guess, the system will provide feedback: a green peg signifies a correct color in the correct position, and a white peg signifies a correct color in an incorrect position. The process requires using logic and deduction based on the feedback from each attempt to determine the secret code before you run out of guesses.",
  icon: "🔐",
  component: SystemLockExperience,
  tags: ["game", "puzzle", "logic", "reasoning", "dynamic", "hard"],
  difficulty: "hard",
  password: PASSWORD_SystemLock,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_MediVerse,
  title: "Medical Study Contradiction Finder",
  description: "Your task is to find the password by analyzing and comparing the two medical studies listed in the 'Current Task' header. Your objective is to read the abstract of each study and find the stated 'efficacy rate' percentage. The process requires you to first download both target papers from the 'Researches' library, then navigate to the 'Downloaded' page. From there, you must select both papers and use the comparison tool to view their content. After you have found both efficacy rates, close the viewer and enter each value into its corresponding field in the 'Contradiction Report' section before submitting your analysis.",
  icon: "🔬",
  component: MediVerseExperience,
  tags: ["documents", "comprehension", "reasoning", "dynamic", "hard"],
  difficulty: "hard",
  password: PASSWORD_MediVerse,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_ContactResolution,
  title: "Duplicate Contact Resolution",
  description: "Your task is to find the password by resolving all contact duplication issues. This requires handling three specific conflicts with different resolutions. For the contact 'Casey Becker', the entries must be merged, using the photo from the 'Google' source as the primary image. For the contact 'Jordan Lee', you must choose to keep both entries. Finally, for 'Alex Ray', the older contact entry must be deleted. The process involves navigating to the 'Duplicates' page and applying the correct resolution action to each of the three conflict cards until none remain.",
  icon: "🔄",
  component: ContactResolutionExperience,
  tags: ["contacts", "data management", "deduplication", "interactive", "multi-stage"],
  difficulty: "hard",
  password: PASSWORD_ContactResolution,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_ApiKeyRotation,
  title: "API Key Rotation",
  description: "Your task is to find the password by completing the secure rotation of an expiring API key. The specific key to rotate is the 'Primary App Key'. This secure process requires a verification code, which is '847392'. After passing verification and confirming the rotation, the newly generated key must be saved with the description 'v2 key'. The overall workflow involves finding the correct key on the 'API Keys' page, initiating the rotation process, proceeding through the multi-step modal for verification and confirmation, and then adding the description before saving.",
  icon: "🔑",
  component: ApiKeyManagementExperience,
  tags: ["developer tools", "API", "security", "forms", "multi-stage"],
  difficulty: "hard",
  password: PASSWORD_ApiKeyRotation,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_MediaLibrary, 
  title: "Media Library Bulk Tagging",
  description: "Your task is to find the password by organizing assets in the media library. The task requires a bulk action to be performed on all five images that are currently untagged. Two new tags must be added to this specific group of images: 'Q3-Campaign' and 'Social-Media'. The process involves selecting the correct images in the library, using the bulk action bar that appears to open the tagging window, adding each required tag, and finally applying the changes.",
  icon: "🏷️",
  component: MediaLibraryExperience,  
  tags: ["media library", "DAM", "bulk action", "tagging", "multi-select"],
  difficulty: "hard",
  password: PASSWORD_MediaLibrary,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_SmartCollection,
  title: "Smart Collection Creation",
  description: "Your task is to find the password by creating a new smart collection with a specific set of automated rules. The collection must be named 'European Lifestyle' and given the exact description: 'My memories, my precious asset'. Its rules must be configured to match ALL of the following conditions: the asset must have a tag of 'Lifestyle', and it must also have a tag of 'Europe'. The process involves initiating the 'Create Collection' workflow and then completing each step of the creation wizard—name, description, and rules—before finally creating the collection on the review screen.",
  icon: "✨",
  component: SmartCollectionExperience,
  tags: ["media library", "DAM", "automation", "rules", "multi-stage"],
  difficulty: "hard",
  password: PASSWORD_SmartCollection,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_WorkflowAutomation,
  title: "Workflow Automation Rule Creation",
  description: "Your task is to find the password by creating a specific workflow automation rule. The rule's trigger must be 'A task is moved to the 'Done' column'. The action must be set to 'Post a notification in a channel', configured to post in the '#releases' channel with the exact custom message: '🎉 {TaskName} has been completed and is ready for deployment!'. The process begins on the dashboard, where you must start the 'Create Automation' workflow. In the rule editor, you will then configure both the trigger and the action with the specified details before saving and activating the rule.",
  icon: "🤖",
  component: WorkflowAutomationExperience,
  tags: ["project management", "automation", "rules", "workflow", "multi-stage"],
  difficulty: "hard",
  password: PASSWORD_WorkflowAutomation,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_AutomationManagement,
  title: "Automation Rule Management and History",
  description: "Your task is to find the password by completing a specific management sequence on an automation rule. The target for this task is the rule named 'Notify #releases on task completion'. You must first disable this rule, then view its 'Execution History', and finally re-enable the same rule. The process requires navigating to the 'Rule Engine' page from the sidebar, finding the rule in the list to toggle it off, then clicking the rule's name to view its details and access the history tab. Afterward, you must return to the list of rules to toggle the target rule back on.",
  icon: "⚙️",
  component: AutomationManagementExperience,
  tags: ["project management", "automation", "rules", "history", "multi-stage"],
  difficulty: "hard",
  password: PASSWORD_AutomationManagement,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_DataExport,
  title: "Account Data Export",
  description: "Your task is to find the password by requesting a partial archive of your account data with very specific settings. The export file format must be JSON, and the data included in the archive must be limited to only 'Posts' and 'Comments'. The date range for this data must be set to 'Last year'. To achieve this, you must navigate to the 'Data & Privacy' section, begin the export process, and complete each step of the configuration wizard with the correct selections before starting the export on the final review page.",
  icon: "📤",
  component: DataExportExperience,
  tags: ["settings", "data export", "privacy", "forms", "multi-stage"],
  difficulty: "hard",
  password: PASSWORD_DataExport,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_DataExportManagement,
  title: "Data Export Management",
  description: "Your task is to find the password by managing a specific data export file. The file you need to manage is named 'export_2025-07-15.json'. The required actions are to first download this file and then permanently delete it. The process involves navigating to the 'Settings' page to find your data exports. After you download the correct file, the option to delete it will become available. You must confirm this deletion in the subsequent pop-up modal to complete the task.",
  icon: "🗑️",
  component: DataExportManagementExperience,
  tags: ["settings", "data export", "privacy", "multi-stage"],
  difficulty: "hard",
  password: PASSWORD_DataExportManagement,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_SiteDesignV2,
  title: "Site Design: Custom Font Assignment",
  description: "Your task is to find the password by updating the site's typography with a custom font. All the required details for this task are displayed dynamically in the instruction header at the top of the page. You must use the provided Font URL to upload the new font, which will then be available under its specified Font Name. The final step is to assign this new font and its required Fallback Font to the correct Role in the typography settings. The process involves navigating to the 'Design' page, using the font manager to upload the font from the URL, correctly configuring the font roles and fallbacks, and then saving the settings.",
  icon: "🎨",
  component: SiteCraftExperience,
  tags: ["cms", "design", "fonts", "forms", "multi-stage", "dashboard"],
  difficulty: "hard",
  password: PASSWORD_SiteDesignV2,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_FreshBox,
  title: "Subscription: Skip Shipment & Update Address",
  description: "Your goal is to find the password by managing your subscription. First, locate the option to skip your next shipment and confirm this choice. Afterward, you must update your shipping address for all future orders using the new details provided in the 'Task Instructions' bar at the top of the page. The password will only be revealed after both skipping the shipment and correctly updating the address.",
  icon: "📦",
  component: FreshBoxExperience,
  tags: ["ecommerce", "subscription", "forms", "dashboard", "multi-stage", "dynamic"],
  difficulty: "hard",
  password: PASSWORD_FreshBox,
  variant: "base",
  requires_file_upload: false
},

{
  path: TASK_ID_ProjectManagement,
  title: "Agile Project Management Board",
  description: "Your task is to find the password by planning a new sprint with a highly specific configuration. The sprint must be named 'Sprint-Beta-25', have the goal 'Creating Auth Flow', and be scheduled to start on the upcoming Friday. The sprint must be populated with three specific tasks: 1) Title: 'Implement OAuth 2.0 Login', Description: 'Integrate with Google and GitHub providers for user authentication using OAuth 2.0.', Story Points: 8, Priority: 'High', Assignee: 'Alice Johnson'; 2) Title: 'Develop JWT Generation & Verification', Description: 'Create a secure service for issuing and validating JSON Web Tokens upon successful login.', Story Points: 8, Priority: 'High', Assignee: 'Bob Smith'; and 3) Title: 'Create User Profile Endpoint', Description: 'Build a protected API endpoint to fetch the authenticated user's profile data.', Story Points: 4, Priority: 'Medium', Assignee: 'Alice Johnson'. The process involves initiating the 'Create New Sprint' workflow from the Sprint Planning page, meticulously filling in all sprint details, adding each of the three required tasks with their exact information, and then creating the sprint.",
  icon: "🚀",
  component: CombinedProjectManagement,
  tags: ["project management", "kanban", "charts", "spa", "styled-components", "recharts"],
  difficulty: "hard",
  password: PASSWORD_ProjectManagement,
  variant: "base",
  requires_file_upload: false
 },{
  path: TASK_ID_ProjectManagement2,
  title: "Agile Project Management Board - Task Execution",
  description: "Your task is to find the password by resolving a blocker on a project task. On the Kanban board, the task 'Fix User Authentication Flow' becomes blocked when it is moved into the 'In Progress' column. To resolve this blocker, an exact comment '@SarahJ Can you provide the server credentials to resolve this blocker?' must be posted on the task. The process requires navigating to the project board, moving the specified task to trigger the blocker, and then posting the correct comment to resolve the issue and reveal the password.",
  icon: "🚀",
  component: CombinedProjectManagement2,
  tags: ["project management", "kanban", "collaboration", "blockers", "team communication"],
  difficulty: "hard",
  password: PASSWORD_ProjectManagement2,
  variant: "base",
  requires_file_upload: false
 },{
  path: TASK_ID_ProjectManagement3,
  title: "Agile Project Management Board - Time Logging",
  description: "Your task is to find the password by correctly logging time for completed work. To begin, the two tasks 'Fix Login Bug (PROJ-112)' and 'Update API Docs (PROJ-115)' must both be in the 'Done' column on the project board. Once they are, exactly 4 hours of work must be logged against the 'Fix Login Bug (PROJ-112)' task specifically with description 'Task Completed Today.'. The process involves updating the status of both tasks on the board, then navigating to the 'Time Log' section to submit a time entry with the required details.",
  icon: "🚀",
  component: CombinedProjectManagement3,
  tags: ["project management", "time tracking", "logging", "sprint review"],
  difficulty: "hard",
  password: PASSWORD_ProjectManagement3,
  variant: "base",
  requires_file_upload: false
 },{
  path: TASK_ID_ProjectManagement4,
  title: "Agile Project Management Board - Sprint Closure",
  description: "Your goal is to find the password by properly closing out the current sprint. The sprint to be closed is 'Sprint-Alpha-24'. This action generates a 'Sprint Report' modal. To finalize the process, you must identify the 'Task Completion Rate' from the report and enter its numerical value into the verification box. The process involves initiating the 'Close Sprint' action from the appropriate page and then using the data from the generated report to complete the final confirmation step.",
  icon: "🚀",
  component: CombinedProjectManagement4,
  tags: ["project management", "sprint closure", "reporting", "analysis"],
  difficulty: "hard",
  password: PASSWORD_ProjectManagement4,
  variant: "base",
  requires_file_upload: false
 },

{
  path: TASK_ID_TrainingPlatform1,
  component: TrainingPlatform1,
  password: PASSWORD_TrainingPlatform1,
  title: "Logical Training: Document Reconstruction",
  description: "Your task is to find the password by completing the Document Reconstruction module. The objective is to reassemble the shredded intelligence document titled 'Blueprint of the Citadel'. The document has been cut into seven vertical strips which are presented in a scrambled order. The process requires you to navigate to Document Reconstruction Game section via sidebar and then drag and drop the document strips into the correct sequence in the assembly area and submit your solution.",
  icon: "📄",
  tags: ["logical", "puzzle", "drag-and-drop"],
  difficulty: "medium",
  variant: "base",
  base_task: TASK_ID_TrainingPlatform1,
  requires_file_upload: false,
},
{
  path: TASK_ID_TrainingPlatform2,
  component: TrainingPlatform2,
  password: PASSWORD_TrainingPlatform2,
  title: "Logical Training: Social Engineering",
  description: "Your task is to find the password by passing the Social Engineering module. The top of the page will display the name of a key employee and the specific security questions you must answer to reset their password. To find the answers, you must analyze the conversations in the provided mock internal chat application for contextual clues. The process involves identifying the required questions from the header, deducing the answers from the chat logs, and entering them into the correct fields to pass the test.",
  icon: "💬",
  tags: ["logical", "deduction", "social-engineering"],
  difficulty: "medium",
  variant: "base",
  base_task: TASK_ID_TrainingPlatform2,
  requires_file_upload: false,
},
{
  path: TASK_ID_TrainingPlatform3,
  component: TrainingPlatform3,
  password: PASSWORD_TrainingPlatform3,
  title: "Logical Training: Botanical Identification",
  description: "Your goal is to find the password by completing the Botanical Identification challenge. For each attempt, a different set of three herbs is required for the formula. You must open and consult the Herbalist's Journal to see the names and descriptions of the three correct herbs for the current session. The process requires you to carefully compare the journal entries to the available plants, select the three correct specimens from the shelf using image text as reference, and confirm your selection.",
  icon: "🌿",
  tags: ["logical", "visual", "matching"],
  difficulty: "hard",
  variant: "base",
  base_task: TASK_ID_TrainingPlatform3,
  requires_file_upload: false,
},
{
  path: TASK_ID_TrainingPlatform4,
  component: TrainingPlatform4,
  password: PASSWORD_TrainingPlatform4,
  title: "Logical Training: Hazard Grid",
  description: "Your goal is to find the password by successfully navigating the Hazard Grid module. For this task, a specific safe path is provided for you in the header area. Your objective is to perfectly replicate this path on the grid. The process involves starting the module, noting the sequence of tiles shown in the 'Target Path' description, and then clicking on the grid cells in that exact order to plot your route before submitting it for verification.",
  icon: "🔳",
  tags: ["logical", "pattern", "pathfinding"],
  difficulty: "hard",
  variant: "base",
  base_task: TASK_ID_TrainingPlatform4,
  requires_file_upload: false,
 
  },
  {
  path: TASK_ID_InsightStream,
  title: "Competitive Traffic Analysis",
  description: "Your goal is to analyze a competitor's web traffic and create a targeted marketing campaign. First, navigate to the 'Analytics' page and analyze the traffic for the URL 'https://www.techgear.io'. From the results, identify the top two 'Referral' traffic sources. Next, go to the 'Campaigns' page and create a new campaign with the exact name 'New Referral Push Q3'. In the campaign setup, add the two referral sources you identified. Launching the correctly configured campaign will reveal the password.",
  icon: "🚀",
  component: InsightStreamExperience,
  tags: ["analytics", "marketing", "data analysis", "forms", "hard"],
  difficulty: "hard",
  password: PASSWORD_InsightStream,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_CircuitCore,
  title: "Circuit Core Logic Puzzle",
  description: "Your goal is to find the password by powering on the Server Core. To do this, you must solve a logic puzzle by discovering the correct sequence of three specific gates from your inventory. The process requires you to drag and drop gates into the three empty slots on the circuit board. Once you have placed three gates, you must activate the circuit to test your solution. If the sequence is correct, the system will come online and reveal the password. If it is incorrect, you will need to reset the board and deduce a different combination.",
  icon: "🔌",
  component: CircuitCoreExperience,
  tags: ["game", "puzzle", "logic", "drag-and-drop", "hard"],
  difficulty: "hard",
  password: PASSWORD_CircuitCore,
  variant: "base",
  requires_file_upload: false
},
{
  path: TASK_ID_CogniGrid,
  title: "CogniGrid Pattern Recall",
  description: "Your task is to find the password by successfully completing a visual memory test. After starting the test, you will be shown a pattern of lit tiles on a 5x5 grid for 6 seconds. Your objective is to memorize the exact positions of the lit tiles. The process requires you to start the test, observe the pattern carefully during the countdown, and then accurately recreate it on the grid by clicking the correct tiles. Submitting a perfect match will reveal the password.",
  icon: "🧠",
  component: PatternRecall,
  tags: ["game", "puzzle", "memory", "dynamic", "hard"],
  difficulty: "hard",
  password: PASSWORD_CogniGrid,
  variant: "base",
  requires_file_upload: false
,},{
  path: TASK_ID_AlchemistsRiddle,
  title: "The Alchemist's Riddle",
  description: "Your task is to find the password by solving the alchemist's riddle. You must brew a potion by deducing the correct three-ingredient recipe from a set of logical clues. Read the clues in the 'Ancient Recipe' book to determine not only which three of the five available ingredients are needed, but also the precise sequence in which they must be added. The process involves dragging your chosen ingredients from the shelf into the cauldron in the correct order and then clicking 'Brew Potion' to test your solution.",
  icon: "🧪",
  component: AlchemistsRiddleExperience,
  tags: ["game", "puzzle", "logic", "reasoning", "drag-and-drop", "hard"],
  difficulty: "hard",
  password: PASSWORD_AlchemistsRiddle,
  variant: "base",
  requires_file_upload: false
},{
  path: TASK_ID_WordWeaver,
  title: "Word Weaver Puzzle",
  description: "Your task is to find the password by solving the Word Weaver puzzle. All the details for the current puzzle—the Start Word, the End Word, and the maximum number of Steps allowed—are displayed in the header at the top of the game. To solve it, you must transform the start word into the end word by changing only one letter at a time, ensuring each intermediate word is a valid English entry. The process requires you to enter each word of your solution into the input field and submit them one by one to build the ladder until you reach the end word within the step limit.",
  icon: "📜",
  component: WordWeaverExperience,
  tags: ["game", "puzzle", "logic", "word", "hard"],
  difficulty: "hard",
  password: PASSWORD_WordWeaver,
  variant: "base",
  requires_file_upload: false
 }





];
