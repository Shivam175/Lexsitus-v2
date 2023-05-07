import React, { type FC } from "react";
import { Outlet } from "react-router-dom";
import RootContextProviders from "Context";
import { useSetupTranslation } from "Hooks/useTranslation";

const AppNavigation: FC = () => {
    // Called from here to use the navigation parameter based language transitions
    useSetupTranslation();
    return (
        <RootContextProviders>
            <React.Fragment>
                <Outlet />
            </React.Fragment>
        </RootContextProviders>
    );
};

export default AppNavigation;
