/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/naming-convention */
import clsx from "clsx";
import React, { useEffect, useRef, useState, type ReactNode } from "react";
import { type NodeProps, type NodeTextProps } from "./@types";
import EditViewNode, { type EditViewNodeProps } from "./EditViewNode";
import { EditNode } from "./helper";
import styles from "./index.module.scss";
import { ArrowIcon } from "./menuTreeIcons";
import { useNodePath } from "./useNodePath";
import MenuTree from "./index";
import Button from "Components/Button";
import { logger } from "utils/logger";

const NodeText: React.FC<NodeTextProps> = (props) => {
    const {
        text,
        nodeUI = "LINK",
        slug,
        children = [],
        className,
        parentSlug = "",
        useParentSlug = false,
        isEditNode = true,
        onEditNode = () => {},
    } = props;

    const useParentSlugFlag = useParentSlug && children.length === 0;
    const textUnderline =
        children.length === 0 ? "hover:underline text-left" : null;
    const path = useNodePath(useParentSlugFlag, parentSlug, slug);
    const link = nodeUI === "LINK" ? path : "";
    const textLength = text.replace(/\s/g, "").length;

    return textLength > 0 ? (
        <Button
            className={clsx(textUnderline, className, "relative")}
            link={link}
        >
            <EditNode isEditNode={isEditNode} onClick={onEditNode} />
            <span dangerouslySetInnerHTML={{ __html: text }} />
        </Button>
    ) : null;
};

export const TextNode: React.FC<NodeProps> = ({ node }) => (
    <div
        className="text-node"
        dangerouslySetInnerHTML={{ __html: node.text }}
    />
);

export const ContentNode: React.FC<NodeProps> = ({ node, ...restProps }) => {
    const { item_slug } = node;
    return (
        <NodeText
            slug={item_slug}
            className="hover:underline text-left text-xs pl-5 my-1 content-node"
            {...node}
            {...restProps}
        />
    );
};

const MenuNodeContent: React.FC<NodeProps> = ({
    node,
    icon,
    getPreNavAction,
    ...restProps
}) => {
    const { item_slug, children = [], text } = node;

    const cls = clsx("flex", "contentNode", "preNav");

    return (
        <div className={cls}>
            {getPreNavAction?.(node)}
            {icon ? <span>{icon}</span> : null}
            <NodeText
                text={text}
                children={children}
                slug={item_slug}
                className="text-left text-xs menu-node-text"
                {...restProps}
            />
        </div>
    );
};

