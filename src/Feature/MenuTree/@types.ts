import { type ReactNode } from "react";
import { type EditNodeDialogProps } from "Feature/Library/EditTreeNode/useEditTreeNode";
import {
    type EditNodeTabListPayload,
    type EditNodeTextPayload,
    type EditMenuNode,
    type INode,
} from "Models/SnapshotsMenus/@types";

/* eslint-disable @typescript-eslint/naming-convention */

export type nodeUiType = "BUTTON" | "LINK";

export interface NodeOptionProps {
    getPreNavAction?: (node: INode) => JSX.Element;
    nodeUI?: nodeUiType;
    parentSlug?: string;
    useParentSlug?: boolean;
    populatedNodeId?: string;
    isShallowTree?: boolean;
    pathSlug?: string;
    useParentSlugForLeafNodes?: boolean;
    isEditNode?: boolean;
    ancestorMenuNodeIds?: string[];
    onEditTreeNode?: (props: EditNodeDialogProps) => Promise<void>;
    isEditView?: boolean;
    editNodeProps?: EditNodeProps;
    treeDocType?: string;
    isHeading?: boolean;
    isRootNode?: boolean;
    rootNodesList?: INode[];
}
export interface NodeProps extends NodeOptionProps {
    node: INode | EditMenuNode;
    isExpanded?: boolean;
    setExpandedNodeId: (id: string) => void;
    isHeadingClickable?: boolean;
    icon?: ReactNode;
    onEditNode?: () => void;
}
export interface MenuTreeProps extends NodeOptionProps {
    nodes: INode[] | EditMenuNode[];
    treeRootClass?: string;
    isEachFirstExpanded?: boolean;
    isFirstExpanded?: boolean;
    isDraggable?: boolean;
    isFirstNodeClickable?: boolean;
    treeType?: string;
}

export interface NodeTextProps {
    text: string;
    nodeUI?: nodeUiType;
    slug: string;
    parentSlug?: string;
    className?: string;
    useParentSlug?: boolean;
    children?: INode[];
    isEditNode?: boolean;
    onEditNode?: () => void;
}

export interface MenuNodeContentProps extends NodeProps {
    icon?: ReactNode;
}

export type ReducedEditNodeTextPayload = Omit<
EditNodeTextPayload,
"language"
>;

export interface EditNodeProps {
    onEditNodeTabList: (payload: EditNodeTabListPayload, isDrawerDocType?: boolean) => void;
    onEditNodeText: (payload: ReducedEditNodeTextPayload) => void;
}
