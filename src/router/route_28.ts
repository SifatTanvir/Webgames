import { RouteConfig } from "./routeType";

import ManageSubscriptions, { TASK_ID_ecommerce_scheduling_subscriptions, PASSWORD_ecommerce_scheduling_subscriptions } from "../pages/ManageSubscriptions.tsx";
import LinkBankAccount, { TASK_ID_finance_bank_link, PASSWORD_finance_bank_link } from "../pages/LinkBankAccount";
import ManageWishlists, { TASK_ID_ecommerce_wishlist_wishlist, PASSWORD_ecommerce_wishlist_wishlist } from "../pages/ManageWishlists";
import CreateSocialGroup, { TASK_ID_socialmedia_social_hiking, PASSWORD_socialmedia_social_hiking } from "../pages/CreateSocialGroup";
import CreateEvent, { TASK_ID_socialmedia_social_boardgamenight, PASSWORD_socialmedia_social_boardgamenight } from "../pages/CreateEvent";
import ProjectReports, { TASK_ID_ProjectReports, PASSWORD_ProjectReports } from "../pages/ProjectManageReports.tsx";
import ManageTravelItinerary, { TASK_ID_ebooking_travel_trip, PASSWORD_ebooking_travel_trip } from "../pages/ManageTravelItinerary";
import PetGroomingAppointment, { TASK_ID_ebooking_appointment_pet, PASSWORD_ebooking_appointment_pet } from "../pages/PetGroomingAppointment";
import AdvancedTradingOrder, { TASK_ID_finance_advancedtrading_order, PASSWORD_finance_advancedtrading_order } from "../pages/AdvancedTradingOrder";
import EnableTwoFactorAuth, { TASK_ID_EnableTwoFactorAuth, PASSWORD_EnableTwoFactorAuth } from "../pages/EnableTwoFactorAuth.tsx";
import GroupAdminDashboard, { TASK_ID_socialmedia_group_poll as TASK_ID_socialmedia_group_poll, PASSWORD_socialmedia_group_poll } from "../pages/GroupAdminDashboard";
import SocialMediaBlogPost, { TASK_ID_socialmedia_blogpost_platform, PASSWORD_socialmedia_blogpost_platform } from "../pages/SocialMediaBlogPost";
import ProjectCommunicationChannel, { TASK_ID_ProjectCommunicationChannel, PASSWORD_ProjectCommunicationChannel } from "../pages/ProjectCommunicationChannel";
import WorkloadBalancer, { TASK_ID_projectmanage_balancing_chart, PASSWORD_projectmanage_balancing_chart } from "../pages/WorkloadBalancer";

