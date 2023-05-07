export { };
// /* eslint-disable @typescript-eslint/no-empty-function */
// /* eslint-disable capitalized-comments */

// import styles from "./TabComponent.module.scss";
// import type { TabInterface } from "./index";
// import TabComponent from "./index";
// import type { ComponentStory, ComponentMeta } from "@storybook/react";
// import type { ReactNode } from "react";


// // More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// const tabStory: ComponentMeta<typeof TabComponent> = {
//     title: "Example/TabComponent",
//     component: TabComponent,
//     // decorators: [withRouter],
//     // parameters: {
//     //     reactRouter: {
//     //         routePath: "/tabs", //  /:langId
//     //         // routeParams: [{ langId: "en" }],
//     //     },
//     // },
//     // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
// };

// export default tabStory;

// // More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// const landingPageTemplate: ComponentStory<typeof TabComponent> = (args) => (
//     <div className={styles["landing-page-tab-list"]}>
//         <TabComponent {...args} />
//     </div>
// );

// const tabArrayAnchor = [
//     // { label: "english", id: "english" },
//     { label: "English", path: "/en", id: "english" },
//     // { label: "arabic", id: "arabic" },
//     { label: "Arabic", path: "/ar", id: "arabic" },
//     // {label: 'french', id: 'french'},
//     { label: "French", path: "/fr", id: "french" },
//     // {label: 'persian', id: 'persian'}
//     { label: "Persian", path: "/fa", id: "persian" },
// ];

// const landingPageargs = {
//     currentTabId: "",
//     onTabChange() {},
//     tabList: tabArrayAnchor,
//     // tabList: tabArrayBtn,
//     baseClassName: styles["lp-tab-list-item"],
//     activeClassName: styles["lp-tab-list-item-active"],
// };

// export const landingPageTab = landingPageTemplate.bind({});
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
// landingPageTab.story = {
//     // parameters: {
//     //     reactRouter: {
//     //         browserPath: "/tabs",
//     //     },
//     // },
// };
// landingPageTab.args = { ...landingPageargs };

// const libraryPageTemplate: ComponentStory<typeof TabComponent> = (args) => (
//     <>
//         <div className={styles["library-page-tab-list"]}>
//             <TabComponent {...args} />
//         </div>
//     </>
// );

// const libTabSpanArr: ReactNode[] = tabSpanArr();

// const libTabArrAnchor = [
//     { label: libTabSpanArr[0], path: "/lectures", id: "lectures" },
//     { label: libTabSpanArr[1], path: "/clicc", id: "clicc" },
//     { label: libTabSpanArr[2], path: "/prepWorks", id: "preparatoryWorks" },
//     { label: libTabSpanArr[3], path: "/caseLaw", id: "caseLaw" },
//     { label: libTabSpanArr[4], path: "/iccElements", id: "iccElementsOfCrime" },
//     { label: libTabSpanArr[5], path: "/elementsDigest", id: "elementsDigest" },
//     { label: libTabSpanArr[6], path: "/meansOfProof", id: "meansOfProof" },
// ];
// const libraryPageargs = {
//     currentTabId: "",
//     onTabChange(updatedTab: TabInterface) {
//         console.log("tabChange-in-parent-comp", updatedTab);
//     },
//     tabList: libTabArrAnchor,
//     baseClassName: styles["lib-tab-list-item"],
//     activeClassName: styles["lib-tab-list-item-active"],
// };

// export const libraryPageTab = libraryPageTemplate.bind({});
// libraryPageTab.story = {};
// libraryPageTab.args = { ...libraryPageargs };
