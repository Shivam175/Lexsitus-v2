import { type ReactNode } from "react";
import { type IAvailableIcon } from "Components/Icons/@types";

export interface HeaderProps {
    isLeftHeader?: boolean;
    isRightHeader?: boolean;
    isTransparent?: boolean;
}

export interface IMenuProps {
    name?: string;
    icon?: IAvailableIcon;
    tooltip?: string;
    url?: string;
    isExternal?: boolean;
    component?: ReactNode;
    className: string;
    id: number;
}
