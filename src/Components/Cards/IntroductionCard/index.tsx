import clsx from "clsx";
import React, { type FC } from "react";
import styles from "./ButtonCard.module.scss";
import Button from "Components/Button";
import Typography from "Components/Typography";


interface IIntroductionLanguage {
    name: string;
    video: string;
}

export interface IIntroductionVideoProps {
    poster: string;
    name: string;
    defaultVideo: string;
    languages?: IIntroductionLanguage[];
    onClick: (videoUrl: string) => void;
}


const LanguageButton: FC<IIntroductionLanguage & { onClick: () => void }> = ({ name, onClick }) => (
    <Button
        key={`${name}-btn`}
        variant="contained"
        className={clsx(styles.button_card_button)}
        onClick={onClick}
    >
        {name}
    </Button>  );

const IntroductionCard: React.FC<IIntroductionVideoProps> = (props) => {
    const {
        poster,
        name,
        defaultVideo,
        languages = [],
        onClick,
    } = props;

    return (
        <div className={styles.button_card}>
            <div className={styles.button_card_container}>
                <div className={styles.button_card_image} onClick={() => {
                    onClick(defaultVideo); 
                }}>
                    <img src={poster} />
                </div>
                <Typography className={styles.button_card_name}>{name}</Typography>
                <div className={styles.button_card_display}>
                    {languages.map((languageItem, index) => (<LanguageButton key={index} {...languageItem} onClick={() => {
                        onClick(languageItem.video); 
                    }}/>))}
                </div>
                
            </div>
        </div>
    );
};

export default IntroductionCard;
