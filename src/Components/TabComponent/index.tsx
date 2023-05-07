import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./TabComponent.module.scss";
import type { FC, ReactNode } from "react";
import Button, { type IButtonProps } from "Components/Button";

export interface TabInterface {
    label: string | ReactNode;
    path?: string;
    id: string;
    docType?: string;
    addFilter?: Record<string, string>;
    isHidden?: boolean;
}

export interface TabComponentProps {
    currentTabId: string;
    onTabChange?: (updatedTab: TabInterface) => void;
    onClick?: (tab: TabInterface) => void;
    tabList: TabInterface[];
    baseClassName?: string;
    activeClassName?: string;
    isPrefixLanguage?: boolean;
    notApplyActiveClassWithTabId?: string;
}

const TabComponent: FC<TabComponentProps> = ({
    currentTabId,
    onTabChange,
    tabList,
    onClick,
    notApplyActiveClassWithTabId,
    baseClassName = styles.inactive,
    activeClassName = styles.active,
    isPrefixLanguage = false,
}) => {
    const location = useLocation();
    const navigate = useNavigate();

    const [activeTabId, setActiveTabId] = useState(tabList[0].id);

    useEffect(() => {
        const tab = tabList.find((tab) => location.pathname.includes(tab?.path ?? ""));
        if (tab) {
            setActiveTabId(tab.id);
            if (onTabChange) onTabChange(tab);
        }
    }, [location.pathname]);

    useEffect(() => {
        changeTab(currentTabId);
    }, [currentTabId]);

    const onTabClick = (tab: TabInterface) => {
        setActiveTabId(tab.id);
        if (onTabChange) onTabChange(tab);
    };

    const changeTab = (id: string, key: keyof TabInterface = "id") => {
        const tab = tabList.find((tab) => tab[key] === id);
        if (tab) {
            if (tab?.path) navigate(tab?.path);
            else {
                setActiveTabId(tab.id);
                if (onTabChange) onTabChange(tab);
            }
        }
    };

    if (!tabList.length) return null;
    return (
        <ul className={styles.tab_list}>
            {tabList.map((tab: TabInterface) => {
                const { label, id, path, isHidden = false } = tab;
                const buttonProps: IButtonProps = {
                    link: path ?? "",
                    isExternal: false,
                    isPrefixLanguage,
                };
                const cls = clsx(baseClassName, {
                    [activeClassName ?? ""]: id === activeTabId,
                });

                const activeclass = (id === activeTabId && id !== notApplyActiveClassWithTabId) ? "active" : "";

                return (
                    <React.Fragment key={id}>
                        {
                            isHidden ? <></> :
                                <li className={clsx(styles.tab_list_item, tab.id, "tab-list", activeclass)}>
                                    {path ? (
                                        <Button {...buttonProps} className={cls}>
                                            {label}
                                        </Button>
                                    ) : (
                                        <Button
                                            className={clsx(styles.tab_button, cls)}
                                            onClick={() => {
                                                onClick?.(tab);
                                                onTabClick(tab);
                                            }}
                                        >
                                            {label}
                                        </Button>
                                    )}
                                </li>
                        }
                    </React.Fragment>
                );
            })}
        </ul>
    );
};

export default TabComponent;
