import { RouteConfig } from "./routeType";

import SmartThermostatConfigurator, { TASK_ID as ID_THERMO, PASSWORD as PW_THERMO } from "../pages/SmartThermostatConfigurator";
import TrackRecentOrder, { TASK_ID as ID_TRACK, PASSWORD as PW_TRACK } from "../pages/TrackRecentOrder";
import VaccinationHistory, { TASK_ID as ID_VACCINE, PASSWORD as PW_VACCINE } from "../pages/VaccinationHistory";
import EveningRoutineSetup, { TASK_ID as ID_ROUTINE, PASSWORD as PW_ROUTINE } from "../pages/EveningRoutineSetup";
import PortfolioBalancer, { TASK_ID as ID_PORTFOLIO, PASSWORD as PASSWORD_PORTFOLIO } from "../pages/PortfolioBalancer";
import ConfigureCodeEditor, {TASK_ID as ID_CONFIG,PASSWORD as PASSWORD_CONFI} from "../pages/ConfigureCodeEditor";
import ContainerTracker, {TASK_ID as ID_CONTAINER,PASSWORD as PASSWORD_CONTAINER} from "../pages/ContainerTracker";
import ChildDevelopmentMilestones, {TASK_ID as ID_CHILDDEV,PASSWORD as PASSWORD_CHILDDEV} from "../pages/ChildDevelopmentMilestones";
import LogStrengthWorkout, {TASK_ID as ID_WORKOUT,PASSWORD as PASSWORD_WORKOUT} from "../pages/LogStrengthWorkout";
import CreateNFT, { TASK_ID as ID_NFT, PASSWORD as PW_NFT } from "../pages/CreateNFT";
import ClassroomChores, { TASK_ID as ID_CHORES, PASSWORD as PW_CHORES } from "../pages/ClassroomChores";
import HealthcareReferral, {TASK_ID as ID_HEALTHCARE,PASSWORD as PASSWORD_HEALTHCARE} from "../pages/HealthcareReferral";
import MoviesInThePark, {TASK_ID as ID_MOVIES_PARK,PASSWORD as PASSWORD_MOVIES_PARK} from "../pages/MoviesInThePark";
import SearchContracts, {TASK_ID as ID_CONTRACTS_SEARCH, PASSWORD as PASSWORD_CONTRACTS_SEARCH} from "../pages/SearchContracts";
import HirePlumber, {TASK_ID as ID_HIRE_PLUMBER, PASSWORD as PASSWORD_HIRE_PLUMBER} from "../pages/HirePlumber";
import CreateFlashSale, { TASK_ID as ID_FLASH_SALE, PASSWORD as PASSWORD_FLASH_SALE } from "../pages/CreateFlashSale";
import LegalWarrantyCheckout, {TASK_ID as ID_LEGAL_CHECKOUT,PASSWORD as PASSWORD_LEGAL_CHECKOUT} from "../pages/LegalWarrantyCheckout";
import AddToWishlist, { TASK_ID as ID_WISHLIST, PASSWORD as PASSWORD_WISHLIST } from "../pages/AddCourseToWishlist";
import GenerateSalesReport, {TASK_ID as ID_SALES_REPORT, PASSWORD as PASSWORD_SALES_REPORT} from "../pages/GenerateSalesReport";

