/* eslint-disable @typescript-eslint/no-empty-function */
import React, {
    type FC,
    useState,
    type PropsWithChildren,
    type ReactNode,
    createContext,
    useEffect,
} from "react";
import Dialog, { type DialogProps } from "Components/Dialog";

export type ReducedDialogProps = Omit<DialogProps, "open" | "onClose">;

interface AppDialogContextProps {
    dialogContent: ReactNode;
    dialogProps: DialogProps;
    showAppDialog: (
        dialogContent: ReactNode,
        dialogProps?: ReducedDialogProps
    ) => void;
    closeAppDialog: () => void;
}

export const AppDialogContext = createContext<AppDialogContextProps>({
    dialogContent: "",
    dialogProps: {
        open: false,
        onClose() {},
    },
    showAppDialog() {},
    closeAppDialog() {},
});

export const useAppDialog = (): AppDialogContextProps => {
    const [dialogContent, setDialogContent] = useState<ReactNode>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [dialogProps, setDialogProps] = useState<DialogProps>({
        open: isOpen,
        onClose() {
            setIsOpen(false); 
        },
    });

    const closeAppDialog = () => {
        setIsOpen(false);
    };

    const showAppDialog = (
        dialogContent: ReactNode,
        dialogProps?: ReducedDialogProps
    ) => {
        setDialogContent(dialogContent);
        setIsOpen(true);
        setDialogProps({
            ...dialogProps,
            open: isOpen,
            onClose: closeAppDialog,
        });
    };

    useEffect(() => {
        setDialogProps({
            ...dialogProps,
            open: isOpen,
            onClose: closeAppDialog,
        });
    }, [isOpen]);

    return {
        dialogContent,
        dialogProps,
        showAppDialog,
        closeAppDialog,
    };
};

const AppDialogProvider: FC<PropsWithChildren> = ({ children }) => {
    const { dialogContent, dialogProps, showAppDialog, closeAppDialog } =
        useAppDialog();

    return (
        <AppDialogContext.Provider
            value={{
                dialogContent,
                dialogProps,
                showAppDialog,
                closeAppDialog,
            }}
        >
            <Dialog {...dialogProps}>{dialogContent}</Dialog>
            {children}
        </AppDialogContext.Provider>
    );
};

export default AppDialogProvider;
