import clsx from "clsx";
import React, { type FC } from "react";
import styles from "./index.module.scss";
import Typography from "Components/Typography";

export type ToastPositionType = 
"top-right"
| "top-left"
| "bottom-right"
| "bottom-left";

export interface ToastProps {
    text: string;
    className?: string;
    position: ToastPositionType;
}

const Toast: FC<ToastProps> = ({ text, position = "top-right", className }) => {
    const cls = clsx(
        className,
        styles[`${position}`],
        styles["toast-container"]
    );

    return (
        <div className={cls}>
            <div className={styles.toast}>
                <Typography className={styles["toast-text"]}>{text}</Typography>
            </div>
        </div>
    );
};

export default Toast;
