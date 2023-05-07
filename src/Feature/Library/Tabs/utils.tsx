import dayjs from "dayjs";
import { type WindowButtonListProps } from "./Hooks/useCreateWindow";
import TabModel from "Models/Tabs";

export interface actionListHandlerArguments {
    buttonList: WindowButtonListProps[];
    onActionHandler?: (id: string) => void;
    handleAuthAction: (
        callback: (() => Promise<void>) | (() => void)
    ) => Promise<void>;
}

export const getIntroHtmlString = async (language: string, path: string) =>
    TabModel.getIntroHtml(language, path);

export const getCurrentDate = () => dayjs(new Date()).format("DD-MM-YYYY");

export const addHandlerInActionList = (value: actionListHandlerArguments) => {
    const { buttonList, onActionHandler, handleAuthAction } = value;
    return buttonList?.map((item) => ({
        icon: item.icon,
        onClick() {
            if (item?.isAuthRequired) void handleAuthAction(() => onActionHandler?.(item.id));
            else onActionHandler?.(item.id);
        },
    }));
};
