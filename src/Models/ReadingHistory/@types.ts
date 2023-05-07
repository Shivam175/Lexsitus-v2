import { type ReadingItem, type DocumentType } from "Models/ReadingList/@types";

export interface ReadingHistoryItem extends ReadingItem {}

export interface AddItemToHistory {
    docId: string;
    docType: DocumentType;
}
