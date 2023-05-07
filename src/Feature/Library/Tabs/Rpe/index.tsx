import { useCallback, useContext, useEffect, useState, type FC } from "react";
import { getCitationText, getHtmlString } from "./utils";
import HtmlDocument from "Components/HtmlDocument";
import { LibraryContext } from "Feature/Library/Context";
import { useCreateWindow, type WindowItemProps } from "Feature/Library/Tabs/Hooks/useCreateWindow";
import { useTree } from "Feature/Library/Tabs/Hooks/useTree";
import { rightButtonList } from "Feature/Library/Tabs/constants";
import CliccModel from "Models/Tabs/Clicc";
import { type CliccItem } from "Models/Tabs/Clicc/@types";
import { writeTextOnClipBoard } from "utils/clipboard";
import { logger } from "utils/logger";

const Rpe: FC = () => {
    const {
        currentTab,
        menuSlug,
        contentSlug,
        currentLanguage,
        addToReadingList,
    } = useContext(LibraryContext);

    const url = `${currentTab.path}/${menuSlug}/${contentSlug}`;
    const [rpeItemData, setRpeItemData] = useState<CliccItem>();

    useTree({ titleText: "Clicc Commentary", useParentSlug: false, useParentSlugForLeafNodes: false });

    const getRpeItemData = useCallback(async (id: string) => {
        const data = await CliccModel.findMenuIdBySlug(id);
        if (!data?.contentChildren) return;
        const rpeContentId = await CliccModel.getRpetId(data?.contentChildren);
        const RpeData = await CliccModel.getById(rpeContentId[0].id);
        setRpeItemData(RpeData);
    }, [contentSlug]);

    const onActionHandler = (id: string) => {
        switch (id) {
            case "content_copy":
                writeTextOnClipBoard(getCitationText(url, rpeItemData?.author, rpeItemData?.header));
                break;
            case "library_add":
                addToReadingList(rpeItemData?.id ?? "", "commentaries");
                break;
            default:
                break;
        }

    };

    const { updateWindow } = useCreateWindow({ onActionHandler });

    useEffect(() => {
        if (contentSlug && !rpeItemData) {
            updateWindow({ content: <></>, isDefaultWindowHeading: false });
        }

        if (contentSlug && rpeItemData) {
            const windowBodyHtmlString = getHtmlString(currentLanguage, rpeItemData);
            const windowProps: WindowItemProps = {
                content: <HtmlDocument data={windowBodyHtmlString} />,
                windowHeading: rpeItemData.header,
                rightButtonList,
            };


            updateWindow({ ...windowProps });

        }
    }, [rpeItemData]);

    useEffect(() => {
        try {
            if (contentSlug) void getRpeItemData(contentSlug);
        } catch (error: unknown) {
            logger.error(error);
        }
    }, [contentSlug]);

    return <></>;
};

export default Rpe;
