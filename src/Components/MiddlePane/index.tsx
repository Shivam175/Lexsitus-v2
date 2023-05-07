/* eslint-disable @typescript-eslint/naming-convention */
import { type ReactNode, useContext, type FC } from "react";
import styles from "./index.module.scss";
import HtmlDocument from "Components/HtmlDocument";
import PdfDocument from "Components/PdfDocument";
import VideoListDocument, {
    type IVideoList,
} from "Components/VideoListDocument";
import WindowItem from "Components/WindowItem";
import {
    libraryPageContext,
    type WindowType,
    type WindowChildrenType,
} from "Hooks/useLibraryContext";

export const getWindowChild = (
    windowChildren: WindowChildrenType[],
    type: WindowType,
): ReactNode => {
    const videoList: IVideoList[] = [];

    if (type === "videoList") {
        windowChildren.forEach((children) => {
            const { video, header, item_slug, metadata } = children;
            if (video) videoList.push({ video, header, item_slug, metadata });
        });
    }

    switch (type) {
        case "html":
            return <HtmlDocument data={windowChildren} />;

        case "videoList":
            return <VideoListDocument videoList={videoList} />;

        case "pdf":
            return <PdfDocument pdfUrl={""} metaData={""} />;
        default:
            return null;
    }
};

const MiddlePane: FC = () => {
    const { windowChildren, type } = useContext(libraryPageContext);

    return (
        <div className={styles.middlepane}>
            <WindowItem child={getWindowChild(windowChildren, type)} />
        </div>
    );
};

export default MiddlePane;
