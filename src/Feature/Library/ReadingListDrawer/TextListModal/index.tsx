import clsx from "clsx";
import React, { type FC } from "react";
import Button from "Components/Button";
import { type ReadingListDrawerState } from "Feature/Library/ReadingListDrawer/@types";
import { type BaseNote } from "Models/Note/@types";
import { type ReadingListBase } from "Models/ReadingList/@types";

export type ModalList = ReadingListBase[] | BaseNote[];

export interface TextListModalProps {
    list: ModalList;
    closeModal: () => void;
    onItemClick: (itemId: string) => void;
    isDrawerOpen?: ReadingListDrawerState;
    listType?: "List" | "Note";
}

const btnCls = "cursor-pointer text-grey1 hover:underline";

const rootCls = `absolute min-w-[200px] max-h-[300px] bg-white z-[800] py-[10px] px-[20px]
 my-[1px] rounded-[10px] leading-[24px] font-fontFamilyBlack text-[14.5px] bottom-full
 border-[1px] solid lxsGrey3`;

const TextListModal: FC<TextListModalProps> = ({
    list,
    closeModal,
    onItemClick,
    isDrawerOpen = "half-open",
    listType = "List",
}) => {
    const handleClick = (itemId: string) => {
        onItemClick(itemId);
        closeModal();
    };

    const listRoot = clsx(rootCls, {
        "!top-[30px] !bottom-auto": isDrawerOpen === "open",
        "!top-[35px] !left-[-100px] !bottom-auto": listType === "Note",
    });

    return (
        <ul className={listRoot}>
            <li>
                <Button
                    className={btnCls}
                    onClick={() => {
                        handleClick("new");
                    }}
                >
                    Create new {listType}
                </Button>
            </li>
            <li className="mt-[3px] h-[1px] bg-grey5" />
            {list.map((item: ReadingListBase, idx: number) => (
                <li key={idx}>
                    <Button
                        className={btnCls}
                        onClick={() => {
                            handleClick(item.id);
                        }}
                    >
                        {item.title}
                    </Button>
                </li>
            ))}
        </ul>
    );
};

export default TextListModal;
