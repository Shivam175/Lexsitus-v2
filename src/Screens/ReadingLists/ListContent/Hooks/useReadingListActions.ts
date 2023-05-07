import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { type ActionHandlerArgs } from "Feature/Table/TableBody/BodyContent/DataRow/RowActionsList/@types";
import { type SortOrder } from "Feature/Table/TableBody/TitleRow/@types";
import useMessageDialog from "Hooks/useMessageDialog";
import {
    type ReadingListTableColumn,
    type ReadingListTableRow,
} from "Screens/ReadingLists/ListContent/@types";
import { readingListActionHandler } from "Screens/ReadingLists/ListContent/utils/actionUtils";
import { getReadingList } from "Screens/ReadingLists/ListContent/utils/getReadingList";
import { sortListHandler } from "Screens/ReadingLists/ListContent/utils/sortUtils";
import { logger } from "utils/logger";

export const useReadingListActions = (userId: string) => {
    const [readingList, setReadingList] = useState<ReadingListTableRow[]>([]);
    const { showMessageDialog } = useMessageDialog();
    const { slug } = useParams();

    const handleGetReadingList = async (userId: string) => {
        const list = await getReadingList(userId, slug ?? "");
        if (!list) return;
        setReadingList(list);
    };

    const handleReadingActions = ({ ...args }: ActionHandlerArgs) => {
        readingListActionHandler({
            ...args,
            userId,
            slug: slug ?? "",
            showMessageDialog,
            getReadingList: handleGetReadingList,
        });
    };

    const handleSortList = (key: ReadingListTableColumn, order: SortOrder) => {
        setReadingList(sortListHandler(key, order, readingList, slug ?? ""));
    };

    useEffect(() => {
        if (userId && slug)
            handleGetReadingList(userId).catch((err) => {
                logger.error(err);
            });
    }, [slug]);

    return {
        readingList,
        slug,
        getReadingList: handleGetReadingList,
        handleReadingActions,
        handleSortList,
    };
};
