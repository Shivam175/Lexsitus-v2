import { type ReactNode, useEffect, useState } from "react";
import Dialog from "Components/Dialog";
import { useAppDialog } from "Context/AppDialog";

const useGlobalDialog = () => {
    const [globalDialog, setGlobalDialog] = useState<ReactNode>();
    const { showAppDialog, closeAppDialog, dialogContent, dialogProps } =
        useAppDialog();

    useEffect(() => {
        if (dialogContent && dialogProps) {
            const dialog = <Dialog {...dialogProps}>{dialogContent}</Dialog>;
            setGlobalDialog(dialog);
        }
    }, [dialogContent, dialogProps]);

    return {
        showGlobalDialog: showAppDialog,
        closeGlobalDialog: closeAppDialog,
        globalDialog,
    };
};

export default useGlobalDialog;
