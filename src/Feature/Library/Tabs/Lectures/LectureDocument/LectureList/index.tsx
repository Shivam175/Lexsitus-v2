import { memo, type FC } from "react";
import Link from "Components/Link";
import Typography from "Components/Typography";
import { type Lecture } from "Feature/Library/Tabs/Lectures/LectureDocument/LectureListDocument";

export interface LectureCardProps {
    posterUrl: string;
    header: string;
}

export interface LectureListProps {
    lectureList: Lecture[];
    parentSlug: string;
    handleLectureClick: (video: Lecture) => void;
    listClassname?: string;
}

export const LectureCard: FC<LectureCardProps> = ({ posterUrl, header }) => (
    <>
        <div className="lectureCardImage">
            <img src={posterUrl} height={"auto"} width={"100%"} />
        </div>
        <Typography variant="h6" className="lectureCardTitle">
            {header}
        </Typography>
    </>
);

const LectureList: FC<LectureListProps> = ({
    lectureList,
    parentSlug,
    handleLectureClick,
    listClassname = "",
}) => (
    <div className={listClassname}>
        {lectureList?.map((lecture, idx) => (
            <Link
                key={idx}
                to={`/lectures/${parentSlug}/${lecture.item_slug}`}
                onClick={() => {
                    handleLectureClick(lecture);
                }}
            >
                <LectureCard
                    posterUrl={lecture.video.poster}
                    header={lecture.header}
                />
            </Link>
        ))}
    </div>
);

export default memo(LectureList);
