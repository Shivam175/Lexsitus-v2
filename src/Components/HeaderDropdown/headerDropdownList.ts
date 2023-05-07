/* eslint-disable @typescript-eslint/no-empty-function */
import { type NavigateFunction } from "react-router-dom";
import { type User } from "Models/Users/@types";

export interface DropdownListItem {
    label: string;
    linkTemplate: string;
    link: string;
    onClick: () => void;
    isVisible: boolean;
}

export const LOGGED_IN_DROPDOWN_LIST: DropdownListItem[] = [
    {
        label: "My Profile",
        linkTemplate: "/-profile",
        link: "/-profile",
        onClick() { },
        isVisible: true
    },
    {
        label: "Reading Lists",
        linkTemplate: "/lang:/reading-lists/all",
        link: "",
        onClick() { },
        isVisible: true
    },
    {
        label: "Users",
        linkTemplate: "/list",
        link: "/list",
        onClick() { },
        isVisible: false
    },
    {
        label: "Privacy",
        linkTemplate: "/lang:/privacy",
        link: "",
        onClick() { },
        isVisible: true
    },
    {
        label: "Copyright",
        linkTemplate: "/lang:/copyright",
        link: "",
        onClick() { },
        isVisible: true
    },
    {
        label: "Logout",
        linkTemplate: "/lang:/logout",
        link: "",
        onClick() { },
        isVisible: true
    }
];

export const LOGGED_OUT_DROPDOWN_LIST: DropdownListItem[] = [
    {
        label: "Login",
        linkTemplate: "/lang:/login",
        link: "",
        onClick() { },
        isVisible: true
    },
    {
        label: "Register",
        linkTemplate: "/lang:/register",
        link: "",
        onClick() { },
        isVisible: true
    },
    {
        label: "Copyright",
        linkTemplate: "/lang:/copyright",
        link: "",
        onClick() { },
        isVisible: true
    },
    {
        label: "Privacy",
        linkTemplate: "/lang:/privacy",
        link: "",
        onClick() { },
        isVisible: true
    }
];

export const getDropdownList = (user: User | undefined, logoutUser: () => Promise<void>, currentLanguage: string, closeDropdown: () => void, navigate: NavigateFunction, isAdmin: boolean) => {
    const currentList = user ? LOGGED_IN_DROPDOWN_LIST : LOGGED_OUT_DROPDOWN_LIST;
    return currentList.map((item: DropdownListItem) => {
        item.onClick = closeDropdown;
        if (item.label === "Users" && isAdmin) item.isVisible = true;
        if (!(item.label === "My Profile" || item.label === "Users"))
            item.link = `/${currentLanguage}${item.linkTemplate.substring(6)}`;
        if (item.label === "Logout") {
            item.onClick = async () => {
                await logoutUser();
                navigate(`/${currentLanguage}`);
                closeDropdown();
            };
        }

        return item;
    });
};