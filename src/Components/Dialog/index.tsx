import clsx from "clsx";

import { type FC, type PropsWithChildren } from "react";
import {
    BTN_POSITIONS,
    COLOR_VARIANTS,
    type DialogBgColor,
    type ScreenPosition,
} from "./constants";
import styles from "./index.module.scss";
import Button from "Components/Button/index";

export interface DialogProps {
    open: boolean;
    onClose: () => void;
    isCloseBtnVisible?: boolean;
    closeBtnPosition?: ScreenPosition;
    closeBtnStyle?: string;
    modalWrapperClass?: string;
    dialogBgColor?: DialogBgColor;
    isOverFlow?: boolean;
}

const Dialog: FC<PropsWithChildren<DialogProps>> = ({
    open,
    onClose,
    isCloseBtnVisible = true,
    closeBtnPosition = "default",
    dialogBgColor = "default",
    isOverFlow = false,
    closeBtnStyle = "",
    modalWrapperClass = "",
    children,
}) => {
    const cls = clsx({ "overflowAuto": isOverFlow });
    if (!open) return null;
    return (
        <div className={`${styles.modal} ${COLOR_VARIANTS[dialogBgColor]}`}>
            <div className={`${styles.modal_wrapper} ${modalWrapperClass} ${cls}`}>
                <div className={`${styles.modal_content} modal-content`}>
                    <div
                        className={`${styles.modal_button}  close-btn 
                        ${BTN_POSITIONS[closeBtnPosition]} ${closeBtnStyle}`}
                    >
                        {isCloseBtnVisible ? (
                            <Button variant="outlined" onClick={onClose}>
                                <span className="material-icons">close</span>
                            </Button>
                        ) : null}
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Dialog;
