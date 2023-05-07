import { type DocumentType } from "Models/ReadingList/@types";

export type TabThemeColor =
    | "color_lectures"
    | "color_caselaw"
    | "color_clicc"
    | "color_eocd"
    | "color_eoc"
    | "color_mopd"
    | "color_prepworks"
    | "grey2"
    | "grey3"
    | "color_caselaw1"
    | "transparent";


export type LibraryTabPath =
    | "lectures"
    | "clicc"
    | "preparatory-works"
    | "case-law"
    | "elements-of-crime"
    | "elements-digest"
    | "means-proof-digest"
    | "rpe/clicc";

export interface TabMapping {
    path: LibraryTabPath;
    treeType: string;
    themeColor: TabThemeColor;
    docType: DocumentType;
    isNavigationTabHidden?: boolean;
}

export const tabMapping: TabMapping[] = [
    {
        path: "lectures",
        treeType: "Video",
        themeColor: "color_lectures",
        docType: "Video"
    },
    {
        path: "clicc",
        treeType: "Commentary",
        themeColor: "color_clicc",
        docType: "Commentary"
    },
    {
        path: "preparatory-works",
        treeType: "PreparatoryWork",
        themeColor: "color_prepworks",
        docType: "PreparatoryWork"
    },
    {
        path: "case-law",
        treeType: "CaseLaw",
        themeColor: "color_caselaw",
        docType: "CaseLaw"
    },
    {
        path: "elements-of-crime",
        treeType: "ElementsOfCrime",
        themeColor: "color_eoc",
        docType: "ElementsOfCrime"
    },
    {
        path: "elements-digest",
        treeType: "ElementsOfCrimeDigest",
        themeColor: "color_eocd",
        docType: "EOCD"
    },
    {
        path: "means-proof-digest",
        treeType: "MeansOfProofDigest",
        themeColor: "color_mopd",
        docType: "MOFD"
    },
    {
        path: "rpe/clicc",
        treeType: "RPECommentary",
        themeColor: "color_mopd",
        docType: "Commentary",
        isNavigationTabHidden: true,
    },
];
