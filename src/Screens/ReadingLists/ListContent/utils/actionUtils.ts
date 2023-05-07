/* eslint-disable autofix/no-unused-vars */
import { type ActionHandlerArgs } from "Feature/Table/TableBody/BodyContent/DataRow/RowActionsList/@types";
import { type IMessageDialog } from "Hooks/useMessageDialog";
import NoteModel from "Models/Note";
import { type IAddNoteToListResponse } from "Models/Note/@types";
import ReadingListModel from "Models/ReadingList";
import {
    type AddToReadingList,
    type DocumentType,
} from "Models/ReadingList/@types";
import { READING_LIST_DOC_TYPE_MAPPING } from "Models/ReadingList/constants";
import ReadingListDocModel from "Models/ReadingListDoc";
import { NOTE_SLUG } from "Screens/ReadingLists/ListNavigation/constants";
import { logger } from "utils/logger";

export interface ReadingActionsHandlerArgs extends ActionHandlerArgs {
    userId: string;
    slug: string;
    showMessageDialog: (msgDialogProps: IMessageDialog) => void;
    getReadingList: (userId: string) => Promise<void>;
}

export const addDocToReadingList = async (
    docId: string,
    listId: string,
    docType: DocumentType
) => {
    let res: IAddNoteToListResponse | AddToReadingList;
    if (docType === "Note") {
        res = await NoteModel.addNoteToReadingList({
            noteId: docId,
            readingListId: {
                listId,
            },
        });
    } else {
        const documentType = READING_LIST_DOC_TYPE_MAPPING[docType];
        res = await ReadingListModel.addToReadingList(documentType, docId, {
            listId,
        });
    }
};

export const deleteDocument = async (
    listItemId: string,
    userId: string,
    slug: string,
    docId: string,
    getReadingList: (userId: string) => Promise<void>
) => {
    let res: any;
    if (slug === NOTE_SLUG) {
        res = await NoteModel.deleteNote(docId);
    } else {
        res = await ReadingListDocModel.deleteDocFromReadingList(listItemId);
    }

    if (!res) return;
    getReadingList(userId).catch((err) => {
        logger.error(err);
    });
};

export const downloadFile = (filename: string, text: string) => {
    const element = document.createElement("a");
    element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();
    document.body.removeChild(element);
};

export const downloadNote = async (noteId: string) => {
    const res = await NoteModel.getNote(noteId);
    if (!res) return;
    downloadFile(`${res.title}.txt`, res.text ?? "");
};

export const readingListActionHandler = ({
    actionKey,
    docId,
    title,
    userId,
    listId,
    docType,
    listItemId,
    slug,
    showMessageDialog,
    getReadingList,
}: ReadingActionsHandlerArgs) => {
    switch (actionKey) {
        case "delete":
            showMessageDialog({
                heading: "Confirmation",
                message: `Are you sure, you want to delete "${title}" from list?`,
                acceptBtnText: "YES",
                closeBtnText: "NO",
                handleAcceptClick: async () =>
                    deleteDocument(
                        listItemId ?? "",
                        userId,
                        slug,
                        docId,
                        getReadingList
                    ).catch((err) => {
                        logger.error(err);
                    }),
            });
            break;
        case "playlist_add":
            addDocToReadingList(docId, listId ?? "", docType ?? "Video").catch(
                (err) => {
                    logger.error(err);
                }
            );
            break;
        case "file_download":
            downloadNote(docId).catch((err) => {
                logger.error(err);
            });
            break;
        default:
            break;
    }
};
