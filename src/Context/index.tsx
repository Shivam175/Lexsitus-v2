import React, { type FC, type PropsWithChildren } from "react";
import AppDialogProvider from "./AppDialog";
import ToastProvider from "./Toast";
import VideoPlayerDialogProvider from "./VideoPlayer";
import SearchDialogContextProvider from "Feature/Library/LibrarySearchDialog/SearchDialogContext";

const RootContextProviders: FC<PropsWithChildren> = ({ children }) => (
    <ToastProvider>
        <SearchDialogContextProvider>
            <AppDialogProvider>
                <VideoPlayerDialogProvider>
                    {children}
                </VideoPlayerDialogProvider>
            </AppDialogProvider>
        </SearchDialogContextProvider>
    </ToastProvider>
);

export default RootContextProviders;
