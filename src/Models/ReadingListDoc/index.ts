/* eslint-disable @typescript-eslint/no-extraneous-class */
import { request } from "AxiosUtils";
import { type ReadingListItem } from "Models/ReadingList/@types";
import { type JSONType } from "Typings/@types";

const BASE_PATH = "/reading-list-doc";
class ReadingListDocModel {
    static getReadingDocuments = async (params: JSONType) =>
        request<ReadingListItem[]>({
            url: `${BASE_PATH}`,
            method: "GET",
            params,
        });

    static deleteDocFromReadingList = async (docId: string) =>
        request<{ count: number }>({
            url: `${BASE_PATH}/${docId}`,
            method: "DELETE",
        });
}

export default ReadingListDocModel;
