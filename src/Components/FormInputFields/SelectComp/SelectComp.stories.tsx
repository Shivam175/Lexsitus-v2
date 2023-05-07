import { type ComponentStory, type ComponentMeta } from "@storybook/react";
import { Formik } from "formik";
import { SelectComp } from "./index";
import { aboutLexsitusArray } from "Feature/SignUpForm";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const StoryElement: ComponentMeta<typeof SelectComp> = {
    title: "Example/SelectComp",
    component: SelectComp,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {},
};

export default StoryElement;
const initialValues = { heardFrom: "" };

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SelectComp> = (args) => (
    <Formik
        initialValues={initialValues}
        onSubmit={function (
            
            
        ): void | Promise<any> {
            throw new Error("Function not implemented.");
        }}
    >
        {(props) => <SelectComp {...args} formikProps={props} />}
    </Formik>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    valuekey: "about_lexsitus",
    fieldProps: {
        label: "Where did you hear about Lexitus?",
        options: aboutLexsitusArray,
    },
};
