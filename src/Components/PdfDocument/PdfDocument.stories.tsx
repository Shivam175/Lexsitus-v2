import { type ComponentStory, type ComponentMeta } from "@storybook/react";
import React from "react";

import PdfDocument from "./index";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const StoryElement: ComponentMeta<typeof PdfDocument> = {
    title: "Example/PdfDocument",
    component: PdfDocument,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {},
};

export default StoryElement;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PdfDocument> = (args) => (
    <PdfDocument {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    pdfUrl: "http://www.toaep.org/ps-pdf/30-christensen",

};
