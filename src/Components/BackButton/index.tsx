import React, { type FC } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./index.module.scss";
import Button from "Components/Button";
import IconsWithText from "Components/IconsWithText";


const BackButton: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const handleNavigationButton = () => {
        if (location.key) {
            navigate(-1);
        }

        navigate("/");
    };

    return (
        <div className={styles.FormHeadingAndButton}>
            <Button
                variant="contained"
                color="white"
                className={styles.button}
                onClick={handleNavigationButton}
            >
                <IconsWithText icon="left-arrow" text="BACK" />
            </Button>
        </div>
    );
};

export default BackButton;
