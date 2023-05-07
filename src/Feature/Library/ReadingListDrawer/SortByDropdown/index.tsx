import clsx from "clsx";
import React, { type FC } from "react";
import Button from "Components/Button";
import {
    type ReadingListDrawerState,
    type SortParam,
} from "Feature/Library/ReadingListDrawer/@types";
import { SORT_KEYS_LIST } from "Feature/Library/ReadingListDrawer/constants";

export interface SortByDropdownProps {
    closeDialog: () => void;
    sortByKey: (key: SortParam) => void;
    isDrawerOpen: ReadingListDrawerState;
}

const dialogRootCls = `absolute right-[35px] block bg-white z-[800] text-[14.5px] min-w-[100px]
 shadow-medium top-[-120.175px]`;

const btnCls = "py-[3px] px-[7px] text-grey1 text-[16px] block leading-[22px] w-[100%] text-left";

const listItemCls = "mx-[1px] leading-[24px] cursor-pointer clear-both text-[#000000de]";

const SortByDropdown: FC<SortByDropdownProps> = ({
    closeDialog,
    sortByKey,
    isDrawerOpen,
}) => {
    const handleSort = (key: SortParam) => {
        sortByKey(key);
        closeDialog();
    };

    const cls = clsx(dialogRootCls, {
        "!top-[0px]": isDrawerOpen === "open",
    });

    return (
        <ul className={cls}>
            <li className={`p-[10px] font-bold ${listItemCls}`}>Sort By</li>
            {SORT_KEYS_LIST.map((item: SortParam, idx: number) => (
                <li
                    className={`m-auto hover:bg-listModalHover ${listItemCls}`}
                    key={idx}
                >
                    <Button
                        className={btnCls}
                        onClick={() => {
                            handleSort(item);
                        }}
                    >
                        {item}
                    </Button>
                </li>
            ))}
        </ul>
    );
};

export default SortByDropdown;
