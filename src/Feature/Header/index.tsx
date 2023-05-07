import clsx from "clsx";
import {  type FC } from "react";
import { type HeaderProps } from "./@types";
import LeftHeader from "./LeftHeader";
import RightHeader from "./RightHeader";
import styles from "./index.module.scss";

const Header: FC<HeaderProps> = ({ isLeftHeader, isRightHeader = true, isTransparent = false }) => {
    const cls = clsx(styles.Header, {
        [styles.isTransparent]: isTransparent,
    });

    return (
        <div className={cls}>
            <div className={styles.leftContainer}>
                {isLeftHeader ? <LeftHeader /> : null}
            </div>
            <div className={styles.rightContainer}>
                {isRightHeader ? <RightHeader /> : null}
            </div>
        </div>
    );
};

export default Header;
