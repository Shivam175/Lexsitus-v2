import clsx from "clsx";
import { type RowActionIcon } from "./@types";
import { type RowActionsListProps } from ".";
import Button from "Components/Button";

export interface GetRowActionArgs
    extends Omit<RowActionsListProps, "actionList" | "modalList"> {
    rowActionIcon: RowActionIcon;
    openModal: () => void;
}

export const getRowAction = ({
    rowActionIcon,
    docId,
    title,
    externalLink,
    actionHandler,
    openModal,
    iconClass,
    listItemId,
}: GetRowActionArgs) => {
    const { actionId, icon, actionType } = rowActionIcon;
    if (actionId === "playlist_add") {
        return (
            <Button
                color="transparent"
                className={clsx("material-icons", iconClass)}
                onClick={openModal}
            >
                {icon}
            </Button>
        );
    }

    switch (actionType) {
        case "Button":
            return (
                <Button
                    color="transparent"
                    className={clsx("material-icons", iconClass)}
                    onClick={() => {
                        actionHandler({ actionKey: actionId, docId, title, listItemId });
                    }}
                >
                    {icon}
                </Button>
            );
        case "ExternalLink":
            return (
                <Button
                    color="transparent"
                    link={externalLink}
                    isExternal={true}
                    className={clsx("material-icons", iconClass)}
                >
                    {icon}
                </Button>
            );
        default:
            return <></>;
    }
};
