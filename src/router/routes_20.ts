import { RouteConfig } from "./routeType";
import UsernameValidationForm, { TASK_ID as TASK_ID_USERNAMEVALIDATION, PASSWORD as PASSWORD_USERNAMEVALIDATION } from "../pages/UsernameValidationForm";
import SymptomChecker, { TASK_ID as TASK_ID_SYMPTOMCHECKER, PASSWORD as PASSWORD_SYMPTOMCHECKER } from "../pages/SymptomChecker";
import NotesManager, { TASK_ID as TASK_ID_NOTESMANAGER, PASSWORD as PASSWORD_NOTESMANAGER } from "../pages/NotesManager";
import EnergyMonitoringDashboard, { TASK_ID as TASK_ID_ENERGYMONITORING, PASSWORD as PASSWORD_ENERGYMONITORING } from "../pages/EnergyMonitoringDashboard";
import CreatePollPost, { TASK_ID as TASK_ID_POLLPOST, PASSWORD as PASSWORD_POLLPOST } from "../pages/CreatePollPost";
import FindMyRepresentative, { TASK_ID as TASK_ID_REPRESENTATIVE, PASSWORD as PASSWORD_REPRESENTATIVE } from "../pages/FindMyRepresentative";
import EcommerceCartManagement, { TASK_ID as TASK_ID_CARTMANAGEMENT, PASSWORD as PASSWORD_CARTMANAGEMENT } from "../pages/EcommerceCartManagement";
import CommunityModerationDashboard, { TASK_ID as TASK_ID_COMMUNITYMODERATION, PASSWORD as PASSWORD_COMMUNITYMODERATION } from "../pages/CommunityModerationDashboard";
import CashManagementRules, { TASK_ID as TASK_ID_CASHRULE, PASSWORD as PASSWORD_CASHRULE } from "../pages/CashManagementRules";
import BookSummerDayCamp, { TASK_ID as TASK_ID_BOOKDAYCAMP, PASSWORD as PASSWORD_BOOKDAYCAMP } from "../pages/BookSummerDayCamp";
import GenerateOfferLetter, { TASK_ID as TASK_ID_OFFERLETTER, PASSWORD as PASSWORD_OFFERLETTER } from "../pages/GenerateOfferLetter";
import CreditCardTransactions, { TASK_ID as TASK_ID_CREDITCARDTRANSACTIONS, PASSWORD as PASSWORD_CREDITCARDTRANSACTIONS } from "../pages/CreditCardTransactions";

