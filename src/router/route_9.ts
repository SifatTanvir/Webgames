import { BudgetCoursePlanner, COURSE_PASSWORD, COURSE_TASK_ID } from "../pages/BudgetCoursePlanner";
import PublishArticleCMS, { CMS_PASSWORD, CMS_TASK_ID } from "../pages/PublishArticleCMS";
import CategorizeWalletTokens, { WALLET_PASSWORD, WALLET_TASK_ID } from "../pages/CategorizeWalletTokens";
import { COMPANY_PASSWORD, COMPANY_TASK_ID, CompanyBudgetAllocation } from "../pages/CompanyBudgetAllocation";
import CryptoPortfolioRebalancer, { REBALANCE_PASSWORD, REBALANCE_TASK_ID } from "../pages/CryptoPortfolioRebalancer";
import DeFiStakingDashboard, { STAKING_PASSWORD, STAKING_TASK_ID } from "../pages/DefiStakingDashboard";
import DungeonRiddlesGame, { DUNGEON_PASSWORD, DUNGEON_TASK_ID } from "../pages/DungeonRiddlesGame";
import EcommerceDelivery, { ECOMMERCE_PASSWORD, ECOMMERCE_TASK_ID } from "../pages/EcommerceDelivery";
import ExportTransactionHistory, { TRANSACTION_HISTORY_TASK_ID, TRANSACTION_PASSWORD } from "../pages/ExportTransactionHistory";
import PrioritzeTasks, { ASSIGN_PRIORITY_PASSWORD, ASSIGN_PRIORITY_TASK_ID } from "../pages/PrioritizeTasks";
import ProjectPlanUpdater, { PROJECT_PASSWORD, PROJECT_TASK_ID } from "../pages/ProjectPlanUpdater";
import ResetAfterAudit, { PASSWORD_WarehouseInventoryReset, TASK_ID_WarehouseInventoryReset } from "../pages/ResetAfterAudit";
import KanbanReviewBoard, { PASSWORD_KanbanReview, TASK_ID_KanbanReview } from "../pages/ReviewBackendTasks";
import SendEmailReminder, { PASSWORD_AbandonedCartRecovery, TASK_ID_AbandonedCartRecovery } from "../pages/SendEmailReminder"
import SetLimitOrders, { PASSWORD_SetLimitOrders, TASK_ID_SetLimitOrders } from "../pages/SetLimitOrders"
import SocialMediaScheduler, { SOCIAL_PASSWORD, SOCIAL_TASK_ID } from "../pages/SocialMediaScheduler";
import SprintBacklog, { SPRINT_PASSWORD, SPRINT_TASK_ID } from "../pages/SprintBacklog";
import TaskAssignment, { TASK_ASSIGNMENT_TASK_ID, TASK_PASSWORD } from "../pages/TaskAssignment";
import URLContentSummary, { URLParser_PASSWORD } from "../pages/URLContentSummary"
import { RouteConfig } from "./routeType"

