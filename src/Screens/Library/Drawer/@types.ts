import { type DrawerDocType } from "./constants";
import { type INode } from "Models/SnapshotsMenus/@types";
import { type PreNavActionsList } from "Screens/Library/PreNavAction";

export interface GlobalDrawerProps {
    onClickPrep: (id: string) => void;
    onPopulateTabs: ( value: { id: string; slug: string }) => void;
}

export interface DrawerButtonProps {
    isDrawerOpen: boolean;
    onClick: (id: DrawerDocType) => void;
}
export interface DrawerProps extends GlobalDrawerProps {
    isDrawerOpen: boolean;
    treeData: INode[];
    preNavIconsLIST: PreNavActionsList[];
    toggleDrawer: () => void;
    drawerDocType: DrawerDocType;
}
