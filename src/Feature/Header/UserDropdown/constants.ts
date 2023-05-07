
export interface IDropdownListItem {
    label: string;
    id: string;
    onClick?: () => void;
    href?: string;
    isAdmin?: boolean;
    isPrefixLanguage?: boolean;
}

const CommonMenu: IDropdownListItem[] = [
    {
        label: "Privacy",
        href: "/privacy",
        id: "privacy",
    },
    {
        label: "Copyright",
        href: "/copyright",
        id: "copyright",
    },
];

const LoggedinCommonMenu: IDropdownListItem[] = [
    
    {
        label: "My Profile",
        href: "/profile",
        id: "my-profile",
        isPrefixLanguage: false,
    },
    {
        label: "Reading Lists",
        href: "/reading-lists/all",
        id: "reading-lists",
        isPrefixLanguage: false,

    },
    
];

export const LoggedInUserMenu: IDropdownListItem[] = [
    ...LoggedinCommonMenu,
    ...CommonMenu,
    ...[
        {
            label: "Logout",
            href: "/logout",
            id: "logout",
        },
    ],
];

export const LoggedInAdminMenu: IDropdownListItem[] = [
    ...LoggedinCommonMenu,
    ...[
        {
            label: "Users",
            href: "/list",
            id: "users",
            isPrefixLanguage: false,
        },
    ],
    ...CommonMenu,
    ...[
        {
            label: "Logout",
            href: "/logout",
            id: "logout",
        },
    ],
];

export const LoggedOutUserMenu: IDropdownListItem[] = [
    ...[
        {
            label: "Login",
            href: "/login",
            id: "login",
        },
        {
            label: "Register",
            href: "/register",
            id: "register",
        },
    ],
    ...CommonMenu,
];
