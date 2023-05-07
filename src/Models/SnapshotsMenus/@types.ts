export interface INode {
    nodeType: string;
    text: string;
    _id: string;
    item_slug: string;
    children: INode[];
    isHidden?: boolean;
}

export interface SnapshotsMenus {
    type: string;
    created: Date;
    id: string;
    children: INode[];
    updated: Date;
}
export interface IParams {
    filter: {
        where: {
            type: string;
        };
    };
}

export type NodeTab =
    | "isInCaseLaw"
    | "isInCommentary"
    | "isInElementsOfCrime"
    | "isInElementsOfCrimeDigest"
    | "isInMeansOfProofDigest"
    | "isInPreparatoryWork"
    | "isInRomeStatute"
    | "isInVideo";

export type EditNodeTabs = Record<NodeTab, boolean>;

export interface EditMenuNode
    extends Omit<INode, "children">,
    EditNodeTabs {
    children: EditMenuNode[];
}

export interface EditNodeItem
    extends Pick<INode, "_id" | "nodeType">,
    EditNodeTabs {
    childCount: number;
    name: string;
}

export interface EditNodeTabListPayload {
    item: EditNodeItem;
    selectionPath: string[];
    itemId: string;
}

export interface EditNodeTextPayload {
    selectionPath: string[];
    itemId: string;
    language: string;
    menuType: string;
    text: string;
}
