import { type TabInterface } from "Components/TabComponent";

export const NUMBER_OF_SEARCH_DIALOG_ITEM_PER_PAGE = 10;
export const SKIP_NUMBER_SEARCH_DIALOG = 10;

export type FileTypeLabel = "PDF" | "Text" | "Videos";
export type FileTypeValue = "video" | "pdf" | "text";
export interface FormListType {
    label: FileTypeLabel;
    id: number;
    value: FileTypeValue;
}

export const DIALOG_SEARCH_PRIMARY_HEADER_LIST: FormListType[] = [
    {
        label: "Videos",
        id: 1,
        value:"video",
    },
    {
        label: "PDF",
        id: 2,
        value:"pdf",
    },
    {
        label: "Text",
        id: 3,
        value:"text",
    },
];

export const DIALOG_SEARCH_TAB_NAMELIST: TabInterface[] = [
    {
        label: "All results",
        id: "all_results",
        docType: "allResults",
    },
    {
        label: "Lectures",
        id: "lectures",
        docType: "Video",
    },
    {
        label: "CLICC",
        id: "clicc",
        docType: "Commentary",
        addFilter: {
            menu_doc_type: "rome_statute_commentary",
        }
    },
    {
        label: "RPE",
        id: "rpe",
        docType: "Commentary",
        addFilter: {
            menu_doc_type: "rpe_commentary",
        }
    },
    {
        label: "Preparatory Works",
        id: "preparatory",
        docType: "PreparatoryWork",
    },
    {
        label: "Case Law",
        id: "case_law",
        docType: "CaseLaw",
    },
    {
        label: "ICC Elements of Crime",
        id: "icc_eoc",
        docType: "ElementsOfCrime",
    },
    {
        label: "Elements Digest",
        id: "elements_digest",
        docType: "ElementsOfCrimeDigest",
    },
    {
        label: "Means of Proof Digest",
        id: "Mopd",
        docType: "MeansOfProofDigest",
    },
];
