/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import React, { type ReactElement } from "react";
import { type TableRow } from "./@types";
import { type ActionHandlerArgs } from "./RowActionsList/@types";
import { getDataByColumnType } from "./utils";
import { type ListItem } from "Components/ListModal";
import { type TableColumnConfig } from "Feature/Table/TableBody/TitleRow/@types";

export interface DataRowProps<T1 extends string | number | symbol, T2> {
    columnList: Array<TableColumnConfig<T1>>;
    row: TableRow<T1, T2>;
    actionHandler: ({ ...value }: ActionHandlerArgs) => void;
    modalList: ListItem[];
    modalTitle?: string;
}

const iconClass = "px-[5px] text-[19px] text-grey3 mx-[3px]";

const DataRow = <T1 extends string | number | symbol, T2 extends unknown>({
    columnList,
    ...props
}: DataRowProps<T1, T2>): ReactElement => (
    <div className={"py-[5px] my-[14px] flex"}>
        {columnList?.map((columnConfig, idx) => {
            const { widthClassName } = columnConfig;
            return (
                <div
                    key={idx}
                    className={`${widthClassName} grow-0 shrink-0 px-[10px]
                flex items-center font-fontFamilyBlack text-[14px]`}
                >
                    {getDataByColumnType({
                        columnConfig,
                        iconClass,
                        ...props,
                    })}
                </div>
            );
        })}
    </div>
);

export default DataRow;
