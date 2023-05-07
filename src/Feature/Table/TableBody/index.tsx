/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import React, { type ReactElement } from "react";
import BodyContent, { type BodyContentProps } from "./BodyContent";
import TitleRow, { type TitleRowProps } from "./TitleRow";

export interface TableBodyProps<T1 extends string | number | symbol, T2>
    extends Omit<TitleRowProps<T1>, "ColumnList">,
    BodyContentProps<T1, T2> {}

const TableBody = <T1 extends string | number | symbol, T2 extends unknown>({
    columnList,
    sortByField,
    ...props
}: TableBodyProps<T1, T2>): ReactElement => (
    <>
        <TitleRow columnList={columnList} sortByField={sortByField} />
        <BodyContent columnList={columnList} {...props} />
    </>
);

export default TableBody;
