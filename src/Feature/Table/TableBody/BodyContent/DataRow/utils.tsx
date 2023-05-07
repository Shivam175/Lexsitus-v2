/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type ReactElement } from "react";
import RowActionsList, { type RowActionsListProps } from "./RowActionsList";
import { type RowActionIcon } from "./RowActionsList/@types";
import { type DataRowProps } from ".";
import Link from "Components/Link";
import { type TableColumnConfig } from "Feature/Table/TableBody/TitleRow/@types";

export interface GetDataByColumnProps<T1 extends string | number | symbol, T2>
    extends Omit<DataRowProps<T1, T2>, "columnList"> {
    columnConfig: TableColumnConfig<T1>;
    iconClass?: string;
}

export const getDataByColumnType = <
    T1 extends string | number | symbol,
    T2 extends unknown
>({
    columnConfig,
    row,
    actionHandler,
    modalList,
    modalTitle,
    iconClass,
}: GetDataByColumnProps<T1, T2>): ReactElement => {
    const { columnKey } = columnConfig;
    const tableElement = row.row[columnKey];
    const {
        columnType = "String",
        elementValue,
        elementProperties,
    } = tableElement;
    switch (columnType) {
        case "Link":
            return (
                <div className={"hover:underline decoration-[1px]"}>
                    <Link to={elementValue?.link}>{elementValue?.title}</Link>
                </div>
            );
        case "ReactNode":
            return <div>{elementValue as ReactElement}</div>;
        case "String":
            return <div>{elementValue as string}</div>;
        case "ActionList":
            const actionListProps: RowActionsListProps = {
                docId: elementProperties?.docId,
                title: elementProperties?.title,
                externalLink: elementProperties?.externalLink,
                docType: elementProperties?.docType,
                listItemId: row.rowId,
                actionList: elementValue as RowActionIcon[],
                actionHandler,
                modalList,
                modalTitle,
                iconClass,
            };
            return <RowActionsList {...actionListProps} />;
        default:
            return <></>;
    }
};
