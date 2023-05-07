import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { LibraryContext } from "Feature/Library/Context";

const createPath = (paramsList: string[]) => `/${paramsList.join("/")}`;

export const useNodePath = (
    useParentSlug: boolean,
    parentSlug: string,
    slug: string,
) => {
    const { currentTab } = useContext(LibraryContext);
    const currentUrl = useLocation().pathname.split("/");
    const pathSlug = useParentSlug ? `${parentSlug}/${slug}` : slug;
    const currentTabPath = currentUrl[2] === "toaep" ? currentUrl[2] : currentTab.path;
    return createPath([ currentTabPath ?? currentUrl[2], pathSlug]);
};