import clsx from "clsx";
import React, { type FC, type PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.scss";

export interface TypographyProps {
    variant?:
    "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "small"
    | "caption"
    | "body";
    tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
    link?: string;
    isExternal?: boolean;
    className?: string;
}

const Typography: FC<PropsWithChildren<TypographyProps>> = (props) => {
    const { variant, tag = "p", link, isExternal, children, className } = props;

    const renderElement = () => {
        let _tag = tag ?? "p";
        const _variant = variant ? variant : "body";
        if (link) {
            if (isExternal)
                return (
                    <a href={link} className={clsx(className, styles.a)} target="_blank" rel="noreferrer">
                        {children}
                    </a>
                );
            return <Link className={className} to={link}>{children}</Link>;
        }

        if (_tag === "span")
            return <span className={clsx(className, styles.span)}>{children}</span>;
        
        if (!tag) {
            if (
                !(
                    _variant === "body" ||
                        _variant === "caption" ||
                        _variant === "small"
                )
            // If tag is undefined and the variant is other than body|caption|small, then
            // we keep tag same as variant, otherwise default value of tag is <p>.
            )
                _tag = _variant;
        }

        return React.createElement(
            _tag,
            {
                className: clsx( className, styles[_variant]),
            },
            children,
        );
        
    };

    return renderElement();
};

export default Typography;