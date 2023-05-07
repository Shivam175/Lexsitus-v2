import { useContext, useEffect } from "react";
import { LibraryContext } from "Feature/Library/Context";
import {
    type DrawerAction,
    type HandleDrawerStateProps,
} from "Feature/Library/ReadingListDrawer/@types";
import { GET_READING_LIST_PARAMS } from "Feature/Library/ReadingListDrawer/constants";
import {
    handleDrawerState,
    getCurrentReadingHistory,
} from "Feature/Library/ReadingListDrawer/utils/utils";
import { logger } from "utils/logger";

export interface ReadingDrawerDataProps {
    isHistoryVisible: boolean;
    defaultHandleDrawerProps: HandleDrawerStateProps;
}

const useGetReadingDrawerData = ({
    isHistoryVisible,
    defaultHandleDrawerProps,
}: ReadingDrawerDataProps) => {
    const { User, readingListMethods, latestHistoryDocId } =
        useContext(LibraryContext);

    const { getReadingList, getReadingHistory } = readingListMethods;

    const handleGetReadingHistory = () => {
        if (User) {
            getCurrentReadingHistory(User?.id ?? "", getReadingHistory).catch(
                (err) => {
                    logger.error(err);
                }
            );
        }
    };

    const getCurrentReadingList = async (id: string) => {
        const getListParams = {
            readingListId: id,
            ...GET_READING_LIST_PARAMS,
        };

        const currentList = await getReadingList(getListParams);
        if (!currentList) return;

        handleDrawerState({
            ...defaultHandleDrawerProps,
            actionType: "ListChange" as DrawerAction,
            readingListLength: currentList.documents?.length ?? 0,
        });
    };

    useEffect(() => {
        if (isHistoryVisible && latestHistoryDocId) handleGetReadingHistory();
    }, [latestHistoryDocId]);

    useEffect(() => {
        if (User?.currentListId) {
            getCurrentReadingList(User?.currentListId).catch((err) => {
                logger.error(err);
            });
        }
    }, [User?.currentListId ?? ""]);

};

export default useGetReadingDrawerData;
