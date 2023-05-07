/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import clsx from "clsx";
import React, { type ReactElement } from "react";
import DataRow, { type DataRowProps } from "./DataRow";
import { type TableRow } from "./DataRow/@types";
import styles from "./index.module.scss";

export interface BodyContentProps<T1 extends string | number | symbol, T2>
    extends Omit<DataRowProps<T1, T2>, "row"> {
    rowList: Array<TableRow<T1, T2>>;
}

const BodyContent = <T1 extends string | number | symbol, T2 extends unknown>({
    rowList,
    ...props
}: BodyContentProps<T1, T2>): ReactElement => (
    <ul className={`${styles.bodyContainer} bg-lxsGrey1 overflow-auto`}>
        {rowList.map((row, idx: number) => (
            <li
                key={idx}
                className={clsx("flow-root", {
                    "bg-white": idx % 2 === 1,
                })}
            >
                <DataRow row={row} {...props} />
            </li>
        ))}
    </ul>
);

export default BodyContent;
