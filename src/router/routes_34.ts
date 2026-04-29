
import { RouteConfig } from "./routeType";

import ShippingCalculator, {
  TASK_ID_ShippingCalculator,
  PASSWORD_ShippingCalculator,
} from "../pages/ShippingCalculator";

import DownloadInsuranceCard, {
  projectmanagement_users_inviteuser,
  PASSWORD_DownloadInsuranceCard ,
} from "../pages/DownloadInsuranceCard";

import InviteUser, {
  TASK_ID_InviteUser,
  PASSWORD_InviteUser ,
} from "../pages/InviteUser";

import SubscribeNewsletter, {
  TASK_ID_SubscribeNewsletter,
  PASSWORD_SubscribeNewsletter ,
} from "../pages/SubscribeNewsletter";

import PayParkingTicket, {
  TASK_ID_PayParkingTicket,
  PASSWORD_PayParkingTicket ,
} from "../pages/PayParkingTicket";

import ChangeTheme,{ TASK_ID_ChangeTheme,PASSWORD_ChangeTheme} from "../pages/ChangeTheme"
import CustomizeFoodOrder,{TASK_ID_CustomizeFoodOrder,PASSWORD_CustomizeFoodOrder} from "../pages/CustomizeFoodOrder"
import SchedulePickup,{TASK_ID_PICKUP_SCHEDULING,PASSWORD_SchedulePickup} from "../pages/SchedulePickup"
import AddDriverToPolicy,{TASK_ID_AddDriverToPolicy, PASSWORD_AddDriverToPolicy} from "../pages/AddDriverToPolicy"
import UpgradeSubscriptionPlan,{TASK_ID_ManageSubscriptionAddon,PASSWORD_ManageSubscriptionAddon} from "../pages/UpgradeSubscriptionPlan"
import ReorderFromHistory,{ TASK_ID_ReorderFromHistory,PASSWORD_ReorderFromHistory} from "../pages/ReorderFromHistory"
import CustomizeNewsFeed,{socialmedia_news_customizefeed, PASSWORD_CustomizeNewsFeed} from "../pages/CustomizeNewsFeed"

import RequestPublicRecord,{TASK_ID_RequestPublicRecord,PASSWORD_RequestPublicRecord} from "../pages/RequestPublicRecord"
import VolunteerSignUp,{TASK_ID_VolunteerSignUp,PASSWORD_VolunteerSignUp} from "../pages/VolunteerSignUp"
import HealthReportAnalyzer,{TASK_ID_HealthReportAnalyzer,PASSWORD_HealthReportAnalyzer} from "../pages/HealthReportAnalyzer"
import CloudPlanComparator,{TASK_ID_CloudPlanComparator,PASSWORD_CloudPlanComparator} from "../pages/CloudPlanComparator";
import CourseLogicQuiz, { TASK_ID_CourseLogicQuiz, PASSWORD_CourseLogicQuiz } from "../pages/CourseLogicQuiz";
import SchoolbookOrder,{TASK_ID_SchoolbookOrder,PASSWORD_SchoolbookOrder} from "../pages/SchoolbookOrder";


