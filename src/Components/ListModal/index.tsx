import React, { type FC } from "react";
import styles from "./index.module.scss";
import Button from "Components/Button";

export interface ListItem {
    id: string;
    title: string;
}

export interface ListModalProps {
    list: ListItem[];
    listTitle?: string;
    onClickListItem: (id: string) => void;
}

const containerClass = `absolute block max-h-[300px] !w-[200px] list-none bg-white 
overflow-y-auto will-change-[width, height] z-900 text-[14.5px] text-black 
top-[119px]`;

const listItem = `py-[5px] px-[10px] text-grey1 text-[16px]
leading-[22px] block hover:bg-listModalHover cursor-pointer`;

const ListModal: FC<ListModalProps> = ({
    list,
    onClickListItem,
    listTitle,
}) => (
    <ul
        className={`${containerClass}
        ${styles.listContainer}`}
    >
        {listTitle ? (
            <li className="cursor-pointer font-bold p-[10px]">{listTitle}</li>
        ) : null}
        {list.map(({ id, title }, idx) => (
            <li className={listItem} key={idx}>
                <Button
                    className="text-black block w-[100%] text-left"
                    onClick={() => {
                        onClickListItem(id);
                    }}
                >
                    <div>{title}</div>
                </Button>
            </li>
        ))}
    </ul>
);

export default ListModal;
