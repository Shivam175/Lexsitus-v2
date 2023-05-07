/* eslint-disable @typescript-eslint/no-extraneous-class */
import { type AddItemToHistory, type ReadingHistoryItem } from "./@types";
import { request } from "AxiosUtils";
import { type RequestParams } from "Models/ReadingList/@types";

const BASE_PATH = "/user-history-document";
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class ReadingHistoryModel {
    static getReadingHistory = async (params: RequestParams) =>
        request<ReadingHistoryItem[]>({
            url: BASE_PATH,
            method: "GET",
            params,
        });

    static addToReadingHistory = async (payload: AddItemToHistory) =>
        request<ReadingHistoryItem>({
            url: `${BASE_PATH}/add-document`,
            method: "POST",
            data: payload,
        });
}

export default ReadingHistoryModel;
