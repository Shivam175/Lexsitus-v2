import React, { type FC } from "react";
import { type IMenuProps } from "./@types";
import UserDropdown from "./UserDropdown";
import styles from "./index.module.scss";
import Button from "Components/Button";

import { type IAvailableIcon } from "Components/Icons/@types";
import IconsWithText from "Components/IconsWithText";
import ReportIssueButton from "Feature/ReportIssue/ReportIssueButton";


const reportIssueArgs = {
    icon: "home-top-right-report" as IAvailableIcon,
    tooltip: "Report an issue",
};



const navigationMenus: IMenuProps[] = [
    {
        icon: "home-top-right-home",
        tooltip: "Home",
        url: "/",
        className: "home",
        id:1,
    },
    {
        icon: "home-top-right-report",
        tooltip: "Report an issue",
        className: "report",
        id:2,
        component: <ReportIssueButton {...reportIssueArgs} />,

    },
    {
        icon: "homepage-icons-tutorials",
        tooltip: "Go to Lexitus tutorials",
        url: "/help",
        id:3,
        className: "tutorials",
    },
    {
        className: "account",
        component: <UserDropdown/>,
        id:4,
    },
];

const RightHeader: FC = () => (
    <ul className={styles["right-header"]}>
        {navigationMenus.map((list, index) => (
            <li
                key={index}
                className={`${styles["list-item"]} ${
                    styles[list.className]
                }`}
            >
                {list.component ?? (
                    <Button
                        tooltip={list.tooltip}
                        link={list.url}
                        className={styles["list-item-button"]}
                    >
                        <IconsWithText
                            icon={list.icon}
                            className={styles["list-item-icon"]}
                        />
                    </Button>
                )}
            </li>
        ))}
    </ul>
);

export default RightHeader;