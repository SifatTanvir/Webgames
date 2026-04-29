import { RouteConfig } from "./routeType";
import BranchDeploy, {
  TASK_ID_BranchDeploy,
  PASSWORD_BranchDeploy,
} from "../pages/BranchDeploy";
import EnvUpdate, {
  TASK_ID_EnvUpdate,
  PASSWORD_EnvUpdate,
} from "../pages/EnvUpdate";
import FontPairer, {
  TASK_ID_FontPairer,
  PASSWORD_FontPairer,
} from "../pages/FontPairer";
import GetApiKey, {
  TASK_ID_GetApiKey,
  PASSWORD_GetApiKey,
} from "../pages/GetApiKey";
import SqlRun, { TASK_ID_SqlRun, PASSWORD_SqlRun } from "../pages/SqlRun";
import TheTripPlanner, {
  TASK_ID_TheTripPlanner,
  PASSWORD_TheTripPlanner,
} from "../pages/TheTripPlanner";
import UnhealthyServer, {
  TASK_ID_UnhealthyServer,
  PASSWORD_UnhealthyServer,
} from "../pages/UnhealthyServer";

export const routes_31: RouteConfig[] = [
  {
    path: TASK_ID_GetApiKey,
    title: "Get API Key",
    description:
      "Your goal is to generate and copy a new API key with specific permissions. First, Click the 'Settings' tab in the sidebar. Second, Click the 'Developer Settings' tab. Third, Click the 'Generate New Key' button. Fourth, Enter the following details: Key Name: 'Staging Server Key', and for Permissions Select 'Full Access'. Fifth, Click the 'Generate' button. Finally, after the new key is displayed, Click the copy icon next to it. Upon completion, a password will be shown; return this password as your answer.",
    icon: "🔑️",
    component: GetApiKey,
    tags: ["project", "permissions", "manage"],
    password: PASSWORD_GetApiKey,
    difficulty: "medium",
    variant: "base",
    base_task: TASK_ID_GetApiKey,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_BranchDeploy,
    title: "Branch Deploy",
    description:
      "Your goal is to create a new deployment for a specific branch and environment. First, Click the 'Deployments' tab. Second, Click the 'Create Deployment' button to open the modal. Third, in the modal, set the following options: Branch: 'Select 'feature-new-login'', Environment: 'Select 'Staging''. Finally, Click the 'Deploy Project' button. Upon completion, a password will be shown; return this password as your answer.",
    icon: "🌴️",
    component: BranchDeploy,
    tags: ["project", "deployments", "manage"],
    password: PASSWORD_BranchDeploy,
    difficulty: "medium",
    variant: "base",
    base_task: TASK_ID_BranchDeploy,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_SqlRun,
    title: "SQL Run",
    description:
      "Your goal is to execute a specific SQL query and download the results. First, Click the 'SQL Editor' tab in the sidebar. Second, in the editor, Enter the query 'SELECT count(*) from orders where status = 'shipped''. Third, Click the 'Run Query' button. Finally, after the result appears, Click the 'Download' button. Upon completion, a password will be shown; return this password as your answer.",
    icon: "🏃️",
    component: SqlRun,
    tags: ["project", "editor", "db"],
    password: PASSWORD_SqlRun,
    difficulty: "medium",
    variant: "base",
    base_task: TASK_ID_SqlRun,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_UnhealthyServer,
    title: "Unhealthy Server",
    description:
      "Your goal is to identify and restart an unhealthy server in the infrastructure monitoring dashboard. First, Click the 'Infrastructure' tab in the sidebar. Second, find the server row with the status 'Unhealthy' and Click its 'Restart' button. Third, in the confirmation modal, Enter 'RESTART' in the text field. Finally, Click the 'Confirm Restart' button. Upon completion, a password will be shown; return this password as your answer.",
    icon: "💉️",
    component: UnhealthyServer,
    tags: ["project", "servers", "manage", "click"],
    password: PASSWORD_UnhealthyServer,
    difficulty: "medium",
    variant: "base",
    base_task: TASK_ID_UnhealthyServer,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_EnvUpdate,
    title: "Env Update",
    description:
      "Your goal is to add a specific environment variable to the project settings. First, Click the 'Settings' tab. Second, find the 'Environment Variables' form and Enter the following details: Key: 'CACHE_DURATION', Value: '3600'. Finally, Click the 'Save' button. Upon completion, a password will be shown; return this password as your answer.",
    icon: "🔄",
    component: EnvUpdate,
    tags: ["project", "environment", "manage", "click"],
    password: PASSWORD_EnvUpdate,
    difficulty: "medium",
    variant: "base",
    base_task: TASK_ID_EnvUpdate,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_FontPairer,
    title: "Font Pairer",
    description:
      "Your goal is to select and export a specific font pairing. First, Click the 'Pairings' tab. Second, in the font pairing tool, set the following fonts: Heading Font: 'Select 'Playfair Display'', Body Font: 'Select 'Lato''. Finally, Click the 'Export Font Pairing' button. Upon completion, a password will be shown; return this password as your answer.",
    icon: "🔤",
    component: FontPairer,
    tags: ["fonts", "pair", "combination"],
    password: PASSWORD_FontPairer,
    difficulty: "medium",
    variant: "base",
    base_task: TASK_ID_FontPairer,
    requires_file_upload: false,
  },
  {
    path: TASK_ID_TheTripPlanner,
    title: "The Trip Planner",
    description:
      "Your goal is to plan a specific multi-stop trip and save the route. First, Click the 'Add Stop' button to ensure there is a stop field. Second, Enter the following details: Start Location: 'City Hall', Stop 1: 'Central Library', Final Destination: 'Main Street Cafe'. Third, Click the 'Plan Route' button. Finally, after the route appears, Click the 'Save Current Route' button. Upon completion, a password will be shown; return this password as your answer.",
    icon: "🗺️",
    component: TheTripPlanner,
    tags: ["plan", "maps", "divination"],
    password: PASSWORD_TheTripPlanner,
    difficulty: "medium",
    variant: "base",
    base_task: TASK_ID_TheTripPlanner,
    requires_file_upload: false,
  },
];
