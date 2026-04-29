import { RouteConfig } from "./routeType";
import TriviaApp, {
  PASSWORD_TriviaMultiRound,
  TASK_ID_TriviaMultiRound,
} from "../pages/TriviaMultiRound";
import TriviaLocation, {
  PASSWORD_TriviaLocation,
  TASK_ID_TriviaLocation,
} from "../pages/TriviaLocation";
import CosplayAssemble, {
  PASSWORD_CosplayAssemble,
  TASK_ID_CosplayAssemble,
} from "../pages/CosplayAssemble";
import CosplayConvention, {
  PASSWORD_CosplayConvention,
  TASK_ID_CosplayConvention,
} from "../pages/CosplayConvention";
import PodcastSubscription, {
  PASSWORD_PodcastSubscription,
  TASK_ID_PodcastSubscription,
} from "../pages/PodcastSubscription";
import PodcastCreatorStudio, {
  PASSWORD_PodcastCreation,
  TASK_ID_PodcastCreation,
} from "../pages/PodcastCreation";
import OrderConcert, {
  PASSWORD_OrderConcert,
  TASK_ID_OrderConcert,
} from "../pages/OrderConcert";
import TrackingHabit, {
  PASSWORD_TrackingHabit,
  TASK_ID_TrackingHabit,
} from "../pages/TrackingHabit";
import LoanAmortization, {
  PASSWORD_LoanAmortization,
  TASK_ID_LoanAmortization,
} from "../pages/LoanAmortization";
import FontsGlobal, {
  PASSWORD_FontsGlobal,
  TASK_ID_FontsGlobal,
} from "../pages/FontsGlobal";
import ReferralPatient, {
  PASSWORD_ReferralPatient,
  TASK_ID_ReferralPatient,
} from "../pages/ReferralPatient";
import GroupMember, {
  PASSWORD_GroupMember,
  TASK_ID_GroupMember,
} from "../pages/GroupMember";
import HiringCandidate, {
  PASSWORD_HiringCandidate,
  TASK_ID_HiringCandidate,
} from "../pages/HiringCandidate";
import HistoryOrder, {
  PASSWORD_HistoryOrder,
  TASK_ID_HistoryOrder,
} from "../pages/HistoryOrder";
import LabResult, {
  PASSWORD_LabResult,
  TASK_ID_LabResult,
} from "../pages/LabResult";
import NDATemplate, {
  PASSWORD_NDATemplate,
  TASK_ID_NDATemplate,
} from "../pages/LegalNdaTemplate";
import SignageManagement, {
  PASSWORD_SignageManagement,
  TASK_ID_SignageManagement,
} from "../pages/SignageManagement";
import MoviesMarathon, {
  PASSWORD_MoviesMarathon,
  TASK_ID_MoviesMarathon,
} from "../pages/MoviesMarathon";
import TemplateInstagram, {
  PASSWORD_TemplateInstagram,
  TASK_ID_TemplateInstagram,
} from "../pages/TemplateInstagram";
import VideoTroubleshooting, {
  PASSWORD_VideoTroubleshooting,
  TASK_ID_VideoTroubleshooting,
} from "../pages/VideoTroubleshooting";
import PaymentsOptions, {
  PASSWORD_PaymentsOptions,
  TASK_ID_PaymentsOptions,
} from "../pages/PaymentOptions";
import PlaylistStocks, {
  PASSWORD_PlaylistStocks,
  TASK_ID_PlaylistStocks,
} from "../pages/PlaylistStocks";
import RecommendationBlogPost, {
  PASSWORD_RecommendationBlogPost,
  TASK_ID_RecommendationBlogPost,
} from "../pages/RecommendationBlogPost";
import FocusRoomReservation, {
  PASSWORD_FocusRoomReservation,
  TASK_ID_FocusRoomReservation,
} from "../pages/FocusRoomReservation";
import AdvancedSavedSearch, {
  PASSWORD_AdvancedSavedSearch,
  TASK_ID_AdvancedSavedSearch,
} from "../pages/AdvancedSavedSearch";
import NftSneakerPurchase, {
  PASSWORD_NftSneakerPurchase,
  TASK_ID_NftSneakerPurchase,
} from "../pages/NftSneakerPurchase";
import ProcedurePreregistration, {
  PASSWORD_ProcedurePreregistration,
  TASK_ID_ProcedurePreregistration,
} from "../pages/ProcedurePreregistration";
import MarketingCampaign, {
  PASSWORD_MarketingCampaign,
  TASK_ID_MarketingCampaign,
} from "../pages/MarketingCampaign";
import ResourceAllocationDashboard, {
  PASSWORD_ResourceAllocationDashboard,
  TASK_ID_ResourceAllocationDashboard,
} from "../pages/ResourceAllocationDashboard";