export const routes_7: RouteConfig[] = [
  {
    path: ID_THERMO,
    title: "Smart Thermostat Setup",
    description: "Your task is to configure a smart thermostat. First, on the Control tab, set the mode and temperature according to the instructions. Then, go to the Schedule tab and update the time block by entering the specified start time, end time, and target temperature. Once both configurations are completed as instructed, click 'Confirm Settings' to reveal the password. Return this password as your answer.",
    icon: "🌡️",
    component: SmartThermostatConfigurator,
    tags: ["iot", "configure"],
    difficulty: "medium",
    password: PW_THERMO,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: ID_TRACK,
    title: "Track Most Recent Order",
    description: "Your task is to go to 'My Orders' and find Gaming Mouse' with order ID as 'ORD5373' still in transit. Click the 'Track Package' button. On the tracking page, view the shipping history and subscribe to 'Text Message Alerts'. Once alerts are successfully enabled, a password will appear. Return this password when you are done.",
    icon: "📦",
    component: TrackRecentOrder,
    tags: ["ecommerce", "tracking"],
    difficulty: "medium",
    password: PW_TRACK,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: ID_VACCINE,
    title: "Update Vaccination Record",
    description: "Your task is to go to the 'Immunizations' section and add a new entry for a 'Tetanus' vaccine, ensuring you set the date to 2025-07-17 and the clinic to WellCare Facility. After this specific record is added, you must download the TXT file of your vaccination history to reveal the password, which you will return as your answer.",
    icon: "💉",
    component: VaccinationHistory,
    tags: ["health", "vaccine", "form", "file", "dynamic"],
    difficulty: "medium",
    password: PW_VACCINE,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: ID_ROUTINE,
    title: "Create Evening Wind-Down Routine",
    description: "Your task is to create a new 'Evening Wind-Down' routine. Add three specific tasks: 'Read for 20 minutes', 'Prepare for tomorrow', and 'Meditate for 5 minutes'. Once all three tasks have been added manually and the routine is confirmed, a password will be revealed. Return this password as your answer.",
    icon: "🌙",
    component: EveningRoutineSetup,
    tags: ["productivity", "routine", "automation", "UI"],
    difficulty: "easy",
    password: PW_ROUTINE,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: ID_PORTFOLIO,
    title: "Rebalance Portfolio",
    description: "Your task is to use the portfolio balancing tool. Manually set your target asset allocation for US Stocks, International Stocks, and Bonds. Ensure the total allocation equals 100%. Execute a 'one-click rebalance' which sells and buys assets to return to the target, minimizing tax implications. Once rebalanced, a password will be revealed. Return this password as your answer.",
    icon: "📊",
    component: PortfolioBalancer,
    tags: ["finance", "portfolio", "rebalance", "optimization"],
    difficulty: "medium",
    password: PASSWORD_PORTFOLIO,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: ID_CONFIG,
    title: "Configure Code Editor Settings",
    description: "Your task is to open the web-based code editor settings. Change the color theme to 'Dracula'. Install the extension called 'Code Spell Checker'. Then, configure the indentation style to use 'Spaces' instead of 'Tabs'. Once all these changes are done, save the configuration to your profile. A password will be revealed if everything is correct. Return this password as your answer.",
    icon: "🖥️",
    component: ConfigureCodeEditor,
    tags: ["productivity", "editor", "settings", "extensions", "configuration"],
    difficulty: "easy",
    password: PASSWORD_CONFI,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: ID_CONTAINER,
    title: "Track Container Across Globe",
    description: "Your task is to go to the 'Track' tab and select container 'CONT1234567' from the list. On the tracking page, view its current location and full journey history from the port of origin. Then click 'Set Arrival Notification', a password will appear. Return this password when you are done.",
    icon: "🚢",
    component: ContainerTracker,
    tags: ["ecommerce", "tracking", "logistics", "map", "event"],
    difficulty: "medium",
    password: PASSWORD_CONTAINER,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: ID_CHILDDEV,
    title: "Track Child Milestones",
    description: "Your task is to access the 'Developmental Milestones' section of a parenting app for your 18-month-old child. Mark the milestones 'Can walk alone' and 'Says several single words' as completed. Once both are checked, you'll see a list of suggested activities for encouraging future development. A password will appear when this is done. Return this password as your answer.",
    icon: "🧸",
    component: ChildDevelopmentMilestones,
    tags: ["health", "child", "milestones", "parenting", "form"],
    difficulty: "easy",
    password: PASSWORD_CHILDDEV,
    variant: "base",
    requires_file_upload: false
  },
  {
  path: ID_WORKOUT,
  title: "Log Strength Workout",
  description: "Your task is to log a new 'Strength Training' workout. Add three exercises: 'Bench Press' (3x10), 'Squats' (3x12), and 'Deadlifts' (1x5). Save the workout and view it in your activity feed. The password will be revealed upon saving in the activity feed.",
  icon: "🏋️",
  component: LogStrengthWorkout,
  tags: ["fitness", "logging", "form", "tabs", "activity"],
  difficulty: "easy",
  password: PASSWORD_WORKOUT,
  variant: "base",
  requires_file_upload: false
},
{
  path: ID_NFT,
  title: "Create NFT on Sepolia",
  description:
    "Your task is to create and verify an NFT. Navigate to the NFT 'Create' page. Upload an image, name it 'My First NFT', and provide a short description. Set the creator royalty to 7.5%. Mint the NFT on the Sepolia test network and simulate confirming the transaction. Once the NFT is successfully minted, go to the Verify NFT tab to view its details. If all conditions are met, a password will be revealed. Return this password as your answer.",
  icon: "🖼️",
  component: CreateNFT,
  tags: ["web3", "nft", "blockchain", "image", "form"],
  difficulty: "medium",
  password: PW_NFT,
  variant: "base",
  requires_file_upload: true
},
{
  path: ID_CHORES,
  title: "Assign Classroom Chores",
  description:
    "Your goal is to find the password for the class-wide reward. In the classroom chore application, assign tasks to students to earn points. You must ensure Taylor has 40 points and Casey has 20 points. The password will be revealed once you assign enough chores for Morgan to reach 100 points.",
  icon: "🧹",
  component: ClassroomChores,
  tags: ["education", "game", "task", "progress", "simulation"],
  difficulty: "easy",
  password: PW_CHORES,
  variant: "base",
  requires_file_upload: false
},
{
  path: ID_HEALTHCARE,
  title: "Find a Doctor",
  description:
    "Your task is to use the 'Find a Doctor' tool on the healthcare marketplace. The system will refer you to three in-network primary care physicians based on your location and insurance. Compare the options and save Dr. Clara Fields to your profile. A password will be revealed upon completion.",
  icon: "🏥",
  component: HealthcareReferral,
  tags: ["civictech", "healthcare", "profile", "recommendation"],
  difficulty: "easy",
  password: PASSWORD_HEALTHCARE,
  variant: "base",
  requires_file_upload: false,
},
{
  path: ID_MOVIES_PARK,
  title: "Vote for Movies in the Park",
  description:
    "Your task is to view the 'Movies in the Park' summer schedule on the city's Parks and Recreation site. Vote for which movie should play in the final week, and RSVP to receive a reminder. A password will be revealed if you vote for Jurassic Park and complete the RSVP.",
  icon: "🎬",
  component: MoviesInThePark,
  tags: ["civictech", "movies", "parks", "poll", "rsvp"],
  difficulty: "easy",
  password: PASSWORD_MOVIES_PARK,
  variant: "base",
  requires_file_upload: false,
},
{
  path: ID_CONTRACTS_SEARCH,
  title: "Search Contracts with Indemnity Clause",
  description:
    "Your goal is to complete the contract search and export process. Follow the instructions on the header of the task to search for the appropriate contracts and export the results. Upon completion, a password will be revealed and return this password as your answer.",
  icon: "📑",
  component: SearchContracts,
  tags: ["contracts", "legal", "filter", "export", "search"],
  difficulty: "medium",
  password: PASSWORD_CONTRACTS_SEARCH,
  variant: "base",
  requires_file_upload: false,
},
{
  path: ID_HIRE_PLUMBER,
  title: "Hire a Plumber",
  description:
    "Your task is to go to the 'Hire a Plumber' page on a skilled trades platform, post a job with the description 'my sink is clogged' review the three incoming bids from local professionals, and hire 'PipeMasters LLC' to complete the job. Once you successfully hire them, a password will be revealed.",
icon: "🛠️",
  component: HirePlumber,
  tags: ["hiring", "ecommerce", "bidding", "comparison"],
  difficulty: "easy",
  password: PASSWORD_HIRE_PLUMBER,
  variant: "base",
  requires_file_upload: false,
},
{
  path: ID_FLASH_SALE,
  title: "Create Flash Sale",
  description: "Your goal is to set up a Flash Sale marketing event. Follow the instructions provided at the top of the page to select a product, apply the required discount, and schedule the sale window. Upon successful completion, a password will be revealed. Return this password as your answer.",
  icon: "⚡",
  component: CreateFlashSale,
  tags: ["marketing", "e-commerce", "flash-sale", "discount"],
  difficulty: "easy",
  password: PASSWORD_FLASH_SALE,
  variant: "base",
  requires_file_upload: false
},
{
  path: ID_LEGAL_CHECKOUT,
  title: "Agree to Warranty Terms",
  description:
    "Your task is to review and agree to the Extended Warranty Agreement when purchasing a high-value item. After checking the agreement box and completing checkout, a password will be revealed.",
  icon: "📜",
  component: LegalWarrantyCheckout,
  tags: ["ecommerce", "legal", "checkout", "agreement"],
  difficulty: "easy",
  password: PASSWORD_LEGAL_CHECKOUT,
  variant: "base",
  requires_file_upload: false,
},
{
  path: ID_WISHLIST,
  title: "Add Courses to Wishlist",
  description:
    "Your task is to browse the courses on the 'Course Catalog' add both the 'Advanced React' and 'UX Design Fundamentals' courses to your wishlist, and then navigate to the 'My Wishlist' tab, where you will find that the password is displayed.",
  icon: "📚",
  component: AddToWishlist,
  tags: ["elearning", "wishlist", "courses"],
  difficulty: "easy",
  password: PASSWORD_WISHLIST,
  variant: "base",
  requires_file_upload: false,
},
{
  path: ID_SALES_REPORT,
  title: "Generate Sales Report",
  description:
    "Your task is to generate a sales report for the last quarter. Filter by product category, identify the top-selling category, and export the results. Once done, a password will be shown.",
  icon: "📈",
  component: GenerateSalesReport,
  tags: ["e-commerce", "reports", "csv", "analytics"],
  difficulty: "medium",
  password: PASSWORD_SALES_REPORT,
  variant: "base",
  requires_file_upload: false,
}

];