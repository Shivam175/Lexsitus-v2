import React, { type FC, useContext } from "react";
import styles from "./index.module.scss";
import introJSON from "./introductions.json";
import IntroductionCard from "Components/Cards/IntroductionCard/index";
import { VideoDialogContext } from "Context/VideoPlayer";
import LexsitusHeading from "Feature/LexsitusHeading";

const Introduction: FC = () => {
    const { show } = useContext(VideoDialogContext);
    const showDialog = (_url: string) => {
        show({ url: _url });
    };

    return (
        <div className={styles.container}>
            <LexsitusHeading subHeadingKey="introductions" />
            <ul className={styles.list}>
                {introJSON.map((item) => {
                    const { default_video } = item;
                    const props = {
                        ...item,
                        defaultVideo: default_video
                    };
                    return (
                        <li key={default_video} className={styles.cards}>
                            <IntroductionCard {...props} onClick={showDialog} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Introduction;
