import { type ComponentStory, type ComponentMeta } from "@storybook/react";
import IconsWithText from "./index";

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: "Example/IconsWithText",
    component: IconsWithText,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args : {
        text : "text icon",
        icon:"enter-library",
    },
} as ComponentMeta<typeof IconsWithText>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof IconsWithText> = (args) => (
    <IconsWithText {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const rightIconWithText = Template.bind({});
rightIconWithText.args = {
    iconPos:"right",
};
export const leftIconWithText = Template.bind({});
leftIconWithText.args = {
    iconPos:"left",
    icon:"mithya-logo",
};