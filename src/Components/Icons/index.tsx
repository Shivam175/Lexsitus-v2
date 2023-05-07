import clsx from "clsx";
import { type FC, type PropsWithChildren } from "react";
import { ReactSVG } from "react-svg";
import { type IconsProps } from "./@types";
import styles from "./index.module.scss";

// eslint-disable-next-line complexity
export const iconRender = ({ icon, altText, className, imageHeight, imageWidth }: IconsProps) => {
    switch (icon) {
        case "favicon-darkgrey":
        case "mithya-logo":
        case "cilrap-logo":
        case "homeslide_infographic2":
        case "DPGA-logo1":
        case "favicon2":
        case "enter-lexitus":
        case "home-library":
        case "enter-library":
        case "icicil-logo":
        case "laval-CDIPH-logo1":
        case "helm-logo":
        case "digest-decisions-icon":
        case "toep-icon1":
        case "cilrap":
        case "warrior":
        case "INLA":
        case "left-arrow":
        case "cross":
            return (
                <ImageIcon
                    icon={icon}
                    altText={altText}
                    className={className}
                    imageHeight={imageHeight}
                    imageWidth={imageWidth}
                />
            );

        case "lexsitus-icons38-playButton":
        case "lexsitus-icons38-message":
        case "lexitus-icons38-prep":
        case "lexitus-icons38-Case":
        case "lexitus-icons38-Eocd":
        case "lexitus-icons38-Eoc":
        case "lexitus-icons38-Mopd":
        case "homepage-icons-tutorials":
        case "homepage-icons-edit":
        case "sm-icons-google":
        case "sm-icons-facebook":
        case "sm-icons-twitter":
        case "sm-icons-colorGoogle":
        case "sm-icons-colorFacebook":
        case "sm-icons-colorTwitter":
        case "global-menu-icon-hamburger1":
        case "global-menu-icon-hamburger2":
        case "home-top-right-team":
        case "home-top-right-report":
        case "home-top-right-lecture":
        case "home-top-right-home":
        case "cpij-logo-leaf":
        case "cpij-logo-cpig-logo":
        case "document-icons-home":
        case "document-icons-minar":
        case "document-icons-order":
        case "document-icons-filledBook":
        case "document-icons-bookZoom":
        case "document-icons-message":
        case "document-icons-sketch":
        case "document-icons-folder":
        case "global-icon-cap":
        case "global-icon-lib":
        case "global-icon-colorLib":
        case "global-icon-matrix":
        case "global-icon-colorMatrix":
        case "global-icon-colorCap":
        case "library-top-mainLibIcon":
        case "lib-intro-icons-order":
        case "lib-intro-icons-microscope":
        case "lib-intro-icons-radio":
        case "home-left-panel-team":
        case "home-left-panel-toep":
        case "home-left-panel-cmnHub":
        case "home-left-panel-zoomin":
        case "home-left-panel-matrix":
        case "cilrap-HELM-logo-regjeringen":
        case "cilrap-HELM-logo-cilrap":
        case "cilrap-HELM-logo-INPA":
        case "library-top-toep":
        case "library-top-cmnHub":
        case "library-top-zoomin":
        case "library-top-matrix":
            return <CssIcon icon={icon} className={className} />;

        case "infographic-ar":
        case "infographic-en":
        case "infographic-fa":
        case "infographic-fr":
            return <SvgIcon icon={icon} className={className} />;

        default:
            return null;
    }
};

export const SvgIcon: FC<IconsProps> = ({ icon, className }) => {
    const getSVGPath = (icon: string) => {
        try {
            return `/assets/img/img/home-infographic/${icon}.svg`;
        } catch (err: unknown) {
            return "";
        }
    };

    return <ReactSVG className={className} src={getSVGPath(icon)} />;
};

export const CssIcon: FC<IconsProps> = ({ icon, className }) => {
    const cls = clsx(styles["css-icon"], styles[icon], className);
    return <span className={cls} />;
};

export const ImageIcon: FC<IconsProps> = ({ icon, altText, className, imageWidth = "20px", imageHeight = "20px" }) => {
    const url = `/assets/img/img/${icon}.png`;

    return <img src={url} alt={altText} width={imageWidth} height={imageHeight} className={className} />;
};

const Icons: FC<PropsWithChildren<IconsProps>> = (props) => {
    const { icon, altText, className, imageHeight, imageWidth } = props;

    return iconRender({ icon, altText, className, imageHeight, imageWidth });
};

export default Icons;
