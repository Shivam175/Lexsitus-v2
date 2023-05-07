import React, { type FC, type PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";
import styles from "./index.module.scss";
import PaneHeader, { type IButtonListItem } from "Components/PaneHeader";
import { usePaneActionsList } from "Feature/Library/Tabs/Hooks/usePaneActionsList";


export interface WindowProps {
    leftButtonList?: IButtonListItem[];
    rightButtonList?: IButtonListItem[];
    headingTitle?: string;
    paneHeaderClass?: string;
    isDefaultWindowHeading?: boolean;
}

const WindowItem: FC<PropsWithChildren<WindowProps>> = ({
    children,
    leftButtonList = [],
    rightButtonList = [],
    paneHeaderClass,
    headingTitle = "",
    isDefaultWindowHeading = true,
}) => {
    const { createActionList } = usePaneActionsList();
    const defaultRightButtonList: IButtonListItem[] = [
        ...rightButtonList,
        ...createActionList([{ icon: "close" }]),
    ];
    return (
        <div className={styles.windowItem}>
            {isDefaultWindowHeading ?
                <PaneHeader
                    leftButtonList={leftButtonList}
                    rightButtonList={defaultRightButtonList}
                    titleText={headingTitle}
                    titleClassName={styles.title}
                    paneHeaderClassName={paneHeaderClass}

                /> : null
            }

            <div className={styles["window-body"]}>{children}</div>
            <Outlet />

        </div>
    );
};

export default WindowItem;
