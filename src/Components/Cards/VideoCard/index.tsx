import React from "react";
import styles from "Components/Cards/VideoCard/VideoCard.module.scss";

export interface VideoCardProps {
    imageUrl: string;
    title: string;
    onClick: () => void;
}

const VideoCard: React.FC<VideoCardProps> = (props) => {
    const { imageUrl, title, onClick } = props;
    return (
        <div className={styles.video_card}>
            <div className={styles.video_card_container} onClick={onClick}>
                <div className={styles.video_card_image}>
                    <img src={imageUrl} />
                </div>
                <h4 className={styles.video_card_heading}>{title}</h4>
            </div>
        </div>
    );
};

export default VideoCard;
