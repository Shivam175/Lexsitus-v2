/* eslint-disable @typescript-eslint/no-empty-function */
import React, {
    type FC,
    useState,
    type PropsWithChildren,
    type ReactNode,
    createContext,
} from "react";
import {
    cssTransition,
    toast,
    ToastContainer,
    type ToastContainerProps,
} from "react-toastify";
import styles from "./index.module.scss";

export interface ShowToastProps extends ToastContainerProps {
    message: string;
    position?: "top-right" | "top-left";
}

interface ToastContextProps {
    toast: ReactNode;
    showToast: (props: ShowToastProps) => void;
}

export const ToastContext = createContext<ToastContextProps>({
    toast: "",
    showToast() {},
});

const animateSlide = cssTransition({
    enter: "slide-enter-bottom",
    exit: "slide-exit-top",
});

export const useToast = (): ToastContextProps => {
    const [toastElement, setToastElement] = useState<ReactNode>();

    const showToast = ({
        message,
        position = "top-right",
        ...props
    }: ShowToastProps) => {
        toast(message);
        const toastContainerElement = (
            <span className={styles.rootToastContainer}>
                <ToastContainer
                    position={position}
                    autoClose={4000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable={false}
                    pauseOnHover={false}
                    transition={animateSlide}
                    theme="dark"
                    {...props}
                />
            </span>
        );
        setToastElement(toastContainerElement);
    };

    return { showToast, toast: toastElement };
};

const ToastProvider: FC<PropsWithChildren> = ({ children }) => {
    const { toast, showToast } = useToast();

    return (
        <ToastContext.Provider
            value={{
                toast,
                showToast,
            }}
        >
            {toast}
            {children}
        </ToastContext.Provider>
    );
};

export default ToastProvider;
