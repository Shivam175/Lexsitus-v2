import { type PropsWithChildren, type FC } from "react";
import ClickAwayListener from "react-click-away-listener";
import { type ReadingListDrawerDoc } from "./@types";
import ReadingListItem, { type ReadingListItemProps } from "./ReadingListItem";
import styles from "./index.module.scss";
import { getListItemProps } from "./utils/utils";
import { type ReadingHistoryItem } from "Models/ReadingHistory/@types";

export const Modal: FC<
PropsWithChildren & { isOpen: boolean; onClose: () => void }
> = ({ isOpen, onClose, children }) => (
    <>
        {isOpen ? (
            <ClickAwayListener onClickAway={onClose}>
                <div>{children}</div>
            </ClickAwayListener>
        ) : null}
    </>
);

export const DrawerList: FC<
PropsWithChildren & { list: ReadingHistoryItem[] }
> = ({ list }) => (
    <ul className="currentList">
        {list.map((item: ReadingListDrawerDoc, idx: number) => {
            const props = getListItemProps(item);
            const ListItemProps: ReadingListItemProps = {
                ...props,
                iconContainerClass: styles.iconContainer,
            };
            return (
                <li className="currentListItem" key={idx}>
                    <ReadingListItem {...ListItemProps} />
                </li>
            );
        })}
    </ul>
);
