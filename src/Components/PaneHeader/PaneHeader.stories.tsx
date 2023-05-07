import { type ComponentStory, type ComponentMeta } from "@storybook/react";
import clsx from "clsx";
import styles from "./index.module.scss";
import PaneHeader from "./index";
import Button from "Components/Button";
import { type IAvailableIcon } from "Components/Icons/@types";
import IconsWithText from "Components/IconsWithText";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const StoryElement: ComponentMeta<typeof PaneHeader> = {
    title: "Example/PaneHeader",
    component: PaneHeader,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {},
};

export default StoryElement;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PaneHeader> = (args) => (
    <div className={styles["story-pane-header-root"]}>
        <PaneHeader {...args} />
    </div>
);

export const readingListHeader = Template.bind({});
const detectClick = () => {
    console.log("Btn clicked");
};

const createButton = (
    tooltip: string,
    icon: IAvailableIcon = homeReportIcon,
    iconClass = "",
    btnText = "",
) => (
    <Button tooltip={tooltip} className={clsx(iconClass)}>
        {btnText ? (
            <span className={styles["story-flex-container"]}>
                <IconsWithText icon={icon} />
                <span className={styles["flex-text"]}>{btnText}</span>
            </span>
        ) : (
            <IconsWithText icon={icon} />
        )}
    </Button>
);

const createMaterialButton = (
    tooltip: string,
    icon: string,
    iconClass = "",
) => (
    <Button tooltip={tooltip} className={clsx("material-icons", iconClass)}>
        {icon}
    </Button>
);

const homeReportIcon = "home-top-right-report";
const createButtonListItem = (
    Button: JSX.Element,
    onClick: () => void = detectClick,
) => ({
    Button,
    onClick,
});

const onTitleChange = (updatedTitle: string) => {
    console.log("parent-comp", updatedTitle);
};

readingListHeader.args = {
    leftButtonList: [
        createButtonListItem(
            createMaterialButton("Open/Create Reading List", "folder_open"),
        ),
        createButtonListItem(createMaterialButton("History", "history")),
    ],
    rightButtonList: [
        createButtonListItem(createMaterialButton("Sort documents", "sort")),
        createButtonListItem(
            createMaterialButton("Expand/Collapse", "keyboard_arrow_up"),
        ),
    ],
    titleText: "Untitled",
    onTitleChange,
    titleIsEditable: true,
};

export const richTextEditorHeader = Template.bind({});
richTextEditorHeader.args = {
    leftButtonList: [
        createButtonListItem(
            createMaterialButton(
                "Open/Create notes",
                "folder_open",
                styles["icon-small"],
            ),
        ),
        createButtonListItem(
            createMaterialButton("Save note", "save", styles["icon-small"]),
        ),
        createButtonListItem(
            createMaterialButton(
                "Add to reading list",
                "library_add",
                styles["icon-small"],
            ),
        ),
    ],
    rightButtonList: [
        createButtonListItem(
            createMaterialButton(
                "Minimize window",
                "keyboard_arrow_right",
                styles["material-icon-arrow-right"],
            ),
        ),
    ],
    titleText: "Untitled",
    onTitleChange,
    titleIsEditable: true,
    paneHeaderClassName: styles["rte-story-header-root"],
    leftListClassName: styles["rte-left-list"],
    rightListClassName: styles["rte-right-list"],
};

export const prepWorksMenuTreeHeader = Template.bind({});
prepWorksMenuTreeHeader.args = {
    leftButtonList: [],
    rightButtonList: [],
    titleText: "Menu",
    onTitleChange,
    titleIsEditable: false,
    paneHeaderClassName: styles["menu-story-header-root"],
    titleClassName: styles["menu-header-title"],
};

export const cliccTreeHeader = Template.bind({});
cliccTreeHeader.args = {
    leftButtonList: [],
    rightButtonList: [
        createButtonListItem(
            createMaterialButton(
                "Download commentaries",
                "get_app",
                styles["icon-small"],
            ),
        ),
    ],
    titleText: "CLICC commentary",
    onTitleChange,
    titleIsEditable: false,
    paneHeaderClassName: styles["clicc-story-header-root"],
    titleClassName: styles["clicc-header-title"],
};

export const elementsDigestTreeHeader = Template.bind({});
elementsDigestTreeHeader.args = {
    leftButtonList: [],
    rightButtonList: [
        createButtonListItem(
            createButton(
                "Digest Decisions",
                "digest-decisions-icon",
                styles["icon-tiny"],
                " Decisions ",
            ),
        ),
    ],
    titleText: "Menu",
    onTitleChange,
    titleIsEditable: false,
    paneHeaderClassName: styles["elements-digest-header-root"],
    titleClassName: styles["elements-digest-header-title"],
};

export const middlePaneHeaderAllIcons = Template.bind({});
middlePaneHeaderAllIcons.args = {
    leftButtonList: [
        createButtonListItem(
            createMaterialButton(
                "View pdf",
                "picture_as_pdf",
                styles["icon-small"],
            ),
        ),
        createButtonListItem(
            createMaterialButton(
                "View metadata",
                "description",
                styles["icon-small"],
            ),
        ),
    ],
    rightButtonList: [
        createButtonListItem(
            createMaterialButton("Edit content", "edit", styles["icon-small"]),
        ),
        createButtonListItem(
            createMaterialButton(
                "Assign Author",
                "assignment_ind",
                styles["icon-small"],
            ),
        ),
        createButtonListItem(
            createMaterialButton(
                "Copy citation",
                "content_copy",
                styles["icon-small"],
            ),
        ),
        createButtonListItem(
            createMaterialButton(
                "Add to current reading list",
                "library_add",
                styles["icon-small"],
            ),
        ),
        createButtonListItem(
            createMaterialButton("Close window", "close", styles["icon-small"]),
        ),
    ],
    titleText: "Untitled",
    onTitleChange,
    titleIsEditable: false,
    paneHeaderClassName: styles["middle-pane-v1-story-root"],
    titleClassName: styles["middle-v1-title"],
    leftListClassName: styles["middle-v1-left-list"],
    rightListClassName: styles["middle-v1-right-list"],
};
