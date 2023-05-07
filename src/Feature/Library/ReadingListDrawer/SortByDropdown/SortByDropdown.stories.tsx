import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import SortByDropdown from "./index";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const StoryElement: ComponentMeta<typeof SortByDropdown> = {
    title: "Example/SortReadingList",
    component: SortByDropdown,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
   args : { }
};

export default StoryElement;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SortByDropdown> = (args) => (
    < SortByDropdown {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
