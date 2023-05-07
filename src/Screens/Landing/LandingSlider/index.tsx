import React, { useContext,  type FC } from "react";
import styles from "./index.module.scss";
import InfoGraph from "./infograph";
import SlickSlider from "Components/SlickSlider";
import { VideoDialogContext } from "Context/VideoPlayer";
import CoreTeam from "Feature/CoreTeam";
import Introduction from "Feature/Introduction";



const LandingSlider: FC = () => {
    const { show } = useContext(VideoDialogContext);
    const showDialog = (_url: string) => {
        show({ url: _url });
    };

    const slidesList = [
        <InfoGraph showVideoDialog={showDialog} key={0}/>,
        <Introduction  key={1}/>,
        <CoreTeam key={2}/>,
    ];
    return (
        <>
            <div className={styles["landing-slider-container"]}>
                <SlickSlider>{slidesList}</SlickSlider>
            </div>
            
        </>
    );
};

export default LandingSlider;
