import React, { type ReactNode, type FC } from "react";
import {
    type HoverThemeColor,
    IconThemeVariants,
    ListThemeVariants,
    listHeadingClass,
    titleClass,
    listContentClass,
} from "./constants";
import styles from "./index.module.scss";
import Button from "Components/Button";
import NativeNavLink from "Components/NativeNavLink";

export interface ListItem {
    title: string;
    link?: string;
}

export interface IconListProps {
    list: ListItem[];
    listHeading?: string;
    icon?: ReactNode;
    themeColor?: HoverThemeColor;
    isUsingLink?: boolean;
    onClick?: (title: string) => void;
}

const IconList: FC<IconListProps> = ({
    list,
    listHeading = "",
    icon = "",
    themeColor = "default",
    isUsingLink = true,
    onClick,
}) => {
    const handleClick = (title: string) => {
        if (onClick) onClick(title);
    };

    return (
        <ul>
            <li className={listHeadingClass}>{listHeading}</li>
            {list.map(({ title, link = "" }, idx) => (
                <li
                    key={idx}
                    className={`${ListThemeVariants[themeColor]} ${styles.listItem}`}
                >
                    {isUsingLink ? (
                        <NativeNavLink
                            to={`/${link}`}
                            onClick={() => {
                                handleClick(title);
                            }}
                            className={titleClass}
                        >
                            <span className={listContentClass}>
                                <span className={IconThemeVariants[themeColor]}>
                                    {icon}
                                </span>
                                {title}
                            </span>
                        </NativeNavLink>
                    ) : (
                        <Button
                            onClick={() => {
                                handleClick(title);
                            }}
                            className={titleClass}
                            color="transparent"
                        >
                            <span className={listContentClass}>
                                <span className={IconThemeVariants[themeColor]}>
                                    {icon}
                                </span>
                                {title}
                            </span>
                        </Button>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default IconList;
