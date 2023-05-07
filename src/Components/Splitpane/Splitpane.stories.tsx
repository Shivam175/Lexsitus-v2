import { type ComponentStory, type ComponentMeta } from "@storybook/react";
import React from "react";

import Splitpane from "./index";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const StoryElement: ComponentMeta<typeof Splitpane> = {
    title: "Example/Splitpane",
    component: Splitpane,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {},
};

export default StoryElement;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Splitpane> = (args) => (
    <Splitpane {...args} />
);

export const Default = Template.bind({});
const layoutCSS = {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};
export const panes = [
    {
        pane: (
            <div
                style={{
                    ...layoutCSS,
                    background: "red",
                    marginRight: 3,
                }}
            >
                pane1
            </div>
        ),
        minSize: "25%",
        maxSize: "40%",
    },
    {
        pane: (
            <div
                style={{
                    ...layoutCSS,
                    background: "red",
                    marginRight: 3,
                }}
            >
                pane1
            </div>
        ),
        minSize: "30%",
        maxSize: "60%",
    },
    {
        pane: (
            <div
                style={{
                    ...layoutCSS,
                    background: "red",
                    marginRight: 3,
                }}
            >
                pane1
            </div>
        ),
        minSize: "20%",
        maxSize: "40%",
    },
];
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    panes,
};
