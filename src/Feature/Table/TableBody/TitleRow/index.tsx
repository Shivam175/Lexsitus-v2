import React, { type ReactElement, useEffect, useState } from "react";
import {
    type SortIcon,
    type SortOrder,
    type TableColumnConfig,
} from "./@types";
import {
    arrowDown,
    arrowUp,
    btnClass,
    containerClass,
    iconClass,
    sortOrderMapping,
} from "./constants";
import Button from "Components/Button";

export interface TitleRowProps<T extends string | number | symbol> {
    columnList: Array<TableColumnConfig<T>>;
    sortByField?: (columnKey: T, order: SortOrder) => void;
}

const TitleRow = <T extends string | number | symbol>({
    columnList,
    sortByField,
}: TitleRowProps<T>): ReactElement => {
    const [activeSortColumn, setActiveSortColumn] = useState<T | undefined>(
        undefined
    );
    const [sortIcon, setSortIcon] = useState<SortIcon>(arrowUp);

    const toggleSortIcon = () => {
        if (sortIcon === arrowDown) setSortIcon(arrowUp);
        else setSortIcon(arrowDown);
    };

    const handleSort = (columnKey: T) => {
        if (columnKey === activeSortColumn) {
            toggleSortIcon();
            return;
        }

        setActiveSortColumn(columnKey);
        setSortIcon(arrowUp);
    };

    useEffect(() => {
        if (activeSortColumn && sortIcon && sortByField) {
            sortByField(activeSortColumn, sortOrderMapping[sortIcon]);
        }
    }, [activeSortColumn, sortIcon]);

    return (
        <div className={containerClass}>
            {columnList.map(
                ({ title, columnKey, widthClassName, isUsingSort }, idx) => (
                    <Button
                        key={idx}
                        className={`${widthClassName} ${btnClass}`}
                        onClick={() => {
                            if (isUsingSort) handleSort(columnKey);
                        }}
                    >
                        {title}
                        {columnKey === activeSortColumn ? (
                            <span className={iconClass}>{sortIcon}</span>
                        ) : null}
                    </Button>
                )
            )}
        </div>
    );
};

export default TitleRow;
