import { LoggedInAdminMenu, LoggedInUserMenu, LoggedOutUserMenu } from "./constants";
import { type User } from "Models/Users/@types";

export const getUserMenu = (user?: User) => {
    if (user?.id && user.roleNames.includes("admin")) return LoggedInAdminMenu;
    if (user?.id) return LoggedInUserMenu;
    return LoggedOutUserMenu;
};