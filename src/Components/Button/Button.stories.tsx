import { type ComponentStory, type ComponentMeta } from "@storybook/react";
import Button from "./index";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const StoryElement: ComponentMeta<typeof Button> = {
    title: "Example/Button",
    component: Button,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args : { },
}; 

export default StoryElement;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => (
    <Button {...args} >{args.children}</Button>
);

export const Default1 = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default1.args = {
    children:"Button",
    edge:"square",
    variant:"text",
    color:"blue",
};
export const Default2 = Template.bind({});
Default2.args = {
    children: "Button",
    edge: "rounded",
    variant: "text",
    color: "blue",
};
export const Contained1 = Template.bind({});
Contained1.args = {
    children:"Button",
    variant:"contained",
    color:"white",
};
export const Contained2 = Template.bind({});
Contained2.args = {
    children:"Button",
    variant:"contained",
    color:"blue",
};
export const Contained3 = Template.bind({});
Contained3.args = {
    children:"Button",
    variant:"contained",
    color:"grey",
};

export const outlined1 = Template.bind({});
outlined1.args = {
    children:"Button",
    variant:"outlined",
    color:"white",
};
export const outlined2 = Template.bind({});
outlined2.args = {
    children:"Button",
    variant:"outlined",
    color:"blue",
};
export const outlined3 = Template.bind({});
outlined3.args = {
    children:"Button",
    variant:"outlined",
    color:"grey",
};
export const text1 = Template.bind({});
text1.args = {
    children:"Button",
    variant:"text",
    color:"white",
};
export const text2 = Template.bind({});
text2.args = {
    children:"Button",
    variant:"text",
    color:"blue",
};
export const text3 = Template.bind({});
text3.args = {
    children:"Button",
    variant:"text",
    color:"grey",
};
export const link = Template.bind({});
link.args = {
    children:"www.google.com",
    link:"www.google.com",
};
export const anchor = Template.bind({});
anchor.args = {
    children:"www.google.com",
    link:"www.google.com",
    isExternal:true,

};