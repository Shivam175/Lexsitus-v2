import clsx from "clsx";
import React, { type ReactNode, type FC } from "react";
import styles from "./index.module.scss";
import TabComponent, { type TabComponentProps } from "Components/TabComponent";
import { useCurrentLanguage } from "Hooks/useTranslation";
import { urlPathGenerator } from "utils/urlPathGenerator";

export interface ISpanListItem {
    label: string;
    className: string;
}



const tabNames = [
    { label: "Lectures", className: styles.lectures },
    { label: "CLICC", className: styles.clicc },
    { label: "Preparatory Works", className: styles["prep-works"] },
    { label: "Case Law", className: styles["case-law"] },
    {
        label: "ICC Elements of Crime",
        className: styles["elements-of-crime"],
    },
    { label: "Elements Digest", className: styles["elements-digest"] },
    {
        label: "Means of Proof Digest",
        className: styles["means-of-proof"],
    },
];
    
export const tabSpanList = () => {
    
    const spanList: ReactNode[] = [];
    tabNames.map((element: ISpanListItem ) => {
        const { label, className } = element;
        spanList.push(
            <span className={clsx(styles["library-tab-label"], className)}>
                {label}
            </span>,
        );
        return "";
    });
    return spanList;
};

const spanList: ReactNode[] = tabSpanList();

const LibraryPageTab: FC = () => {
    const { language } = useCurrentLanguage();

    const libraryTabList = [
        {
            label: spanList[0],
            path: urlPathGenerator(language, "lectures"),
            id: "lectures",
        },
        {
            label: spanList[1],
            path: urlPathGenerator(language, "clicc"),
            id: "clicc",
        },
        {
            label: spanList[2],
            path: urlPathGenerator(language, "preparatory-works"),
            id: "preparatoryWorks",
        },
        {
            label: spanList[3],
            path: urlPathGenerator( language, "case-law"),
            id: "caseLaw",
        },
        {
            label: spanList[4],
            path: urlPathGenerator(language, "elements-of-crime"),
            id: "iccElementsOfCrime",
        },
        {
            label: spanList[5],
            path: urlPathGenerator( language, "elements-digest"),
            id: "elementsDigest",
        },
        {
            label: spanList[6],
            path: urlPathGenerator( language, "means-proof-digest"),
            id: "meansOfProof",
        },
    ];
    const tabArgs: TabComponentProps = {
        currentTabId: "",
        tabList: libraryTabList,
        baseClassName: styles["lib-tab-list-item"],
        activeClassName: styles["lib-tab-list-item-active"],
    };
    return (
        <div className={styles["library-tab-root"]}>
            <div className={styles["library-page-tab-list"]}>
                <TabComponent {...tabArgs} />
            </div>
        </div>
    );
};

export default LibraryPageTab;
