/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useCallback, useContext, useEffect, useState } from "react";
import EditTreeNode, { type EditTreeNodeProps } from "./index";
import { AppDialogContext, type ReducedDialogProps } from "Context/AppDialog";
import { LibraryContext } from "Feature/Library/Context";
import {
    type ReducedEditNodeTextPayload,
    type MenuTreeProps,
} from "Feature/MenuTree/@types";
import SnapshotMenusModel from "Models/SnapshotsMenus";
import {
    type EditNodeTabListPayload,
    type EditMenuNode,
} from "Models/SnapshotsMenus/@types";
import { logger } from "utils/logger";

export interface GetEditTreeProps {
    menuType: string | undefined;
    isHeading: boolean | undefined;
    editNodeItem: EditMenuNode;
    editNodeProps?: EditTreeNodeProps;
}

export interface EditNodeDialogProps
    extends Omit<GetEditTreeProps, "editNodeItem" | "editNodeProps"> {
    nodeId: string;
    menuNodeIdsList: string[];
    treeDocType?: string;
}

export interface EditNodeData extends Omit<GetEditTreeProps, "editNodeProps"> {}

const appDialogProps: ReducedDialogProps = {
    isCloseBtnVisible: false,
    dialogBgColor: "lightGrey",
    isOverFlow: true,
};

export const useEditTreeNode = () => {
    const { currentTab, currentLanguage, toggleLibraryComponentKey } =
        useContext(LibraryContext);
    const { showAppDialog, closeAppDialog } = useContext(AppDialogContext);

    const [editNodeData, setEditNodeData] = useState<EditNodeData>();

    const [editTreeProps, setEditTreeProps] = useState<MenuTreeProps>();

    const openEditNodeDialog = useCallback(
        (editTreeProps: MenuTreeProps, editNodeItem: EditMenuNode) => {
            if (editNodeItem) {
                const { text, _id } = editNodeItem;
                const editTreeNodeProps: EditTreeNodeProps = {
                    id: _id,
                    nodeText: text,
                    nodeProps: editTreeProps,
                    onClose: closeAppDialog,
                };
                const editTreeNode = <EditTreeNode {...editTreeNodeProps} />;
                showAppDialog(editTreeNode, appDialogProps);
            }
        },
        [showAppDialog, closeAppDialog]
    );

    const onEditNodeText = useCallback(
        async (payload: ReducedEditNodeTextPayload) => {
            const reqPayload = {
                ...payload,
                language: currentLanguage,
            };
            const data = await SnapshotMenusModel.editNodeText(reqPayload);
            if (data) toggleLibraryComponentKey();
        },
        [currentLanguage]
    );

    const onEditNodeTabList = async (
        payload: EditNodeTabListPayload,
        isDrawerDocType?: boolean
    ) => {
        void SnapshotMenusModel.editNodeTabList(payload).catch((err) => {
            logger.error(err);
        });
        if (isDrawerDocType) toggleLibraryComponentKey();
    };

    const handleSetEditTree = useCallback(
        ({ editNodeItem, menuType, isHeading }: GetEditTreeProps) => {
            const treeProps: MenuTreeProps = {
                nodes: [editNodeItem],
                isEditNode: false,
                nodeUI: "BUTTON",
                isFirstExpanded: true,
                isEachFirstExpanded: true,
                isEditView: true,
                isRootNode: true,
                treeDocType: menuType,
                isHeading,
                editNodeProps: {
                    onEditNodeTabList,
                    onEditNodeText,
                },
            };
            setEditTreeProps(treeProps);
        },
        [onEditNodeText]
    );

    const showEditNodeDialog = async (props: EditNodeDialogProps) => {
        const nodeData = await getEditNodeItem({
            ...props,
            treeDocType: currentTab.treeType,
        });
        if (nodeData) setEditNodeData(nodeData);
    };

    useEffect(() => {
        if (editNodeData) handleSetEditTree(editNodeData);
    }, [editNodeData]);

    useEffect(() => {
        if (editTreeProps)
            openEditNodeDialog(editTreeProps, editNodeData?.editNodeItem!);
    }, [editTreeProps]);

    return { showEditNodeDialog };
};

export const getEditNodeItem = async ({
    nodeId,
    menuNodeIdsList,
    menuType,
    isHeading,
    treeDocType,
}: EditNodeDialogProps) => {
    const treeType = menuType ?? treeDocType;
    const params = {
        filter: {
            nodeId,
            menuPath: menuNodeIdsList,
        },
        menuType: treeType,
    };
    const data = await SnapshotMenusModel.getEditableMenuNode(params);
    if (!data) return;
    return {
        editNodeItem: data,
        menuType: treeType,
        isHeading,
    };
};
