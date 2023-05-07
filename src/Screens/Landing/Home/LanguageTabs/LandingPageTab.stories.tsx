/* eslint-disable @typescript-eslint/no-empty-function */
import { type ComponentStory, type ComponentMeta } from "@storybook/react";
import React from "react";


import styles from "./index.module.scss";
import LanguageTabs from "./index";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const landingPageTabStory: ComponentMeta<typeof LanguageTabs> = {
    title: "Example/LandingPageTab",
    component: LanguageTabs,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {},
};

export default landingPageTabStory;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LanguageTabs> = (args) => (
    <LanguageTabs {...args} />
);

// Export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
// Default.args = {};

const tabArrayAnchor = [
    { label: "English", path: "/en", id: "english" },
    { label: "Arabic", path: "/ar", id: "arabic" },
    { label: "French", path: "/fr", id: "french" },
    { label: "Persian", path: "/fa", id: "persian" },
];
const landingPageargs = {
    currentTabId: "",
    onTabChange() {},
    tabList: tabArrayAnchor,
    baseClassName: styles["lp-tab-list-item"],
    activeClassName: styles["lp-tab-list-item-active"],
};

export const landingPageTabComp = Template.bind({});
landingPageTabComp.args = { ...landingPageargs };
