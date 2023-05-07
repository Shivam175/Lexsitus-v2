import { type ComponentStory, type ComponentMeta } from "@storybook/react";
import React from "react";

import VideoCard from "./index";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const StoryElement: ComponentMeta<typeof VideoCard> = {
    title: "Example/Cards/VideoCard",
    component: VideoCard,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {},
};

export default StoryElement;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof VideoCard> = (args) => (
    <VideoCard {...args} />
);

export const Default1 = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default1.args = {
    title: "General Lexsitus Tutorial",
    imageUrl: "https://lexsitus.cmn-kh.org/lex_web/av_intro.jpg",
};
