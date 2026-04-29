import { RouteConfig } from "./routeType";
import EcommerceWishlist, {
  PASSWORD_EcommerceWishlist,
  TASK_ID_EcommerceWishlist,
} from "../pages/EcommerceWishlist";
import MilestoneCreation, {
  PASSWORD_MilestoneCreation,
  TASK_ID_MilestoneCreation,
} from "../pages/MilestoneCreation";
import SocialMediaGroupCreation, {
  PASSWORD_SocialMediaGroupCreation,
  TASK_ID_SocialMediaGroupCreation,
} from "../pages/SocialMediaGroupCreation";
import ProjectTodoListManagement, {
  PASSWORD_ProjectTodoListManagement,
  TASK_ID_ProjectTodoListManagement,
} from "../pages/ProjectTodoListManagement";
import EntertainmentRecommendationCreation, {
  PASSWORD_EntertainmentRecommendation,
  TASK_ID_EntertainmentRecommendation,
} from "../pages/EntertainmentRecommendationCreation";
import SmartThermostatControl, {
  PASSWORD_SmartThermostatControl,
  TASK_ID_SmartThermostatControl,
} from "../pages/SmartThermostatControl";
import EditShippingAddress, {
  PASSWORD_EditShippingAddress,
  TASK_ID_EditShippingAddress,
} from "../pages/EditShippingAddress";
import ExportWalletPortfolio, {
  PASSWORD_ExportWalletPortfolio,
  TASK_ID_ExportWalletPortfolio,
} from "../pages/ExportWalletPortfolio";
import CryptoDAOVoting, {
  PASSWORD_CryptoDAOVoting,
  TASK_ID_CryptoDAOVoting,
} from "../pages/CryptoDAOVoting";

