import { useEffect, useState } from "react";
import useHandleAuthAction from "Feature/Library/Context/Hooks/useHandleAuthAction";
import ReadingListModel from "Models/ReadingList";
import { type AddToReadingListDocType } from "Models/ReadingList/@types";
import { logger } from "utils/logger";

export const useAddToReadingList = (listId: string | undefined) => {
    const handleAuthAction = useHandleAuthAction();
    const [docId, setDocId] = useState<string>();
    const [docType, setDocType] = useState<AddToReadingListDocType>();

    const addToReadingList = (
        docId: string,
        docType: AddToReadingListDocType
    ) => {
        setDocId(docId);
        setDocType(docType);
    };

    const handleAddToReadingList = async () => {
        if (docId && docType) {
            await handleAuthAction(async () =>
                ReadingListModel.addToReadingList(docType, docId, {
                    listId,
                })
            );
        }
    };

    useEffect(() => {
        if (docId && docType) {
            void handleAddToReadingList().catch((err) => {
                logger.error(err);
            });
        }
    }, [docId, docType]);

    return addToReadingList;
};
