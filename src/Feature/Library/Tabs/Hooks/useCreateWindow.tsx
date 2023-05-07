import { type ReactNode, useContext } from "react";
import { usePaneActionsList } from "./usePaneActionsList";
import WindowItem, { type WindowProps } from "Components/WindowItem";
import { LibraryContext } from "Feature/Library/Context";
import { type actionListHandlerArguments, addHandlerInActionList } from "Feature/Library/Tabs/utils";

export interface WindowButtonListProps {
    id: string;
    icon: string;
    isAuthRequired?: boolean;
}
export interface CreateWindowProps {
    onActionHandler: (id: string) => void;
}

export interface WindowItemProps {
    content: ReactNode;
    windowHeading?: string;
    isDefaultWindowHeading?: boolean;
    leftButtonList?: WindowButtonListProps[];
    rightButtonList?: WindowButtonListProps[];
}

export const useCreateWindow = ({ onActionHandler }: CreateWindowProps) => {
    const { addWindow, currentTab, handleAuthAction } = useContext(LibraryContext);

    const { createActionList } = usePaneActionsList();

    const updateWindow = (props: WindowItemProps) => {
        const { content, windowHeading, leftButtonList, rightButtonList, isDefaultWindowHeading } =
            props;
        const actionListHandlerArgs: actionListHandlerArguments = {
            buttonList: [],
            onActionHandler,
            handleAuthAction,
        };
        const windowProps: WindowProps = {
            leftButtonList: createActionList(
                addHandlerInActionList({
                    ...actionListHandlerArgs,
                    buttonList: leftButtonList ?? [],
                })
            ),
            rightButtonList: createActionList(
                addHandlerInActionList({
                    ...actionListHandlerArgs,
                    buttonList: rightButtonList ?? [],
                })
            ),
            paneHeaderClass: currentTab.themeColor,
            headingTitle: windowHeading,
            isDefaultWindowHeading
        };

        const window = <WindowItem {...windowProps}>{content}</WindowItem>;
        addWindow(window);
    };

    return {
        updateWindow,
    };
};