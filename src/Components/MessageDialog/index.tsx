import clsx from "clsx";
import React, { type FC } from "react";
import ClickAwayListener from "react-click-away-listener";
import styles from "./index.module.scss";
import Button from "Components/Button";
import Typography from "Components/Typography";
import { stopPropagation } from "utils/stopEventPropagation";

export interface MessageDialogProps {
    heading: string;
    message: string;
    dialogOpen: boolean;
    handleDialogClose: () => void;
    acceptBtnText?: string;
    acceptBtnLink?: string;
    acceptBtnClassName?: string;
    closeBtnText?: string;
    closeBtnClassName?: string;
    handleAcceptClick?: () => void;
    isCloseOnClickAway?: boolean;
}

// TODO rethink
/**
 * heading
 * message
 * actions [<Button>Ok</Button>, <Button>Close</Button>]
 * acceptButtonText // default text Ok, default action close
 * onAcceptClick // Handle accept click
 * @param param0
 * @returns
 */
const MessageDialog: FC<MessageDialogProps> = ({
    heading,
    message,
    handleDialogClose,
    dialogOpen,
    acceptBtnText = "OK",
    acceptBtnLink,
    acceptBtnClassName = styles.defaultBtn,
    closeBtnText,
    closeBtnClassName = styles.defaultBtn,
    handleAcceptClick,
    isCloseOnClickAway = true,
}) => {
    if (dialogOpen) {
        return (
            <div className={styles["dialog-root-theme"]}>
                <ClickAwayListener onClickAway={handleDialogClose}>
                    <div
                        className={styles["dialog-root"]}
                        onClick={(e?: any) => {
                            if (!isCloseOnClickAway) stopPropagation(e);
                        }}
                    >
                        <Typography
                            tag="h3"
                            className={styles["msg-dialog-heading"]}
                        >
                            {heading}
                        </Typography>
                        <Typography
                            tag="h5"
                            className={styles["msg-dialog-body"]}
                        >
                            {message}
                        </Typography>
                        <div className={styles["btn-container"]}>
                            <div className={styles["right-align-btn"]}>
                                {closeBtnText ? (
                                    <Button
                                        onClick={(event?: any) => {
                                            stopPropagation(
                                                event,
                                                handleDialogClose
                                            ); 
                                        }
                                        }
                                        className={clsx(
                                            closeBtnClassName,
                                            "mr-[5px]"
                                        )}
                                    >
                                        {closeBtnText}
                                    </Button>
                                ) : null}
                                <Button
                                    link={acceptBtnLink}
                                    onClick={(event?: any) => {
                                        if (!acceptBtnLink)
                                            stopPropagation(event);
                                        handleAcceptClick?.();
                                        handleDialogClose();
                                    }}
                                    className={acceptBtnClassName}
                                >
                                    {acceptBtnText}
                                </Button>
                            </div>
                        </div>
                        <Button
                            onClick={(event?: any) => {
                                stopPropagation(event, handleDialogClose); 
                            }
                            }
                            className={styles["cross-btn"]}
                        />
                    </div>
                </ClickAwayListener>
            </div>
        );
    }

    return null;
};

export default MessageDialog;
