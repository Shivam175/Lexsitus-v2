import { type ComponentStory, type ComponentMeta } from "@storybook/react";

import { StoreProvider } from "easy-peasy";
import React from "react";
import ReadingListDrawer from "./index";
import { store } from "Stores";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const StoryElement: ComponentMeta<typeof ReadingListDrawer> = {
    title: "Example/ReadingListWindow",
    component: ReadingListDrawer,
    decorators: [
        (Story) => (
            <StoreProvider store={store}>
                <Story />
            </StoreProvider>
        ),
    ],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args : { }
};

export default StoryElement;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ReadingListDrawer> = (args) => (
    < ReadingListDrawer {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
