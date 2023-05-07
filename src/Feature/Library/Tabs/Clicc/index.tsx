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
import CliccModel from "Models/Tabs/Clicc";
import { type CliccItem } from "Models/Tabs/Clicc/@types";
import { writeTextOnClipBoard } from "utils/clipboard";
import { logger } from "utils/logger";

const Clicc: FC = () => {
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

    const url = `${currentTab.path}/${menuSlug}/${contentSlug}`;
    const { introHtmlString } = useIntroHtmlString(
        currentLanguage,
        "commentary"
    );
    const [cliccItemData, setCliccItemData] = useState<CliccItem>();

    useTree({ titleText: "Clicc Commentary" });

    const getCliccItemData = useCallback(
        async (id: string) => {
            const data = await CliccModel.getById(id);
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
            setCliccItemData(data);
        },
        [contentSlug, menuSlug]
    );

    const onActionHandler = (id: string) => {
        switch (id) {
            case "content_copy":
                writeTextOnClipBoard(
                    getCitationText(
                        url,
                        cliccItemData?.author,
                        cliccItemData?.header
                    )
                );
                break;
            case "library_add":
                addToReadingList(cliccItemData?.id ?? "", "commentaries");
                break;
            default:
                break;
        }
    };

    const { updateWindow } = useCreateWindow({ onActionHandler });

    useEffect(() => {
        // Make request to get windowDocument only when
        // docID originates from ReadingListDrawer
        if (isCurrentDocValid && isReadingDrawerDoc)
            void getCliccItemData(currentDoc.docId).catch((err) => {
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

        if (((menuSlug && isDocTypeSearchParamValid) || isCurrentDocValid || contentSlug) && cliccItemData) {
            const windowBodyHtmlString = getHtmlString(
                currentLanguage,
                cliccItemData
            );
            const windowProps: WindowItemProps = {
                content: <HtmlDocument data={windowBodyHtmlString} />,
                windowHeading: cliccItemData.header,
                rightButtonList,
            };

            updateWindow({ ...windowProps });
        }
    }, [introHtmlString, cliccItemData]);

    useEffect(() => {
        try {
            if (menuSlug && isDocTypeSearchParamValid)
                void getCliccItemData(menuSlug);
            if (contentSlug || menuSlug === "content") void getCliccItemData(contentSlug);
        } catch (error: unknown) {
            logger.error(error);
        }
    }, [contentSlug, menuSlug]);

    return <></>;
};

export default Clicc;
