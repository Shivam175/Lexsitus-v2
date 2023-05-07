import clsx from "clsx";
import React, { type FC } from "react";
import { useLocation } from "react-router-dom";
import { type IMenuProps } from "./@types";
import styles from "./index.module.scss";
import Button from "Components/Button";
import IconsWithText from "Components/IconsWithText";
import LexsitusHeading from "Feature/LexsitusHeading";


const navigationList: IMenuProps[] = [
    {
        icon: "library-top-mainLibIcon",
        name: "LIBRARY",
        url: "/lectures",
        className: "mainLibIcon",
        id: 1,
    },
    {
        icon: "library-top-toep",
        name: "TOAEP",
        url: "/toaep",
        className: "toep",
        id: 2
    },
    {
        icon: "library-top-cmnHub",
        name: "CMN HUB",
        url: "https://www.casematrixnetwork.org/cmn-knowledge-hub/",
        isExternal: true,
        className: "cmnHub",
        id: 3,
    },
    {
        icon: "library-top-zoomin",
        name: "LTD",
        url: "https://www.legal-tools.org/",
        isExternal: true,
        className: "zoomin",
        id: 4,
    },
    {
        icon: "library-top-matrix",
        name: "CASE MATRIX",
        url: "https://www.casematrixnetwork.org/icc-case-matrix/online-icc-case-matrix/",
        isExternal: true,
        className: "matrix",
        id: 5,
    },
];



const LeftHeader: FC = () => {

    const loc = useLocation();
    const currentLocation = loc.pathname.split("/")[2];




    return (<nav className={styles["left-header"]}>
        <LexsitusHeading />
        <ul className={styles["left-header-ul"]}>
            {navigationList.map((list, index) => (
                <li
                    key={index}
                    className={clsx(styles["left-header-li"], list.className)}

                >
                    <Button
                        link={list.url}
                        isExternal={list.isExternal}
                        className={styles["left-header-button"]}
                    >
                        <IconsWithText
                            icon={list.icon}
                            text={list.name}
                            className={styles["left-header-icon"]}
                            textClass={clsx({ [styles.active]: currentLocation === list.url?.slice(1) })}
                        />
                    </Button>
                </li>
            ))}
        </ul>
    </nav>);
};

export default LeftHeader;