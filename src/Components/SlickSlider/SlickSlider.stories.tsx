/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable react/jsx-key */
import { type ComponentStory, type ComponentMeta } from "@storybook/react";
import styles from "./index.module.scss";
import SlickSlider from "./index";
import CoreTeam from "Feature/CoreTeam";
import Introduction from "Feature/Introduction";


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Example/SlickSlider",
    component: SlickSlider,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {},
} as ComponentMeta<typeof SlickSlider>;

const dummySlidesArray = [
    // "text - hello",
    // card(),
    // image(),
    // video(),
    // imageCard(),
    // videoCard(),
    <Introduction />,
    <CoreTeam />,
];

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SlickSlider> = (args) => (
    <div className={styles["story-slider-container"]}>
        <SlickSlider {...args}>{dummySlidesArray}</SlickSlider>
    </div>
);

export const landingPageSlider = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
