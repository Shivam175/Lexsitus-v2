import { type CaseLawListItem, type CaseLawItem } from "./@types";
import { request } from "AxiosUtils";
import ReadingHistoryModel from "Models/ReadingHistory";
import { type DocumentType } from "Models/ReadingList/@types";
import { logger } from "utils/logger";

export interface ListItem {
    id: string;
    item_slug: string;
    title: string;
}
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class CaseLawModel {
    static getById = async (id: string) =>
        request<CaseLawItem>({
            url: `/caseLaws/${id}`,
            method: "GET",
        });

    static findById = async (
        id: string,
        isLoggedIn: boolean,
        docType: DocumentType
    ) => {
        try {
            const data = await CaseLawModel.getById(id);
            if (isLoggedIn) {
                const params = { docId: data.id, docType };
                await ReadingHistoryModel.addToReadingHistory(params);
            }

            return data;
        } catch (error: unknown) {
            logger.error(error);
        }
    };

    static getCaseLawList = async (id: string) =>
        request<CaseLawListItem[]>({
            url: "/caseLaws",
            method: "GET",
            params: {
                filter: {
                    where: { menuItemId: id },
                    fields: ["id", "title", "item_slug", "slug"],
                },
            },
        });
}

export default CaseLawModel;
