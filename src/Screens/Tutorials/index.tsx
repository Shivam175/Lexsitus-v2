import clsx from "clsx";
import React, { type FC } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./index.module.scss";
import * as TUTORIALS_LIST from "./tutorialVideosList.json";
import Button from "Components/Button/index";
import Header from "Feature/Header/index";
import VideoList from "Feature/VideoList";

const Tutorials: FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const videoSlug = searchParams.get("slug");

    return (
        <div>
            <div className={styles.header}>
                <Header isLeftHeader={true} />
            </div>
            <div className={styles.container}>
                <div className={clsx("flex", "justify-center")}>
                    <div className={clsx("max-w-7xl", "mt-12")}>
                        <Button
                            variant="contained"
                            onClick={() => {
                                navigate(-1);
                            }}
                            className={clsx(styles.button)}
                        >
                            <i className="material-icons mr-1 align-middle pb-1 text-lg">
                                arrow_back
                            </i>
                            BACK
                        </Button>
                        <VideoList
                            list={TUTORIALS_LIST.videoList}
                            videoSlug={videoSlug ?? ""}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tutorials;
