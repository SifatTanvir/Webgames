import ArgumentAnalyzer, { PASSWORD_ArgumentAnalyzer, TASK_ID_ArgumentAnalyzer } from "../pages/ArgumentAnalyzer";
import ConcertSeatSelection, { PASSWORD_ConcertSeatSelection, TASK_ID_ConcertSeatSelection } from "../pages/ConcertSeatSelection";
import CrypticSentenceDecoder, { PASSWORD_CrypticSentenceDecoder, TASK_ID_CrypticSentenceDecoder } from "../pages/CrypticSentenceDecoder";
import CulturalClarityCoach, { PASSWORD_CulturalClarityCoach, TASK_ID_CulturalClarityCoach } from "../pages/CulturalClarityCoach";
import DeliveryRouteOptimizer, { PASSWORD_DeliveryRouteOptimizer, TASK_ID_DeliveryRouteOptimizer } from "../pages/DeliveryRouteOptimizer";
import FitnessClassScheduler, { PASSWORD_FitnessClassScheduler, TASK_ID_FitnessClassScheduler } from "../pages/FitnessClassScheduler";
import FlightsBookCheapest, { PASSWORD_FlightsBookCheapest, TASK_ID_FlightsBookCheapest } from "../pages/FlightsBookCheapest";
import ForumModeration, { PASSWORD_ForumModeration, TASK_ID_ForumModeration } from "../pages/ForumModeration";
import HistoricalSourceAnalysis, { PASSWORD_HistoricalSourceAnalysis, TASK_ID_HistoricalSourceAnalysis } from "../pages/HistoricalSourceAnalysis";
import InsuranceClaimForm, { PASSWORD_InsauranceClaimForm, TASK_ID_InsauranceClaimForm } from "../pages/InsuranceClaimForm";
import LibraryBookHold, { PASSWORD_LibraryBookHold, TASK_ID_LibraryBookHold } from "../pages/LibraryBookHold";
import LiveSupport, { PASSWORD_LiveSupport, TASK_ID_LiveSupport } from "../pages/LiveSupport";
import LogAnalysisBreachDetector, { PASSWORD_LogAnalysis, TASK_ID_LogAnalysis } from "../pages/LogAnalysisBreachDetector";
import ManageWeatherLocations, { PASSWORD_ManageWeatherLocations, TASK_ID_ManageWeatherLocations } from "../pages/ManageWeatherLocations";
import MarketplaceScamDetector, { PASSWORD_MarketplaceScamDetector, TASK_ID_MarketplaceScamDetector } from "../pages/MarketplaceScamDetector";
import MedicalNotesSummarizer, { PASSWORD_MedicalNotesSummarizer, TASK_ID_MedicalNotesSummarizer } from "../pages/MedicalNotesSummarizer";
import MortgageCalculator, { PASSWORD_MortgageCalculator, TASK_ID_MortgageCalculator } from "../pages/MortgageCalculator";
import NeutralityEditor, { PASSWORD_NeutralityEditor, TASK_ID_NeutralityEditor } from "../pages/NeutralityEditor";
import PayParkingTicket, { PASSWORD_PayParkingTicket, TASK_ID_PayParkingTicket } from "../pages/PayParkingTicket";
import PhishingDetector, { PASSWORD_PhishingDetector, TASK_ID_PhishingDetector } from "../pages/PhishingDetector";
import PizzaCustomization, { PASSWORD_PizzaCustomization, TASK_ID_PizzaCustomization } from "../pages/PizzaCustomization";
import PlantingCalendar, { PASSWORD_PlantingCalendar, TASK_ID_PlantingCalendar } from "../pages/PlantingCalendar";
import PropertyComparison, { PASSWORD_PropertyComparison, TASK_ID_PropertyComparison } from "../pages/PropertyComparison";
import PropertySearchSaver, { PASSWORD_PropertySearchSaver, TASK_ID_PropertySearchSaver } from "../pages/PropertySearchSaver";
import PropertyTourScheduler, { PASSWORD_PropertyTourScheduler, TASK_ID_PropertyTourScheduler } from "../pages/PropertyTourScheduler";
import ReorderHistory, { PASSWORD_ReorderHistory, TASK_ID_ReorderHistory } from "../pages/ReorderHistory";
import ResumeScreener, { PASSWORD_Resume_Screener, TASK_ID_Resume_Screener } from "../pages/ResumeScreener";
import ShippingCostCalculator, { PASSWORD_ShippingCostCalculator, TASK_ID_ShippingCostCalculator } from "../pages/ShippingCostCalculator";
import SocialDynamicsAnalyzer, { PASSWORD_SocialDynamics, TASK_ID_SocialDynamics } from "../pages/SocialDynamicsAnalyzer";
import StartupPostmortem, { PASSWORD_StartupPostmortem, TASK_ID_StartupPostmortem } from "../pages/StartupPostmortem";
import SubscriptionUpgrade, { PASSWORD_SubscriptionUpgrade, TASK_ID_SubscriptionUpgrade } from "../pages/SubscriptionUpgrade";
import SymbolDecoder, { PASSWORD_SymbolDecoder, TASK_ID_SymbolDecoder } from "../pages/SymbolDecoder";
import TeamDynamics, { PASSWORD_TeamDynamics, TASK_ID_TeamDynamics } from "../pages/TeamDynamics";
import TemporalMaze, { PASSWORD_TemporalMaze, TASK_ID_TemporalMaze } from "../pages/TemporalMaze";
import WordBridgeBuilder, { PASSWORD_WordBridgeBuilder, TASK_ID_WordBridgeBuilder } from "../pages/WordBridgeBuilder";
import WorkshopConflictResolver, { PASSWORD_WorkshopConflictResolver, TASK_ID_WorkshopConflictResolver } from "../pages/WorkshopConflictResolver";
import { RouteConfig } from "./routeType";


