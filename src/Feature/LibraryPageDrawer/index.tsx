import clsx from "clsx";
import React, { useState, type ReactNode, type FC } from "react";
import styles from "./index.module.scss";
import Button from "Components/Button";
import Toast from "Components/Toast";

export interface IdrawerName {
    name: string;
    className: string;
}
export interface ILibraryDrawer {
    open: boolean;
    drawerClass?: string;
    handleClose: () => void;
    handleOpen: () => void;
    drawerName: IdrawerName[];
    children?: ReactNode;
}

export interface IdrawerHeaderActionList {
    name: string;
    tooltip?: string;
    className: string;
    handleClick?: () => void;
}

export const LibraryPageDrawer: FC<ILibraryDrawer> = ({
    open,
    drawerClass,
    handleClose,
    handleOpen,
    drawerName,
    children,
}) => {
    const [showToast, setShowToast] = useState<boolean>(false);
   
    const clipboard = () => {
        void navigator.clipboard.writeText(
            "ICC Statute, adopted 1997-07-17, PURL:http://www.legal-tools.org/doc/7b9af9",
        );
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 500);
    };

    const drawerHeaderActionList: IdrawerHeaderActionList[] = [
        {
            name: "content_copy",
            className: "copy",
            tooltip: "Copy citation",
            handleClick: clipboard,
        },
        {
            name: "close",
            className: "close",
            handleClick: handleClose,
        },
    ];

    const cls = clsx({
        [styles.drawerClose]: !open,
        
    });

    const clsButton = clsx({
        [ styles.drawerButton]: open,
    });

    return (
        <>
            <div className={`${styles.LecturePageDrawer} ${cls}`}>
                <ul className={styles["menu-header"]}>
                    {drawerHeaderActionList.map((list, index) => (
                        <li
                            key={index}
                            className={` ${styles.list} ${
                                styles[list.className]
                            }`}
                            onClick={list.handleClick}
                        >
                            <Button
                                tooltip={list.tooltip}
                                className="material-icons"
                            >
                                {list.name}
                            </Button>
                        </li>
                    ))}
                </ul>
                <div className={drawerClass}>{children}</div>
            </div>

            <ul className={`${styles["library-drawer"]} ${clsButton}`}>
                {drawerName.map((drawer, index) => (
                    <li
                        className={`${styles.list} ${
                            styles[drawer.className]
                        }`}
                        onClick={handleOpen}
                        key={index}
                    >
                        <div className={styles.drawername}>
                            {drawer.name}
                        </div>
                    </li>
                ))}
            </ul>

            {showToast && (
                <Toast text="Citation Copied!" position="top-right" />
            )}
        </>
    );
};
