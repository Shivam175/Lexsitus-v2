import { useState, useCallback } from "react";
import { useGetToaepPdfDocument } from "./useGetToaepPdfDocument";
import PdfDocument from "Components/PdfDocument";
import WindowItem, { type WindowProps } from "Components/WindowItem";
import { useAddToReadingList } from "Feature/Library/Tabs/Hooks/useAddToReadingList";
import {
    type ActionButton,
    usePaneActionsList,
} from "Feature/Library/Tabs/Hooks/usePaneActionsList";
import { getCitationText } from "Feature/Library/Tabs/PrepWorks/utils";
import { useStoreState } from "Stores";

export const useToaepWindow = () => {
    const { createActionList } = usePaneActionsList();
    const { pdfDocument } = useGetToaepPdfDocument();
    const [metaDataButtonClicked, setMetaDataButtonClick] =
        useState<boolean>(false);

    const { User } = useStoreState(({ UserStore: { User } }) => ({
        User,
    }));
    const addToReadingList = useAddToReadingList(User?.currentListId);

    const { title, metadata, id, pdfURL } = pdfDocument;

    const leftButtonsList: ActionButton[] = [
        {
            icon: "picture_as_pdf",
            onClick() {
                setMetaDataButtonClick(false);
            },
        },
        {
            icon: "description",
            onClick() {
                setMetaDataButtonClick(true);
            },
        },
    ];
    const rightButtonsList: ActionButton[] = [
        {
            icon: "content_copy",
            onClick() {
                getCitationText(metadata);
            },
        },
        {
            icon: "library_add",
            onClick() {
                addToReadingList(id, "toeapp-documents");
            },
        },
    ];

    const createWindow = useCallback(() => {
        if (!pdfURL || !metadata) return null;
        const windowProps: WindowProps = {
            leftButtonList: createActionList(leftButtonsList),
            rightButtonList: createActionList(rightButtonsList),
            headingTitle: title,
            paneHeaderClass: "color_caselaw1",
        };
        const window = (
            <WindowItem {...windowProps}>
                <PdfDocument
                    pdfUrl={pdfURL}
                    metadata={metadata}
                    isMetaData={metaDataButtonClicked}
                />
            </WindowItem>
        );

        return window;
    }, [metaDataButtonClicked, pdfURL, metadata]);

    return {
        createWindow,
    };
};
