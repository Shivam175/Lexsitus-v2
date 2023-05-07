import { useContext } from "react";
import { ACTION_BUTTONS_CONFIG } from "./constants";
import { type IButtonListItem } from "Components/PaneHeader";
import { LibraryContext } from "Feature/Library/Context";
import { createButton, createButtonListItem } from "utils/createButton";

export interface ButtonConfig {
    tooltip: string;
    icon: string;
    onClick?: () => void;
    isCssIcon?: boolean;
}

export interface ActionButton {
    id?: string;
    icon: string;
    iconClass?: string;
    onClick?: () => void;
    isCssIcon?: boolean;
    tooltip?: string;
}

export const createActionList = (
    actionList: ActionButton[],
    buttonsConfig: ButtonConfig[]
) =>
    actionList.map(
        ({
            icon,
            iconClass = "text-xl leading-3 text-lxsGrey4 hover:text-white1",
            onClick,
            tooltip,
        }) => {
            const button = buttonsConfig.find(
                (button: ButtonConfig) => button.icon === icon
            );

            if (button) {
                return createButtonListItem(
                    createButton(icon, tooltip ?? button.tooltip, iconClass, button.isCssIcon ),
                    onClick ?? button.onClick
                );
            }

            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            return {} as IButtonListItem;
        }
    );

export const usePaneActionsList = () => {
    const { deleteWindow, reverseWindowList } = useContext(LibraryContext);
    const buttonsConfig: ButtonConfig[] = [
        ...ACTION_BUTTONS_CONFIG,
        {
            tooltip: "Close window",
            icon: "close",
            onClick() {
                deleteWindow();
            },
        },
        {
            tooltip: "Swap windows",
            icon: "swap_vert",
            onClick: reverseWindowList,
        },
    ];
    return {
        createActionList: (actionList: ActionButton[]) =>
            createActionList(actionList, buttonsConfig),
    };
};
