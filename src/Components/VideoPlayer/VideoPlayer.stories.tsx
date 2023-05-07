import React from "react";
import VideoPlayer from "./index";
import type { ComponentStory, ComponentMeta } from "@storybook/react";

const sampleVideo = {
    url: "https://lexsitus.cmn-kh.org/lex_web/av_intro.mp4",
    height: 400,
    // Width: 700,
    aspectRatio:"16:9",
    subtitles: [
        {
            src: "https://raw.githubusercontent.com/1c7/vtt-test-file/master/vtt%20files/2.%20No%20Index%20Number%2C%20download%20using%20youtube-dl.vtt",
            language: "english",
        },
    ],
};

const VideoPlayerStory: ComponentMeta<typeof VideoPlayer> = {
    title: "Example/VideoPlayer",
    component: VideoPlayer,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        ...sampleVideo,
    },
};

export default VideoPlayerStory;

const Template: ComponentStory<typeof VideoPlayer> = (args) => (
    <VideoPlayer {...args} />
);

export const VideoPlayerDemo = Template.bind({});
VideoPlayerDemo.args = {
    url:sampleVideo.url,
    height:sampleVideo.height,
    // Width:sampleVideo.width,
    aspectRatio:sampleVideo.aspectRatio,
    subtitles:sampleVideo.subtitles,
};