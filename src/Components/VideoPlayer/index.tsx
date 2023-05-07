import clsx from "clsx";
import React, { type FC, useEffect } from "react";
import videojs, {
    type VideoJsPlayer,
    type VideoJsPlayerOptions,
} from "video.js";
import "video.js/dist/video-js.css";

interface Subtitles extends videojs.TextTrackOptions {
    src: string;
    language: string;
}
export interface VideoPlayerProps {
    url: string;
    subtitles?: Subtitles[];
    height?: number;
    width?: number;
    aspectRatio?: string;
    className?: string;
}

const VideoPlayer: FC<VideoPlayerProps> = (props) => {
    const { url, subtitles, height, width, aspectRatio, className } = props;
    const videoRef = React.createRef<HTMLVideoElement>();
    const playerRef = React.useRef<VideoJsPlayer | undefined>();

    const options: VideoJsPlayerOptions = {
        controls: true,
        autoplay: true,
        responsive: true,
        aspectRatio,
        sources: [{ src: url }],
        tracks: subtitles,
    };

    useEffect(() => {
        const player = playerRef.current;

        if (player) {
            player.src(options.sources ?? []);
            player.aspectRatio(options.aspectRatio ?? "16:9");
            options.tracks?.forEach(({ kind, label, language }) => {
                player.addTextTrack(kind, label, language);
            });
        } else {
            const videoElement = videoRef.current;

            if (!videoElement) return;
            playerRef.current = videojs(videoElement, options);
        }
    }, [videoRef, options]);

    useEffect(() => {
        const player = playerRef.current;

        return () => {
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = undefined;
            }
        };
    }, [playerRef]);

    return (
        <video
            ref={videoRef}
            className={clsx(className, "video-js vjs-big-play-centered")}
            height={height}
            width={width}
        />
    );
};

export default VideoPlayer;
