export type IssueReportType = "content" | "other_issue";

export interface IIssueReport {
    about: string;
    email: string;
    name: string;
    reportType: IssueReportType;
}

export interface IIssueReportResponse {
    about: string;
    email: string;
    name: string;
    reportType: IssueReportType;
    created: string;
    id: string; 
    updated: string;
}