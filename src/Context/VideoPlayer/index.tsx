import React, { type FC, useState, type PropsWithChildren } from "react";
import Dialog from "Components/Dialog";
import VideoPlayer, { type VideoPlayerProps } from "Components/VideoPlayer";

interface IVideoPlayerContextProps {
    open: boolean;
    video?: VideoPlayerProps;
    show: (video: VideoPlayerProps) => void;
    hide: () => void;
}

export const VideoDialogContext = React.createContext<IVideoPlayerContextProps>(
    {
        open: false,
        show() {
            // Define
        },
        hide() {
            // Define
        },
    }
);

export const useVideoPlayerDialog = (): IVideoPlayerContextProps => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [video, setVideo] = useState<VideoPlayerProps>();

    const showDialog = (video: VideoPlayerProps) => {
        setIsOpen(true);
        setVideo(video);
    };

    const hideDialog = () => {
        setIsOpen(false);
    };

    return {
        show: showDialog,
        hide: hideDialog,
        open: isOpen,
        video,
    };
};

const VideoPlayerDialogProvider: FC<PropsWithChildren> = ({
    children,
}) => {
    const { show, hide, open, video } = useVideoPlayerDialog();
    return (
        <VideoDialogContext.Provider
            value={{
                show,
                hide,
                open,
                video,
            }}
        >
            {children}
            <Dialog open={open} onClose={hide} closeBtnPosition={"centreRight"}>
                {video?.url ? (
                    <VideoPlayer height={400} width={700} {...video} />
                ) : null}
            </Dialog>
        </VideoDialogContext.Provider>
    );
};

export default VideoPlayerDialogProvider;
