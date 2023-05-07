import { useContext, useEffect, useState, type FC, useCallback } from "react";
import { getCitationText } from "./utils";
import HtmlDocument from "Components/HtmlDocument";
import PdfDocument from "Components/PdfDocument";
import { LibraryContext } from "Feature/Library/Context";
import {
    type WindowItemProps,
    useCreateWindow,
} from "Feature/Library/Tabs/Hooks/useCreateWindow";
import { useIntroHtmlString } from "Feature/Library/Tabs/Hooks/useIntroHtmlString";
import { useTree } from "Feature/Library/Tabs/Hooks/useTree";
import {
    leftButtonList,
    rightButtonList,
} from "Feature/Library/Tabs/constants";
import PrepWorksModel from "Models/Tabs/PrepWorks";
import { type PrepWorksData } from "Models/Tabs/PrepWorks/@types";
import { writeTextOnClipBoard } from "utils/clipboard";
import { logger } from "utils/logger";

const PrepWorks: FC = () => {
    const {
        currentTab,
        menuSlug,
        contentSlug,
        currentLanguage,
        addToReadingList,
        isDocTypeSearchParamValid,
        setTabPopulatedNode,
        currentDoc,
        setCurrentDoc,
        isCurrentDocValid,
        isReadingDrawerDoc,
    } = useContext(LibraryContext);
    const { introHtmlString } = useIntroHtmlString(
        currentLanguage,
        "preparatory-works"
    );
    const [PrepWorksItem, setPrepWorksItem] = useState<PrepWorksData>();
    const [isMetaDataVisible, setIsMetaDataVisible] = useState<boolean>(false);
    useTree({ isShallowTree: true });

    const getPdfData = useCallback(
        async (id: string) => {
            const data = await PrepWorksModel.getById(id);
            if (!data?.id) return;
            if (isDocTypeSearchParamValid) setTabPopulatedNode({
                id: data.menuItemId[0],
                docType: currentTab.docType
            });
            setCurrentDoc({
                docType: currentTab.docType,
                docId: data?.id,
                origin: "PathSlug",
            });
            setPrepWorksItem(data);
        },
        [contentSlug, menuSlug]
    );

    const onActionHandler = (id: string) => {
        switch (id) {
            case "content_copy":
                writeTextOnClipBoard(getCitationText(PrepWorksItem?.metadata));
                break;
            case "library_add":
                addToReadingList(PrepWorksItem?.id ?? "", "preparatoryWorks");
                break;
            case "pdf":
                setIsMetaDataVisible(false);
                break;
            case "description":
                setIsMetaDataVisible(true);
                break;
            default:
                break;
        }
    };

    const { updateWindow } = useCreateWindow({ onActionHandler });

    useEffect(() => {
        if (isCurrentDocValid && isReadingDrawerDoc)
            void getPdfData(currentDoc.docId).catch((err) => {
                logger.error(err);
            });
    }, [currentDoc]);

    useEffect(() => {
        if (!menuSlug && !isCurrentDocValid) {
            const windowProps: WindowItemProps = {
                content: <HtmlDocument data={introHtmlString} />,
            };
            updateWindow({ ...windowProps });
        }

        if (((menuSlug && isDocTypeSearchParamValid) || contentSlug || isCurrentDocValid) && PrepWorksItem) {
            const windowProps: WindowItemProps = {
                content: (
                    <PdfDocument
                        pdfUrl={PrepWorksItem.pdfURL}
                        metadata={PrepWorksItem.metadata}
                        isMetaData={isMetaDataVisible}
                    />
                ),
                windowHeading: PrepWorksItem.title,
                leftButtonList,
                rightButtonList,
            };

            updateWindow({ ...windowProps });
        }
    }, [introHtmlString, isMetaDataVisible, PrepWorksItem, currentLanguage]);

    useEffect(() => {
        try {
            if (menuSlug && isDocTypeSearchParamValid) void getPdfData(menuSlug);
            if (contentSlug || menuSlug === "content") void getPdfData(contentSlug);
        } catch (error: unknown) {
            logger.error(error);
        }
    }, [contentSlug, menuSlug]);

    return <></>;
};

export default PrepWorks;
