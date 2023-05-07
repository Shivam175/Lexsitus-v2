import { type ReactNode } from "react";
import { type RowActionIcon } from "./RowActionsList/@types";
import { type ColumnType } from "Feature/Table/TableBody/TitleRow/@types";

export interface RowLinkElement {
    title: string;
    link: string;
}

export interface TableElement<T> {
    elementValue:  RowLinkElement | ReactNode | RowActionIcon[] | string;
    elementProperties?: T;
    columnType?: ColumnType;
}

export interface TableRow<T1 extends string | number | symbol, T2> {
    rowId: string;
    row: Record<T1, TableElement<T2>>;
}