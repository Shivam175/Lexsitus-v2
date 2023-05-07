import clsx from "clsx";
import React from "react";
import styles from "./index.module.scss";
import BdoHandler from "Components/BdoHandler";
import Typography from "Components/Typography";
import Translate from "Feature/Translation";

export interface UserCardProps {
    name: string;
    description: string;
    image?: string;
}

const IMAGE_BASE_PATH = "/assets/img/img/contributors/";

const UserCard: React.FC<UserCardProps> = ({ name, description, image }) => {
    const hasImage = Boolean(image);
    return (
        <div
            className={clsx(styles.card_root, {
                [styles.user_card_root]: hasImage,
            })}
        >
            {hasImage ? (
                <div className={styles.user_card_container}>
                    <img src={`${IMAGE_BASE_PATH}/image`} />
                </div>
            ) : null}
            <div
                className={clsx(styles.info_container, {
                    [styles.user_card_info]: hasImage,
                })}
            >
                <BdoHandler>
                    <Typography variant="h6" className={styles.user_card_name}>
                        <Translate keyLang={name} />
                    </Typography>
                    <Typography
                        variant="body"
                        className={clsx(styles.user_card_description, {
                            [styles.user_card_margin]: hasImage,
                        })}
                    >
                        <Translate keyLang={description} />
                    </Typography>
                </BdoHandler>
            </div>
        </div>
    );
};

export default UserCard;
