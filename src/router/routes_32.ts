import { RouteConfig } from "./routeType";
import CmsEditDraft,
{TASK_ID_CmsEditDraft, 
PASSWORD_CmsEditDraft } 
from "../pages/CmsEditDraft";
import CustomReportAnalytics, 
{TASK_ID_CustomReportAnalytics, PASSWORD_CustomReportAnalytics }
 from "../pages/CustomReportAnalytics";
import BlogPostAffiliatePaywall, { TASK_ID_BlogPostAffiliatePaywall, PASSWORD_BlogPostAffiliatePaywall }
from "../pages/BlogPostAffiliatePaywall";
import FontLibrary, {TASK_ID_FontLibrary, PASSWORD_FontLibrary }
from "../pages/FontLibrary";
import RestoreDeletedPage, {TASK_ID_RestoreDeletedPage, PASSWORD_RestoreDeletedPage }
from "../pages/RestoreDeletedPage";
import ScheduleUtilityBill, { TASK_ID_ScheduleUtilityBill, PASSWORD_ScheduleUtilityBill } 
from "../pages/ScheduleUtilityBill";
import PlotLabResultsCorrelation, { TASK_ID_PlotLabResultsCorrelation, PASSWORD_PlotLabResultsCorrelation } 
from "../pages/PlotLabResultsCorrelation";
import TeamStatusUpdate, { TASK_ID_TeamStatusUpdate, PASSWORD_TeamStatusUpdate } 
from "../pages/TeamStatusUpdate";
import ProjectTimeTracker, { TASK_ID_ProjectTimeTracker, PASSWORD_ProjectTimeTracker } 
from "../pages/ProjectTimeTracker";
import PortfolioStrategySelector, { TASK_ID_PortfolioStrategySelector, PASSWORD_PortfolioStrategySelector }
 from "../pages/PortfolioStrategySelector";
import DiscontinueProduct, { TASK_ID_DiscontinueProduct, PASSWORD_DiscontinueProduct }
 from "../pages/ManageInventory";
 import LoanRepaymentSimulator, { TASK_ID_LoanRepaymentSimulator, PASSWORD_LoanRepaymentSimulator } 
 from "../pages/LoanRepaymentSimulator";
 import DisasterResourceAllocation, { PASSWORD_DisasterResourceAllocation, TASK_ID_DisasterResourceAllocation } from "../pages/DisasterResourceAllocation";
import SecretAgentDecoder, { PASSWORD_SecretAgentDecoder, TASK_ID_SecretAgentDecoder } from "../pages/SecretAgentDecoder"
import FraudChainAnalysis, {TASK_ID_FraudChainAnalysis, PASSWORD_FraudChainAnalysis} from "../pages/FraudChainAnalysis";


