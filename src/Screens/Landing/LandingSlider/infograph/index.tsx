import clsx from "clsx";
import {  type FC } from "react";
import styles from "./index.module.scss";
import Button from "Components/Button";
import LexsitusHeading from "Feature/LexsitusHeading";
import { useCurrentLanguage } from "Hooks/useTranslation";

export interface InfographProps {
    showVideoDialog: (url: string) => void;
}

const InfoGraph: FC<InfographProps> = ({ showVideoDialog }) => {
    const { language } = useCurrentLanguage();
    const tutorialVideo = {
        poster: `https://dev.cilrap-lexsitus.org/img/home-infographic/infographic-${language}.svg`,
        name: "General Lexsitus Tutorial",
        video: "https://lexsitus.cmn-kh.org/lex_web/av_intro.mp4",
    };
    return (
        <div className={styles["pie-chart-root"]}>
            <LexsitusHeading
                subHeadingKey="Your_place_for_international_criminal_law"
                subHeadingClass={styles["letter-spaced-sub-heading"]}
            />
            <div
                className={styles["image-container"]}
                onClick={() => {
                    showVideoDialog(tutorialVideo.video);
                }}
            >
                <div className={styles["image-wrapper"]}>
                    <img
                        className={styles.image}
                        src={tutorialVideo.poster}
                        alt="pieChart"
                    />
                </div>
                <div className={styles["button-wrapper"]}>
                    <Button
                        tooltip={"Watch general tutorial film"}
                        className={styles["play-button"]}
                    >
                        <i className={clsx("material-icons", styles["play-icon"])}>play_arrow</i>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default InfoGraph;
