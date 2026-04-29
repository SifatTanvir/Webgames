import { RouteConfig } from "./routeType";
import UserInvitationApp, {
  PASSWORD_USER_Invitation,
  TASK_ID_User_Invitation,
} from "../pages/CmsProfile";
import MediaLibraryManager, {
  PASSWORD__media_lib_mgt,
  TASK_ID_media_lib_mgt,
} from "../pages/MediaLibraryManager";
import BillPayManager, {
  TASK_ID_bill_pay_setup,
  PASSWORD__bill_pay_setup,
} from "../pages/BillPayManager";
import PotholeRepairService, {
  TASK_ID_potholerepairservice,
  PASSWORD_potholerepairservice,
} from "../pages/PotholeRepairService";
import CMSArticleCreation, {
  TASK_ID_cmsarticlecreation,
  PASSWORD_cmsarticlecreation,
} from "../pages/CMSArticleCreation";
import ChoreManagement, {
  TASK_ID_HouseholdChoreManager,
  PASSWORD_HouseholdChoreManager,
} from "../pages/ChoreManagement";
import DAOPortal, {
  TASK_ID_daoportal,
  PASSWORD_daoportal,
} from "../pages/DAOPortal";
import FraudAlertResponse, {
  TASK_ID_fraudalertresponse,
  PASSWORD_fraudalertresponse,
} from "../pages/FraudAlertResponse";
import CryptoDEXSwap, {
  TASK_ID_cryptodexswap,
  PASSWORD_cryptodexswap,
} from "../pages/CryptoDEXSwap";
import BudgetAllocation, {
  TASK_ID as TASK_ID_BudgetAllocation,
  PASSWORD as PASSWORD_BudgetAllocation,
} from "../pages/BudgetAllocation";
import BurndownChartGenerator, {
  TASK_ID as TASK_ID_BurndownChart,
  PASSWORD as PASSWORD_BurndownChart,
} from "../pages/BurndownChartGenerator";
import MultiCityFlightBooking, {
  PASSWORD_multicityflightbooking,
  TASK_ID_multicityflightbooking,
} from "../pages/MultiCityFlightBooking";
import GanttMilestoneManagement, {
  TASK_ID_ganttmilestonemanagement,
  PASSWORD_ganttmilestonemanagement,
} from "../pages/GanttMilestoneManagement";
import EcommercePickupOrder, {
  TASK_ID as TASK_ID_EcommercePickupOrder,
  PASSWORD as PASSWORD_EcommercePickupOrder,
} from "../pages/EcommercePickupOrder";
import PaymentApp, {
  TASK_ID_paymentapp,
  PASSWORD_paymentapp,
} from "../pages/PaymentApp";
import MovieStreamComponent, {
  TASK_ID_moviestreamcomponent,
  PASSWORD_moviestreamcomponent,
} from "../pages/MovieStreamComponent";
import BabysitterBooking, {
  TASK_ID_babysitterbooking,
  PASSWORD_babysitterbooking,
} from "../pages/BabysitterBooking";
import SupportTicketRouter, { TASK_ID as TASK_ID_SupportTicketRouter, PASSWORD as PASSWORD_SupportTicketRouter } from "../pages/SupportTicketRouter";
import ProductRepricingTool, { TASK_ID as TASK_ID_ProductRepricingTool, PASSWORD as PASSWORD_ProductRepricingTool } from "../pages/ProductRepricingTool";
import PersonalizedLearningPath, { TASK_ID as TASK_ID_PersonalizedLearningPath, PASSWORD as PASSWORD_PersonalizedLearningPath } from "../pages/PersonalizedLearningPath";
import OptimizeSeatingAllocation, { TASK_ID_optimizeseatingallocation, PASSWORD_optimizeseatingallocation } from "../pages/OptimizeSeatingAllocation";
import ContractDrafting, { TASK_ID_draftnewcontract, PASSWORD_draftnewcontract } from "../pages/ContractDrafting";

