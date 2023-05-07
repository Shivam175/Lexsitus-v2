import { useCallback, useContext, useEffect, useState, type FC } from "react";
import { getCitationText, getHtmlString } from "./utils";
import HtmlDocument from "Components/HtmlDocument";
import { LibraryContext } from "Feature/Library/Context";
import {
    useCreateWindow,
    type WindowItemProps,
} from "Feature/Library/Tabs/Hooks/useCreateWindow";
import { useIntroHtmlString } from "Feature/Library/Tabs/Hooks/useIntroHtmlString";
import { useTree } from "Feature/Library/Tabs/Hooks/useTree";
import { rightButtonList } from "Feature/Library/Tabs/constants";
import ElementsOfCrimeModel from "Models/Tabs/ElementsOfCrime";
import { type ElementsCrimeItem } from "Models/Tabs/ElementsOfCrime/@types";
import { writeTextOnClipBoard } from "utils/clipboard";
import { logger } from "utils/logger";

const ElementsOfCrime: FC = () => {
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
        "elements-of-crime"
    );
    const [EOCItemData, setEOCItemData] = useState<ElementsCrimeItem>();
    useTree({});

    const getEOCItemData = useCallback(
        async (id: string) => {
            const data = await ElementsOfCrimeModel.getById(id);
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
            setEOCItemData(data);
        },
        [contentSlug, menuSlug]
    );

    const onActionHandler = (id: string) => {
        switch (id) {
            case "content_copy":
                writeTextOnClipBoard(getCitationText(EOCItemData?.header));
                break;
            case "library_add":
                addToReadingList(EOCItemData?.id ?? "", "elementsOfCrimes");
                break;
            default:
                break;
        }
    };

    const { updateWindow } = useCreateWindow({ onActionHandler });

    useEffect(() => {
        if (isCurrentDocValid && isReadingDrawerDoc)
            void getEOCItemData(currentDoc.docId).catch((err) => {
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

        if (((menuSlug && isDocTypeSearchParamValid) || contentSlug || isCurrentDocValid) && EOCItemData) {
            const windowBodyHtmlString = getHtmlString(
                EOCItemData?.footnotes,
                EOCItemData?.bodytext
            );
            const windowProps: WindowItemProps = {
                content: <HtmlDocument data={windowBodyHtmlString} />,
                windowHeading: EOCItemData.header,
                rightButtonList,
            };

            updateWindow({ ...windowProps });
        }
    }, [introHtmlString, EOCItemData]);

    useEffect(() => {
        try {
            if (menuSlug && isDocTypeSearchParamValid) void getEOCItemData(menuSlug);
            if (contentSlug || menuSlug === "content") void getEOCItemData(contentSlug);
        } catch (error: unknown) {
            logger.error(error);
        }
    }, [contentSlug, menuSlug]);

    return <></>;
};

export default ElementsOfCrime;
