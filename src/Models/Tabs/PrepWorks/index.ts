import { type PrepWorksData, type PrepWorksListItem } from "./@types";
import { request } from "AxiosUtils";
import ReadingHistoryModel from "Models/ReadingHistory";
import { type DocumentType } from "Models/ReadingList/@types";
import { logger } from "utils/logger";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class PrepWorksModel {
    static getById = async (id: string) =>
        request<PrepWorksData>({
            url: `/preparatoryWorks/${id}`,
            method: "GET",
        });

    static findById = async (
        id: string,
        isLoggedIn: boolean,
        docType: DocumentType
    ) => {
        try {
            const data = await PrepWorksModel.getById(id);
            if (isLoggedIn) {
                const params = { docId: data.id, docType };
                await ReadingHistoryModel.addToReadingHistory(params);
            }

            return data;
        } catch (error: unknown) {
            logger.error(error);
        }
    };

    static getPreparatoryWorksList = async (id: string) =>
        request<PrepWorksListItem[]>({
            url: "/preparatoryWorks",
            method: "GET",
            params: {
                filter: {
                    where: { menuItemId: id },
                    fields: ["id", "title", "item_slug", "slug"],
                },
            },
        });
}

export default PrepWorksModel;
