import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import DecisionsDialog from "./index";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const StoryElement: ComponentMeta<typeof DecisionsDialog> = {
    title: "Example/DecisionsDialog",
    component: DecisionsDialog,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
   args : { }
};

export default StoryElement;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DecisionsDialog> = (args) => (
    < DecisionsDialog {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