export const routes_20: RouteConfig[] = [
    {
        path: TASK_ID_USERNAMEVALIDATION,
        title: "Username Availability Check",
        description: "On the signup form, enter the username 'testuser' to see the message 'Username already taken'. Then try any unique username like 'starwanderer' or 'codepilot' and confirm the message changes to 'Username available'. When a valid username is used, the password will be revealed.",
        icon: "🔒",
        component: UsernameValidationForm,
        tags: ["form", "auth", "validation"],
        difficulty: "medium",
        password: PASSWORD_USERNAMEVALIDATION,
        variant: "base",
        requires_file_upload: false
    },
    {
        path: TASK_ID_SYMPTOMCHECKER,
        title: "Symptom Checker",
        description: "Your task is to use the Symptom Checker tool to assess a headache. Select 'Headache' as your primary symptom, then specify that the pain is 'throbbing', located on 'both sides', and that you have 'sensitivity to light'. Review the list of possible conditions and save the session summary. Once completed correctly, a password will be revealed. Return the password as your answer.",
        icon: "🏥",
        component: SymptomChecker,
        tags: ["health", "screening", "diagnosis"],
        difficulty: "medium",
        password: PASSWORD_SYMPTOMCHECKER,
        variant: "base",
        requires_file_upload: false
    },
    {
        path: TASK_ID_NOTESMANAGER,
        title: "Notes Management",
        description: "Your task is to create a new note titled 'Meeting Summary - Q3 Planning' with a few sentences in the body and add the tags '#meeting', '#q3', and '#planning'. Then search for '#planning' and confirm your new note appears in the results. When completed correctly, a password will be revealed. Return the password as your answer.",
        icon: "📝",
        component: NotesManager,
        tags: ["productivity", "notes", "organization"],
        difficulty: "medium",
        password: PASSWORD_NOTESMANAGER,
        variant: "base",
        requires_file_upload: false
    },
    {
        path: TASK_ID_ENERGYMONITORING,
        title: "Energy Monitoring Dashboard",
        description: "Your task is to navigate to the energy monitoring dashboard, view the daily usage for your 'Smart Plug - Living Room TV' and compare it to last week's usage. Then set up an alert to notify you if its daily consumption exceeds 2 kWh. Once completed correctly, a password will be revealed. Return the password as your answer.",
        icon: "🔌",
        component: EnergyMonitoringDashboard,
        tags: ["iot", "energy", "monitoring"],
        difficulty: "medium",
        password: PASSWORD_ENERGYMONITORING,
        variant: "base",
        requires_file_upload: false
    },
    {
        path: TASK_ID_POLLPOST,
        title: "Create Poll Post",
        description: "Your task is to create a new poll post on a social media platform. Set the poll question to 'What's the best pizza topping?' and add exactly four options from the available choices (Pepperoni, Mushrooms, Pineapple, Olives). Set the poll duration to 24 hours and publish it. Once completed correctly, a password will be revealed. Return the password as your answer.",
        icon: "📊",
        component: CreatePollPost,
        tags: ["social", "post", "poll"],
        difficulty: "medium",
        password: PASSWORD_POLLPOST,
        variant: "base",
        requires_file_upload: false
    },
    {
        path: TASK_ID_REPRESENTATIVE,
        title: "Find Government Representatives",
        description: "Your task is to use the 'Find My Representative' tool to locate your City Council member. Enter any valid address (e.g., '123 Main St, Anytown, NY') to display your representatives. Click on your City Council member's profile to view their contact information. Once you've correctly viewed the City Council member's profile, a password will be revealed. Return this password as your answer.",
        icon: "🏛️",
        component: FindMyRepresentative,
        tags: ["civic", "government", "search"],
        difficulty: "easy",
        password: PASSWORD_REPRESENTATIVE,
        variant: "base",
        requires_file_upload: false
    },
    {
        path: TASK_ID_CARTMANAGEMENT,
        title: "Checkout Laptop Stand",
        description: "Your task is to add a 'Laptop Stand' and a 'Wireless Mouse' to your shopping cart. Notice the mouse is too expensive, and move it from the cart to your 'Save for Later' wishlist. Then proceed to checkout with only the laptop stand. Once completed correctly, a password will be revealed during order confirmation. Return the password as your answer.",
        icon: "🛒",
        component: EcommerceCartManagement,
        tags: ["ecommerce", "cart", "shopping"],
        difficulty: "medium",
        password: PASSWORD_CARTMANAGEMENT,
        variant: "base",
        requires_file_upload: false
    },
    {
        path: TASK_ID_COMMUNITYMODERATION,
        title: "Community Moderation",
        description: "Your task is to review a flagged post from user 'spammer_bot_2024' that has been automatically flagged for 'Spam'. Navigate to the flagged posts section, locate the spam post, choose the 'Remove Post and Ban User' option, confirm the action, then check the members list to verify that the user no longer appears in the member list. Once completed successfully, a password will be revealed.",
        icon: "👮",
        component: CommunityModerationDashboard,
        tags: ["social-media", "moderation", "community"],
        difficulty: "medium",
        password: PASSWORD_COMMUNITYMODERATION,
        variant: "base", 
        requires_file_upload: false
    },
    {
        path: TASK_ID_CASHRULE,
        title: "Cash Management Rules",
        description: "Your task is to set up a new cash management rule that automatically transfers 10% of every incoming deposit over $500 from your checking account to your 'Vacation Fund' savings account. Create the rule with these exact parameters, save it, and view it in your active rules list. Once completed correctly, a password will be revealed. Return the password as your answer.",
        icon: "💰",
        component: CashManagementRules,
        tags: ["finance", "banking", "automation"],
        difficulty: "medium",
        password: PASSWORD_CASHRULE,
        variant: "base",
        requires_file_upload: false
    },
    {
        path: TASK_ID_BOOKDAYCAMP,
        title: "Book Summer Day Camp",
        description: "Your task is to book a full-day spot at a 'Summer Day Camp' for two children for the entire first week of July (July 1st to July 7th, 2025). For one child, specify a 'Peanut Allergy'. Add an authorized pickup person with the name 'Sarah Connor' and phone number '555-123-4567'. Once the booking is submitted and confirmed, a password will be revealed. Return the password as your answer.",
        icon: "🏕️",
        component: BookSummerDayCamp,
        tags: ["e-booking", "childcare", "summer camp", "form"],
        difficulty: "medium",
        password: PASSWORD_BOOKDAYCAMP,
        variant: "base",
        requires_file_upload: false
    },
    {
        path: TASK_ID_OFFERLETTER,
        title: "Generate Offer Letter",
        description: "Your task is to select the finalist candidate 'Alex Johnson' and generate an offer letter for the position of Frontend Developer with a salary of $110,000 and a start date of November 15, 2023. Use the Standard Employment Offer template. Once the offer is successfully sent for e-signature, a password will be revealed. Return the password as your answer.",
        icon: "📝",
        component: GenerateOfferLetter,
        tags: ["contracts", "hiring", "offer-letter"],
        difficulty: "medium",
        password: PASSWORD_OFFERLETTER,
        variant: "base",
        requires_file_upload: false
    },
    {
        path: TASK_ID_CREDITCARDTRANSACTIONS,
        title: "Credit Card Dispute",
        description: "You are viewing your SecureBank credit card transaction history (account ending in 4892). Your task is to filter the transactions to show only the last month's 'Restaurants' category transactions, then find any restaurant charge and dispute it by selecting 'Incorrect Amount Charged' as the reason. Once the dispute is successfully submitted, a reference code will be displayed. Return this reference code as your answer.",
        icon: "💳",
        component: CreditCardTransactions,
        tags: ["finance", "banking", "dispute", "transactions"],
        difficulty: "medium",
        password: PASSWORD_CREDITCARDTRANSACTIONS,
        variant: "base",
        requires_file_upload: false
    },
]