/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useCallback, useContext, useEffect, useState, type FC } from "react";
import { getCitationText, getResourceNotFoundMsg } from "./utils";
import HtmlDocument from "Components/HtmlDocument";
import PdfDocument from "Components/PdfDocument";
import { LibraryContext } from "Feature/Library/Context";
import {
    useCreateWindow,
    type WindowItemProps,
} from "Feature/Library/Tabs/Hooks/useCreateWindow";
import { useIntroHtmlString } from "Feature/Library/Tabs/Hooks/useIntroHtmlString";
import { useTree } from "Feature/Library/Tabs/Hooks/useTree";
import {
    leftButtonList,
    rightButtonList,
} from "Feature/Library/Tabs/constants";
import CaseLawModel from "Models/Tabs/CaseLaw";
import { type CaseLawItem } from "Models/Tabs/CaseLaw/@types";
import { writeTextOnClipBoard } from "utils/clipboard";
import { logger } from "utils/logger";

const CaseLaw: FC = () => {
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
    const [isCaseLawNotFound, setIsCaseLawNotFound] = useState<boolean>(false);
    let { introHtmlString } = useIntroHtmlString(currentLanguage, "case-law");
    const [caseLawData, setCaseLawData] = useState<CaseLawItem>();
    const [isMetaDataVisible, setIsMetaDataVisible] = useState<boolean>(false);
    useTree({});

    const getPdfData = useCallback(
        async (id: string) => {
            const data = await CaseLawModel.getById(id).catch(
                (err: unknown) => {
                    logger.error(err);
                    const { message } = err as Error;
                    if (message === "Request failed with status code 404")
                        setIsCaseLawNotFound(true);
                }
            );
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
            setCaseLawData(data);
            setIsCaseLawNotFound(false);
        },
        [contentSlug, menuSlug]
    );

    const onActionHandler = (id: string) => {
        switch (id) {
            case "content_copy":
                writeTextOnClipBoard(
                    getCitationText(caseLawData?.metadata, caseLawData?.title)
                );
                break;
            case "library_add":
                addToReadingList(caseLawData?.id ?? "", "caseLaws");
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
        try {
            if (contentSlug || menuSlug === "content") void getPdfData(contentSlug);
        } catch (error: unknown) {
            logger.error(error);
        }
    }, [contentSlug, menuSlug]);

    useEffect(() => {
        if (((!menuSlug && !isCurrentDocValid) || isCaseLawNotFound)) {
            if (isCaseLawNotFound) introHtmlString = getResourceNotFoundMsg();
            const windowProps: WindowItemProps = {
                content: <HtmlDocument data={introHtmlString} />,
            };
            updateWindow({ ...windowProps });
        }

        if (
            ((menuSlug && isDocTypeSearchParamValid) || isCurrentDocValid || contentSlug) &&
            caseLawData &&
            !isCaseLawNotFound
        ) {
            const windowProps: WindowItemProps = {
                content: (
                    <PdfDocument
                        pdfUrl={caseLawData.pdfURL}
                        metadata={caseLawData.metadata}
                        isMetaData={isMetaDataVisible}
                    />
                ),
                windowHeading: caseLawData.title,
                leftButtonList: isCaseLawNotFound ? [] : leftButtonList,
                rightButtonList: isCaseLawNotFound ? [] : rightButtonList,
            };

            updateWindow({ ...windowProps });
        }
    }, [
        isMetaDataVisible,
        contentSlug,
        currentLanguage,
        introHtmlString,
        caseLawData,
        isCaseLawNotFound,
    ]);

    useEffect(() => {
        try {
            if (menuSlug && isDocTypeSearchParamValid)
                void getPdfData(menuSlug);
            if (contentSlug) void getPdfData(contentSlug);
        } catch (error: unknown) {
            logger.error(error);
        }
    }, [contentSlug, menuSlug]);

    return <></>;
};

export default CaseLaw;
