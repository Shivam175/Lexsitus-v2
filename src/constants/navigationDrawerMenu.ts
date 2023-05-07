import { type IAvailableIcon } from "Components/Icons/@types";

export interface IMenuListItem {
    langKey: string;
    url?: string;
    iconClass?: IAvailableIcon;
    isExternal?: boolean;
}

export const TOP_NAVIGATION_DRAWER_MENULIST: IMenuListItem[] = [
                
    {
        langKey: "tutorialsKey",
        url: "/help",
        iconClass: "homepage-icons-tutorials",
    },
    {
        langKey: "introductionsKey",
        url: "/introduction",
        iconClass: "homepage-icons-tutorials",
    },
    {
        langKey: "coreTeamKey",
        url: "/coordination",
        iconClass: "home-top-right-team",
    },
    {
        langKey: "lexsitusFacultyKey",
        url: "/faculty",
        iconClass: "homepage-icons-edit",

    },
    {
        langKey: "cliccAuthorsKey",
        url: "/authors",
        iconClass: "homepage-icons-edit",
    },
    {
        langKey: "digestEditorsKey",
        url: "/digest-editors",
        iconClass: "homepage-icons-edit",
    },
    {
        langKey: "arabicKey",
        url: "/arabic-team",
        iconClass: "home-top-right-team",

    },
    {
        langKey: "frenchkey",
        url: "/french-team",
        iconClass: "home-top-right-team",
    },
    {
        langKey: "parsianKey",
        url: "/persian-team",
        iconClass: "home-top-right-team",
    },
];

export const BOTTOM_NAVIGATION_DRAWER_MENULIST: IMenuListItem[] = [
    {
        langKey: "torkelKey",
        url: "https://toaep.org/authors/",
        iconClass: "library-top-toep",
        isExternal: true,
    },
    {
        langKey: "cmnKnowledgeHubKey",
        url: "https://www.casematrixnetwork.org/cmn-knowledge-hub/",
        iconClass: "library-top-cmnHub",
        isExternal: true,
    },
    {
        langKey: "iccLegalToolsDatabaseKey",
        url: "https://www.legal-tools.org/",
        iconClass: "library-top-zoomin",
        isExternal: true,
    },
    {
        langKey: "iccCaseMatrix",
        url: "https://www.casematrixnetwork.org/icc-case-matrix/online-icc-case-matrix/",
        iconClass: "library-top-matrix",
        isExternal: true,
    },
];
