import { useCallback, useContext, useEffect, useState, type FC } from "react";
import LecturePlayerDocument from "./LectureDocument/LecturePlayerDocument";
import { getCitationText } from "./utils";
import HtmlDocument from "Components/HtmlDocument";
import { LibraryContext } from "Feature/Library/Context";
import {
    useCreateWindow,
    type WindowItemProps,
} from "Feature/Library/Tabs/Hooks/useCreateWindow";
import { useIntroHtmlString } from "Feature/Library/Tabs/Hooks/useIntroHtmlString";
import { useTree } from "Feature/Library/Tabs/Hooks/useTree";
import LectureListDocument, {
    type Lecture,
} from "Feature/Library/Tabs/Lectures/LectureDocument/LectureListDocument";
import { rightButtonList } from "Feature/Library/Tabs/constants";
import MenuItem from "Models/MenuItem";
import LecturesModel from "Models/Tabs/Lectures";
import { type LectureVideo } from "Models/Tabs/Lectures/@types";
import { writeTextOnClipBoard } from "utils/clipboard";
import { logger } from "utils/logger";

const Lectures: FC = () => {
    const {
        currentTab,
        menuSlug,
        contentSlug,
        currentLanguage,
        addToReadingList,
        docTypeSearchParam,
        isDocTypeSearchParamValid,
        currentDoc,
        setCurrentDoc,
        isCurrentDocValid,
        isReadingDrawerDoc,
    } = useContext(LibraryContext);

    const url = `${currentTab.path}/${menuSlug}/${contentSlug}`;
    const { introHtmlString } = useIntroHtmlString(currentLanguage, "videos");
    const [LectureItemData, setLectureItemData] = useState<LectureVideo[]>();
    const [currentVideo, setCurrentVideo] = useState<Lecture>();
    const [isIntroHtmlVisible, setIsIntroHtmlVisible] =
        useState<boolean>(false);
    const [isSingleVideoVisible, setIsSingleVideoVisible] =
        useState<boolean>(false);
    useTree({ useParentSlug: false });

    const getLectureItemData = useCallback(
        async (id: string) => {
            const data = await MenuItem.getMenuItem(id);
            if (!data?.id) return;
            const videoListData = await LecturesModel.getVideoList(data.id);
            setLectureItemData(videoListData);
            setIsSingleVideoVisible(false);
        },
        [menuSlug]
    );

    const getCurrentVideo = useCallback(
        async (contentSlug: string) => {
            if (menuSlug === "content") {
                const videoData = await LecturesModel.getVideo(contentSlug);
                if (!videoData) return;
                const { video, metadata, id, item_slug, header } = videoData;
                setCurrentVideo({
                    id,
                    video,
                    item_slug,
                    header,
                    metadata,
                });
                setCurrentVideo(videoData);
            }

            const video = LectureItemData?.find(
                (video) => video.item_slug === contentSlug
            );
            if (!video) return;
            setCurrentVideo(video);
        },
        [contentSlug, menuSlug]
    );

    const getSingleVideo = useCallback(
        async (docId: string) => {
            const data = await LecturesModel.getVideo(docId);
            if (!data?.id) return;
            const { video, metadata, id, item_slug, header } = data;
            setCurrentVideo({
                id,
                video,
                item_slug,
                header,
                metadata,
            });
            setIsSingleVideoVisible(true);
        },
        [menuSlug]
    );

    useEffect(() => {
        // Update currentDoc when currentVideo is shown
        // wheter using getSingleVideo or getCurrentVideo
        if (currentVideo)
            setCurrentDoc({
                docId: currentVideo.id ?? "",
                docType: currentTab.docType,
                origin: "PathSlug",
            });
    }, [currentVideo]);

    useEffect(() => {
        // Make request to get windowDocument only when
        // docID originates from ReadingListDrawer
        if (isCurrentDocValid && isReadingDrawerDoc) {
            void getSingleVideo(currentDoc.docId).catch((err) => {
                logger.error(err);
            });
        }
    }, [currentDoc]);

    const onActionHandler = (id: string) => {
        switch (id) {
            case "content_copy":
                writeTextOnClipBoard(
                    getCitationText(url, currentVideo?.metadata)
                );
                break;
            case "library_add":
                addToReadingList(currentVideo?.id ?? "", "videos");
                break;
            default:
                break;
        }
    };

    const { updateWindow } = useCreateWindow({ onActionHandler });

    useEffect(() => {
        if (menuSlug === "content" && currentVideo) {
            const windowProps: WindowItemProps = {
                content: (
                    <LecturePlayerDocument
                        lectureDocument={{
                            videoUrl: currentVideo.video.src,
                            metaData: currentVideo.metadata,
                        }}
                    />
                ),
                windowHeading: currentVideo?.header,
                rightButtonList,
            };
            updateWindow({ ...windowProps });
        }
    }, [menuSlug, currentVideo]);

    useEffect(() => {
        if ((!menuSlug && !isSingleVideoVisible) || isIntroHtmlVisible) {
            const windowProps: WindowItemProps = {
                content: <HtmlDocument data={introHtmlString} />,
                windowHeading: "Lexitus-Lectures",
            };
            updateWindow({ ...windowProps });
        }

        if (
            menuSlug &&
            LectureItemData &&
            !isSingleVideoVisible &&
            !isDocTypeSearchParamValid &&
            menuSlug !== "content"
        ) {
            const windowProps: WindowItemProps = {
                content: (
                    <LectureListDocument
                        lectureList={LectureItemData}
                        parentSlug={menuSlug}
                    />
                ),
            };

            updateWindow({ ...windowProps });
        }

        if (
            contentSlug &&
            currentVideo &&
            menuSlug !== "content" &&
            !isSingleVideoVisible
        ) {
            const windowProps: WindowItemProps = {
                content: (
                    <LectureListDocument
                        lectureList={LectureItemData ?? []}
                        parentSlug={menuSlug}
                    />
                ),
                windowHeading: currentVideo?.header,
                rightButtonList,
            };

            updateWindow({ ...windowProps });
        }

        if (
            currentVideo &&
            (isSingleVideoVisible || (menuSlug && isDocTypeSearchParamValid))
        ) {
            const windowProps: WindowItemProps = {
                content: (
                    <LecturePlayerDocument
                        lectureDocument={{
                            videoUrl: currentVideo.video.src,
                            metaData: currentVideo.metadata,
                        }}
                    />
                ),
                windowHeading: currentVideo?.header,
                rightButtonList,
            };
            updateWindow({ ...windowProps });
        }
    }, [
        contentSlug,
        introHtmlString,
        menuSlug,
        LectureItemData,
        currentVideo,
        isIntroHtmlVisible,
        isSingleVideoVisible,
    ]);

    useEffect(() => {
        try {
            if (isIntroHtmlVisible) setIsIntroHtmlVisible(false);
            if (menuSlug && !contentSlug) {
                if (docTypeSearchParam === "Note") setIsIntroHtmlVisible(true);
                else if (isDocTypeSearchParamValid)
                    void getSingleVideo(menuSlug);
                else if (menuSlug !== "content")
                    void getLectureItemData(menuSlug);
            }

            if (contentSlug) void getCurrentVideo(contentSlug);
        } catch (error: unknown) {
            logger.error(error);
        }
    }, [contentSlug, menuSlug, isDocTypeSearchParamValid]);

    return <></>;
};

export default Lectures;
