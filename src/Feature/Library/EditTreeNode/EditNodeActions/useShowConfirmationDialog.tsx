import { CONFIRMATION_MSG } from "./constants";
import MessageDialog, { type MessageDialogProps } from "Components/MessageDialog";
import { type ReducedDialogProps } from "Context/AppDialog";
import useGlobalDialog from "Hooks/useGlobalDialog";
import { type NodeTab } from "Models/SnapshotsMenus/@types";

export const useShowConfirmationDialog = () => {
    const { globalDialog, closeGlobalDialog, showGlobalDialog } =
        useGlobalDialog();

    const showConfirmationDialog = (
        tab: NodeTab,
        handleEditTabList: (tab: NodeTab) => void
    ) => {
        const msgProps = {
            ...CONFIRMATION_MSG,
            handleAcceptClick() {
                handleEditTabList(tab);
            },
        };

        const messageDialogProps: MessageDialogProps = {
            ...msgProps,
            dialogOpen: true,
            isCloseOnClickAway: false,
            handleDialogClose: closeGlobalDialog,
        };
        const msgDialog = <MessageDialog {...messageDialogProps} />;

        const appDialogProps: ReducedDialogProps = {
            isCloseBtnVisible: false,
            dialogBgColor: "lightGrey",
        };
        showGlobalDialog(msgDialog, appDialogProps);
    };

    return {
        msgDialog: globalDialog,
        showConfirmationDialog,
        closeConfirmationDialog: closeGlobalDialog,
    };
};
