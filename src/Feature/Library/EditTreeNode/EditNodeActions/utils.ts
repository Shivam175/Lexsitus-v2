import { ORDERED_NODE_TAB_LIST } from "./constants";
import { type EditNodeTabs, type NodeTab } from "Models/SnapshotsMenus/@types";

export const getOrderedKeys = (list: NodeTab[]) => {
    const orderedList: NodeTab[] = [];
    ORDERED_NODE_TAB_LIST.forEach((key) => {
        if (list.includes(key)) orderedList.push(key);
    });
    return orderedList;
};

export const getNodeTabList = (editNodeParams: EditNodeTabs, nodeType: string) => {
    const {
        isInRomeStatute = false,
        isInVideo = false,
        isInCommentary = false,
        isInPreparatoryWork = false,
        isInCaseLaw = false,
        isInElementsOfCrime = false,
        isInElementsOfCrimeDigest = false,
        isInMeansOfProofDigest = false,
    } = editNodeParams;
    const tabList = {
        isInRomeStatute,
        isInVideo,
        isInCommentary,
        isInPreparatoryWork,
        isInCaseLaw,
        isInElementsOfCrime,
        isInElementsOfCrimeDigest,
        isInMeansOfProofDigest,
    };
    return (nodeType === "MENU" ? tabList : {}) as EditNodeTabs;
};

export const stripParagraphTags = (html: string) =>
    html.replace(/<\/?p[^>]*>/g, "");