export const routes_27: RouteConfig[] = [
  {
    path: TASK_ID_EcommerceWishlist,
    title: "Ecommerce Wishlist Management",
    description:
      "In the main menu, click the 'Summer Sale' button. Find 'Wireless Earbuds' and click 'Add to Wishlist'. Next, locate 'Travel Backpack' and click 'Add to Wishlist' as well. Then click the 'View Wishlist' button to go to the wishlist page, then click the '🚀 Share Wishlist' button. Finally, return the password that is shown.",
    icon: "🛒",
    component: EcommerceWishlist,
    tags: ["ecommerce", "wishlist", "shopping", "multi-step"],
    password: PASSWORD_EcommerceWishlist,
  },
  {
    path: TASK_ID_EditShippingAddress,
    title: "Edit Shipping Address",
    description:
      "Navigate to the profile's 'Address' section. Click the 'Add Address' button to add a new address, input '123 Main St, Apt 5B, Springfield, IL 62704', and click 'Save Address'. Click the 'Set as primary' button on the newly added address card. Cick the 'Remove' button on the previous primary address: '123 Main St, Springfield, IL 62704'. Finally, click 'Done' and return the password displayed.",
    icon: "🚚",
    component: EditShippingAddress,
    tags: ["profile", "address", "shipping", "edit"],
    password: PASSWORD_EditShippingAddress,
    difficulty: "medium",
    variant: "base",
    base_task: TASK_ID_EditShippingAddress,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_EntertainmentRecommendation,
    title: "Entertainment Recommendation Creation",
    description:
      'In the song list, find the song "Neon Nights" and click it. Select the option to recommend by clicking "Share" button. Choose "Ava" in the friend list as the recipient. Input "Perfect for road trips!" and click "Done" button. Finally return the password displayed.',
    icon: "🎶",
    component: EntertainmentRecommendationCreation,
    tags: ["entertainment", "recommendation", "music", "share"],
    password: PASSWORD_EntertainmentRecommendation,
    difficulty: "medium",
    variant: "base",
    base_task: TASK_ID_EntertainmentRecommendation,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_SmartThermostatControl,
    title: "Smart Thermostat Control",
    description:
      "Open the smart thermostat control panel, navigate to the scheduling or automation section by clicking the 'Setup Automation' button. Click the 'Create New Schedule' button. Set the temperature to 68°F and the time to 10:00 PM. Choose 'Every day' as the repeat option. Save the schedule by clicking the 'Save Schedule' button. Finally return the password displayed.",
    icon: "🎛️",
    component: SmartThermostatControl,
    tags: ["iot", "thermostat", "automation", "schedule"],
    password: PASSWORD_SmartThermostatControl,
    difficulty: "medium",
    variant: "base",
    base_task: TASK_ID_SmartThermostatControl,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_MilestoneCreation,
    title: "Milestone Creation",
    description:
      "In the projects list, click the 'Website Redesign' project. Click the 'New Milestone' button. Input the Milestone name as 'Beta Launch', and select 'UI Overhaul' for the prerequisites. Click the 'Create' button. In the milestone list, click the 'Notify team' button for the 'Beta Launch' milestone and return the password that appears as your final answer.",
    icon: "🚩",
    component: MilestoneCreation,
    tags: ["project", "milestone", "creation", "multi-step"],
    password: PASSWORD_MilestoneCreation,
    difficulty: "medium",
    variant: "base",
    base_task: TASK_ID_MilestoneCreation,
  },
  {
    path: TASK_ID_ProjectTodoListManagement,
    title: "Project Todo List Management",
    description:
      "Locate the 'Update User Manual' task within the 'To Do' column of the Kanban board. Drag and drop this task into the 'In Progress' column. Click on the task card to open its details in a modal window. Within the modal, assign 'Nina Roberts' from the list of team members. Then, set the due date to this Friday. Click the 'Save' button to confirm changes. Upon successful completion, a password will be displayed—return that password as your answer.",
    icon: "🏷️",
    component: ProjectTodoListManagement,
    tags: ["project", "todo", "kanban"],
    password: PASSWORD_ProjectTodoListManagement,
    difficulty: "medium",
    variant: "base",
    base_task: TASK_ID_ProjectTodoListManagement,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_SocialMediaGroupCreation,
    title: "Social-Media Group Creation",
    description:
      "First, navigate to the main menu and click the 'New Group' button. Second, enter 'Weekend Hikers' as the group name. Third, set the group's privacy to 'Private'. Fourth, from your friends list, select the following three members to be invited: John, Richard, and James. Fifth, in the welcome message field, input the message 'Welcome to Weekend Hikers Group'. Once all fields are completed, click the 'Create' button. After successful group creation, a password will be displayed — return this password as your answer.",
    icon: "\uD83E\uDDD1\u200D\uD83E\uDDD1", // 🧑‍🤝‍🧑
    component: SocialMediaGroupCreation,
    tags: ["social", "group", "creation"],
    password: PASSWORD_SocialMediaGroupCreation,
    difficulty: "medium",
    variant: "base",
    base_task: TASK_ID_SocialMediaGroupCreation,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_ExportWalletPortfolio,
    title: "Export Wallet Portfolio",
    description:
      "First, connect your wallet by clicking the 'Connect Wallet' button and selecting 'Wallet 1'.  Second, input password 'Mywallet_password' to authorize access. Third, navigate to the 'Portfolio' section by clicking the 'Go to Portfolio' button. Finally, click the 'Export CSV' button. Upon completion, a password will be displayed — return this password as your answer.",
    icon: "📈",
    component: ExportWalletPortfolio,
    tags: ["wallet", "portfolio", "export", "crypto"],
    password: PASSWORD_ExportWalletPortfolio,
    difficulty: "medium",
    variant: "base",
    base_task: TASK_ID_ExportWalletPortfolio,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_CryptoDAOVoting,
    title: "Crypto DAO Voting",
    description:
      "First, connect your wallet by clicking the 'Connect Wallet' button and selecting 'Wallet 1'.  Second, input password 'Mywallet_password' to authorize access. Third, navigate to the 'OpenSource Collective' section by clicking the 'Go to OpenSource Collective' button. Fourth, in the active proposal list click the 'Increase Development Grant'. Finally, in the proposal, vote by clicking 'Yes' Button. Upon completion, a password will be displayed — return this password as your answer.",
    icon: "📝",
    component: CryptoDAOVoting,
    tags: ["dao", "voting", "governance", "crypto"],
    password: PASSWORD_CryptoDAOVoting,
    difficulty: "medium",
    variant: "base",
    base_task: TASK_ID_CryptoDAOVoting,
    requires_file_upload: false,
  },
];
