 
import { useCallback, useContext } from "react";
import { LibraryContext } from "Feature/Library/Context";
import { DEFAULT_READING_LIST } from "Feature/Library/Context/constants";
import {
    type HandleDrawerStateProps,
    type SortParam,
} from "Feature/Library/ReadingListDrawer/@types";
import { sortList } from "Feature/Library/ReadingListDrawer/utils/sortUtils";
import { getCurrentReadingHistory, handleDrawerState } from "Feature/Library/ReadingListDrawer/utils/utils";
import { type ReadingHistoryItem } from "Models/ReadingHistory/@types";
import {
    type ReadingListItem,
} from "Models/ReadingList/@types";

export interface ReadingDrawerActionsProps {
    isHistoryVisible: boolean;
    setIsHistoryVisible: (value: boolean) => void;
    isListOpen: boolean;
    setIsListOpen: (value: boolean) => void;
    defaultHandleDrawerProps: HandleDrawerStateProps;
}

const useReadingDrawerActions = ({
    isHistoryVisible,
    setIsHistoryVisible,
    isListOpen,
    setIsListOpen,
    defaultHandleDrawerProps,
}: ReadingDrawerActionsProps) => {
    const {
        User,
        readingListMethods,
        handleAuthAction,
        currentReadingList = DEFAULT_READING_LIST,
        userHistoryList: userReadingHistory = [],
    } = useContext(LibraryContext);

    const {
        createReadingList,
        renameReadingList,
        setCurrentReadingListId,
        getAllReadingLists,
        getReadingHistory,
        setReadingList,
        setUserHistoryList,
    } = readingListMethods;

    const onTitleChange = useCallback(
        async (updatedTitle: string) => {
            if (User?.currentListId) {
                await renameReadingList({
                    readingListId: User?.currentListId,
                    newTitle: {
                        title: updatedTitle,
                    },
                });
            }
        },
        [User]
    );

    const showListOfReadingLists = useCallback(async () => {
        if (!isListOpen && User?.id) {
            const params = {
                filter: {
                    where: { userId: User?.id },
                    fields: ["title", "id"],
                },
            };
            const list = await getAllReadingLists(params);
            if (!list) return;
            setIsListOpen(true);
        }
    }, [User, isListOpen]);

    const changeCurrentList = useCallback(
        async (listId: string) => {
            if (listId === "new") await createReadingList(User?.id ?? "");
            else setCurrentReadingListId(listId);
        },
        [User]
    );

    const toggleHistory = async () => {
        let readingHistoryList: ReadingHistoryItem[] = [];
        if (!isHistoryVisible)
            readingHistoryList =
                (await getCurrentReadingHistory(User?.id ?? "", getReadingHistory)) ?? [];

        handleDrawerState({
            ...defaultHandleDrawerProps,
            actionType: "ListChange",
            isHistoryVisible: !isHistoryVisible,
            historyListLength: readingHistoryList.length,
        });
        setIsHistoryVisible(!isHistoryVisible);
    };

    const sortCurrentDrawerList = (sortParam: SortParam) => {
        if (isHistoryVisible)
            setUserHistoryList(sortList(sortParam, userReadingHistory));
        else
            setReadingList({
                ...currentReadingList,
                documents: sortList(
                    sortParam,
                    currentReadingList?.documents ?? []
                ) as ReadingListItem[],
            });
    };

    return {
        onTitleChange,
        showListOfReadingLists,
        changeCurrentList,
        toggleHistory,
        sortCurrentDrawerList,
        handleAuthAction,
    };
};

export default useReadingDrawerActions;
