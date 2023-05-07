import React, { type FC } from "react";
import styles from "./index.module.scss";
import TabComponent, {
    type TabComponentProps,
} from "Components/TabComponent";
import { useLocationPath } from "Hooks/useLocationPath";
import { languages } from "constants/language";


const LanguageTabs: FC = () => {
    const { changePathLanguage } = useLocationPath();

    const tabArrayAnchor = languages.map((element) => ({
        label: element.name,
        id: element.value,
        path: changePathLanguage(element.value),
    }));

    const tabProps: TabComponentProps = {
        currentTabId: "",
        tabList: tabArrayAnchor,
        baseClassName: styles["lp-tab-list-item"],
        activeClassName: styles["lp-tab-list-item-active"],
        isPrefixLanguage: false,
    };
    return (
        <div className={styles["landing-page-tab-list"]}>
            <TabComponent {...tabProps} />
        </div>
    );
};

export default LanguageTabs;
