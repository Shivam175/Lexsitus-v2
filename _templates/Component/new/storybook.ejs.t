---
to: src/Components/<%= h.inflection.camelize(name) %>/<%= h.inflection.camelize(name) %>.stories.tsx
---
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import <%= h.inflection.camelize(name) %> from "./index";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const StoryElement: ComponentMeta<typeof <%= h.inflection.camelize(name) %>> = {
    title: "Example/<%= h.inflection.camelize(name) %>",
    component: <%= h.inflection.camelize(name) %>,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
   args : { }
};

export default StoryElement;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof <%= h.inflection.camelize(name) %>> = (args) => (
    < <%= h.inflection.camelize(name) %> {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
