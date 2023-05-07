import { type SORT_KEYS_LIST } from "./constants";
import { type ReadingHistoryItem } from "Models/ReadingHistory/@types";
import { type ReadingListItem } from "Models/ReadingList/@types";

export type ReadingListDrawerState = "open" | "closed" | "half-open";

export type ReadingListDrawerDoc = ReadingHistoryItem | ReadingListItem;

export type SortParam = typeof SORT_KEYS_LIST[number];

export type DrawerAction = "BtnClick" | "ListChange";

export interface HandleDrawerStateProps {
    actionType: DrawerAction;
    isHistoryVisible: boolean;
    historyListLength: number;
    readingListLength: number;
    drawerState: ReadingListDrawerState;
    setDrawerState: (state: ReadingListDrawerState) => void;
}