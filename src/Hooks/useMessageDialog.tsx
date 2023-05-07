import { useContext } from "react";
import MessageDialog, { type MessageDialogProps } from "Components/MessageDialog";
import { AppDialogContext, type ReducedDialogProps } from "Context/AppDialog";

const useMessageDialog = () => {
    const { showAppDialog, closeAppDialog } = useContext(AppDialogContext);

    const showMessageDialog = (msgDialogProps: MessageDialogProps) => {
        const messageDialogProps = {
            ...msgDialogProps,
            dialogOpen: true,
            handleDialogClose: closeAppDialog,
        };
        const appDialogProps: ReducedDialogProps = {
            isCloseBtnVisible: false,
            dialogBgColor: "lightGrey",
        };
        const messageDialog = <MessageDialog {...messageDialogProps} />;
        showAppDialog(messageDialog, appDialogProps);
    };

    return { showMessageDialog };
};

export default useMessageDialog;