export const routes_28: RouteConfig[] = [
    {
        path: TASK_ID_ecommerce_scheduling_subscriptions,
        title: "Manage Subscription Schedule",
        description: "You are a customer of 'The Daily Grind' e-commerce store. Your goal is to manage your recurring orders. From your account dashboard, navigate to your subscriptions page. You need to find your 'Monthly Coffee Beans' subscription and make two adjustments for an upcoming trip: first, skip the very next delivery. After that, modify the delivery schedule from its current frequency of every 4 weeks to every 6 weeks to better suit your new needs. After saving these changes, confirm that your next billing date has been pushed back. If all actions are completed correctly, a password will be displayed.",
        icon: "📦",
        component: ManageSubscriptions,
        tags: ["e-commerce", "scheduling", "forms", "navigation"],
        difficulty: "medium",
        password: PASSWORD_ecommerce_scheduling_subscriptions,
        variant: "base",
        requires_file_upload: false
    },
    {
        path: TASK_ID_finance_bank_link,
        title: "Link and Verify Bank Account",
        description: "Your task is to finalize the linking of a new external bank account to your main 'Global Trust Bank' profile. The external account has been pre-added but requires verification. To complete this, you must locate the two small trial deposit amounts that have been recorded on your dashboard. Once you find these values, initiate the verification process for the pending account and submit the two amounts. A confirmation password will be revealed upon successful verification.",
        icon: "🏦",
        component: LinkBankAccount,
        tags: ["finance", "bank", "verification", "forms"],
        difficulty: "medium",
        password: PASSWORD_finance_bank_link,
        variant: "base",
        requires_file_upload: false
    },
    {
        path: TASK_ID_ecommerce_wishlist_wishlist,
        title: "Manage Wishlists",
        description: "Your task is to organize your gift ideas on the 'Tech Emporium' website. First, you need to create a new wishlist specifically for an upcoming birthday and name it 'Birthday Ideas'. After creating the list, browse the products and add two specific items to it: the 'Smartwatch Series 8' and the 'Wireless Noise-Canceling Headphones'. Finally, navigate to the management page for your new 'Birthday Ideas' wishlist, change its privacy setting to 'Shareable via Link' so you can send it to others, and then copy the generated link to your clipboard. A password will be revealed if all steps are completed correctly.",
        icon: "🎁",
        component: ManageWishlists,
        tags: ["e-commerce", "wishlist", "forms", "state management"],
        difficulty: "hard",
        password: PASSWORD_ecommerce_wishlist_wishlist,
        variant: "base",
        requires_file_upload: false
    },
    {
        path: TASK_ID_socialmedia_social_hiking,
        title: "Create Social Group",
        description: "Your task is to organize a community for fellow hikers. Create a new group with the name 'Local Hiking Enthusiasts'. For the safety and comfort of its members, set the group's privacy to 'Private'. You must also add a thoughtful description about the group's purpose and upload any suitable image to serve as a cover photo. Once the group is created, find the invite function and invite your friends 'Alex Johnson' and 'Bethany Chen' to join. Upon successful completion of all steps, a password will be revealed on the group's page.",
        icon: "👥",
        component: CreateSocialGroup,
        tags: ["social-media", "forms", "file-upload", "multi-step"],
        difficulty: "hard",
        password: PASSWORD_socialmedia_social_hiking,
        variant: "base",
        requires_file_upload: true
    },
    {
        path: TASK_ID_socialmedia_social_boardgamenight,
        title: "Create Social Event",
        description: "Your task on the 'SocialSphere' platform is to create a new event. The event should be named 'Board Game Night' and is scheduled for next Saturday at 7:00 PM. Make sure to specify a physical location by adding an address, for example, '123 Main St, Anytown, USA'. Crucially, you must enable the option allowing guests to invite their own friends. Once all details are correctly filled in, post the event. A password will be shown on the event details page upon successful creation.",
        icon: "📅",
        component: CreateEvent,
        tags: ["social-media", "forms", "scheduling", "events"],
        difficulty: "medium",
        password: PASSWORD_socialmedia_social_boardgamenight,
        variant: "base",
        requires_file_upload: false
    },
    {
        path: TASK_ID_ProjectReports,
        title: "Project Report Generation",
        description: "Your task is to act as a project manager and generate a specific performance analysis report. Within the project management dashboard, navigate to the reporting section. You need to create a 'Team Performance' report specifically for the 'Website Redesign' project, covering the last 30 days. After generating the initial report, you must refine the data by applying a filter to isolate all tasks assigned to the team member 'Alex Ray'. The final step is to export this filtered view as a PDF document. Upon successful completion of the PDF export, a password will be revealed.",
        icon: "📄",
        component: ProjectReports,
        tags: ["forms", "navigation", "filtering", "project-management"],
        difficulty: "medium",
        password: PASSWORD_ProjectReports,
        variant: "base",
        requires_file_upload: false
    },
    {
        path: TASK_ID_ebooking_travel_trip,
        title: "Manage Travel Itinerary",
        description: "Your task is to manage your upcoming travel plans. First, find and open your trip to 'Paris'. Once inside the itinerary, locate the hotel booking and add the confirmation number 'HILTON-CONF-789XYZ'. Next, manually add a new activity to the schedule: a 'Museum Tour' for next Saturday at 10:00AM. Finally, use the share feature to send a read-only link of the updated itinerary to your travel partner, 'alex@travel.com'. A password will be revealed upon successful completion of all steps.",
        icon: "✈️",
        component: ManageTravelItinerary,
        tags: ["forms", "modals", "state-management", "e-booking"],
        difficulty: "hard",
        password: PASSWORD_ebooking_travel_trip,
        variant: "base",
        requires_file_upload: false
    },
    {
        path: TASK_ID_ebooking_appointment_pet,
        title: "Pet Grooming Appointment",
        description: "Your task is to book a pet grooming appointment for a large dog. You must select the 'Full Groom' package and also include the 'Nail Grinding' add-on service. The appointment must be scheduled with the groomer named 'Maria' at her first available time slot. Once the booking is correctly confirmed, a password will be revealed.",
        icon: "🐾",
        component: PetGroomingAppointment,
        tags: ["ebooking", "forms", "wizard"],
        difficulty: "medium",
        password: PASSWORD_ebooking_appointment_pet,
        variant: "base",
        requires_file_upload: false
    },
    {
        path: TASK_ID_finance_advancedtrading_order,
        title: "Advanced Trading: OCO Order",
        description: "Your objective is to execute a risk management strategy on a stock using a 'One-Cancels-the-Other' (OCO) order. First, identify the stock's initial market price displayed in the header. Based on this price, you must configure an OCO sell order for all available shares. The order must have two parts: a take-profit limit order set at exactly 10% above the initial market price, and a stop-loss order set at exactly 5% below the initial market price. After correctly configuring and placing the order, use the Market Simulator buttons to incrementally change the stock's price until one of your order's conditions is triggered. If the order was set up with the correct prices and quantity, a confirmation password will be revealed after the trade executes and the other leg is cancelled.",
        icon: "📈",
        component: AdvancedTradingOrder,
        tags: ["finance", "trading", "forms", "dynamic"],
        difficulty: "hard",
        password: PASSWORD_finance_advancedtrading_order,
        variant: "base",
        requires_file_upload: false
    },
    {
        path: TASK_ID_EnableTwoFactorAuth,
        title: "Enable Two-Factor Authentication",
        description: "Your task is to enhance your account security. Log into your Capital Bank account with the username 'user@example.com' and password 'bank_password123'. Once logged in, navigate to the account's security settings. Find the option for two-factor authentication (2FA) and proceed to enable it using the 'Authenticator App' method. On the setup screen, you will be presented with a simulated 2FA process. Find the 6-digit verification code displayed on the page and enter it into the designated field to complete the setup. The final password will be revealed upon successful completion.",
        icon: "🛡️",
        component: EnableTwoFactorAuth,
        tags: ["finance", "authentication", "multi-step"],
        difficulty: "medium",
        password: PASSWORD_EnableTwoFactorAuth,
        variant: "base",
        requires_file_upload: false
    },
    {
        path: TASK_ID_socialmedia_group_poll,
        title: "Social Media Group Admin",
        description: "You are the admin for the 'AI Innovators Hub' social media group. Your goal is to perform several administrative tasks to keep the group active and organized. First, create a poll to engage members by asking about the next meeting topic: 'Q3 Project Kick-off'. After creating the poll, you must navigate to the 'Group Insights' section to review the latest membership growth statistics. Finally, return to the feed, locate the 'Welcome to the Group!' announcement post, and pin it to the top for new members. Upon successful completion of all three tasks, a password will be revealed.",
        icon: "👥",
        component: GroupAdminDashboard,
        tags: ["social-media", "forms", "multi-step", "state-management"],
        difficulty: "hard",
        password: PASSWORD_socialmedia_group_poll,
        variant: "base",
        requires_file_upload: false
    },
    {
        path: TASK_ID_socialmedia_blogpost_platform,
        title: "Blog Post Creator",
        description: "You are a content manager for 'NexusSphere', a leading social media platform. Your task is to draft a new blog post announcing a major platform update. The draft needs to be prepared for review by your colleague, Priya. The post must include an embedded video from the official announcement, which can be found at `https://www.youtube.com/embed/dQw4w9WgXcQ`. For the post's banner, use the official featured image located at `https://picsum.photos/seed/tech-post/1200/630`. Once the post is correctly drafted with the video and featured image, save it as a draft. A password will be displayed upon successful completion.",
        icon: "📝",
        component: SocialMediaBlogPost,
        tags: ["social-media", "content-creation", "forms", "richtext"],
        difficulty: "medium",
        password: PASSWORD_socialmedia_blogpost_platform,
        variant: "base",
        requires_file_upload: false
    },
    {
        path : TASK_ID_ProjectCommunicationChannel,
        title : "Create a Project Update Thread",
        description : "Your task is to post an update in the company's project communication channel. Create a new thread about a 'UI Design Update'. In your message, you must tag both the Designer and the Product Manager to request their `feedback by the end of the day`. Finally, ensure you attach the provided design mockup to the message. Upon successful submission, a password will be revealed.",
        icon : "🗣️",
        component : ProjectCommunicationChannel,
        tags : ["communication", "project-management", "collaboration"],
        difficulty : "medium",
        password : PASSWORD_ProjectCommunicationChannel,
        variant : "base",
        requires_file_upload : false
    },
    {
        path: TASK_ID_projectmanage_balancing_chart,
        title: "Workload Balancing Chart",
        description: "Your task is to use the workload balancing tool to optimize team capacity. Review the workload distribution chart and identify the team member who is over capacity at 150% and the one who is under capacity at 50%. Reassign tasks by dragging and dropping them from the overloaded member to the underutilized one until both of their workloads are at or below 100%. A successful rebalance will reveal a password.",
        icon: "📊",
        component: WorkloadBalancer,
        tags: ["project-management", "drag-and-drop", "resource-planning", "balancing"],
        difficulty: "medium",
        password: PASSWORD_projectmanage_balancing_chart,
        variant: "base",
        requires_file_upload: false
    }
]