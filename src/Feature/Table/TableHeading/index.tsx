import React, { type FC } from "react";
import Typography from "Components/Typography";

export interface TableHeadingProps {
    heading: string;
}

const TableHeading: FC<TableHeadingProps> = ({ heading }) => (
    <div className="h-[var(--readingListTableHeaderHeight)] 
    bg-white leading-[var(--readingListTableHeaderHeight)] px-[20px]">
        <Typography
            variant="h3"
            className="text-purple inline-block leading-[1.1]"
        >
            {heading}
        </Typography>
    </div>
);

export default TableHeading;
