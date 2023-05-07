/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import React, { type ReactElement } from "react";
import TableBody, { type TableBodyProps } from "./TableBody";
import { type TableRow } from "./TableBody/BodyContent/DataRow/@types";
import TableHeading from "./TableHeading";

export interface TableProps<T1 extends string | number | symbol, T2>
    extends TableBodyProps<T1, T2> {
    heading: string;
    rowList: Array<TableRow<T1, T2>>;
}

const Table = <T1 extends string | number | symbol, T2 extends unknown>({
    heading,
    ...props
}: TableProps<T1, T2>): ReactElement => (
    <div className="h-[100%]">
        <TableHeading heading={heading} />
        <TableBody {...props} />
    </div>
);

export default Table;
