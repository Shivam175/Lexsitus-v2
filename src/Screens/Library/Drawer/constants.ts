import { type IAvailableIcon } from "Components/Icons/@types";

export interface PreNavActionsList {
    tooltip: string;
    tippyClass: string;
    isTooltipArrow: boolean;
    iconName: IAvailableIcon;
    isRpe?: boolean;
    id: string;
}

export const DrawerDocTypeList = ["RomeStatute", "rpe"] as const;

export type DrawerDocType = typeof DrawerDocTypeList[number];

interface LibraryDrawerName {
    name: string;
    className: string;
    id: DrawerDocType;
}

export const CITATION_TEXT =
    "ICC Statute, adopted 1997-07-17, PURL:http://www.legal-tools.org/doc/7b9af9";

export const LIBRARY_DRAWER_NAME: LibraryDrawerName[] = [
    {
        name: "rome statute",
        className: "rome",
        id: "RomeStatute",
    },
    {
        name: "rules of procedure and evidence",
        className: "rpe",
        id: "rpe",
    },
];
export const RPE_PRE_NAV_ICONS_LIST: PreNavActionsList[] = [
    {
        tooltip: "populate tabs for this article",
        tippyClass: "bg-grey8 w-fit text-black h-10 p-1 rounded-3xl",
        isTooltipArrow: false,
        iconName: "global-menu-icon-hamburger1",
        id:"populateTabs",
        isRpe:true,
    },
];

export const ROME_STATUTE_PRE_NAV_ICONS_LIST: PreNavActionsList[] = [
    {
        tooltip: "view case law and preparatory works",
        tippyClass: "bg-grey8 w-40 text-black h-16 p-2 rounded-3xl",
        isTooltipArrow: false,
        iconName: "global-menu-icon-hamburger2",
        id:"casePrep",
        isRpe:false,
    },
    {
        tooltip: "populate tabs for this article",
        tippyClass: "bg-grey8 w-fit text-black h-10 p-1 rounded-3xl",
        isTooltipArrow: false,
        iconName: "global-menu-icon-hamburger1",
        isRpe:false,
        id:"populateTabs",
    },
];


