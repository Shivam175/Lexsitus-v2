import clsx from "clsx";
import { type FC, type PropsWithChildren } from "react";
import styles from "./index.module.scss";
import Icons from "Components/Icons";
import { type IAvailableIcon } from "Components/Icons/@types";

export interface IconsWithTextProps {
    icon: IAvailableIcon | undefined;
    iconPos?: "right" | "left";
    className?: string;
    textClass?: string;
    text?: string;
    altText?: string;
    width?: string;
    height?: string;
}

const IconsWithText: FC<PropsWithChildren<IconsWithTextProps>> = (props) => {
    const {
        icon = "mithya-logo",
        iconPos = "left",
        text,
        altText,
        textClass,
        className,
        height,
        width,
    } = props;

    const cls = clsx(styles.iconWithtext, {
        [styles.icon_right]: iconPos === "right",
    });

    return (
        <div className={cls}>
            {icon ? (
                <Icons icon={icon} altText={altText} className={className} imageHeight={height} imageWidth={width} />
            ) : null}
            {text ? <span className={textClass}>{text}</span> : null}
        </div>
    );
};

export default IconsWithText;
