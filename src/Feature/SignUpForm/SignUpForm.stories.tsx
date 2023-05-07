import { type ComponentStory, type ComponentMeta } from "@storybook/react";
import React from "react";

import SignUpForm from "./index";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const StoryElement: ComponentMeta<typeof SignUpForm> = {
    title: "Example/SignUpForm",
    component: SignUpForm,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {},
};

export default StoryElement;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SignUpForm> = (args) => (
    <SignUpForm {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