export const routes_9: RouteConfig[] = [
    {
        path: TASK_ID_SetLimitOrders,
        title: "Crypto Limit Order Task",
        description:
            "Your goal is to set and trigger on-chain limit orders for cryptocurrency trades. First, select the token pair ETH/USDC. Set a buy limit order for 0.5 ETH at $2,950 USDC, and a sell limit order for 0.3 ETH at $3,150 USDC. After setting both orders, confirm and monitor the order status. Once both orders are successfully triggered, a password will appear. Return this password as your answer.",
        icon: "💹",
        component: SetLimitOrders,
        tags: ["crypto", "limit order", "trading", "finance"],
        password: PASSWORD_SetLimitOrders,
        difficulty: "medium",
        variant: "base",
        base_task: TASK_ID_SetLimitOrders,
        requires_file_upload: false,
    },
    {
        path: '/elearning-summary-compareinformation',
        title: 'URL Content Summary',
        description: 'Extract, compare, and summarize AI research content from Meta, Nvidia, and AWS blogs.',
        icon: "✍️",
        component: URLContentSummary,
        tags: ['ai', 'research', 'blogs'],
        password: URLParser_PASSWORD,
        difficulty: 'medium',
        requires_file_upload: false,
    },
    {
        path: TASK_ID_AbandonedCartRecovery,
        title: "E-commerce Abandoned Cart Recovery",
        description:
            "Your goal is to retrieve the password that appears after sending a reminder email to a specific user group. These users abandoned carts with over $100 in value, but none of them should have clicked ‘Unsubscribe’ in the last 30 days. The password is revealed only after the email is successfully sent to the correct, filtered list. Return this password as your answer.",
        icon: "🛒",
        component: SendEmailReminder,
        tags: ["ecommerce", "dashboard", "analytics", "filtering", "marketing", "email"],
        password: PASSWORD_AbandonedCartRecovery,
        difficulty: "easy",
        variant: "base",
        base_task: TASK_ID_AbandonedCartRecovery,
        requires_file_upload: false,
    },
    {
        path: TASK_ID_WarehouseInventoryReset,
        title: "Warehouse Inventory Reset",
        description:
            "Your task is to obtain the password that appears after resetting a warehouse’s inventory count. The reset should take place following a completed audit at the end of the fiscal quarter. Only the audited items should be cleared and reset. unverified stock should remain untouched. The system includes records of which items were audited and provides a reset option based on that. Once the reset is correctly performed, a password will be displayed.",
        icon: "📦",
        component: ResetAfterAudit,
        tags: ["inventory", "dashboard", "warehouse", "audit", "logistics", "data management"],
        password: PASSWORD_WarehouseInventoryReset,
        difficulty: "easy",
        variant: "base",
        base_task: TASK_ID_WarehouseInventoryReset,
        requires_file_upload: false,
    },
    {
        path: TASK_ID_KanbanReview,
        title: "Kanban Sprint Review",
        description:
            "Your task is to review all backend and QA tasks listed under the 'Done' tab of the Kanban board. Each task must be evaluated: if it’s issue-free, approve it to move it to 'Completed'; if it requires changes, reject it to send it to the 'Bug-Fix' tab instead. You must also update the associated time field for each task based on its current state or any edits made. A password will be revealed once all tasks from the 'Done' column are properly reviewed and moved.",
        icon: "📋",
        component: KanbanReviewBoard,
        tags: ["agile", "project management", "task board"],
        password: PASSWORD_KanbanReview,
        difficulty: "medium",
        variant: "base",
        base_task: TASK_ID_KanbanReview,
        requires_file_upload: false,
    },
    {
        path: ASSIGN_PRIORITY_TASK_ID,
        title: "Bug Triage Dashboard",
        description:
            "Your task is to review all user-reported bugs in the 'In Review' tab. Each bug must be prioritized by severity—critical first, then high, medium, and low. Assign each valid report to the designated engineer based on the issue type (UI, API, DB). If a report is a duplicate or invalid, it must be flagged and resolved with a reason. The password will be revealed once all reports are accurately prioritized, assigned, or resolved, clearing the 'In Review' queue.",
        icon: "🐞",
        component: PrioritzeTasks,
        tags: ["dashboard", "bug tracking", "triage", "project management", "prioritization"],
        password: ASSIGN_PRIORITY_PASSWORD,
        difficulty: "hard",
        variant: "base",
        base_task: ASSIGN_PRIORITY_TASK_ID,
        requires_file_upload: false,
    },
    {
        path: TRANSACTION_HISTORY_TASK_ID,
        title: "Financial Transaction Export",
        description:
            "Your task is to export the last 30 days of transactions from a user's savings account. From the exported data, filter out transactions with descriptions related to food and delivery. Any entries that are currently uncategorized must be reviewed and appropriately categorized based on their description. Once the data is correctly filtered and all uncategorized items are handled, export the result as a CSV. Completing this process successfully will reveal a password.",
        icon: "🧾",
        component: ExportTransactionHistory,
        tags: ["finance", "banking", "data export", "csv", "filtering", "dashboard"],
        password: TRANSACTION_PASSWORD,
        difficulty: "medium",
        variant: "base",
        base_task: TRANSACTION_HISTORY_TASK_ID,
        requires_file_upload: false,
    },
    {
        path: STAKING_TASK_ID,
        title: "DeFi Staking & Confirmation",
        description:
            "Your task is to stake 100 USDC into a DeFi pool that enforces a 7-day lockup period. Before confirming the transaction, make sure to observe and note the APY displayed prior to staking. After the staking transaction is completed, view the post-transaction confirmation to verify the stake and lockup status. Once the stake is successful and both APY and confirmation are noted, a password will be revealed. Return that password as your answer.",
        icon: "🔒",
        component: DeFiStakingDashboard,
        tags: ["defi", "crypto", "staking", "finance", "blockchain", "dashboard"],
        password: STAKING_PASSWORD,
        difficulty: "medium",
        variant: "base",
        base_task: STAKING_TASK_ID,
        requires_file_upload: false,
    },
    {
        path: SPRINT_TASK_ID,
        title: "Project Sprint and Backlog",
        description:
            "Your task is to prepare the workspace for an upcoming release. In the project board, create a new sprint titled 'Q4 launch' and add exactly 7 backlog items related to authentication features. Once the sprint is configured, go to the task history section and archive any tasks marked as 'Completed' that are over 30 days old. After organizing the sprint and cleaning up completed items, a password will be shown. This is the only scenario where the password is returned.",
        icon: "🚀",
        component: SprintBacklog,
        tags: ["project management", "agile", "sprint", "jira", "dashboard", "archiving"],
        password: SPRINT_PASSWORD,
        difficulty: "hard",
        variant: "base",
        base_task: SPRINT_TASK_ID,
        requires_file_upload: false,
    },
    {
        path: TASK_ASSIGNMENT_TASK_ID,
        title: "Task Sharing and Assignment",
        description:
            "Your task is to share and assign tasks from a specific weekly list. Open the Task List section and select any month from the dropdown. Then choose the 'Week 3' list. Use the sharing option to invite two teammates. After sharing, assign one task to each teammate by selecting their name in the 'Assignee' field next to the task. Once both assignments are made, click Save. A password will be revealed upon successful sharing and assignment.",
        icon: "🤝",
        component: TaskAssignment,
        tags: ["collaboration", "task management", "dashboard", "sharing", "assignment"],
        password: TASK_PASSWORD,
        difficulty: "medium",
        variant: "base",
        base_task: TASK_ASSIGNMENT_TASK_ID,
        requires_file_upload: false,
    },
    {
        path: SOCIAL_TASK_ID,
        title: "Social Media Content Scheduler",
        description: "Your task is to schedule 3 days worth of social media content for a client using our content scheduler. Schedule a post with an image for Monday, showcases what we do as a social media company. Then schedule a post for wednesday containing only texts that enlightens users why social branding is important. Finally create a long form article to be posted on Friday with at most 500 words explaining how AI agents can help with social media growth, It should have a show more/less functionality. The posts for each day should be scheduled for 7 PM. A password will be revealed when and only when all the stated conditions are met.",
        icon: "📅",
        component: SocialMediaScheduler,
        tags: ["social-media", "planning", "scheduling", "content-management"],
        difficulty: "medium",
        password: SOCIAL_PASSWORD,
        variant: "base",
        requires_file_upload: false
    },
    {
        path: ECOMMERCE_TASK_ID,
        title: "Birthday Gift Shopping",
        description: "Your task is to buy a gift for a birthday. On the shopping website, search for a blue formal shirt under $75 with at least a 4-star rating that can be delivered within one week. Use the filters for price/rating and the date picker for delivery to find the right product and add it to the cart.",
        icon: "🛒",
        component: EcommerceDelivery,
        tags: ["ecommerce", "shopping", "delivery", "filtering"],
        difficulty: "medium",
        password: ECOMMERCE_PASSWORD,
        variant: "base",
        requires_file_upload: false
    },
    {
        path: REBALANCE_TASK_ID,
        title: "Crypto Portfolio Rebalancer",
        description: "Your current crypto portfolio is worth $10,000 and is allocated to BTC and ETH. Rebalance the portfolio to include two new tokens alongside BTC and ETH. Calculate the exact dollar amount of tokens to sell and tokens to buy, then execute the trades on the exchange page.",
        icon: "₿",
        component: CryptoPortfolioRebalancer,
        tags: ["crypto", "portfolio", "trading", "rebalancing"],
        difficulty: "medium",
        password: REBALANCE_PASSWORD,
        variant: "base",
        requires_file_upload: false
    },
    {
        path: COURSE_TASK_ID,
        title: "Dynamic Course Path Builder",
        description: "Your mission is to act as a student advisor and build a valid learning path. You will be presented with a course catalog, a specific budget, and a set of rules for course selection. These rules, which include required course categories and minimum rating conditions, are displayed in the instruction header on the page and change with every attempt. Carefully select the correct combination of courses that satisfy all constraints and finalize the path to reveal the success password. The system will only grant the password on the first valid submission attempt.",
        icon: "🎓",
        component: BudgetCoursePlanner,
        tags: ["state management", "dynamic content", "e-commerce", "forms"],
        difficulty: "hard",
        password: COURSE_PASSWORD,
        variant: "base",
        requires_file_upload: false
    },
    {
        path: CMS_TASK_ID,
        title: "Publish a New Article",
        description: `Your task is to prepare an article for publication in a Content Management System (CMS). Based on the article's title and content, you must correctly set all the publishing details. Your steps are:
      1.  Select the correct primary category from the dropdown based on the article's content.
      2.  After selecting the category, choose all the relevant tags from the list provided.
      3.  Set the publication date to exactly **August 1st, 2025**.
      If you set all fields correctly on your first attempt, a password will be revealed. Any incorrect selection will permanently lock the task for this session, requiring a page refresh.`,
        icon: "📝",
        component: PublishArticleCMS,
        tags: ["form", "dropdown", "date-picker", "state-management", "logic"],
        difficulty: "hard",
        password: CMS_PASSWORD,
        variant: "base",
        requires_file_upload: false
    },
    {
        path: COMPANY_TASK_ID,
        title: "Budget Analysis & Re-allocation",
        description: "Your goal is to increase the company's net profit by a specific amount. Analyze the provided monthly expense report to identify the top spending categories. Then, use the budget allocation tool to decrease spending in those categories by a specific percentage and re-allocate the saved amount to the 'Savings' category. The exact targets are specified in the instructions panel on the page.",
        icon: "📊",
        component: CompanyBudgetAllocation,
        tags: ["finance", "analysis", "form", "sliders"],
        difficulty: "hard",
        password: COMPANY_PASSWORD,
        variant: "base",
        requires_file_upload: false
    },
    {
        path: PROJECT_TASK_ID,
        title: "Update Project Plan Dependencies",
        description: "In the project plan, a specific task is behind schedule by a few days. Your goal is to find this task, update its end date using the date picker to reflect the delay, verify that the start date of its dependent task is automatically pushed back, and finally assign an unassigned task to a specific team member from the dropdown list.",
        icon: "🗓️",
        component: ProjectPlanUpdater,
        tags: ["state management", "date picker", "forms", "dependency logic"],
        difficulty: "hard",
        password: PROJECT_PASSWORD,
        variant: "base",
        requires_file_upload: false
    },
    {
        path: WALLET_TASK_ID,
        title: "Categorize Crypto Token",
        description: "You have received an airdrop of a new token. Visit its project page, read the whitepaper to determine its category (e.g., DeFi, Gaming, AI), then return to your wallet and use the Manage Tokens feature to categorize it correctly. The password will be revealed upon successful first-time categorization.",
        icon: "🪙",
        component: CategorizeWalletTokens,
        tags: ["navigation", "form-filling", "logic", "crypto"],
        difficulty: "medium",
        password: WALLET_PASSWORD,
        variant: "base",
        requires_file_upload: false
    },
    {
        path: DUNGEON_TASK_ID,
        title: "Dungeon Riddle Doors",
        description: "You are trapped in a dungeon with three doors, each guarded by a riddle. An ancient scroll on the wall contains the answers to all three riddles, but they are scrambled and out of order. Study each door's riddle carefully, find the corresponding answer on the scroll, and enter the correct answer for each door to unlock your path to freedom and reveal the password.",
        icon: "🏰",
        component: DungeonRiddlesGame,
        tags: ["puzzle", "riddles", "matching", "logic"],
        difficulty: "medium",
        password: DUNGEON_PASSWORD,
        variant: "base",
        requires_file_upload: false
    }
]