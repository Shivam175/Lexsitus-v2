import Tippy from "@tippyjs/react";
import clsx from "clsx";
import React, { type FC, type PropsWithChildren, useMemo } from "react";
import "tippy.js/dist/tippy.css";
import styles from "./index.module.scss";
import Link from "Components/Link";

export type TippyPositionType =
    | "top"
    | "top-start"
    | "top-end"
    | "right"
    | "right-start"
    | "right-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end"
    | "auto"
    | "auto-start";

export interface IButtonProps {
    variant?: "contained" | "outlined" | "text";
    edge?: "rounded" | "square";
    color?: "grey" | "white" | "blue" | "transparent";
    tooltip?: string;
    link?: string;
    isExternal?: boolean;
    isPrefixLanguage?: boolean;
    tippyClass?: string;
    isArrow?: boolean;
    onClick?: () => void;
    className?: string;
    tippyDirection?: TippyPositionType;
}

const Button: FC<PropsWithChildren<IButtonProps>> = (props) => {
    const {
        variant = "text",
        edge = "square",
        color = "white",
        tooltip,
        onClick,
        link,
        isExternal = false,
        children,
        isPrefixLanguage = true,
        className,
        tippyClass,
        isArrow,
        tippyDirection = "top",
        ...buttonProps
    } = props;

    const cls = clsx(
        styles[`${variant}-${color}`],
        styles[`${edge}`],
        className
    );

    const btnRender = useMemo(() => {
        if (isExternal && link)
            return (
                <a
                    className={`${styles.anchor} ${cls}`}
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                >
                    {children}
                </a>
            );
        if (!isExternal && link)
            return (
                <Link
                    className={`${styles.link} ${cls}`}
                    to={link}
                    isPrefixLanguage={isPrefixLanguage}
                    onClick={onClick}
                    {...buttonProps}
                >
                    {children}
                </Link>
            );
        return (
            <button
                className={`${styles.btn} ${cls}`}
                onClick={onClick}
                {...buttonProps}
            >
                {children}{" "}
            </button>
        );
    }, [
        isExternal,
        link,
        cls,
        children,
        isPrefixLanguage,
        onClick,
        buttonProps,
        className,
    ]);

    if (tooltip) {
        return (
            <Tippy
                content={tooltip}
                className={tippyClass}
                arrow={isArrow}
                placement={tippyDirection}
            >
                {btnRender}
            </Tippy>
        );
    }

    return btnRender;
};

export default Button;
