import React, { type FC } from "react";
import { READING_LIST_ICON_MAPPING } from "./constants";
import styles from "./index.module.scss";
import { type IAvailableIcon } from "Components/Icons/@types";
import IconsWithText from "Components/IconsWithText";
import Link from "Components/Link";
import Typography from "Components/Typography";
import { type LibraryDocument } from "Feature/Library/Context/@types";
import { type DocumentType } from "Models/ReadingList/@types";

export interface ReadingItemContentProps {
    itemName: string;
    itemType: DocumentType;
    docId: string;
    setCurrentDoc?: (item: LibraryDocument) => void;
    iconContainerClass?: string;
}

export interface ReadingListItemProps extends ReadingItemContentProps {
    link?: string;
}

export interface ReadingListIconProps
    extends Pick<ReadingListItemProps, "itemType" | "iconContainerClass"> {
    iconClass?: string;
}

export const ReadingListIcon: FC<ReadingListIconProps> = ({
    itemType,
    iconClass = "",
    iconContainerClass = "",
}) => {
    const iconClassName = READING_LIST_ICON_MAPPING[itemType]?.className;
    const iconName = READING_LIST_ICON_MAPPING[itemType]
        ?.iconName as IAvailableIcon;
    return (
        <span
            className={`${styles.readingListIconContainer} ${iconContainerClass}`}
        >
            <IconsWithText
                icon={iconName}
                className={`${iconClass} ${iconClassName} ${itemType}`}
            />
        </span>
    );
};

export const ReadingItemContent: FC<ReadingItemContentProps> = ({
    itemName,
    itemType,
    docId,
    setCurrentDoc,
    iconContainerClass = "",
}) => (
    <div
        className={styles.readingListItemRoot}
        title={itemName}
        onClick={() => {
            setCurrentDoc?.({
                docId,
                docType: itemType,
                origin: "ReadingDrawer",
            });
        }}
    >
        <ReadingListIcon
            iconClass={styles.itemIcon}
            itemType={itemType}
            iconContainerClass={iconContainerClass}
        />
        <Typography className={styles.itemLabel}>{itemName}</Typography>
    </div>
);

const ReadingListItem: FC<ReadingListItemProps> = ({ link, ...props }) => (
    <>
        {link ? (
            <Link to={link}>
                <ReadingItemContent {...props} />
            </Link>
        ) : (
            <ReadingItemContent {...props} />
        )}
    </>
);

export default ReadingListItem;
