import { type NodeTab } from "Models/SnapshotsMenus/@types";

export interface NodeTabConfig {
    text: string;
    color: string;
}

export const NODE_TAB_MAPPING: Record<NodeTab, NodeTabConfig> = {
    isInCaseLaw: {
        text: "Case Law",
        color: "!bg-color_caselaw",
    },
    isInCommentary: {
        text: "CLICC",
        color: "!bg-color_clicc",
    },
    isInElementsOfCrime: {
        text: "ICC Elements Of Crime",
        color: "!bg-color_eoc",
    },
    isInElementsOfCrimeDigest: {
        text: "Elements Of Crime Digest",
        color: "!bg-color_eocd",
    },
    isInMeansOfProofDigest: {
        text: "Means Of Proof Digest",
        color: "!bg-color_mopd",
    },
    isInPreparatoryWork: {
        text: "Preparatory Works",
        color: "!bg-color_prepworks",
    },
    isInRomeStatute: {
        text: "Rome Statute",
        color: "!bg-grey3",
    },
    isInVideo: {
        text: "Lectures",
        color: "!bg-color_lectures",
    },
};

export const CONFIRMATION_MSG = {
    heading: "Confirm",
    message: "Do you want to make the changes now?",
    acceptBtnText: "YES",
    closeBtnText: "NO",
};

export const ORDERED_NODE_TAB_LIST: NodeTab[] = [
    "isInRomeStatute",
    "isInVideo",
    "isInCommentary",
    "isInPreparatoryWork",
    "isInCaseLaw",
    "isInElementsOfCrime",
    "isInElementsOfCrimeDigest",
    "isInMeansOfProofDigest",
];
