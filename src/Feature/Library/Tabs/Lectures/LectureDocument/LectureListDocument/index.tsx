import { memo, useContext, useState, type FC } from "react";
import styles from "./index.module.scss";
import { LibraryContext } from "Feature/Library/Context";
import LectureList, { type LectureListProps } from "Feature/Library/Tabs/Lectures/LectureDocument/LectureList";
import LecturePlayerDocument, {
    type LectureDocument,
} from "Feature/Library/Tabs/Lectures/LectureDocument/LecturePlayerDocument";
import { type VideoType } from "Models/Tabs/Lectures/@types";


export interface Lecture {
    id?: string;
    video: VideoType;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    item_slug: string;
    header: string;
    metadata: Record<string, string>;
}

export interface LectureListDocumentProps {
    lectureList: Lecture[];
    parentSlug: string;
    lectureCardClassname?: string;
}

const LectureListDocument: FC<LectureListDocumentProps> = ({
    lectureList,
    parentSlug,
}) => {
    const { contentSlug } = useContext(LibraryContext);
    const [lectureDocument, setLectureDocument] = useState<LectureDocument>({
        videoUrl: "",
        metaData: {},
    });

    const handleLectureClick = (lecture: Lecture) => {
        setLectureDocument({
            videoUrl: lecture.video.src,
            metaData: lecture.metadata,
        });
    };

    const lectureListProps: LectureListProps = {
        lectureList,
        parentSlug,
        handleLectureClick,
        listClassname: styles.lectureListContainer,
    };

    if (contentSlug)
        return (
            <LecturePlayerDocument
                lectureList={lectureList}
                parentSlug={parentSlug}
                lectureDocument={lectureDocument}
            />
        );

    return <LectureList {...lectureListProps} />;
};

export default memo(LectureListDocument);
