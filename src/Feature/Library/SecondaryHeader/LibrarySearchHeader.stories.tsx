import { type ComponentStory, type ComponentMeta } from "@storybook/react";
import React from "react";

import SecondaryHeader from "./index";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const StoryElement: ComponentMeta<typeof SecondaryHeader> = {
    title: "Example/LibrarySearchHeader",
    component: SecondaryHeader,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args : { },
};

export default StoryElement;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SecondaryHeader> = (args) => (
    < SecondaryHeader {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
