import { useCallback, useContext, useEffect, useState, type FC } from "react";
import json from "./eoc-decisions.json";
import { getCitationText, getHtmlString } from "./utils";
import DecisionsDialog from "Components/DecisionsDialog";
import HtmlDocument from "Components/HtmlDocument";
import { AppDialogContext } from "Context/AppDialog";
import { LibraryContext } from "Feature/Library/Context";
import { useCreateWindow, type WindowItemProps } from "Feature/Library/Tabs/Hooks/useCreateWindow";
import { useIntroHtmlString } from "Feature/Library/Tabs/Hooks/useIntroHtmlString";
import { useTree } from "Feature/Library/Tabs/Hooks/useTree";
import {
    rightButtonList,
    TreePaneHeaderRightButtonList,
} from "Feature/Library/Tabs/constants";
import ElementsDigestModel from "Models/Tabs/ElementsDigest";
import { type ElementDigestItem } from "Models/Tabs/ElementsDigest/@types";
import { writeTextOnClipBoard } from "utils/clipboard";
import { logger } from "utils/logger";

const ElementsDigest: FC = () => {
    const {
        currentTab,
        menuSlug,
        contentSlug,
        currentLanguage,
        addToReadingList,
    } = useContext(LibraryContext);

    const url = `${currentTab.path}/${menuSlug}/${contentSlug}`;
    const { showAppDialog } = useContext(AppDialogContext);
    const { introHtmlString } = useIntroHtmlString(
        currentLanguage,
        "elements-crime-digest"
    );
    const [EODItemData, setEODItemData] = useState<ElementDigestItem>();

    const onMenuTreePaneHandler = (id: string) => {
        if (id === "digest-decision") {
            showAppDialog(<DecisionsDialog json={json} />);
        }
    };

    useTree({
        onMenuTreePaneHandler,
        rightButtonList: TreePaneHeaderRightButtonList,
    });

    const getEODItemData = useCallback(
        async (id: string) => {
            const data = await ElementsDigestModel.findById(id);
            if (!data?.id) return;
            setEODItemData(data);
        },
        [contentSlug]
    );

    const onActionHandler = (id: string) => {
        switch (id) {
            case "content_copy":
                writeTextOnClipBoard(getCitationText(url));
                break;
            case "library_add":
                addToReadingList(
                    EODItemData?.id ?? "",
                    "elements-crime-digest"
                );
                break;
            default:
                break;
        }
    };

    const { updateWindow } = useCreateWindow({ onActionHandler });

    useEffect(() => {
        if (!menuSlug) {
            const windowProps: WindowItemProps = {
                content: <HtmlDocument data={introHtmlString} />,
            };
            updateWindow({ ...windowProps });
        }

        if (contentSlug && EODItemData) {
            const windowBodyHtmlString = getHtmlString(EODItemData?.sections);
            const windowProps: WindowItemProps = {
                content: <HtmlDocument data={windowBodyHtmlString} />,
                windowHeading: EODItemData.title,
                rightButtonList,
            };

            updateWindow({ ...windowProps });
        }
    }, [introHtmlString, EODItemData]);

    useEffect(() => {
        try {
            if (contentSlug || menuSlug === "content") void getEODItemData(contentSlug);
        } catch (error: unknown) {
            logger.error(error);
        }
    }, [contentSlug, menuSlug]);

    return <></>;
};

export default ElementsDigest;
