import { type ComponentStory, type ComponentMeta } from "@storybook/react";
import { Formik } from "formik";
import { InputComp } from "./index";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const StoryElement: ComponentMeta<typeof InputComp> = {
    title: "Example/InputComp",
    component: InputComp,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {},
};

export default StoryElement;
const initialValues = { fullName: "" };
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof InputComp> = (args) => (
    <Formik
        initialValues={initialValues}
        onSubmit={function (
            
            
        ): void | Promise<any> {
            throw new Error("Function not implemented.");
        }}
    >
        {(props) => <InputComp {...args} formikProps={props} />}
    </Formik>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    type: "text",
    valuekey: "fullName",
    fieldProps: { placeholder: "enter your full name..." },
};
