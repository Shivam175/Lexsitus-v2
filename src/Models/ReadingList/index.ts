/* eslint-disable @typescript-eslint/no-extraneous-class */
import {
    type ReadingListBase,
    type ReadingList,
    type RenameListParams,
    type RequestParams,
    type GetReadingList,
    type EmptyReadingList,
    type AddToReadingList,
    
    type AddToReadingListDocType,
} from "./@types";
import { request } from "AxiosUtils";
import { type JSONType } from "Typings/@types";

const BASE_PATH = "/readingLists";
class ReadingListModel {
    static getAllReadingLists = async (params: RequestParams) =>
        request<ReadingListBase[]>({
            url: BASE_PATH,
            method: "GET",
            params,
        });

    static getReadingList = async ({ readingListId, params }: GetReadingList) =>
        request<ReadingList>({
            url: `${BASE_PATH}/${readingListId}`,
            method: "GET",
            params,
        });

    static renameReadingList = async ({
        readingListId,
        newTitle,
    }: RenameListParams) =>
        request<EmptyReadingList>({
            url: `${BASE_PATH}/${readingListId}`,
            method: "PUT",
            data: newTitle,
        });

    static addToReadingList = async (
        docType: AddToReadingListDocType,
        docId: string,
        params: JSONType
    ) =>
        request<AddToReadingList>({
            url: `${docType}/${docId}/readingListDoc`,
            method: "POST",
            data: params,
        });
}

export default ReadingListModel;
