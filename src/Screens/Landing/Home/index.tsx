import { type FC } from "react";
import { Outlet } from "react-router-dom";
import NavigationDrawer from "./NavigationDrawer";


import "./Landing.scss";
import PageTemplate from "Feature/PageTemplate";

const Landing: FC = () => (
    <div className="landing-root">
        <div className="root-block">
            <PageTemplate isLeftHeader={false} isTransparent isFooter>
                <div className="landing-container">
                    <div className="drawer-container">
                        <NavigationDrawer />
                    </div>
                    <div className="info-container">
                        <div className="content-container">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </PageTemplate>

        </div>
    </div>
);

export default Landing;
