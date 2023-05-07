import React, { useContext, useState, type FC } from "react";
import {
    type HandleDrawerStateProps,
    type ReadingListDrawerState,
} from "./@types";
import useGetReadingDrawerData, {
    type ReadingDrawerDataProps,
} from "./Hooks/useGetReadingDrawerData";
import useReadingDrawerActions, {
    type ReadingDrawerActionsProps,
} from "./Hooks/useReadingDrawerActions";
import SortByDropdown, { type SortByDropdownProps } from "./SortByDropdown";
import TextListModal, {
    type TextListModalProps,
} from "./TextListModal";
import { DrawerList, Modal } from "./helper";
import styles from "./index.module.scss";
import {
    getArrowIcon,
    handleDrawerState,
} from "./utils/utils";
import PaneHeader, { type PaneHeaderProps } from "Components/PaneHeader";
import { LibraryContext } from "Feature/Library/Context";
import { DEFAULT_READING_LIST } from "Feature/Library/Context/constants";
import { logger } from "utils/logger";

export interface ReadingListDrawerProps {
    drawerClassName?: string;
}

const ReadingListDrawer: FC<ReadingListDrawerProps> = ({
    drawerClassName = "",
}) => {
    const [drawerState, setDrawerState] =
        useState<ReadingListDrawerState>("closed");
    const [isListOpen, setIsListOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [isHistoryVisible, setIsHistoryVisible] = useState(false);

    const {
        listOfReadingLists,
        createActionList,
        currentReadingList = DEFAULT_READING_LIST,
        userHistoryList,
    } = useContext(LibraryContext);

    const userReadingHistory = userHistoryList ?? [];

    const currentDrawerList =
        (isHistoryVisible
            ? userReadingHistory
            : currentReadingList?.documents) ?? [];

    const defaultHandleDrawerProps: HandleDrawerStateProps = {
        actionType: "BtnClick",
        isHistoryVisible,
        historyListLength: userReadingHistory.length,
        readingListLength: (currentReadingList.documents ?? []).length,
        drawerState,
        setDrawerState,
    };

    const getDrawerDataProps: ReadingDrawerDataProps = {
        isHistoryVisible,
        defaultHandleDrawerProps,
    };

    useGetReadingDrawerData(getDrawerDataProps);

    const readingDrawerActionsProps: ReadingDrawerActionsProps = {
        ...getDrawerDataProps,
        setIsHistoryVisible,
        isListOpen,
        setIsListOpen,
    };

    const {
        onTitleChange,
        showListOfReadingLists,
        changeCurrentList,
        toggleHistory,
        sortCurrentDrawerList,
        handleAuthAction,
    } = useReadingDrawerActions(readingDrawerActionsProps);

    const headerProps: PaneHeaderProps = {
        leftButtonList: createActionList([
            {
                icon: "folder_open",
                iconClass: "text-lxsGrey4",
                onClick() {
                    handleAuthAction(showListOfReadingLists).catch((err) => {
                        logger.error(err);
                    });
                },
            },
            {
                icon: "history",
                iconClass: "text-lxsGrey4",
                onClick() {
                    handleAuthAction(toggleHistory).catch((err) => {
                        logger.error(err);
                    });
                },
            },
        ]),
        rightButtonList: createActionList([
            {
                icon: "sort",
                iconClass: "text-lxsGrey4",
                onClick() {
                    setIsSortOpen(true);
                },
            },
            {
                icon: getArrowIcon(drawerState),
                iconClass: "text-lxsGrey4",
                onClick() {
                    handleDrawerState({
                        ...defaultHandleDrawerProps,
                        actionType: "BtnClick",
                    });
                },
            },
        ]),
        titleText: currentReadingList.title,
        onTitleChange,
        titleIsEditable: true,
    };

    const readingListProps: TextListModalProps = {
        list: listOfReadingLists,
        closeModal() {
            setIsListOpen(false);
        },
        onItemClick: changeCurrentList,
        isDrawerOpen: drawerState,
    };

    const sortListProps: SortByDropdownProps = {
        closeDialog() {
            setIsSortOpen(false);
        },
        sortByKey: sortCurrentDrawerList,
        isDrawerOpen: drawerState,
    };

    return (
        <span className={`${styles.listDrawerRoot} ${drawerClassName}`}>
            <div className={`readingListRoot ${drawerState}`}>
                <Modal isOpen={isListOpen} onClose={() => {
                    setIsListOpen(false); 
                }}>
                    <TextListModal {...readingListProps} />
                </Modal>

                <Modal isOpen={isSortOpen} onClose={() => {
                    setIsSortOpen(false); 
                }}>
                    <SortByDropdown {...sortListProps} />
                </Modal>

                <PaneHeader {...headerProps} />
                <DrawerList list={currentDrawerList} />
            </div>
        </span>
    );
};

export default ReadingListDrawer;
