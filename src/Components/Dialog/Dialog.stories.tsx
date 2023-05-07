import Dialog from "./index";
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import VideoPlayer from "Components/VideoPlayer/index";


const DialogStory: ComponentMeta<typeof Dialog> = {
    title: "Example/Dialog",
    component: Dialog,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        open:true,
        children:<VideoPlayer url={"https://lexsitus.cmn-kh.org/lex_web/av_intro.mp4"} height={210} width={450}/>,
        onClose() {
            // eslint-disable-next-line no-alert
            window.alert("closed"); 
        },
    },
};

export default DialogStory;


const Template: ComponentStory<typeof Dialog> = (args) => (
    <Dialog {...args}/>
  
);

export const DialogDemo = Template.bind({});
DialogDemo.args = {
    open:true,
    children:<VideoPlayer url={"https://lexsitus.cmn-kh.org/lex_web/av_intro.mp4"} height={210} width={450}/>,
    onClose() {
        // eslint-disable-next-line no-alert
        window.alert("closed"); 
    },
};