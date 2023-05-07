import { type FC } from "react";
import {
    type ReadingListTableColumn,
    type ReadingListTableElementProperties,
} from "./@types";
import { useReadingListActions } from "./Hooks/useReadingListActions";
import { MODAL_TITLE, TABLE_COLUMN_LIST } from "./constants";
import { type ListItem } from "Components/ListModal";
import Table, { type TableProps } from "Feature/Table";
import { type User } from "Models/Users/@types";
import { useGetAllReadingLists } from "Screens/ReadingLists/useGetAllReadingLists";

export interface ListContentProps {
    currentListTitle: string;
    user: User | undefined;
}

const ListContent: FC<ListContentProps> = ({ currentListTitle, user }) => {
    const userId = user?.id ?? "";
    const { readingList, slug, handleReadingActions, handleSortList } =
        useReadingListActions(userId);

    const listOfReadingLists = useGetAllReadingLists(userId);
    const filteredList = listOfReadingLists.filter((doc) => doc.id !== slug);

    const tableProps: TableProps<
    ReadingListTableColumn,
    ReadingListTableElementProperties
    > = {
        heading: currentListTitle,
        columnList: TABLE_COLUMN_LIST,
        rowList: readingList,
        sortByField: handleSortList,
        actionHandler: handleReadingActions,
        modalList: filteredList as ListItem[],
        modalTitle: MODAL_TITLE,
    };

    return <Table {...tableProps} />;
};

export default ListContent;
