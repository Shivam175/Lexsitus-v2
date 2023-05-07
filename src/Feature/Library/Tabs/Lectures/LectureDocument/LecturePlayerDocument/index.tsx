import React, { useEffect, useRef, useState, type FC } from "react";
import styles from "./index.module.scss";

import MetaDataItem from "Components/MetaDataItem";
import VideoPlayer from "Components/VideoPlayer";
import LectureList, { type LectureListProps } from "Feature/Library/Tabs/Lectures/LectureDocument/LectureList";
import { type Lecture } from "Feature/Library/Tabs/Lectures/LectureDocument/LectureListDocument";

export interface LectureDocument {
    videoUrl: string;
    metaData: Record<string, string>;
}

export interface LecturePlayerDocumentProps {
    lectureList?: Lecture[];
    lectureDocument: LectureDocument;
    parentSlug?: string;
}

const LecturePlayerDocument: FC<LecturePlayerDocumentProps> = ({
    lectureList,
    lectureDocument,
    parentSlug = "",
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [lectureDoc, setLectureDoc] =
        useState<LectureDocument>(lectureDocument);

    useEffect(() => {
        if (lectureDocument) setLectureDoc(lectureDocument);
    }, [lectureDocument]);

    useEffect(() => {
        if (lectureDoc) scrollRef.current?.scrollTo(0, 0);
    }, [lectureDoc]);

    const handleLectureClick = (lecture: Lecture) => {
        setLectureDoc({
            videoUrl: lecture.video.src,
            metaData: lecture.metadata,
        });
    };

    const lectureListProps: LectureListProps = {
        lectureList: lectureList ?? [],
        parentSlug,
        handleLectureClick,
        listClassname: styles.lectureListContainer,
    };

    return (
        <div className={styles.videoPlayerDocument} ref={scrollRef}>
            <div className={styles.videoPlayerContainer}>
                <VideoPlayer url={lectureDoc.videoUrl} aspectRatio="16:9" />
            </div>
            <div className={styles.videoInformation}>
                <div className={styles.metaData}>
                    {Object.entries(lectureDoc.metaData).map((data, idx) => <MetaDataItem heading={data[0]} text={data[1]} key={idx} />)}
                </div>
                {lectureList ? <LectureList {...lectureListProps} /> : null}
            </div>
        </div>
    );
};

export default LecturePlayerDocument;
