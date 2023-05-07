import { type JSONType } from "Typings/@types";

export type DocumentType =
    | "Video"
    | "ElementsOfCrime"
    | "Commentary"
    | "CaseLaw"
    | "PreparatoryWork"
    | "MOFD"
    | "EOCD"
    | "Note"
    | "ToeAppDocument";

export type AddToReadingListDocType =
    | "videos"
    | "commentaries"
    | "preparatoryWorks"
    | "caseLaws"
    | "elementsOfCrimes"
    | "means-proof-digest"
    | "elements-crime-digest"
    | "toeapp-documents"
    | "notes";

export interface Document {
    header: string;
    id: string;
    title?: string;
    pdfURL?: string;
}

export interface ReadingItem {
    created: string;
    docId: string;
    docType: DocumentType;
    document: Document;
    id: string;
    updated: string;
    userId: string;
    content?: string;
    date_access?: string;
}

export interface ReadingListItem extends ReadingItem {
    listId: string;
}

export interface EmptyReadingList {
    created: string;
    id: string;
    title: string;
    updated: string;
    userId: string;
}

export interface ReadingList extends EmptyReadingList {
    documents?: ReadingListItem[];
}

export interface ReadingListBase {
    id: string;
    title: string;
}

export interface UserId {
    id: string;
}

export interface ReadingListTitle {
    title: string;
}

export interface RenameListParams {
    readingListId: string;
    newTitle: ReadingListTitle;
}

export interface RequestParams {
    filter: JSONType;
}

export interface GetReadingList {
    readingListId: string;
    params: RequestParams;
}

export interface AddToReadingList {
    created: string;
    docId: string;
    docType: string;
    id: string;
    listId: string;
    updated: string;
    userId: string;
}
