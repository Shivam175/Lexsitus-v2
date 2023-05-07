import useMessageDialog from "Hooks/useMessageDialog";
import { useStoreState } from "Stores";

const authDialogBtnClass = `bg-grey3 text-[14px] shadow-none text-[grey6]
 min-h-inherit h-auto leading-[35px] py-[0px] px-[12px] text-center tracking-[0.5px]
 border-none rounded-[2px] inline-block`;

const useHandleAuthAction = () => {
    const { User } = useStoreState(({ UserStore: { User } }) => ({
        User,
    }));
    const { showMessageDialog } = useMessageDialog();
    const showAuthDialog = () => {
        showMessageDialog({
            heading: "Authentication",
            message: "You need to authenticate to complete this action",
            acceptBtnText: "Login",
            acceptBtnLink: "/login",
            acceptBtnClassName: authDialogBtnClass,
            closeBtnText: "Cancel",
            closeBtnClassName: authDialogBtnClass,
        });
    };

    const handleAuthAction = async <T,>(
        callback: (() => Promise<T>) | (() => T)
    ) => {
        if (User) {
            const data = await callback();
            if (!data) return;
            return data;
        }

        showAuthDialog();
    };

    return handleAuthAction;
};

export default useHandleAuthAction;
