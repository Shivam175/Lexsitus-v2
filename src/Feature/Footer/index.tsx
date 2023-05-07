import React, { type FC } from "react";
import styles from "./index.module.scss";
import Button from "Components/Button";
import { type IAvailableIcon } from "Components/Icons/@types";
import IconsWithText from "Components/IconsWithText";
import Translate from "Feature/Translation/index";

export interface IFooterList {
    icon: IAvailableIcon;
    url?: string;
    isExternal?: boolean;
    className: string;
}

const FOOTERLISTITEM: IFooterList[] = [
    {
        icon: "cilrap",
        url: "https://www.cilrap.org/purpose/",
        isExternal: true,
        className: "cilrap",
    },
    {
        icon: "warrior",
        url: "https://www.regjeringen.no/en/dep/ud/id833/",
        isExternal: true,
        className: "warrior",
    },
    {
        icon: "INLA",
        url: "https://www.nurembergacademy.org/",
        isExternal: true,
        className: "INLA",
    },
    {
        icon: "mithya-logo",
        className: "mithya-logo",
    },
    {
        icon: "icicil-logo",
        className: "icicil-logo",
    },
    {
        icon: "DPGA-logo1",
        className: "DPGA-logo1",
    },
];

const FooterListItem: FC<IFooterList> = ({
    className,
    url,
    isExternal,
    icon,
}) => (
    <li className={`${styles.listItem} ${styles[className]}`}>
        {isExternal ? (
            <Button
                link={url}
                isExternal={isExternal}
                className={styles.Button}
            >
                <IconsWithText icon={icon} />
            </Button>
        ) : (
            <IconsWithText icon={icon} className={styles.icon} />
        )}
    </li>
);

const Footer: FC = () => (
    <div className={styles.Footer}>
        <div className={styles["left-section"]}>
            <p className={styles["left-section-para"]}>
                <Translate keyLang="Lexsitus_is_a_service_of" />
            </p>
        </div>
        <ul className={styles["right-section"]}>
            {FOOTERLISTITEM.map((footerList, index) => (
                <FooterListItem key={index} {...footerList} />
            ))}
        </ul>
    </div>
);

export default Footer;
