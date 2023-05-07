import clsx from "clsx";
import React, { type FC, useContext, useEffect } from "react";
import VideoCard from "Components/Cards/VideoCard";
import { VideoDialogContext } from "Context/VideoPlayer";

export interface IVideoProps {
    name: string;
    poster: string;
    video: string;
    slug?: string;
}
export interface IVideoListProps {
    list: IVideoProps[];
    videoSlug: string;
}

const VideoList: FC<IVideoListProps> = ({ list = [], videoSlug = "" }) => {
    const { show: showVideo } = useContext(VideoDialogContext);
    const handleVideoPlay = (video: IVideoProps) => {
        showVideo({
            url: video.video,
        });
    };

    const playVideoWithSlug = () => {
        const video = list.find((video) => video?.slug === videoSlug);
        if (video)
            setTimeout(() => {
                handleVideoPlay(video);
            }, 500);
    };

    useEffect(() => {
        if (videoSlug) playVideoWithSlug();
    }, []);

    return (
        <ul className={clsx("flex", "flex-wrap", "justify-center")}>
            {list.map((videoItem) => (
                <li
                    key={videoItem.video}
                    className={clsx("w-1/4", "pb-1", "pr-1")}
                >
                    <VideoCard
                        imageUrl={videoItem.poster}
                        title={videoItem.name}
                        onClick={() => {
                            handleVideoPlay(videoItem);
                        }}
                    />
                </li>
            ))}
        </ul>
    );
};

export default VideoList;
