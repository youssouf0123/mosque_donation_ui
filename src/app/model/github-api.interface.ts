import { GithubIssue } from "./github-issue.interface";

export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}