import { getReadingDocPath } from "./readingDocUtils";
import {
    type HandleDrawerStateProps,
    type ReadingListDrawerState,
} from "Feature/Library/ReadingListDrawer/@types";
import { GET_USER_HISTORY_PARAMS } from "Feature/Library/ReadingListDrawer/constants";
import { type ReadingHistoryItem } from "Models/ReadingHistory/@types";
import { type RequestParams, type ReadingListItem } from "Models/ReadingList/@types";

export const getArrowIcon = (drawerState: ReadingListDrawerState) => {
    if (drawerState === "open") return "keyboard_arrow_down";
    return "keyboard_arrow_up";
};

export const handleDrawerState = ({
    actionType,
    isHistoryVisible,
    historyListLength,
    readingListLength,
    drawerState,
    setDrawerState,
}: HandleDrawerStateProps) => {
    let listLength = readingListLength;
    if (isHistoryVisible) listLength = historyListLength;
    if (actionType === "BtnClick") {
        let notFullOpenState: ReadingListDrawerState = "closed";
        if (listLength > 0) notFullOpenState = "half-open";
        if (drawerState === "open") setDrawerState(notFullOpenState);
        if (drawerState !== "open") setDrawerState("open");
    } else {
        if (drawerState === "closed" && listLength > 0)
            setDrawerState("half-open");
        if (drawerState !== "closed" && listLength === 0)
            setDrawerState("closed");
    }
};

export const getListItemProps = (
    item: ReadingListItem | ReadingHistoryItem
) => {
    const itemName = item.document?.title ?? item.document?.header ?? "";
    const itemType = item?.docType ?? item?.content;
    const { docId } = item;
    return {
        itemName,
        docId,
        itemType,
        link: getReadingDocPath(item as ReadingListItem),
    };
};

export const getCurrentReadingHistory = async (
    userId: string,
    getReadingHistory: (
        params: RequestParams
    ) => Promise<ReadingHistoryItem[] | undefined>
) => {
    const params = {
        filter: {
            ...GET_USER_HISTORY_PARAMS,
            where: { userId },
        },
    };
    const readingHistoryList = await getReadingHistory(params);
    if (!readingHistoryList) return;
    return readingHistoryList;
};