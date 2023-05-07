import { type DocumentType } from "Models/ReadingList/@types";

export type DocumentOrigin = "ReadingDrawer" | "PathSlug";

export interface LibraryDocument {
    docId: string;
    docType: DocumentType;
    origin: DocumentOrigin;
}