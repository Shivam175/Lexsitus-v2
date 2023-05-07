export type ColumnType = "Link" | "ReactNode" | "ActionList" | "String";

export type SortOrder = "ascending" | "descending";

export type SortIcon = "keyboard_arrow_up" | "keyboard_arrow_down";

export interface TableColumnConfig<T> {
    title: string;
    columnKey: T;
    widthClassName: string;
    columnType: ColumnType;
    isUsingSort?: boolean;
}