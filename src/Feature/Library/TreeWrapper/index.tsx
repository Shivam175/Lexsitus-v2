import { useEffect, useState, type FC } from "react";
import { type IButtonListItem } from "Components/PaneHeader";
import { type nodeUiType, type MenuTreeProps } from "Feature/MenuTree/@types";
import MenuTreePane, { type MenuTreePaneProps } from "Feature/MenuTreePane";
import useAsyncTask from "Hooks/useAsyncTask";
import SnapshotMenusModel from "Models/SnapshotsMenus";
import { type INode, type SnapshotsMenus } from "Models/SnapshotsMenus/@types";
import { logger } from "utils/logger";

export interface TreeWrapperProps extends Omit<MenuTreeProps, "nodes"> {
    treeType: string;
    tabPath?: string;
    nodeUI?: nodeUiType;
    titleText?: string;
    paneHeaderClass?: string;
    rightButtonList?: IButtonListItem[];
    treeRootClass?: string;
    populatedNodeId?: string;
}

const TreeWrapper: FC<TreeWrapperProps> = ({
    treeType,
    useParentSlug = false,
    nodeUI = "LINK",
    isEachFirstExpanded = true,
    titleText = "MENU",
    ...props
}) => {
    const [tree, setTree] = useState<INode[]>([]);

    const snapshotsMenusData = useAsyncTask<string[], SnapshotsMenus[]>(
        async (value) => {
            try {
                const data = await SnapshotMenusModel.getSnapshotMenu(value);
                return data;
            } catch (error: unknown) {
                logger.error(error);
            }
        }
    );

    const fetchTreeData = async () => {
        const data = await snapshotsMenusData.run(treeType);

        if (data) {
            const { children } = data[0];
            setTree(children);
        }
    };

    useEffect(() => {
        fetchTreeData().catch((err) => {
            logger.log(err);
        });
    }, [treeType]);

    const menuTreeProps: MenuTreePaneProps = {
        nodes: tree,
        nodeUI,
        useParentSlug,
        titleText,
        isEachFirstExpanded,
        ...props
    };

    return <MenuTreePane {...menuTreeProps} />;
};

export default TreeWrapper;