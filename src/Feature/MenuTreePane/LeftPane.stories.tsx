import { type ComponentStory, type ComponentMeta } from "@storybook/react";
import React from "react";

import MenuTreePane from "./index";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const StoryElement: ComponentMeta<typeof MenuTreePane> = {
    title: "Example/LeftPane",
    component: MenuTreePane,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args : { },
};

export default StoryElement;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof MenuTreePane> = (args) => (
    < MenuTreePane {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