export const routes_34: RouteConfig[] = [
  {
    path: TASK_ID_ShippingCalculator,
    title: "Shipping Cost Calculator",
    description:"Your task is to use the shipping calculator to determine the cost for a specific package. You must enter all of the following details correctly on your first attempt: Origin: Canada, Destination: Mexico, Weight: 15 kg, Dimensions: 40cm (L) x 30cm (W) x 20cm (H), Service Type: Priority Express. After calculating the cost with the correct values, a password will be revealed in the results area. Return this password as your answer.",
    icon: "🚚" ,
    component: ShippingCalculator,
    tags: ["e-commerce", "forms", "calculation"],
    password: PASSWORD_ShippingCalculator,
    variant: "base",
    requires_file_upload: false
  },
  {
  path: projectmanagement_users_inviteuser,
  title: "Download Insurance Card",
  description: "You are on the Aegis Secure insurance portal. Navigate to the 'Documents' section and locate your 'Auto Insurance ID Card' for the Toyota Camry, which is associated with policy number AS-781-5C. Download this specific document. Once the correct document is downloaded, the task password will be revealed on the page.",
  icon: "🧾",
  component: DownloadInsuranceCard,
  tags: ["navigation", "file-download", "contracts"],
  difficulty: "medium",
  password: PASSWORD_DownloadInsuranceCard,
  variant: "base",
  requires_file_upload: false
},
{
  path: TASK_ID_InviteUser,
  title: "Invite New User",
  description: "Your task is to invite a new user to the ProjectFlow platform. Navigate the 'Users' section and click the 'Invite User' button to open the invitation dialog. In the modal, enter the email 'new.developer@example.com' and assign them the 'Developer' role. After sending the invitation with the correct details, a password will be revealed. Return this password as your answer.",
  icon: "👥",
  component: InviteUser,
  tags: ["project-management", "forms", "users", "modals"],
  difficulty: "medium",
  password: PASSWORD_InviteUser,
  variant: "base",
  requires_file_upload: false
},
{ 
  path: TASK_ID_SubscribeNewsletter,
  title: "Subscribe to Newsletter",
  description: "You are on the 'Insightful Reads' website. Your task is to find the newsletter named 'Tech Today' from the list of available options. Once you have located it, subscribe using the email address 'agent@example.com'. After successfully subscribing to the correct newsletter with the correct email, a confirmation password will be revealed. Return this password as your answer.",
  icon: "📰",
  component: SubscribeNewsletter,
  tags: ["forms", "e-commerce", "subscriptions"],
  difficulty: "easy",
  password: PASSWORD_SubscribeNewsletter,
  variant: "base",
  requires_file_upload: false
},
{
  path: TASK_ID_ChangeTheme,
  title: "Change Visual Theme",
  description: "Your task is to customize the website's appearance to better suit a night-time work environment. Navigate to the 'Appearance' settings and apply the 'Cosmic Dark' theme. Once the correct theme is applied, a password will be revealed on the page. Return this password as your answer.",
  icon: "🎨",
  component: ChangeTheme,
  tags: ["productivity", "theme", "settings"],
  difficulty: "easy",
  password: PASSWORD_ChangeTheme,
  variant: "base",
  requires_file_upload: false
},
{
  path: TASK_ID_CustomizeFoodOrder,
  title: "Customize Food Order",
  description: "Your task is to customize the food bowl on the page with specific options. For the base, select 'Quinoa & Brown Rice'. For the protein, choose 'Roasted Salmon'. For the premium add-ins, select only 'Haas Avocado'. After making these exact selections, add the item to your order. If done correctly on the first attempt, a password will be revealed on the screen. Return the password as your answer",
  icon: "🍔",
  component: CustomizeFoodOrder,
  tags: ["e-commerce", "order", "forms", "customization", "premium-ui"],
  difficulty: "medium",
  password: PASSWORD_CustomizeFoodOrder,
  variant: "base",
  requires_file_upload: false
},
{
  path: TASK_ID_PICKUP_SCHEDULING,
  title: "Schedule Package Pickup",
  description: "Your task is to schedule a package pickup using the multi-step form. Proceed through the steps and enter the following details: Package Details: The package weighs 15 lbs, with dimensions of 24 inches (Length) by 18 inches (Width) by 12 inches (Height). Schedule & Instructions: The pickup must be scheduled for a date exactly 5 days from today. Select the '02:00 PM - 05:00 PM' window. For the special instructions, your text must include the word fragile. After you submit the form with all details correct on the first attempt, a password will be revealed. Return this password as your answer.",
  icon: "🚚",
  component: SchedulePickup,
  tags: ["e-commerce", "delivery", "forms", "scheduling"],
  difficulty: "medium",
  password: PASSWORD_SchedulePickup,
  variant: "base",
  requires_file_upload: false
},
{
  path: TASK_ID_AddDriverToPolicy,
  title: "Add Driver to Auto Policy",
  description: "Your task is to add a new driver to an auto insurance policy. First, ensure you are on the 'My Policies' page. Click the 'Add Driver' button and fill out the form with these exact details: First Name: Eleanor, Last Name: Vance, Date of Birth: 1995-08-15, Relationship: Spouse, License Number: E1V9C58A2, Assigned Vehicle: 2023 Blue Honda CR-V. After submitting the form with the correct information on your first attempt, a card containing the secret password will appear. Return this password as your answer.",
  icon: "📄",
  component: AddDriverToPolicy,
  tags: ["contracts", "insurance", "forms", "modal"],
  difficulty: "hard",
  password: PASSWORD_AddDriverToPolicy,
  variant: "base",
  requires_file_upload: false 
},

{
  path: TASK_ID_ManageSubscriptionAddon,
  title: "Upgrade Software Subscription",
  description: "You are managing your NexusFlow software subscription. Your task is to navigate to the 'Billing' section of the settings and cancel the 'Advanced Analytics' add-on. After you confirm the cancellation for this specific add-on, a password will be revealed on the screen. Return the password as your answer.",
  icon: "🚀",
  component: UpgradeSubscriptionPlan,
  tags: ["e-bookings", "software", "subscription", "pricing-page"],
  difficulty: "medium",
  password: PASSWORD_ManageSubscriptionAddon,
  variant: "base",
  requires_file_upload: false
},
{
  path:  TASK_ID_ReorderFromHistory,
  title: "Reorder from History",
  description: "Your task is to reorder a specific item from your past food orders. First, ensure you are on the 'Order History' page. Browse through your past orders to find the single most expensive food item across all orders. Once you have identified this specific item, click its 'Reorder' button. If you reorder the correct item on your first attempt, a password will be revealed. Return this password as your answer",
  icon: "🍔",
  component: ReorderFromHistory,
  tags: ["e-commerce", "order", "dynamic-data", "history"],
  difficulty: "hard",
  password: PASSWORD_ReorderFromHistory,
  variant: "base",
  requires_file_upload: false
},
{
  path: socialmedia_news_customizefeed,
  title: "Customize News Feed",
  description: "Your task is to customize your news feed on the 'Pulse' platform. Open the settings by clicking the 'Customize' button in the header. In the preferences modal, adjust your feed to display articles *only* from the 'Technology' and 'Business' categories. After selecting these two topics, save your preferences. If done correctly, a confirmation message containing the password will appear at the top of your newly customized feed.Return this password as your answer",
  icon: "📰",
  component: CustomizeNewsFeed,
  tags: ["social-media", "news", "forms", "modal", "customization"],
  difficulty: "medium",
  password: PASSWORD_CustomizeNewsFeed,
  variant: "base",
  requires_file_upload: false
},
{
  path: TASK_ID_PayParkingTicket,
  title: "Pay Parking Ticket",
  description: "Your task is to pay a parking ticket using the city's online payment portal. The citation number is C74-91B3X, and it must be used to look up the outstanding ticket in the system. During the payment process, the credit card expiry date must be entered as 03/27; all other payment fields can be filled with any values that pass form validation (e.g., a 16-digit card number and 3-digit CVC). Once the payment is successfully submitted on your first attempt, a password will be displayed. Return this password as your final answer.",
  icon: "🎫",
  component: PayParkingTicket,
  tags: ["finance", "payments", "forms"],
  difficulty: "medium",
  password: PASSWORD_PayParkingTicket,
  variant: "base",
  requires_file_upload: false
},
{
  path: TASK_ID_RequestPublicRecord,
  title: "Request a Public Record",
  description: "Your task is to submit a public records request to the county. Please fill out the form with the following information: the requestor's name is Jordan Miles and their email is j.miles@example.com. The request is for 'Permits' from the 'Planning & Zoning' department, specifically for the date range of October 1, 2024 to October 31, 2024. In the description, you must mention the property address '1550 W. Main Street'. Select your preferred Delivery Method. After submitting the form with all correct details, a confirmation password will appear. Your final answer is this password.",
  icon: "📜",
  component: RequestPublicRecord,
  tags: ["civic-tech", "government", "forms"],
  difficulty: "hard",
  password: PASSWORD_RequestPublicRecord,
  variant: "base",
  requires_file_upload: false
},
{
  path: TASK_ID_VolunteerSignUp,
  title: "Sign Up for Volunteer Role",
  description: "Your task is to volunteer for a specific role at the Annual City Marathon. You need to sign up for the Course Marshal position during the 09:00 AM to 12:00 PM shift. After selecting the correct role and time slot, complete the sign-up process and confirm your participation in the modal that appears. If the registration is successful, a confirmation code will be revealed. Your final answer is this code.",
  icon: "🙌",
  component: VolunteerSignUp,
  tags: ["e-bookings", "volunteering", "forms"],
  difficulty: "medium",
  password: PASSWORD_VolunteerSignUp,
  variant: "base",
  requires_file_upload: false
},
{
  path: TASK_ID_HealthReportAnalyzer,
  title: "Analyze Health Report for Prescription",
  description:  "Your task is to use the Health-AI platform to determine the correct prescription criteria for a specific patient. First, navigate to the 'Patient Reports' page and download the CSV file for the patient named 'Liam Smith'. Next, go to the 'Report Analyzer' and upload this downloaded file. The system will extract the patient's vitals. Based on these vitals, you must select the correct 'Age Group', 'Condition Severity', and 'Dosage' from the dropdown filters. If you select the correct three criteria on your first attempt, a password will be revealed. (Criteria: Age > 70 is '71+', 51-70 is '51-70', else '30-50'. Severity: Cholesterol > 240 or Glucose > 125 is 'High', else if Cholesterol > 200 or Glucose > 100 is 'Moderate', else 'Mild'. Dosage: High=40mg, Moderate=20mg, Mild=10mg) and return the password as your answer.",
  icon: "📑",
  component: HealthReportAnalyzer,
  tags: ["health", "analysis", "forms", "file-upload"],
  difficulty: "hard",
  password: PASSWORD_HealthReportAnalyzer,
  variant: "base",
  requires_file_upload: true
},
{
    path: TASK_ID_CloudPlanComparator,
    title: "Cloud Plan Comparator",
    description:"Use the Cloudalyze tool to determine which cloud hosting plan is the most cost-effective. Begin by downloading cost plan sheets and analyzing the current pricing data to reveal the lowest available price. Then, identify and select the specific plan whose price matches this cheapest option. If you correctly select the cheapest plan on your first attempt after analysis, a password will appear on the screen. Extract and return this password as your answer.",
    icon: "☁️",
    component: CloudPlanComparator,
    tags: ["productivity", "decision", "forms", "dynamic-data", "file-download"],
    difficulty: "hard",
    password: PASSWORD_CloudPlanComparator,
    variant: "base",
    requires_file_upload: false
},{
  path: TASK_ID_CourseLogicQuiz,
  title: "Course Logic and Reasoning Quiz",
  description: "Your task is to earn a 'Certificate of Completion' by passing a knowledge quiz. The system will present you with a course on a random topic, including a set of key data points. You must download the course material file to confirm you have accessed it, then use the on-screen information to answer several logic-based multiple-choice questions. These questions require reasoning beyond simple data extraction. Once all questions are answered correctly, the certificate password will be revealed on the page, return password as your answer.",
  icon: "🧠",
  component: CourseLogicQuiz,
  tags: ["reasoning", "elearning", "forms", "dynamic-data", "file-download"],
  difficulty: "hard",
  password: PASSWORD_CourseLogicQuiz,
  variant: "base",
  requires_file_upload: false
},
{
  path: TASK_ID_SchoolbookOrder,
  title: "School Book Order",
  description: "Your task is to act as a parent purchasing school supplies. You must order the complete and correct set of textbooks for a student while staying within a specific budget. The website will provide the grade, the required subjects, and your budget. To succeed, you must select the cheapest book for each required subject, add them to your cart, and check out. A 15% discount is applied if your order contains 5 or more books. The password will only be revealed if your order is perfect (correct subjects and under budget) on your very first attempt. If you fail once, you will not be able to get the password. Return the revealed password as your answer.",
  icon: "📚",
  component: SchoolbookOrder,
  tags: ["e-commerce", "logic", "forms", "dynamic-data"],
  difficulty: "medium",
  password: PASSWORD_SchoolbookOrder,
  variant: "base",
  requires_file_upload: false
}

];