export const routes_11: RouteConfig[] = [
  {
    path: TASK_ID_User_Invitation,
    title: "User Invitation Management",
    description:
      "Your goal is to complete the new user invitation process. First, navigate to the 'Users' panel from the main navigation. Second, click on the 'Invite New User' button to start the invitation process. Third, enter name 'John' and the email address as 'editor@example.com' in the 'Full Name' and 'email' fields respectively. Fourth, select the 'Editor' role from the role dropdown menu, which grants permissions to create and edit posts but not publish them. Finally, click 'Save User Profile' to complete the invitation process. These steps will reveal the password. Extract and return this password as your answer.",
    icon: "👥",
    component: UserInvitationApp,
    tags: [
      "user management",
      "admin",
      "invitation",
      "roles",
      "permissions",
      "cms",
    ],
    difficulty: "medium",
    password: PASSWORD_USER_Invitation,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_media_lib_mgt,
    title: "Media Library Management",
    description:
      "Your goal is to complete the media library management process. First, open the Media Library section and click 'Upload New Image'. Second, enter an image URL 'https://www.pngall.com/wp-content/uploads/4/World-Wide-Web-PNG-Image-File.png' in the 'Image URL' field, add alt text describing it as 'A modern city skyline at dusk', then click the 'Upload' button. Third, click on the 'Folders' section and create a new folder named 'Blog Banners'. Finally, return to the Media Library section, find the newly uploaded image, click 'Move to folder', select the 'Blog Banners' folder, and click 'Move File' to confirm the organization. Upon completion, a password will be shown; return this password as your answer.",
    icon: "📁",
    component: MediaLibraryManager,
    tags: ["cms", "media", "upload", "organization", "url"],
    difficulty: "medium",
    password: PASSWORD__media_lib_mgt,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_bill_pay_setup,
    title: "Bill Pay Setup",
    description:
      "Your goal is to complete the bill pay setup process for a new payee. First, navigate to the 'Bill Pay' section from the main menu. Second, click 'Add New Payee' and enter the payee details: Name: 'City Waterworks', Account Number: 'CW-98765', then click the 'Add Payee' button. Third, schedule a one-time payment by clicking 'Pay Now' for the newly added City Waterworks payee, entering an amount of '75.50', setting the payment date to this Friday, and clicking 'Schedule Payment'. Finally, set up a recurring monthly payment by clicking 'Set Recurring' for the same City Waterworks payee, entering an amount of '70.00', keeping frequency as 'Monthly', setting the start date to the first of next month, and clicking 'Set Up Recurring Payment'. Upon successful completion of both payment setups, a password will be shown; return this password as your answer.",
    icon: "💳",
    component: BillPayManager,
    tags: ["banking", "bill-pay", "payments", "finance"],
    difficulty: "medium",
    password: PASSWORD__bill_pay_setup,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_potholerepairservice,
    title: "Pothole Repair Service Request",
    description:
      "Your goal is to complete the pothole repair service request process. First, navigate to the 'New Request' section and select 'Pothole Repair' from the service type dropdown. Second, use the interactive map to drop a pin at the intersection of 'Main Street and Oak Avenue'. Third, upload the URL to the pothole photo using this link: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96'. Fourth, enter the description as 'Large pothole causing vehicle damage, approximately 2 feet wide and 6 inches deep'. Finally, click 'Submit Request' to complete the process. Upon successful submission, a secret password will be displayed; return this password as your answer.",
    icon: "🏛️",
    component: PotholeRepairService,
    tags: ["civic", "utility", "infrastructure", "reporting"],
    difficulty: "medium",
    password: PASSWORD_potholerepairservice,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_cmsarticlecreation,
    title: "SEO Article Creation",
    description:
      "Your goal is to complete the SEO article creation process. First, click 'Create New Article' and enter the article title as 'The Future of Sustainable Energy Solutions'. Second, set the focus keyword to 'sustainable energy' in the SEO settings panel. Third, write a meta description as 'Discover the latest sustainable energy innovations and their impact on our planet's future. Learn about renewable technologies transforming the energy sector.' Fourth, write article content that includes the text 'renewable energy technologies are transforming our world', then highlight this exact text and add an internal link to the article titled 'Renewable Energy Trends 2024' from the dropdown in the modal that pops up. Fifth, run the SEO analysis tool and ensure it shows a 'Green' or 'Good' rating before proceeding. Finally, click 'Save Draft' to complete the process. Upon completion, a password will be shown; return this password as your answer.",
    icon: "📝",
    component: CMSArticleCreation,
    tags: ["cms", "seo", "content", "articles"],
    difficulty: "medium",
    password: PASSWORD_cmsarticlecreation,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_HouseholdChoreManager,
    title: "Household Chore Management",
    description:
      "Your goal is to complete the household chore management process. First, click 'create chore' tab then click the 'Create New Chore' button and enter the chore name as 'Clean the bathroom'. Second, select 'Sarah Johnson' from the housemate dropdown list. Third, set the due date to the upcoming Saturday using the date picker. Fourth, select 'Toilet bowl cleaner' and 'Scrub brush' from the cleaning supplies checklist, then click 'create chore'. Fifth, navigate to your assigned chores and click 'Mark Complete' on the chore titled 'Vacuum living room'. These steps will reveal the password. Extract and return this password as your answer.",
    icon: "🧹",
    component: ChoreManagement,
    tags: ["productivity", "chores", "household", "task-management"],
    difficulty: "medium",
    password: PASSWORD_HouseholdChoreManager,
    variant: "base",
    requires_file_upload: false,
  },

  {
    path: TASK_ID_daoportal,
    title: "DAO Proposal Creation",
    description:
      "Your goal is to connect your wallet to the DAO portal and create a new proposal for hackathon sponsorship. First, locate and click the 'Connect Wallet' button on the DAO portal homepage. Second, select 'MetaMask' from the wallet connection options and approve the connection request. Third, navigate to the 'New Proposal' section once your wallet is successfully connected. Fourth, click the 'Create Proposal' button to begin drafting. Fifth, enter the proposal details: Title: 'Sponsor a Local Hackathon', Category: 'Community Funding', Funding Amount: '10 ETH'. Sixth, write the following justification: 'Supporting local hackathons will foster innovation in our community, attract talented developers to our ecosystem, and demonstrate our commitment to grassroots blockchain education and development.' Finally, click the 'Submit to Blockchain' button to publish your proposal for community voting. Upon successful submission, a secrete password will be generated and displayed; return this password as your answer.",
    icon: "🏛️",
    component: DAOPortal,
    tags: ["web3", "dao", "proposal", "wallet", "blockchain"],
    difficulty: "medium",
    password: PASSWORD_daoportal,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_fraudalertresponse,
    title: "Fraud Alert Response",
    description:
      "Your goal is to complete the fraud alert response process for a suspicious transaction. First, navigate to the notification center and locate the fraud alert for a suspicious $200 charge. Second, open the fraud alert notification and review the transaction details. Third, mark the transaction as 'Not Mine' by selecting the appropriate option '❌ No, this is not my transaction'. Fourth, click on the 'Lock Card Now' button that appears on the page, to immediately lock your credit card. Finally, request a replacement card to be mailed to your home address by selecting the 'Standard Delivery (5-7 days) - Free' option and clicking on the 'Request Replacement Card' button. Upon completion, a password will be shown; return this password as your answer.",
    icon: "🚨",
    component: FraudAlertResponse,
    tags: ["finance", "security", "fraud", "alert", "banking"],
    difficulty: "medium",
    password: PASSWORD_fraudalertresponse,
    variant: "base",
    requires_file_upload: false,
  },

  {
    path: TASK_ID_cryptodexswap,
    title: "Crypto DEX Swap",
    description:
      "Your goal is to complete a cryptocurrency swap from ETH to USDC on the DEX platform. First, connect your wallet by clicking the 'Connect Wallet' button. Second, in the 'From' input section click on the 'select token' dropdown and select 'ETH' as the source token and in the 'To' input section, click on the 'select token' dropdown and select 'USDC' as the destination token. Third, enter the amount as '0.1' ETH in the 'From' section's input field. Fourth, adjust the slippage tolerance to '0.5%' in the settings, by clicking the settings gear icon, and selecting '0.5%' from the 'swap settings' section. Finally, click 'Execute Swap' to complete the transaction. Upon successful completion, a password will be shown; return this password as your answer.",
    icon: "🔄",
    component: CryptoDEXSwap,
    tags: ["web3", "defi", "swap", "cryptocurrency"],
    difficulty: "medium",
    password: PASSWORD_cryptodexswap,
    variant: "base",
    requires_file_upload: false,
  },

  {
    path: TASK_ID_BudgetAllocation,
    title: "Budget Allocation Simulator",
    description:
      "Your goal is to complete the city's interactive budget allocation process. First, launch the budget simulator by clicking the 'Launch Budget Simulator' button and then review the available departments by clicking 'review departments' button. Second, allocate the discretionary fund using the sliders with these amounts: Parks: '$250,000', Public Safety: '$250,000', Libraries: '$200,000', Infrastructure: '$200,000', Public Health: '$100,000'. Third, verify that the total allocation equals exactly '$1,000,000' by clicking on 'verify total'. Finally, click 'Submit Budget' to finalize your proposed allocation. Upon completion, a password will be shown; return this password as your answer.",
    icon: "🏛️",
    component: BudgetAllocation,
    tags: ["civic", "budget", "allocation", "government"],
    difficulty: "medium",
    password: PASSWORD_BudgetAllocation,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_BurndownChart,
    title: "Generate Burndown Chart",
    description:
      "Your goal is to generate a burndown chart for the current sprint with specific filtering and annotation requirements. First, navigate to the 'Charts' section and select 'Burndown Chart' from the chart types. Second, configure the chart by selecting 'Current Sprint' as the time period from the dropdown and enable the filter to exclude 'Weekend' days from the display, by checking the 'Exclude Weekend days from display' box. Third, add an annotation to day 3 of the chart with the text 'Unexpected bug discovered', by clicking the 'Add Annotation' button and filling the 'Day' and 'Annotation text' input fields, and clicking 'Add Annotation' button. Finally, export the annotated chart as a PNG image by clicking the 'Export as PNG' button. Upon completion, a password will be shown; return this password as your answer.",
    icon: "📉",
    component: BurndownChartGenerator,
    tags: ["analytics", "charts", "project-management", "burndown", "sprint"],
    difficulty: "medium",
    password: PASSWORD_BurndownChart,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_multicityflightbooking,
    title: "Multi-City Flight Booking",
    description:
      "Your goal is to complete a multi-city flight booking using the flight search tool. First, select the 'Multi-City' flight search option. Second, enter the first flight details: select 'LHR' from the From dropdown, select 'JFK' from the To dropdown, and set the departure date to next Saturday. Third, add the second flight leg: From: 'JFK', To: 'LAX', with departure date three days after the first flight. Fourth, add the final flight leg: From: 'LAX', To: 'LHR', with departure date one week after the second flight, then click on the 'Search Flights' button. Fifth, select the cheapest flight for all three legs from the available options. Finally, click 'Add to Cart' to complete the booking process. Upon completion, a password will be shown; return this password as your answer.",
    icon: "✈️",
    component: MultiCityFlightBooking,
    tags: ["flights", "booking", "multi-city", "travel"],
    difficulty: "medium",
    password: PASSWORD_multicityflightbooking,
    variant: "base",
    requires_file_upload: false,
  },

  {
    path: TASK_ID_ganttmilestonemanagement,
    title: "Gantt Milestone Management",
    description:
      "Your goal is to create a new milestone in the Gantt Chart view and establish a task dependency. First, navigate to the 'Gantt Chart' view for your project. Second, create a new milestone by clicking the 'Add Milestone' button. Third, enter the milestone details: Name: 'Phase 1 Complete', Date: the date should be set to next saturday. Fourth, save the milestone by clicking the 'Save' button. Fifth, locate the 'Deploy to Staging' task in the Gantt chart. Sixth, right-click on the 'Deploy to Staging' task and select 'Add Dependency' from the context menu. Seventh, choose 'Phase 1 Complete' milestone as the dependency. Finally, confirm the dependency by clicking 'Apply'. Upon completion, the secret password will be revealed; return this secret password as your answer.",
    icon: "📊",
    component: GanttMilestoneManagement,
    tags: ["project-management", "gantt-chart", "milestones", "dependencies"],
    difficulty: "hard",
    password: PASSWORD_ganttmilestonemanagement,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_EcommercePickupOrder,
    title: "E-commerce Order & Pickup",
    description:
      "Your goal is to complete the order placement and pickup process. First, browse the product catalog and click on 'Add to cart' button on the first two items to add them to your cart. Second, click on the cart icon at the top right corner of the screen. Third, click on the to 'proceed to checkout' button and enter the shipping details: Name: 'Sarah Johnson', Email: 'sarah.johnson@email.com', Phone: '555-987-6543'. Fourth, select 'In-Store Pickup' as your delivery method and choose 'Downtown Store Location' from the available pickup locations in the dropdown. Fifth, complete the payment process using the following card details: Card number '1234 5674 8012 2356', expiry date '03/28', CVV '123', then click on 'complete order' button . Fifth, after receiving the order confirmation, navigate to your order details page. Finally, click the 'Generate Pickup QR Code' button to create your pickup code. Upon completion, a password will be shown; return this password as your answer.",
    icon: "🛒",
    component: EcommercePickupOrder,
    tags: ["ecommerce", "checkout", "pickup", "orders"],
    difficulty: "medium",
    password: PASSWORD_EcommercePickupOrder,
    variant: "base",
    requires_file_upload: false,
  },

  {
    path: TASK_ID_paymentapp,
    title: "Payment Transaction",
    description:
      "Your goal is to complete a payment transaction to Sarah Johnson and decline a payment request from Mike Chen. Navigate to the 'Send Money' section and search for 'Sarah Johnson' in the contacts list. Select her contact from the search results, then enter the amount '15' and add the note 'Coffee' before clicking the 'Send Payment' button. Next, navigate to the 'Requests' tab and locate the incoming payment request from 'Mike Chen' for '$25'. Click the 'Decline' button on this specific request, then enter the decline reason as 'Incorrect amount' in the text area and click 'Confirm Decline'. Upon successful completion of both actions, a secret password will be revealed on the interface. Return this password as your final answer.",
    icon: "💳",
    component: PaymentApp,
    tags: ["finance", "payment", "transaction"],
    difficulty: "medium",
    password: PASSWORD_paymentapp,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_moviestreamcomponent,
    title: "Movie Rating & Watchlist",
    description:
      "Your goal is to rate a recently watched movie and add a recommended alternative to your watchlist. First, navigate to your recently watched movies from the 'recently watched tab' and then select 'The Lost Kingdom' which you watched last week. Second, click the 'Rate This Movie' button and select the 'Thumbs Down' button to indicate your dislike. Third, when the system presents three alternative recommendations, click 'Add to Watchlist' for the movie titled 'Midnight Chronicles'. Finally, confirm the addition to your watchlist, by clicking 'Yes, Add to My List' button. Upon completion, a password will be shown; return this password as your answer.",
    icon: "🎬",
    component: MovieStreamComponent,
    tags: ["entertainment", "recommendation", "rating", "watchlist"],
    difficulty: "medium",
    password: PASSWORD_moviestreamcomponent,
    variant: "base",
    requires_file_upload: false,
  },

  {
    path: TASK_ID_babysitterbooking,
    title: "Book Friday Night Babysitter",
    description:
      "Your goal is to find and book a babysitter for this Friday night. First, click on 'Find sitters', then set the date to this Friday and time from 7 PM to 11 PM for 2 children. Second, apply filters to show only sitters with 'First Aid Certification' and more than 5 years of experience by selecting '5+ years' from the  'Minimum experience' dropdown. Third, select the highest-rated available sitter from the 'Minimum rating' dropdown. Fourth, click on 'view profile' button on the baby sitter with the highest rating and the highest years of experience. Fifth, send a booking request with the message: 'Hi! I need a reliable sitter for my two kids this Friday evening. Looking forward to hearing from you!' in 'message' text input field, and click the 'send booking request' button. Once the booking request is successfully sent, a secret password will be revealed. Return this password as your answer.",
    icon: "👶",
    component: BabysitterBooking,
    tags: ["childcare", "booking", "scheduling"],
    difficulty: "medium",
    password: PASSWORD_babysitterbooking,
    variant: "base",
    requires_file_upload: false,
  },
  {
  path: TASK_ID_SupportTicketRouter,
  title: "Support Ticket Router",
  description: "Your task is to route incoming support tickets by matching against agent skill profiles in a dropdown, and assigning each ticket to balance workload and expertise. Filter tickets by keywords, identify agents with matching skills, assign tickets while maintaining balanced workloads, and finalize all routing assignments. A secret password will appear once all routing tasks are completed successfully. Return this password as your answer.",
  icon: "🎫",
  component: SupportTicketRouter,
  tags: ["project-management", "routing", "support", "workflow"],
  difficulty: "medium",
  password: PASSWORD_SupportTicketRouter,
  variant: "base",
  requires_file_upload: false
},
{
  path: TASK_ID_ProductRepricingTool,
  title: "Product Repricing Tool", 
  description: "Your task is to reprice underperforming products by fetching competitor prices, calculating optimal price adjustments, and updating product listings to maximize sales. Filter products by date range (last 60 days) to analyze sales performance, identify the 3 products with the lowest sales numbers, select each product and use the research tool to fetch competitor pricing data, then edit each product's price based on the recommended price after the price research. A secret password will appear once all 3 lowest-performing products have been successfully repriced. Return this password as your answer.",
  icon: "💰",
  component: ProductRepricingTool,
  tags: ["e-commerce", "pricing", "optimization", "competition"],
  difficulty: "medium", 
  password: PASSWORD_ProductRepricingTool,
  variant: "base",
  requires_file_upload: false
},
{
  path: TASK_ID_PersonalizedLearningPath,
  title: "Personalized Learning Path Creator",
  description: "Your task is to create personalized learning paths by analyzing student performance and building custom course sequences. Select the student 'Sarah Chen', analyze her quiz performance to identify skill gaps below 70%, then drag recommended courses into the learning path builder to create a sequential learning journey for her. Drag the courses that target skill gaps, create the learning path, and enable auto-enrollment. A secret password will appear once all steps are completed successfully.  Return this password as your answer.",
  icon: "📚",
  component: PersonalizedLearningPath,
  tags: ["e-learning", "personalization", "analytics", "education"],
  difficulty: "medium",
  password: PASSWORD_PersonalizedLearningPath,
  variant: "base",
  requires_file_upload: false
},
{
  path: TASK_ID_optimizeseatingallocation,
  title: "Optimize Cinema Seating",
  description: "Your task is to optimize the seating allocation of customers by analyzing customer preferences (family groups, accessibility needs, viewing preferences), selecting appropriate seats on the interactive cinema map, and sending confirmation emails once all customers are properly seated. A secret password will appear once the task is completed successfully. Return this password as your answer.",
  icon: "🎬",
  component: OptimizeSeatingAllocation,
  tags: ["entertainment", "cinema", "seating", "optimization"],
  difficulty: "medium",
  password: PASSWORD_optimizeseatingallocation,
  variant: "base",
  requires_file_upload: false
},
{
  path: TASK_ID_draftnewcontract,
  title: "Contract Drafting Tool", 
  description: "Your task is to draft a new contract by selecting a contract type from the dropdown (Professional Services Agreement), providing the name (John Mark) to populate the contract preview, analyzing the contract to see what compliance items are already present, comparing the analysis results with the compliance requirements to identify missing requirements, and Add the missing clauses. Export the final contract as PDF once all required clauses are added. A password will appear once all steps are completed successfully. Return this password as your answer.",
  icon: "📄",
  component: ContractDrafting,
  tags: ["contracts", "legal", "compliance", "drafting"],
  difficulty: "medium", 
  password: PASSWORD_draftnewcontract,
  variant: "base",
  requires_file_upload: false
}


];