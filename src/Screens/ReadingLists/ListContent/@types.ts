import { type TableRow } from "Feature/Table/TableBody/BodyContent/DataRow/@types";
import { type DocumentType } from "Models/ReadingList/@types";

export type ReadingListTableColumn =
    | "docMetaData"
    | "docIcon"
    | "dateAdded"
    | "docActionsList";

export interface ReadingListTableElementProperties {
    isoDate?: string;
    externalLink?: string;
    docType?: DocumentType;
    title?: string;
    docId?: string;
}

export type ReadingListTableRow = TableRow<
ReadingListTableColumn,
ReadingListTableElementProperties
>;
