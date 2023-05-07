import clsx from "clsx";
import { useContext, useState, type FC } from "react";
import TextEditorWrapper from "./TextEditorWrapper";
import { panesConfig } from "./constants";
import styles from "./index.module.scss";
import Splitpane, { type SplitpaneProps } from "Components/Splitpane";
import { LibraryContext } from "Feature/Library/Context";
import ReadingListDrawer from "Feature/Library/ReadingListDrawer";
import MiddlePane from "Screens/Library/Layout/MiddlePane";

const Layout: FC = () => {
    const { menuTree, windowList, isLoggedIn, currentTab } = useContext(LibraryContext);
    const [isThirdPaneOpen, setIsThirdPaneOpen] = useState<boolean>(true);
    const toggleEditorState = () => {
        setIsThirdPaneOpen((state) => !state);
    };

    const editorWrapperProps = {
        toggleEditorState,
    };
    const cls = clsx({
        [styles.lecturesTree]: currentTab.path === "lectures",
        [styles.cliccTree]: currentTab.path === "clicc" || currentTab.path === "rpe/clicc",
        [styles.prepTree]: currentTab.path === "preparatory-works",
        [styles.caseLawTree]: currentTab.path === "case-law",
        [styles.EOC]: currentTab.path === "elements-of-crime",
        [styles.EOD]: currentTab.path === "elements-digest",
        [styles.MOPD]: currentTab.path === "means-proof-digest",
    });

    const panes = [
        {
            pane: <>{menuTree}</>,
            minSize: panesConfig.firstPane.minSize,
            maxSize: panesConfig.firstPane.maxSize,
        },
        {
            pane: (
                <>
                    <MiddlePane windowList={windowList} />
                    <ReadingListDrawer />
                </>
            ),
            minSize: panesConfig.secondPane.minSize,
            maxSize: panesConfig.secondPane.maxSize,
        },
        {
            pane: <TextEditorWrapper {...editorWrapperProps} />,
            minSize: panesConfig.thirdPane.minSize,
            maxSize: panesConfig.thirdPane.maxSize,
        },
    ];
    const bottomSpacing = isLoggedIn ? "pb-[160px]" : "pb-[35px]";
    const splitPaneProps: SplitpaneProps = {
        panes,
        className: bottomSpacing,
        paneIndexWithClass: 1,
        isThirdPaneOpen,
    };
    return <div className={cls}><Splitpane {...splitPaneProps} /></div>;
};

export default Layout;
