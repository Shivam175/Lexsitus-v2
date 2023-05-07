import { type ReadingListTableColumn } from "./@types";
import styles from "./index.module.scss";
import { type TableColumnConfig } from "Feature/Table/TableBody/TitleRow/@types";

export const MODAL_TITLE = "Add to reading List";

export const TABLE_COLUMN_LIST: Array<TableColumnConfig<ReadingListTableColumn>> = [
    {
        title: "Name",
        widthClassName: styles.firstTableColumn,
        columnKey: "docMetaData",
        columnType: "Link",
        isUsingSort: true,
    },
    {
        title: "Type",
        widthClassName: styles.secondTableColumn,
        columnKey: "docIcon",
        columnType: "ReactNode",
        isUsingSort: true,
    },
    {
        title: "Date Added",
        widthClassName: styles.thirdTableColumn,
        columnKey: "dateAdded",
        columnType: "String",
        isUsingSort: true,
    },
    {
        title: "",
        widthClassName: styles.fourthTableColumn,
        columnKey: "docActionsList",
        columnType: "ActionList",
    },
];
