
import clsx from "clsx";
import React, { useState, type FC } from "react";
import PaneTitleEditor from "./PaneTitleEditor";
import styles from "./index.module.scss";
import Typography from "Components/Typography";

export interface IButtonListItem {
    Button: JSX.Element;
    onClick: () => void;
}

export interface SplitPaneHeaderProps {
    leftButtonList: IButtonListItem[];
    rightButtonList: IButtonListItem[];
    titleText: string;
    titleIsEditable?: boolean;
    onTitleChange?: (updatedTitle: string) => void;
    headerRootClassName?: string;
    paneHeaderClassName?: string;
    leftListClassName?: string;
    titleClassName?: string;
    rightListClassName?: string;
}

const SplitPaneHeader: FC<SplitPaneHeaderProps> = (props) => {
    const {
        leftButtonList: leftButtonsList,
        rightButtonList: rightButtonsList,
        titleText,
        headerRootClassName,
        paneHeaderClassName,
        leftListClassName,
        titleClassName,
        rightListClassName,
        titleIsEditable = false,
        onTitleChange,
    } = props;
    const [title, setTitle] = useState(titleText);
    const [canEdit, setCanEdit] = useState(false);
    const onCloseTitleEditor = (updatedTitle: string) => {
        setTitle(updatedTitle);
        if (onTitleChange) onTitleChange(updatedTitle);
        setCanEdit(false);
    };

    const editorArgs = {
        titleText: title,
        onClose: onCloseTitleEditor,
    };
    return (
        <div className={clsx(styles["header-root-container"], headerRootClassName)}>
            <div
                className={clsx(
                    paneHeaderClassName,
                    styles["split-pane-header-root"],
                    {
                        [styles["split-pane-header-root-default"]]:
                            !paneHeaderClassName,
                    },
                )}
            >
                <ul
                    className={clsx(
                        leftListClassName,
                        styles["left-buttons-list"],
                        {
                            [styles["left-buttons-list-default"]]:
                                !leftListClassName,
                        },
                    )}
                >
                    {leftButtonsList.map(
                        (element: IButtonListItem, idx: number) => {
                            const { Button, onClick } = element;
                            return (
                                <li
                                    key={idx}
                                    className={styles["left-buttons-list-item"]}
                                    onClick={onClick}
                                >
                                    {Button}
                                </li>
                            );
                        },
                    )}
                </ul>
                {titleIsEditable && canEdit ? (
                    <PaneTitleEditor {...editorArgs} />
                ) : (
                    <span
                        onDoubleClick={() => {
                            if (titleIsEditable) setCanEdit(true);
                        }}
                    >
                        <Typography
                            variant="h5"
                            className={clsx(
                                titleClassName,
                                styles["pane-header-title"],
                                {
                                    [styles["pane-header-title-default"]]:
                                        !titleClassName,
                                },
                            )}
                        >
                            {title}
                        </Typography>
                    </span>
                )}
                <ul
                    className={clsx(
                        rightListClassName,
                        styles["right-buttons-list"],
                        {
                            [styles["right-buttons-list-default"]]:
                                !rightListClassName,
                        },
                    )}
                >
                    {rightButtonsList.map(
                        (element: IButtonListItem, idx: number) => {
                            const { Button, onClick } = element;
                            return (
                                <li
                                    key={idx}
                                    className={styles["right-buttons-list-item"]}
                                    onClick={onClick}
                                >
                                    {Button}
                                </li>
                            );
                        },
                    )}
                </ul>
            </div>
        </div>
    );
};

export default SplitPaneHeader;
