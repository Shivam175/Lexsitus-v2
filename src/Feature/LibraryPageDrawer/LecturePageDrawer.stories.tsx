import { type ComponentStory, type ComponentMeta } from "@storybook/react";
import React from "react";

import { LibraryPageDrawer } from "./index";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const StoryElement: ComponentMeta<typeof LibraryPageDrawer> = {
    title: "Example/LecturePageDrawer",
    component: LibraryPageDrawer,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args : { },
};

export default StoryElement;
const drawerName = [
    {
        name: "rome statue",
        className: "rome-statue",
    },
    {
        name:" rules of procedure and evidence",
        className:"rope",
    },
];
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LibraryPageDrawer> = (args) => (
    < LibraryPageDrawer {...args} />
);

export const drawerClose = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
drawerClose.args = {
    open: false,
    drawerName,
};
export const drawerOpen = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
drawerOpen.args = {
    open: true,
    drawerName,
};

