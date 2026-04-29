import { FC } from "react";

export interface RouteConfig {
  path: string;
  title: string;
  description: string;
  icon: string;
  component: FC;
  tags: string[];
  hidden?: boolean;
  password?: string;
  difficulty?: "easy" | "medium" | "hard";
  variant?: "easy" | "base" | "hard";
  base_task?: string;
  requires_file_upload?: boolean;
}