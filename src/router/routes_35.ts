import { RouteConfig } from "./routeType";

import ContentOptimizer, { TASK_ID_ContentOptimizer, PASSWORD_ContentOptimizer } from "../pages/ContentOptimizer";
import { ContentGapAnalyzer, TASK_ID_ContentGapAnalyzer, PASSWORD_ContentGapAnalyzer }  from "../pages/ContentGapAnalyzer";
import FlightBooker, { TASK_ID_FlightBooker, PASSWORD_FlightBooker } from "../pages/FlightBooker";

export const routes_35: RouteConfig[] = [
  {
    path: TASK_ID_ContentOptimizer,
    title: "Content Strategy Optimizer",
    description: "Follow the on-screen objective to optimize a social media content calendar. Your task is to download an analytics file, identify the top-performing content type based on the specified metric, and use the drag-and-drop calendar to build a 7-day plan that meets the interaction goals. Publishing a correct plan will reveal the password in a non-dismissable modal, disabling further actions.",
    icon: "📈",
    component: ContentOptimizer,
    tags: ["social-media", "analysis", "calendar", "drag-and-drop", "file-download", "dynamic"],
    difficulty: "hard",
    password: PASSWORD_ContentOptimizer,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_ContentGapAnalyzer,
    title: "Content Gap Analyzer",
    description: "Your task is to devise a new content strategy by analyzing competitive data. First, download the provided CSV file to identify the three topics with the highest 'Opportunity Score'. In the UI, select these three topics. Then, assign the following categories precisely: assign 'The Future of Serverless' to 'Technical Guides', 'AI-Powered Automation' to 'Technical Guides', and 'Cloud-Native Cost Optimization' to 'Case Studies'. The final strategy must achieve a 'Projected Traffic Increase' of at least 22%. Launch the strategy to complete the task.",
    icon: "💡",
    component: ContentGapAnalyzer,
    tags: ["cms", "strategy", "data-interpretation", "file-download", "reasoning"],
    difficulty: "hard",
    password: PASSWORD_ContentGapAnalyzer,
    variant: "base",
    requires_file_upload: false
  },
  {
    path: TASK_ID_FlightBooker,
    title: "Multi-Leg Flight Booker",
    description: "Your task is to act as a travel agent and book a specific multi-leg flight itinerary. You must select the correct sequence of flights from a list of available options to match the route 'New York → London → Paris → Tokyo'. The final itinerary must not exceed a total cost of $1300 or a total travel time of 22 hours. Choose the most cost-effective options to meet these constraints. Once the correct itinerary is assembled, book the trip to complete the task.",
    icon: "✈️",
    component: FlightBooker,
    tags: ["ebooking", "optimization", "data-interpretation", "reasoning", "static"],
    difficulty: "hard",
    password: PASSWORD_FlightBooker,
    variant: "base",
    requires_file_upload: false
  }
];






