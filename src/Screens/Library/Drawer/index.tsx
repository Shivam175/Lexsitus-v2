import clsx from "clsx";
import React, { useContext, useEffect, useState, type FC } from "react";
import {
    type GlobalDrawerProps,
    type DrawerProps,
    type DrawerButtonProps,
} from "./@types";
import {
    CITATION_TEXT,
    type DrawerDocType,
    LIBRARY_DRAWER_NAME,
    ROME_STATUTE_PRE_NAV_ICONS_LIST,
    RPE_PRE_NAV_ICONS_LIST,
} from "./constants";
import styles from "./index.module.scss";
import Button from "Components/Button";
import { ToastContext } from "Context/Toast";
import { LibraryContext } from "Feature/Library/Context";
import { useEditTreeNode } from "Feature/Library/EditTreeNode/useEditTreeNode";
import MenuTree from "Feature/MenuTree";
import useAsyncTask from "Hooks/useAsyncTask";
import SnapshotMenusModel from "Models/SnapshotsMenus";
import { type INode, type SnapshotsMenus } from "Models/SnapshotsMenus/@types";
import PreNavActions from "Screens/Library/PreNavAction";
import { writeTextOnClipBoard } from "utils/clipboard";
import { logger } from "utils/logger";
import "react-toastify/dist/ReactToastify.css";

const DRAWER_HEADER_ACTION_LIST = [
    {
        name: "content_copy",
        tooltip: "Copy citation",
        id: "citation-button",
    },
    {
        name: "close",
        id: "close-button",
    },
];

const DrawerButton: FC<DrawerButtonProps> = ({ isDrawerOpen, onClick }) => {
    const cls = clsx("drawer-buttons", {
        [styles.buttons_container]: isDrawerOpen,
    });

    return (
        <div className={cls}>
            {LIBRARY_DRAWER_NAME.map((list) => (
                <div
                    className={clsx("button-root-container", list.className)}
                    key={list.id}
                    onClick={() => {
                        onClick(list.id);
                    }}
                >
                    <div className="button-div">{list.name}</div>
                </div>
            ))}
        </div>
    );
};

const Drawer: FC<DrawerProps> = ({
    isDrawerOpen,
    treeData,
    onClickPrep,
    preNavIconsLIST,
    onPopulateTabs,
    toggleDrawer,
    drawerDocType,
}) => {
    const cls = clsx("drawer-container", {
        [styles.drawer]: !isDrawerOpen,
    });

    const { showToast } = useContext(ToastContext);
    const { isAdmin } = useContext(LibraryContext);
    const { showEditNodeDialog } = useEditTreeNode();

    const handleDrawerActions = (id: string) => {
        if (id === "citation-button") {
            writeTextOnClipBoard(CITATION_TEXT);
            showToast({ message: "Citation copied!" });
        } else {
            toggleDrawer();
        }
    };

    const handlePopulateTabs = (value: { id: string; slug: string }) => {
        toggleDrawer();
        showToast({ message: "All tabs populated", position: "top-left" });
        onPopulateTabs(value);
    };

    return (
        <div className={cls}>
            <ul className="drawer-header">
                {DRAWER_HEADER_ACTION_LIST.map((list) => (
                    <li key={list.id} className="p-2">
                        <Button
                            tooltip={list.tooltip}
                            tippyDirection="bottom"
                            isArrow={false}
                            tippyClass="rounded-2xl"
                            className="material-icons"
                            onClick={() => {
                                handleDrawerActions(list.id);
                            }}
                        >
                            {list.name}
                        </Button>
                    </li>
                ))}
            </ul>
            <div className="global-tree-container">
                <MenuTree
                    isEachFirstExpanded
                    nodes={treeData}
                    isFirstExpanded={true}
                    getPreNavAction={(node: INode) => (
                        <PreNavActions
                            node={node}
                            actionList={preNavIconsLIST}
                            onClickPrep={onClickPrep}
                            onPopulateTabs={handlePopulateTabs}
                        />
                    )}
                    nodeUI="BUTTON"
                    isFirstNodeClickable={false}
                    isEditNode={isAdmin}
                    onEditTreeNode={showEditNodeDialog}
                    treeDocType={drawerDocType}
                    isRootNode={true}
                />
            </div>
        </div>
    );
};

const GlobalDrawer: FC<GlobalDrawerProps> = (props) => {
    const { onClickPrep, onPopulateTabs } = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [menuTreeData, setMenuData] = useState<INode[]>([]);
    const [drawerDocType, setDrawerDocType] =
        useState<DrawerDocType>("RomeStatute");

    const snapshotsMenusData = useAsyncTask<string[], SnapshotsMenus[]>(
        async (value) => {
            try {
                return await SnapshotMenusModel.getSnapshotMenu(value);
            } catch (error: unknown) {
                logger.error(error);
            }
        }
    );

    const preNavIconsList =
        drawerDocType === "rpe"
            ? RPE_PRE_NAV_ICONS_LIST
            : ROME_STATUTE_PRE_NAV_ICONS_LIST;

    const fetchTreeData = async () => {
        const DrawerTreeData = await snapshotsMenusData.run(drawerDocType);

        if (DrawerTreeData?.[0]?.children) {
            setMenuData(DrawerTreeData[0].children);
        }
    };

    useEffect(() => {
        fetchTreeData().catch((err) => {
            logger.log(err);
        });
    }, [drawerDocType]);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    const handleDrawerButtonClick = (id: DrawerDocType) => {
        toggleDrawer();
        setDrawerDocType(id);
    };

    return (
        <div className={styles["library-drawer"]}>
            <DrawerButton
                onClick={handleDrawerButtonClick}
                isDrawerOpen={isOpen}
            />
            <Drawer
                treeData={menuTreeData}
                isDrawerOpen={isOpen}
                onClickPrep={onClickPrep}
                onPopulateTabs={onPopulateTabs}
                preNavIconsLIST={preNavIconsList}
                toggleDrawer={toggleDrawer}
                drawerDocType={drawerDocType}
            />
        </div>
    );
};

export default GlobalDrawer;
