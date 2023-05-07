import { useCallback, useContext, useEffect, useState, type FC } from "react";
import json from "./mop-decisions.json";
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
import MeansOfProofModel from "Models/Tabs/MeansOfProof";
import { type MeansOfProofDigest } from "Models/Tabs/MeansOfProof/@types";
import { writeTextOnClipBoard } from "utils/clipboard";
import { logger } from "utils/logger";

const MeansOfProof: FC = () => {
    const {
        menuSlug,
        contentSlug,
        currentLanguage,
        addToReadingList,
        currentTab,
    } = useContext(LibraryContext);

    const currentUrl = `/${currentTab.path}/${menuSlug}/${contentSlug}`;
    const { showAppDialog } = useContext(AppDialogContext);
    const { introHtmlString } = useIntroHtmlString(
        currentLanguage,
        "means-proof-digest"
    );
    const [MOPItemData, setMOPItemData] = useState<MeansOfProofDigest>();

    const onMenuTreePaneHandler = (id: string) => {
        if (id === "digest-decision") {
            showAppDialog(<DecisionsDialog json={json} />);
        }
    };

    useTree({
        onMenuTreePaneHandler,
        rightButtonList: TreePaneHeaderRightButtonList,
    });

    const getMopdItemData = useCallback(
        async (id: string) => {
            const data = await MeansOfProofModel.findById(id);
            if (!data?.id) return;
            setMOPItemData(data);
        },
        [contentSlug]
    );

    const onActionHandler = (id: string) => {
        switch (id) {
            case "content_copy":
                writeTextOnClipBoard(getCitationText(currentUrl));
                break;
            case "library_add":
                addToReadingList(MOPItemData?.id ?? "", "means-proof-digest");
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

        if (contentSlug && MOPItemData) {
            const windowBodyHtmlString = getHtmlString(MOPItemData?.sections);
            const windowProps: WindowItemProps = {
                content: <HtmlDocument data={windowBodyHtmlString} />,
                windowHeading: MOPItemData?.title,
                rightButtonList,
            };

            updateWindow({ ...windowProps });
        }
    }, [introHtmlString, MOPItemData]);

    useEffect(() => {
        try {
            if (contentSlug || menuSlug === "content") void getMopdItemData(contentSlug);
        } catch (error: unknown) {
            logger.error(error);
        }
    }, [contentSlug]);

    return <></>;
};

export default MeansOfProof;
