import { type SortIcon, type SortOrder } from "./@types";

export const arrowUp = "keyboard_arrow_up";
export const arrowDown = "keyboard_arrow_down";

export const sortOrderMapping: Record<SortIcon, SortOrder> = {
    keyboard_arrow_up: "ascending",
    keyboard_arrow_down: "descending",
};

export const containerClass = `w-[100%] bg-white h-[var(--readingListTableTitleBarHeight)]
leading-[var(--readingListTableTitleBarHeight)] font-bold
border-y-[1px] border-solid border-lxsGrey3 flex`;

export const btnClass = `text-grey1 h-[var(--readingListTableTitleBarHeight)]
leading-[var(--readingListTableTitleBarHeight)]
border-0 border-r-[1px] border-r-lxsGrey4 border-solid text-[14.5px] px-[10px]
hover:cursor-pointer hover:bg-grey7 text-left font-fontFamilyBlack`;

export const iconClass = `material-icons inline h-[var(--readingListTableTitleBarHeight)]
 leading-[var(--readingListTableTitleBarHeight)] left-[12px]
 relative float-right`;
