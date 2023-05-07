import { thunk, type Thunk } from "easy-peasy";
import { type TRootStore } from "..";
import { type IIssueReport, type IIssueReportResponse } from "../../Models/IssueReport/@types";
import IssueReportModel from "../../Models/IssueReport";

export interface IssueReportState {
    reportIssue: Thunk<IssueReportState, IIssueReport, any, TRootStore, Promise<IIssueReportResponse>>;
}

const IssueReportStore: IssueReportState = {

    reportIssue: thunk(async (actions, payload ) => {
        const data = await IssueReportModel.reportIssue(payload);
        return data;
    }),
};

export default IssueReportStore;
