import React, { useEffect, useState, type FC } from "react";
import PaneTitleEditor from "./PaneTitleEditor";
import Typography from "Components/Typography";


export interface IButtonListItem {
    Button: JSX.Element;
    onClick: () => void;
}

export interface PaneHeaderProps {
    leftButtonList: IButtonListItem[];
    rightButtonList: IButtonListItem[];
    titleText: string;
    titleIsEditable?: boolean;
    onTitleChange?: (updatedTitle: string) => void;
    paneHeaderClassName?: string;
    leftListClassName?: string;
    titleClassName?: string;
    rightListClassName?: string;
    isUsingColorVariants?: boolean;
}

const PaneHeader: FC<PaneHeaderProps> = (props) => {
    const {
        leftButtonList: leftButtonsList = [],
        rightButtonList: rightButtonsList = [],
        titleText,
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

    useEffect(() => {
        setTitle(titleText);
    }, [titleText]);

    const editorArgs = {
        titleText: title,
        onClose: onCloseTitleEditor,
    };


    return (
        <div
            className={"flex text-center relative text-white1 py-[5px] px-[10px] h-[26px] paneHeader"}
        >
            <ul className="flex w-[20%] justify-start leftButtonList">
                {leftButtonsList.map(
                    (element: IButtonListItem, idx: number) => {
                        const { Button, onClick } = element;
                        return (
                            <li
                                key={idx}
                                className="px-[5px]"
                                onClick={onClick}
                            >
                                {Button}
                            </li>
                        );
                    }
                )}
            </ul>
            <div className="w-[60%]">
                {titleIsEditable && canEdit ? (
                    <PaneTitleEditor {...editorArgs} />
                ) : (
                    <div
                        onDoubleClick={() => {
                            if (titleIsEditable) setCanEdit(true);
                        }}
                    >
                        <Typography
                            variant="h6"
                            className="text-white truncate overflow-hidden ..."
                        >
                            {title}
                        </Typography>
                    </div>
                )}
            </div>
            <ul className="w-[20%] flex justify-end rightButtonList">
                {rightButtonsList.map(
                    (element: IButtonListItem, idx: number) => {
                        const { Button, onClick } = element;
                        return (
                            <li
                                key={idx}
                                className="px-[5px]"
                                onClick={onClick}
                            >
                                {Button}
                            </li>
                        );
                    }
                )}
            </ul>
        </div>
    );
};

export default PaneHeader;
