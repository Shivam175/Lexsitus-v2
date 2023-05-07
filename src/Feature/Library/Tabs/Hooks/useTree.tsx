import { useContext, useEffect, useMemo } from "react";
import { usePaneActionsList } from "./usePaneActionsList";
import { LibraryContext } from "Feature/Library/Context";
import { useEditTreeNode } from "Feature/Library/EditTreeNode/useEditTreeNode";
import { type WindowButtonListProps } from "Feature/Library/Tabs/Hooks/useCreateWindow";
import { addHandlerInActionList } from "Feature/Library/Tabs/utils";
import TreeWrapper, {
    type TreeWrapperProps,
} from "Feature/Library/TreeWrapper/";

interface Props {
    onMenuTreePaneHandler?: (id: string) => void;
    rightButtonList?: WindowButtonListProps[];
    useParentSlug?: boolean;
    useParentSlugForLeafNodes?: boolean;
    titleText?: string;
    isShallowTree?: boolean;
    isEditNode?: boolean;
}

export const useTree = (props: Props) => {
    const { currentTab, setMenuTree, handleAuthAction, tabPopulatedNode, isAdmin } = useContext(LibraryContext);
    const {
        onMenuTreePaneHandler,
        rightButtonList,
        useParentSlug = true,
        titleText,
        useParentSlugForLeafNodes = true,
        isShallowTree = false,
        isEditNode = true,
    } = props;
    const { createActionList } = usePaneActionsList();
    const { showEditNodeDialog } = useEditTreeNode();

    const isTreePopulated = tabPopulatedNode.docType === currentTab.docType;
    const populatedNodeId = isTreePopulated ? tabPopulatedNode.id : "";

    const treeWrapperProps: TreeWrapperProps = {
        treeType: currentTab?.treeType ?? "",
        tabPath: currentTab?.path ?? "",
        useParentSlug,
        populatedNodeId,
        paneHeaderClass: currentTab.themeColor,
        isShallowTree,
        isEditNode: isEditNode && isAdmin,
        onEditTreeNode: showEditNodeDialog,
        isRootNode: true,
        titleText,
        useParentSlugForLeafNodes,
        rightButtonList: createActionList(
            addHandlerInActionList({
                buttonList: rightButtonList ?? [],
                onActionHandler: onMenuTreePaneHandler,
                handleAuthAction,
            })
        ),
    };

    const tree = useMemo(
        () => <TreeWrapper {...treeWrapperProps} />,
        [currentTab.treeType, populatedNodeId, isAdmin]
    );

    useEffect(() => {
        setMenuTree(tree);
    }, [tree]);
};