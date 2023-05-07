import { useContext, type FC } from "react";
import SearchDialogContent from "./SearchDialogContent";
import SearchDialogPrimaryHeader from "./SearchDialogPrimaryHeader";
import { DIALOG_SEARCH_TAB_NAMELIST } from "./constants";
import styles from "./index.module.scss";
import TabComponent, { type TabInterface } from "Components/TabComponent";
import { SearchDialogContext } from "Feature/Library/LibrarySearchDialog/SearchDialogContext";

const LibrarySearchDialog: FC<{ closeAppDialog: () => void }> = ({ closeAppDialog }) => {
    const {
        setCurrentTab, setSkipNumber
    } = useContext(SearchDialogContext);

    const handleOnTabClick = (tab: TabInterface) => {
        setSkipNumber(0);
        setCurrentTab(tab);
    };

    return (
        <div className={styles.searchDiv}>
            <SearchDialogPrimaryHeader />
            <TabComponent
                currentTabId=""
                tabList={DIALOG_SEARCH_TAB_NAMELIST}
                onClick={handleOnTabClick}
                notApplyActiveClassWithTabId="all_results"
            />
            <SearchDialogContent closeAppDialog={closeAppDialog} />
        </div>
    );
};

export default LibrarySearchDialog;
