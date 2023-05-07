/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { type ComponentStory, type ComponentMeta } from "@storybook/react";
import React from "react";

import Typography from "./index";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Example/Typography",
    component: Typography,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args : { },
} as ComponentMeta<typeof Typography>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Typography> = (args) => (
    < Typography {...args} >Header</Typography>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};

export const Typoh1 = Template.bind({});
Typoh1.args = {
    variant: "h1",
    tag: "h1",
};
export const Typoh2 = Template.bind({});
Typoh2.args = {
    variant: "h2",
    tag: "h2",
};
export const Typoh3 = Template.bind({});
Typoh3.args = {
    variant: "h3",
    tag: "h3",
};
export const Typoh4 = Template.bind({});
Typoh4.args = {
    variant: "h4",
    tag: "h4",
};
export const Typoh5 = Template.bind({});
Typoh5.args = {
    variant: "h5",
    tag: "h5",
};
export const Typoh6 = Template.bind({});
Typoh6.args = {
    variant: "h6",
    tag: "h2",
};
export const TypoSmall = Template.bind({});
TypoSmall.args = {
    variant: "small",
    tag: "p",
};
export const TypoCaption = Template.bind({});
TypoCaption.args = {
    variant: "caption",
    tag: "h5",
};
export const TypoBody = Template.bind({});
TypoBody.args = {
    tag: "h1",
};
export const TypoAnchor = Template.bind({});
TypoAnchor.args = {
    link: "https://google.com",
    isExternal: true,
};