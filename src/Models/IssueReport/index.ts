import { type IIssueReport, type IIssueReportResponse } from "./@types";
import { request } from "AxiosUtils";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class IssueReportModel {

    static reportIssue = async (issueReport: IIssueReport) => request<IIssueReportResponse>({
        url: "/issue-reports",
        method: "POST",
        data: issueReport
    });
}

export default IssueReportModel;
