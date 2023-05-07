import clsx from "clsx";
import { useEffect, useState, type FC } from "react";
import { NODE_TAB_MAPPING } from "./constants";
import { useShowConfirmationDialog } from "./useShowConfirmationDialog";
import { useShowTextEditor } from "./useShowTextEditor";
import { getNodeTabList, getOrderedKeys, stripParagraphTags } from "./utils";
import Button from "Components/Button";
import { type ReducedEditNodeTextPayload } from "Feature/MenuTree/@types";
import {
    type EditNodeTabListPayload,
    type NodeTab,
    type INode,
    type EditNodeTabs,
    type EditMenuNode,
} from "Models/SnapshotsMenus/@types";
import { stopPropagation } from "utils/stopEventPropagation";

export interface EditNodeActionsProps {
    node: INode | EditMenuNode;
    ancestorMenuNodeIds: string[];
    onEditNodeTabList: (payload: EditNodeTabListPayload, isDrawerDocType?: boolean) => void;
    onEditNodeText: (payload: ReducedEditNodeTextPayload) => void;
    treeDocType: string;
    isContentNode?: boolean;
}

const rootCls = "leading-[45px] pl-[18px] flex flex-row text-[14px]";

const btnCls = `text-[10px] py-[3px] px-[7px] text-black leading-[18px] 
!rounded-[15px] bg-grey7`;

const editIconCls = `w-[32px] text-[25px] leading-[48px] block text-center block 
text-black`;

const EditNodeActions: FC<EditNodeActionsProps> = ({
    node,
    ancestorMenuNodeIds,
    onEditNodeText,
    onEditNodeTabList,
    isContentNode = false,
    treeDocType,
}) => {
    const { text, _id, nodeType, children = [], ...editNodeParams } = node;

    const nodeTabList = getNodeTabList(
        editNodeParams as EditNodeTabs,
        nodeType
    );

    const [tabList, setTabList] = useState<EditNodeTabs>(nodeTabList);

    const { showConfirmationDialog, msgDialog, closeConfirmationDialog } =
        useShowConfirmationDialog();

    const { showTextEditor, textEditor } = useShowTextEditor();

    const handleEditNodeTabList = (tab: NodeTab) => {
        const updatedTabList = { ...tabList };
        updatedTabList[tab] = !tabList[tab];
        const editNodeTabListProps: EditNodeTabListPayload = {
            itemId: _id,
            item: {
                childCount: children.length,
                name: text,
                nodeType,
                _id,
                ...updatedTabList,
            },
            selectionPath: ancestorMenuNodeIds,
        };
        const isDrawerDocType = tab === "isInRomeStatute";
        onEditNodeTabList(editNodeTabListProps, isDrawerDocType);
        setTabList(updatedTabList);
    };

    const handleEditNodeText = (text: string) => {
        const filteredText = stripParagraphTags(text);
        const editNodePayload: ReducedEditNodeTextPayload = {
            selectionPath: ancestorMenuNodeIds,
            text: filteredText,
            itemId: _id,
            menuType: treeDocType,
        };
        onEditNodeText(editNodePayload);
    };

    useEffect(() => {
        if (nodeTabList) setTabList(nodeTabList);
    }, [node]);

    const textLength = text.replace(/\s/g, "").length;

    const tabListKeys: NodeTab[] = getOrderedKeys(
        Object.keys(tabList) as NodeTab[]
    );

    const rootClass = clsx(rootCls, {
        "!ml-0": textLength < 1,
        "!ml-0 inline-flex": isContentNode && tabListKeys.length > 0,
        "float-left": true,
    });

    return (
        <ul className={rootClass}>
            <li className="w-[30px] cursor-pointer">
                <Button
                    onClick={(event?: any) => {
                        stopPropagation(event);
                        showTextEditor(text, handleEditNodeText);
                    }}
                    className={`material-icons ${editIconCls}`}
                >
                    edit
                </Button>
            </li>
            <li className="inline-block cursor-pointer">
                <ul className="pl-0">
                    {tabListKeys.map((tab, idx) => {
                        const val = tabList[tab];
                        const btnClass = clsx(btnCls, {
                            [`!text-white ${NODE_TAB_MAPPING[tab].color}`]: val,
                        });
                        return (
                            <li
                                className="w-auto inline-block mx-[3px]"
                                key={idx}
                            >
                                <Button
                                    variant="contained"
                                    edge="rounded"
                                    color="transparent"
                                    className={btnClass}
                                    onClick={(event?: any) => {
                                        stopPropagation(event);
                                        showConfirmationDialog(
                                            tab,
                                            handleEditNodeTabList
                                        );
                                    }}
                                >
                                    {NODE_TAB_MAPPING[tab].text}
                                </Button>
                            </li>
                        );
                    })}
                </ul>
            </li>
            <span
                onClick={(e?: any) => {
                    stopPropagation(e, closeConfirmationDialog);
                }}
            >
                {msgDialog}
                {textEditor}
            </span>
        </ul>
    );
};

export default EditNodeActions;