export const MenuNode: React.FC<NodeProps> = (props) => {
    const {
        node,
        isHeading,
        isExpanded,
        nodeUI,
        getPreNavAction,
        setExpandedNodeId,
        isHeadingClickable,
        populatedNodeId,
        isShallowTree,
        useParentSlugForLeafNodes,
        onEditTreeNode,
        isEditView = false,
        editNodeProps,
        isEditNode = true,
        treeDocType,
        isRootNode = false,
        ...restProps
    } = props;

    const { ancestorMenuNodeIds = [] } = props;

    const { text, item_slug, _id, nodeType, ...rest } = node;

    let { children = [] } = rest;

    let menuNodeProps = props;

    if (children.length === 1 && children[0]?.nodeType === "CONTENT") {
        const childSlug = children[0].item_slug;
        const singleChildNodeProps: NodeProps = {
            ...props,
            node: {
                ...node,
                item_slug: useParentSlugForLeafNodes
                    ? `${item_slug}/${childSlug}`
                    : item_slug,
            },
        };
        menuNodeProps = singleChildNodeProps;
    }

    if (isShallowTree) {
        if (isHeading) {
            children = children.filter((node) => node.nodeType === "MENU");
            children.unshift(node);
        } else if (nodeType === "MENU") {
            children = children.filter((node) => node.nodeType === "CONTENT");
        }
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    const scrollRef = useRef<null | HTMLDivElement>(null);

    const [showChildren, setShowChildren] = useState<boolean>(
        Boolean(isExpanded)
    );

    const [icon, setIcon] = useState<ReactNode>(
        <ArrowIcon isDownArrow={showChildren} />
    );

    useEffect(() => {
        setIcon(<ArrowIcon isDownArrow={showChildren} />);
    }, [showChildren]);

    useEffect(() => {
        setShowChildren(isExpanded ?? false);
    }, [isExpanded]);

    const handleClick = () => {
        if (!showChildren) setExpandedNodeId(_id);
        setShowChildren(!showChildren);
    };

    const handleToggleHeading = () => {
        if (isHeadingClickable || isEditView) setShowChildren(!showChildren);
    };

    const cls = clsx("w-full", {
        "bg-grey5 ml-[2px] pl-[10px] active": !isHeading && showChildren,
        "!w-auto !pl-[10px] !bg-transparent": isEditView,
    });
    const nodeSubHeadingCls = clsx("flex w-full", "node-sub-heading", {
        "bg-grey5 ml-[2px] active": showChildren,
    });

    const executeScroll = () => {
        if (populatedNodeId === _id && scrollRef.current !== null) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        if (populatedNodeId) executeScroll();
    }, [_id, populatedNodeId]);

    const textLength = text.replace(/\s/g, "").length;

    const handleNodeClick = isHeading ? handleToggleHeading : handleClick;

    const editViewNodeProps = {
        caretIcon: icon,
        onClickNode: handleNodeClick,
        isContentNode: children.length < 1 && !isHeading,
        node,
        ancestorMenuNodeIds,
        treeDocType,
        isRootContentNode: isRootNode && !isHeading,
        ...editNodeProps,
    } as EditViewNodeProps;

    const onEditNode = (isHeading?: boolean) => {
        void onEditTreeNode?.({
            nodeId: ancestorMenuNodeIds[ancestorMenuNodeIds.length - 1],
            menuNodeIdsList: ancestorMenuNodeIds,
            menuType: treeDocType,
            isHeading,
        }).catch((err) => {
            logger.error(err); 
        });
    };

    menuNodeProps = {
        ...menuNodeProps,
        onEditNode,
    };

    if (!isEditView && textLength === 0) return <></>;

    return (
        <>
            {isEditView ? (
                <EditViewNode {...editViewNodeProps} />
            ) : (
                <span className={`${styles.menuNodeRoot} relative`}>
                    <span className="editNodeParent">
                        {isHeading ? (
                            <div
                                className="node-heading"
                                onClick={handleToggleHeading}
                            >
                                <EditNode
                                    isEditNode={isEditNode}
                                    onClick={onEditNode}
                                />
                                {text}
                            </div>
                        ) : null}
                        {children.length > 0 && !isHeading ? (
                            <div
                                onClick={handleClick}
                                className={`${nodeSubHeadingCls} relative`}
                                ref={scrollRef}
                            >
                                <MenuNodeContent
                                    {...menuNodeProps}
                                    icon={icon}
                                />
                            </div>
                        ) : (
                            !isHeading && (
                                <div className="flex contentNode preNav relative">
                                    {getPreNavAction?.(node)}
                                    <ContentNode
                                        {...props}
                                        onEditNode={() => {
                                            onEditNode(false); 
                                        }}
                                    />
                                </div>
                            )
                        )}
                    </span>
                </span>
            )}
            <ul className={cls}>
                {showChildren ? (
                    <MenuTree
                        nodes={children}
                        nodeUI={nodeUI}
                        parentSlug={item_slug}
                        isHeading={false}
                        getPreNavAction={getPreNavAction}
                        populatedNodeId={populatedNodeId}
                        isShallowTree={isShallowTree}
                        useParentSlugForLeafNodes={useParentSlugForLeafNodes}
                        ancestorMenuNodeIds={ancestorMenuNodeIds}
                        onEditTreeNode={onEditTreeNode}
                        isEditView={isEditView}
                        editNodeProps={editNodeProps}
                        treeDocType={treeDocType}
                        isEditNode={isEditNode}
                        {...restProps}
                    />
                ) : null}
            </ul>
        </>
    );
};

const Node: React.FC<NodeProps> = (props) => {
    const {
        node,
        isEditView = false,
        editNodeProps,
        ancestorMenuNodeIds = [],
        treeDocType,
    } = props;
    const { nodeType } = node;

    const editViewNodeProps = {
        isContentNode: true,
        node,
        ancestorMenuNodeIds,
        treeDocType,
        ...editNodeProps,
    } as EditViewNodeProps;

    if (isEditView && nodeType !== "MENU")
        return <EditViewNode {...editViewNodeProps} />;
    if (nodeType === "MENU") return <MenuNode {...props} />;
    if (nodeType === "CONTENT") return <ContentNode {...props} />;

    return <TextNode {...props} />;
};

export default Node;
