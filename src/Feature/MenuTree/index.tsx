/* eslint-disable autofix/no-unused-vars */
import clsx from "clsx";
import React, { useEffect, useMemo, useState } from "react";
import { type MenuTreeProps } from "./@types";
import Node from "./Node";
import { handleGetAncestorNodes, isAncestor } from "./utils";
import { type INode } from "Models/SnapshotsMenus/@types";

const MenuTree: React.FC<MenuTreeProps> = ({
    nodes,
    treeRootClass = "",
    isEachFirstExpanded = false,
    isFirstExpanded,
    isHeading = true,
    getPreNavAction,
    useParentSlug = false,
    isFirstNodeClickable = true,
    populatedNodeId = "",
    isShallowTree = false,
    pathSlug = "",
    treeType = "",
    useParentSlugForLeafNodes = true,
    isEditNode = true,
    isEditView = false,
    isRootNode = false,
    ancestorMenuNodeIds = [],
    ...props
}) => {
    let { rootNodesList = [] } = props;
    if (isRootNode) rootNodesList = nodes;

    const [expandedNodeId, setExpandedNodeId] = useState<string>("");

    useEffect(() => {
        if (populatedNodeId) setExpandedNodeId("");
    }, [populatedNodeId]);

    const handleIsExpanded = (node: INode, index: number) => {
        let isAncestorOfPopulatedNode = false;
        if (expandedNodeId) {
            return node._id === expandedNodeId;
        }

        if (populatedNodeId) {
            isAncestorOfPopulatedNode = isAncestor(
                node,
                "_id",
                populatedNodeId
            );
        } else if (pathSlug) {
            isAncestorOfPopulatedNode = isAncestor(node, "item_slug", pathSlug);
        }

        const isExpandedNode =
            index === 0 ? isFirstExpanded : isEachFirstExpanded;

        return isAncestorOfPopulatedNode || isExpandedNode;
    };

    const cls = clsx(`flex flex-col ${treeRootClass}`, {
        "cursor-pointer": !isEditView,
        "mx-[20px]": isEditView,
        "!mx-[10px]": isEditView && isRootNode,
    });

    const nodeList = useMemo(
        () =>
            nodes.map((node) => ({
                node,
                ancestorMenuNodeIds:
                    isEditNode || isEditView
                        ? handleGetAncestorNodes(rootNodesList, node._id)
                        : undefined,
            })),
        [nodes]
    );

    const getIsEditNode = (idx: number) =>
        idx === 0 && isRootNode ? false : isEditNode;

    return (
        <ul className={cls}>
            {nodeList?.map(({ node, ancestorMenuNodeIds }, index) => (
                <React.Fragment key={`${node._id} ${treeType} ${index}`}>
                    {node?.isHidden ? null : (
                        <Node
                            key={`${node._id} ${treeType} ${index}`}
                            node={node}
                            isHeading={isHeading}
                            getPreNavAction={getPreNavAction}
                            useParentSlug={useParentSlug}
                            isExpanded={handleIsExpanded(node, index)}
                            setExpandedNodeId={setExpandedNodeId}
                            isHeadingClickable={
                                index === 0 && isFirstNodeClickable
                            }
                            populatedNodeId={populatedNodeId}
                            isShallowTree={isShallowTree}
                            pathSlug={pathSlug}
                            useParentSlugForLeafNodes={
                                useParentSlugForLeafNodes
                            }
                            isEditNode={getIsEditNode(index)}
                            isEditView={isEditView}
                            isRootNode={isRootNode}
                            rootNodesList={rootNodesList}
                            ancestorMenuNodeIds={ancestorMenuNodeIds}
                            {...props}
                        />
                    )}
                </React.Fragment>
            ))}
        </ul>
    );
};

export default MenuTree;
