import { type ComponentStory, type ComponentMeta } from "@storybook/react";
import React from "react";

import ReportIssueInput from "./index";


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const StoryElement: ComponentMeta<typeof ReportIssueInput> = {
    title: "Example/ReportIssueInput",
    component: ReportIssueInput,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args : { },
};

export default StoryElement;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ReportIssueInput> = (args) => (
    < ReportIssueInput {...args} />
    // <ReportIssueInput
    //     key={1}
    //     formikProps={("props" as unknown) as FormikProps<any>}
    //     valuekey={"name"}
    //     type={"text"}
    //     label={""}
    //     placeholder={"Name"}
    // />
);

export const nameInput = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
nameInput.args = {};
