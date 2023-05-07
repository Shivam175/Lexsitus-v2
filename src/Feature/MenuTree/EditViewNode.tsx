/* eslint-disable autofix/no-unused-vars */
import clsx from "clsx";
import { type FC, type ReactNode, useEffect, useState } from "react";
import { type ReducedEditNodeTextPayload } from "./@types";
import EditNodeActions, {
    type EditNodeActionsProps,
} from "Feature/Library/EditTreeNode/EditNodeActions/index";
import { type EditMenuNode, type INode } from "Models/SnapshotsMenus/@types";
import {
    type DrawerDocType,
    DrawerDocTypeList,
} from "Screens/Library/Drawer/constants";

const menuNodeRootCls = `text-[14px] block cursor-pointer min-h-[42px] leading-[45px] px-[16px]
bg-white border-b-[1px] border-solid border-[#dddddd] my-[4px]`;

const iconCls =
    "ml-[-4px] mr-[15px] w-[16px] block text-center flex items-center";

const textCls = `float-left text-lxsBlue4 text-[12px] cursor-pointer 
leading-[23px] text-left flex items-center min-h-[45px]`;

export interface EditViewNodeProps extends EditNodeActionsProps {
    caretIcon?: ReactNode;
    onClickNode?: () => void;
    isRootContentNode?: boolean;
}

const EditViewNode: FC<EditViewNodeProps> = (props) => {
    const {
        caretIcon,
        onClickNode,
        isRootContentNode,
        onEditNodeText,
        ...nodeActionProps
    } = props;
    const { isContentNode = false, node, treeDocType } = nodeActionProps;
    const { nodeType } = node;
    const [editNode, setEditNode] = useState<INode | EditMenuNode>(node);

    useEffect(() => {
        if (node) setEditNode(node);
    }, [node]);

    const onEditText = (props: ReducedEditNodeTextPayload) => {
        const { text } = props;
        if (text !== editNode.text) {
            setEditNode({
                ...editNode,
                text,
            });
            onEditNodeText(props);
        }
    };

    const textLength = editNode.text.replace(/\s/g, "").length;

    const isDrawerDocType = DrawerDocTypeList.includes(
        treeDocType as DrawerDocType
    );
    const textClass = clsx(textCls, {
        "!text-black": nodeType === "TEXT" && isDrawerDocType,
        "!text-[16px]": isRootContentNode,
    });
    return (
        <>
            {isContentNode ? (
                <li className="py-[3px] text-[12px] w-[100%] inline-block leading-[45px]">
                    {textLength > 0 ? (
                        <span
                            className={textClass}
                            dangerouslySetInnerHTML={{ __html: editNode.text }}
                        />
                    ) : null}
                    <EditNodeActions
                        {...nodeActionProps}
                        node={editNode}
                        onEditNodeText={onEditText}
                    />
                </li>
            ) : (
                <>
                    <div
                        onClick={onClickNode}
                        className={`${menuNodeRootCls} !inline-block `}
                    >
                        <span className="flex float-left">
                            <span className={iconCls}>{caretIcon}</span>
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: editNode.text,
                                }}
                            />
                        </span>
                        <div className="float-left">
                            <EditNodeActions
                                {...nodeActionProps}
                                node={editNode}
                                onEditNodeText={onEditText}
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default EditViewNode;
