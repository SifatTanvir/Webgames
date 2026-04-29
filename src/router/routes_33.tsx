import { RouteConfig } from "./routeType";
import ReassignDraftApp, { PASSWORD_ReassignDraftApp, TASK_ID_ReassignDraftApp } from "../pages/CmsAuthNewUser";
import GovBiddingPortal, { TASK_ID_GovBidding, PASSWORD_GovBidding } from "../pages/GovBiddingPortal";

export const routes_33: RouteConfig[] = [
    {
        path: TASK_ID_GovBidding,
        title: "Government Bidding Portal",
        description: "You are a contractor using a government bidding portal. Your task is to find the contract named 'City Landscaping Services' from the list of available bids and click 'View Details'. On the details page, first click the link to 'Download Requirement Documents (PDF)'. After initiating the download, fill out the submission form with the following information: Company Name: 'Evergreen Solutions', and Bid Amount: '125500.00'. Do not include a dollar sign or commas in the amount. Finally, click the 'Submit Bid' button.",
        icon: "🏛️",
        component: GovBiddingPortal,
        tags: ["government", "bidding", "form", "file download", "multi-step"],
        difficulty: "hard",
        password: PASSWORD_GovBidding,
        variant: "base",
        requires_file_upload: false
    },
    {
        path: TASK_ID_ReassignDraftApp,
        title: "Reassign Draft Ownership",
        description: "Your goal is to invite a new user with the role of 'Author', find an existing post in 'Drafts', and reassign ownership of that draft to the new user. First, use the 'Invite New User' button to add a new team member with the 'Author' role. Next, locate the draft post titled 'A Deep Dive into Machine Learning Models' and click the 'Reassign' button. In the modal that appears, select the newly invited user from the dropdown and confirm the reassignment. Upon successful completion, a password will be revealed; return this password as your answer.", 
        icon: "📝",
        component: ReassignDraftApp,
        tags: ["workflow", "users", "posts", "reassignment", "multi-step"],
        difficulty: "hard",
        password: PASSWORD_ReassignDraftApp,
        variant: "base",
        requires_file_upload: false
    }
];
