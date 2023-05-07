import { type ComponentStory, type ComponentMeta } from "@storybook/react";
// eslint-disable-next-line import/no-unresolved
import styles from "./ImageCard.module.scss";
import UserCard from "./index";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: "Example/Cards/ImageCard",
    component: UserCard,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        text: "Default text",
    },
} as ComponentMeta<typeof UserCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof UserCard> = (args) => (
    <div className={styles["story-wrapper-div"]}>
        <UserCard {...args} />
    </div>
);
const textCardTemplate: ComponentStory<typeof UserCard> = (args) => (
    <div className={styles["text-story-wrapper-div"]}>
        <UserCard {...args} />
    </div>
);

// Export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
// Default.args = {};
const localImgPath = "../../../../assets/img/img/contributors/";

export const arabicImgCard = Template.bind({});
arabicImgCard.args = {
    name: "Fathi M.A. Ahmed",
    image: localImgPath + "Team/FathiAhmed.jpeg",
    description: "CILRAP Arabic Translation Team Leader",
};

export const arabicTextCard = textCardTemplate.bind({});
arabicTextCard.args = {
    name: "Gamal Abdelazim",
    image: "",
    description: "Copy-preparer and Proofreader",
};