export const routes_14: RouteConfig[] = [
  {
    path: TASK_ID_TriviaMultiRound,
    title: "Trivia Challenge",
    description:
      "Your goal is to complete a multi-question trivia challenge and retrieve the final password. First, click the “Start Trivia” button to begin. Second, select “Science & Nature” as your trivia category. Third, as questions appear in random order, choose the correct answers: “Mars” for the Red Planet, “Au” for the chemical symbol of gold, “Magnetic storms” for the cause of the aurora borealis, “Skin” for the largest human organ, and “Carbon” for the element with atomic number 6. Fourth, continue answering until all questions have been completed. Fifth, view your total score on the results screen. Finally, a password will be shown beneath your score; return this password as your answer.",
    icon: "🎯",
    component: TriviaApp,
    tags: ["enternainment", "trivia", "multiround", "dynamic", "multi-step"],
    difficulty: "hard",
    password: PASSWORD_TriviaMultiRound,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_TriviaLocation,
    title: "The Great Map Quest",
    description:
      "Your task is to complete a Geo Trivia Quest. Start the quest and correctly identify the country for all five trivia questions presented. Each question provides a clue, and you must select the correct country pin on the map. The correct answers are 'United Kingdom', 'Brazil', 'United States', 'Russia', and 'Japan' in order. After successfully answering all five questions in a row, the game will end, and a secret code will be revealed. Return this code as your answer.",
    icon: "🎯",
    component: TriviaLocation,
    tags: ["enternainment", "trivia", "location", "static", "multi-step"],
    difficulty: "hard",
    password: PASSWORD_TriviaLocation,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_CosplayAssemble,
    title: "Cosplay Style Synthesizer",
    description:
      "Your goal is to assemble a complete cosplay look based on your chosen theme. To unlock the secret password, you should assemble 'Cyberpunk Hacker' cosplay, which has a Glowing Visor for Headwear, a Tech-Jacket for Top, and Metallic Leggings for Bottom. After that, pick three accessories to complete your look, specifically a Hologram Wristband, LED Boots, and a Neon Circuit Tattoo. Upon completion, you will get a unique fashion code. Return this code as your answer.",
    icon: "🎭",
    component: CosplayAssemble,
    tags: ["enternainment", "cosplay", "assemble", "static", "multi-step"],
    difficulty: "medium",
    password: PASSWORD_CosplayAssemble,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_CosplayConvention,
    title: "Cosplay Convetion Planning",
    description:
      "Your goal is to successfully plan your cosplay convention weekend. You'll be attending NeoCon 2025 and have selected three key activities: 'Foam Armor Workshop', 'Cosplay Parade', and 'Meet the Voice Actors'. You have a total budget of $150, so choose your transportation, hotel, and meal options carefully to stay within your limit. Next, pack your essentials by dragging items like 'Wig Glue', 'Prop Repair Kit', and 'Comfortable Shoes' into your virtual suitcase. Once your itinerary and packing list are complete, you'll receive a trip summary along with a confirmation code. Return this code as your answer.",
    icon: "🎭",
    component: CosplayConvention,
    tags: ["enternainment", "cosplay", "convention", "static", "multi-step"],
    difficulty: "medium",
    password: PASSWORD_CosplayConvention,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_PodcastSubscription,
    title: "Podcast Playlist Creation",
    description:
      "Your goal is to subscribe to some podcasts to obtain a secret password. First, subscribe to 'Tech Forward' and 'Cosmic Chronicles.' Next, add 'The Quantum Leap in AI' and 'Secrets of the Black Hole' to your queue. Finally, create a listening session to reveal the password and return the password as your answer.",
    icon: "🎭",
    component: PodcastSubscription,
    tags: ["enternainment", "podcast", "subscription", "static", "multi-step"],
    difficulty: "hard",
    password: PASSWORD_PodcastSubscription,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_PodcastCreation,
    title: "Podcast Creator Studio",
    description:
      "Your task is to launch a new mini-podcast. First, in the setup screen, enter the podcast title 'Digital Drifters' and the author name 'Alex Wren', then create the studio. Once inside the studio, record a new audio clip by clicking the microphone button; let it record for at least 3 seconds, then stop it. After recording, you must title the new clip 'The First Signal' and then click the publish button. Upon successful publication of the correctly titled clip, a confirmation code will be revealed. Return this code as your answer.",
    icon: "🎤",
    component: PodcastCreatorStudio,
    tags: ["enternainment", "podcast", "creation", "static", "multi-step"],
    difficulty: "medium",
    password: PASSWORD_PodcastCreation,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_OrderConcert,
    title: "Concert Ticket Purchase",
    description:
      "Your task is to purchase concert tickets. You need to find and select the event for the artist 'The Rockers'. On their event page, add exactly two 'General Admission' tickets to your cart. Proceed to checkout, where you must add the 'Parking Pass' to your order. After completing the purchase, download the e-tickets to find the password. Return the password as your answer.",
    icon: "🎟️",
    component: OrderConcert,
    tags: ["ecommerce", "concert", "multi-step", "forms", "conditional-logic"],
    difficulty: "hard",
    password: PASSWORD_OrderConcert,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_TrackingHabit,
    title: "Habit Streak Tracker",
    description:
      "Your task is to add and track a new daily hydration habit. First, navigate to the 'Habits' page using the sidebar navigation. Click to add a new habit and enter the exact name 'Drink 8 glasses of water', then set its weekly frequency goal to 7 days. After saving the habit, return to the main 'Dashboard'. On the dashboard, locate the new water habit and mark it as complete for both today and yesterday by clicking the corresponding check boxes. When the 'current streak' metric for this habit correctly displays '2 days', a password will be revealed on the dashboard. Return this password as your answer.",
    icon: "📈",
    component: TrackingHabit,
    tags: ["dashboard", "modal", "forms", "state-management", "multi-step"],
    difficulty: "hard",
    password: PASSWORD_TrackingHabit,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_LoanAmortization,
    title: "Loan Interest Comparison",
    description:
      "Your task is to use the loan calculator to model an auto loan. First, set the loan amount to exactly $30,000 and the annual interest rate to 5%. Then, click the button to calculate and compare terms. In the results panel, you must interact with the data by comparing the 48-month term and the 60-month term option. Finally, view the full amortization schedule specifically for the 48-month term. Completing these actions correctly will reveal a confirmation code. Return this code as your answer.",
    icon: "💸",
    component: LoanAmortization,
    tags: ["forms", "sliders", "calculation", "data-download", "multi-step"],
    difficulty: "hard",
    password: PASSWORD_LoanAmortization,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_FontsGlobal,
    title: "Customize Website Fonts",
    description:
      "Your goal is to update the typography for the company website. Access the theme customizer and set the global font for all body and paragraph text to 'Lato'. For a more impactful design, you must also set a specific override for all top-level 'H1' headings, changing their font to 'Roboto Slab'. Before finalizing your work, ensure you are previewing these changes on the 'About Us' page. Once you have verified the new font settings on the correct preview page, publish the changes to make them live. A confirmation password will be displayed upon successful publication.",
    icon: "🎨",
    component: FontsGlobal,
    tags: ["content-management-system", "fonts", "ui-customization"],
    difficulty: "medium",
    password: PASSWORD_FontsGlobal,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_ReferralPatient,
    title: "Book Specialist Appointment via Referral",
    description:
      "Your task is to use your patient dashboard to book an appointment based on a referral. Follow the instructions on the header of the tasks to complete the steps. Upon completion, a password will be shown; return this password as your answer.",
    icon: "❤️",
    component: ReferralPatient,
    tags: ["health", "referral", "appointment", "form"],
    difficulty: "medium",
    password: PASSWORD_ReferralPatient,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_GroupMember,
    title: "Group Admin: Membership and Rules",
    description:
      "Your task is to manage membership and group policies. Follow the instructions on the header of the tasks to complete the steps. Upon completion, a password will be shown; return this password as your answer.",
    icon: "👥",
    component: GroupMember,
    tags: ["social-media", "forms", "navigation"],
    difficulty: "medium",
    password: PASSWORD_GroupMember,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_HiringCandidate,
    title: "Manage Hiring Pipeline",
    description:
      "Your task is to manage the hiring pipeline for a specific role. Follow the instructions on the header of the tasks to complete the steps. Upon completion, a password will be shown; return this password as your answer.",
    icon: "🧑‍💼",
    component: HiringCandidate,
    tags: ["project management", "hiring", "kanban", "form"],
    difficulty: "medium",
    password: PASSWORD_HiringCandidate,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_HistoryOrder,
    title: "Request Order Invoice",
    description:
      "Your task is to access your order history and request an invoice for a specific order. Follow the instructions on the header of the tasks to complete the steps. Upon completion, a password will be shown; return this password as your answer.",
    icon: "🧾",
    component: HistoryOrder,
    tags: ["ecommerce", "filtering", "forms"],
    difficulty: "medium",
    password: PASSWORD_HistoryOrder,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_LabResult,
    title: "Query Lab Result Trend and Message Doctor",
    description:
      "Your task is to access a Lab Result and send a message to the doctor. Login to the application using this credentials are user: `j.miller88` and password: `HealthyLife!24`. Navigate to 'My Lab Results' and open the most recent 'Lipid Panel' results. View the trend graph for your 'LDL Cholesterol' over the last 3 years. After viewing the graph, send a secure message to your primary care physician, Dr. Evelyn Reed, asking about your latest LDL result with subject 'follow-up on ldl results' and the message should contain 'ldl' in any cases. Once the message is sent successfully, a confirmation password will be revealed.",
    icon: "🩺",
    component: LabResult,
    tags: ["health", "data-extraction", "form-filling", "navigation"],
    difficulty: "hard",
    password: PASSWORD_LabResult,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_NDATemplate,
    title: "Generate NDA Document",
    description:
      "Your task is to prepare a Mutual Non-Disclosure Agreement for a new business engagement. You must accurately fill in the template with the following information: the counterparty's name is 'Innovate Corp', the 'Effective Date' is next Friday, and the 'Governing Law' must be set to 'Delaware'. After inputting these details, generate the document to obtain the password, return this password as your answer.",
    icon: "📄",
    component: NDATemplate,
    tags: ["forms", "documents", "legal"],
    difficulty: "medium",
    password: PASSWORD_NDATemplate,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_SignageManagement,
    title: "Meeting Room Signage",
    description:
      "Your task is to use the office management portal to book the 'Andromeda' meeting room. Follow the instructions on the header of the tasks to complete the steps. Upon completion, a password will be shown; return this password as your answer.",
    icon: "📟",
    component: SignageManagement,
    tags: ["iot", "signage", "forms", "navigation"],
    difficulty: "medium",
    password: PASSWORD_SignageManagement,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_MoviesMarathon,
    title: "Movie Marathon Planner",
    description:
      "Your task is to curate your own movie night. First, select at least three films from the available list to add to your marathon. Once your selection is complete, give your marathon a creative title in the designated field. After you've successfully added three or more movies and named your marathon, a password will appear on the screen. Provide this password to complete the task.",
    icon: "🎬",
    component: MoviesMarathon,
    tags: ["forms", "state management", "dynamic content"],
    difficulty: "easy",
    password: PASSWORD_MoviesMarathon,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_TemplateInstagram,
    title: "Instagram Story Template",
    description:
      "Your task is to create a new Instagram story. You need to use the 'Q&A' template for your story. Once the template is applied, customize the question prompt to read 'What's your favorite travel destination?' and change the story's background to the 'Cyan' color option. After customizing, post the story to reveal the password.",
    icon: "📱",
    component: TemplateInstagram,
    tags: ["social-media", "content-creation", "ui-element-selection", "forms"],
    difficulty: "medium",
    password: PASSWORD_TemplateInstagram,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_VideoTroubleshooting,
    title: "Video Troubleshooting",
    description:
      "Your task is to access the player's settings and use the troubleshooting tool to diagnose and resolve the connection issue. Follow the instructions on the header of the tasks to complete the steps. Upon completion, a password will be shown; return this password as your answer.",
    icon: "📺",
    component: VideoTroubleshooting,
    tags: ["video player", "settings", "troubleshooting", "buffering"],
    difficulty: "easy",
    password: PASSWORD_VideoTroubleshooting,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_PaymentsOptions,
    title: "Payments Options",
    description:
      "Your task is to complete an online purchase using the 'SlicePay' financing option. Follow the instructions on the header of the tasks to complete the steps. Upon completion, a password will be shown; return this password as your answer.",
    icon: "💳",
    component: PaymentsOptions,
    tags: ["payment", "e-commerce", "forms", "bnpl"],
    difficulty: "medium",
    password: PASSWORD_PaymentsOptions,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_PlaylistStocks,
    title: "Manage Watchlist Playlist",
    description:
      "Your task is to update your stock watchlist playlist. Follow the instructions on the header of the tasks to complete the steps. Upon completion, a password will be shown; return this password as your answer.",
    icon: "📈",
    component: PlaylistStocks,
    tags: ["finance", "list management", "search"],
    difficulty: "medium",
    password: PASSWORD_PlaylistStocks,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_RecommendationBlogPost,
    title: "Optimize SEO Recommendations",
    description:
      "Your task is to edit a blog post to meet specific SEO recommendations. An SEO analysis tool has provided several recommendations to improve the post's ranking. You can view these recommendations by opening the SEO panel. Follow the actionable recommendations, and once all improvements are successfully applied and the post is published, a password will be revealed, return this password as your answer.",
    icon: "💡",
    component: RecommendationBlogPost,
    tags: ["cms", "recommendation", "content editing"],
    difficulty: "medium",
    password: PASSWORD_RecommendationBlogPost,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_FocusRoomReservation,
    title: "Focus Room Reservation",
    description:
      "Your task is to book a spot in a virtual 'Focus Room' for some dedicated work time. You need to reserve a 2-hour slot specifically in the 'Creative Writing' room. For a distraction-free environment, ensure your microphone is set to be muted upon joining the room. Once you've successfully confirmed the correct reservation, a password will be displayed, return this password as your answer.",
    icon: "🎧",
    component: FocusRoomReservation,
    tags: ["productivity", "reservation", "forms"],
    difficulty: "medium",
    password: PASSWORD_FocusRoomReservation,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_AdvancedSavedSearch,
    title: "Advanced Saved Search",
    description:
      "Your task is to use the advanced search functionality to find specific posts and save the search criteria for future use. You need to find posts from the user @DataWrangler that contain the hashtag #WebAgentAI and were posted within the last month. After applying these filters, save the search with the name 'AI Research'. Upon successfully saving this specific search, a password will be revealed, return this password as your answer.",
    icon: "💾",
    component: AdvancedSavedSearch,
    tags: ["search", "form", "social-media", "modal"],
    difficulty: "medium",
    password: PASSWORD_AdvancedSavedSearch,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_NftSneakerPurchase,
    title: "Purchase Sneaker and Mint NFT",
    description:
      "You are on 'AetherWear', a high-end digital fashion marketplace. Your task is to locate and purchase the limited-edition 'AuraFlow X1' sneakers. These sneakers come with a unique NFT Certificate of Authenticity. Use 'John Doe', 'john.doe@example.com', and 'New York' to complete the purchasing process. After successfully completing the purchase, you must connect a wallet and mint the NFT to reveal a password, return the password as your answer.",
    icon: "👟",
    component: NftSneakerPurchase,
    tags: ["ecommerce", "nft", "purchase", "crypto"],
    difficulty: "hard",
    password: PASSWORD_NftSneakerPurchase,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_ProcedurePreregistration,
    title: "Hospital Pre-Registration",
    description:
      "Your task is to complete the pre-registration for an upcoming hospital procedure. Follow the instructions on the header of the tasks to complete the steps. Upon completion, a password will be shown; return this password as your answer.",
    icon: "⚕️",
    component: ProcedurePreregistration,
    tags: ["forms", "data_entry", "multi-step", "health"],
    difficulty: "medium",
    password: PASSWORD_ProcedurePreregistration,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_MarketingCampaign,
    title: "Create Marketing Campaign",
    description:
      "Your task is to create a new promotional campaign. Follow the instructions on the header of the tasks to complete the steps. Upon completion, a password will be shown; return this password as your answer.",
    icon: "📈",
    component: MarketingCampaign,
    tags: ["form", "multi-step", "marketing"],
    difficulty: "medium",
    password: PASSWORD_MarketingCampaign,
    variant: "base",
    requires_file_upload: false,
  },
  {
    path: TASK_ID_ResourceAllocationDashboard,
    title: "Resource Allocation Dashboard",
    description:
      "Your task is to finalize the resource allocation for the upcoming sprint. You must assign a specific task to each of the 5 team members and adjust their weekly workloads. To successfully complete the allocation, ensure two critical conditions are met: first, the 'Lead Developer' must be assigned to the 'Backend API' development task. Second, every team member's weekly workload must be set to a value strictly less than 40 hours. Once you have configured the assignments and workloads correctly, finalize the plan. A password will be revealed upon successful submission, return this password as your answer.",
    icon: "📊",
    component: ResourceAllocationDashboard,
    tags: ["project management", "resource", "slider", "dropdown", "reasoning"],
    difficulty: "medium",
    password: PASSWORD_ResourceAllocationDashboard,
    variant: "base",
    requires_file_upload: false,
  },
];
