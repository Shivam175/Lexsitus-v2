import { mapToTableReadingList } from "./mapToTableList";
import NoteModel from "Models/Note";

import ReadingListDocModel from "Models/ReadingListDoc";
import {
    DOC_LIST_SLUG,
    NOTE_SLUG,
} from "Screens/ReadingLists/ListNavigation/constants";

export const getReadingList = async (userId: string, slug: string) => {
    let list: any[] = [];
    if (slug === DOC_LIST_SLUG) {
        const params = {
            filter: {
                where: { userId },
                include: [
                    {
                        relation: "document",
                        scope: {
                            fields: ["title", "header", "pdfURL"],
                        },
                    },
                ],
            },
        };
        list = await ReadingListDocModel.getReadingDocuments(params);
    } else if (slug === NOTE_SLUG) {
        const params = {
            filter: {
                where: { userId },
                fields: ["title", "id"],
            },
        };
        list = await NoteModel.getAllNotes(params);
    } else {
        const params = {
            filter: {
                where: { userId, listId: slug },
                include: [
                    {
                        relation: "document",
                        scope: {
                            fields: ["title", "header", "pdfURL"],
                        },
                    },
                ],
            },
        };
        list = await ReadingListDocModel.getReadingDocuments(params);
    }

    if (!list) return;
    return mapToTableReadingList(list, slug ?? "");
};
