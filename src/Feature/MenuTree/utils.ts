import { type INode } from "Models/SnapshotsMenus/@types";

export const isAncestor = (
    node: INode,
    nodeField: keyof INode,
    fieldValue: string
): boolean => {
    if (node[nodeField] === fieldValue) return true;

    if (!node.children) return false;
    return node.children.reduce(
        (previousValue, currentNode) =>
            previousValue || isAncestor(currentNode, nodeField, fieldValue),
        false
    );
};

export const getAncestorNodesList = (node: INode, nodeId: string): INode[] => {
    if (node._id === nodeId) return [node];

    if (!node.children) return [];

    return node.children.reduce<INode[]>((previousValue, currentNode) => {
        const childNodesList = getAncestorNodesList(currentNode, nodeId);
        if (
            childNodesList.length > 0 &&
            !childNodesList.includes(currentNode)
        ) {
            childNodesList.unshift(currentNode);
        }

        return [...previousValue, ...childNodesList];
    }, []);
};

export const handleGetAncestorNodes = (nodeList: INode[], nodeId: string) => {
    const resultList: INode[] = [];
    nodeList.forEach((node) => {
        const list = getAncestorNodesList(node, nodeId);
        if (list.length > 0 && !list.includes(node)) {
            resultList.push(node, ...list);
        } else resultList.push(...list);
    });
    const list = resultList.map((node) => node._id);
    return list;
};
