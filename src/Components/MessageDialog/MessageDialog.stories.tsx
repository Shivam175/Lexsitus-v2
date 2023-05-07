import { type ComponentStory, type ComponentMeta } from "@storybook/react";
import React from "react";
import styles from "./index.module.scss";
import MessageDialog from "./index";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const StoryElement: ComponentMeta<typeof MessageDialog> = {
    title: "Example/MessageDialog",
    component: MessageDialog,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args : { },
};

export default StoryElement;

const Template: ComponentStory<typeof MessageDialog> = (args) => (
    <MessageDialog {...args} />
);

export const DialogueStory = Template.bind({});
DialogueStory.args = {
    heading: "Login Failed",
    message: "Authentication failed. Please try again",
    dialogOpen: true,
};

export const authenticateVariant = Template.bind({});
authenticateVariant.args = {
    heading: "Authentication",
    message: "You need to authenticate to complete this action",
    dialogOpen: true,
    acceptBtnText: "Login",
    acceptBtnLink: "/en/login",
    acceptBtnClassName: styles["authenticate-dialog-btn"],
    closeBtnText: "Cancel",
    closeBtnClassName: styles["authenticate-dialog-btn"],
};