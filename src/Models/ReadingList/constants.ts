import { type AddToReadingListDocType, type DocumentType } from "./@types";

export const READING_LIST_DOC_TYPE_MAPPING: Record<
DocumentType,
AddToReadingListDocType
> = {
    Video: "videos",
    ElementsOfCrime: "elementsOfCrimes",
    Commentary: "commentaries",
    CaseLaw: "caseLaws",
    PreparatoryWork: "preparatoryWorks",
    MOFD: "means-proof-digest",
    EOCD: "elements-crime-digest",
    Note: "notes",
    ToeAppDocument: "toeapp-documents",
};