export const routes_10: RouteConfig[] = [
{
  "path": TASK_ID_ShippingCostCalculator,
  "title": "Shipping Cost Calculator",
  "description": "Your objective is to use the shipping calculator to find a price. First, enter '90210' into the 'Destination ZIP Code' field. Second, enter '2' into the 'Package Weight (kg)' field. Third, select the '2-Day Express' option from the 'Shipping Service' dropdown menu. Finally, click the 'Calculate Shipping' button. Upon successful completion of the steps, a secret password would be revealed. Return this password to complete the task.",
  "icon": "📦",
  "component": ShippingCostCalculator,
  "tags": ["forms", "calculator", "input", "select"],
  "difficulty": "easy",
  "password": PASSWORD_ShippingCostCalculator,
  "variant": "base",
  "requires_file_upload": false
},
{
  "path": TASK_ID_InsauranceClaimForm,
  "title": "New Insurance Claim",
  "description": "Your objective is to file a new insurance claim. First, select policy number '#H-98765' from the policy dropdown. Second, select 'Water Damage' from the cause dropdown. Third, for the 'Date of Incident', select the date corresponding to last Monday. Finally, click the 'Submit Claim' button. Upon successful completion of the steps, a secret password would be revealed. Return this password to complete the task.",
  "icon": "🛡️",
  "component": InsuranceClaimForm,
  "tags": ["forms", "finance", "date-input", "select", "one-shot"],
  "difficulty": "medium",
  "password": PASSWORD_InsauranceClaimForm,
  "variant": "base",
  "requires_file_upload": false
},
{
  "path": TASK_ID_SubscriptionUpgrade,
  "title": "Upgrade Subscription Plan",
  "description": "Your objective is to upgrade the current software subscription. First, navigate to the 'Billing' section using the sidebar. On the billing page, locate the current 'Basic Plan' and click its 'Change Plan' button. In the modal that appears, select the 'Professional Plan' and then switch the billing cycle to 'Annual'. Finally, click the 'Confirm Upgrade' button to complete the process. Upon successful completion of the steps, a secret password would be revealed. Return this password to complete the task.",
  "icon": "💳",
  "component": SubscriptionUpgrade,
  "tags": ["finance", "billing", "subscription", "modal", "navigation", "one-shot"],
  "difficulty": "hard",
  "password": PASSWORD_SubscriptionUpgrade,
  "variant": "base",
  "requires_file_upload": false
},
{
  "path": TASK_ID_PizzaCustomization,
  "title": "Customize Pizza Order",
  "description": "Your objective is to customize and order a specific pizza. First, find the 'Large Pepperoni Pizza' on the menu and click its 'Customize' button. In the customization screen, you must perform three actions: 1) change the crust to 'Thin Crust', 2) uncheck 'Pepperoni' to remove it, and 3) check both 'Mushrooms' and 'Onions' to add them as toppings. Finally, click the 'Add to Cart' button. Upon successful completion of the steps, a secret password would be revealed. Return this password to complete the task.",
  "icon": "🍕",
  "component": PizzaCustomization,
  "tags": ["ecommerce", "ordering", "forms", "modal", "customization", "one-shot"],
  "difficulty": "hard",
  "password": PASSWORD_PizzaCustomization,
  "variant": "base",
  "requires_file_upload": false
},
{
  "path": TASK_ID_ReorderHistory,
  "title": "Re-order from History",
  "description": "Your objective is to find a specific past order and add one of its items to your cart again. First, navigate to the 'Order History' page using the sidebar. Next, find the order that was placed on last Tuesday. Within that specific order, locate the 'Pad Thai' dish and click its 'Re-order' button. You only have one chance to click the correct button to reveal the password. Upon successful completion of the steps, a secret password would be revealed. Return this password to complete the task.",
  "icon": "🧾",
  "component": ReorderHistory,
  "tags": ["ecommerce", "ordering", "history", "navigation", "date-finding", "one-shot"],
  "difficulty": "medium",
  "password": PASSWORD_ReorderHistory,
  "variant": "base",
  "requires_file_upload": false
},
{
  "path": TASK_ID_PropertySearchSaver,
  "title": "Save Property Search",
  "description": "Please use the following data to complete my shipment request: Location is Denver, CO, Bedrooms are 2-3, Property type is Condos. After applying the filters, click the Search button. Once the results load, click Save Search. In the modal that appears, name the search Denver Condos and click Save. Once everything is submitted and confirmed, a password will appear. Extract that password and return it.",
  "icon": "🏠",
  "component": PropertySearchSaver,
  "tags": ["ecommerce", "forms", "search", "filter", "modal", "one-shot"],
  "difficulty": "hard",
  "password": PASSWORD_PropertySearchSaver,
  "variant": "base",
  "requires_file_upload": false
},
{
  "path": TASK_ID_PropertyComparison,
  "title": "Compare Properties",
  "description": "Your objective is to select two specific properties and compare them. From the list of properties, find and check the boxes for '111 Maple St' and '222 Birch Rd'. Once exactly these two properties are selected, click the 'Compare' button in the bar at the bottom of the screen. Upon successful completion of the steps, a secret password would be revealed. Return this password to complete the task.",
  "icon": "⚖️",
  "component": PropertyComparison,
  "tags": ["ecommerce", "comparison", "multi-select", "checkbox", "one-shot"],
  "difficulty": "medium",
  "password": PASSWORD_PropertyComparison,
  "variant": "base",
  "requires_file_upload": false
},
{
  "path": TASK_ID_MortgageCalculator,
  "title": "Mortgage Payment Calculator",
  "description": "Please use the following information to complete my mortgage calculation request: Enter a Home Price of 450000, a Down Payment of 90000, and a Loan Term of 30 years into the appropriate form fields. Once all values are entered, click the Calculate Payment button. After submission and confirmation, a password will appear—please extract that password and return it.",
  "component": MortgageCalculator,
  "password": PASSWORD_MortgageCalculator,
  "difficulty": "medium",
  "tags": ["form", "calculator", "finance"],
  "variant": "base",
  "requires_file_upload": false,
  "icon": "⚖️"
},
{
    "path": TASK_ID_PropertyTourScheduler,
    "title": "Property Tour Scheduling",
    "description": "Your task is to schedule an in-person tour for a specific property. First, locate the property listing with the address '789 Pine Lane' from the list of featured properties and click its 'Schedule In-Person Tour' button. In the scheduling modal that appears, select 'Next Thursday' as the tour day and '4:00 PM' as the tour time from the respective dropdown menus. Finally, click the 'Confirm Tour' button to submit your request. If done correctly on the first attempt, a password will be revealed. Return this password to complete the task.",
    "icon": "🏠",
    "component": PropertyTourScheduler,
    "password": PASSWORD_PropertyTourScheduler,
    "tags": ["form", "schedule", "modal", "dynamic", "single-attempt"],
    "difficulty": "medium",
    "variant": "base",
    "requires_file_upload": false
},
{
    "path": TASK_ID_FitnessClassScheduler,
    "title": "Fitness Class Signup",
    "description": "Please use the following information to complete my fitness class sign-up request: navigate to the Saturday schedule tab, locate the Yoga Flow class scheduled for 10:00 AM, and click the Sign Up button for that class. Once everything is submitted and confirmed, a password will appear—please extract that password and return it.",
    "icon": "🧘",
    "component": FitnessClassScheduler,
    "password": PASSWORD_FitnessClassScheduler,
    "tags": ["schedule", "form", "button", "dynamic", "single-attempt"],
    "difficulty": "medium",
    "variant": "base",
    "requires_file_upload": false
},
{
  "path": TASK_ID_ConcertSeatSelection,
  "title": "Concert Seat Selection",
  "description": "Please use the following information to complete my concert seat booking request: locate the event titled Starlight Symphony and click Buy Tickets. On the seating chart, select Section C, Row 5, Seat 6, then click Proceed to Checkout to finalize the booking. Once everything is submitted and confirmed, a password will appear—please extract that password and return it.",
  "icon": "🎟️",
  "component": ConcertSeatSelection,
  "tags": ["ebookings", "interaction", "dynamic", "selection"],
  "difficulty": "medium",
  "password": PASSWORD_ConcertSeatSelection,
  "variant": "base",
  "requires_file_upload": false
},
{
  "path": TASK_ID_LibraryBookHold,
  "title": "Library Book Hold",
  "description": "Your task is to use the library catalog to place a hold on a specific book. First, enter 'Dune' into the 'Title' search field and 'Frank Herbert' into the 'Author' search field. Click the 'Search' button. In the search results, find the entry for 'Dune' and inspect its available copies. Place a hold on the first copy that is marked as 'Available'. A password will be displayed in the header upon successful completion. Return this password as your answer.",
  "icon": "📚",
  "component": LibraryBookHold,
  "tags": ["forms", "search", "dynamic-list", "booking"],
  "difficulty": "medium",
  "password": PASSWORD_LibraryBookHold,
  "variant": "base",
  "requires_file_upload": false
},
{
  path: TASK_ID_PayParkingTicket,
  title: "Pay a Parking Ticket",
  description: "You've received a parking ticket in the mail and need to pay it online to avoid late fees. Navigate to the City of Gemini's digital service portal. Your citation number is C-1A2B3C. Use the portal to look up this specific citation and proceed through the payment process to resolve the ticket. Once everything is submitted and confirmed, a password will appear. Extract that password and return it.",
  icon: "🚗",
  component: PayParkingTicket,
  tags: ["finance", "forms", "payment"],
  difficulty: "easy",
  password: PASSWORD_PayParkingTicket,
  variant: "base",
  requires_file_upload: false
},
{
  "path": TASK_ID_ManageWeatherLocations,
  "title": "Manage Weather Locations",
  "description": "I'm updating my weather dashboard for upcoming travel. Please add 'Tokyo, Japan' to my list of locations. My plans for France have been cancelled, so please also remove 'Paris, France' from the list. The list must be updated in this specific order. After you've completed both actions, a password will be displayed. Please return this password.",
  "icon": "🌦️",
  "component": ManageWeatherLocations,
  "tags": ["weather", "state-management", "form", "sequential"],
  "difficulty": "hard",
  "password": PASSWORD_ManageWeatherLocations,
  "variant": "base",
  "requires_file_upload": false
},
{
  "path": TASK_ID_PlantingCalendar,
  "title": "Vegetable Planting Calendar",
  "description": "I'm planning my vegetable garden and need to figure out the ideal planting schedule. My garden is in hardiness zone 8b. Could you please use the provided planting calendar tool to find the recommended indoor seeding dates for Tomatoes? The website will reveal a password once you have looked up the correct information.",
  "icon": "📅",
  "component": PlantingCalendar,
  "tags": ["planning", "calendar", "form", "dynamic"],
  "difficulty": "medium",
  "password": PASSWORD_PlantingCalendar,
  "variant": "base",
  "requires_file_upload": false
},
// new
{
  "path": TASK_ID_Resume_Screener,
  "title": "Resume Screener",
  "description": "Your task is to act as an HR specialist and use the AI screening tool to find the best candidates for a new role. First, paste the following job description into the text area: 'We are hiring a Senior Front-End Developer to join our innovative product team. The ideal candidate will have a strong eye for design and user experience, proficiency in modern JavaScript frameworks like React, and a desire to contribute to a long-term project. We value creative problem-solvers who can bridge the gap between design and technical implementation.' Next, upload the provided resumes. Finally, review the candidate resumes, select the two individuals whose backgrounds and career goals best align with the job description, and submit your selection to reveal the password. Extract and return the password.",
  "icon": "📄",
  "component": ResumeScreener,
  "tags": ["productivity", "filtering", "form", "ai-tool-simulation"],
  "difficulty": "medium",
  "password": PASSWORD_Resume_Screener,
  "variant": "base",
  "requires_file_upload": false
},
{
  "path": TASK_ID_ForumModeration,
  "title": "Forum Moderation",
  "description": "As a content moderator for our community forum, your responsibility is to ensure discussions remain constructive and respectful. Identify all comments that shift the tone of the conversation towards being hostile or sarcastic. Once you've identified the specific replies, please delete them to maintain the quality of the discussion. Your successful moderation will be acknowledged with a secret password. Extract and return the password.",
  "icon": "🛡️",
  "component": ForumModeration,
  "tags": ["social-media", "moderation", "text-analysis", "tone-detection"],
  "difficulty": "hard",
  "password": PASSWORD_ForumModeration,
  "variant": "base",
  "requires_file_upload": false
},
{
  "path": TASK_ID_WorkshopConflictResolver,
  "title": "Workshop Conflict Resolver",
  "description": "As the project manager for 'Project Orion,' you are tasked with finalizing the workshop schedule. The initial proposal must be checked against team availability and venue rules. For every event that has a conflict, you must 'Cancel' it. For all other non-conflicting events, you must 'Confirm' them. After you have taken action on all the events, finalize the process by submitting the revised schedule to retrieve the password. Extract and return the password.",
  "icon": "📅",
  "component": WorkshopConflictResolver,
  "tags": ["project-management", "scheduling", "conflict-resolution", "dynamic"],
  "difficulty": "hard",
  "password": PASSWORD_WorkshopConflictResolver,
  "variant": "base",
  "requires_file_upload": false
},
{
  "path": TASK_ID_MedicalNotesSummarizer,
  "title": "Medical Notes Summarizer",
  "description": "As a medical professional, you are tasked with quickly getting up to speed on a patient's case. On the left, you will find three days of unstructured progress notes from a physician. Your first task is to review these notes to understand the patient's journey. Then, based on the full context of both the original notes and the summarized timeline, you must select the single most accurate clinical insights and submit it to complete the case review and reveal the password. Extract and return the password.",
  "icon": "🩺",
  "component": MedicalNotesSummarizer,
  "tags": ["productivity", "summarization", "text-analysis", "medical"],
  "difficulty": "hard",
  "password": PASSWORD_MedicalNotesSummarizer,
  "variant": "base",
  "requires_file_upload": false
},
{
  "path": TASK_ID_CulturalClarityCoach,
  "title": "Cultural Communication Coach",
  "description": "You are a communications coach tasked with improving international customer support quality. Analyze the support chat transcript between the agent and the user. Identify the agent's message that causes a misunderstanding due to its use of a cultural idiom. Rephrase this specific message in the text box to be more direct and literal. Then, from the multiple-choice options, select the key cultural insight that best explains why the original message was confusing. Submit your analysis to complete the task and receive the password. Extract and return the password.",
  "icon": "🌐",
  "component": CulturalClarityCoach,
  "tags": ["productivity", "communication", "text-analysis", "debugging"],
  "difficulty": "medium",
  "password": PASSWORD_CulturalClarityCoach,
  "variant": "base",
  "requires_file_upload": false
},
{
  "path": TASK_ID_DeliveryRouteOptimizer,
  "title": "Delivery Route Optimizer",
  "description": "You are a dispatch manager responsible for planning the most efficient delivery route for today's packages. Review the list of packages to be delivered, the constraints from the available vehicles, and the current environmental conditions (weather, traffic). Your task is to devise an optimal plan by selecting the one correct vehicle and setting the most efficient delivery sequence for all packages. You must account for all constraints, including package size, customer time windows, and weather-related delays. Finally, simulate the route to confirm your plan. If your plan's efficiency score is over 90%, you will receive the secret password. Extract and return the password.",
  "icon": "🚚",
  "component": DeliveryRouteOptimizer,
  "tags": ["productivity", "planning", "optimization", "dynamic"],
  "difficulty": "hard",
  "password": PASSWORD_DeliveryRouteOptimizer,
  "variant": "base",
  "requires_file_upload": false
},
{
  "path": TASK_ID_HistoricalSourceAnalysis,
  "title": "Historical Source Analysis",
  "description": "You are a history student. Your task is to complete three sequential learning modules. For each module, analyze the three historical sources. Rank them from most reliable (top) to least reliable (bottom). Answer the multiple-choice questions based on your analysis. Then submit. If your answers are incorrect, click 'Try Again' to re-attempt the module. Successful completion will mark the module as 'Completed' and unlock the next one. After successfully completing all three modules in order, the final password will be revealed at the top of the home page. Extract and return the password.",
  "icon": "📚",
  "component": HistoricalSourceAnalysis,
  "tags": ["e-learning", "analysis", "ranking", "text-input", "critical-thinking"],
  "difficulty": "medium",
  "password": PASSWORD_HistoricalSourceAnalysis,
  "variant": "base",
  "requires_file_upload": false
},
{
  "path": TASK_ID_PhishingDetector,
  "title": "Phishing Email Detection",
  "description": "As a cybersecurity analyst, your task is to review a batch of incoming emails and identify the emails that are phishing attempts. You must carefully read the content of each email to spot clues, such as suspicious links, unusual sender addresses, urgent or threatening language, and unexpected attachments. A legitimate email from the IT department contains a universal security override code that you will need. Once you have identified the malicious emails, select them using the checkboxes, provide a brief written justification for your choices, and enter the security override code you found. Submit your report to complete the analysis. After successful completion, the final password will be revealed at the top of the home page. Extract and return the password.",
  "icon": "🛡️",
  "component": PhishingDetector,
  "tags": ["phishing", "email", "security", "analysis", "text-extraction"],
  "difficulty": "medium",
  "password": PASSWORD_PhishingDetector,
  "variant": "base",
  "requires_file_upload": false
},
{
  "path": TASK_ID_CrypticSentenceDecoder,
  "title": "Cryptic Sentence Decoder",
  "description": "Your task is to solve a series of cryptic riddles to unlock a mechanism. For each riddle presented on the page, type the correct one or two-word answer into the corresponding input field. Once all fields are filled, click the 'Verify All Answers' button. The system only accepts one attempt; all answers must be correct to reveal the secret password. Find the password and submit it. Extract and return the password.",
  "icon": "🧩",
  "component": CrypticSentenceDecoder,
  "tags": ["puzzle", "riddle", "form-filling", "static-validation", "first-try"],
  "difficulty": "medium",
  "password": PASSWORD_CrypticSentenceDecoder,
  "variant": "base",
  "requires_file_upload": false
},
{
  "path": TASK_ID_TemporalMaze,
  "title": "Temporal Maze",
  "description": "You are trapped in a temporal loop inside the Aethelburg Research Facility. You must find the correct sequence of actions to break the loop and escape. Use the 'Navigation Console' to move between different nodes (Alpha, Beta, Gamma, Delta). Each move advances the 'Temporal Clock'. An incorrect move at any step will enforce an endless loop. Read the 'Recovered Auditory Logs' for clues to the correct sequence. The goal is to perform the four required navigation steps in the correct order on your first attempt without triggering a reset. Once the loop is broken, the secret password will be revealed. Extract this password and return it.",
  "icon": "🌀",
  "component": TemporalMaze,
  "tags": ["maze", "logic-puzzle", "temporal-pattern", "state-machine"],
  "difficulty": "hard",
  "password": PASSWORD_TemporalMaze,
  "variant": "base",
  "requires_file_upload": false
},
{
  "path": TASK_ID_WordBridgeBuilder,
  "title": "Word Bridge Builder",
  "description": "Your task is to solve the Lexical Bridge Challenge. You must transform a given 'Start Word' into a 'Target Word'. To do this, you will add words to a chain, one at a time. Each new word must be a valid English word, be the same length as the start word, and differ from the previous word by only one letter. The page displays a 'Banned Category' and a specific list of banned words that cannot be used in your chain. Build the transformation chain step-by-step. You can use the trash icon to remove the last word if you make a mistake. Once your chain's final word matches the target word, submit it. The submitted chain must be the most optimal solution to reveal the secret password. Extract this password and return it.",
  "icon": "🌉",
  "component": WordBridgeBuilder,
  "tags": ["word-puzzle", "logic", "forms", "input-validation"],
  "difficulty": "hard",
  "password": PASSWORD_WordBridgeBuilder,
  "variant": "base",
  "requires_file_upload": false
},
{
  "path": TASK_ID_MarketplaceScamDetector,
  "title": "Marketplace Scam Detector",
  "description": "Your task is to act as a content moderator for an online marketplace. You need to review a page with some product listings and identify the most likely scams. Look for red flags such as prices that are too low, descriptions with poor grammar or urgent language, requests to communicate off-site, or reused images. Select the two listings you believe are scams. For each flagged item, you must write a brief justification in the text box that appears. Once you have selected and provided justifications for all your selections, submit your report to receive the secret password. Extract this password and return it.",
  "icon": "🛡️",
  "component": MarketplaceScamDetector,
  "tags": ["eCommerce", "scam-detection", "forms", "critical-thinking"],
  "difficulty": "medium",
  "password": PASSWORD_MarketplaceScamDetector,
  "variant": "base",
  "requires_file_upload": false
},
{
  "path": TASK_ID_LogAnalysis,
  "title": "Security Log Analysis",
  "description": "An automated alert has flagged a potential security breach in Building B. We've pulled the raw log fragments from the affected time window, but they are jumbled and out of sequence. Your task is to analyze these logs, reconstruct the correct event timeline by arranging them in chronological order, and then pinpoint the exact moment of the breach. Once you have reconstructed the timeline correctly and identified the breach, submit the exact timestamp (in HH:MM:SS format) of the 'FORCED ENTRY' log to resolve the security alert and receive a secret password. Extract this password and return it.",
  "icon": "🛡️",
  "component": LogAnalysisBreachDetector,
  "tags": ["productivity", "analysis", "reconstruction", "dynamic", "logic"],
  "difficulty": "hard",
  "password": PASSWORD_LogAnalysis,
  "variant": "base",
  "requires_file_upload": false
},
{
  path: TASK_ID_TeamDynamics,
  title: "Team Dynamics Chat Analysis",
  description: "You are an assistant to a busy engineering manager. Your task is to analyze a chaotic team chat transcript from the last 3 days. Carefully read the conversation to identify underlying issues. In the 'Manager's Summary & Action' form, you must first write a concise summary that correctly identifies the key interpersonal risks, such as signs of burnout, team misalignment, and potential power imbalances, mentioning the specific team members involved. Second, you must find the messages used in the chat that indicates a situation requiring immediate escalation. Enter the summary and submit it to receive the secret password. Extract this password and return it.",
  icon: "👥",
  component: TeamDynamics,
  tags: ["productivity", "text-analysis", "form-filling", "reasoning"],
  difficulty: "hard",
  password: PASSWORD_TeamDynamics,
  variant: "base",
  requires_file_upload: false
},
{
"path": TASK_ID_ArgumentAnalyzer,
"title": "Argument & Fallacy Analysis",
"description": "You are a teaching assistant for a critical thinking course. Your task is to evaluate two student essays on a controversial topic. For each essay, you must read the text and identify at least three distinct logical fallacies from the provided list by checking the corresponding boxes. After analyzing both essays, you must rank them by the quality and soundness of their reasoning, from best to worst. Finally, from the list of possible conclusions, select the one that is the most logically sound and well-supported by evidence presented across the texts. Submit your complete evaluation to finalize the grade. The password will only be revealed if all parts of the evaluation are correct. Extract this password and return it.",
"icon": "⚖️",
"component": ArgumentAnalyzer,
"tags": ["elearning", "analysis", "critical-thinking", "logic", "text-comprehension"],
"difficulty": "hard",
"password": PASSWORD_ArgumentAnalyzer,
"variant": "base",
"requires_file_upload": false
},
{
  "path": TASK_ID_SymbolDecoder,
  "title": "Alien Signal Decoder",
  "description": "You are an analyst at the Interstellar Communications Agency. A series of structured, symbolic transmissions has been detected. Your task is to analyze the log of these transmissions to decipher their underlying pattern. The messages appear to follow a sequence based on three symbol types: a numerical counter, a rotating shape, and a cycling color. After decoding the logic, use the 'Decoding Workbench' to construct what you predict is the next message in the sequence. Finally, provide the plain-text translation of your constructed message in the format specified and transmit your reply. The final password will only appear if your constructed message and its translation are both correct. Extract this password and return it.",
  "icon": "👽",
  "component": SymbolDecoder,
  "tags": ["web-games", "logic-puzzle", "pattern-recognition", "dynamic", "sci-fi"],
  "difficulty": "hard",
  "password": PASSWORD_SymbolDecoder,
  "variant": "base",
  "requires_file_upload": false
},
{
  "path": TASK_ID_StartupPostmortem,
  "title": "Startup Post-mortem Analysis",
  "description": "As a venture capital analyst, you are tasked with a post-mortem on the failed startup 'ArtisanBox'. Your dashboard contains various informational sections and a document viewer. Navigate the case documents (pitch deck, reports, chat logs) to understand the company's business model and performance. Then, complete the multi-part 'Failure Diagnosis Form' by: 1. Selecting the primary reason for failure. 2. Identifying the critical flawed assumption in their business model. 3. Selecting the single, correct root-cause error code from the list. 4. Calculating the net financial loss per acquired customer and entering the number. The final confirmation password will only be revealed if all four parts of the diagnosis are correct. Extract this password and return it.",
  "icon": "📉",
  "component": StartupPostmortem,
  "tags": ["productivity", "analysis", "business-logic", "synthesis", "text-comprehension"],
  "difficulty": "hard",
  "password": PASSWORD_StartupPostmortem,
  "variant": "base",
  "requires_file_upload": false
},
{
  "path": TASK_ID_SocialDynamics,
  "title": "Social Hierarchy Analysis",
  "description": "You are a sociology student using a lab tool to analyze a conversation. Your task is to read the provided dinner party transcript and identify the subtle social dynamics at play. First, in the 'Analysis Panel', you must correctly assign each of the three key social roles ('Power Broker', 'Manipulator', 'Excluded Voice') to one of the four characters. After that try to understand the key motive of the manipulator. Then, you must carefully re-read the transcript to find a hidden 'influencer code' mentioned by one of the speakers. The final password will only be revealed if all three roles are assigned correctly and the code is accurate. Extract this password and return it.",
  "icon": "🎭",
  "component": SocialDynamicsAnalyzer,
  "tags": ["elearning", "analysis", "social-dynamics", "psychology", "text-comprehension"],
  "difficulty": "hard",
  "password": PASSWORD_SocialDynamics,
  "variant": "base",
  "requires_file_upload": false
},
{
  "path": TASK_ID_NeutralityEditor,
  "title": "Media Bias Editor",
  "description": "Please complete the following media bias analysis task: For each of the four articles presented, you must first classify it as 'Neutral' or 'Biased'. If an article is judged as 'Biased', you must then correctly identify whether the bias is in the headline, the body, or both, and then select the neutral replacement headline or identify the biased sentences as required. Once all four articles are analyzed correctly submit and a password will then appear in the header. Extract that password and return it.",
  "icon": "✍️",
  "component": NeutralityEditor,
  "tags": ["elearning", "media-literacy", "editing", "text-comprehension", "writing"],
  "difficulty": "hard",
  "password": PASSWORD_NeutralityEditor,
  "variant": "base",
  "requires_file_upload": false
},

{
  path: TASK_ID_Resume_Screener,
  title: "Resume Screener",
  description:
    "Your task is to act as an HR specialist and use the AI screening tool to find the best candidates for a new role. First, paste the following job description into the text area: 'We are hiring a Senior Front-End Developer to join our innovative product team. The ideal candidate will have a strong eye for design and user experience, proficiency in modern JavaScript frameworks like React, and a desire to contribute to a long-term project. We value creative problem-solvers who can bridge the gap between design and technical implementation.' Next, upload the provided resumes. Finally, review the candidate summaries, select the two individuals whose backgrounds and career goals best align with the job description, and submit your selection to reveal the password. Extract and return the password.",
  icon: "📄",
  component: ResumeScreener,
  tags: ["productivity", "filtering", "form", "ai-tool-simulation"],
  difficulty: "medium",
  password: PASSWORD_Resume_Screener,
  variant: "base",
  requires_file_upload: false,
},
{
  path: TASK_ID_ForumModeration,
  title: "Forum Moderation",
  description:
    "As a content moderator for our community forum, your responsibility is to ensure discussions remain constructive and respectful. Identify the all comments that shifts the tone of the conversation towards being hostile, sarcastic, or unproductive. Once you've identified the specific replies, please use the moderator tools to delete it to maintain the quality of the discussion. Your successful moderation will be acknowledged with a secret password. Extract and return the password.",
  icon: "🛡️",
  component: ForumModeration,
  tags: ["social-media", "moderation", "text-analysis", "tone-detection"],
  difficulty: "hard",
  password: PASSWORD_ForumModeration,
  variant: "base",
  requires_file_upload: false,
},
{
  path: TASK_ID_WorkshopConflictResolver,
  title: "Workshop Conflict Resolver",
  description:
    "As the project manager for 'Project Orion,' you are tasked with finalizing the workshop schedule. The initial proposal must be checked against team availability and venue rules. For every event that has a conflict, you must 'Cancel' it. For all other non-conflicting events, you must 'Confirm' them. After you have taken action on all the events, finalize the process by submitting the revised schedule to retrieve the password. Extract and return the password.",
  icon: "📅",
  component: WorkshopConflictResolver,
  tags: [
    "project-management",
    "scheduling",
    "conflict-resolution",
    "dynamic",
  ],
  difficulty: "hard",
  password: PASSWORD_WorkshopConflictResolver,
  variant: "base",
  requires_file_upload: false,
},
{
  path: TASK_ID_MedicalNotesSummarizer,
  title: "Medical Notes Summarizer",
  description:
    "As a medical professional, you are tasked with quickly getting up to speed on a patient's case. On the left, you will find three days of unstructured progress notes from a physician. Your first task is to review these notes to understand the patient's journey. Then, based on the full context of both the original notes and the summarized timeline, you must select the single most accurate clinical insights and submit it to complete the case review and reveal the password. Extract and return the password.",
  icon: "🩺",
  component: MedicalNotesSummarizer,
  tags: ["productivity", "summarization", "text-analysis", "medical"],
  difficulty: "hard",
  password: PASSWORD_MedicalNotesSummarizer,
  variant: "base",
  requires_file_upload: false,
},
{
  path: TASK_ID_CulturalClarityCoach,
  title: "Cultural Communication Coach",
  description:
    "You are a communications coach tasked with improving international customer support quality. Analyze the support chat transcript between the agent and the user. Identify the agent's message that causes a misunderstanding due to its use of a cultural idiom. Rephrase this specific message in the text box to be more direct and literal. Then, from the multiple-choice options, select the key cultural insight that best explains why the original message was confusing. Submit your analysis to complete the task and receive the password. Extract and return the password.",
  icon: "🌐",
  component: CulturalClarityCoach,
  tags: ["productivity", "communication", "text-analysis", "debugging"],
  difficulty: "medium",
  password: PASSWORD_CulturalClarityCoach,
  variant: "base",
  requires_file_upload: false,
},
{
  path: TASK_ID_DeliveryRouteOptimizer,
  title: "Delivery Route Optimizer",
  description:
    "You are a dispatch manager responsible for planning the most efficient delivery route for today's packages. Review the list of packages to be delivered, the constraints from the available vehicles, and the current environmental conditions (weather, traffic). Your task is to devise an optimal plan by selecting the one correct vehicle and setting the most efficient delivery sequence for all packages. You must account for all constraints, including package size, customer time windows, and weather-related delays. Finally, simulate the route to confirm your plan. If your plan's efficiency score is over 90%, you will receive the secret password. Extract and return the password.",
  icon: "🚚",
  component: DeliveryRouteOptimizer,
  tags: ["productivity", "planning", "optimization", "dynamic"],
  difficulty: "hard",
  password: PASSWORD_DeliveryRouteOptimizer,
  variant: "base",
  requires_file_upload: false,
},
{
  path: TASK_ID_HistoricalSourceAnalysis,
  title: "Historical Source Analysis",
  description:
    "You are a history student. Your task is to complete three sequential learning modules. For each module, analyze the three historical sources. Rank them from most reliable (top) to least reliable (bottom). Answer the multiple-choice questions based on your analysis. Then submit. If your answers are incorrect, click 'Try Again' to re-attempt the module. Successful completion will mark the module as 'Completed' and unlock the next one. After successfully completing all three modules in order, the final password will be revealed at the top of the home page. Extract and return the password.",
  icon: "📚",
  component: HistoricalSourceAnalysis,
  tags: [
    "e-learning",
    "analysis",
    "ranking",
    "text-input",
    "critical-thinking",
  ],
  difficulty: "medium",
  password: PASSWORD_HistoricalSourceAnalysis,
  variant: "base",
  requires_file_upload: false,
},
{
  path: TASK_ID_FlightsBookCheapest,
  title: "Book the Cheapest Flight",
  description: "To complete this task, you need to book the most affordable flight. First, locate the sorting controls on the flight results page. Use the dropdown menus to sort the flights by 'Price' in 'Ascending' order. Once the flights are correctly sorted, the cheapest option will be at the top of the list. Proceed to book that first flight. A password will be revealed after a successful booking. Extract and return the password.",
  icon: "✈️",
  component: FlightsBookCheapest,
  tags: ["flights", "sorting", "booking", "dynamic"],
  difficulty: "medium",
  password: PASSWORD_FlightsBookCheapest,
  variant: "base",
  requires_file_upload: false
},
{
  "path": TASK_ID_LiveSupport,
  "title": "Get Shipping Update via Chat",
  "description": "Add some products to your cart. Then checkout from your cart and you will have your order number. You need to get a shipping update from customer support. Open the live chat feature on the website. When prompted, provide your order number to the virtual assistant. From the options provided, choose the one that lets you check the shipping status. Once you have the shipping information, indicate that your query is resolved to end the chat. A password will be revealed if you successfully complete the support interaction. Extract and return the password.",
  "icon": "📦",
  "component": LiveSupport,
  "tags": ["e-commerce", "customer-support", "chat", "forms"],
  "difficulty": "medium",
  "password": PASSWORD_LiveSupport,
  "variant": "base",
  "requires_file_upload": false
},
];

