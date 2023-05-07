import { type FC } from "react";
import styles from "./index.module.scss";
import Typography from "Components/Typography";
import { ReadingListIcon } from "Feature/Library/ReadingListDrawer/ReadingListItem";
import { type DocumentType } from "Models/ReadingList/@types";

export interface ReadingDocIconProps {
    docType: DocumentType;
    docName: string;
    iconClass?: string;
}

const ReadingDocIcon: FC<ReadingDocIconProps> = ({
    docName,
    docType,
    iconClass = "",
}) => (
    <div className="flex">
        <ReadingListIcon
            iconClass={`${iconClass} !w-[38px] !h-[36px] grow float-left`}
            itemType={docType}
            iconContainerClass={styles.iconContainer}
        />
        <Typography
            variant="h6"
            className={"grow relative top-[7px] left-[5px] text-[14px]"}
        >
            {docName}
        </Typography>
    </div>
);

export default ReadingDocIcon;
