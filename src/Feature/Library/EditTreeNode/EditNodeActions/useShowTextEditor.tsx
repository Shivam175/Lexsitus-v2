import { type ReducedDialogProps } from "Context/AppDialog";
import TextEditorLite, { type TextEditorLiteProps } from "Feature/TextEditorLite";
import useGlobalDialog from "Hooks/useGlobalDialog";

export const useShowTextEditor = () => {
    const { globalDialog, closeGlobalDialog, showGlobalDialog } =
        useGlobalDialog();

    const showTextEditor = (text: string, onSave: (text: string) => void) => {
        const textEditorProps: TextEditorLiteProps = {
            text,
            onSave,
            onClose: closeGlobalDialog,
        };
        const textEditor = <TextEditorLite {...textEditorProps} />;

        const appDialogProps: ReducedDialogProps = {
            isCloseBtnVisible: false,
            dialogBgColor: "mediumGrey",
        };
        showGlobalDialog(textEditor, appDialogProps);
    };

    return { textEditor: globalDialog, showTextEditor };
};
