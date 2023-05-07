import { type ComponentStory, type ComponentMeta } from "@storybook/react";
import NavigationDrawerMenuList from "./index";
import {
    TOP_NAVIGATION_DRAWER_MENULIST,
    BOTTOM_NAVIGATION_DRAWER_MENULIST,
} from "constants/navigationDrawerMenu";
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
    title: "Example/NavigationDrawerMenulist",
    component: NavigationDrawerMenuList,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {},
} as ComponentMeta<typeof NavigationDrawerMenuList>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof NavigationDrawerMenuList> = (args) => (
    <NavigationDrawerMenuList {...args} />
);

export const TopNavigationDrawerMenulist = Template.bind({});
TopNavigationDrawerMenulist.args = {
    menus: TOP_NAVIGATION_DRAWER_MENULIST,
};
export const BottomNavigationDrawerMenulist = Template.bind({});
BottomNavigationDrawerMenulist.args = {
    menus: BOTTOM_NAVIGATION_DRAWER_MENULIST,
};
