import { type DocumentType } from "Models/ReadingList/@types";

export const DEFAULT_EMPTY_READING_LIST = {
    created: "",
    id: "",
    title: "",
    updated: "",
    userId: "",
};

export const EXCLUDE_FROM_HISTORY: DocumentType[] = ["ToeAppDocument"];

export const DEFAULT_READING_LIST = {
    created: "",
    id: "",
    title: "Untitled",
    updated: "",
    userId: "",
    documents: [],
};
