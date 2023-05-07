import { type ComponentStory, type ComponentMeta } from "@storybook/react";
import React from "react";

import styles from "./index.module.scss";
import LexsitusHeading from "./index";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const headingStory: ComponentMeta<typeof LexsitusHeading> = {
    title: "Example/LexsitusHeading",
    component: LexsitusHeading,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {},
};

export default headingStory;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LexsitusHeading> = (args) => (
    <div className={styles.background_color_div}>
        <LexsitusHeading {...args} />
    </div>
);

export const defaultHeading = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
defaultHeading.args = { subHeadingKey: "Introductions" };

export const logoHeading = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
logoHeading.args = {};
