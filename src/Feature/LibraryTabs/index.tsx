import clsx from "clsx";
import { useContext, type FC, type ReactNode } from "react";
import styles from "./index.module.scss";
import TabComponent, { type TabComponentProps } from "Components/TabComponent";
import { LibraryContext } from "Feature/Library/Context";
import { tabMapping, type TabMapping } from "Feature/Library/Context/tabMapping";
import { useCurrentLanguage } from "Hooks/useTranslation";
import { urlPathGenerator } from "utils/urlPathGenerator";

export interface LibraryTabLabelConfig {
    label: string;
    className: string;
}

const tabLabelConfigList: LibraryTabLabelConfig[] = [
    { label: "Lectures", className: styles.lectures },
    { label: "CLICC", className: styles.clicc },
    { label: "Preparatory Works", className: styles.prep_works },
    { label: "Case Law", className: styles.case_law },
    {
        label: "ICC Elements of Crime",
        className: styles.elements_of_crime,
    },
    { label: "Elements Digest", className: styles.elements_digest },
    {
        label: "Means of Proof Digest",
        className: styles.means_of_proof,
    },
];

const getTabLabelList = () =>
    tabLabelConfigList.map(({ label, className }) => (
        <span key={label} className={clsx(styles.libraryTabLabel, className)}>
            {label}
        </span>
    ));

const tabLabelList: ReactNode[] = getTabLabelList();

const LibraryTabs: FC = () => {
    const { language } = useCurrentLanguage();
    const { globalMenuNode } = useContext(LibraryContext);
    const globalNodeSlug = globalMenuNode?.slug;


    const libraryTabsList = tabMapping.map((tab: TabMapping, idx: number) => {
        const tabPath = globalNodeSlug
            ? `${tab.path}/${globalNodeSlug}`
            : tab.path;
        return {
            label: tabLabelList[idx],
            path: urlPathGenerator(language, tabPath),
            id: tab.path,
            isHidden: tab.isNavigationTabHidden ?? false,
        };
    });
    const tabProps: TabComponentProps = {
        currentTabId: "",
        tabList: libraryTabsList,
        baseClassName: styles.libraryTab,
        activeClassName: styles.libraryTabActive,
    };
    return (
        <div className={styles.libraryTabsRoot}>
            <div className={styles.libraryTabsContainer}>
                <TabComponent {...tabProps} />
            </div>
        </div>
    );
};

export default LibraryTabs;