export const routes_32: RouteConfig[] = [
{
  path: TASK_ID_CmsEditDraft,
  title: "CMS: Edit and Save Draft",
  description: "Your task is to update a draft page within the company's content management system. Locate the page titled 'Company History'. You need to add a new section to this page. The section should have the subheading 'The Digital Revolution' followed by these two paragraphs of text:\n\nParagraph 1: 'The late 20th century brought unprecedented change with the advent of the internet. Our company was at the forefront, embracing digital technologies to enhance our services and reach a global audience. This period marked our transition from a traditional brick-and-mortar business to a digitally-integrated enterprise.'\n\nParagraph 2: 'We launched our first website in 1998, a simple but effective platform that opened up new channels for customer engagement. This was followed by strategic investments in e-commerce and data analytics, solidifying our position as an innovator in the industry and setting the stage for future growth.'\n\nAfter adding the text, insert any image from the media library into the content area. Finally, save your changes as a draft. Do not publish the page. Once the draft is correctly updated and saved, a password will be revealed.",
  icon: "📝",
  component: CmsEditDraft,
  tags: ["cms", "draft", "text-input", "modal", "content-creation"],
  difficulty: "hard",
  password: PASSWORD_CmsEditDraft,
  variant: "base",
 requires_file_upload: false
},
{
path: TASK_ID_CustomReportAnalytics,
title: "Create Custom Analytics Report",
description: "As a data analyst for your company's website, your manager has asked you to investigate user drop-off. Your task is to use the analytics panel to create a new custom report. You need to specifically analyze the user flow that starts at the 'Homepage' and ends at the 'Contact' page. Once the report is generated, identify which page within this specific flow has the highest drop-off rate. Finally, export these findings to reveal the password.",
icon: "📊",
component: CustomReportAnalytics,
tags: ["data-analysis", "form-filling", "dynamic-data"],
difficulty: "medium",
password: PASSWORD_CustomReportAnalytics,
variant: "base",
requires_file_upload: false
},
{
  path: TASK_ID_BlogPostAffiliatePaywall,
  title: "Blog Post Monetization",
  description: "Your task is to edit the blog post titled 'The Future of AI'. You need to enhance its monetization by inserting an affiliate link for the 'QuantumLeap Laptop' after the second paragraph and placing a paywall immediately after it to encourage premium subscriptions. Once both modifications are correctly applied, a password will be displayed.",
  icon: "📝",
  component: BlogPostAffiliatePaywall,
  tags: ["content management", "editing", "monetization"],
  difficulty: "medium",
  password: PASSWORD_BlogPostAffiliatePaywall,
  variant: "base",
  requires_file_upload: false
},
{
  path: TASK_ID_FontLibrary,
  title: "Purchase Font License",
  description: "You are customizing your website's typography in the site builder. Your goal is to enhance the design by adding a premium, licensed font. Browse the font library to find a font that requires a 'Commercial License'. Once you've chosen one, add it to your project and complete the checkout process to purchase the license by adding 'Jane Smith' as name, '1111222233334444' as card number, '12/25' as expiry and '123' as code. After the successful transaction, a confirmation message will display a password. Capture and return this password.",
  icon: "🇦",
  component: FontLibrary,
  tags: ["form", "modal", "dynamic discovery", "payment"],
  difficulty: "medium",
  password: PASSWORD_FontLibrary,
  variant: "base",
  requires_file_upload: false
},
{
  path: TASK_ID_RestoreDeletedPage,
  title: "Restore Deleted Page",
  description: "A crucial page titled 'About Our Team' was accidentally deleted from your website's Content Management System. Your task is to locate this page in the trash, confirm it's the correct one by viewing its last saved version, and then use the restore function to bring it back as a live draft. Once the page is successfully restored, a password will be revealed.",
  icon: "♻️",
  component: RestoreDeletedPage,
  tags: ["cms", "restore", "trash", "history"],
  difficulty: "medium",
  password: PASSWORD_RestoreDeletedPage,
  variant: "base",
  requires_file_upload: false
},
{
  path: TASK_ID_ScheduleUtilityBill,
  title: "Schedule a Utility Bill Payment",
  description: "You are logged into your online banking portal. Your goal is to schedule a payment for your Electric Utility bill. You must find the correct payee from the list, identify the current statement balance, and schedule the payment to be made exactly two days before the due date. Once the payment is successfully scheduled, a confirmation number and password will be displayed. Return the password to complete the task.",
  icon: "💰",
  component: ScheduleUtilityBill,
  tags: ["finance", "payment", "forms", "date-calculation"],
  difficulty: "medium",
  password: PASSWORD_ScheduleUtilityBill,
  variant: "base",
  requires_file_upload: false
},
{
  path: TASK_ID_PlotLabResultsCorrelation,
  title: "Plot Lab Results Correlation",
  description: "Your health provider has asked you to review your lab results. Your task is to access the 'Lab Results' dashboard and plot two specific biomarkers, 'Glucose' and 'A1c', on the same graph to visualize their correlation over the past five years. Once the correct graph is displayed, a password will be revealed. Return this password as your answer.",
  icon: "🩺",
  component: PlotLabResultsCorrelation,
  tags: ["charts", "data-visualization", "health", "state-management"],
  difficulty: "hard",
  password: PASSWORD_PlotLabResultsCorrelation,
  variant: "base",
  requires_file_upload: false
},
{
  path: TASK_ID_TeamStatusUpdate,
  title: "Team Status and Stand-up Update",
  description: "You are a member of a remote software development team. Start your day by updating your status and providing your daily stand-up by following the instructions provided. Once both tasks are completed correctly, a password will be revealed on the screen.",
  icon: "💬",
  component: TeamStatusUpdate,
  tags: ["project-management", "communication", "forms", "state-management"],
  difficulty: "medium",
  password: PASSWORD_TeamStatusUpdate,
  variant: "base",
  requires_file_upload: false
},
{
  path: TASK_ID_ProjectTimeTracker,
  title: "Dynamic Time and Task Management",
  description: "Your assignment is to act on the instructions provided in the 'Manager's Briefing' panel on the main dashboard. You will need to carefully read the briefing to identify which tasks to work on, then accurately log time for one task and use the timer for another as specified. A password will be revealed on the page once you have correctly completed both objectives.",
  icon: "📋",
  component: ProjectTimeTracker,
  tags: ["project-management", "task", "time-tracking", "dynamic"],
  difficulty: "hard",
  password: PASSWORD_ProjectTimeTracker,
  variant: "base",
  requires_file_upload: false
},

{
  path: TASK_ID_PortfolioStrategySelector,
  title: "Select Investment Strategy",
  description: "Your task is to rebalance your investment portfolio according to the recommended strategy. First, find the 'Recommended Strategy' on your dashboard to identify its name and target allocation. Then, use the 'Rebalance Portfolio' tool, select the correct strategy from the list of options, and confirm the trades. If you select the correct strategy, a confirmation code will be revealed. Provide this code as your answer.",
  icon: "🎯",
  component: PortfolioStrategySelector,
  tags: ["finance", "portfolio", "investment", "decision-making"],
  difficulty: "hard",
  password: PASSWORD_PortfolioStrategySelector,
  variant: "base",
  requires_file_upload: false
},
{
  path: TASK_ID_DiscontinueProduct,
  title: "Discontinue Affiliate Product",
  description: "Your task is to manage the product inventory based on a system alert. A specific product has been flagged and needs to be marked as 'No Longer Recommended'. Find the alert on the dashboard to identify the product, then locate it in the inventory list and update its status accordingly. This will automatically add a disclaimer to all articles featuring this product. Upon successful completion, a password will be revealed.",
  icon: "📦",
  component: DiscontinueProduct,
  tags: ["cms", "inventory-management", "content-update"],
  difficulty: "medium",
  password: PASSWORD_DiscontinueProduct,
  variant: "base",
  requires_file_upload: false
},
{
  path: TASK_ID_LoanRepaymentSimulator,
  title: "Loan Repayment Simulator",
  description: "Your task is to use the loan repayment simulator to compare different payment plans. Find the specific loan scenario detailed on the page, enter the required values for loan amount, interest rate, term, and your income into the simulator, and then run the simulation. Once you have calculated the results for the correct scenario, a password will be revealed.",
  icon: "🎓",
  component: LoanRepaymentSimulator,
  tags: ["elearning", "finance", "calculator", "forms"],
  difficulty: "medium",
  password: PASSWORD_LoanRepaymentSimulator,
  variant: "base",
  requires_file_upload: false
},
{
  path: TASK_ID_DisasterResourceAllocation,
  title: "Disaster Resource Allocation",
  description: "A major disaster has struck. You are in charge of the Emergency Response Command. Your primary goal is to save lives. A situation report at the top of the screen provides your budget and primary objective: identify the incident with the most 'People in Need' and deploy a 'Medical Team' to that location. Be aware of resource costs and your budget, as incorrect deployments may prevent you from completing the primary objective. After deploying the correct unit, click the 'Finalize Response' button to complete the mission and receive the password.",
  icon: "🚨",
  component: DisasterResourceAllocation,
  password: PASSWORD_DisasterResourceAllocation,
  tags: ["civictech", "dashboard", "dynamic-data", "budgeting", "prioritization"],
  difficulty: "hard",
},
{
  path: TASK_ID_SecretAgentDecoder,
  title: "Secret Agent Decoder",
  description: "As a spy, you must decrypt a secret message. A classified field report, pinned at the top of your terminal, contains clues about the encryption method. Analyze the report to determine the correct sequence of decryption protocols to apply from the 'Codebook'. Apply the protocols in order, then verify the decryption to reveal the final password.",
  icon: "🕵️",
  component: SecretAgentDecoder,
  password: PASSWORD_SecretAgentDecoder,
  difficulty: "medium",
  tags: ["logic", "dynamic", "multi-step", "spy"]
},
{
  path: TASK_ID_FraudChainAnalysis,
  title: "Fraud Chain Analysis",
  description: "Your goal is to act as a fraud investigator. Download new guidelines. Analyze the five case files provided. First, click on each case file on the left to view its transaction details on the right. Identify the single case file that matches all the fraudulent criteria described in the memo. Analyze cases using sort & highlight tools. Pin the critical transaction facilitating the fraud. Mark the case, then submit the final wallet address to close the investigation. Once identified, copy the 'Final Consolidation Address' from that fraudulent chain. Paste this address into the input field at the bottom of the page and click 'Submit Report'.",
  icon: "⚖️",
  component: FraudChainAnalysis,
  difficulty: "hard",
  tags: ["finance", "analysis", "dynamic", "multi-step"],
  password: PASSWORD_FraudChainAnalysis,
}
]