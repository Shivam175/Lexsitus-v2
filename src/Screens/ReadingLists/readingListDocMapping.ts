import { type LibraryTabPath } from "Feature/Library/Context/tabMapping";
import { type DocumentType } from "Models/ReadingList/@types";

export type ReadingDocPath = LibraryTabPath | "toaep";

export type ReadingDocName =
    | "Video"
    | "Elements of crime"
    | "Commentary"
    | "Case law"
    | "Preparatory work"
    | "Note"
    | "Toaep Document"
    | "MOFD"
    | "EOCD";

export type ReadingActionIcon =
    | "playlist_add"
    | "link"
    | "delete"
    | "file_download";

export interface ReadingDocMapping {
    path: ReadingDocPath;
    docType: DocumentType;
    docName: string;
    actionList: ReadingActionIcon[];
}

const defaultActionList: ReadingActionIcon[] = ["playlist_add", "delete"];

export const readingDocMapping: ReadingDocMapping[] = [
    {
        path: "lectures",
        docType: "Video",
        docName: "Video",
        actionList: defaultActionList,
    },
    {
        path: "clicc",
        docType: "Commentary",
        docName: "Commentary",
        actionList: defaultActionList,
    },
    {
        path: "preparatory-works",
        docType: "PreparatoryWork",
        docName: "Preparatory work",
        actionList: ["playlist_add", "link", "delete"],
    },
    {
        path: "case-law",
        docType: "CaseLaw",
        docName: "Case law",
        actionList: ["playlist_add", "link", "delete"],
    },
    {
        path: "elements-of-crime",
        docType: "ElementsOfCrime",
        docName: "Elements of crime",
        actionList: defaultActionList,
    },
    {
        path: "elements-digest",
        docType: "EOCD",
        docName: "EOCD",
        actionList: defaultActionList,
    },
    {
        path: "means-proof-digest",
        docType: "MOFD",
        docName: "MOFD",
        actionList: defaultActionList,
    },
    {
        path: "lectures",
        docType: "Note",
        docName: "Note",
        actionList: ["playlist_add", "file_download", "delete"],
    },
    {
        path: "toaep",
        docType: "ToeAppDocument",
        docName: "Toaep Document",
        actionList: defaultActionList,
    },
];
