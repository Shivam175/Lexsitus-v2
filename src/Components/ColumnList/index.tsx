import React, { type FC } from "react";
import styles from "./index.module.scss";

export interface IColumnListProps {
    list: string[];
}

const ColumnList: FC<IColumnListProps> = ({ list }) => (
    <div className={styles["list-component-container"]}>
        <ul className={styles["list-component-list"]}>
            {list?.map((element: string, index: number) => (
                <li
                    key={`listComponentListItem_${index}`}
                    className={styles["list-component-list-item"]}
                >
                    {element}
                </li>
            ))}
        </ul>
    </div>
);

export default ColumnList;
