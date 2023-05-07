import { useCallback, useEffect, useState } from "react";
import ReadingListModel from "Models/ReadingList";
import { type ReadingListBase } from "Models/ReadingList/@types";
import { logger } from "utils/logger";

export const useGetAllReadingLists = (userId: string) => {
    const [listOfReadingLists, setListOfReadingLists] = useState<
    ReadingListBase[]
    >([]);

    const getListOfReadingLists = useCallback(
        async (userId: string) => {
            const params = { filter: { where: { userId } } };
            const list = await ReadingListModel.getAllReadingLists(params);
            if (!list) return;
            setListOfReadingLists(list);
        },
        [userId]
    );

    useEffect(() => {
        if (userId)
            getListOfReadingLists(userId).catch((err) => {
                logger.error(err);
            });
    }, [userId]);

    return listOfReadingLists;
};
